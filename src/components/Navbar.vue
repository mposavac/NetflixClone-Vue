<template>
  <div :class="scrolling ? 'nav scroll' : 'nav'">
    <img src="../assets/logo.png" alt srcset />
    <p>Home</p>
    <p>Tv Shows</p>
    <p>Movies</p>
    <p>Recently Added</p>
    <p>My List</p>
  </div>
</template>

<script>
//JOŠ DODATI I SERACH BAR ITD... OVISNO STA CE SE POKATIVATI
export default {
  props: ["scrolling"],
  data() {
    return {};
  }
};
</script>