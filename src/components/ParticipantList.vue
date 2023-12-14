
<template>
  <div class="participant__list">
    <div>
      <p>Select a user to chat with</p>
    </div>
    <div class="participants" :class="selectedParticipant == eachPerson.id ? 'participant__selected' : ''"
      v-for="eachPerson in participantList" :key="eachPerson.id" @click.prevent="selectParticipant(eachPerson)">
      <span>{{ eachPerson.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useChatStore } from '../stores/chats'

const selectedParticipant = ref("");
const chatStore = useChatStore()
const participantList = computed(() => chatStore.participants);

const selectParticipant = (iParticipant) => {
  selectedParticipant.value = iParticipant.id
  chatStore.selectParticipant(iParticipant)
}

</script>

<style scoped>
.participant__list {}

.participants {
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid rgb(150, 150, 150);

}

.participant__selected {
  background-color: rgb(140, 247, 118);
}
</style>
