import { Controller, Get, Module } from '@nestjs/common';
import { TelefoneService } from '../services/telefone.service';

@Controller('telefones')
export class TelefoneController {
  constructor(private readonly service: TelefoneService) {}
}
