const express = require('express');
const router = express.Router();
const userAPIController = require('../../controllers/api/userApi');

//Listado de nft
router.get('/', userAPIController.list);
//Detalle de nft
router.get('/:id', userAPIController.detail);

module.exports = router;