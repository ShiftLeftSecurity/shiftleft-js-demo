const { redact } = require("../Constants");
class Logger {
  log(str) {
    console.log(redact(str));
  }

  info(str) {
    console.info(redact(str));
  }

  debug(str) {
    console.debug(redact(str));
  }

  error(str) {
    console.error(redact(str));
  }

  warn(str) {
    console.warn(redact(str));
  }
}

module.exports = Logger;
