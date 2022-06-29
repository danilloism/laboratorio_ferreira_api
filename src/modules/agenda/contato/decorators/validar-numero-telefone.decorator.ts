import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function ValidarNumeroTelefone(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidarNumeroTelefone',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
          const valorComoString = value.toString();
          const valorFinal = parseInt(value, 10).toString();

          return valorFinal.length == 9;
        },
      },
    });
  };
}
