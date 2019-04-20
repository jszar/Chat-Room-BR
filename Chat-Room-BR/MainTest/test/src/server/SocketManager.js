const io = require('./index.js')
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events')
const { createUser, createMessage, createChat } = require('../Factories')
const connectedUsers = {} //setup like {{"user":{id:"ASDFASDFASDFASDF", name:"billy ray cyrus"}}}

module.exports = function(socket){
  console.log("socket id" + socket.id)

  socket.on(VERIFY_USER, (nickname,  callback)=>{
    if(isUser(connectedUsers, nickname)) {
      callback({isUser:true, user:null})
    } else {
      callback({isUser:false, user:createUser({name:nickname})})
    }
  })
}

function addUser(userList, username) {
  let newList = Object.assign({}, userList)
  newlist[user.name] = user
  return newList
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}

function isUser(userList, username) {
  return username in userList
}
