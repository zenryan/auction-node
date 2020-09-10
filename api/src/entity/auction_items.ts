import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Status } from './enum';
import { Auction } from './auctions';
import { Item } from './items';

@Entity()
export class AuctionItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  auction_id: number;

  @Column()
  item_id: number;

  @Column('varchar')
  status: Status;

  @Column('bigint')
  startingprice: number;

  @Column({ type: 'bigint', nullable: true, default: 0 })
  bid_price: number;

  @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(type => Auction, auction => auction.auctionItems)
  @JoinColumn({ name: "auction_id" })
  auction: Auction;

  @OneToOne(type => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  static deleteByAuctionAndItemId(auctionId: Number, itemId: Number) {
    return this.createQueryBuilder()
      .delete()
      .where("item_id = :itemId", { itemId })
      .andWhere("auction_id = :auctionId", { auctionId })
      .execute();
  }
}
