import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  Generated,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
// import _ from 'lodash';
import { Item } from './items';
import { AuctionItem } from './auction_items';

@Entity()
export class Auction extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column('varchar')
  @Generated("uuid")
  @Index()
  uuid: string;

  @Column('varchar')
  @Index()
  title: string;

  @Column('varchar')
  desc: string;

  @Column('text')
  detail: string;

  @Column('bigint')
  startprice: Number;

  @Column('datetime')
  startdate: Date;

  @Column('datetime')
  enddate: Date;

  @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToMany(type => AuctionItem, auctionItem => auctionItem.auction)
  auctionItems: AuctionItem[];

  static searchUpcoming() {
    return this.createQueryBuilder()
      .leftJoinAndSelect("Auction.auctionItems", "auction_item")
      .leftJoinAndSelect("auction_item.item", "item")

      .where('auction.startdate >= NOW()')
      .orderBy("auction.startdate")
      .limit(10)
      .getMany();
  }

  static searchPrevious() {
    return this.createQueryBuilder()
      .leftJoinAndSelect("Auction.auctionItems", "auction_item")
      .leftJoinAndSelect("auction_item.item", "item")
      .where('auction.enddate <= NOW()')
      .orderBy("auction.enddate", "DESC")
      .limit(10)
      .getMany();
  }

  static searchOngoing() {
    return this.createQueryBuilder()
      .leftJoinAndSelect("Auction.auctionItems", "auction_item")
      .leftJoinAndSelect("auction_item.item", "item")
      .where('auction.enddate >= NOW()')
      .andWhere('auction.startdate <= NOW()')
      .orderBy("auction.enddate", "DESC")
      .limit(10)
      .getMany();
  }

  static async withItem(auctions: any) {
    const ids = auctions.map((a: Auction) => a.id);
    console.log(ids);
    const items = await this.createQueryBuilder('auction_item')
      .leftJoinAndSelect(Item, "item", "item.id = auction_item.item_id")
      .where("auction_item.auction_id IN (:...ids)", { ids })
      .getMany();

    console.log(items);


    return auctions;
  }


}
