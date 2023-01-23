<template>
  <div>
    <v-breadcrumbs
      :items="items"
      large
    ></v-breadcrumbs>
    <github-vuwer @update:repo='updateRepo' />
    <github-repo :repo="repo" :user='user' />
  </div>
  
</template>

<script>
  import GithubVuwer from '@/components/GithubVuwer'
  import GithubRepo from '@/components/GithubRepo'

  export default {
    name: 'Home',
    components: {
      GithubVuwer,
      GithubRepo
    },
    data () {
      return {
        repo: null,
        user: null,
        items: [
          {text:'a'},
          {text:'b'},
          {text:'c'},
        ]
      }
    },
    methods: {
      updateRepo (event) {
        this.repo = event.repo
        this.user = event.owner
      }
    }
  }
</script>
