import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BlogComment {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column("int")
  test!: number;
}
