import * as bcrypt from 'bcrypt';
import { v5 } from 'uuid';

export class PasswordHelper {
  constructor(private readonly senha: string) {}
  private uuid = v5(process.env.UUID_NAME, process.env.UUID_NAMESPACE);

  async encrypt() {
    const encrypted = await bcrypt.hash(
      this.senha + this.uuid,
      parseInt(process.env.SALT_KEY),
    );

    return encrypted;
  }

  async compare(senhaEncriptada: string) {
    return await bcrypt.compare(this.senha + this.uuid, senhaEncriptada);
  }
}
