<script setup>
import ChatForm from './components/ChatForm.vue'
import ChatListin from './components/ChatListing.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <ChatForm msg="Chat Application!" />
    </div>
  </header>

  <main>
    <ChatListin />
  </main>
</template>

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
