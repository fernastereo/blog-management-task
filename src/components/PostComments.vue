<script setup>
  import { RouterLink } from 'vue-router'
  import { defineProps } from 'vue'

  const { comments } = defineProps(['comments'])
</script>

<template>
  <div class="grid grid-cols-12 gap-x-8 px-4 py-16">
    <div class="col-span-4">
      <div class="mt-2">
        <RouterLink
          to="/"
          class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
        >
          Go Back
        </RouterLink>
      </div>
    </div>

    <div class="col-span-7 col-start-5 mt-0">
      <h2 class="font-semibold mb-3">Recent Comments</h2>
      <div class="divide-y divide-gray-300">
        <div v-for="comment in comments" :key="comment.id" class="py-6">
          <div class="flex items-center">
            <div class="size-12 rounded-full bg-gray-400"></div>
            <div class="ml-4">
              <h4 class="text-sm font-bold text-gray-900">{{ comment.name }}</h4>
              <p class="text-xs">{{ comment.email }}</p>
            </div>
          </div>
          <div class="mt-4 italic text-gray-600" >
            <p>{{ comment.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
