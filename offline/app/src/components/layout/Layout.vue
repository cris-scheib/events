<template>
  <div>
    <main>
      <header>
        <div class="d-flex align-items-center mr-auto">
          <h5 class="evey">EVEY</h5>
          <p class="m-0 text-white">offline</p>
        </div>
        <h6 class="m-0">{{ name }}</h6>

        <b-button
          @click="sync()"
          @mouseover="description = 'Synchronize'"
          @mouseleave="description = ''"
          class="btn-sync"
        >
          <b-icon icon="arrow-repeat"></b-icon>
          {{ description }}
        </b-button>
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
      description: "",
    };
  },
  methods: {
    logout() {
      this.$api.get(`/auth/logout/`).then(() => {
        localStorage.clear();
        this.$router.push("/");
      });
    },
    sync() {
      this.$api
        .get(`/sync/`)
        .then((res) => {
          this.makeToast("success", res.data.message);
        })
        .catch((error) => {
          console.log(error);
          this.makeToast("danger", error.error.message);
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
  created() {
    this.name = localStorage.getItem("name");
  },
};
</script>
<style scoped>
main {
  height: 100vh;
}
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
.btn-sync {
  padding: 0.2rem 0.7rem 0.4rem 0.7rem;
  width: unset;
  margin-left: 1em;
}

header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

