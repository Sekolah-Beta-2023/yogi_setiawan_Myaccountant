<template>
  <section class="section min-vh-100" >
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="profile-card">
        <div class="profile-info">
          <p><strong>Username:</strong> {{  username }}</p>
          <p><strong>Email:</strong> {{  email }}</p>
          <p><strong>Role:</strong> {{  role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import jwt_decode from 'jwt-decode';
import { mapGetters } from 'vuex'
export default {
middleware: 'auth',  
  data() {
    return {
      username: '',
      email: '',
      role: '',
    };
  },    

computed: {
    ...mapGetters(['loggedInUser']),

    },
  mounted() {
    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem('token');

    if (jwtToken) {
      // Decode the JWT token to extract user information
      const decodedToken = jwt_decode(jwtToken);

      // Update data properties with the extracted information
      this.username = decodedToken.name; 
      this.email = decodedToken.sub;
      this.role = decodedToken.role;
    }
  },

}
</script>
<style scoped>
.profile-card {
  background-color: #3498db; /* Blue background color */
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px 0;
  transition: transform 0.2s; /* Add a hover animation */
}

.profile-card:hover {
  transform: scale(1.05); /* Scale up the card on hover */
}

.profile-info {
  font-size: 18px;
  margin: 10px 0;
  color: #fff; /* White text color */
}
.section{
    background:  url('static/3.webp') no-repeat;
    background-size: cover;
    background-position: center;
    
}

</style>
