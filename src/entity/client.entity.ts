import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('clients')
export class Clients {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  first_name!: string

  @Column()
  last_name!: string

  @Column()
  email!: string

  @Column()
  phone_number!: string

  @Column()
  address!: string
  
  @Column()
  company_id!: number
}
