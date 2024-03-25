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

async function crawlPage(currentURL) {
  try {
    const res = await fetch(currentURL);
    if (res.status !== 200) {
      console.log(`Error fetching ${currentURL}: ${res.status}`);
      return;
    }
    if (!res.headers.get("Content-Type").includes("text/html")) {
      console.log(`Skipping ${currentURL}: not an HTML page`);
      return;
    }
    console.log(await res.text());
  } catch (e) {
    console.log(`Error fetching ${currentURL}: ${e.message}`);
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
