<template>
  <div class="register">
    <h1>Register</h1>
  </div>
  <div id="register-form">
    <label for="mavenlinkUsername">Mavenlink Username </label>
    <input v-model="mavenlinkUsername" id="mavenlinkUsername" /><br />

    <label for="password">Password </label>
    <input v-model="password" id="password" /><br />

    <label for="name">Name </label>
    <input v-model="name" id="name" /><br />

    <label for="address">Address </label>
    <input v-model="address" id="address" /><br />

    <label for="phone">Phone number </label>
    <input v-model="phone" id="phone" /><br />

    <label for="email">Email </label>
    <input v-model="email" id="email" /><br /><br />

    <button @click="register">Submit</button>
  </div>
  <h5 v-if="error">Error: {{ error }}</h5>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { Options, Vue } from "vue-class-component";

import router from "@/router/index.ts";

async function register() {
  const data = {
    mavenlinkUsername: this.mavenlinkUsername,
    password: this.password,
    name: this.name,
    address: this.address,
    phone: this.phone,
    email: this.email,
  };

  let prop;
  for (prop in data) {
    if (data[prop] == "") {
      this.error = prop + " field is empty";
      return;
    }
  }

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    data: qs.stringify(data),
    url: "http://localhost:5000/register",
  };

  await axios(options)
    .then((res) => {
      this.status = res.status;
      this.token = res.data.message;

      if (this.status == 200) {
        switch (this.token) {
          case "User could not be created. Mavenlink username is already in use.":
            this.error = this.token;
            break;
          default:
            return router.push("/login");
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
      mavenlinkUsername: "",
      password: "",
      name: "",
      address: "",
      phone: "",
      email: "",
      error: "",
    };
  },
  created() {
    // If already authorized redirect to home
    if (this.$store.state.authorized == true) {
      return router.push("/");
    }
  },
  methods: {
    register,
  },
})
export default class Register extends Vue {}
</script>
