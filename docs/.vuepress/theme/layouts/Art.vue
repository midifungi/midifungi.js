<template>
  <ParentLayout>
    <template #page-content-top>
      <Midifungi :layers="$page.frontmatter.layers" :isMaximized="$page.frontmatter.maximized"></Midifungi>

      <Window title="Devlog" v-if="$page.frontmatter.devlog && ((!$page.frontmatter.hideDevlog && $theme.env.NODE_ENV === 'development') || $theme.env.NODE_ENV !== 'development')">
        <iframe height=500 :src="'https://midifungi-notion.ozramos.workers.dev/' + $page.frontmatter.devlog"></iframe>
      </Window>
    </template>
  </ParentLayout>
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>