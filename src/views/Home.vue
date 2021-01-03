<template>
    <div classs="container w-screen h-screen">
      <Header />
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
    Header: () => import('@/components/Header'),
    List: () => import('@/components/ListToDo'),
    Task: () => import('@/components/NewTask')
  }
}
</script>
