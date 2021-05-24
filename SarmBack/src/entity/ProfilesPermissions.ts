import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Profiles } from "./Profiles";
import { Permissions } from "./Permissions";

@Index("profiles_permissions_pk", ["profpermId"], { unique: true })
@Entity("profiles_permissions", { schema: "public" })
export class ProfilesPermissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "profperm_id" })
  profpermId: number;

  @ManyToOne(() => Profiles, (profiles) => profiles.profilesPermissions)
  @JoinColumn([{ name: "prof_id", referencedColumnName: "profId" }])
  prof: Profiles;

  @ManyToOne(
    () => Permissions,
    (permissions) => permissions.profilesPermissions
  )
  @JoinColumn([{ name: "perm_id", referencedColumnName: "permId" }])
  perm: Permissions;
}
