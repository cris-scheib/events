<template>
  <layout>
    <b-container fluid>
      <b-row class="section" v-if="loaded">
        <b-col cols="12" lg="3">
          <aside>
            <b-row>
              <b-col cols="12">
                <b-link href="/" class="links">
                  <b-card tag="article" class="mb-2">
                    <h5>
                      <b-icon icon="calendar" aria-hidden="true"></b-icon>
                      See all events
                    </h5>
                    <b-card-text>See all the events avaliable</b-card-text>
                  </b-card>
                </b-link>
              </b-col>
              <b-col cols="12">
                <b-link href="/my-events" class="links">
                  <b-card tag="article" class="mb-2">
                    <h5>
                      <b-icon icon="calendar-check" aria-hidden="true"></b-icon>
                      See your events
                    </h5>
                    <b-card-text
                      >See all the events you are subscribed to</b-card-text
                    >
                  </b-card>
                </b-link>
              </b-col>
              <b-col cols="12">
                <b-link :href="authUrl + '/change-profile'" class="links">
                  <b-card tag="article" class="mb-2">
                    <h5>
                      <b-icon icon="person-fill" aria-hidden="true"></b-icon>
                      Account informations
                    </h5>
                    <b-card-text
                      >Update your account data, such as name and
                      document</b-card-text
                    >
                  </b-card>
                </b-link>
              </b-col>
            </b-row>
          </aside>
        </b-col>
        <b-col cols="12" lg="9">
          <main>
            <h2 class="mb-4">My certificates</h2>
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
                          <p
                            v-if="event.eventsUsers[0].dateTimeRegistration"
                            class="m-0"
                          >
                            <strong>Registration:</strong>
                            {{
                              formatDate(
                                event.eventsUsers[0].dateTimeRegistration
                              )
                            }}
                          </p>
                          <p
                            v-if="event.eventsUsers[0].dateTimeEntrance"
                            class="m-0"
                          >
                            <strong>Entrance:</strong>
                            {{
                              formatDate(event.eventsUsers[0].dateTimeEntrance)
                            }}
                          </p>
                          <div class="d-flex justify-content-end">
                            <b-link
                              target="_blank"
                              :href="printUrl + event.slug"
                              class="btn btn-secondary"
                            >
                              Get certificate
                            </b-link>
                          </div>
                        </b-card-body>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </main>
        </b-col>
      </b-row>
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
      events: [],
      authUrl: process.env.VUE_APP_AUTH_URL,
      printUrl: process.env.VUE_APP_PRINT_URL,
      loaded: false,
    };
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format("YYYY-MM-DD h:mm:ss a");
    },
  },
  created: function () {
    this.$api
      .get(`/api/events/my-certificates`)
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