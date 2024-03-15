import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Comment } from '@/module/comment/comment.entity';
import { Label } from '../label/label.entity';

@Entity()
export class Paper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 20 })
  title: string;

  @Column({ nullable: true, length: 30 })
  description?: string;

  @Column({ nullable: true })
  cover?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'mediumtext', nullable: true })
  content: string;

  @OneToMany(() => Comment, (comment) => comment.paper, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  comment: Comment[];

  @ManyToMany(() => Label, (label) => label.papers,{
    onDelete: 'CASCADE'
  })
  labels: Label[];
}
