import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '@/module/comment/comment.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  text: string;

  @Column()
  user: string;

  @ManyToOne((type) => Comment, (comment) => comment.reply, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  comment: Comment;
}
