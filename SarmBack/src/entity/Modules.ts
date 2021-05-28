import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permissions } from "./Permissions";

@Index("modules_pk", ["moduId"], { unique: true })
@Entity("modules", { schema: "public" })
export class Modules {
  @PrimaryGeneratedColumn({ type: "integer", name: "modu_id" })
  moduId: number;

  @Column("character varying", { name: "modu_name", nullable: true })
  moduName: string | null;

  @Column("character varying", { name: "modu_url" })
  moduUrl: string;

  @OneToMany(() => Permissions, (permissions) => permissions.modu)
  permissions: Permissions[];
}
