<template>
  <h5>Logging out...</h5>
</template>

<script>
import { Options, Vue } from "vue-class-component";

import router from "@/router/index.ts";

@Options({
  created() {
    // Do not log out if not authorized
    if (!this.$store.state.authorized) return router.push("/");

    this.$store.commit("setAuthorization", false);
    this.$store.commit("setServiceToken", "");
    return router.push("/login");
  },
})
export default class Logout extends Vue {}
</script>
