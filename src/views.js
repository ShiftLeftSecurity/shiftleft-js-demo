const secured = require('./Controllers/Secured');

module.exports = app => {
  // Exploits app Env
  app.get('/env', (req, res) => {
    console.log(app.get(req.query.lookup));
    res.send(app.get(req.query.lookup));
  });
  app.get(`/login`, (req, res) => res.render('Login'));

  app.get(`/user-input`, (req, res) => {
[
  // Input validation middleware
  query('userInput')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Input must be a string with maximum 500 characters')
],
(req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('UserInput', {
      userInput: '',
      result: 'Invalid input provided',
      date: new Date().toUTCString(),
      error: errors.array()[0].msg
    });
  }

  // Sanitize user input to prevent XSS
  const sanitizedInput = DOMPurify.sanitize(req.query.userInput || '', {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });

  // Safe result processing - NEVER use eval()
  // Instead, display the sanitized input as-is or process it safely
  let result = '';
  
  if (sanitizedInput) {
    // If you need to perform calculations or operations, use a safe parser
    // For demonstration, we're just echoing the sanitized input
    result = `Received input: ${sanitizedInput}`;
    
    // Alternative: Use a safe expression evaluator library like 'expr-eval'
    // or implement specific, controlled operations based on business logic
  } else {
    result = 'No input provided';
  }

  // Render with sanitized data
  res.render('UserInput', {
    userInput: sanitizedInput,
    result: result,
    date: new Date().toUTCString()
  });
}

  });

  app.get(`/`, secured.get);
  app.post(`/`, secured.post);
};
