const fs = require("fs");
const { logger } = require("../Logger");

class ImageLookup {
  get(req, res) {
	const fs = require('fs');
	const path = require('path');
	const logger = require('./logger');

	function get(req, res) {
    /* File Traversal exploit */
    /* Can read any file in the server by passing the filename (image) in the query params */
    /* ex: http GET http://localhost:8089/api/v1/image-lookup image=="package.json" */
    
    /* Step 1: Validate the input */
    if (!req.query.image) {
      return res.status(400).send('Missing image parameter');
    }

    /* Step 2: Sanitize the input */
    /* This is a basic sanitization to prevent directory traversal attacks */
    const sanitizedImage = path.normalize(req.query.image).replace(/^(\.\.(\/|\\|$))+/, '');

    /* Step 3: Use the sanitized input to read the file */
    const filePath = path.join(__dirname, sanitizedImage);
    try {
      const fileContent = fs.readFileSync(filePath).toString();
      logger.debug(fileContent);
      res.send(fileContent);
    } catch (error) {
      /* Handle the error appropriately */
      res.status(500).send('Error reading file');
    }
	}


module.exports = ImageLookup;

