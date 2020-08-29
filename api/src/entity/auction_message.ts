import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class AuctionMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  auction_id: number;

  @Column()
  user_id: number;

  @Column()
  name: String;

  @Column('text')
  message: String;

  @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
