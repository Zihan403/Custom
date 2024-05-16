<template>
    <div class="container">
        <h1 class="gradient-text">Gallery</h1>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="image in images" :key="image.id">
                <div class="card mb-4">
                    <img :src="image.src" class="card-img-top img-card" :alt="image.title" @click="handleClick(image.src)">
                    <div class="card-body card-content">
                        <h5 class="card-title">{{ image.title }}</h5>
                        <p class="card-text">{{ image.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import img1 from '@/assets/img1.jpg'
import img2 from '@/assets/img2.jpg'
import img3 from '@/assets/img3.jpg'
import img4 from '@/assets/img4.jpg'

export default {
    data() {
        return {
            images: [
                { id: 1, src: img1, title: 'Stall in orientation week', description: 'Swinburne embedded system club' },
                { id: 2, src: img2, title: 'Meet our president and team member', description: 'At Oweek club stall' },
                { id: 3, src: img3, title: 'Meet our panel members', description: 'At club day in swinburne university' },
                { id: 4, src: img4, title: 'Meet our team members', description: 'At club day in swinburne university' }
                // Add more images as needed
            ]
        }
    },
    methods: {
        handleClick(src) {
            // Open the image in a new tab
            window.open(src, '_blank');
        }
    }
}
</script>

<style scoped>
h1.gradient-text {
   

    background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #b9d7fb 50%, #fdf8f9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-align: center;
      margin: 20px 0;
    }
.img-card {
    object-fit: cover;
    height: 200px; /* Adjust as needed */
}

.card-content {
    height: 150px; /* Adjust as needed */
    overflow: auto;
}
</style>