<script setup>
  import { ref, defineProps } from 'vue'
  import { usePostStore } from '../stores/postStore'

  const postStore = usePostStore()
  const { postId } = defineProps(['postId'])

  const isOpen = ref(false)

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const submitPost = async () => {
    await postStore.deletePost(postId)

    closeModal()
  }
</script>

<template>
  <div>
    <button class="text-green-600 bg-transparent hover:text-gray-600 text-sm font-semibold" @click="openModal"><slot></slot></button>

    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center" @click.self="closeModal">
      <div class="bg-white rounded-md max-w-xl w-full p-6 relative transform transition-all duration-300 ease-out text-left">
        <button @click="closeModal" class="absolute top-3 right-5 text-gray-500 hover:text-gray-800">✕</button>

        <h2 class="text-xl font-semibold mb-4">
          Delete blog entry
        </h2>

        <div class="space-y-6 font-normal my-8">
          <p>Are you sure you want to delete this Post? All of your data will be permanently removed from our servers forever. This action cannot be undone.</p>
        </div>

        <div class="flex justify-end space-x-3">
          <button class="bg-gray-200 text-gray-700 hover:bg-gray-300 px-5 py-2 rounded-md text-sm font-semibold" @click="closeModal">No</button>
          <button class="text-white bg-green-600 hover:bg-green-500 px-5 py-2 rounded-md text-sm font-semibold" @click="submitPost">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>
