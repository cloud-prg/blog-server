import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';

import { Comment } from './comment.entity';
import { Paper } from '@/module/paper/paper.entity';
import { Reply } from '@/module/reply/reply.entity';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Paper, Reply])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
