<template>
  <input type="file" @change="previewFiles" />
</template>

<script>
import Papa from "papaparse";
export default {
  data() {
    return {
      config: {
        header: true,
      },
    };
  },
  methods: {
    async previewFiles(event) {
      let csv = await this.processCSVFile(event.target.files[0]);
      this.$router.push({
        name: "informe",
        params: {
          csv: csv,
          title:
            "Reserva NL5, Salvador Otón, 26/11/2020 17:00",
        },
      });
    },
    processCSVFile(csv) {
      return new Promise((resolve, reject) => {
        Papa.parse(csv, {
          header: true,
          worker: true,
          error: () => {
            console.log(reject);
          },
          complete: (results) => {
            resolve(results.data);
          },
        });
      });
    },
  },
};
</script>
