const { argv } = require("node:process");
const { crawlPage } = require("./crawl");

async function main() {
  if (argv.length < 3 || argv.length > 3) {
    console.log("Invalid number of arguments. Usage: node main.js <URL>");
    process.exit(1);
  }

  console.log(`Crawling ${argv[2]}`);

  await crawlPage(argv[2]);
}

main();
