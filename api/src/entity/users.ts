import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    name: string;

    @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}