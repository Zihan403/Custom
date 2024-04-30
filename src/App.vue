<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbar from '@/components/Navigation/navbar.vue'

</script>

<template>
  
  <header>
      
    <navbar/>
    <div class="wrapper">


      <!-- <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/signup">Signup</RouterLink>
      </nav> -->
      
    </div>
  </header>

  <RouterView />
</template>


