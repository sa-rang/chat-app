// stores/chats.js
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chats', {
  state: () => {
    return { chats: [] }
  },

  actions: {
    addChat(iChatData) {

      //add at top
      this.chats.unshift(iChatData)
    },
  },
})