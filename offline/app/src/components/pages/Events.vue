<template>
  <layout>
    <b-container fluid>
      <div class="section" v-if="loaded">
        <main>
          <h2 class="mb-4">Events</h2>
          <div>
            <b-row>
              <b-col cols="12" v-for="event in events" :key="event.id">
                <b-card no-body class="overflow-hidden pb-4">
                  <b-row no-gutters>
                    <b-col md="4">
                      <b-card-img
                        :src="event.image"
                        :alt="event.title"
                        class="rounded-0 img-cover"
                      ></b-card-img>
                    </b-col>
                    <b-col md="8">
                      <b-card-body :title="event.title">
                        <b-card-text
                          v-html="event.description.split('<br>')[0]"
                        ></b-card-text>
                        <div class="d-flex justify-content-end">
                          <b-button :href="'/register/' + event.slug" variant="primary"
                            >Register entries</b-button
                          >
                        </div>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </main>
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
      events: [],
      authUrl: process.env.VUE_APP_AUTH_URL,
      loaded: false,
    };
  },
  created: function () {
    this.$api
      .get(`/events/`)
      .then((res) => res.data)
      .then((data) => {
        this.events = data;
        this.loaded = true;
      });
  },
};
</script>
<style scoped>
.section {
  padding: 4em 0;
}
.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card {
  border-radius: unset;
  border-color: rgba(0, 0, 0, 0.125);
  border-style: solid;
  border-width: 0 0 1px 0;
  margin-bottom: 2em;
}
.links,
.card-text {
  color: #909090;
}
.links h5,
.card-title {
  color: #6930c3;
}
.btn {
  background-color: #56cfe1;
  width: unset;
}
.btn:focus,
.btn:hover,
.btn:active {
  background-color: #6930c3 !important;
  border-color: #6930c3 !important;
}
</style>