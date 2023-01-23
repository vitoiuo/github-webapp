<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Use Google's location service?</span>
        </v-card-title>
        <v-card-text>
         {{ content }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props: {
        visible:{
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            dialog: this.visible
        }
    }
}
</script>

<style>

</style>