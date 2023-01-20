<template>
  <v-container>
    <v-autocomplete
      v-model="user"
      :items="userList"
      :loading="isLoading"
      :search-input.sync="searchedUser"
      @keyup="debouncedFindUser"
      @click="fetchGithub"
      item-text='login'
      color="white"
      hide-no-data
      label="Github user"
      placeholder="Start typing to Search"
      prepend-icon="mdi-github"
      return-object
      />
    </v-container>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      user: null,
      userList: ['João', 'Marcos'],
      searchedUser: '',
      isLoading: false,
    } 
  },
  methods: {
    fetchGithub () {

    },
    debouncedFindUser: debounce(function (user) {
        console.log('Hello')
        this.userList.filter(e => e.includes(user))
    }, 1000) 
  },
}
</script>

<style>

</style>