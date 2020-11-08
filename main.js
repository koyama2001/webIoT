var microBitBle;

var vl53;

var readEnable;

async function connect() {
  microBitBle = await microBitBleFactory.connect();
  msg.innerHTML = "micro:bit BLE接続しました。";
  var i2cAccess = await microBitBle.requestI2CAccess();
  var i2cPort = i2cAccess.ports.get(1);
  msg.innerHTML = "VL53L0Xを初期化しています（10秒程かかります・・）";
  vl53 = new VL53L0X(i2cPort, 0x29);
  await vl53.init();
  readEnable = true;
  readData();
}

async function connect() {
  microBitBle = await microBitBleFactory.connect();
  var i2cAccess = await microBitBle.requestI2CAccess();
  var i2cPort = i2cAccess.ports.get(1);
  vl53 = new VL53L0X(i2cPort, 0x29);
  await vl53.init();
  readEnable = true;
  readData();
}
async function readData() {
  while (readEnable) {
    var distance = await vl53.getRange();
    msg.innerHTML = distance + "mm";
    await sleep(200);
    if (distance < 100) {
      msg.innerHTML = "近すぎるッピ!!!";
    }
  }
}
