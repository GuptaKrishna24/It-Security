const { snapshot } = require('react-snap');

(async () => {
  try {
    await snapshot({
      inlineCss: true,
      puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
      puppeteer: {
        timeout: 300000  // 5 minutes
      },
      include: ["/"],  // Only include the index page for pre-rendering
      minifyHtml: {
        collapseWhitespace: true,
        removeComments: true
      },
      removeBlobs: true,
      concurrency: 1  // Run one page at a time to avoid overwhelming the system
    });
    console.log('Snapshot completed successfully');
  } catch (error) {
    console.error('Snapshot error:', error);
  }
})();
