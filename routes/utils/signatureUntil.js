let crypto = require('crypto');
let privateKey = process.env.privateKey;
let privateKey2 = process.env.privateKey2;

exports.createSignature = (data) => {
  const originPrivateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKey, 'base64'),
    type: 'pkcs8',
    format: 'der'
  })

  
  const sign = crypto.createSign('SHA256');
  console.log('originPrivateKey: ', originPrivateKey, sign)
  sign.update(data);
  sign.end();
  const signature = sign.sign(originPrivateKey).toString('base64');  
  return signature;
}

// exports.verifySignature = (signature, data) => {
//   const originPublicKey = crypto.createPublicKey({
//     key: Buffer.from(publicKey, 'base64'),
//     type: 'spki',
//     format: 'der'
//   })

//   const verify = crypto.createVerify('SHA256');
//   verify.update(data);
//   verify.end();

//   return verify.verify(originPublicKey, Buffer.from(signature, 'base64'));
// }