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
      <Billboard :focus="netflixOriginal[RANDOM]" />
      <List
        listTitle="Tv shows"
        :content="tv"
        :index="0"
        :selected="selectedIndex"
        :changeIndex="changeDetailsIndex"
      />
      <List
        listTitle="New Movies"
        :content="movie"
        :index="1"
        :selected="selectedIndex"
        :changeIndex="changeDetailsIndex"
      />
      <List
        listTitle="Netflix Originals"
        :content="netflixOriginal"
        :index="2"
        :selected="selectedIndex"
        :changeIndex="changeDetailsIndex"
        bigList="true"
      />
      <List
        listTitle="Just for you"
        :content="tv"
        :index="3"
        :selected="selectedIndex"
        :changeIndex="changeDetailsIndex"
      />
      <List
        listTitle="Recently Added"
        :content="movie"
        :index="4"
        :selected="selectedIndex"
        :changeIndex="changeDetailsIndex"
      />
      <List
        listTitle="Leaving Soon"
        :content="netflixOriginal"
        :index="5"
        :selected="selectedIndex"
        :changeIndex="changeDetailsIndex"
      />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import Billboard from '../components/Billboard';
import List from '../components/List';
import Footer from '../components/Footer';

import { mapState } from 'vuex';
export default {
  name: 'browse',
  props: ['profileId'],
  data() {
    return {
      loading: true,
      scrolling: false,
      selectedIndex: null,
      RANDOM: Math.floor(Math.random() * 20)
    };
  },
  components: {
    Navbar,
    Billboard,
    List,
    Footer
  },
  computed: {
    ...mapState(['movie', 'tv', 'netflixOriginal'])
  },
  mounted() {
    setTimeout(() => (this.loading = false), 5500);
    document.addEventListener('scroll', this.handleScroll);
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