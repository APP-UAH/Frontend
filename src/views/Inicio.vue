<template>
  <div>
    <p>Inicio</p>
    <p @click="Reset" style="cursor: pointer">Reset</p>
  </div>
</template>

<script>
export default {
  name: "Inicio",
  methods: {
    async Reset() {
      await this.$store.dispatch("reset", {});
    },
  },
};
</script>