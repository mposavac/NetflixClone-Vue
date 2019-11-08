<template>
  <div class="list">
    <h2>List Title</h2>
    <div class="wrapper">
      <div class="slides" :style="'left: '+leftShifting+'vw'">
        <div class="slide" v-for="(slide, slIndex) in slides" :key="slIndex">
          <div
            class="item"
            v-for="(movie,index) in slide"
            :key="index"
            @click="handleDetails(index)"
          >
            <img :src="'http://image.tmdb.org/t/p/w154'+movie.poster_path" alt="NoPoster" />
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
  props: ["temp", "selected", "index", "changeIndex"],
  components: {
    Details
  },
  data() {
    return {
      slideIndex: 0,
      shifting: false,
      slided: false,
      slides: [],
      leftShifting: null,
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
        this.shiftStyle("left");
        if (this.slideIndex === 0) this.slideIndex = this.slides.length - 1;
        else this.slideIndex--;
      }
      console.log(this.slides);
    },
    next() {
      if (!this.slided) this.slided = true;
      if (!this.shifting) {
        this.shifting = true;
        setTimeout(() => (this.shifting = false), 500);
        this.shiftStyle("right");
        if (this.slideIndex === this.slides.length - 1) this.slideIndex = 0;
        else this.slideIndex++;
      }
      console.log(this.slides);
    },
    shiftStyle(direction) {
      if (direction === "right") {
        if (this.slideIndex === this.slides.length - 1) this.leftShifting = 3;
        else this.leftShifting -= 92;
      } else {
        if (this.slideIndex === 0)
          this.leftShifting = -(this.slides.length - 1) * 92 + 3;
        else this.leftShifting += 92;
      }
      console.log(this.leftShifting);
    },
    defineSlides() {
      this.leftShifting = 3;
      let n = 0;
      let chunk = Math.floor((window.innerWidth - 80) / 154);
      let array = [];
      while (n < this.temp.length) {
        array.push(this.temp.slice(n, n + chunk));
        n += chunk;
      }
      this.slides = array;
    }
  },
  mounted() {
    window.addEventListener("resize", this.defineSlides);
    this.defineSlides();
  }
};
</script>