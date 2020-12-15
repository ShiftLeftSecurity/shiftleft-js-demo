const Login = require('./Controllers/Login');
const order = require('./Controllers/Order');
const ImageLookup = require('./Controllers/ImageLookup');

const login = new Login();
const imageLookup = new ImageLookup();

const API_PREFIX = '/api/v1';

// This is not a real secret, I just want to trigger a new finding
const SECRET = 'gBVD4XWQ//6nxp+SKeTx1BwuCabUx/dTwHJiJ7aaSmg='

module.exports = app => {
  app.get(`${API_PREFIX}/image-lookup`, imageLookup.get);

  app.post(`${API_PREFIX}/login`, (...args) => login.login(...args));
  app.get(`${API_PREFIX}/logout`, (req, res) =>
    req.session.destroy(() => res.redirect('/login'))
  );

  app.post(`${API_PREFIX}/order`, (...args) => order.addToOrder(...args));
  app.post(`${API_PREFIX}/order/checkout`, (...args) =>
    order.checkout(...args)
  );
  app.delete(`${API_PREFIX}/order`, (...args) => order.removeOrder(...args));
};
