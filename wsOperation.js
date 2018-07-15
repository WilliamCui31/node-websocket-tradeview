const utils = require('./utils');
const config = require('./config');
const defaultTime = new Date().getTime();

let Timer = null;

const dealMessage = (message, ws) => {
  if (message.indexOf('_') !== -1) {
    const from = new Date('2018-06-14').getTime();
    const to = new Date().getTime();
    // 控制每次添加的时间数
    let step = utils.transformTime('1min') / config.constant.SPACE_TIME;
    // console.log('step ->', step);
    const params = {
      step,
      length: config.constant.HISTORY_DATA_LENGTH,
      type: 'front',
      startTime: from,
      endTime: to
    };

    let result = utils.setRandomData(params);
    // console.log('from->', from);
    // console.log('to->', to);
    let returnData = {};
    let compareTime = defaultTime - 1 * step;
    let compareDay = new Date(compareTime);

    // console.log('compareDay->', compareDay);
    // console.log('period->', period);
    console.log('step->', step);
    if (compareDay >= from) {
      returnData = {
        code: 0,
        type: 'kline',
        data: result
      };
    } else {
      returnData = {
        code: 0,
        type: 'kline',
        data: [
          {
            t: '',
            c: '',
            o: '',
            h: '',
            l: '',
            v: '',
            s: 'ok'
          }
        ]
      };
    }

    // console.log('send kline');
    // 发送历史数据
    console.log('发送K线历史数据...');
    ws.send(JSON.stringify(returnData));

    if (Timer) {
      clearInterval(Timer);
    }
    console.log('建立定时器...');
    Timer = startRealtime(ws, params);
  } else {
    ws.send('pong');
  }
};

// 定时发送实时数据
const startRealtime = (ws, params) => {
  // console.log('startRealtime ->');
  let { step, length, type, startTime, endTime } = params;
  let increasingNum = 0;
  let data = {};

  return setInterval(() => {
    increasingNum = ++increasingNum;
    let returnData = {};
    const _params = {
      step,
      length: 1,
      type: 'back',
      increasingNum,
      startTime,
      endTime
    };

    result = utils.setRandomData(_params);
    console.log('result ->', result);
    let { t, c, o, h, l, v } = result;
    returnData = {
      code: 0,
      type: 'realTime',
      data: [result[0]]
    };

    if (ws.readyState === 1) {
      ws.send(JSON.stringify(returnData));
    }
  }, config.constant.INTERVAL_TIME);
};

module.exports = {
  dealMessage
};
