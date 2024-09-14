const CHAT_LIST_KEY = 'chat_list'

export const saveChats = (chatObj) => {
  let chatObjs = JSON.parse(localStorage.getItem(CHAT_LIST_KEY)) || []

  chatObjs.push(chatObj)

  localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(chatObjs))
}

export const getChats = () => {
  return JSON.parse(localStorage.getItem(CHAT_LIST_KEY)) || []
}

export const removeLocalChat = (chatId) => {
  let chatObjs = JSON.parse(localStorage.getItem(CHAT_LIST_KEY)) || []

  chatObjs = chatObjs.filter((chat) => chat.id !== chatId)

  localStorage.setItem(CHAT_LIST_KEY, JSON.stringify(chatObjs))
}
