const { JSDOM } = require("jsdom");

function normalizeURL(url) {
  const urlObject = new URL(url);
  let path = urlObject.pathname;
  if (path[path.length - 1] === "/") {
    path = path.slice(0, -1);
  }
  return urlObject.hostname + path;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");
  for (const anchor of anchors) {
    try {
      if (anchor.href.slice(0, 1) === "/") {
        urls.push(new URL(anchor.href, baseURL).href);
      } else {
        urls.push(new URL(anchor.href).href);
      }
    } catch (e) {
      console.log(`${e.message} ${anchor.href}`);
    }
  }
  return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
  const baseDomain = new URL(baseURL).hostname;
  const currentDomain = new URL(currentURL).hostname;

  if (baseDomain !== currentDomain) {
    return pages;
  }

  const currentURLNormalized = normalizeURL(currentURL);
  if (currentURLNormalized in pages) {
    pages[currentURLNormalized]++;
    return pages;
  }
  pages[currentURLNormalized] = 1;

  console.log(`Crawling ${currentURL}`);
  let htmlBody = "";
  try {
    const res = await fetch(currentURL);
    if (res.status !== 200) {
      console.log(`Error fetching ${currentURL}: ${res.status}`);
      return pages;
    }
    if (!res.headers.get("Content-Type").includes("text/html")) {
      console.log(`Skipping ${currentURL}: not an HTML page`);
      return pages;
    }
    htmlBody = await res.text();
  } catch (e) {
    console.log(`Error fetching ${currentURL}: ${e.message}`);
  }
  const urls = getURLsFromHTML(htmlBody, baseURL);
  for (const url of urls) {
    pages = await crawlPage(baseURL, url, pages);
  }
  return pages;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
