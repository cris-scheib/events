const fs = require("fs");
const moment = use("moment");

const Logger = async (level, event, auth, description = null) => {
  const user = auth === null ? null : (await auth.getUser()).id;
  const line = `[${moment().format()}] => {level: ${level}, event:${event}, user: ${user}, description:${description}}`;
  fs.writeFileSync("./storage/logs/log.log", line);
};

module.exports = Logger;
