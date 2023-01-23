<template>
  <v-container>
    <v-list
        subheader
        two-line
      >
        <v-list-item
          v-for="file in files"
          :key="file.name"
        >
          <template v-if='file.type === "dir"'>
            <v-list-item-avatar>
            <v-icon
              class="grey lighten-1"
              dark
            >
              mdi-folder
            </v-icon>
          </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="file.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click='listDirFiles(file.path)'>
                <v-icon color="grey lighten-1">mdi-file-tree</v-icon>
              </v-btn>
            </v-list-item-action>

          </template>

          <template v-else>
            <v-list-item-avatar>
              <v-icon
                dark
              >
                mdi-file-check-outline
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="file.name"></v-list-item-title>
            </v-list-item-content>
        </template>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { getRepoFiles } from '~api'

export default {
  props: {
      repo: {
          type: Object
      },
      user: {
        type: Object
      },
      newPath: {
        type: String
      }
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    async listRepoFiles () {
       this.files = await getRepoFiles(this.user.login, this.repo.name) 
    }, 
    async listDirFiles(file) {
      this.$emit('file-choosed', file)
      this.files = await getRepoFiles(this.user.login, this.repo.name, file) 
    }
  },
  watch: {
    async repo () {
      await this.listRepoFiles()
    },
    async newPath (newPath) {
      this.files = await getRepoFiles(this.user.login, this.repo.name, newPath) 
    }
  }
}
</script>

<style>

</style>