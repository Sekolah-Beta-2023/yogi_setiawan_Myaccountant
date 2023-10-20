<template>
  <section class="section min-vh-100">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Welcome back!</h2>
          <form method="post" @submit.prevent="login">
            <Notification :message="error" v-if="error" />
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
              <p class="help is-danger" v-if="passwordError">
                {{ passwordError }}
              </p>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Log In
              </button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>
            <p>
              Forgot password?
              <nuxt-link to="/forgotPassword">Forgot_Password</nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Notification from "~/components/Notification";
export default {
  components: {
    Notification,
  },

  data() {
    return {
      showErrors: false,
      email: "",
      password: "",
      jwtToken: "",
      error: null,
    };
  },

  mounted() {
    // if (localStorage.jwtToken) {
    // this.jwtToken = localStorage.jwtToken;
    // }
  },

  computed: {
    emailError() {
      if (this.showErrors && this.email.length < 14) {
        return "Email must be at least 14 characters.";
      }
      return "";
    },
    passwordError() {
      if (this.showErrors && this.password.length < 6) {
        return "Password must be at least 6 characters.";
      }
      return "";
    },
  },

  methods: {
    async login() {
      this.showErrors = true;
      if (this.email.length >= 14 && this.password.length >= 6) {
        try {
          const response = await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });

          if (response) {
            if (
              response.data &&
              response.data.token &&
              response.status === 200
            ) {
              // Extract the token from the response
              const jwtToken = response.data.token;
              // Store the token in localStorage
              // console.log(this.$auth.loggedIn);
              localStorage.setItem("token", jwtToken);
              this.$router.push("/profile");
            } else if (response.status === 400) {
              this.error = response.data.message;
              setTimeout(() => {
                this.error = null;
              }, 5000);
            } else {
              setTimeout(() => {
                this.error = null;
              }, 5000);
              // Handle the case where the response doesn't contain the expected data
              this.error = "Unexpected response from the server.";
            }
          } else {
            setTimeout(() => {
              this.error = null;
            }, 5000);
            // Handle the case where the response is undefined
            this.error = "No response from the server.";
          }
          this.showErrors = false;
        } catch (e) {
          if (e.response && e.response.data && e.response.data.message) {
            this.error = e.response.data.message;
            setTimeout(() => {
              this.error = null;
            }, 5000);
          } else {
            setTimeout(() => {
              this.error = null;
            }, 5000);
            // Handle any other unexpected errors
            this.error = "An error occurred while processing your request.";
          }
        }
      }
    },

    // async login() {

    //   try {
    //     const response  = await this.$axios.post('/user/login', {
    //       email: this.email,
    //       password: this.password,

    //     });

    //     if (response) {
    //       if (response.data && response.data.token && response.status === 200) {
    //         // Extract the token from the response
    //         const jwtToken = response.data.token;
    //         // Store the token in localStorage
    //         localStorage.setItem('token', jwtToken);
    //         this.$router.push('/profile');
    //         }else if (response.status === 400){
    //           this.error = response.data.message;
    //         }else {
    //         // Handle the case where the response doesn't contain the expected data
    //         this.error = "Unexpected response from the server.";
    //         }
    //     } else {
    //       // Handle the case where the response is undefined
    //       this.error = "No response from the server.";
    //     }
    //   } catch (e) {
    //     if (e.response && e.response.data && e.response.data.message) {
    //       this.error = e.response.data.message;
    //     } else {
    //       // Handle any other unexpected errors
    //       this.error = "An error occurred while processing your request.";
    //     }
    //   }
    // }
  },
};
</script>
<style scoped>
.section {
  background: url("static/4.webp") no-repeat;
  background-size: cover;
  background-position: center;
  padding: 100px;
}
</style>
