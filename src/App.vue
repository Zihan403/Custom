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
  <footer class="text-center mt-5">
    <p>
      © 2024 All Rights Reserved. Swinburne Embedded System Club.
      <br />
      We respectfully acknowledge the Wurundjeri People, Traditional Owners of the land.
    </p>
    <p>Contact: <a href="tel:+61392145445">(03) 9214 5445</a> | <a href="https://studentlife.swinburne.edu.au/Clubs/Swin-Embedded">studentlife@swin.edu.au/Clubs/Swin-Embedded</a></p>
    <p>Follow us: <a href="https://www.instagram.com/swinembedded?igsh=MXF5aDIzYWV6dGhxNg%3D%3D&utm_source=qr/">Instagram</a> | <a href="https://www.facebook.com/share/sAEtR9xk4n2fJpBy/?mibextid=LQQJ4d/">Facebook</a></p>
  </footer>
</template>


