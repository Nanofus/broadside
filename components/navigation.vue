<template>
  <header>
    <div id="header-image"></div>
</header>
</template>

<style>

header {
  margin: 0 auto 1rem auto;
}

#header-image {
    margin: auto;
    height: 12.5rem;
    width: 75rem;
    background-image: url("~/images/header.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

#main-menu {
    width: 75rem;
    margin: auto;

    li {
      display: inline;
      list-style-type: none;
      padding-right: 2rem;
  }
}

#user-info {
    right: 0;
    display: inline-block;
}

</style>
