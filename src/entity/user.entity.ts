import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  first_name!: string

  @Column()
  last_name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  company_id!: number

  @Column()
  role!: string
}
