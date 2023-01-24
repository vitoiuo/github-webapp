<template>
  <v-container class='mt-10'>
    <v-row class='px-5'>
      <v-col cols='6'>
        <v-autocomplete
          v-model="user"
          :loading="true"
          :items="userList"
          :search-input.sync="searchedUser"
          @input.native="debouncedFindUser"
          item-text='login'
          color="white"
          hide-no-data
          hide-details
          label="Github user"
          placeholder="Start typing to Search"
          return-object
          >
          </v-autocomplete>
      </v-col>
      <v-col cols='6'>
         <v-select
          v-model="repo"
          :items="repoList"
          :loading="repoIsLoading"
          @change="emitRepo"
          item-text="name"
          label="Select the repository"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import {getGithubUser, getUserRepos} from '~api'

export default {
  data() {
    return {
      user: null,
      userList: [],
      repoIsLoading: false,
      searchedUser: null,
      repo: '',
      repoList: []
    } 
  },
  methods: {
    debouncedFindUser: debounce(async function () {
      const data = await getGithubUser(this.searchedUser)
      this.userList = data.items
    }, 1000),
    async listUserRepos (user) {
      this.repoIsLoading = true
      this.repoList = await getUserRepos(user)
      this.repoIsLoading = false
    }, 
    emitRepo(repo) {
        this.$emit('update:repo', { repo, owner:this.user })
    }
  },
  watch: {
    user (newValue) {
      this.listUserRepos(newValue.login)
    }
  }
}
</script>

<style>

</style>