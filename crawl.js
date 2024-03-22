function normalizeURL(url) {
    const urlObject = new URL(url);
    let path = urlObject.pathname;
    if (path[path.length - 1] === '/') {
        path = path.slice(0, -1);
    }
    return urlObject.hostname + path;
}

module.exports = {
    normalizeURL
}


function getURLsFromHTML(htmlStr) {
    
}