<script setup>
  import { ref } from 'vue'
  import { usePostStore } from '../stores/postStore'
  import ModalPost from './ModalPost.vue'

  const postStore = usePostStore();
  const searchText = ref('');

  const updateSearch = () => {
    postStore.setSearchText(searchText.value);
  }
</script>

<template>

  <div class="flex flex-wrap items-center gap-6 py-4">
    <div class="">
      <input
        type="text"
        v-model="searchText"
        @input="updateSearch"
        class="w-80 rounded-md py-2 pl-5 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600"
        placeholder="Search Post..." />
    </div>
    <ModalPost>+ New Post</ModalPost>
  </div>
</template>


