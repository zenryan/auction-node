import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class ItemImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    @Index()
    uuid: string;

    @Column()
    item_id: number;

    @Column()
    url: string;

    @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;
}