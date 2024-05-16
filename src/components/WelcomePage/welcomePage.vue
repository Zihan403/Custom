<template>
  <div class="welcome-page container">

    <!-- Hero Section -->
    <div class="jumbotron row align-items-center text-center">
      <div class="col-12">
        <h1 class="gradient-text">Welcome to Swinburne Embedded System Club</h1>
        <p class="lead">
          Swinburne Embedded Systems Club: Igniting curiosity, fostering innovation.
        </p>
        <button class="btn btn-primary" v-on:click="openLink">Join Now</button>
      </div>
    </div>

    <!-- Featured Sections -->
    <!-- Add your club logos, event listings, health resources, etc. -->

    <!-- Footer -->

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
   

  background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #aaccf5 50%, #fdf8f9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
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