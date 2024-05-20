const puppeteer = require("puppeteer");

const getIndex = async (req, res, next) => {
  res.render("index", { title: "Pupeteer get" });
};

const postIndex = async (req, res, next) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("test");

  // Navigate the page to a URL
  await page.goto("https://developer.chrome.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(".devsite-search-field", "automate beyond recorder");

  // Wait and click on first result
  const searchResultSelector = ".devsite-result-item-link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );
  const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();

  res.render("index", { title: fullTitle });
};

module.exports = { getIndex, postIndex };
