const isValid = require("is-valid-domain");
const whois = require("whois-json");

exports.verifyDomain = async (req, res) => {
  var domain = req.body.domain;
  var results = await whois(domain);
  if (results.domainName) {
    res.json({
      status: "success",
      data: results,
    });
  } else {
    res.json({
      status: "failed",
      message: "Domain is unavailable",
    });
  }
};
