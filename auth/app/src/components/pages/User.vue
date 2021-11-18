<template>
  <layout>
    <b-container>
      <div class="avatar">
        <div class="icon">
          <b-icon icon="person"></b-icon>
        </div>
      </div>
      <h5 class="text-center">Hello {{ this.name }}</h5>
      <h6 class="text-center mb-5">
        Manage your user settings and know everything about your events
      </h6>

      <div>
        <b-row>
          <b-col cols="12" md="6">
            <b-link :href="eventUrl + '/my-events'" class="me-link">
              <b-card tag="article" class="mb-2">
                <h5>
                  <b-icon icon="calendar-check" aria-hidden="true"></b-icon>
                See your events</h5>
                <b-card-text>See all the events you are subscribed to</b-card-text>
              </b-card>
            </b-link>
          </b-col>
          <b-col cols="12" md="6">
            <b-link :href="eventUrl + '/my-certificates'" class="me-link">
              <b-card tag="article" class="mb-2">
                <h5><b-icon icon="file-earmark-richtext" aria-hidden="true"></b-icon>
                Get your certificate</h5>
                <b-card-text>Get certificates from the events you attended</b-card-text>
              </b-card>
            </b-link>
          </b-col>
          <b-col cols="12" md="6">
            <b-link href="/change-profile" class="me-link">
              <b-card tag="article" class="mb-2">
                <h5><b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
                Update account informations</h5>
                <b-card-text>Update your account data, such as name and document</b-card-text>
              </b-card>
            </b-link>
          </b-col>
          <b-col cols="12" md="6">
            <b-link href="/change-password" class="me-link">
              <b-card tag="article" class="mb-2">
                <h5><b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
                Update your password</h5>
                <b-card-text> Do something </b-card-text>
              </b-card>
            </b-link>
          </b-col>
        </b-row>
      </div>
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
      name: "",
      eventUrl: process.env.VUE_APP_EVENTS_URL
    };
  },
  created: function () {
    this.name = localStorage.getItem("name");
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
.me-link{
  color: #909090;
}
.me-link h5{
 color:#6930c3
}
.card {
  border-radius: unset;
  border-color: rgba(0, 0, 0, 0.125);
  border-style: solid;
  border-width: 0 0 1px 0;
  margin-bottom: 2em;
}
</style>