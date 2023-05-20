// const buf = Buffer.from("Hieu Dep Trai", 'utf-8'); //<Buffer 48 69 65 75 20 44 65 70 20 54 72 61 69>
// const buf = Buffer.from("Hieu Dep Trai", 'base64'); // <Buffer 1e 27 ae 0d ea 53 ad a8>
const buf = Buffer.from("Hieu Dep Trai", 'binary');
console.log('buf: ', buf, buf.toString('base64'));