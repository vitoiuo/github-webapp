<template>
<div>
    <v-list
        subheader
        two-line
        :style='nodeMargin'
      >
        <v-list-item>
            <v-list-item-avatar>
                <v-icon>
                    {{ file.type === 'dir' ? 'mdi-folder' : 'mdi-file' }}
                </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="file.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action >
              <v-btn
                v-if='file.type === "dir"'
                icon
                @click='toggleDirFiles(file)'
                @node-choosed='emitNodeChoosed'
            >
                <v-icon color="grey lighten-1">mdi-file-tree</v-icon>
              </v-btn>
              <popup-file-content v-else :file='file' />
            </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>

      <template v-if='hasChildren'>
            <tree-node 
                v-for='file in file.children' 
                :key='file.path' 
                :node='file'
                :spacing='spacing + 20'
                :user='user'
                :repo='repo'
                @node-choosed='emitNodeChoosed'
            />
        </template>
    </v-list>
    
</div>
</template>

<script>
import { getRepoFiles } from '~api'
import TreeNode from '@/components/TreeNode'
import popupFileContent from '@/components/popupFileContent'

export default {
    name: 'TreeNode',
    components: {
        TreeNode,
        popupFileContent
    },
    props: {
        node: {
            type: Object
        },
        user: {
            type: Object,
            required: true
        },
        repo: {
            type: Object,
            required: true
        },
        spacing: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            file: this.node,
        }
    },
    methods: {
        emitNodeChoosed (event) {
            this.$emit("node-choosed", event)
        },
        async toggleDirFiles(file) {
            if(this.file.children) {
                this.$emit("node-choosed", { path:'' })
                return this.file.children = null 
            }
            this.emitNodeChoosed(file)
            const children = await getRepoFiles(this.user.login, this.repo.name, file.path)
            this.file = { type: file.type, name: file.name, path: file.name, children }
        },
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

//