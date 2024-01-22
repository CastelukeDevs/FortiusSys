const mailRegexValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordMinLength = 8;

type IValidationCaseEntries = {
  message: string;
  regex?: RegExp;
  test?: (e: string) => boolean;
};

type IValidationCase = {[key: string]: IValidationCaseEntries};

//List of validation case
const ValidationCases = {
  empty: {
    test: (e: string) => e.length >= 1,
    message: 'Tidak boleh kosong',
  },
  validMail: {
    test: (e: string) => mailRegexValidation.test(e),

    message: 'Email tidak valid',
  },
  length: {
    test: (e: string) => e.length > passwordMinLength,
    message: `Harus lebih dari ${passwordMinLength} karakter`,
  },
  uppercase: {regex: /[A-Z]/, message: 'Minimal satu huruf besar'},
  lowercase: {regex: /[a-z]/, message: 'Minimal satu huruf kecil'},
  number: {regex: /[0-9]/, message: 'Minimal satu angka'},
  special: {regex: /[^A-Za-z0-9]/, message: 'Minimal satu symbol'},
} as const satisfies IValidationCase;

type IValidationCaseName = keyof typeof ValidationCases;

type IValidationContent = {[key: string]: IValidationCaseName[]};

//List of validation mode / type with what it validate down the line
const ValidationContent = {
  password: ['length', 'lowercase', 'uppercase', 'number', 'special'],
  email: ['empty', 'validMail'],
  name: ['empty'],
} as const satisfies IValidationContent;

type IValidationMode = keyof typeof ValidationContent;

/**
 * Validate input and return failure validation message
 * @requires text string
 * @param mode default 'name' validation
 * @returns string[]
 */
export default (text: string, mode?: IValidationMode): string[] => {
  const selectedCase: IValidationCaseEntries[] = ValidationContent[
    mode || 'name'
  ].map(key => ValidationCases[key]);
  const validTest = selectedCase.flatMap(({test, regex, message}) => {
    const isValid = test?.(text) || regex?.test(text);
    return isValid ? [] : message;
  });
  return validTest;
};
