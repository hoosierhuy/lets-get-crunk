<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
  watch: {
    $route: {
      immediate: true,
      handler(): void {
        document.title = "Let's Get Crunk!";
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 1.875rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.header {
  background: linear-gradient(#000 0, #031621 64.2%, #06273a 100%);
  color: #a45241;
  width: 100%;
  font-family: Lusitana, Georgia, serif;
  text-align: center;

  position: fixed;
  top: 0;
  left: 0;
}

.page-header {
  display: flex;
  align-items: center;

  font-size: 2.75rem;
}
.go-back {
  margin-left: 0.625rem;

  &:hover {
    cursor: pointer;
  }
}
</style>
