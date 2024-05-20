const puppeteer = require("puppeteer");

const getIndex = async (req, res, next) => {
  res.render("index", { title: "Pupeteer get" });
};

const postIndex = async (req, res, next) => {
  const { userInput } = req.body;

  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://developer.chrome.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(".devsite-search-field", userInput);

  // Wait and click on first result
  const searchNavResultSelector = ".devsite-result-item-link";
  await page.waitForSelector(searchNavResultSelector);
  await page.click(searchNavResultSelector);

  // Wait for the search results to load and display
  const searchResultSelector = ".gsc-results .gsc-webResult a.gs-title";
  await page.waitForSelector(searchResultSelector);

  // Get the first search result's title and URL
  const firstResult = await page.evaluate(() => {
    const resultElement = document.querySelector(
      ".gsc-results .gsc-webResult a.gs-title"
    );
    if (resultElement) {
      return {
        title: resultElement.textContent.trim(),
        url: resultElement.href,
      };
    }
    return null;
  });

  console.log("firstResult", firstResult);

  await browser.close();

  res.render("output", { title: firstResult.title, link: firstResult.url });
};

module.exports = { getIndex, postIndex };
