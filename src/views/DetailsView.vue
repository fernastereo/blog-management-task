<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import { usePostStore } from '../stores/postStore';
  import { storeToRefs } from 'pinia';
  import SearchBar from '../components/SearchBar.vue'
  import ResultsPaginator from '../components/ResultsPaginator.vue'
  import SpinnerLoading from '../components/SpinnerLoading.vue'
  import ModalPost from '../components/ModalPost.vue'
  import ModalDeletePost from '../components/ModalDeletePost.vue'

  const postStore = usePostStore()
  const { filteredPosts, loading } = storeToRefs(postStore)

  const currentPage = ref(1)
  const postsPerPage = ref(6)

  // pagination
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage.value
    const end = start + postsPerPage.value
    return filteredPosts.value.slice(start, end)
  })

  const totalPages = computed(() =>
    Math.ceil(filteredPosts.value.length / postsPerPage.value)
  )

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  onMounted(() => {
      postStore.fetchPostsWithUserNames()
    }
  )

</script>

<template>
  <div v-if="loading" >
    <SpinnerLoading />
  </div>
  <div v-else class="px-4">
    <div class="flex flex-row justify-end">
      <SearchBar />
    </div>

    <div class="mt-0">
      <div class="-mx-8">
        <div class="py-2 px-8">
          <div class="mx-auto grid gap-x-8 gap-y-16 border-t border-gray-200 mt-5 pt-10 max-w-none grid-cols-3">
            <article v-for="post in paginatedPosts" :key="post.id" class="flex max-w-xl flex-col items-start justify-between">
              <div class="flex items-center justify-between text-xs w-full">
                <time :datetime="post.datetime" class="text-gray-500">24-01-2025</time>
                <div class="flex gap-x-4 text-xs mr-8">
                  <ModalPost :post="post">Edit</ModalPost>
                  <ModalDeletePost :postId="post.id">Delete</ModalDeletePost>
                </div>
              </div>
              <div class="">
                <h3 class="mt-3 text-lg font-semibold text-gray-900 hover:underline">
                  <RouterLink class="hover:underline" :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
                </h3>
                <p class="mt-5 line-clamp-3 text-gray-600">{{ post.body }}</p>
              </div>
              <div class="relative mt-8 flex items-center gap-x-4">
                <div class="size-12 rounded-full bg-gray-400"></div>
                <div class="text-sm">
                  <p class="font-semibold text-gray-900">{{ post.userName }}</p>
                </div>
              </div>
            </article>
          </div>

          <ResultsPaginator
            :currentPage="currentPage"
            :totalPages="totalPages"
            @nextPage="nextPage"
            @prevPage="prevPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>


