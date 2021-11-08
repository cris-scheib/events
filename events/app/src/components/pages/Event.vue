<template>
  <layout>
    <b-container fluid>
      <main v-if="loaded">
        <b-row>
          <b-col cols="12" lg="7">
            <img class="img-fluid" :src="event.image" :alt="event.title" />
          </b-col>
          <b-col cols="12" lg="5">
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
            <b-link href="/" class="btn btn-primary">
              Register entries
            </b-link>
            <b-link href="/" class="btn btn-primary ml-3"> Sign me up </b-link>
          </b-col>
          <b-col cols="12">
            <p class="event-description mt-5" v-html="event.description"></p>
            <div class="d-flex justify-content-end">
              <b-link href="/" class="btn btn-secundary"> Go back </b-link>
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

export default {
  components: {
    Layout,
  },
  data() {
    return {
      event: null,
      loaded: false,
    };
  },
  created: function () {
    this.$api
      .get(`/api/events/${this.$route.params.slug}`)
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