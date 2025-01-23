<script setup>
  import { ref } from 'vue'
  import { usePostStore } from '../stores/postStore'

  const postStore = usePostStore();
  const searchText = ref('');

  const updateSearch = () => {
    postStore.setSearchText(searchText.value);
  }

  const addNewPost = () => {
    console.log('Add new post');
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
    <button
      @click="addNewPost"
      class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
    >
      + New Post
    </button>
  </div>
</template>


