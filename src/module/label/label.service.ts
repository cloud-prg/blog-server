import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './label.entity';

@Injectable()
export class LabelService {
    constructor(@InjectRepository(Label) private readonly labelRepository: Repository<Label>) { }

    async getCategories() {
        const result = await this.labelRepository.createQueryBuilder('label')
            .select('label.label as label')
            .addSelect('COUNT(*)', 'count')
            .groupBy('label')
            .getRawMany();

        return result
    }

    async getPaperListPaginationByLabel(params: { label: string, page: number, pageSize: number }) {
        const { page, pageSize, label } = params;

        let [items, total] = await this.labelRepository.findAndCount({
            select: ['papers'],
            where: {
                label
            },
            relations: ['papers', 'papers.labels'],
            skip: (page - 1) * pageSize,
            take: pageSize,
            order: {
                id: "DESC"
            }
        })

        // notice: 数据转化&去重
        const paperIdList: number[] = []; // 防止列表渲染出相同的文章（一个文章拥有多个相同标签。）
        items = items.reduce((acc, cur) => {
            const paper = cur.papers[0];
            if (!paperIdList.includes(paper.id)) {
                paperIdList.push(paper.id)
                acc.push(paper)
            }
            return acc;
        }, [])

        return {
            items,
            total: items.length,
        };
    }
}
