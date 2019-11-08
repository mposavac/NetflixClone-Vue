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
          <img :src="profile.data().picture" alt="profPic" />
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
import { mapActions, mapState } from "vuex";
export default {
  name: "profile",
  computed: {
    ...mapState(["profiles", "isAuth"])
  },
  mounted() {
    this.getProfiles();
  },
  methods: {
    ...mapActions(["addProfiles"]),
    async getProfiles() {
      let profiles = [];
      let snapshot = await fs
        .collection("users")
        .doc(this.isAuth)
        .collection("profiles")
        .get();
      snapshot.forEach(doc => {
        profiles.push(doc);
      });
      this.addProfiles(profiles);
    },
    hadnleProfileClick(profile_id) {
      //console.log(profile_id);
      this.$router.push({ name: "browse", params: { profileId: profile_id } });
    }
  }
};
</script>