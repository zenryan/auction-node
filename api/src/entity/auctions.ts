import { Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    Generated,
    Index,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";


@Entity()
export class Auction extends BaseEntity{
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
}
