<template>
  <div classs="container ">
    <div class="flex flex-col min-h-screen  space-y-4 border-2 items-center justify-center py-12 px-4">  
    <h2 class="text-center text-3xl font-extrabold text-gray-900">Todo Authentication</h2>
        <input type="text" v-model="username" class="border w-2/5 py-2 px-2 focus:placeholder-black " placeholder="Username" />
        <input type="password" v-model="password" class="border w-2/5 py-2 px-2 focus:placeholder-black " placeholder="Password" />
        <div class="flex w-2/5 justify-between	">
          <a href="" class="hover:text-red">Register</a>
          <span class="">
           <input type="checkbox">
           Remember
          </span>
        </div>
        <button @click="login" class="border w-2/5 p-4 text-lg font-bold bg-blue-200 border-black rounded">Log in</button>
    </div>
    <notifications position="top right" group="auth"/>
  </div>

</template>

<script>
export default {
    name:  "Login",
    computed:{
      message(){
        return this.$store.getters.CHECK_STATUS_USER
      }
    },
    data(){
      return{
        username: '',
        password: ''
      }
    },
    methods: {
      async login() {
        try{
            await this.$store.dispatch("GET_USER",{username:this.username,password:this.password})
            this.$notify({ group: 'auth', type: 'error', text: this.$store.getters.CHECK_STATUS_USER })
        }catch(error){
            console.log(`User FETCH: ${error}`);
        }
      }
  }
}
</script>

<style>
.vue-notification {
  font-size: 18px;
}
</style>