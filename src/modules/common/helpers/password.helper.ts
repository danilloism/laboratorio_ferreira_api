import * as bcrypt from 'bcrypt';
import { v5 } from 'uuid';

// export class PasswordHelper {
//   constructor(private readonly senha: string) {}
//
//   private uuid = v5(process.env.UUID_NAME, process.env.UUID_NAMESPACE);
//
//   async encrypt() {
//     const encrypted = await bcrypt.hash(
//       this.senha + this.uuid,
//       parseInt(process.env.SALT_KEY),
//     );
//
//     return encrypted;
//   }
//
//   async compare(senhaEncriptada: string) {
//     return await bcrypt.compare(this.senha + this.uuid, senhaEncriptada);
//   }
// }

export class PasswordHelper {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static async encrypt(senha: string) {
    return bcrypt.hash(senha + this.uuid(), parseInt(process.env.SALT_KEY));
  }

  static async compare(
    senha: string,
    senhaEncriptada: string,
  ): Promise<boolean> {
    return bcrypt.compare(senha + this.uuid(), senhaEncriptada);
  }

  private static readonly uuid = () =>
    v5(process.env.UUID_NAME, process.env.UUID_NAMESPACE);
}
