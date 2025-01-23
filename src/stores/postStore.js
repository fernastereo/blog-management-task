import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('posts', () => {
  const allPosts = ref([])
  const singlePost = ref({})
  const filteredPosts = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchText = ref('')

  async function fetchPostsWithUserNames() {
    try {
      loading.value = true
      error.value = null

      const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL

      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`${VITE_BASE_API_URL}posts`),
        fetch(`${VITE_BASE_API_URL}users`),
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

  async function fetchSinglePostWithUserName(postId) {
    try {
      loading.value = true
      error.value = null

      const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL

      const postResponse = await fetch(`${VITE_BASE_API_URL}posts/${postId}`)
      const returnedPost = await postResponse.json()

      const userResponse = await fetch(`${VITE_BASE_API_URL}users/${returnedPost.userId}`)
      const returnedUser = await userResponse.json()

      const commentsResponse = await fetch(`${VITE_BASE_API_URL}posts/${postId}/comments`)
      const returnedComments = await commentsResponse.json()

      singlePost.value = {
        ...returnedPost,
        userName: returnedUser.name,
        comments: returnedComments,
      }
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
    singlePost,
    loading,
    error,
    setSearchText,
    fetchPostsWithUserNames,
    fetchSinglePostWithUserName,
  }
})
