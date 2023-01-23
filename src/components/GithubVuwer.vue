<template>
  <v-container>
    <v-row>
      <v-col cols='6'>
        <v-autocomplete
          v-model="user"
          :items="userList"
          :loading="isLoading"
          :search-input.sync="searchedUser"
          @keyup="debouncedFindUser"
          item-text='login'
          color="white"
          hide-no-data
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
          item-text="name"
          :loading="isLoading"
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
      isLoading: false,
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
      this.isLoading = true
      const data = await getUserRepos(user)
      this.repoList = data
      this.isLoading = false
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