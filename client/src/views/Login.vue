<template>
  <div class="login">
    <h1>Login</h1>
  </div>
  <div id="login-form">
    <input v-model="username" placeholder="user" />
    <input v-model="password" placeholder="pass" />
    <button @click="login">Submit</button>
  </div>
  <h5 v-if="error">Error: {{ error }}</h5>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { Options, Vue } from "vue-class-component";

import router from "@/router/index.ts";

async function login() {
  const data = {
    mavenlinkUsername: this.username,
    password: this.password,
  };

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
    url: "http://localhost:5000/login",
  };

  await axios(options)
    .then((res) => {
      this.status = res.status;
      this.token = res.data.message;

      if (this.status == 200) {
        switch (this.token) {
          case 'User not found' || 'Invalid password':
              this.error = this.token;
              break;
          default:
            console.log('That');
            this.$store.commit('setAuthorization', true);
            this.$store.commit('setServiceToken', this.token);
            return router.push('/');
        }
      }
    })
    .catch((err) => {
      this.error = err;
    });
}

@Options({
  data() {
    return {
      username: "",
      password: "",
      status: "",
      token: "",
      error: "",
    };
  },
  created() {
    // If already authorized redirect to home
    if (this.$store.state.authorized == true) {
        return router.push('/');
    }
  },
  methods: {
    login,
  },
})
export default class Login extends Vue {}
</script>
