<script setup>
  import { ref, reactive, defineProps } from 'vue'
  import { usePostStore } from '../stores/postStore'

  const postStore = usePostStore()
  const { post } = defineProps(['post'])

  const isEditing = !!post
  const isOpen = ref(false)

  const postData = reactive({
    title: post?.title || '',
    author: post?.userName || '',
    userId: 1,
    body: post?.body || ''
  })

  const openModal = () => {
    isOpen.value = true
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const submitPost = async () => {
    if (isEditing) {
      await postStore.updatePost(postData, post.id)
    } else {
      await postStore.createPost(postData)
    }
    closeModal()
  }
</script>

<template>
  <div>
    <button v-if="post" class="text-green-600 bg-transparent hover:text-gray-600 text-sm font-semibold" @click="openModal"><slot></slot></button>
    <button v-else class="text-white bg-green-600 hover:bg-green-500 px-3 py-2 rounded-md text-sm font-semibold" @click="openModal"><slot></slot></button>

    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center" @click.self="closeModal">
      <div class="bg-white rounded-md max-w-5xl w-full p-6 relative transform transition-all duration-300 ease-out text-left">
        <button @click="closeModal" class="absolute top-3 right-5 text-gray-500 hover:text-gray-800">✕</button>

        <h2 class="text-xl font-semibold mb-4">
          {{ post ? 'Edit blog entry' : 'Create blog entry' }}
        </h2>

        <div class="space-y-6 font-normal">
          <div>
            <label class="block text-sm font-medium mb-2">Title</label>
            <input v-model="postData.title"
                  type="text"
                  class="w-full px-3 py-2 border rounded-md focus:outline-green-600"
                  placeholder="Enter post title" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Author</label>
            <input v-model="postData.author"
                  type="text"
                  class="w-full px-3 py-2 border rounded-md focus:outline-green-600"
                  placeholder="Enter author name" />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Content</label>
            <textarea cols="30" rows="10"
                      v-model="postData.body"
                      class="w-full px-3 py-2 border rounded-md mb-6 focus:outline-green-600">
            </textarea>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button class="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-semibold" @click="closeModal">Cancel</button>
          <button class="text-white bg-green-600 hover:bg-green-500 px-5 py-2 rounded-md text-sm font-semibold" @click="submitPost">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
