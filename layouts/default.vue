<template>
  <div id="app">
    <navigation></navigation>
    <main>
      <nuxt></nuxt>
    </main>
    <footer>
      Powered by <a href="https://github.com/nanofus/broadside">Broadside</a>
    </footer>
  </div>
</template>

<script>
import navigation from '~/components/navigation.vue'

export default {
  components: {navigation}
}
</script>

<style lang="scss">
$text-color: #333;
$dim-text-color: #bdbdbd;
$background-color: #FFF;
$link-color: #03a9f4;
$visited-color: #0277bd;

$normal-font-size: 1rem;
$small-font-size: 80%;
$post-title-size: 2rem;

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

html {
  height:100%;
}

body {
  margin: 0;
  min-height: 100%;
  position: relative;

  font-family: 'PT Serif', serif;
  font-size: $normal-font-size;
  color: $text-color;

  background-color: $background-color;

  a {
    text-decoration: none;
    &:link {
      color: $link-color;
    }
    &:visited {
      color: $visited-color;
    }
    &:hover {
      color: $visited-color;
    }
    &:active {
      color: $visited-color;
    }
  }

  span.dim-text {
    color: $dim-text-color;
    font-size: $small-font-size;
  }

  main {
    margin: 1rem auto 0 auto;
    padding-bottom: 3rem;
    max-width: 40rem;

    h2 {
      font-size: $post-title-size;
    }

    #poster-list li {
      display: inline;
      list-style-type: none;
      padding-right: 2rem;
    }

    article {
      margin: 2rem auto 1rem auto;
      max-width: 32rem;

      h3 {
        font-size: 1.5rem;
      }
    }

    .main-content {
      margin: 0 2rem 0 2rem;
    }
  }

  footer {
    margin: 1rem auto 0 auto;
    padding: 1rem 0 0 0;

    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2rem;

    font-size: $small-font-size;
    text-align: center;
    color: $background-color;
    background-color: $text-color;
  }

  &::after{
    content: '';
    display: block;
    height: 2rem;
  }
}
</style>
