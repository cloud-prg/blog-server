import { Paper } from "@/module/paper";
import { Column, ManyToMany, PrimaryGeneratedColumn, JoinTable, Entity } from "typeorm";

@Entity()
export class Label {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @ManyToMany(() => Paper, paper => paper.labels)
    @JoinTable({
        name: 'label_paper',
        joinColumn: { name: 'label_id', referencedColumnName: "id" },
        inverseJoinColumn: { name: 'paper_id', referencedColumnName: 'id' }
    })
    papers: Paper[];
}
