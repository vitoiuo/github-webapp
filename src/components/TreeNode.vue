<template>
    <v-list
        subheader
        two-line
        :style='nodeMargin'
      >
        <v-list-item>
            <v-list-item-avatar>
                <v-icon
                >
                {{ file.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
                </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="file.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action >
              <v-btn v-if='file.type === "dir"' icon @click='toggleDirFiles(file)' @file-choosed='(event) => $emit("file-choosed", event)'>
                <v-icon color="grey lighten-1">mdi-file-tree</v-icon>
              </v-btn>
              <v-btn v-else icon @click='showFileContent(file.path)'>
                <v-icon color="grey lighten-1">mdi-code-braces</v-icon>
              </v-btn>
            </v-list-item-action>
      </v-list-item>

      <template v-if='hasChildren'>
            <tree-node 
                v-for='file in file.children' 
                :key='file.path' 
                :node='file'
                :spacing='spacing + 20'
                :user='user'
                :repo='repo'
                @file-choosed='(event) => $emit("file-choosed", event)'
            />
        </template>
    </v-list>
</template>

<script>
import { getRepoFiles, getFileContent } from '~api'
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
            file: this.node,
            fileContent: null,
        }
    },
    methods: {
        async toggleDirFiles(file) {
            if(this.file.children) {
                this.$emit("file-choosed", { path:'' })
                return this.file.children = null 
            }
            this.$emit('file-choosed', file)
            const children = await getRepoFiles(this.user.login, this.repo.name, file.path)

            this.file = { type: file.type, name: file.name, path: file.name, children }
        },
        async showFileContent (file) {
            this.fileContent =  await getFileContent(this.user.login, this.repo.name, file)
        }
    },
    computed: {
        hasChildren () {
            const {children} = this.file
            return this.file.children && children.length > 0
        },
        nodeMargin () {
            return `margin-left: ${this.spacing}px`
        } 
    },
}
</script>

<style>

</style>