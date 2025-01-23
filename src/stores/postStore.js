import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('posts', () => {
  const allPosts = ref([])
  const filteredPosts = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchText = ref('')

  async function fetchPostsWithUserNames() {
    try {
      loading.value = true
      error.value = null

      const [postsResponse, usersResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/users'),
      ])

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const posts = await postsResponse.json()
      const users = await usersResponse.json()

      allPosts.value = posts.map((post) => {
        const user = users.find((user) => user.id === post.userId)
        return {
          ...post,
          userName: user ? user.name : '',
        }
      })

      filteredPosts.value = allPosts.value
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const setSearchText = (term) => {
    searchText.value = term
    filterPosts()
  }

  const filterPosts = () => {
    filteredPosts.value = allPosts.value.filter(
      (post) =>
        post.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
        post.body.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  }

  return {
    filteredPosts,
    loading,
    error,
    setSearchText,
    fetchPostsWithUserNames,
  }
})
