import { Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    title: string;

    @Column()
    desc: string;

    @Column()
    detail: string;

    @Column()
    price: string;

    @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}
