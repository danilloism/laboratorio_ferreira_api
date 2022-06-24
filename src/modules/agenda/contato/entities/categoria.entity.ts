import { Exclude } from 'class-transformer';
import { ContatoEntity } from 'src/modules/agenda/contato/entities/contato.entity';
import { BaseEntity, BaseEntityParams } from 'src/modules/common/entities/base.entity';

export interface CategoriaParams extends BaseEntityParams {
	nome?: string;
	contatos?: ContatoEntity[];
}

export class CategoriaEntity extends BaseEntity {
	constructor( params?: CategoriaParams ) {
		const { uid, criadoEm, atualizadoEm, ativo, ...thisParams } = params;
		super( { uid, criadoEm, atualizadoEm, ativo } );
		Object.assign( this, thisParams );
	}

	public nome?: string;
	@Exclude()
	public contatos?: ContatoEntity[];
}
