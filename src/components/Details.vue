<template>
  <div>
    <div class="details-wrapper">
      <div class="text-wrapper">
        <h1>{{content.name ? content.name : content.title}}</h1>
        <div class="basic-info">
          <p class="match">{{content.vote_average*10}}% Match</p>
          <p
            class="year"
          >{{content.first_air_date ? content.first_air_date.substr(0,4) : content.release_date.substr(0,4)}}</p>
          <p class="adult">13 +</p>
        </div>
        <p class="description">{{content.overview.substr(0,386)}}</p>
        <div class="buttons">
          <button class="btn-play">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/play.png" /> PLAY
          </button>
          <button class="btn-list">
            <i class="fas fa-plus" /> MY LIST
          </button>
          <i class="far fa-thumbs-up"></i>
          <i class="far fa-thumbs-up dislike"></i>
        </div>
        <div>Starring .....</div>
        <div>Genres ....</div>
      </div>
      <i @click="closeDetails" class="fas fa-times"></i>
      <transition name="video_fade">
        <img
          class="poster"
          v-if="!this.videoLoaded"
          :src="'http://image.tmdb.org/t/p/w1280'+content.backdrop_path"
          alt="noImg"
        />
      </transition>
      <iframe
        @load="this.showVideo"
        id="existing-iframe-example"
        width="640"
        height="360"
        :src="'https://www.youtube.com/embed/'+this.videoLink+'?autoplay=1&mute=1&enablejsapi=1&showinfo=0&controls=0'"
        frameborder="0"
        style="border: solid 4px #37474F"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  props: ["content", "closeDetails"],
  data() {
    return {
      videoLink: "",
      videoLoaded: false
    };
  },
  watch: {
    content: "fetchVideo"
  },
  mounted() {
    this.fetchVideo();
  },
  methods: {
    async fetchVideo() {
      this.videoLoaded = false;
      await fetch(
        `https://api.themoviedb.org/3/movie/${this.content.id}/videos?api_key=5c9b7f26ee7ebb9e910bf1ec551bf09b&language=en-US`
      )
        .then(res => res.json())
        .then(data => (this.videoLink = data.results[0].key));
      console.log(this.videoLink);
    },
    showVideo() {
      setTimeout(() => (this.videoLoaded = true), 1000);
    },
    videoEnded() {
      console.log("ENDED");
    }
  }
};
</script>