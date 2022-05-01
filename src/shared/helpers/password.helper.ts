import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  static readonly encrypt = async (senha: string) =>
    await bcrypt.hash(senha, parseInt(process.env.SALT_KEY));
}
