<template>
  <ParentLayout>
    <template #page-content-top>
      <Midifungi :layers="['@220609/sketch']">
        <div class="custom-container tip devlog-meta">
          <ul>
            <li>
              <strong>Devlog:</strong> <a href="{{$page.frontmatter.devlog}}">{{$page.frontmatter.devlog}}</a>
            </li>
            <li>
              <strong>Dates worked on:</strong> 
              <a class="devlog-link-date" v-for="page in $page.frontmatter.dates" :href="'/devlog/' + page + '.html'">{{page}}</a>
            </li>
          </ul>
        </div>
      </Midifungi>
      <Window title="Devlog">
        <iframe height=500 src="https://midifungi-notion.ozramos.workers.dev/eee85c3731374c2a8dea271c5568b576"></iframe>
      </Window>
    </template>
  </ParentLayout>
</template>

<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
</script>