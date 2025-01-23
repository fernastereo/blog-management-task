<script setup>
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue'
  import { usePostStore } from '../stores/postStore'
  import SpinnerLoading from '../components/SpinnerLoading.vue'
  import PostComments from '../components/PostComments.vue'

  const route = useRoute()
  const postId = route.params.id
  const postStore = usePostStore()
  const { singlePost, loading } = storeToRefs(postStore)

  onMounted(async () => {
      postStore.fetchSinglePostWithUserName(postId)
    }
  )
</script>

<template>
  <div v-if="loading" >
    <SpinnerLoading />
  </div>
  <div v-else class="px-4">
    <div class="py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto">
          <p class="font-semibold text-green-600">{{ singlePost.userName }}</p>
          <h1 class="text-5xl font-semibold text-gray-900">{{ singlePost.title }}</h1>
          <div class="mt-10 text-gray-700">
            <p>{{ singlePost.body }}</p>
          </div>

          <PostComments :comments="singlePost.comments" />
        </div>
      </div>
    </div>
  </div>
</template>


