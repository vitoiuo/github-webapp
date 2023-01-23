<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
        @click.native='goTo(item.text)'
        >
          {{ item.text.toUpperCase() }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
    <github-vuwer @update:repo='updateRepo' />
    <github-repo :repo="repo" :user='user' :newPath='newPath' @file-choosed='buildBreadcumb' />
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
        items: [],
        subpaths: [],
        newPath: null,
      }
    },
    methods: {
      goTo (item) {
        this.newPath = this.subpaths
        debugger
        this.items = this.subpaths
                      .slice(0, this.items.indexOf(item))
                      .map(e => { return { text:e }});
        this.newPath = this.items.join('/')
      },
      updateRepo (event) {
        this.repo = event.repo
        this.user = event.owner
      },
      buildBreadcumb (path) {
        this.subpaths = path.split('/')
        this.items = this.subpaths.map(e => {
          return { text:e }
        });
      }
    }
  }
</script>
