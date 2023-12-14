

<template>
  <header>
    <div class="wrapper">
      <h1>Chat Application</h1>
    </div>
  </header>

  <main>
    <ChatBox v-if="selectedParticipant" />
    <ParticipantList />
  </main>
</template>

<script setup>
import { computed } from 'vue';
import ChatBox from "./components/ChatBox.vue"
import ParticipantList from './components/ParticipantList.vue';
import { useChatStore } from './stores/chats'
const chatStore = useChatStore()
const selectedParticipant = computed(() => chatStore.selectedParticipant);
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
