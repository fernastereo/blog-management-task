<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import { usePostStore } from '../stores/postStore';
  import { storeToRefs } from 'pinia';
  import { useTruncate } from '../composables/useTruncate';
  import SearchBar from '../components/SearchBar.vue'
  import ResultsPaginator from '../components/ResultsPaginator.vue'
  import SpinnerLoading from '../components/SpinnerLoading.vue'

  const postStore = usePostStore()
  const { filteredPosts, loading } = storeToRefs(postStore)

  const currentPage = ref(1)
  const postsPerPage = ref(10)

  const { truncate } = useTruncate()

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

    <div class="mt-2">
      <div class="-mx-8">
        <div class="py-2 px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3 text-left text-sm font-semibold text-gray-900">#</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                <th scope="col" class="px-3 py-3 text-left text-sm font-semibold text-gray-900">Author</th>
                <th scope="col" class="">
                  <span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="">
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr v-for="post in paginatedPosts" :key="post.id">
                <td class="py-4 pl-0 pr-3 text-sm font-medium text-gray-900">{{ post.id }}</td>
                <td class="px-3 py-4 text-sm text-gray-500">
                  <RouterLink class="hover:underline" :to="`/post/${post.id}`">{{ truncate(post.title) }}</RouterLink>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500">{{ truncate(post.body, 60) }}</td>
                <td class="px-3 py-4 text-sm text-gray-500">{{ post.userName }}</td>
                <td class="py-4 px-3 text-right text-sm font-medium">
                  <a href="#" class="text-green-600 hover:text-green-900"
                    >Edit<span class="sr-only">, {{ post.id }}</span></a
                  >
                </td>
                <td class="py-4 px-3 text-right text-sm font-medium">
                  <a href="#" class="text-green-600 hover:text-green-900"
                    >Delete<span class="sr-only">, {{ post.id }}</span></a
                  >
                </td>
              </tr>
            </tbody>
          </table>

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


