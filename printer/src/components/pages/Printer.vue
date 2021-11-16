<template>
  <div>
    <div v-if="registered">
      <vue-html2pdf
        :show-layout="true"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <golden :event="this.event" :user="this.user"></golden>
        </section>
      </vue-html2pdf>
      <b-button type="button" variant="primary" @click="generateReport()"
        >Gerenrate</b-button
      >
    </div>
    <div v-else class="not-auth">
      <h1>You do not have authorization for this page</h1>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import VueHtml2pdf from "vue-html2pdf";
import Golden from "../layout/Golden.vue";
export default {
  components: {
    VueHtml2pdf,
    Golden,
  },
  data() {
    return {
      event: null,
      loaded: false,
      user: {},
      registered: false,
    };
  },
  async created() {
    await this.getUser();
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    formatDate: function (date) {
      return moment(date).format("YYYY-MM-DD h:mm:ss a");
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
.btn-primary {
  position: fixed;
  z-index: 9999999999;
  bottom: 3em;
  right: 3em;
}
.not-auth {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(0deg, #6930c3, #80ffdb);
  font-family: "Zen Kaku Gothic Antique";
  color: white;
  font-weight: 700;
}
</style>