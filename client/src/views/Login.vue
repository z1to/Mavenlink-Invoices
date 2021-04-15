<template>
  <div class="login">
    <h1>Login</h1>
  </div>
  <div id="login-form">
    <input v-model="username" placeholder="user" />
    <input v-model="password" placeholder="pass" />
    <button @click="login">Submit</button>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

import { Options, Vue } from "vue-class-component";

async function login() {
  const data = {
    "username": this.username,
    "password": this.password,
  };

  const options = {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", "Access-Control-Allow-Origin": "*" },
    data: qs.stringify(data),
    url: "http://localhost:5000/login",
  };

  let status, token, error;
  axios(options)
    .then((res) => {
      status = res.status;
      token = res.data.message;
    })
    .catch((err) => {
        error = err;
    });
}

@Options({
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    login,
  },
})
export default class Login extends Vue {}
</script>
