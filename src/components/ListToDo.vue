<template>
    <div class="flex-col mx-auto mt-10 min-w-max font-sans text-xl" style="width:512px">
        <ul class="space-y-2">
            <li class="flex justify-between px-4 min-h-full" v-for="task in tasks" :key="task.id">
                <input type="checkbox"> 
                <input type="text" class="px-2 rounded-full focus:outline-none focus:border-blue-200 border-2 border-gray-100" v-model="task.task">
                <div class="space-x-2">
                    <button @click="deletetodo(task._id)" class="text-xs border-2 px-4 focus:outline-none hover:bg-blue-200 hover:text-white rounded-full">Delete</button>    
                    <button @click="updatetodo(task._id,task.task)" class="text-xs border-2 px-4 focus:outline-none hover:bg-blue-200 hover:text-white rounded-full">Edit</button>    
                </div>
             </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"ListToDo",
    computed:{
        tasks: function(){
            return this.$store.state.task
        }
    },
    methods:{
        async getlisttodo(){
            await this.$store.dispatch("GET_TASK")
        },
        async deletetodo(id){
            try{
                await this.$store.dispatch("DELETE_TASK",{'id':id})                
            }catch(error){
                console.log(`DeleteTodo ${error}`);
            }
        },
        async updatetodo(id,task){
            try{
                await this.$store.dispatch("UPDATE_TASK",{'id':id,'task':task})
            }catch(error){
                console.log(`DeleteTodo ${error}`);
            }
        }
    },
    mounted(){
        this.getlisttodo()
    }
}
</script>