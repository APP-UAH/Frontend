<template>
  <div class="mx-4 md:mx-0">
    <router-link :to="route">
      <div class="w-full rounded card">
        <img
          class="h-32 md:h-48 lg:h-56 w-full rounded-t"
          :src="this.url"
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ this.title }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "TarjetaInicio",
  props: {
    title: String,
    route: { type: String, required: true },
    index: Number
  }, 
  data(){
    return{
      url: "https://picsum.photos/400?random=" + this.$props.index 
    }
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
