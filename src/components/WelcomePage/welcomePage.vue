<template>
    <div class="welcome-page">

  
      <!-- Hero Section -->
      <div class="jumbotron">
        <h1 class="display-4 gradient-text">Welcome to Swinburne Embedded System Club</h1>
        <p class="lead">
          Swinburne Embedded Systems Club: Igniting curiosity, fostering innovation.
        </p>
        <button class="btn btn-primary" v-on:click="openLink">Join Now</button>
      </div>
  
      <!-- Featured Sections -->
      <!-- Add your club logos, event listings, health resources, etc. -->
  
      <!-- Footer -->
      <footer class="text-center mt-5">
        <p>
          © 2024 All Rights Reserved. Swinburne Embedded System Club.
          <br />
          We respectfully acknowledge the Wurundjeri People, Traditional Owners of the land.
        </p>
        <p>Contact: <a href="tel:+61392145445">(03) 9214 5445</a> | <a href="https://studentlife.swinburne.edu.au/Clubs/Swin-Embedded">studentlife@swin.edu.au/Clubs/Swin-Embedded</a></p>
        <p>Follow us: <a href="https://www.instagram.com/swinembedded?igsh=MXF5aDIzYWV6dGhxNg%3D%3D&utm_source=qr/">Instagram</a> | <a href="https://www.facebook.com/share/sAEtR9xk4n2fJpBy/?mibextid=LQQJ4d/">Facebook</a></p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WelcomePage',
    methods: {
    openLink() {
      window.open('https://studentlife.swinburne.edu.au/Clubs/Swin-Embedded', '_blank');
    }
  }
  };
  
  </script>
  
  <style scoped>
  .gradient-text {
    background: -webkit-linear-gradient(rgb(237, 16, 16), rgb(97, 2, 2));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: Arial Black, sans-serif;
    font-size: 50px;

  }
  .nav-link {
    color: #333;
    font-size: 18px;
    padding: 10px;
  }
  
  .nav-link:hover {
    color: #007bff;
  }
  </style>