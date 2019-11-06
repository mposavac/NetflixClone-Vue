<template>
  <div class="list">
    <h2>List Title</h2>
    <div class="items-wrapper">
      <section>
        <img
          class="arrow right"
          src="https://img.icons8.com/carbon-copy/50/000000/expand-arrow.png"
        />
        <div class="item" v-for="(movie,index) in temp" :key="index" @click="handleDetails(index)">
          <img :src="'http://image.tmdb.org/t/p/w154'+movie.poster_path" alt="NoPoster" />
        </div>
        <img class="arrow left" src="https://img.icons8.com/carbon-copy/50/000000/expand-arrow.png" />
      </section>
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
      detailsOpen: false,
      detailsContent: []
    };
  },
  methods: {
    handleDetails(index) {
      this.detailsContent = this.temp[index];
      this.detailsOpen = true;
      this.changeIndex(this.index);
    },
    closeDetails() {
      this.detailsOpen = false;
    }
  }
};
</script>