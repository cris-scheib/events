<template>
  <div>
    <main :class="this.event.template">
      <img
        v-if="this.event.template == 'black'"
        class="img-cover"
        src="../../assets/black.png"
      />
      <img
        v-if="this.event.template == 'blue'"
        class="img-cover"
        src="../../assets/blue.png"
      />
      <div class="content">
        <h6 id="name">{{ this.user.name }}</h6>
        <p id="info">
          Certificate confirming attendance at the event
          {{ this.event.title }} that happened at {{ this.event.local }} at
          {{ this.formatDate(this.event.dateTimeEvent) }}
        </p>
        <p id="date">{{ this.now() }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["event", "user"],
  methods: {
    formatDate: function (date) {
      return moment(date).format("YYYY-MM-DD h:mm:ss a");
    },
    now: function () {
      return moment().format("YYYY-MM-DD h:mm:ss a");
    },
  },
};
</script>
<style scoped>
.img-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -9999;
}
main {
  position: relative;
}
#name,
#info,
#date {
  position: absolute;

  font-family: "Zen Kaku Gothic Antique";
  z-index: 99999999;
}
.black #name {
  top: 11em;
  right: 24em;
  color: #ac7c36;
}
.black #info {
  top: 14.5em;
  right: 12em;
  color: #252429;
  width: 23em;
}
.black #date {
  top: 25.8em;
  right: 15.1em;
  color: #6c757d;
  width: 23em;
}

.blue #name {
  top: 9.5em;
  left: 15.5em;
  color: #393b4f;
  font-size: 1.5em;
}
.blue #info {
  top: 18.5em;
  right: 15em;
  color: #393b4f;
  width: 17em;
}
.blue #date {
  top: 27.3em;
  right: 18.1em;
  color: #c9a04c;
  width: 23em;
}
</style>