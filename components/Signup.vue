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

      <button type="submit" class="btn btn-warning btn-lg">Signup</button>
    </form>
  </div>
</template>
