<template>
    <div class="flex-col mx-auto mt-10 min-w-max font-sans text-xl" style="width:512px">
        <ul class="space-y-2">
            <li class="flex justify-between px-4 min-h-full" v-for="task in tasks" :key="task.id">
                {{task.task}} 
                <div class="space-x-2">
                    <button @click="deletetodo(task._id)" class="text-xs border-2 px-4 focus:outline-none hover:bg-blue-200 hover:text-white rounded-full">Edit</button>    
                    <button @click="deletetodo(task._id)" class="text-xs border-2 px-4 focus:outline-none hover:bg-blue-200 hover:text-white rounded-full">Delete</button>    
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
            await this.$store.dispatch("DELETE_TASK",{'id':id})
            .then(response => {
                this.$store.dispatch("GET_TASK")
                console.log(response);
            })
            .catch(error => console.log(`DeleteTodo ${error}`))
        }
    },
    mounted(){
        this.getlisttodo()
    }
}
</script>