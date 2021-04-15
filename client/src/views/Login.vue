<template>
  <div class="login">
    <h1>Login</h1>
  </div>
  <div id="login-form">
    <input v-model="username" placeholder="user" />
    <input v-model="password" placeholder="pass" />
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";

function submit() {
  alert("Hello " + this.username + "!");
}

@Options({
  methods: {
    submit,
  },
})
export default class Login extends Vue {}
</script>
