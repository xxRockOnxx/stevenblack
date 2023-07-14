const fs = require("fs");
const path = require("path");
const readline = require("readline");

const hostsPath = path.join(__dirname, "hosts");

module.exports = function isBlacklisted(domain) {
  const stream = fs.createReadStream(hostsPath);

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  return new Promise((resolve, reject) => {
    let found = false;

    rl.on("line", (line) => {
      if (domain.startsWith(line)) {
        found = true;
        rl.close();
      }
    })
      .on("close", () => {
        resolve(found);
      })
      .on("error", (e) => {
        reject(e);
      });
  });
};
