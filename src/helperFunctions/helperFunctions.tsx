/* Currency */
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'SEK',
  style: 'currency',
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
/** */

/* CheckOutPage */
export const getInputType = (str: string) => {
  if (str === 'card_expiration') return 'date';
  if (str === 'email') return 'email';
  return 'text';
};

export const getPattern = (str: string) => {
  let regexResult;
  switch (str) {
    case 'name_on_card':
      regexResult = {
        pattern: '[a-zA-ZäöåÄÖÅ ]{2,}',
        title: 'only letters and spaces eg. John Doe',
      };
      break;
    case 'address':
      regexResult = {
        pattern: '[a-zA-ZäöåÄÖÅ0-9. ]{2,}',
        title: 'accepts letters,numbers . and spaces',
      };
      break;
    case 'city' || 'state':
      regexResult = { pattern: '[a-zA-ZäöåÄÖÅ]{2,}', title: 'letters only' };
      break;
    case 'postal_code':
      regexResult = { pattern: '[0-9 -]{2,}', title: 'numbers,spaces and -' };
      break;
    case 'email':
      regexResult = undefined;
      break;
    case 'phone_number':
      regexResult = { pattern: '[0-9]{2,}', title: 'numbers only' };
      break;
    case 'card_number':
      regexResult = { pattern: '[0-9]{15,16}', title: 'numbers only min 15, max 16' };
      break;
    case 'card_expiration':
      regexResult = undefined;
      break;
    case 'cvv':
      regexResult = { pattern: '[0-9]{3,4}', title: 'numbers only min 3 max 4' };
      break;
    case 'first_name':
      regexResult = { pattern: '[a-zA-ZäöåÄÖÅ]{2,}', title: 'letters only, eg. John' };
      break;
    case 'last_name':
      regexResult = { pattern: '[a-zA-ZäöåÄÖÅ]{2,}', title: 'letters only, eg. Doe ' };
      break;

    default:
      regexResult = undefined;
      break;
  }
  return regexResult;
};
