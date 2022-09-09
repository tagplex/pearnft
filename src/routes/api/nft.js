const express = require('express');
const router = express.Router();
const nftAPIController = require('../../controllers/api/nftApi');

//Listado de nft
router.get('/', nftAPIController.list);
//UltimoNFT
router.get('/last', nftAPIController.listNFT)
//Detalle de nft
router.get('/:id', nftAPIController.detail);


module.exports = router;