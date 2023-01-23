<template>
  <v-container>
    <tree-node v-for='file in files' :key='file.path' :node='file' :user='user' :repo='repo'/>
  </v-container>
</template>

<script>
import { getRepoFiles } from '~api'
import TreeNode from '@/components/TreeNode'

export default {
  components: {
    TreeNode
  },
  data () {
    return {
      files: []
    }
  },
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
  methods: {
    async listRepoFiles () {
       this.files = await getRepoFiles(this.user.login, this.repo.name) 
    }, 
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

// campos desejador: tipo, name