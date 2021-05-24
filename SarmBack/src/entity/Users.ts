import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProfilesUsers } from "./ProfilesUsers";
import { Repositories } from "./Repositories";

@Index("users_pk", ["userId"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  userId: number;

  @Column("character varying", { name: "user_name" })
  userName: string;

  @Column("character varying", { name: "user_password" })
  userPassword: string;

  @Column("character varying", { name: "user_username" })
  userUsername: string;

  @Column("timestamp without time zone", { name: "time_created" })
  timeCreated: Date;

  @Column("character varying", { name: "user_id_created", nullable: true })
  userIdCreated: string | null;

  @Column("boolean", {
    name: "user_active",
    nullable: true,
    default: () => "true",
  })
  userActive: boolean | null;

  @OneToMany(() => ProfilesUsers, (profilesUsers) => profilesUsers.user)
  profilesUsers: ProfilesUsers[];

  @OneToMany(() => Repositories, (repositories) => repositories.user)
  repositories: Repositories[];
}
