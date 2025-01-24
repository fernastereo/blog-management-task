import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePostStore } from '../../../src/stores/postStore'

window.fetch = vi.fn()

describe('postStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetch.mockClear()
  })

  it('should create a post successfully', async () => {
    const store = usePostStore()
    const newPost = { title: 'New Post', body: 'This is a new post.', author: 'Joe Doe' }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 101, ...newPost }),
    })

    store.allPosts = await store.createPost(newPost)
    store.filteredPosts = store.allPosts

    expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newPost),
    })
    expect(store.allPosts).toEqual({ id: 101, ...newPost, userName: 'Joe Doe' })
    expect(store.filteredPosts).toEqual({ id: 101, ...newPost, userName: 'Joe Doe' })
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('should update a post successfully', async () => {
    const store = usePostStore()
    const postId = 1
    const commingPost = { title: 'Test Post', body: 'New Value' }
    const existingPost = { id: postId, title: 'Test Post', body: 'Old Value' }

    fetch.mockResolvedValueOnce({
      ok: true,
    })

    store.allPosts = [existingPost]
    store.filteredPosts = store.allPosts

    await store.updatePost(commingPost, postId)

    expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(commingPost),
    })
    expect(store.allPosts).toEqual([{ id: postId, ...existingPost }])
    expect(store.filteredPosts).toEqual([{ id: postId, ...existingPost }])
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })

  it('should delete a post successfully', async () => {
    const store = usePostStore()
    const postId = 1

    fetch.mockResolvedValueOnce({
      ok: true,
    })

    store.allPosts = [{ id: postId, title: 'Test Post' }]
    store.filteredPosts = store.allPosts

    await store.deletePost(postId)

    expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
    expect(store.filteredPosts).toEqual([])
    expect(store.error).toBeNull()
    expect(store.loading).toBe(false)
  })
})
