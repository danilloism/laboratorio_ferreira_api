import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v5 } from 'uuid';
import encryptionConfig from '../../../config/encryption.config';

@Injectable()
export class PasswordService {
  constructor(
    @Inject(encryptionConfig.KEY)
    private encryptConfig: ConfigType<typeof encryptionConfig>,
  ) {}
  private readonly uuid = () =>
    v5(this.encryptConfig.uuidName, this.encryptConfig.uuidNamespace);

  encrypt(senha: string) {
    return bcrypt.hash(senha + this.uuid(), this.encryptConfig.saltKey);
  }

  async compare(senha: string, senhaEncriptada: string): Promise<boolean> {
    return bcrypt.compare(senha + this.uuid(), senhaEncriptada);
  }
}
