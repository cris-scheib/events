<template>
  <layout>
    <b-container fluid>
      <div class="avatar">
        <div class="icon">
          <b-icon icon="person"></b-icon>
        </div>
      </div>
      <h5 class="text-center">Change your profile</h5>
      <b-row class="center">
        <b-col cols="12" md="6">
          <b-form>
            <section>
              <b-form-group>
                <b-form-input
                  id="name"
                  v-model="name"
                  type="text"
                  class="mt-3"
                  placeholder="Name"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  id="document"
                  v-model="document"
                  v-mask="'###.###.###-##'"
                  type="text"
                  placeholder="Document"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  required
                  disabled
                ></b-form-input>
              </b-form-group>
            </section>
            <footer class="center">
              <b-button
                class="button is-primary"
                @click="changeProfile()"
                :disabled="loading"
                >Update profile</b-button
              >
            </footer>
          </b-form>
          <div class="btn-back-content">
            <b-link href="/me" class="btn"> Go back </b-link>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </layout>
</template>

<script>
import { mask } from "vue-the-mask";
import Layout from "../layout/Layout.vue";

export default {
  directives: { mask },
  components: {
    Layout,
  },
  data() {
    return {
      name: "",
      document: "",
      email: "",
      loading: false,
      errors: [],
      errorsDuration: 12000,
    };
  },
  methods: {
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    changeProfile() {
      let { name, document } = this;
      this.loading = true;
      this.$api
        .put(`/api/user/profile/`, { name, document })
        .then((res) => {
          localStorage.setItem("name", res.data.user.name);
          localStorage.setItem("document", res.data.user.document);
          this.makeToast("success", res.data.message);
          this.loading = false;
        })
        .catch((error) => {
          this.makeToast("danger", error.message);
          console.log("error", error);
          this.loading = false;
        });
    },
  },
  created: function () {
    this.$api
      .get(`/api/user/`)
      .then((res) => res.data)
      .then((data) => {
        this.name = data.name;
        this.document = data.document;
        this.email = data.email;
      });
  },
};
</script>
<style scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}
.icon {
  padding: 1rem;
  background-color: #80fedb;
  border-radius: 100%;
}
.icon .b-icon.bi {
  color: white;
  font-size: 3rem;
}
.btn-back-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
}
.btn-back-content a {
  width: unset;
}
</style>