import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/index.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Reply } from './reply.entity';
import { Comment } from '@/module/comment';

import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ReplyService {
  private replyRepository: Repository<Reply>;
  private commentRepository: Repository<Comment>;

  constructor(@InjectEntityManager() manager: EntityManager) {
    this.replyRepository = manager.getRepository(Reply);
    this.commentRepository = manager.getRepository(Comment);
  }

  async create(commentId: number, params: CreateReplyDto) {
    const relatedComment = await this.commentRepository.findOneBy({
      id: commentId,
    });

    if (!relatedComment) {
      throw Error('Related comment not found!');
    }

    const { text, user } = params;
    const newReply = this.replyRepository.create({
      text,
      user,
      comment: relatedComment,
    });

    this.replyRepository.save(newReply);
  }

  async createWithoutRedirect(commentId: number, params: CreateReplyDto) {
    let created = false;

    const relatedComment = await this.commentRepository.findOneBy({
      id: commentId,
    });

    if (!relatedComment) {
      throw Error('Related comment not found!');
    }

    const { text, user } = params;
    const newReply = this.replyRepository.create({
      text,
      user,
      comment: relatedComment,
    });

    await this.replyRepository.save(newReply);
    created = true;
    
    return {
      created,
    };
  }

  async delete(replyId: number) {
    let matched: boolean = false;
    let removed: boolean = false;
    const reply = await this.replyRepository.findOneBy({
      id: replyId
    })
    if (!reply) {
      return {
        matched
      }
    }
    try {
      await this.replyRepository.remove(reply)
      removed = true;
      return {
        removed
      }
    } catch (err) {
      throw new Error(err)
    }
  }
}
