<template>
  <b-container fluid class="form">
    <b-row class="h-100">
      <b-col lg="5" cols="8" class="m-auto login-content">
        <b-form>
          <header>
            <h3 class="title">Create your password</h3>
          </header>
          <section>
            <b-form-group>
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                placeholder="Password"
                autocomplete="on"
                required
              ></b-form-input>
            </b-form-group>
          </section>
          <footer class="center">
            <b-button
              class="button is-primary"
              @click="check()"
              :disabled="loading"
              >Access account</b-button
            >
          </footer>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      loading: false,
    };
  },
  methods: {
    makeToast() {
      this.$bvToast.toast("Token invalid", {
        title: "Error",
        variant: "danger",
        solid: true,
      });
    },
    check() {
      this.loading = true;
      let { password } = this;
      const hash = this.$route.params.hash
      this.$api
        .post(`/api/auth/create-password`, {
          password,
          hash
        })
        .catch((error) => {
          console.log("error", error);
          this.makeToast();
        })
        .then((res) => {
          if (res != undefined) {
            localStorage.setItem("token", res.data.token.token);
            localStorage.setItem("refreshToken", res.data.token.refreshToken);
            localStorage.setItem("name", res.data.name);
            window.location.href = process.env.VUE_APP_EVENTS_URL;
          } else {
            this.makeToast();
            this.loading = false;
          }
        });
    },
  },
};
</script>

<style scoped>
.login-content {
  background-color: white;
  padding: 3em;
  border-radius: 0.5rem;
}
.title {
  color: #909090;
  letter-spacing: 1px;
  margin-bottom: 2rem;
  font-weight: bold;
}
.form {
  height: 100vh;
  background: linear-gradient(0deg, #6930c3, #80ffdb);
}
</style>