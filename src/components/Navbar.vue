<template>
  <div :class="scrolling ? 'nav scroll' : 'nav'">
    <img src="../assets/logo.png" alt srcset />
    <p>Home</p>
    <p>Tv Shows</p>
    <p>Movies</p>
    <p>Recently Added</p>
    <p>My List</p>

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
            <div class="profile" v-for="profile in profiles" :key="profile.id">
              <img :src="profile.data().picture" alt="profilePic" />
              <p>{{profile.data().name}}</p>
            </div>
            <p>Manage Profiles</p>
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
//JOŠ DODATI I SERACH BAR ITD... OVISNO STA CE SE POKATIVATI
import { mapActions, mapState } from "vuex";
export default {
  props: ["scrolling", "profileId"],
  data() {
    return {
      search: "",
      searching: false
      //profilesToShow: this.getProfiles()
    };
  },
  computed: {
    ...mapState(["profiles"]),
    activeProfile: function() {
      return this.profiles.filter(element => element.id === this.profileId);
    }
  },
  mounted() {
    console.log("Profiles", this.profiles);
    console.log("props", this.activeProfile);
  },
  methods: {
    ...mapActions(["addAuth"]),
    signOut() {
      localStorage.clear();
      this.addAuth(false);
      this.$router.push({ name: "home" });
    },
    isSearching() {
      this.searching = !this.searching;
    } /*
    getProfiles() {
      let array = [];
      for (profile of this.profiles) {
        if (profile.id !== this.profileId) {
          array.push(profile);
        }
      }
      return array;
    }*/
  }
};
</script>