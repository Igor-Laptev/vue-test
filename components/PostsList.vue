<script setup>
  import '../assets/styles/PostsList.css';
  import { ref, onMounted } from 'vue';
  import PostItem from './PostItem.vue';
  import { fetchPosts } from '../composables/useApi';

  const posts = ref([]);

  onMounted(async () => {
    posts.value = await fetchPosts();
  });
</script>

<template>
  <div>
    <h2 class="postsTitle">Posts</h2>
    <ul class="postsList">
      <PostItem v-for="post in posts" :key="post.id" :post="post" />
    </ul>
  </div>
</template>
