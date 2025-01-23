<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
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
  <div class="flex flex-wrap items-center gap-6 px-8 py-4">
    <h1 class="font-semibold text-gray-900">Koro Blog</h1>
    <div class="flex gap-x-8 font-semibold w-auto pl-6 text-sm">
      <RouterLink to="/"
        class="text-gray-800"
        :exact="true"
        active-class="text-green-600">
        List View
      </RouterLink>
      <RouterLink to="/details"
        class="text-gray-800"
        :exact="true"
        active-class="text-green-600">
        Details View
      </RouterLink>
    </div>
    <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
      <div class="grid w-full max-w-lg grid-cols-1 lg:max-w-xs">
        <input
          type="text"
          v-model="searchText"
          @input="updateSearch"
          class="w-full rounded-md py-2 pl-5 text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-green-600"
          placeholder="Search Post..." />
      </div>
    </div>
    <button
      @click="addNewPost"
      class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
    >
      + New Post
    </button>
  </div>
</template>


