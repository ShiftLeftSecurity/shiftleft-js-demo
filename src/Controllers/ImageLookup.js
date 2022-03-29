const fs = require("fs");
const { logger } = require("../Logger");

class ImageLookup {
  get(req, res) {
    /* File Traversal exploit */
    /* Can read any file in the server by passing the filename (image) in the query params */
    /* ex: http GET http://localhost:8089/api/v1/image-lookup image=="package.json" */
    const fileContent = fs.readFileSync(req.query.image).toString();
    logger.debug(fileContent);
    res.send(fileContent);
  }
}
// back to original
module.exports = ImageLookup;
