import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '../../usuario/usuario.services';
import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
				providers: [ AuthService, UsuarioService, JwtService ],
			})
			.overrideProvider(UsuarioService)
			.useValue({})
			.overrideProvider(JwtService)
			.useValue({})
			.compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
