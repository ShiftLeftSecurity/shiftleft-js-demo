// Checked in with propesed fix as master branch scan

const fs = require("fs");
const { logger } = require("../Logger");

class ImageLookup {
  get(req, res) {
    /* File Traversal exploit */
    /* Can read any file in the server by passing the filename (image) in the query params */
    /* ex: http GET http://localhost:8089/api/v1/image-lookup image=="package.json" */
    const fileContent = fs.readFileSync(req.query.image).toString();

    // ************************************************** Vulnerable Code Block *****
 
    logger.debug(fileContent);
    res.send(fileContent);
  }   

}

module.exports = ImageLookup;

/*
    // ************************************************** Remediated Code Block *****

    sanitizedStr = sanitizeString(fileContent)
    logger.debug(sanitizedStr);
    res.send(sanitizedStr);

  }
  
}
  function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
  }

module.exports = ImageLookup;
*/
