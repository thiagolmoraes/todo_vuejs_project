<template>
    <div classs="container w-screen h-screen">
       <div class="text-center mx-auto m-5">
          <Task />
          <List />
       </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  components:{
    List: () => import('@/components/ListToDo'),
    Task: () => import('@/components/NewTask')
  }
}
</script>
