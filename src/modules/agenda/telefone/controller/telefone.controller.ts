import { Controller } from '@nestjs/common';
import { TelefoneService } from '../service/telefone.service';

@Controller('telefones')
export class TelefoneController {
  constructor(private readonly service: TelefoneService) {}
}
