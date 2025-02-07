const express = require("express");
const router = express.Router();
const api = require("./api/api");
const views = require("./view");

router.use('/api',api);
router.use('/',views)


module.exports = router;