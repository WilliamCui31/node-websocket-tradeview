const dayTime = 1000 * 60 * 60 * 24; //1天；
const hourTime = 1000 * 60 * 60;
const minuteTime = 1000 * 60;
const secondTime = 1000;
const vnum = 2554477;

const setRandomValue = (integerNum, decimalNum) => {
  let randomNum = Math.random() * Math.pow(10, integerNum) + Math.pow(10, integerNum);
  // 整数部分
  let integerPart = 0;
  if (integerNum) {
    integerPart = Math.floor(randomNum);
  }
  //  小数部分
  let decimalPart = 0.0;
  if (decimalNum) {
    decimalPart = randomNum
      .toString()
      .split('.')[1]
      .substring(0, decimalNum);
    decimalPart = '0.' + decimalPart;
    decimalPart = parseFloat(decimalPart);
  }
  return integerPart + decimalPart;
};
/**
 *
 * @param {*长度} length
 * @param {*从第几位开始} startLength
 */
let setRandomData = params => {
  let { step, length, type, increasingNum, startTime, endTime } = params;
  let num = '';
  let time = '';
  const klineData = [];
  for (let i = 0; i < length; i++) {
    num = setRandomValue(2, 2);

    if (type === 'front') {
      time = Math.floor((endTime - step * (i + 1)) / 1000);
    } else if (type === 'back') {
      time = Math.floor((endTime + step * (increasingNum + i + 1)) / 1000);
    }

    klineData.push({
      t: time,
      h: num,
      s: 'ok',
      c: num - setRandomValue(1),
      o: num - setRandomValue(1),
      l: num - setRandomValue(1),
      v: vnum - setRandomValue(6)
    });
  }

  return klineData;
};

const filteringTime = time => {
  let minuteTime = 60;
  let dayTime = 60 * 60 * 24;
  let longTime = 0;
  switch (time) {
    case '1D':
      longTime = dayTime * 1;
      break;
    default:
      longTime = parseInt(time) * minuteTime;
      break;
  }
  return longTime;
};

const transformTime = time => {
  let number = 0;
  if (time.indexOf('min') !== -1) {
    number = parseInt(time.split('min')[0]);
    return number * minuteTime;
  }

  if (time.indexOf('hour') !== -1) {
    number = parseInt(time.split('hour')[0]);
    return number * hourTime;
  }

  if (time.indexOf('D') !== -1) {
    number = parseInt(time.split('D')[0]);
    return number * dayTime;
  }

  if (time.indexOf('W') !== -1) {
    number = parseInt(time.split('W')[0]);
    return number * dayTime * 7;
  }
};

module.exports = {
  setRandomValue,
  setRandomData,
  filteringTime,
  transformTime
};
