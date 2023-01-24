<template>
  <v-row justify="center">
    <v-dialog
      width="80%"
    >
       <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            @click.once="showFileContent"  
          >
        <v-icon>mdi-code-json</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ file.name }}</span>
        </v-card-title>
        <v-card-text>
           <code-highlight>
            <pre v-for='(line, index) in lines' :key='index'>
              {{ line }}
            </pre> 
            </code-highlight>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { getFileContent } from '~api'

import CodeHighlight from "vue-code-highlight/src/CodeHighlight.vue";
import "vue-code-highlight/themes/duotone-sea.css";
import "vue-code-highlight/themes/window.css";

export default {
    components: {
      CodeHighlight
    },
    props: {
        file: {
            type: Object,
            required: true
        }
    },
    data () {
      return {
        fileContent: ''
      }
    },
    methods: {
      async showFileContent () {
          this.fileContent = await getFileContent(this.file.download_url)
      }
    },
    computed: {
      lines () {
         return this.fileContent.split('\n')
      }
    }
}
</script>

<style>

</style>