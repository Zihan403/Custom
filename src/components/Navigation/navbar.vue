<script setup>
import {signOut, getAuth} from "firebase/auth";
import {useRouter} from "vue-router";
import {useCurrentUser} from "vuefire";
import logo from "@/assets/logo.jpg";
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
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><img :src = "logo" alt="logo" class="logo"/></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
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
          <li class="nav-item" v-if="!user">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item" v-if="!user">
            <a class="nav-link" href="/signup">Signup</a>
          </li>
        </ul>
        <button class="btn btn-primary" v-if="user" @click="handleLogOut">Logout</button>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.logo {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
}
</style>