<template>
         <!-- New Task -->
         <div class="flex flex-col"> 
           <div class="flex-col">
              <textarea class="resize-none rounded-md font-sans font-bold p-4 focus:outline-none border" v-model="task" placeholder="Task" cols="40" rows="2"></textarea>
           </div>
           <div class="flex-col py-2">
              <button @click="AddTask(task)" class="py-4 px-20 focus:outline-none font-bold bg-blue-200 text-xl rounded-full">Add</button>
           </div>
         </div>
        
         <!-- End Component -->
</template>

<script>
export default {
    name:"NewTask",
    data(){
       return{
         task: '',
         
       }
    },
    computed:{
   
    },
    methods:{
       async AddTask(task){
          await this.$store.dispatch("SAVE_TASK",task)
                .then(response => {
                   this.$store.dispatch("GET_TASK")
                   this.task = ''          
                   console.log(response);
                })
                .catch(error => console.log(error));
       }
    }
    
}
</script>