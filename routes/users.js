var express = require('express');
var router = express.Router();
let crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/digital-signal', (req, res, next) => {
  let {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'der'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'der'
    }
  });

  res.send({ 
    publicKey: publicKey.toString('base64'), 
    privateKey: privateKey.toString('base64'),
  });
})

router.post('/sign', (req, res) => {
  let data = req.body.data;
  let privateKey = req.body.privateKey;

  privateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKey, 'base64'),
    type: 'pkcs8',
    format: 'der'
  })

  const sign = crypto.createSign('SHA256');
  sign.update(data);
  sign.end();
  const signature = sign.sign(privateKey).toString('base64');
  res.send({signature, data});
})

router.post('/verify', (req, res) => {
  let { data, publicKey, signature } = req.body;

  publicKey = crypto.createPublicKey({
    key: Buffer.from(publicKey, 'base64'),
    type: 'spki',
    format: 'der'
  })

  const verify = crypto.createVerify('SHA256');
  verify.update(data);
  verify.end();

  const result = verify.verify(publicKey, Buffer.from(signature, 'base64'));

  res.send({ verify: result }); 
})

module.exports = router;
