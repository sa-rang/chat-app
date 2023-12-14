
<template>
  <div id="chatbar" class="chat_box animated fadeInUp" :class="{ 'toggle': isChatBoxOpen }">
    <div class="chat_box_header">
      {{ selectedParticipant.name }}
      <form>
        <input type="text" id="MsgInput" :placeholder="'Mock Message from ' + selectedParticipant.name"
          v-model="participant2Msg">
        <button @click.prevent="sendMockMessage()">🚀</button>
      </form>
    </div>
    <div ref="chatBody" class="chat_box_body">
      <div v-for="chat in selectedUserChat" :key="chat.msgId"
        :class="self.id == chat.participant ? 'chat_box_body_self' : 'chat_box_body_other'">
        {{ chat.msg }}
      </div>

    </div>
    <div class="chat_box_footer">
      <form>
        <input type="text" id="MsgInput" placeholder="Enter Message" v-model="participant1Msg">
        <button @click.prevent="sendMessage()">🚀</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUpdated, onMounted } from 'vue';
import { useChatStore } from '../stores/chats'

const participant1Msg = ref("");
const participant2Msg = ref("");

const isChatBoxOpen = ref(true)
const chatStore = useChatStore()
const self = computed(() => chatStore.selfUser);
const selectedParticipant = computed(() => chatStore.selectedParticipant);
const chatBody = ref(null)


//const chatMessages = computed(() => chatStore.chats);

const selectedUserChat = computed(() => {
  let massages = chatStore.chats.get(self.value.id + selectedParticipant.value.id)
  if (massages) {
    return massages
  } else {
    return []
  }
})

watch(selectedParticipant, async (newValue, oldValue) => {
  localStorage.setItem(self.value.id + oldValue.id, chatBody.value.scrollTop)
  setPresetScroll(newValue.id)
})

const sendMessage = () => {
  chatStore.addChat({ chatId: self.value.id + selectedParticipant.value.id, msgId: generateId(), participant: self.value.id, msg: participant1Msg.value })
  participant1Msg.value = ""
  setScrollBottom()
}

const sendMockMessage = () => {
  chatStore.addChat({ chatId: self.value.id + selectedParticipant.value.id, msgId: generateId(), participant: selectedParticipant.value.id, msg: participant2Msg.value })
  participant2Msg.value = ""
  setScrollBottom()
}

onMounted(() => {
  setPresetScroll(selectedParticipant.value.id)
})

onUpdated(() => {
  //setPresetScroll("bottom")
})

const setPresetScroll = (id) => {
  setTimeout(() => {
    let scrollPreset = localStorage.getItem(self.value.id + id)
    if (scrollPreset) {
      chatBody.value.scrollTop = scrollPreset;
    } else {
      chatBody.value.scrollTop = chatBody.value.scrollHeight + 100;
    }
  }, 100)

}

const setScrollBottom = () => {
  setTimeout(() => {
    chatBody.value.scrollTop = chatBody.value.scrollHeight + 100;
  }, 100)

}



const generateId = (
  length = 5,
  characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
) =>
  Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join('')


</script>

<style scoped>
.chat_box {
  max-height: 100%;
  max-width: 100%;
  height: 500px;
  width: 350px;
  background-color: #fff;
  position: absolute;
  bottom: 100px;
  right: 100px;
  display: none;
  z-index: 5;
  border-radius: 15px;
  background-color: gray;
  box-shadow: 0 0 18px rgba(0, 0, 0, 0.45);
}

.chat_box_header {
  padding: 15px;
  font-size: 20px;
  background: #e1e3e8;
  text-align: center;
  color: #58874f;
  font-weight: 700;

}

.chat_box_body {
  padding: 16px;
  height: 100%;
  overflow-y: scroll;
  height: 380px;
  scroll-behavior: smooth;
}

.chat_box_body_self {
  padding: 12px 20px;
  float: right;
  border-radius: 25px;
  margin-right: 10px;
  background: #5a5eb9;
  color: white;
  margin: 10px 0;
  clear: both;
  max-width: 75%;
}

.chat_box_body_other {
  background: whitesmoke;
  padding: 12px 20px;
  color: #666;
  max-width: 75%;
  float: left;
  margin-left: 10px;
  margin: 10px 0;
  position: relative;
  margin-bottom: 20px;
  border-radius: 25px;
  clear: both;
}

.chat_box_body::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.chat_box_body::-webkit-scrollbar-thumb {
  background-color: #6c6c6c;
}

.chat_box_footer {
  max-width: 100%;
  height: 80px;
  position: absolute;
  bottom: -31px;
}

.chat_box_footer input {
  max-width: 100%;
  width: 292px;
  padding: 17px 15px;
  border-bottom-left-radius: 15px;
  border: none;
  position: fixed;
  background-color: #eee;
}

.chat_box_footer input:focus {
  outline: none;
}


.chat_box_footer button {
  position: absolute;
  bottom: 31px;
  font-size: 19px;
  background: white;
  box-shadow: none;
  border: none;
  border-bottom-right-radius: 16px;
  padding: 12px 16px;
  left: 292px;
}

.chat_box_footer button:focus {
  outline: none;
}

.toggle {
  display: block;
}

.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 10%, 0);
    transform: translate3d(0, 10%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
</style>
