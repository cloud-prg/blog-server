import { Module } from '@nestjs/common';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';
import { Paper } from './paper.entity';
import { Comment } from '@/module/comment/comment.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Label } from '../label/label.entity';
import { LabelService } from '../label/label.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Paper,
      Comment,
      Label
    ]),
  ],
  controllers: [PaperController],
  providers: [PaperService, LabelService],
})
export class PaperModule { }
