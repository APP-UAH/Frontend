<!--<template>
    <div>
    <div
      class="h-12 sm:h-12 md:h-14 w-screen bg-blue-800 border-t-40 border-gray-600 min-w-full"
    ></div>
    <router-link to="/inicio">
      <img
        class="ml-12 mt-4 h-12 object-contain xl:h-14 w-full object-left"
        src="../assets/images/logo-uah.png"
        alt="Logo UAH"
      />
    </router-link>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
  },
  created() {
    axios.get("http://http://localhost:3000/api/getAllSubjects").then((result) => {
      console.log(result.data);
    })
  }
}
</script> -->
<template>
  <div class="content">
    <p> Asignaturas {{ result.subject }}</p>
    <p> }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    result: null
  }),

  mounted() {
    axios
    .create({headers: { 
       "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
     } })
    .get("http://localhost:3000/api/getAllSubjects")
    .then(response => (this.result = response))
  }
};
</script>

<style scoped lang="scss">
</style>