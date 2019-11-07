<template>
  <div class="account">
    <img
      class="background"
      src="https://assets.nflxext.com/ffe/siteui/vlv3/e201408d-1f98-4f82-91de-41337ad8f35f/f1f7ebd0-6cbe-41a1-9830-58c3d60a08e7/HR-en-20191028-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      alt="noBg"
    />
    <img class="logo" src="../assets/logo.png" alt="logo" />
    <form @submit.prevent="handleSubmit">
      <h1>Sign In</h1>
      <div class="input-field">
        <input type="text" name="email" id="email" v-model="email" required />
        <label for="email">Email</label>
      </div>
      <div class="input-field">
        <input type="password" id="password" name="password" v-model="password" required />
        <label for="password">Password</label>
      </div>

      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase, { fs } from "../config/fbconfig.js";
export default {
  props: [""],
  data() {
    return {
      email: "test@test.net",
      password: "test12345"
    };
  },
  methods: {
    ...mapActions(["addAuth"]),
    async handleSubmit() {
      if (this.password) {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(response => {
            //console.log(response.user.uid);
            this.addAuth(response.user.uid);
          });
        //console.log(fb.auth().currentUser.uid);
      }
      this.$router.push({
        name: "profile"
      });
    }
  }
};
</script>