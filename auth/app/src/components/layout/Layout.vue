<template>
  <div>
    <main>
      <header>
        <b-button @click="logout()" class="btn-logout"> Logout </b-button>
      </header>
      <slot />
      <footer></footer>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
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
header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

