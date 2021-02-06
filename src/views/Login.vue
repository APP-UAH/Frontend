<template>
  <div class="login h-min-screen h-full md:h-screen">
    <div
      class="h-12 sm:h-12 md:h-14 w-screen bg-blue-800 border-t-40 border-gray-600 min-w-full"
    ></div>
    <img
      class="ml-12 mt-4 h-12 object-contain xl:h-14 w-full object-left"
      src="../assets/images/logo-uah.png"
      alt="Logo UAH"
    />
    <div class="flex items-center flex-col align-middle h-auto min-h-screen">
      <div
        class="z-20 flex flex-col justify-center align-middle self-center w-11/12 md:w-4/12 my-12 py-12 px-12 card border-gray-500 border rounded-md"
      >
        <p
          class="text-gray-900 mx-5 font-bold text-left pt-2 text-base sm:text-lg md:text-2xl lg:text-2xl mb-2"
        >
          Proveedor de Identidad de la UAH
        </p>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Introduce el nombre de usuario y la contraseña para la conexión.
        </p>
        <div class="mx-5">
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <label
              for="email"
              class="text-gray-900 font-semibold text-left pt-2 text-base sm:text-lg md:text-xl lg:text-xl mb-2"
            >
              Usuario
            </label>
          </div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              id="email"
              v-model="email"
              type="text"
              class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
              @:keyup.enter="login"
            />
          </div>
        </div>

        <div class="mx-5">
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <label
              for="password"
              class="text-gray-900 font-semibold text-left pt-2 text-base sm:text-lg md:text-xl lg:text-xl mb-2"
            >
              Contraseña
            </label>
          </div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              id="password"
              v-model="password"
              type="password"
              class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
              @:keyup.enter="login"
            />
          </div>
        </div>

        <div>
          <button
            class="bg-blue-800 hover:bg-blue-900 text-white font-bold w-11/12 mt-4 py-2 px-4"
            @click="login"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      let data = JSON.stringify({
        username: this.email,
        password: this.password,
      });
      console.log(data)
      let config = {
        method: "post",
        url: process.env.VUE_APP_API_URL+ "login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      let res = await axios(config)
        .then((response) => response.data)
        .catch(function (error) {
          console.log(error);
        });

      console.log(res);
      if (res.msg === true) {
        let type = res.type;
        let user = { email: this.email, role: type };
        await this.$store.dispatch("login", { user }).then(() => {
          console.log("Test")
          this.$router.push({ name: "inicio" });
        });
      }
    },

    async Reset() {
      await this.$store.dispatch("reset", {});
    },
  },
};
</script>

<style scoped>
.login {
  overflow: hidden;
}

.card {
  background-color: #fff;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
