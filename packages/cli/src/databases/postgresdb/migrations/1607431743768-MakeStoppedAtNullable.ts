import {MigrationInterface, QueryRunner} from "typeorm";

import * as config from '../../../../config';

export class MakeStoppedAtNullable1607431743768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const tablePrefix = config.get('database.tablePrefix');
      await queryRunner.query('ALTER TABLE `' + tablePrefix + 'execution_entity` ALTER COLUMN `stoppedAt` DROP NOT NULL', undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      // Cannot be undone as column might already have null values
    }

}