<template>
  <div :class="scrolling ? 'nav scroll' : 'nav'">
    <img src="../assets/logo.png" alt srcset />
    <p class="categories">Home</p>
    <p class="categories">Tv Shows</p>
    <p class="categories">Movies</p>
    <p class="categories">Recently Added</p>
    <p class="categories">My List</p>

    <div class="nav-right-side">
      <div :class="searching ? 'search-field active': 'search-field'">
        <i @click="isSearching" class="fas fa-search"></i>
        <input
          @blur="isSearching"
          type="search"
          v-model="search"
          placeholder="Titles, Peoples, Genres..."
        />
      </div>
      <div class="menu">
        <div class="profile-active">
          <img :src="activeProfile[0].data().picture" alt />
          <i class="fas fa-sort-down" />
        </div>
        <div class="profiles-dropdown">
          <div class="profiles">
            <div
              class="profile"
              v-for="profile in profiles"
              :key="profile.id"
              @click="switchProfiles(profile.id)"
            >
              <img :src="profile.data().picture" alt="profilePic" />
              <p>{{profile.data().name}}</p>
            </div>
            <p @click="switchProfiles(undefined)">Manage Profiles</p>
          </div>
          <div class="settings">
            <p>Account</p>
            <p>Help Center</p>
            <p @click="signOut">Sign out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import firebase from "../config/fbconfig";
export default {
  props: ["scrolling", "profileId"],
  data() {
    return {
      search: "",
      searching: false
    };
  },
  computed: {
    ...mapState(["profiles"]),
    activeProfile: function() {
      return this.profiles.filter(element => element.id === this.profileId);
    }
  },
  methods: {
    ...mapActions(["addAuth"]),
    signOut() {
      localStorage.clear();
      firebase.auth().signOut();
      this.addAuth(false);
      this.$router.push({ name: "home" });
    },
    isSearching() {
      this.searching = !this.searching;
    },
    switchProfiles(profileId) {
      this.$router.push({
        name: "profile",
        params: { switchingProfiles: profileId }
      });
    }
  }
};
</script>