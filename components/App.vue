<template>
  <div>
    <h1>Basic</h1>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/login">/foo</router-link></li>
      <li><router-link to="/signup">/bar</router-link></li>
      <li><router-link to="/post/arstein">/arstein</router-link></li>
    </ul>
    <router-view class="view"></router-view>
  </div>
</template>
