<template>
  <div>
    <div
        class="z-20 flex flex-row justify-center align-middle self-center w-full my-12 py-12 px-12 card border-gray-500 border rounded-md"
      >
      <p> {{title}} </p>
      <router-link :to="route"> 
          <p> A </p>
      </router-link>

      </div>
  </div>
</template>

<script>
export default {
  name: "TarjetaInicio",
  props: {
      title: String,
      route: {type: String, required: true}
  }
};
</script>


<style scoped>
.card {
  background-color: #fff;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>