<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
        @click.native='goTo(item.text)'
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <tree-node v-for='file in files' :key='file.path' :node='file' :user='user' :repo='repo' @file-choosed='buildBreadcumb'/>
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
      files: [],
      items: [],
      subpaths: [],
      newPath: null,
    }
  },
  props: {
      repo: {
          type: Object
      },
      user: {
        type: Object
      },
  },
  methods: {
    async listRepoFiles () {
       this.files = await getRepoFiles(this.user.login, this.repo.name) 
    },
    goTo (item) {
        this.items = this.subpaths
                      .slice(0, this.items.indexOf(item))
                      .map(e => { return { text:e }});
        this.newPath = this.items.join('/')
    },
    buildBreadcumb (file) {
        this.subpaths = file.path.split('/')
        this.items = this.subpaths.map(e => {
          return { text:e }
        });
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

// campos desejador: tipo, name