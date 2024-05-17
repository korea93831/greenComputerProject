const express = require('express');
const router = express.Router();
const { getTreeAnalysis } = require('../controller/interpretationtree');

router.get('/tree-analysis', getTreeAnalysis);

module.exports = router;