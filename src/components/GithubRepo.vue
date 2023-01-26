<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <tree-node
      v-for='node in nodes'
      :key='node.path'
      :node='node'
      :user='user'
      :repo='repo'
      @node-choosed='buildBreadcumb'
    />
  </v-container>
</template>

<script>
import { getRepoFiles } from '~api'
import TreeNode from '@/components/TreeNode'

export default {
  name: 'RepoViewer',
  components: {
    TreeNode
  },
  data () {
    return {
      nodes: [],
      items: []
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
       this.nodes = await getRepoFiles(this.user.login, this.repo.name) 
    },
    buildBreadcumb (node) {
        const subpaths = node.path.split('/')
        this.items = subpaths.map(e => {
          return { text:e }
        });
    }
  },
  watch: {
    async repo () {
      this.items = []
      await this.listRepoFiles()
    },
  }
}
</script>
