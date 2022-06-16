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

export class PasswordHelperV2 {
  private readonly uuid = v5(process.env.UUID_NAME, process.env.UUID_NAMESPACE);

  static async encrypt(senha: string) {
    const encrypted = await bcrypt.hash(
      senha + new PasswordHelperV2().uuid,
      parseInt(process.env.SALT_KEY),
    );

    return encrypted;
  }

  static readonly compare = async (senha: string, senhaEncriptada: string) =>
    await bcrypt.compare(senha + new PasswordHelperV2().uuid, senhaEncriptada);
}
