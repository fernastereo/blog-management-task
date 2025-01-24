import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('posts', () => {
  const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL
  const allPosts = ref([])
  const singlePost = ref({})
  const filteredPosts = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchText = ref('')

  const fetchPostsWithUserNames = async () => {
    try {
      loading.value = true
      error.value = null

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
      console.error('Error fetching post:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchSinglePostWithUserName = async (postId) => {
    try {
      loading.value = true
      error.value = null

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
      console.error('Error fetching post:', err)
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

  const createPost = async (postData) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${VITE_BASE_API_URL}posts`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const newPost = await response.json()
      newPost.userName = postData.author
      allPosts.value.unshift(newPost)

      return newPost
    } catch (err) {
      error.value = err.message
      console.error('Error creating post:', err)
    } finally {
      loading.value = false
    }
  }

  const updatePost = async (postData, postId) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${VITE_BASE_API_URL}posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const updatedPost = await response.json()
      const index = allPosts.value.findIndex((p) => p.id === postId)
      if (index !== -1) {
        allPosts.value[index] = { ...updatedPost, userName: updatedPost.author }
      }
    } catch (error) {
      error.value = error.message
      console.error('Error updating post:', error)
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (postId) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${VITE_BASE_API_URL}posts/${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        error.value = 'Failed to delete post'
      }

      allPosts.value = allPosts.value.filter((post) => post.id !== postId)
      filteredPosts.value = allPosts.value
    } catch (error) {
      error.value = error.message
      console.error('Error deleting post:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    filteredPosts,
    singlePost,
    loading,
    error,
    setSearchText,
    fetchPostsWithUserNames,
    fetchSinglePostWithUserName,
    createPost,
    updatePost,
    deletePost,
  }
})
