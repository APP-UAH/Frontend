<!-- mounted () {
    axios.get('')
  .then(response => (this.info = response.data))
  .catch(error => console.log(error))
  }
  created() {
    axios.get("https://reqres.in/api/users?page=2").then((result) => {
      console.log(result.data);
    })
  }-->
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
          Asignación de asignaturas a los usuarios
        </p>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-s md:text-s lg:text-s mb-4"
        >
          Seleccione plan de estudios
        </p>
        <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <select v-model="selected" class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2" >
              <option v-for="p in planes" :key="p.id" >
                {{p}}
              </option>
            </select>
          </div>
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Seleccione asignaturas
        </p>
        <div class="mx-4">
          <div class="flex flex-row flex-wrap text-left">
            <!-- .filter(elem => elem.plan == selected) -->
            <div v-for="asignatura in asignaturas.filter(elem => elem.plan == selected)" :key="asignatura.code" class="m-2">
              <input type="checkbox" :id="asignatura.code" :value="asignatura.code" v-model="asignaturaSelected">
              <label :for="asignatura.code"> {{asignatura.name}} </label>
            </div>
          </div>
        </div>

        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Seleccione tipo de usuario
        </p>
       <div>
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <select v-model="userTypeSelected" class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2" >
              <option v-for="type in type" :key="type.value" :value="type.value" >
                {{type.label}}
              </option>
            </select>
          </div>
        </div>
        
        <p
          class="text-gray-700 mx-5 text-left text-base sm:text-sm md:text-md lg:text-md mb-4"
        >
          Seleccione usuario 
        </p>
       
          <div class="grid grid-rows-1 grid-flow-row text-left">
            <select v-model="userSelected" class="mx-4 text-gray-900 mx-5 text-left 
               sm:text-xs md:text-xs lg:text-xs mb-2" >
              <option v-for="user in userList.filter(e => e.type == userTypeSelected)" :key="user.id" :value="user.username" >
                {{user.name}}
              </option>
            </select>
          </div>

        <div>
          <button
            class="bg-blue-800 hover:bg-blue-900 text-white font-bold w-11/12 mt-4 py-2 px-4"
            @click="asignarSubjects"
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
  data(){
    return{
      selected: "",
      planes: [],
      asignaturas: [],
      asignaturaSelected: [],      
      userList: [],
      userSelected:"",
      userTypeSelected: "",
      type: [{ label: "Estudiante", value: 0}, {label: "Profesor", value: 1}],
     
    };       
  },
  mounted() { 
    
    /*axios.get('http://localhost:3000/api/getAllSubjects')
          .then (response => {
            
            this.selected = response.data.response.planes[0];
             response.data.response.planes.forEach(element => {
               this.plan.push(element);
             });
            
            response.data.response.subject.forEach(element => {
              this.asignaturas.push(element)
            })
          })*/
    axios.get ('http://localhost:8080/AppUah/subjects/allsubjects')
          .then ( response => {
            this.selected = response.data.plans[0];
            response.data.plans.forEach(element =>{
              this.planes.push(element)
            })

            response.data.subjects.forEach(element =>{
              this.asignaturas.push(element)
            })
         
                
            }
          )
    axios.get('http://localhost:8080/AppUah/get-all-users')
          .then (response =>{
           response.data.students.forEach( e  =>{
             this.userList.push(e)
           })
           response.data.professors.forEach( e  =>{
             this.userList.push(e)
           })

           this.userList.forEach(e => {
            console.log(e.name)
           })
           
          })
          
  },
   created(){
    
  },
  
  methods: {
    /*async asignarSubjects(){
      console.log(this.selected);
      console.log(this.userSelected);
      console.log(this.asignaturaSelected);
     let data = JSON.stringify({
        username: this.userSelected,
        plan: this.selected,
        subjectCodes: this.asignaturaSelected
      });

      let config = {
        method: "post",
        url: "http://localhost:3000/api/assignSubject",
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
      if (res.msg === "Subjects Assigned") {
        console.log("ASIGNATURAR AGREGADAS CORRECTAMENTE")
      }
    }*/
    async asignarSubjects(){
      console.log(this.selected);
      console.log(this.userSelected);
      console.log(this.asignaturaSelected);
      console.log(this.userTypeSelected);
      

     let data = JSON.stringify({
        username: this.userSelected,
        plan: this.selected,
        subjectCodes: this.asignaturaSelected,
        type: this.userTypeSelected
      });

      let config = {
        method: "patch",
        url: process.env.VUE_APP_API_URL+ "subjects/addsubjects",
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
      if (res.msg === "Subjects Assigned") {
        console.log("ASIGNATURAR AGREGADAS CORRECTAMENTE")
      }
    }
  }
  
}
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
