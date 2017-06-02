<template>
  <div>
    <h3>Login</h3>
    <form action="/api/login" method="post">
      <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" name="username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="password">
      </div>
      <div class="form-group">
        <label>Remember Me</label>
        <input type="checkbox" class="form-control" name="remember" value="yes">
      </div>

      <button type="submit" class="btn btn-warning btn-lg">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: 'joe@example.com',
      pass: '',
      error: false
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>
