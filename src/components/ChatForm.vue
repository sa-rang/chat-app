
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <form class="input__msg">
      <h3>Participant 1:</h3>
      <input type="text" v-model="participant1Msg" />
      <button @click.prevent="sendMessage('p1')">🚀</button>
    </form>

    <form class="input__msg">
      <h3>Participant 2:</h3>
      <input type="text" v-model="participant2Msg" />
      <button @click.prevent="sendMessage('p2')">🚀</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatStore } from '../stores/chats'
defineProps({
  msg: {
    type: String,
    required: true
  }
})

const participant1Msg = ref("");
const participant2Msg = ref("");
const chatStore = useChatStore()

const sendMessage = (iParticipant) => {
  //console.log(iParticipant)
  if (iParticipant === "p1" && participant1Msg.value) {
    chatStore.addChat({ id: generateId(), participant: iParticipant, msg: participant1Msg.value })
    participant1Msg.value = ""

  } else if (iParticipant === "p2" && participant2Msg.value) {
    chatStore.addChat({ id: generateId(), participant: iParticipant, msg: participant2Msg.value })
    participant2Msg.value = ""
  }
  // console.log(chatStore.chats)
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
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

.input__msg {
  display: flex;
  margin-bottom: 20px;
  column-gap: 10px;
}
</style>
