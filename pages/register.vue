<template>
  <section class="section min-vh-100">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">Register!</h2>
          <form method="post" @submit.prevent="register">
            <Notification :message="error" v-if="error" />
            <NotificationEmail :message="messageEmail" v-if="messageEmail" />

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
              <p class="help is-danger" v-if="nameError">{{ nameError }}</p>
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
              <p class="help is-danger" v-if="contactNumberError">
                {{ contactNumberError }}
              </p>
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
                Register
              </button>
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
import Notification from "~/components/Notification";
import NotificationEmail from "~/components/NotificationEmail";

export default {
  components: {
    Notification,
    NotificationEmail,
  },
  data() {
    return {
      showErrors: false,
      name: "",
      contactNumber: "",
      email: "",
      password: "",
      error: null,
      messageEmail: null,
    };
  },
  computed: {
    nameError() {
      if (this.showErrors && this.name.length < 6) {
        return "Username must be at least 6 characters.";
      }
      return "";
    },
    contactNumberError() {
      if (this.showErrors) {
        if (this.contactNumber.length < 10) {
          return "Phone Number must be at least 10 characters.";
        } else if (!/[0-9]/.test(this.contactNumber)) {
          return "Phone Number must contain number.";
        }
      }
      return "";
    },
    emailError() {
      if (this.showErrors && this.email.length < 14) {
        return "Email must be at least 14 characters.";
      }
      return "";
    },
    passwordError() {
      if (this.showErrors) {
        if (this.password.length < 6) {
          return "Password must be at least 6 characters.";
        } else if (
          !/[A-Z]/.test(this.password) ||
          !/[a-z]/.test(this.password)
        ) {
          return "Password must contain at least one uppercase and one lowercase letter.";
        }
      }
      return "";
    },
  },

  methods: {
    async register() {
      this.showErrors = true;

      if (
        this.name.length >= 6 &&
        this.contactNumber.length >= 10 &&
        this.email.length >= 14 &&
        this.password.length >= 6 &&
        /[A-Z]/.test(this.password) &&
        /[a-z]/.test(this.password) &&
        /[0-9]/.test(this.contactNumber)
      ) {
        try {
          const response = await this.$axios.post("/user/register", {
            name: this.name,
            contactNumber: this.contactNumber,
            email: this.email,
            password: this.password,
          });

          if (response.status === 200) {
            this.messageEmail = response.data.message;
            this.error = null;
            setTimeout(() => {
              this.$router.push("/login");
            }, 10000);
          } else if (response.status === 400) {
            this.error = response.data.message;
            this.messageEmail = null;
            setTimeout(() => {
              this.error = null;
            }, 5000);
          }

          this.name = "";
          this.contactNumber = "";
          this.email = "";
          this.password = "";

          this.showErrors = false;
        } catch (e) {
          this.error = e.response.data.message;
          this.messageEmail = null;
          setTimeout(() => {
            this.error = null;
          }, 5000);
        }
      }
    },
  },
};
</script>
<style scoped>
.section {
  background: url("static/2.webp") no-repeat;
  background-size: cover;
  background-position: center;
  padding: 100px;
}
</style>
