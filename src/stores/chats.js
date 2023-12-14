// stores/chats.js
import { defineStore } from 'pinia'

export const useChatStore = defineStore('chats', {
  state: () => {
    return {
      chats: new Map(),
      participants: [
        { name: "Raj", id: "p1" },
        { name: "Suman", id: "p2" },
        { name: "Arjun", id: "p3" },
        { name: "Preeti", id: "p4" },
        { name: "Shivam", id: "p5" },
      ],
      selectedParticipant: null,
      selfUser: { name: "Sarang", id: "s1" }
    }
  },

  actions: {
    addChat(iChatData) {
      if (this.chats.has(iChatData.chatId)) {
        let msgs = this.chats.get(iChatData.chatId);

        msgs.push({
          msgId: iChatData.msgId,
          participant: iChatData.participant,
          msg: iChatData.msg,
        })
        this.chats.set(iChatData.chatId, msgs)

      } else {
        this.chats.set(iChatData.chatId,
          [{
            msgId: iChatData.msgId,
            participant: iChatData.participant,
            msg: iChatData.msg,
          }]
        )
      }

      //add at top
      // this.chats.unshift(iChatData)
    },
    selectParticipant(iParticipant) {
      this.selectedParticipant = iParticipant
    },
  },
})