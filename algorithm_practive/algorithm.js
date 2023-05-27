const listRoman = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
}

const convertRoman = (strRoman) => {
  let value = 0;
  const listCharRoman = strRoman.split('');
  for(let i = 0; i< listCharRoman.length; i++) {

    if(listCharRoman[i] < listCharRoman[i+1]) {
      value -= listRoman[listCharRoman[i]];
    } else {
      value += listRoman[listCharRoman[i]];
    }
  }
  
  return value;
}

const value = convertRoman('XIV');
console.log(value);