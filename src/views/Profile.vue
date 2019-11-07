<template>
  <div class="profiles-page">
    <nav>
      <img src="../assets/logo.png" alt="logo" />
    </nav>
    <div class="profiles">
      <h1>Who's watching?</h1>
      <div class="profiles-wrapper">
        <div
          class="profile"
          v-for="profile in profiles"
          :key="profile.id"
          @click="hadnleProfileClick(profile.id)"
        >
          <img
            src="https://occ-0-2774-2773.1.nflxso.net/art/00805/fe465904ae954ab329b5ab1273ef955402b00805.png"
            alt="profPic"
          />
          <p>{{profile.data().name}}</p>
        </div>
        <div class="profile">
          <i class="fas fa-plus-circle" />
          <p>Add Profile</p>
        </div>
      </div>
      <button class="btn-profiles">MANAGE PROFILES</button>
    </div>
  </div>
</template>

<script>
import firebase, { fs } from "../config/fbconfig";
export default {
  name: "profile",
  data() {
    return {
      profiles: []
    };
  },
  mounted() {
    this.getProfiles();
  },
  methods: {
    async getProfiles() {
      let profiles = [];
      let snapshot = await fs
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("profiles")
        .get();
      snapshot.forEach(doc => {
        profiles.push(doc);
      });
      this.profiles = profiles;
    },
    hadnleProfileClick(profile_id) {
      //console.log(profile_id);
      this.$router.push({ name: "browse" });
    }
  }
};
</script>