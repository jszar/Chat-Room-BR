const uuidv4 = require('uuid/v4')

const createUser = ({name = ""} = {})=>(
  {
    id:uuidv4(),
    name
  }
)

const createMessage = ({message = "", sender = ""} = {}) => (
  {
    id:uuidv4(),
    message,
    sender
  }
)

const createChat = ({messages = [], name = "Community", users = []} = {}) => (
  {
    id:uuidv4(),
    name,
    messages,
    users,
    typingUsers:[]
  }
)

module.exports = {
  createUser,
  createMessage,
  createChat
}
