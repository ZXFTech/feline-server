import {
  Entity,
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
} from "typeorm";
import { BlogComment } from "./comment";

@Entity()
export default class Blog {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    length: 100,
  })
  title!: string;
  @Column()
  author!: string;
  @Column()
  content!: string;
  @Column()
  tags!: string;
  @CreateDateColumn()
  @Column()
  likes!: number;
}
