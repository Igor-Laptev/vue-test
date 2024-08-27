<template>
  <p class="timestamp">{{ label }} timestamp: {{ formattedTimestamp }}</p>
</template>

<script setup>
  import '../assets/styles/TimestampDisplay.css';
  import { computed } from 'vue';

  const props = defineProps({
    label: String,
    timestamp: {
      type: Number,
      required: true,
      default: 0, 
    },
  });

  const formattedTimestamp = computed(() => {
    if (!props.timestamp || isNaN(props.timestamp) || props.timestamp === 0)
      return 'Invalid Date';
    const date = new Date(props.timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  });
</script>
