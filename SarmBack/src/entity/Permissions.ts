import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProfilesPermissions } from "./ProfilesPermissions";
import { Modules } from "./Modules";

@Index("permissions_pk", ["permId"], { unique: true })
@Entity("permissions", { schema: "public" })
export class Permissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "perm_id" })
  permId: number;

  @Column("character varying", { name: "perm_name" })
  permName: string;

  @Column("character varying", { name: "perm_tag" })
  permTag: string;

  @Column("character varying", { name: "perm_description" })
  permDescription: string;

  @OneToMany(
    () => ProfilesPermissions,
    (profilesPermissions) => profilesPermissions.perm
  )
  profilesPermissions: ProfilesPermissions[];

  @ManyToOne(() => Modules, (modules) => modules.permissions)
  @JoinColumn([{ name: "modu_id", referencedColumnName: "moduId" }])
  modu: Modules;
}
