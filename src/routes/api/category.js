const express = require('express');
const router = express.Router();
const categoryAPIController = require('../../controllers/api/categoryApi');

//Listado de nft
router.get('/', categoryAPIController.list);

module.exports = router;