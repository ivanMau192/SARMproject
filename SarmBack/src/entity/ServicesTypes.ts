import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Services } from "./Services";
import { Contracts } from "./Contracts";

@Index("services_types_pk", ["servTypeId"], { unique: true })
@Entity("services_types", { schema: "public" })
export class ServicesTypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "serv_type_id" })
  servTypeId: number;

  @Column("character varying", { name: "serv_name", nullable: true })
  servName: string | null;

  @Column("character varying", { name: "serv_price", nullable: true })
  servPrice: string | null;


  @Column("character varying", { name: "cont_id", nullable: true })
  contId: string | null;

  @OneToMany(() => Services, (services) => services.servType)
  services: Services[];

  @ManyToOne(() => Contracts, (contracts) => contracts.servicesTypes)
  @JoinColumn([{ name: "cont_id", referencedColumnName: "contId" }])
  cont: Contracts;
}
