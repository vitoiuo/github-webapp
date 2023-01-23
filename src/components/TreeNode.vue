<template>
  <v-list
        subheader
        two-line
        class='nodeMargin'
      >
        <v-list-item>
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

            <v-list-item-action v-if='file.type === "dir"'>
              <v-btn icon @click='toggleDirFiles(file)'>
                <v-icon color="grey lighten-1">mdi-file-tree</v-icon>
              </v-btn>
            </v-list-item-action>
      </v-list-item>
      <template v-if='hasChildren'>
            <tree-node 
                v-for='file in file.children' 
                :key='file.path' 
                :node='file'
                :spacing='spacing + 10'
                :user='user'
                :repo='repo'
            />
        </template>
    </v-list>
</template>

<script>
import { getRepoFiles } from '~api'
import TreeNode from '@/components/TreeNode'

export default {
    name: 'TreeNode',
    components: {
        TreeNode
    },
    props: {
        node: {
            type: Object
        },
        user: {
            type: Object
        },
        repo: {
            type: Object
        },
        spacing: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            file: this.node
        }
    },
    methods: {
        async toggleDirFiles(file) {
            this.$emit('file-choosed', file)
            const children = await getRepoFiles(this.user.login, this.repo.name, file.path)

            this.file = { type: file.type, name: file.name, path: file.name, children }
        }
    },
    computed: {
        hasChildren () {
            const {children} = this.file
            return children && children.length > 0
        },
        nodeMargin () {
            return { 'margin-left': `${this.nodeMargin}px` }
        } 
    },
    // watch: {
    //     node (newValue) {
    //         this.toggleDirFiles(newValue)
    //     }
    // }
}
</script>

<style>

</style>