var express = require('express');
var router = express.Router();
let crypto = require('crypto');
const { createSignature, createMultipleSignature } = require('./utils/signatureUntil');
const axios = require('axios');

router.post('/get-info', async(req, res) => {
  let data = req.body.data;
  const signature = createSignature(data.toString());
  
  try {
    const response = await axios.post('http://localhost:4000/users/detail', {
      data: data,
      signature: signature
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('response: ', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log('error: ', error);
    res.status(404).json({
      code: -1,
      message: 'fuck'
    });
  }
})

module.exports = router;
