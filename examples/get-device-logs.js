

const backendlink = require('../lib')('http://localhost:3030');

backendlink.authenticate('test@test.com','test')
.then(()=>{
  console.log('Authenticated!')

  return backendlink.getDevices();
})
.then(devices => {
  console.log(`Got ${devices.length} Devices from the server`)

  const device = devices[0];

  console.log(`  + Using ${device.getAlias()}`)
  return device;
})
.then(device => device.getLogs())
.then(logs =>{
  console.log(`  Got ${logs.length} Logs from the server`)
  logs.forEach(log => console.log( `    +`, log.getData() ))
})
.catch(error => {
  console.log(error)
});
