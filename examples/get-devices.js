

const backendlink = require('../lib')('http://localhost:3030');

backendlink.authenticate('test@test.com','test')
.then(()=>{
  console.log('Authenticated!')

  return backendlink.getDevices();
})
.then(devices => {
  console.log(`Got ${devices.length} Device from the server`)

  devices.forEach(device => {
    console.log(`  + ${device.getAlias()} is a ${device.getModel()}`)
  })

})
.catch(error => {
  console.log(error)
});
