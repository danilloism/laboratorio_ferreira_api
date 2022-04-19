import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultEntity {
  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  ultimaModificacao: Date;
}

export class DefaultEntityWithId extends DefaultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
