<template>
  <div class="mx-auto max-w-sm rounded card">
    <div class="sm:flex sm:items-center px-6 py-4">
      <img
        class="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
        src="https://randomuser.me/api/portraits/lego/4.jpg"
        alt=""
      />
      <div class="sm:text-left sm:flex-grow">
        <div class="mb-4">
          <p class="text-xl leading-tight">
            Nombre usuario: {{ this.nombreUsuario }}
          </p>
          <p class="text-sm leading-tight text-grey-dark">DNI: 01234567A</p>
          <p class="text-sm leading-tight text-grey-dark">
            Tipo de Usuario: {{ this.rolUsuario }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TarjetaPerfil",
  props: {
    nombreUsuario: String,
    rolUsuario: String,
  }
};
</script>

<style scoped>
.card {
  background-color: #fff;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-bottom: 25px;
  margin-top: 2%;
}
.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.subjectButton {
  background-color: #2c5282;
  color: #fff;
}
.subjectButton:hover {
  background-color: #325d92;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>