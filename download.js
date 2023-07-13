const fs = require("fs");
const readline = require("readline");
const fetch = require("node-fetch");

const FILE_URL =
  "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/porn/hosts";

fetch(FILE_URL)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Response is not OK");
    }

    return res.body;
  })
  .then((body) => {
    return new Promise((resolve) => {
      const fileStream = fs.createWriteStream("./hosts");

      const rl = readline.createInterface({
        input: body,
        crlfDelay: Infinity,
      });

      let start = false;

      rl.on("line", (line) => {
        if (line.startsWith("# Start StevenBlack")) {
          start = true;
          return;
        }

        if (!start) {
          return;
        }

        if (!line.startsWith("0.0.0.0 ")) {
          return;
        }

        const domain = line.split(" ")[1];

        fileStream.write(domain + "\n");
      });

      rl.on("close", () => {
        fileStream.close();
        resolve();
      });
    });
  });
