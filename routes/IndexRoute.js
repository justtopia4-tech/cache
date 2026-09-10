// importing necessary modules
const router = require("express").Router();

// setting the route
router.get("/", (req, res) => {
    res.send("OSM BY NOPYSOURCE ACTIVE");
});

// exporting the router
module.exports = router;