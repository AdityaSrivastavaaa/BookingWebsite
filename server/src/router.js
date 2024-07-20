const Amadeus = require("amadeus");
const express = require("express");
const router = express.Router();
const { CLIENT_ID, CLIENT_SECRET } = require('./config');

const amadeus = new Amadeus({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET
});

router.get(`/api/airports`, async (req, res) => {
  const { page, subType, keyword } = req.query;
  
  try {
    const response = await amadeus.client.get("/v1/reference-data/locations", {
      keyword,
      subType,
      "page[offset]": page * 10
    });
    
    res.json(JSON.parse(response.body));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
