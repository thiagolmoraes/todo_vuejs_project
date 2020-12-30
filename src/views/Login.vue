<template>
  <div classs="container ">
    <div class="flex flex-col min-h-screen  space-y-4 border-2 items-center justify-center py-12 px-4">  
    <h2 class="text-center text-3xl font-extrabold text-gray-900">Todo Authentication</h2>
        <input type="text" class="border w-2/5 py-2 px-2 focus:placeholder-black " placeholder="Username" />
        <input type="password" class="border  w-2/5 py-2 px-2 focus:placeholder-black " placeholder="Password" />
        <div class="items-end	">
          <a href="">Register</a>
          <input type="checkbox">Remember
        </div>
        <button class="border w-2/5 p-4 text-lg font-bold bg-blue-200 border-black rounded">Log in</button>
    </div>
  </div>
</template>

<script>
export default {
    name:  "Login"
}
</script>
