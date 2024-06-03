<template>
  <div class="welcome-page container-fluid">
    <!-- Hero Section -->
    <div class="jumbotron row align-items-center text-center" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="col-12">
        <h1 class="gradient-text">Welcome to Swinburne Embedded System Club</h1>
        <p class="lead">
          Swinburne Embedded Systems Club: Igniting curiosity, fostering innovation.
        </p>
        <button class="btn btn-primary" v-on:click="openLink">Join Now</button>
      </div>
    </div>




  </div>
</template>

<script>
import backgroundImage from '@/assets/razor.jpg'; // adjust the path to match the actual location of the image

export default {
  name: 'WelcomePage',
  data() {
    return {
      backgroundImage
    }
  },
  methods: {
    openLink() {
      window.open('https://studentlife.swinburne.edu.au/Clubs/Swin-Embedded', '_blank');
    }
  }
};
</script>

<style scoped>
.container-fluid {
  padding: 0;
}

.jumbotron {
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.jumbotron::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  opacity: 0.5;
  z-index: -1;
}

.gradient-text {
  background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #4a99f9 50%, #fdf8f9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.lead {
  color: rgba(255, 255, 255, 0.85);
}

.btn-primary {
  background-color: rgba(0, 123, 255, 0.7);
  border-color: rgba(0, 123, 255, 0.7);
}

@media (max-width: 768px) {
  .gradient-text {
    font-size: 1.5rem;
  }
  .lead {
    font-size: 1rem;
  }
  .btn-primary {
    font-size: 1rem;
    padding: 10px 20px;
  }
}
</style>
