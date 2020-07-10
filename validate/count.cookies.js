module.exports.countCookies = function(req, res, next) {
  if (req.cookies && typeof req.cookies["count"] === "undefined") {
    res.cookie('count', '1');
  } else {
    const plusCookie = parseInt(req.cookies.count) + 1;
    res.cookie('count', `${plusCookie}`);
  }
  next();
}