<template>
  <div class="list">
    <h2>List Title</h2>
    <div class="wrapper">
      <div class="slides" :style="shiftStyle()">
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
    shiftStyle() {
      if (this.slideIndex === 0) return "left: 3%";
      if (this.slideIndex === 1) return "left: -89%";
      return "left: -181%";
    }
  },
  computed: {
    slides: function() {
      let n = 0;
      let chunk = 8;
      let array = [];
      while (n < this.temp.length) {
        array.push(this.temp.slice(n, n + chunk));
        n += chunk;
      }
      return array;
    }
  }
};
</script>