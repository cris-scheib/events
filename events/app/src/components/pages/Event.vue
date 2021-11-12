<template>
  <layout>
    <b-container fluid>
      <main v-if="loaded">
        <b-row>
          <b-col cols="12" lg="6">
            <img class="img-fluid" :src="event.image" :alt="event.title" />
          </b-col>
          <b-col cols="12" lg="6">
            <h2 class="mb-3">{{ event.title }}</h2>
            <div class="mb-4 event-info">
              <p>
                <b-icon icon="calendar4-event"></b-icon>
                {{ formatDate(event.dateTimeEvent) }}
              </p>
              <p>
                <b-icon icon="geo-alt"></b-icon>
                {{ event.local }}
              </p>
            </div>
            <p>
              Registration period from
              {{ formatDate(event.dateTimeStartRegistration) }} until
              {{ formatDate(event.dateTimeEndRegistration) }}
            </p>
            <b-button
              variant="secondary"
              class="registered"
              v-if="registered"
              @mouseover="registeredTitle = 'Cancel your register'"
              @mouseleave="registeredTitle = 'You are already registered'"
              @click="modalCancel()"
            >
              {{ registeredTitle }}
            </b-button>
            <b-button variant="primary" v-else @click="modalConfirm()"
              >Sign me up</b-button
            >
            <b-link
              :href="registerUrl"
              class="btn btn-secondary ml-3"
              v-if="user.is_admin"
            >
              Register entries
            </b-link>
          </b-col>

          <b-col cols="12">
            <p class="event-description mt-5" v-html="event.description"></p>
            <div class="d-flex justify-content-end">
              <b-link href="/" class="btn btn-secondary"> Go back </b-link>
            </div>
          </b-col>
        </b-row>
      </main>
      <b-modal
        id="modal-confirm"
        ref="modal-confirm"
        title="Confirm Registration"
        @ok="confirmRegistration"
        ok-title="Confirm"
      >
        <h6>Want to confirm your registration?</h6>
      </b-modal>
      <b-modal
        id="modal-cancel"
        ref="modal-cancel"
        title="Cancel Registration"
        @ok="cancelRegistration"
        ok-title="Confirm"
        ok-variant="danger"
      >
        <h6>Want to cancel your registration?</h6>
      </b-modal>
    </b-container>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import moment from "moment";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      event: null,
      loaded: false,
      user: {},
      registered: false,
      registeredTitle: "You are already registered",
      registerUrl:
        process.env.VUE_APP_REGIST_URL + "/" + this.$route.params.slug,
    };
  },
  async created() {
    await this.getUser();
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format("YYYY-MM-DD h:mm:ss a");
    },
    confirmRegistration: function () {
      this.$api
        .get(`/api/registration/${this.$route.params.slug}`)
        .then(() => {
          this.makeToast("success", "User registered with success");
          this.registered = true;
          this.$api.get(`/api/mailer/confirm-register/${this.$route.params.slug}`);
        })
        .catch((error) => {
          this.makeToast("danger", "Error to confirm the registration");
          console.log("error", error);
        });
    },
    cancelRegistration: function () {
      this.$api
        .delete(`/api/registration/${this.$route.params.slug}`)
        .then(() => {
          this.makeToast(
            "success",
            "Your registration has been canceled successfully"
          );
          this.registered = false;
        })
        .catch((error) => {
          this.makeToast("danger", "Error to cancel the registration");
          console.log("error", error);
        });
    },
    modalConfirm: function () {
      this.$refs["modal-confirm"].show();
    },
    modalCancel: function () {
      this.$refs["modal-cancel"].show();
    },
    makeToast: function (variant, message) {
      this.$bvToast.toast(message, {
        title: variant === "danger" ? "Error" : "Success",
        variant: variant,
        solid: true,
      });
    },
    async getUser() {
      this.$api
        .get(`/api/user/`)
        .then((res) => res.data)
        .then((data) => {
          this.user = data;
          this.getEvent();
        });
    },
    async getEvent() {
      this.$api
        .get(`/api/events/${this.$route.params.slug}`)
        .then((res) => res.data)
        .then((data) => {
          this.event = data;
          this.getEventUser();
        });
    },
    async getEventUser() {
      this.$api
        .get(`/api/registration/${this.$route.params.slug}/verify-registered`)
        .then((res) => {
          this.registered = res.data[0].count > 0;
          this.loaded = true;
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
}
.btn {
  background-color: #56cfe1;
  width: unset;
}
.btn-secondary {
  background-color: white;
  width: unset;
  color: #6a33c4;
  border: 1px solid #6a33c4;
}
.btn:focus,
.btn:hover,
.btn:active {
  background-color: #6930c3 !important;
  border-color: #6930c3 !important;
}
.registered {
  background-color: #6930c3 !important;
  border-color: #6930c3 !important;
  color: white;
}
.registered:hover {
  background-color: #ff0000 !important;
  border-color: #ff0000 !important;
}
</style>