<template>
  <div class="billboard">
    <transition name="picture_fade">
      <img
        class="poster"
        v-if="!this.videoLoaded || !this.videoLink"
        :src="focus.backdrop_path ? 'http://image.tmdb.org/t/p/original/'+focus.backdrop_path : '/img/logo.dcc40947.png'"
        alt="noPoster"
      />
    </transition>

    <iframe
      v-if="videoLink"
      @load="this.showVideo"
      id="existing-iframe-example"
      width="720"
      height="360"
      class="poster"
      :src="'https://www.youtube.com/embed/'+this.videoLink+'?autoplay=1&mute=1&enablejsapi=1&disablekb=1&loop=1&controls=0&modestbranding=1&playlist='+this.videoLink"
      frameborder="0"
    ></iframe>
    <div class="text-wrapper">
      <h1>{{focus.name ? focus.name:focus.title}}</h1>
      <p>{{focus.overview.substring(0,focus.overview.indexOf('.')+1)}}</p>
      <div class="buttons">
        <button class="btn-play">
          <img src="https://img.icons8.com/ios-glyphs/30/000000/play.png" /> Play
        </button>
        <button class="btn-list" @click="isFavourite ? removeFromList() : addToList()">
          <i v-if="isFavourite" class="fas fa-minus" />
          <i v-else class="fas fa-plus" />
          {{isFavourite ? "Remove from List":"My List"}}
        </button>
        <button class="btn-info">
          <i class="fas fa-info"></i> Info
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fs } from "../config/fbconfig";
import { mapState, mapActions } from "vuex";
export default {
  props: ["focus"],
  data() {
    return {
      videoLoaded: false,
      videoLink: false,
      isFavourite: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.fetchVideo();
    }, 7500);
  },
  computed: {
    ...mapState(["profileId", "favourites"])
  },
  methods: {
    ...mapActions(["removeFavourite", "addFavourite"]),
    async fetchVideo() {
      this.checkIfFavourite();
      await fetch(
        `https://api.themoviedb.org/3/${this.focus.name ? "tv" : "movie"}/${
          this.focus.id
        }/videos?api_key=${process.env.VUE_APP_TMDB_API_KEY}&language=en-US`
      )
        .then(res => res.json())
        .then(data => (this.videoLink = data.results[0].key));
    },
    showVideo() {
      setTimeout(() => (this.videoLoaded = true), 2500);
    },
    addToList() {
      let contentToAdd = {
        name: this.focus.name ? this.focus.name : this.focus.title,
        id: this.focus.id,
        backdrop_path: this.focus.backdrop_path,
        poster_path: this.focus.poster_path,
        overview: this.focus.overview,
        vote_average: this.focus.vote_average,
        release_date: this.focus.first_air_date
          ? this.focus.first_air_date.substr(0, 4)
          : this.focus.release_date.substr(0, 4)
      };
      fs.collection("users")
        .doc(localStorage.userId)
        .collection("profiles")
        .doc(this.profileId)
        .collection("favourites")
        .doc(String(this.focus.id))
        .set(contentToAdd);
      this.addFavourite(contentToAdd);
      this.isFavourite = true;
    },
    removeFromList() {
      fs.collection("users")
        .doc(localStorage.userId)
        .collection("profiles")
        .doc(this.profileId)
        .collection("favourites")
        .doc(String(this.focus.id))
        .delete();
      this.removeFavourite(this.focus.id);
      this.isFavourite = false;
    },
    checkIfFavourite() {
      this.favourites.forEach(element => {
        if (String(this.focus.id) === String(element.id)) {
          this.isFavourite = true;
          return false;
        }
      });
    }
  }
};
</script>