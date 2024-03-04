import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Reply } from '@/module/reply/reply.entity';
import { Paper } from '@/module/paper/paper.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  text: string;

  @Column()
  user: string;

  @OneToMany((type) => Reply, (reply) => reply.comment)
  reply: Reply[];

  @ManyToOne((type) => Paper, (paper) => paper.comment)
  paper: Paper;
}
