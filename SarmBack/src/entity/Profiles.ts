import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProfilesPermissions } from "./ProfilesPermissions";
import { ProfilesUsers } from "./ProfilesUsers";

@Index("profiles_pk", ["profId"], { unique: true })
@Entity("profiles", { schema: "public" })
export class Profiles {
  @PrimaryGeneratedColumn({ type: "integer", name: "prof_id" })
  profId: number;

  @Column("integer", { name: "prof_name" })
  profName: number;

  @Column("character varying", { name: "prof_active", nullable: true })
  profActive: string | null;

  @OneToMany(
    () => ProfilesPermissions,
    (profilesPermissions) => profilesPermissions.prof
  )
  profilesPermissions: ProfilesPermissions[];

  @OneToMany(() => ProfilesUsers, (profilesUsers) => profilesUsers.prof)
  profilesUsers: ProfilesUsers[];
}
