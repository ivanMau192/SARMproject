import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Profiles } from "./Profiles";

@Index("profiles_users_pk", ["prousrId"], { unique: true })
@Entity("profiles_users", { schema: "public" })
export class ProfilesUsers {
  @PrimaryGeneratedColumn({ type: "integer", name: "prousr_id" })
  prousrId: number;

  @ManyToOne(() => Users, (users) => users.profilesUsers)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @ManyToOne(() => Profiles, (profiles) => profiles.profilesUsers)
  @JoinColumn([{ name: "prof_id", referencedColumnName: "profId" }])
  prof: Profiles;
}
