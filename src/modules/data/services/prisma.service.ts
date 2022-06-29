import { INestApplication, Inject, Injectable, LoggerService, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
	implements OnModuleInit, OnModuleDestroy {
	constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {
		super({
			log: [
				{
					level: 'query',
					emit: 'event',
				},
				{
					level: 'info',
					emit: 'event',
				},
				{
					level: 'warn',
					emit: 'event',
				},
				{
					level: 'error',
					emit: 'event',
				},
			],
		});

		this.$on('query', (e) => {
			const query = `Query: ${ e.query }`;
			const params = `Params: ${ e.params }`;
			const duration = `Duration: ${ e.duration }ms`;
			const target = `Target: ${ e.target }`;
			const timestamp = `Date: ${ e.timestamp }`;
			this.logger.log(`\n${ query }\n${ params }\n${ duration }\n${ target }\n${ timestamp }`);
		});

		this.$on('info', (e) => {
			const message = `Message: ${ e.message }`;
			const target = `Target: ${ e.target }`;
			const timestamp = `Date: ${ e.timestamp }`;
			this.logger.debug(`\n${ message }\n${ target }\n${ timestamp }`);
		});

		this.$on('warn', (e) => {
			const message = `Message: ${ e.message }`;
			const target = `Target: ${ e.target }`;
			const timestamp = `Date: ${ e.timestamp }`;
			this.logger.warn(`\n${ message }\n${ target }\n${ timestamp }`);
		});

		this.$on('error', (e) => {
			const message = `Message: ${ e.message }`;
			const target = `Target: ${ e.target }`;
			const timestamp = `Date: ${ e.timestamp }`;
			this.logger.error(`\n${ message }\n${ target }\n${ timestamp }`);
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
