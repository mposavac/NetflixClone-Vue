<template>
  <div class="billboard">
    <transition name="picture_fade">
      <img
        class="poster"
        v-if="!this.videoLoaded"
        :src="'http://image.tmdb.org/t/p/original/'+focus.backdrop_path"
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
        <button class="btn-list">
          <i class="fas fa-plus"></i> My List
        </button>
        <button class="btn-info">
          <i class="fas fa-info"></i> Info
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["focus"],
  data() {
    return {
      videoLoaded: false,
      videoLink: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.fetchVideo();
    }, 7500);
  },
  methods: {
    async fetchVideo() {
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
    }
  }
};
</script>