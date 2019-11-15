<template>
  <div>
    <div class="details-wrapper">
      <div class="text-wrapper">
        <h1 key="h1">{{content.name ? content.name : content.title}}</h1>
        <div key="basic" class="basic-info">
          <p class="match">{{content.vote_average*10}}% Match</p>
          <p
            class="year"
          >{{content.first_air_date ? content.first_air_date.substr(0,4) : content.release_date.substr(0,4)}}</p>
          <p class="adult">13 +</p>
        </div>
        <p key="desciption" class="description">{{content.overview.substr(0,386)}}</p>
        <div key="buttons" class="buttons">
          <button class="btn-play">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/play.png" /> PLAY
          </button>
          <button class="btn-list" @click="isFavourite ? removeFromList() : addToList()">
            <i v-if="isFavourite" class="fas fa-minus" />
            <i v-else class="fas fa-plus" />
            {{isFavourite ? "REMOVE":"MY LIST"}}
          </button>
          <i class="far fa-thumbs-up"></i>
          <i class="far fa-thumbs-up dislike"></i>
        </div>
      </div>

      <i @click="closeDetails" class="fas fa-times"></i>
      <transition name="picture_fade">
        <img
          class="poster"
          v-if="!this.videoLoaded"
          :src="'https://image.tmdb.org/t/p/w1280'+content.backdrop_path"
          alt="noImg"
        />
      </transition>
      <iframe
        @load="this.showVideo"
        width="640"
        height="360"
        :src="'https://www.youtube.com/embed/'+this.videoLink+'?autoplay=1&mute=1&enablejsapi=1&disablekb=1&loop=1&controls=0&modestbranding=1&playlist='+this.videoLink"
        frameborder="0"
        style="border: solid 4px #37474F"
        allow="geolocation"
      ></iframe>
    </div>
  </div>
</template>
<script>
import { fs } from "../config/fbconfig";
import { mapState, mapActions } from "vuex";
export default {
  props: ["content", "closeDetails"],
  data() {
    return {
      videoLink: "",
      videoLoaded: false,
      isFavourite: false
    };
  },
  watch: {
    content: "fetchVideo"
  },
  mounted() {
    this.fetchVideo();
  },
  computed: {
    ...mapState(["profileId", "favourites"])
  },
  methods: {
    ...mapActions(["removeFavourite", "addFavourite"]),
    checkIfFavourite() {
      this.favourites.forEach(element => {
        if (String(this.content.id) === String(element.id)) {
          this.isFavourite = true;
          return false;
        }
      });
    },
    async fetchVideo() {
      (this.videoLink = ""), (this.videoLoaded = false);
      this.isFavourite = false;
      this.checkIfFavourite();
      await fetch(
        `https://api.themoviedb.org/3/${this.content.name ? "tv" : "movie"}/${
          this.content.id
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
        name: this.content.name ? this.content.name : this.content.title,
        id: this.content.id,
        backdrop_path: this.content.backdrop_path,
        poster_path: this.content.poster_path,
        overview: this.content.overview,
        vote_average: this.content.vote_average,
        release_date: this.content.first_air_date
          ? this.content.first_air_date.substr(0, 4)
          : this.content.release_date.substr(0, 4)
      };
      fs.collection("users")
        .doc(localStorage.userId)
        .collection("profiles")
        .doc(this.profileId)
        .collection("favourites")
        .doc(String(this.content.id))
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
        .doc(String(this.content.id))
        .delete();
      this.removeFavourite(this.content.id);
      this.isFavourite = false;
    }
  }
};
</script>