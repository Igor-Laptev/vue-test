<template>
  <li class="postItem">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </li>
</template>

<script setup>
  import '../assets/styles/PostItem.css';

  const props = defineProps({
    post: {
      type: Object,
      required: true,
    },
  });
</script>
