<template>
  <div class="browse-main">
    <transition name="video_fade">
      <video
        v-if="loading"
        autoplay
        muted
        poster="../assets/black.jpg"
        src="../assets/logo_video.mp4"
      />
    </transition>
    <Navbar :scrolling="scrolling" :profileId="profileId" />
    <main>
      <Billboard :focus="temp2[RANDOM]" />
      <List :temp="temp2" :index="0" :selected="selectedIndex" :changeIndex="changeDetailsIndex" />
      <List :temp="temp2" :index="1" :selected="selectedIndex" :changeIndex="changeDetailsIndex" />
      <List :temp="temp2" :index="2" :selected="selectedIndex" :changeIndex="changeDetailsIndex" />
      <List :temp="temp2" :index="3" :selected="selectedIndex" :changeIndex="changeDetailsIndex" />
      <List :temp="temp2" :index="4" :selected="selectedIndex" :changeIndex="changeDetailsIndex" />
      <List :temp="temp2" :index="5" :selected="selectedIndex" :changeIndex="changeDetailsIndex" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import List from "../components/List";
import Footer from "../components/Footer";

import { mapState } from "vuex";
export default {
  name: "browse",
  props: ["profileId"],
  data() {
    return {
      loading: true /*PROMJIENITI U TRUE */,
      scrolling: false,
      selectedIndex: null,
      RANDOM: Math.floor(Math.random() * 20) //MAKNUTI NA KRAJU
    };
  },
  components: {
    Navbar,
    Billboard,
    List,
    Footer
  },
  computed: {
    ...mapState(["temp", "temp2"])
  },
  mounted() {
    setTimeout(() => (this.loading = false), 5500);
    document.addEventListener("scroll", this.handleScroll);
    console.log(this.temp2);
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset < 25) this.scrolling = false;
      else this.scrolling = true;
    },
    changeDetailsIndex(index) {
      this.selectedIndex = index;
    }
  }
};
</script>