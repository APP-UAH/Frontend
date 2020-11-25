<template>
  <div class="flex flex-col h-screen w-screen">
    <div
      class="h-12 sm:h-12 md:h-14 bg-blue-800 border-t-40 border-gray-600 min-w-full"
    ></div>
    <router-link to="/inicio">
      <img
        class="ml-12 mt-4 h-12 object-contain xl:h-14 object-left"
        src="../assets/images/logo-uah.png"
        alt="Logo UAH"
      />
    </router-link>
    <p class="text-4xl">{{ this.title }}</p>
    <div class="flex flex-grow justify-center content-center">
      <table class="w-11/12 table-auto mt-8">
        <caption class="hidden">
          Super important CSV. WOW. such csv. lot important. doggo happy
        </caption>
        <thead class="justify-between">
          <tr class="bg-blue-800">
            <th
              v-for="columnName in header"
              :key="columnName"
              scope="col"
              class="px-16 py-2 text-white"
            >
              {{ columnName }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr
            v-for="row in csv"
            :key="row"
            class="text-center bg-white border-t-4 border-b-4 border-gray-200 hover:bg-gray-200"
          >
            <td v-for="data in row" :key="data" class="px-16 py-2 items-center">
              {{ data }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      csv: "",
      header: "",
      title: "",
    };
  },
  beforeMount() {
    this.csv = this.$route.params.csv;
    this.header = Object.keys(this.csv[0]);
    this.title = this.$route.params.title;
  },
  mounted() {},
};
</script>
