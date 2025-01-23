<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6 px-8 py-4">
    <h1 class="font-semibold text-gray-900">Koro Blog</h1>
    <div class="flex gap-x-8 font-semibold w-auto pl-6 text-sm">
      <RouterLink to="/"
        class="text-gray-800"
        :exact="true"
        active-class="text-green-600">
        List View
      </RouterLink>
      <RouterLink to="/details"
        class="text-gray-800"
        :exact="true"
        active-class="text-green-600">
        Details View
      </RouterLink>
    </div>
  </div>
</template>


