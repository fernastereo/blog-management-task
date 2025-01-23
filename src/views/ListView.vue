<script setup>
  import { ref, onMounted } from 'vue';

  const postsWithUserNames = ref([]);
  const error = ref(null)

  async function fetchPostsWithUserNames() {
    try {
      error.value = null

      const [postsResponse, usersResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/users')
      ])

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const posts = await postsResponse.json()
      const users = await usersResponse.json()

      postsWithUserNames.value = posts.map(post => {
        const user = users.find(user => user.id === post.userId)
        return {
          ...post,
          userName: user ? user.name : ''
        }
      })

    } catch (err) {
      error.value = err.message
    }
  }

  onMounted(fetchPostsWithUserNames)
</script>

<template>
  <div class="px-4">
    <div class="mt-8">
      <div class="-mx-8">
        <div class="py-2 px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3 text-left text-sm font-semibold text-gray-900">id</th>
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
              <tr v-for="post in postsWithUserNames" :key="post.id">
                <td class="py-4 pl-0 pr-3 text-sm font-medium text-gray-900">{{ post.id }}</td>
                <td class="px-3 py-4 text-sm text-gray-500">{{ `${post.title.substring(0, 40)}...` }}</td>
                <td class="px-3 py-4 text-sm text-gray-500">{{ `${post.body.substring(0, 40)}...` }}</td>
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
        </div>
      </div>
    </div>
  </div>
</template>


