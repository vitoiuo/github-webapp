<template>
  <div>
    <github-vuwer @update:repo='updateRepo' />
    <github-repo :repo="repo" :user='user'/>
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
        user: null
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
