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

  @Column({ nullable: true })
  user_id: number;

  @Column()
  name: String;

  @Column('text')
  type: String;

  @Column('text')
  message: String;

  @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  static getMessages(auctionId: Number) {
    return this.createQueryBuilder()
      .where("auction_id = :auctionId", { auctionId })
      .andWhere("user_id IS NOT NULL")
      .getMany();
  }
}
