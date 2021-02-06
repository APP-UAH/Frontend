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

    <div class="flex items-center flex-col align-middle h-auto min-h-screen">
      <div
        class="z-20 flex flex-col justify-center align-middle self-center w-11/12 md:w-4/12 my-12 py-12 px-12 card border-gray-500 border rounded-md"
      >
        <p
          class="text-gray-900 mx-5 font-bold text-left pt-2 text-base sm:text-lg md:text-2xl lg:text-2xl mb-2"
        >
          Gestión de profesores
        </p>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Nombre
        </p>
        <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              v-model="msgName"
              placeholder="Name"
              class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2"
            />
            <!-- class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
               class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2 text-center block appearance-none leading-normal"
                -->
          </div>
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Apellidos
        </p>
        <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              v-model="msgSurname"
              placeholder="Surname"
              class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2"
            />
            <!-- class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
               class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2 text-center block appearance-none leading-normal"
                -->
          </div>
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Nombre de usuario
        </p>
        <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              v-model="msgUsername"
              placeholder="username"
              class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2"
            />
            <!-- class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
               class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2 text-center block appearance-none leading-normal"
                -->
          </div>
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Contraseña
        </p>
        <div class="grid grid-rows-1 grid-flow-row text-left">
          <input
            id="password"
            v-model="msgPassword"
            placeholder="password"
            type="password"
            class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2"
            @:keyup.enter="login"
          />
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Número de teléfono
        </p>
        <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              v-model="msgPhoneNum"
              placeholder="phone number"
              class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2"
            />
            <!-- class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
               class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2 text-center block appearance-none leading-normal"
                -->
          </div>
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Dirección de correo electrónico
        </p>
        <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              v-model="msgEmail"
              placeholder="email"
              class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2"
            />
            <!-- class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
               class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2 text-center block appearance-none leading-normal"
                -->
          </div>
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Departamento
        </p>
        <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <input
              v-model="msgDepartamento"
              placeholder="office"
              class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2"
            />
            <!-- class="bg-white focus:outline-none self-center text-center w-full border focus:border-blue-900 py-2 block appearance-none leading-normal"
               class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2 text-center block appearance-none leading-normal"
                -->
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            v-model="isAssociated"
            class="mx-4 text-gray-900 mx-5 text-left sm:text-xs md:text-xs lg:text-xs mb-2 float:left"
          />
          <label class="text-left"> Profesor asociado </label>
        </div>

        <div>
          <button
            class="bg-blue-800 hover:bg-blue-900 text-white font-bold w-11/12 mt-4 py-2 px-4"
            @click="aniadirProfesor"
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
  data: () => ({
    msgName: "",
    msgSurname: "",
    msgUsername: "",
    msgPassword: "",
    msgPhoneNum: "",
    msgEmail: "",
    msgDepartamento: "",
    type: 1,
    isAssociated: false,
  }),

  mounted() {},

  methods: {
    async aniadirProfesor() {
      let data = {
        type: 1,
        username: this.msgUsername,
        password: this.msgPassword,
        name: this.msgName,
        surname: this.msgSurname,
        phone_number: this.msgPhoneNum,
        email: this.msgEmail,
        is_associated: this.isAssociated,
      };

      console.log(data.type);
      console.log(data.username);
      console.log(data.password);
      console.log(data.name);
      console.log(data.surname);
      console.log(data.phone_number);
      console.log(data.email);
      console.log(data.is_associated);

      let res = await axios
        .post(process.env.VUE_APP_API_URL+ "adduser", data)
        .then((response) => response.status)
        .catch(function (error) {
          console.log(error);
        });

      if (res == 200) {
        this.$swal({
          title: "Usuario creado",
          text: "El profesor se ha creado con exito",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          allowOutsideClick: false,
          confirmButtonText: "Volver al menú",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.$router.push("/inicio");
          }
        });
      } else {
        this.$swal({
          title: "Usuario no creado",
          text: "El profesor no se ha podido crear",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#ff0509",
          allowOutsideClick: false,
          confirmButtonText: "Volver al formulario",
        });
      }
    },
  },
};
</script>

<style scoped>
.text-left {
  text-align: left;
  float: left;
}
</style>