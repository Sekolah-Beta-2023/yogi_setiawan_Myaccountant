<template>
  <section class="section min-vh-100">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <h2 class="title has-text-centered">
            Please keep your password,Don't tell anybody
          </h2>
          <form method="post" @submit.prevent="changepassword">
            <Notification :message="error" v-if="error" />
            <NotificationEmail :message="messageEmail" v-if="messageEmail" />
            <div class="field">
              <label class="label">Old Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="oldpassword"
                  v-model="oldPassword"
                  required
                  placeholder="******"
                />
              </div>
              <p class="help is-danger" v-if="passwordError">
                {{ passwordError }}
              </p>
            </div>
            <div class="field">
              <label class="label">New Password</label>
              <div class="control">
                <input
                  type="password"
                  class="input"
                  name="newpassword"
                  v-model="newPassword"
                  required
                  placeholder="******"
                />
              </div>
              <p class="help is-danger" v-if="passwordError2">
                {{ passwordError2 }}
              </p>
            </div>
            <div class="control">
              <button type="submit" class="button is-dark is-fullwidth">
                Change Password
              </button>
            </div>
          </form>
          <div class="has-text-centered" style="margin-top: 20px"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Notification from "~/components/Notification";
import NotificationEmail from "~/components/NotificationEmail";
import jwt from "jsonwebtoken";
export default {
  middleware: "auth",
  components: {
    Notification,
    NotificationEmail,
  },

  data() {
    return {
      showErrors: false,
      oldPassword: "",
      newPassword: "",
      error: null,
      messageEmail: null,
    };
  },

  mounted() {},

  computed: {
    passwordError() {
      if (this.showErrors && this.oldPassword.length < 6) {
        return "Password must be at least 6 characters.";
      }
      return "";
    },

    passwordError2() {
      if (this.showErrors) {
        if (this.newPassword.length < 6) {
          return "Password must be at least 6 characters.";
        } else if (
          !/[A-Z]/.test(this.newPassword) ||
          !/[a-z]/.test(this.newPassword) ||
          !/[0-9]/.test(this.newPassword) ||
          !/[!@#$%^&*()_+-=\[\]{};:'",.<>/?\\|]/.test(this.newPassword)
        ) {
          return "Password must contain at least one uppercase letter, one lowercase letter,one number, and one symbol from the allowed set.";
        }
      }
      return "";
    },
  },

  methods: {
    async changepassword() {
      this.showErrors = true;

      if (
        this.oldPassword.length >= 6 &&
        this.newPassword.length >= 6 &&
        /[A-Z]/.test(this.newPassword) &&
        /[a-z]/.test(this.newPassword) &&
        /[0-9]/.test(this.newPassword) &&
        /[!@#$%^&*()_+-=\[\]{};:'",.<>/?\\|]/.test(this.newPassword)
      ) {
        try {
          const jwtToken = localStorage.getItem("token");
          console.log("token", jwtToken);

          // Decode the JWT token to extract the email using jsonwebtoken
          const decodedToken = jwt.decode(jwtToken);
          console.log("decodedToken", decodedToken);

          if (decodedToken) {
            const userEmail = decodedToken.sub; //'sub' contains the email
            console.log("userEmail", userEmail);

            const response = await this.$axios.post(
              "/user/changePassword",
              {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                email: userEmail, // Send the email to the API
              },
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );

            if (this.oldPassword === this.newPassword) {
              this.error =
                "Your old password cant be same with your new password, please change it for your safety !";
              setTimeout(() => {
                this.error = null;
              }, 5000);
            } else {
              if (response) {
                if (response.status === 200) {
                  this.messageEmail = response.data.message;
                  this.error = null;
                  this.oldPassword = "";
                  this.newPassword = "";

                  setTimeout(() => {
                    this.messageEmail = null;
                  }, 5000);
                } else if (response.status === 400) {
                  console.log("Bad Request Response Data:", response.data);
                  this.error = response.data.message;
                  this.messageEmail = null;

                  setTimeout(() => {
                    this.error = null;
                  }, 5000);
                } else {
                  this.error = "Unexpected response from the server.";
                  setTimeout(() => {
                    this.error = null;
                  }, 5000);
                }
              } else {
                this.error = "No response from the server.";
                setTimeout(() => {
                  this.error = null;
                }, 5000);
              }
            }
          } else {
            this.error = "Invalid or missing authentication token.";
            setTimeout(() => {
              this.error = null;
            }, 5000);
          }
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
  background: url("static/6.webp") no-repeat;
  background-size: cover;
  background-position: center;
  padding: 100px;
}
</style>
