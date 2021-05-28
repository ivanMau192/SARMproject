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
import { Users } from "./Users";

@Index("repositories_pk", ["repoId"], { unique: true })
@Entity("repositories", { schema: "public" })
export class Repositories {
  @PrimaryGeneratedColumn({ type: "integer", name: "repo_id" })
  repoId: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "size", nullable: true })
  size: string | null;

  @Column("timestamp without time zone", { name: "created_time" })
  createdTime: Date;

  @Column("character varying", { name: "url" })
  url: string;

  @OneToMany(() => Services, (services) => services.repo)
  services: Services[];

  @ManyToOne(() => Users, (users) => users.repositories)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
