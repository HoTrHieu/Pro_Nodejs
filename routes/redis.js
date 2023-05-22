var express = require('express');
var router = express.Router();
const axios = require('axios');
const {client} = require('../helpers/connections_redis');
const POKEMON_API = process.env.POKEMON_API;
const PATH_POKEMON = '/ability/?limit=20&offset=20';
const TEST_KEY = 'POKEMON';
const MAP_KEY = 'MAP_POKEMON';
const FIELD_KEY = 'FIELD_POKEMON';

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

router.get('/hash-map', async(req, res, next) => {
  try {
    const currentPokemon = await client.hGetAll(MAP_KEY);
    if(currentPokemon && currentPokemon.pokemon) {
      console.log('currentPokemon: ', currentPokemon)
      res.status(200).json(JSON.parse(currentPokemon.pokemon));
    }else {
      const url = `${POKEMON_API}${PATH_POKEMON}`;
      const response = await axios.get(url);
      client.hSet(MAP_KEY, 'pokemon', JSON.stringify(response.data));
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

router.get('/hash-field', async(req, res, next) => {
  try {
    const currentPokemon = await client.hGetAll(FIELD_KEY);
    if(currentPokemon && currentPokemon.pokemon) {
      res.status(200).json(currentPokemon);
    }else {
      const url = `${POKEMON_API}${PATH_POKEMON}`;
      const response = await axios.get(url);
      client.hSet(FIELD_KEY, 'pokemon', "123");
      client.hSet(FIELD_KEY, 'check', "456");
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
