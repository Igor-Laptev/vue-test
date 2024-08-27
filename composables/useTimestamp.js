import { ref, onMounted } from 'vue';

export function useTimestamp(initialTimestamp) {
  const clientTimestamp = ref(initialTimestamp);
  const countdown = ref(10);

  onMounted(() => {
    const interval = setInterval(() => {
      clientTimestamp.value = Date.now();
      countdown.value = 10;
    }, 10000);

    const countdownInterval = setInterval(() => {
      countdown.value = countdown.value > 0 ? countdown.value - 1 : 10;
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  });

  return {
    clientTimestamp,
    countdown,
  };
}
