<template>
    <div v-if="showBackground" class="blog-post-background"></div>
  </template>
  
  <style scoped>
  .blog-post-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  </style>
  
  <script>
  export default {
    props: {
      showBackground: Boolean,
    },
  };
  </script>
  