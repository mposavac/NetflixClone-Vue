<template>
  <div class="profiles-page">
    <nav>
      <img src="../assets/logo.png" alt="logo" />
    </nav>

    <div v-if="!isAddingProfile" class="profiles">
      <h1>Who's watching?</h1>
      <div class="profiles-wrapper">
        <div
          class="profile"
          v-for="profile in profiles"
          :key="profile.id"
          @click="hadnleProfileClick(profile.id)"
        >
          <img :src="profile.data().picture" alt="profPic" />
          <p>{{ profile.data().name }}</p>
        </div>
        <div
          class="profile"
          @click="
            () => {
              this.isAddingProfile = true;
            }
          "
        >
          <i class="fas fa-plus-circle" />
          <p>Add Profile</p>
        </div>
      </div>
      <button class="btn-profiles">MANAGE PROFILES</button>
    </div>

    <div v-if="isAddingProfile" class="new-profile profiles">
      <h1>Add Profile</h1>
      <p>Add a profile for another person watching Netflix.</p>

      <div class="new-container">
        <img
          src="https://occ-0-2774-2773.1.nflxso.net/art/a7774/574ffd46d2bcef69802752f39db6320328fa7774.png"
          alt="profileImg"
        />
        <input type="text" placeholder="Name" v-model="name" />
      </div>

      <button class="btn-continue" @click="newProfile">CONTINUE</button>
      <button
        class="btn-cancel"
        @click="
          () => {
            this.isAddingProfile = false;
          }
        "
      >
        CANCEL
      </button>
    </div>
  </div>
</template>

<script>
import firebase, { fs } from '../config/fbconfig';
import { mapActions, mapState } from 'vuex';
export default {
  props: ['switchingProfiles'],
  name: 'profile',
  data() {
    return {
      isAddingProfile: false,
      name: ''
    };
  },
  computed: {
    ...mapState(['profiles', 'isAuth'])
  },
  mounted() {
    this.fetchProfiles();
    this.fetchLists();
    if (this.switchingProfiles) this.hadnleProfileClick(this.switchingProfiles);
  },
  methods: {
    ...mapActions(['addProfiles', 'fetchLists']),
    async fetchProfiles() {
      let profiles = [];
      let snapshot = await fs
        .collection('users')
        .doc(this.isAuth)
        .collection('profiles')
        .get();
      snapshot.forEach(doc => {
        profiles.push(doc);
      });
      this.addProfiles(profiles);
    },
    hadnleProfileClick(profile_id) {
      this.$router.push({ name: 'browse', params: { profileId: profile_id } });
    },
    async newProfile() {
      await fs
        .collection('users')
        .doc(this.isAuth)
        .collection('profiles')
        .doc()
        .set({
          name: this.name,
          picture:
            'https://occ-0-2774-2773.1.nflxso.net/art/a7774/574ffd46d2bcef69802752f39db6320328fa7774.png'
        });
      this.isAddingProfile = false;
      this.fetchProfiles();
    }
  }
};
</script>
