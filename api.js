// functions/api.js
export default async function handler(request) {
  const { PRODUCT_ID, DEVICE_NAME, DEVICE_TOKEN } = {
    PRODUCT_ID: 'e6H1yN0K5M',       // 你的产品ID
    DEVICE_NAME: 'esp32',          // 你的设备名
    DEVICE_TOKEN: 'version=2022-05-01&res=products%2Fe6H1yN0K5M&et=1840512476&method=md5&sign=UqAD8tHcqmwlLZihHk2VwQ%3D%3D'  // 你的token
  };

  const url = `https://iot-api.heclouds.com/thingmodel/query-device-property?product_id=${PRODUCT_ID}&device_name=${DEVICE_NAME}`;
  
  const resp = await fetch(url, {
    headers: { 'Authorization': DEVICE_TOKEN }
  });
  const json = await resp.json();

  const PROPERTY_LIST = ['co2', 'temp', 'humi', 'pm2_5', 'tvoc', 'nh3', 'benzene'];
  const results = {};
  PROPERTY_LIST.forEach(p => { results[p] = null; });

  if (json.code === 0 && json.data) {
    json.data.forEach(item => {
      if (PROPERTY_LIST.includes(item.identifier)) {
        if (['int32', 'int64', 'float', 'double'].includes(item.data_type)) {
          results[item.identifier] = Number(item.value);
        } else {
          results[item.identifier] = item.value;
        }
      }
    });
  }

  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}