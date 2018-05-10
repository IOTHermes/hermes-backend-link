
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


  return device.addLog({
    base64:123
  })
  .then(res => {
    return device.removeLog(res._id)
    .then(res => {
      console.log(res);
    })
    .catch(errors => {
      console.log("ERROR!")
      console.log(error)
    })
  })
  .catch(error => {
    console.log("ERROR!")
    console.log(error)
  })
})
.catch(error => {
  console.log(error)
});
