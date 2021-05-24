import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Services } from "./Services";

@Index("services_datee_pk", ["servDataId"], { unique: true })
@Entity("services_data", { schema: "public" })
export class ServicesData {
  @PrimaryGeneratedColumn({ type: "integer", name: "serv_data_id" })
  servDataId: number;

  @Column("character varying", { name: "location", nullable: true })
  location: string | null;

  @Column("character varying", { name: "time", nullable: true })
  time: string | null;

  @Column("character varying", { name: "maintance_status", nullable: true })
  maintanceStatus: string | null;

  @Column("character varying", { name: "cause", nullable: true })
  cause: string | null;

  @Column("character varying", { name: "observation", nullable: true })
  observation: string | null;

  @Column("character varying", { name: "status", nullable: true })
  status: string | null;

  @ManyToOne(() => Services, (services) => services.servicesData)
  @JoinColumn([{ name: "serv_id", referencedColumnName: "servId" }])
  serv: Services;
}
