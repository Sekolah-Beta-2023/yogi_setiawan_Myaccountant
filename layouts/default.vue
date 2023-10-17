<template>
<div>
    <client-only>
      <NavBar v-if="showNavbar" />
    </client-only>
    <client-only>
      <LoginBar v-if="showLoginbar" />
    </client-only>
<nuxt/>
    <client-only>
      <Footer v-if="showFooter" />
    </client-only>
        <client-only>
      <FooterLogin v-if="showFooterLogin" />
    </client-only>
</div>
</template>
<script>

export default {

computed: {
    showNavbar() {
      // List of pages where you want to show the Navbar
      const pagesToShowNavbar = ['/', '/register', '/login','/forgotPassword'];
      return pagesToShowNavbar.includes(this.$route.path);
    },
    showLoginbar() {
      // List of pages where you want to show the Loginbar
      const pagesToLoginbar = ['/profile','/changePassword','/karyawan','/barang','karyawan/detail/','barang/detail/'];
      return pagesToLoginbar.includes(this.$route.path);
    },
    showFooter() {
      // List of pages where you want to show the Footer
      const pagesToShowFooter = ['/', '/register', '/login','/forgotPassword'];
      return pagesToShowFooter.includes(this.$route.path);
    },
    showFooterLogin() {
      // List of pages where you want to show the FooterLogin
      const pagesToFooterLogin = ['/profile','/changePassword','/karyawan','/barang','karyawan/detail/','barang/detail/'];
      return pagesToFooterLogin.includes(this.$route.path);
    },



},


}
</script>