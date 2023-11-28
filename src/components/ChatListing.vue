

<template>
    <div class="chat_container">
        <div class="chat__item" :class="chat.participant == 'p2' ? 'chat__item--right' : ''" v-for="chat in chatMessages"
            :key="chat.id">
            <span>{{ chat.participant }}:</span><span>{{ chat.msg }}</span>
        </div>
    </div>
</template>


<script setup>
import { computed } from 'vue';
import { useChatStore } from '../stores/chats'
const chatStore = useChatStore()

const chatMessages = computed(() => chatStore.chats);

</script>

<style scoped>
.chat_container {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

}

.chat__item {
    display: flex;
    background-color: rgb(188, 244, 131);
    column-gap: 20px;
    padding: 5px;
    border-radius: 5px;
}

.chat__item--right {
    justify-content: end;
    background-color: rgb(244, 197, 131);
}
</style>
