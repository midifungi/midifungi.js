<template>
  <ParentLayout>
    <template #page-content-top>
      <Midifungi :layers="$page.frontmatter.layers" :isMaximized="$page.frontmatter.maximized"></Midifungi>
    </template>
  </ParentLayout>
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>