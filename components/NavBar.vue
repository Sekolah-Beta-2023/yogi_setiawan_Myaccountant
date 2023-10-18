<template>
    <nav class="navbar is-dark">
    <div class="container">
    <div class="navbar-brand">
    <nuxt-link class="navbar-item" to="/">My Accountant</nuxt-link>
    <button class="button navbar-burger">
    <span></span>
    <span></span>
    <span></span>
    </button>
    </div>

    <div class="navbar-menu">
    <div class="navbar-end">
    <template>
    <nuxt-link class="navbar-item" to="/register">Register</nuxt-link>
    <nuxt-link class="navbar-item" to="/login">Log In</nuxt-link>
    <nuxt-link class="navbar-item" to="/forgotPassword">Forgot Password</nuxt-link>
    </template>

    </div>
    </div>
    </div>
    </nav>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  nama: "NavBar",
  computed: {
    // ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },

  // methods: {

  // async logout() {
  // await this.$auth.logout();
  //         },

  //     },
};
</script>
<style scoped>

</style>
