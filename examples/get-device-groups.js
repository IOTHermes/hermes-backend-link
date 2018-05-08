

const backendlink = require('../lib')('http://localhost:3030');

backendlink.authenticate('test@test.com','test')
.then(()=>{
  console.log('Authenticated!')

  return backendlink.getGroups();
})
.then(groups => {
  console.log(groups)
})
.catch(error => console.log);
