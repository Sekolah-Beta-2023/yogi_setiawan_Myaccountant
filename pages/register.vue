<template>
<section class="section min-vh-100">
<div class="container">
<div class="columns">
<div class="column is-4 is-offset-4">
<h2 class="title has-text-centered">Register!</h2>
<form method="post" @submit.prevent="register">
<Notification :message="error" v-if="error"/>
<NotificationEmail :message="messageEmail" v-if="messageEmail"/>
<div class="field">
<label class="label">Username</label>
<div class="control">
<input
type="text"
class="input"
name="name"
v-model="name"
required
/>
</div>
</div>

<div class="field">
<label class="label">Phone Number</label>
<div class="control">
<input
type="text"
class="input"
name="contactNumber"
v-model="contactNumber"
required
/>
</div>
</div>

<div class="field">
<label class="label">Email</label>
<div class="control">
<input
type="email"
class="input"
name="email"
v-model="email"
required
/>
</div>
</div>

<div class="field">
<label class="label">Password</label>
<div class="control">
<input
type="password"
class="input"
name="password"
v-model="password"
required
/>
</div>
</div>

<div class="control">
<button type="submit" class="button is-dark
is-fullwidth">Register</button>
</div>
</form>
<div class="has-text-centered" style="margin-top: 20px">
Already got an account? <nuxt-link to="/login">Login</nuxt-link>
</div>
</div>
</div>
</div>
</section>
</template>
<script>
import Notification from '~/components/Notification'
import NotificationEmail from '~/components/NotificationEmail'

export default {
middleware: 'guest',    
  components: {
    Notification,
    NotificationEmail,
  },
  data() {
    return {
      name: '',
      contactNumber: '',
      email: '',
      password: '',
      error: null,
      messageEmail: null, 
    }
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.post('/user/register', {
          name: this.name,
          contactNumber: this.contactNumber,
          email: this.email,
          password: this.password,
        });

        if (response.status === 200) {      
          this.messageEmail = response.data.message;
          this.error = null;
        } else if (response.status === 400) {      
          this.error = response.data.message;
          this.messageEmail = null;
        }

        this.name = '';
        this.contactNumber = '';
        this.email = '';
        this.password = '';


      } catch (e) {
        this.error = e.response.data.message;
        this.messageEmail = null;
      } 
    }
  }
}
</script>
<style scoped>
.section{
    background:  url('static/2.webp') no-repeat;
    background-size: cover;
    background-position: center;
    
}
</style>





