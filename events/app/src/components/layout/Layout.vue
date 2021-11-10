<template>
  <div>
    <main>
      <header>
        <p class="m-0">{{ this.name }}</p>
        <b-button @click="logout()" class="btn-logout"> Logout </b-button>
      </header>
      <slot />
      <footer></footer>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    logout() {
      this.$api.get(`/api/auth/logout/`).then(() => {
        localStorage.clear();
        window.location.href = process.env.VUE_APP_AUTH_URL;
      });
    },
  },
  created: function () {
    this.name = localStorage.getItem("name");
  },
};
</script>
<style scoped>
header {
  padding: 1em;
  background: linear-gradient(90deg, #6930c3, #80ffdb);
}
.user-data {
  color: #3f3f47;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btn-logout {
  width: unset;
  padding: 0.4rem 0.9rem;
  margin-left: 1rem;
  font-size: 0.9rem;
}
header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

