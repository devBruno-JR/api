import { MigrationInterface, QueryRunner, Table } from "typeorm";
export class CreateuserTable1744588284160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'users',
                columns:[
                    {
                        name:'cli_id',
                        type:'int',
                        isPrimary:true,
                        isGenerated: true,
                        generationStrategy : 'increment'
                    },
                    {
                        name:'name',
                        type: 'varchar'
                    },
                    {
                        name:'email',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name:'password',
                        type: 'varchar',
                    },
                    {
                        name:'profile_picture',
                        type:'varchar',
                        isNullable: true
                    },
                    {
                        name:'created_at',
                        type:'timestamp',
                        default:'now()'
                    },
                    {
                        name:'upgate_at',
                        type:'timestamp',
                        default:'now()',
                        onUpdate:'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users')
    }

}
