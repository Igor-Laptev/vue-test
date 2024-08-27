<template>
  <div class="container">
    <header class="header">
      <h1>Timestamp and Posts App</h1>
    </header>
    <section class="timestampSection">
      <p>Server timestamp: {{ formattedServerTimestamp }}</p>
      <p>Client timestamp: {{ formattedClientTimestamp }}</p>
      <p>Next update in: {{ countdown }} seconds</p>
    </section>
    <section class="postsSection">
      <PostsList />
    </section>
  </div>
</template>

<script setup>
  import './assets/styles/App.css';
  import { ref, computed, onMounted } from 'vue';
  import PostsList from './components/PostsList.vue';

  const serverTimestamp = ref(0);
  const clientTimestamp = ref(0);
  const countdown = ref(10);

  // Загружаем временную метку с сервера на этапе SSR
  const { data } = await useAsyncData('timestamp', () =>
    $fetch('/api/timestamp')
  );

  serverTimestamp.value = data.timestamp;
  clientTimestamp.value = serverTimestamp.value;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formattedServerTimestamp = computed(() =>
    formatTimestamp(serverTimestamp.value)
  );

  const formattedClientTimestamp = computed(() =>
    formatTimestamp(clientTimestamp.value)
  );

  // Используем onMounted для выполнения кода только на клиенте
  onMounted(() => {
    // Обновление клиентской временной метки каждые 10 секунд
    setInterval(() => {
      clientTimestamp.value = Date.now();
      countdown.value = 10;
    }, 10000);

    // Обновление обратного отсчета каждую секунду
    setInterval(() => {
      countdown.value--;
    }, 1000);
  });
</script>
