import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { createParamProps } from '../../type/paper';
import {
  Like,
  Repository,
  EntityManager,
  SelectQueryBuilder,
  createQueryBuilder,
} from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Paper } from './paper.entity';
import { Label } from '../label/label.entity';
import { LabelService } from '../label/label.service';

@Injectable()
export class PaperService {
  private paperRepository: Repository<Paper>;

  constructor(@InjectEntityManager() private readonly manager: EntityManager) {
    this.paperRepository = this.manager.getRepository(Paper);
  }

  async create(params: createParamProps) {
    const paper = new Paper();

    const { labels } = params;
    const labelList: Label[] = [];
    for (const value of labels) {
      const labelInstance = new Label();
      labelInstance.label = value;
      await labelList.push(labelInstance);
      await this.manager.save(labelInstance);
    }

    Object.assign(paper, {
      ...params,
      labels: labelList,
    });

    return this.paperRepository.save(paper);
  }

  async delete(paperId: number) {
    let toDelete = await this.paperRepository.findOne({
      where: {
        id: paperId,
      },
    });
    let deleted = false;
    if (toDelete) {
      await this.paperRepository.remove(toDelete);
      deleted = true;
    }
    return { deleted };
  }

  async multipleDelete(paperIds: number[]) {
    let deleted = false;
    if (!paperIds.length) {
      return { deleted, msg: '数组不能为空' };
    }
    try {
      await this.paperRepository.delete(paperIds);
      deleted = true;
      return {
        deleted,
      };
    } catch (err) {
      // console.log(`=== err`,err)
      throw Error(err);
    }
  }

  async update(paperId: number, params: createParamProps) {
    let toUpdate = await this.paperRepository.findOneBy({
      id: paperId,
    });
    let updated = false;
    if (toUpdate) {
      const { labels } = params;
      const labelList: Label[] = [];
      for (const value of labels) {
        const labelInstance = new Label();
        labelInstance.label = value;
        await labelList.push(labelInstance);
        await this.manager.save(labelInstance);
      }

      Object.assign(toUpdate, {
        ...params,
        labels: labelList,
      });

      await this.paperRepository.save(toUpdate);
      updated = true;
    }
    return { updated };
  }

  async getPaper(paperId: number) {
    const current = await this.paperRepository.findOneOrFail({
      where: { id: paperId },
      relations: ['labels', 'comment'],
    });
    const { createdAt: currentPaperCreatedAt } = current;

    const previous = await this.paperRepository
      .createQueryBuilder('paper')
      .select(['paper.id', 'paper.title'])
      .where('paper.createdAt < :currentPaperCreatedAt', {
        currentPaperCreatedAt,
      })
      .orderBy('createdAt', 'DESC')
      .take(1)
      .getOne();

    const next = await this.paperRepository
      .createQueryBuilder('paper')
      .select(['paper.id', 'paper.title'])
      .where('paper.createdAt > :currentPaperCreatedAt', {
        currentPaperCreatedAt: new Date(currentPaperCreatedAt.getTime() + 1000), // 需要手动加一秒，否则查询会包括当前文章
      })
      .orderBy('createdAt', 'ASC')
      .take(1)
      .getOne();

    return {
      previous,
      current,
      next,
    };
  }

  getPaperList() {
    return this.paperRepository.find({
      relations: ['labels','comment','comment.reply'],
    });
  }

  async getPaperListPagination(page: number, pageSize: number) {
    const [items, total] = await this.paperRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        id: 'DESC',
      },
      relations: ['labels'],
    });

    return {
      items,
      total,
    };
  }

  // RELATED: label
  async getLabelsByPaperId(paperId: number) {
    const result = await this.paperRepository.findOne({
      select: ['labels'],
      where: {
        id: paperId,
      },
      relations: ['labels'],
    });

    return result;
  }

  async deleteLabel(paperId: number, labelId: number) {
    const paper = await this.paperRepository.findOne({
      relations: ['labels'],
      where: { id: paperId },
    });
    paper.labels = paper.labels.filter((label: Label) => {
      return label.id !== labelId;
    });
    await this.manager.save(paper);
  }

  async getSearchPaperListPagination(params: {
    searchValue: string;
    page: number;
    pageSize: number;
  }) {
    const { searchValue, page, pageSize } = params;

    const where = ['title', 'content', 'description'].map((str) => {
      return {
        [str]: Like(`%${searchValue}%`),
      };
    });

    // @ts-ignore
    !isNaN(+searchValue) && where.push({ id: +searchValue });

    const pagination = await this.paperRepository.findAndCount({
      // notice:对象形式为交叉查询
      // where: {
      //   content: Like(`%${searchValue}%`),
      //   title: Like(`%${searchValue}%`),
      // },

      // notice:数组形式为联合查询
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['labels'],
      order: {
        id: 'DESC',
      },
    });

    let match = false;
    if (pagination) {
      const [items, total] = pagination;
      match = true;

      return {
        match,
        items,
        total,
      };
    }

    return { match };
  }
}
