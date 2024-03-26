function printReport(pages) {
  console.log("Report Start:");
  const sortedPages = Object.entries(pages).sort((a, b) => b[1] - a[1]);
  for (const [url, count] of sortedPages) {
    console.log(`Found ${count} links to ${url}`);
  }
}

module.exports = {
  printReport,
};
