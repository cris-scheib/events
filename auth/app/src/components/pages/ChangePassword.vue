<template>
  <layout>
    <b-container fluid>
      <div class="avatar">
        <div class="icon">
          <b-icon icon="person"></b-icon>
        </div>
      </div>
      <h5 class="text-center">Change your passwoard</h5>
      <b-row class="center form-password">
        <b-col cols="12" md="6">
          <b-form>
            <section>
              <b-form-group>
                <b-form-input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Current Password"
                  class="mt-3"
                  required
                  autocomplete="on"
                ></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input
                  id="newPassword"
                  v-model="newPassword"
                  type="password"
                  placeholder="New Password"
                  required
                  autocomplete="on"
                ></b-form-input>
              </b-form-group>
            </section>
            <footer class="center">
              <b-button
                class="button is-primary"
                @click="changePassword()"
                :disabled="loading"
                >Update password</b-button
              >
            </footer>
          </b-form>
           <div class="btn-back-content">
              <b-link href="/me" class="btn">
              Go back
            </b-link>
           </div>
        </b-col>
      </b-row>
    </b-container>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      password: "",
      newPassword: "",
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
    changePassword() {
      let { password, newPassword } = this;
      this.loading = true;
      this.$api
        .put(`/api/user/password/`, { password, newPassword })
        .then((res) => {
          this.makeToast("success", res.data.message);
          this.password = "";
          this.newPassword = "";
          this.loading = false;
        })
        .catch((error) => {
          this.makeToast("danger", error.message);
          console.log("error", error);
          this.loading = false;
        });
    },
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
.btn-back-content{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
}
.btn-back-content a{
  width: unset;
}
</style>