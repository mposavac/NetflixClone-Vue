<template>
  <div class="account">
    <img
      class="background"
      src="https://assets.nflxext.com/ffe/siteui/vlv3/e201408d-1f98-4f82-91de-41337ad8f35f/f1f7ebd0-6cbe-41a1-9830-58c3d60a08e7/HR-en-20191028-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      alt="noBg"
    />
    <img class="logo" src="../assets/logo.png" alt="logo" />
    <form @submit.prevent="handleSubmit">
      <h1>{{option}}</h1>
      <div class="input-field">
        <input type="text" name="email" id="email" v-model="email" required />
        <label for="email">Email</label>
      </div>
      <div class="input-field">
        <input type="password" id="password" name="password" v-model="password" required />
        <label for="password">Password</label>
      </div>
      <transition name="details-text">
        <div v-if="option==='Sign Up'" class="input-field">
          <input
            type="password"
            id="password-repeat"
            name="password-repeat"
            v-model="repeatPswd"
            required
          />
          <label for="password-repeat">Repeat Password</label>
        </div>
      </transition>

      <button type="submit">{{option==="Sign In"?'Sign In': 'Create an Account'}}</button>
      <p class="link">
        {{option==='Sign In'?'New to Netflix? ':'Already have an account? '}}
        <span
          @click="switchToSignUp"
        >{{option==='Sign In'? 'Sign up now.': "Sign Up."}}</span>
      </p>
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
      option: "Sign In",
      email: "",
      password: "",
      repeatPswd: ""
    };
  },
  methods: {
    ...mapActions(["addAuth"]),
    async handleSubmit() {
      if (this.option === "Sign In") {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(response => {
            this.addAuth(response.user.uid);
            localStorage.userId = response.user.uid;
          });
      } else {
        if (this.password === this.repeatPswd) {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(response => {
              this.addAuth(response.user.uid);
              localStorage.userId = response.user.uid;
              fs.collection("users")
                .doc(response.user.uid)
                .collection("profiles")
                .doc()
                .set({
                  name: "Kids",
                  picture:
                    "https://occ-0-2774-2773.1.nflxso.net/art/889b9/76b56c0a3369cf9a18033de19d3af548989889b9.png"
                });
            });
        }
      }
      this.$router.push({
        name: "profile"
      });
    },
    switchToSignUp() {
      if (this.option === "Sign Up") this.option = "Sign In";
      else this.option = "Sign Up";
    }
  }
};
</script>