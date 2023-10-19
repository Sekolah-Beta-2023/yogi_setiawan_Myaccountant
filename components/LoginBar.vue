<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container wraper">
        <button class="navbar-toggler bg-light" type="button" @click="toggle">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="nav-desktop">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link
                class="nav-link active text-light"
                aria-current="page"
                to="/karyawan"
                >Karyawan</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link text-light" to="/barang"
                >Barang</nuxt-link
              >
            </li>
            <li class="nav-item bg-dark">
              <div class="navbar-item has-dropdown bg-dark is-hoverable">
                <a class="navbar-link text-light bg-dark"> My Account </a>
                <div class="navbar-dropdown bg-dark">
                  <nuxt-link
                    class="navbar-item text-light bg-dark"
                    to="/profile"
                    >My Profile</nuxt-link
                  >
                  <hr class="navbar-divider bg-dark" />
                  <nuxt-link
                    class="navbar-item text-light bg-dark"
                    to="/changePassword"
                    >Change Password</nuxt-link
                  >
                  <a class="navbar-item text-light bg-dark" @click="logout"
                    >Logout</a
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="d-lg-none" :class="show ? 'nav-hide' : 'hide nav-hide'">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <nuxt-link
            class="nav-link active text-light"
            aria-current="page"
            to="/karyawan"
            >Karyawan</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link text-light" to="/barang">Barang</nuxt-link>
        </li>
        <li class="nav-item bg-dark">
          <div class="navbar-item has-dropdown is-hoverable bg-dark">
            <a class="navbar-link text-light bg-dark">My Account</a>
            <div class="navbar-dropdown bg-dark">
              <nuxt-link class="navbar-item text-light bg-dark" to="/profile"
                >My Profile</nuxt-link
              >
              <hr class="navbar-divider bg-dark" />
              <nuxt-link
                class="navbar-item text-light bg-dark"
                to="/changePassword"
                >Change Password</nuxt-link
              >
              <a class="navbar-item text-light bg-dark" @click="logout"
                >Logout</a
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginBar",
  computed: {},
  data() {
    return {
      show: false,
    };
  },

  methods: {
    toggle() {
      this.show = !this.show;
    },

    // async logout() {

    //         this.$router.push('/');

    //         },

    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>
<style scoped>
.navbar {
  position: absolute;
  width: 100%;
  z-index: 10;
}

.wraper {
  position: relative;
}

@media (max-width: 992px) {
  .navbar .nav-desktop {
    display: none;
  }
  .nav-hide {
    position: absolute;
    width: 100%;
    top: 0%;
    left: 0;
    background: rgb(33, 35, 36);
    height: 200px;
    transition: 0.5s;
    z-index: 9;
    padding-top: 70px;
  }

  .nav-hide .nav-link {
    text-align: center;
  }
  .navbar-item {
    text-align: center;
  }
  .navbar-toggler {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: flex-end;
  }
  .nav-hide.hide {
    background: rgb(33, 35, 36);
    top: -500%;
  }
}
</style>
