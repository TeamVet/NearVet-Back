import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'states_appointments',
})
export class StatesAppointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  state: string;
}
