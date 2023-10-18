<template>
  <section class="section min-vh-100">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Please fill correct email!</h2>
          <form method="post" @submit.prevent="forgotpassword">
            <Notification :message="error" v-if="error" />
            <NotificationEmail :message="messageEmail" v-if="messageEmail" />
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
              <p class="help is-danger" v-if="emailError">{{ emailError }}</p>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Send Reset Password
              </button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Notification from "~/components/Notification";
import NotificationEmail from "~/components/NotificationEmail";
export default {
  components: {
    Notification,
    NotificationEmail,
  },
  data() {
    return {
      showErrors : false,  
      email: "",
      error: null,
      messageEmail: null,
    };
  },
  computed: {
    emailError(){
        if(this.showErrors && this.email.length <14){
            return "Email must be at least 14 characters.";
        }
    },
  },
  methods: {
    async forgotpassword() {
      this.showErrors = true;
      if(this.email.length >= 14){   
      try {
        const response = await this.$axios.post("/user/forgotPassword", {
          email: this.email,
          
        });
        if (response.status === 200) {
          this.messageEmail = response.data.message;
          this.error = null;
        } else if (response.status === 500) {
          this.error = response.data.message;
          this.messageEmail = null;
        }

        this.email = "";
        this.showErrors = false;
      } catch (e) {
        this.error = e.response.data.message;
        this.messageEmail = null;
      }
      }  
    },
  },
};
</script>
<style scoped>
.section {
  background: url("static/5.webp") no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
