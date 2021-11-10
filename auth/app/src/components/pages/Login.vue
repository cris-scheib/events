<template>
  <b-container fluid class="form">
    <b-row class="h-100">
      <b-col lg="5" cols="8" class="m-auto login-content">
        <b-form>
          <header>
            <h3 class="title">
              {{ account ? "Login with your account" : "Have an account?" }}
            </h3>
          </header>
          <section>
            <b-form-group v-if="!account">
              <b-form-input
                id="name"
                v-model="name"
                type="text"
                placeholder="Name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group v-if="!account">
              <b-form-input
                id="document"
                v-model="document"
                type="text"
                v-mask="'###.###.###-##'"
                placeholder="Document"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                placeholder="E-mail"
                required
              ></b-form-input>
            </b-form-group>

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

            <b-form-group>
              <b-form-checkbox v-model="account"
                >I already have an account</b-form-checkbox
              >
            </b-form-group>
          </section>
          <footer class="center">
            <b-button
              class="button is-primary"
              @click="check()"
              :disabled="loading"
            >
              {{ account ? "Login" : "Sign in" }}</b-button
            >
          </footer>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
  props: ["hasAccount"],
  data() {
    return {
      name: "",
      document: "",
      email: "",
      password: "",
      account: this.hasAccount,
      loading: false,
    };
  },
  methods: {
    makeToast() {
      this.$bvToast.toast("Email or password invalid", {
        title: "Error",
        variant: "danger",
        solid: true,
      });
    },
    check() {
      this.loading = true;
      let { name, email, password, document } = this;
      this.$api
        .post(`/api/auth/${this.account ? "login" : "register"}`, {
          name,
          email,
          document,
          password,
        })
        .catch((error) => {
          console.log("error", error);
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