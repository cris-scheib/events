<template>
  <b-container fluid class="form">
    <b-row class="h-100">
      <b-col lg="5" cols="8" class="m-auto login-content">
        <b-form v-if="!hasHash">
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
            <b-form-group v-if="!hasPassword">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                placeholder="E-mail"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group v-if="!account || hasPassword">
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
        <div v-else>
          <h4>
            An email was sent to your account where you will have the
            instructions to complete your registration.
          </h4>
          <b-button
            type="button"
            class="mt-4"
            variant="primary"
            @click="
              hasHash = false;
              hasPassword = false;
            "
          >
            Ok
          </b-button>
        </div>
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
      hasPassword: false,
      hasHash: false,
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
      if (this.account && !this.hasPassword) {
        let { email } = this;
        this.$api
          .post(`/api/user/verify-hash/`, { email })
          .catch((error) => {
            console.log("error", error);
          })
          .then((res) => {
            this.hasPassword = !res.data.hasHash;
            this.hasHash = res.data.hasHash;
            if (this.hasHash) {
              const user_id = res.data.user_id;
              this.$api.post(`/api/mailer/login`, { user_id });
            }
          });
      } else {
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
      }
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