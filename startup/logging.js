const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const config = require("config");

module.exports = function () {
  winston.add(
    new winston.transports.Console({ colorize: true, prettyPrint: true })
  );
  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
    })
  );
  winston.add(
    new winston.transports.MongoDB({
      db: config.get("log"),
      level: "info",
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
  );
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "combined.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
