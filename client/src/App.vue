<template>
  <div v-if="!this.$store.state.authorized" id="nav">
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </div>
  <div v-else id="nav">
    <router-link to="/task-editor">Task Editor (Beta) </router-link> |
    <router-link to="/create-invoice">Create Invoice</router-link> |
    <router-link to="/view-invoices">View Invoices</router-link> |
    <router-link to="/logout">Logout</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
