<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-toolbar-title>RFR - Repo File Reader</v-toolbar-title>
      <v-spacer />
      <v-btn
        href="https://github.com/vitoiuo/github-webapp"
        target="_blank"
        text
      >
        <span class="mr-2">Repo</span>
        <v-icon>mdi-github</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
