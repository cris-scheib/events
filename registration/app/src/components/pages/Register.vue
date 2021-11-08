<template>
  <layout>
    <b-container fluid>
      <main v-if="loaded">
        <b-row>
          <b-col cols="12">
            <h2 class="mb-3 text-center">{{ event.title }}</h2>
            <div class="event-info">
              <p>
                <b-icon icon="calendar4-event"></b-icon>
                {{ formatDate(event.dateTimeEvent) }}
              </p>
              <p class="ml-3">
                <b-icon icon="geo-alt"></b-icon>
                {{ event.local }}
              </p>
            </div>
          </b-col>
          <hr class="w-100" />
          <b-col cols="12">
            <div class="d-flex justify-content-center mt-4">
              <b-form @submit="verifyUser">
                <b-form-group
                  v-if="!notRegistered"
                  id="document-label"
                  label="Document:"
                  label-for="document1"
                  description="Documents already registered will be confirmed directly."
                >
                  <b-form-input
                    id="document"
                    v-model="document"
                    type="text"
                    v-mask="'###.###.###-##'"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group
                  v-if="notRegistered"
                  id="name-label"
                  label="Full name:"
                  label-for="name"
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    type="text"
                    required
                  ></b-form-input>
                  <b-form-group
                    v-if="notRegistered"
                    id="email-label"
                    label="E-mail:"
                    label-for="email"
                    description="E-mail for account confirmation."
                  >
                    <b-form-input
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-form-group>
                <b-button type="button" variant="primary" @click="verifyUser"
                  >Confirm entry</b-button
                >
              </b-form>
            </div>
          </b-col>
        </b-row>
      </main>
    </b-container>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import moment from "moment";
import axios from "axios";
import { mask } from "vue-the-mask";

export default {
  components: {
    Layout,
  },
  directives: { mask },
  data() {
    return {
      event: null,
      loaded: false,
      document: null,
      email: null,
      name: null,
      notRegistered: false,
      user: null,
    };
  },
  created: function () {
    this.$api
      .get(`/registration/${this.$route.params.slug}`)
      .then((res) => res.data)
      .then((data) => {
        this.event = data;
        this.loaded = true;
      });
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format("YYYY-MM-DD h:mm:ss a");
    },
    verifyUser: function () {
      axios
        .create({
          baseURL:
            "http://" +
            process.env.VUE_APP_API_URL_AUTH +
            ":" +
            process.env.VUE_APP_API_PORT_AUTH,
        })
        .post("/user/verify-user", {
          document: this.document,
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.user === null) {
            this.notRegistered = true;
          } else {
            this.user = data.user;
            this.confirmEntry();
          }
        });
    },
    confirmEntry: function () {
      this.$api
        .post(`/registration/${this.$route.params.slug}`, {
          user_id: this.user.id,
        })
        .then((res) => {
          this.makeToast("success", res.data.message);
          this.document = "";
          this.email = "";
          this.name = "";
        });
    },
     makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
<style scoped>
main {
  padding: 4em 0;
}
.event-description {
  color: #909090;
  font-size: 1.2em;
}
.event-info {
  color: #6930c3;
  display: flex;
  justify-content: center;
}
.btn {
  background-color: #56cfe1;
  width: unset;
}
.btn-secundary {
  background-color: white;
  width: unset;
  color: #6a33c4;
  border: 1px solid #6a33c4;
  margin-right: 1em;
}
.btn:focus,
.btn:hover,
.btn:active {
  background-color: #6930c3 !important;
  border-color: #6930c3 !important;
}
</style>