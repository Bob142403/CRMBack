import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string
}
