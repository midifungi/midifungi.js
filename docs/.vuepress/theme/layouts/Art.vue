<template>
  <ParentLayout>
    <template #page-content-top>
      <Midifungi :layers="$page.frontmatter.layers" :height="$page.frontmatter.height || 500" :isMaximized="$page.frontmatter.maximized"></Midifungi>
    </template>
    <template #page-content-bottom>
      <Window title="Devlog" v-if="$page.frontmatter.devlog && ((!$page.frontmatter.hideDevlog && $theme.env.NODE_ENV === 'development') || $theme.env.NODE_ENV !== 'development')">
        <iframe :src="'https://midifungi-notion.ozramos.workers.dev/' + $page.frontmatter.devlog"></iframe>
      </Window>
    </template>
  </ParentLayout>
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>