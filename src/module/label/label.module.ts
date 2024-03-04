import { Module } from '@nestjs/common';
import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paper } from '../paper';
import { Label } from './label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label, Paper])],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule { }
