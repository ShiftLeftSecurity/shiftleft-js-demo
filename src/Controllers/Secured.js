class SecuredController {
  get(req, res) {
    if (
      req.session &&
      req.session.user &&
      req.session.user.role !== "employee"
    ) {
      res.set("Content-Type", "text/html");
      console.log(req.session);

      res.render("SecureGet", {
        user: req.session.user,
        date: new Date().toLocaleDateString()
      });
    } else {
      console.log("redirect");
      res.locals.error = "Unauthorized";
      res.redirect("/login");
    }
  }

  post(req, res) {
    console.log("post");
    return this.get(req, res);
  }
}

module.exports = new SecuredController();
