import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CpfCnpjValidator {
  static validar(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.replace(/\D/g, ''); // Remove não numéricos

    if (!value) {
      return { required: true };
    }

    if (value.length === 11) {
      return CpfCnpjValidator.validarCPF(value) ? null : { cpfInvalido: true };
    } else if (value.length === 14) {
      return CpfCnpjValidator.validarCNPJ(value) ? null : { cnpjInvalido: true };
    } else {
      return { tamanhoInvalido: true };
    }
  }

  private static validarCPF(cpf: string): boolean {
    let sum = 0;
    let remainder;

    if (cpf === '00000000000') return false;

    for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return false;

    return true;
  }

  private static validarCNPJ(cnpj: string): boolean {
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers[length - i]) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits[0])) return false;

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers[length - i]) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits[1])) return false;

    return true;
  }
}
