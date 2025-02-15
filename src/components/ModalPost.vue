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

  const rules = {
    title: [
      value => !!value || 'Title is required',
      value => value.length >= 5 || 'Title must be at least 5 characters'
    ],
    author: [
      value => !!value || 'Author name is required',
      value => value.length >= 5 || 'Author name must be at least 5 characters'
    ],
    body: [
      value => !!value || 'Content is required',
      value => value.length >= 20 || 'Content must be at least 20 characters'
    ]
  }

  const errors = reactive({
    title: [],
    author: [],
    body: []
  })

  const validate = () => {
    errors.title = rules.title
      .map(rule => rule(postData.title))
      .filter(result => result !== true)

    errors.author = rules.author
      .map(rule => rule(postData.author))
      .filter(result => result !== true)

    errors.body = rules.body
      .map(rule => rule(postData.body))
      .filter(result => result !== true)

    return errors.title.length === 0 &&
          errors.author.length === 0 &&
          errors.body.length === 0
  }

  const openModal = () => {
    isOpen.value = true

    errors.title = []
    errors.author = []
    errors.body = []
  }

  const closeModal = () => {
    isOpen.value = false
  }

  const submitPost = async () => {
    if (validate()) {
      try {
        if (isEditing) {
          await postStore.updatePost(postData, post.id)
        } else {
          await postStore.createPost(postData)
        }
        closeModal()
      } catch (error) {
        console.error('Error submitting post:', error)
      }
    }
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
                  :class="['w-full px-3 py-2 border rounded-md focus:outline-green-600',
                      {'border-red-500': errors.title.length}]"
                  placeholder="Enter post title" />
            <p v-if="errors.title.length" class="text-red-500 text-sm mt-1">
              {{ errors.title[0] }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Author</label>
            <input v-model="postData.author"
                  type="text"
                  :class="['w-full px-3 py-2 border rounded-md focus:outline-green-600',
                      {'border-red-500': errors.author.length}]"
                  placeholder="Enter author name" />
            <p v-if="errors.author.length" class="text-red-500 text-sm mt-1">
              {{ errors.author[0] }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Content</label>
            <textarea cols="30" rows="10"
                      v-model="postData.body"
                      :class="['w-full px-3 py-2 border rounded-md mb-6 focus:outline-green-600',
                        {'border-red-500': errors.body.length}]">
            </textarea>
            <p v-if="errors.body.length" class="text-red-500 text-sm mt-1">
              {{ errors.body[0] }}
            </p>
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
