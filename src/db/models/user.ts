import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
@Entity('users')
export class User {
    @PrimaryGeneratedColumn({ name: 'cli_id' })
    id: number

    @Column()
    name:string

    @Column({ unique: true, name: 'email' })
    email: string

    @Column()
    password: string

    @Column({ nullable: true, name: 'profile_picture' })
    profilePicture?: string

    @CreateDateColumn({ name: 'created_at' })
    createAd: Date


    @UpdateDateColumn({ name: 'upgate_at' })
    upgateAt: Date
}

