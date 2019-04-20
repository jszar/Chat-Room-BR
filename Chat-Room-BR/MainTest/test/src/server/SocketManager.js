const io = require('./index.js')
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events')
const connectedUser = {} //setup like {{"user":{id:"ASDFASDFASDFASDF", name:"billy ray cyrus"}}}

module.exports = function(socket){
  console.log("socket id" + socket.id)

  socket.on(VERIFY_USER, (nickname,  callback)=>{
    if(isUser) {
      callback({isUser:true, user:null})
    }
  })
}
