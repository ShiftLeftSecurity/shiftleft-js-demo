const DB_PASSWORD = 'This is a fake key';
const CREDIT_CARD_NUMBER_REGEX_STR =
  "\\b(?:4[ -]*(?:\\d[ -]*){11}(?:(?:\\d[ -]*){3})?\\d|" +
  "(?:5[ -]*[1-5](?:[ -]*\\d){2}|(?:2[ -]*){3}[1-9]|(?:2[ -]*){2}[3-9][ -]*" +
  "\\d|2[ -]*[3-6](?:[ -]*\\d){2}|2[ -]*7[ -]*[01][ -]*\\d|2[ -]*7[ -]*2[ -]*0)(?:[ -]*" +
  "\\d){12}|3[ -]*[47](?:[ -]*\\d){13}|3[ -]*(?:0[ -]*[0-5]|[68][ -]*\\d)(?:[ -]*" +
  "\\d){11}|6[ -]*(?:0[ -]*1[ -]*1|5[ -]*\\d[ -]*\\d)(?:[ -]*" +
  "\\d){12}|(?:2[ -]*1[ -]*3[ -]*1|1[ -]*8[ -]*0[ -]*0|3[ -]*5(?:[ -]*" +
  "\\d){3})(?:[ -]*\\d){11})\\b";
const CREDIT_CARD_NUMBER_REGEX = new RegExp(CREDIT_CARD_NUMBER_REGEX_STR);
const CREDIT_CARD_NUMBER_MASK = "**hidden cc data***";

const JWT_REGEX_STR = "Bearer [A-Za-z0-9\\-\\._~\\+\\/]+=*";
const JWT_REGEX = new RegExp(JWT_REGEX_STR);
const JWT_MASK = "xxx.xxx.xxx";

const CVV_REGEX_STR = "CVV:[0-9]{3}";
const CVV_REGEX = new RegExp(CVV_REGEX_STR);
const CVV_MASK = "**hiden cvv**";

const allRedactions = [
  {
    regex: CREDIT_CARD_NUMBER_REGEX,
    mask: CREDIT_CARD_NUMBER_MASK
  },
  {
    regex: JWT_REGEX,
    mask: JWT_MASK
  },
  {
    regex: CVV_REGEX,
    mask: CVV_MASK
  }
];

const matchToRedact = (str, regex, mask) => {
  if (str && str.replace) {
    return str.replace(regex, mask);
  }
  return str;
};

const redact = str => {
  let newStr = str;
  for (let index = 0; index < allRedactions.length; index += 1) {
    const { regex, mask } = allRedactions[index];
    newStr = matchToRedact(newStr, regex, mask);
  }
  return newStr;
};

module.exports = {
  redact
};
