import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";

@Entity()
export class BidPrice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  auction_item_id: number;

  @Column()
  @Index()
  user_id: number;

  @Column()
  previous_price: number;

  @Column()
  bid_price: number;

  @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}