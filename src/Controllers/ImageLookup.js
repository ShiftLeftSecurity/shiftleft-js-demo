const fs = require("fs");
const { logger } = require("../Logger");

class ImageLookup {
  get(req, res) {
	import fs from 'fs';
	import path from 'path';
	import logger from '../logger';

	function get(req, res) {
	  try {
	    /* Validate and escape the input to prevent directory traversal */
	    const sanitizedFileName = sanitizeInput(req.query.image);

	    /* Read the file from the sanitized file name */
	    const filePath = path.join(__dirname, '..', 'uploads', sanitizedFileName);
	    const fileContent = fs.readFileSync(filePath).toString();

	    /* Log the file content and send it back to the client */
	    logger.debug(fileContent);
	    res.send(fileContent);
	  } catch (error) {
	    /* Handle any errors that occur during the file reading process */
	    logger.error(error);
	    res.status(500).send('An error occurred while trying to read the file.');
	  }
	}

	function sanitizeInput(input) {
	  /* Replace any characters that could be used for directory traversal */
	  return input.replace(/[\.\/\\]/g, '');
	}


module.exports = ImageLookup;

