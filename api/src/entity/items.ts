import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    Brackets,
    OneToOne,
    JoinColumn
} from "typeorm";
import { Status } from './enum';
import { AuctionItem } from "./auction_items";

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    title: string;

    @Column()
    desc: string;

    @Column('text')
    detail: string;

    @Column()
    price: string;

    @Column("varchar", { length: "1024", nullable: true })
    avatar: string;

    @Column('varchar')
    status: Status;

    @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToOne(type => AuctionItem)
    @JoinColumn({ name: 'id' })
    auctionItem: AuctionItem;

    static searchbyText(searchText: any) {
        const text = `%${searchText}%`;
        return this.createQueryBuilder("item")
            .where("item.status = :status", { status: Status.active })
            .andWhere(new Brackets(qb => {
                qb.where("item.title like :text", { text })
                    .orWhere("item.desc like :text", { text })
                    .orWhere("item.detail like :text", { text })
            }))
            .getMany();
    }
}
