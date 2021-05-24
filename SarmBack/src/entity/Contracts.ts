import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ServicesTypes } from "./ServicesTypes";

@Index("contracts_pk", ["contId"], { unique: true })
@Entity("contracts", { schema: "public" })
export class Contracts {
  @PrimaryGeneratedColumn({ type: "integer", name: "cont_id" })
  contId: number;

  @Column("character varying", { name: "cont_code", nullable: true })
  contCode: string | null;

  @Column("character varying", { name: "cont_name", nullable: true })
  contName: string | null;

  @Column("character varying", { name: "social_name", nullable: true })
  socialName: string | null;

  @Column("character varying", { name: "status", nullable: true })
  status: string | null;

  @Column("character varying", { name: "close_time", nullable: true })
  closeTime: string | null;

  @Column("character varying", { name: "comments", nullable: true })
  comments: string | null;

  @OneToMany(() => ServicesTypes, (servicesTypes) => servicesTypes.cont)
  servicesTypes: ServicesTypes[];
}
