<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },

  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },

  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.updateExists = true;

      if (this.updateExists) {
        // The duration is set to be large enough to take as persistent
        this.$toast.open({
          message: this.$t("AvailableUpdate"),
          type: "default",
          position: "bottom",
          duration: "100000000",
          onClick: this.refreshApp,
        });
      }
    },
    refreshApp() {
      // Handle a user tap on the update app button.
      this.updateExists = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
  color: #2c3e50;
}

.locale-switcher {
  position: absolute;
  z-index: 100;
  margin: 10px;
  font-size: 20px;
  background-color: white;
  float: right;
  right: 0;
}
select {
  background-color: white;
  font-size: 20px !important;
  cursor: pointer !important;
}
</style>
