import { registerAs } from '@nestjs/config';

export default registerAs('encryption', () => ({
  jwtSecret: process.env.JWT_SECRET,
  uuidName: process.env.UUID_NAME,
  uuidNamespace: process.env.UUID_NAMESPACE,
  saltKey: parseInt(process.env.SALT_KEY),
}));
