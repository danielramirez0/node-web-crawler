const { argv } = require("node:process");
const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  if (argv.length < 3 || argv.length > 3) {
    console.log("Invalid number of arguments. Usage: node main.js <URL>");
    process.exit(1);
  }

  const baseURL = process.argv[2];
  const currentURL = process.argv[2];
    const pages = {};

  console.log(`Crawling ${baseURL}`);

  const links = await crawlPage(baseURL, currentURL, pages);
  printReport(links);
}

main();
