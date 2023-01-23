<template>
  <div>
    <v-breadcrumbs
      :items="items"
      large
    ></v-breadcrumbs>
    <github-vuwer @update:repo='updateRepo' />
    <github-repo :repo="repo" :user='user' @file-choosed='buildBreadcumb' />
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
        items: []
      }
    },
    methods: {
      updateRepo (event) {
        this.repo = event.repo
        this.user = event.owner
      },
      buildBreadcumb (path) {
        const subpaths = path.split('/')
        this.items = subpaths.map(e => {
          return { text:e }
        });
      }
    }
  }
</script>
