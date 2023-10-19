<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container wraper">
        <nuxt-link class="navbar-brand nav-link text-light" to="/" 
          >My Accountant</nuxt-link
        >
        <button class="navbar-toggler bg-light" type="button" @click="toggle">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="nav-desktop">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <nuxt-link
                class="nav-link active text-light"
                aria-current="page"
                to="/register"
                >Register</nuxt-link
              >
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link text-light" to="/login" 
                >Login</nuxt-link
              >
            </li>
            <li class="nav-item text-light">
              <nuxt-link class="nav-link text-light" to="/forgotPassword" 
                >Forgot Password</nuxt-link
              >
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
            to="/register"
            >Register</nuxt-link
          >
        </li>
        <li class="nav-item">
          <nuxt-link
            class="nav-link text-light"
            to="/login"
            >Login</nuxt-link
          >
        </li>
        <li class="nav-item text-light">
          <nuxt-link
            class="nav-link text-light"
            to="/forgotPassword"
            >Forgot Password</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
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

  .nav-hide.hide {
    background: rgb(33, 35, 36);
    top: -500%;
  }
}
</style>
