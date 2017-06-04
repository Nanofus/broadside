<template>
  <div>
    <h3>Sign up</h3>
    <form action="/api/signup" method="post">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" name="username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="password">
      </div>

      <div class="g-recaptcha" data-sitekey="6LeP-SMUAAAAAD9jz3za3PwKznI0Sw2GCrHJoiaK"></div>

      <button type="submit" class="btn btn-warning btn-lg">Signup</button>
    </form>
  </div>
</template>
