import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersMigration1566993933806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `clients` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(36) NOT NULL, `last_name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `phone_number` varchar(255) NOT NULL, `address` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `first_name` varchar(36) NOT NULL, `last_name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE `users`");
    await queryRunner.query("DROP TABLE `clients`");
  }
}
