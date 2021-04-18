<script>
import { Options, Vue } from "vue-class-component";

import router from "@/router/index.ts";

@Options({
  created() {
    // Do not log out if not authorized
    if (!this.$store.state.authorized)
      return router.push("/");

    this.$store.state.serviceToken = "";
    this.$store.state.authorized = false;
    return router.push("/");
  },
})
export default class Logout extends Vue {}
</script>