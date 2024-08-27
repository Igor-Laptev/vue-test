<template>
  <div class="container">
    <header class="header">
      <h1>Timestamp and Posts App</h1>
    </header>
    <section class="timestampSection">
      <TimestampDisplay label="Server" :timestamp="serverTimestamp" />
      <TimestampDisplay label="Client" :timestamp="clientTimestamp" />
      <p>Next update in: {{ countdown }} seconds</p>
    </section>
    <section class="postsSection">
      <PostsList />
    </section>
  </div>
</template>

<script setup>
  import { useTimestamp } from '../composables/useTimestamp';
  import TimestampDisplay from '../components/TimestampDisplay.vue';
  import PostsList from '../components/PostsList.vue';

  const { data: serverTimestamp } = await useAsyncData('timestamp', () =>
    $fetch('/api/timestamp')
  );
  const { clientTimestamp, countdown } = useTimestamp(serverTimestamp.value);
</script>

<style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .timestampSection,
  .postsSection {
    margin-bottom: 30px;
  }
</style>
