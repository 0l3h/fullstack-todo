import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @Column('varchar')
    status: "done" | "undone";

    @Column('int')
    priority: number;

    @Column('boolean')
    isDone: boolean;
}