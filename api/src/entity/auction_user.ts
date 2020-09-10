import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";

@Entity()
export class AuctionUser extends BaseEntity {
  @PrimaryColumn()
  auction_id: number;

  @Column()
  @Index()
  socket_id: string;

  @PrimaryColumn()
  user_id: number;

  @Column()
  name: String;

  @CreateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "datetime", precision: 0, default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  static addUser(auctionId: number, userId: number, name: string, socketId: string) {
    const repo = this.getRepository();
    const data = [{
      auction_id: auctionId,
      user_id: userId,
      name: name,
      socket_id: socketId,
    }];
    return repo.save(data);
  }

  static removeUser(auctionId: number, userId: number) {
    return this.createQueryBuilder()
      .delete()
      .from('auction_user')
      .where("auction_id = :auctionId", { auctionId })
      .andWhere("user_id = :userId", { userId })
      .execute();
  }

  static disconnectUser(socketIds: string[]) {
    return this.createQueryBuilder()
      .delete()
      .from('auction_user')
      .where("socket_id IN (:...values)", { values: socketIds })
      .execute();
  }
}
