<template>
  <div :class="bigList ? 'list netflix-originals' : 'list'">
    <h2>{{listTitle}}</h2>
    <div class="wrapper">
      <div
        class="slides"
        v-touch:swipe.left="next"
        v-touch:swipe.right="prev"
        :style="shiftStyling()"
      >
        <div class="slide" v-for="(slide, slIndex) in slides" :key="slIndex">
          <div
            class="item"
            v-for="(movie,index) in slide"
            :key="index"
            @click="handleDetails(index)"
          >
            <img
              :src="movie.poster_path ?  (`http://image.tmdb.org/t/p/${bigList ? 'w300':'w154'}`+movie.poster_path ):'https://yt3.ggpht.com/a/AGF-l7_XQ2zk0B1EgO1rElgbqLt_zR2_JN8uQB3yow=s900-c-k-c0xffffffff-no-rj-mo'"
              alt="NoPoster"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="arrow-div right" @click="next">
      <img class="arrow" src="https://img.icons8.com/carbon-copy/50/000000/expand-arrow.png" />
    </div>
    <div :class="slided ? 'arrow-div left' : 'arrow-div left hidden'" @click="prev">
      <img class="arrow" src="https://img.icons8.com/carbon-copy/50/000000/expand-arrow.png" />
    </div>

    <transition name="details">
      <Details
        v-if="detailsOpen && selected===index"
        :content="detailsContent"
        :closeDetails="closeDetails"
      />
    </transition>
  </div>
</template>

<script>
import Details from "./Details";
export default {
  props: [
    "content",
    "selected",
    "index",
    "changeIndex",
    "bigList",
    "listTitle"
  ],
  components: {
    Details
  },
  data() {
    return {
      slideIndex: 0,
      shifting: false,
      slided: false,
      slides: [],
      mobile: false,
      detailsOpen: false,
      detailsContent: []
    };
  },
  methods: {
    handleDetails(index) {
      this.detailsContent = this.slides[this.slideIndex][index];
      this.detailsOpen = true;
      this.changeIndex(this.index);
    },
    closeDetails() {
      this.detailsOpen = false;
    },
    prev() {
      if (!this.shifting) {
        this.shifting = true;
        setTimeout(() => (this.shifting = false), 500);
        if (this.slideIndex === 0) this.slideIndex = this.slides.length - 1;
        else this.slideIndex--;
      }
    },
    next() {
      if (!this.slided) this.slided = true;
      if (!this.shifting) {
        this.shifting = true;
        setTimeout(() => (this.shifting = false), 500);
        if (this.slideIndex === this.slides.length - 1) this.slideIndex = 0;
        else this.slideIndex++;
      }
    },
    defineSlides() {
      let divider = 154;
      if (this.bigList) divider = 240;
      if (window.innerWidth < 750 && !this.bigList) divider = 154 / 2;
      if (window.innerWidth < 750 && this.bigList) divider = 154 - 17;
      this.leftShifting = 40;
      let n = 0;
      let chunk = Math.floor((window.innerWidth - 80) / divider);
      let array = [];
      while (n < this.content.length) {
        array.push(this.content.slice(n, n + chunk));
        n += chunk;
      }
      this.slides = array;
    },
    shiftStyling() {
      if (!this.mobile)
        return (
          "left: calc(" +
          this.slideIndex * 97 +
          "px - " +
          this.slideIndex * 100 +
          "vw)"
        );
      else
        return (
          "left: calc(" +
          (this.slideIndex > 1 ? this.slideIndex - 2 : 0) +
          "px + " +
          this.slideIndex * 17 +
          "px - " +
          this.slideIndex * 90 +
          "vw)"
        );
    },
    mobileShifting() {
      console.log("SHIF");
    }
  },
  mounted() {
    window.addEventListener("resize", this.defineSlides);
    if (window.innerWidth < 750) this.mobile = true;
    this.defineSlides();
  }
};
</script>