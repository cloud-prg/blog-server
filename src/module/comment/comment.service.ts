import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/index.dto';
import { EntityManager, Repository } from 'typeorm';
import { Paper } from '../paper/paper.entity';
import { Comment } from './comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {
  private paperRepository: Repository<Paper>;
  private commentRepository: Repository<Comment>;

  constructor(@InjectEntityManager() manager: EntityManager) {
    this.paperRepository = manager.getRepository(Paper);
    this.commentRepository = manager.getRepository(Comment);
  }

  async create(paperId: number, params: CreateCommentDto) {
    let created: boolean = false;

    try {
      const relatedPaper = await this.paperRepository.findOneBy({
        id: paperId,
      });

      if (!relatedPaper) {
        throw new Error('Related paper not found');
      }

      const { text, user } = params;
      const newComment = this.commentRepository.create({
        text,
        user,
        paper: relatedPaper,
      });

      await this.commentRepository.save(newComment);
      created = true;

      return {
        created,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async createWithoutRedirect(paperId: number, params: CreateCommentDto) {
    let created: boolean = false;

    try {
      const relatedPaper = await this.paperRepository.findOneBy({
        id: paperId,
      });

      if (!relatedPaper) {
        throw new Error('Related paper not found');
      }

      const { text, user } = params;
      const newComment = this.commentRepository.create({
        text,
        user,
        paper: relatedPaper,
      });

      await this.commentRepository.save(newComment);
      created = true;

      return {
        created,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async getAll(paperId: number) {
    const relatedComment = await this.paperRepository.findOne({
      where: { id: paperId },
      relations: ['comment', 'comment.reply'],
    });

    return relatedComment;
  }
}
