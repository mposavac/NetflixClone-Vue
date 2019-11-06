<template>
  <div class="billboard">
    <img
      class="poster"
      :src="'http://image.tmdb.org/t/p/original/'+focus.backdrop_path"
      alt="noPoster"
    />
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
  props: ["focus"]
};
</script>