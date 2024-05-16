<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><img :src = "logo" alt="logo" class="logo"/></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/events">Events</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/projects">Projects</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/gallery">Gallery</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Account
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-if="!user"><a class="dropdown-item" href="/login">Login</a></li>
              <li v-if="!user"><a class="dropdown-item" href="/signup">Signup</a></li>
              <li v-if="user"><a class="dropdown-item" href="/profile">Profile</a></li>
              <li v-if="user"><hr class="dropdown-divider"></li>
              <li v-if="user"><a class="dropdown-item" href="#" @click="handleLogOut">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {signOut, getAuth} from "firebase/auth";
import {useCurrentUser} from "vuefire";
import logo from '@/assets/logo.jpg'
const auth = getAuth();
const user = useCurrentUser();
const handleLogOut= async()=>{
    try{
        await signOut(auth);
        setTimeout(()=>{location.reload()},500);
    }
    catch(error){
        console.error(error)
    }
}           
</script>

<style scoped>
.logo {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
}
.nav-link:hover {
  background-color: #000000; /* Change this to the color you want when hovering */
  color: #ffffff; /* Change this to the color you want for the text when hovering */
}
</style>