var express = require('express');
var router = express.Router();
const axios = require('axios');
const {client} = require('../helpers/connections_redis');
const POKEMON_API = process.env.POKEMON_API;
const PATH_POKEMON = '/ability/?limit=20&offset=20';
const TEST_KEY = 'POKEMON';

const tJson = {
  hieu: 'dep trai',
  age: 18
}

router.get('/', async(req, res, next) => {
  try {
    const currentPokemon = await client.get(TEST_KEY);
    if(currentPokemon) {
      res.status(200).json(JSON.parse(currentPokemon));
    }else {
      const url = `${POKEMON_API}${PATH_POKEMON}`;
      const response = await axios.get(url);
      client.set(TEST_KEY, JSON.stringify(response.data));
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log('error: ', error)
    res.status(404).json({
      code: -1,
      message: 'fuck'
    });
  }
});

module.exports = router;
