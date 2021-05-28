import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Repositories } from "./Repositories";
import { ServicesTypes } from "./ServicesTypes";
import { ServicesData } from "./ServicesData";

@Index("services_pk", ["servId"], { unique: true })
@Entity("services", { schema: "public" })
export class Services {
  @PrimaryGeneratedColumn({ type: "integer", name: "serv_id" })
  servId: number;

  @Column("character varying", { name: "time", nullable: true })
  time: string | null;

  @Column("character varying", { name: "sector", nullable: true })
  sector: string | null;

  @Column("character varying", { name: "quantity", nullable: true })
  quantity: string | null;

  @Column("character varying", { name: "status", nullable: true })
  status: string | null;

  @Column("character varying", { name: "equipment", nullable: true })
  equipment: string | null;

  @ManyToOne(() => Repositories, (repositories) => repositories.services)
  @JoinColumn([{ name: "repo_id", referencedColumnName: "repoId" }])
  repo: Repositories;

  @ManyToOne(() => ServicesTypes, (servicesTypes) => servicesTypes.services)
  @JoinColumn([{ name: "serv_type_id", referencedColumnName: "servTypeId" }])
  servType: ServicesTypes;

  @OneToMany(() => ServicesData, (servicesData) => servicesData.serv)
  servicesData: ServicesData[];
}
