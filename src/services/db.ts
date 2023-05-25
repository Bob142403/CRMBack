import { DataSource } from 'typeorm'
import { CreateMigration1566993933807 } from '../migrations/1566993933807-CreateMigration'

export const myDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Iwanttoplaym0ba',
  database: 'CRM',
  entities: ['src/entity/*.entity.ts'],
  logging: true,
  migrationsRun: true,
  migrations: [CreateMigration1566993933807],
})

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })
