const fs = require("fs");
const readline = require("readline");

async function assertHostsFile() {
  try {
    await fs.promises.stat("./hosts");
  } catch (e) {
    throw new Error("Hosts file not found");
  }
}

module.exports = async function (domain) {
  await assertHostsFile();

  const stream = fs.createReadStream("./hosts");

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (domain.startsWith(line)) {
      return true;
    }
  }

  return false;
};
