<template>
    <div class="container">
        <h1 class="gradient-text">About Our Club</h1>
        <p class="description">Welcome to our club's About Us page! We are a group of passionate individuals who share a common interest in Microelectronics and Embedded System. Our mission is to teach and practice with real world industry standard microcontroller knowledge.</p>
        
        <h2 class="gradient-text">Our History</h2>
        <p class="description">Our club is a vibrant community dedicated to exploring the exciting world of the embedded systems. Whether you're a beginner taking your first steps into the world of programming and hardware, or an experienced tinkerer looking to push the boundaries of creativity, our club provides a welcoming and collaborative space for all skill levels.</p>
        
    
        
        <h2 class="gradient-text">Membership</h2>
        <p class="description">Come be a part of our community and connect with fellow enthusiasts who share your passion for microelectronics. Whether you're eager to work on exciting projects, collaborate with others, or simply showcase your creations, we invite you to join us.
            Join our Discord server here.
            Reach us at SwinEmbedded@gmail.com</p>
        
        
        <a class="btn" href="https://studentlife.swinburne.edu.au/Clubs/Swin-Embedded" target="_blank">Join Membership</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "Click the button to change this message!"
        };
    },
    methods: {
        changeMessage() {
            this.message = "Message changed!";
        }
    }
};
</script>

<style scoped>
h1.gradient-text {
   

    background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #4a99f9 50%, #fdf8f9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    }
    h2.gradient-text {
   

        background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #4a99f9 50%, #fdf8f9 100%);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        }

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    color: #ffffff;
    font-size: 2em;
    margin-bottom: 20px;
}

.subtitle {
    color: #ffffff;
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 10px;
}

.description {
    color: #ffffff;
    line-height: 1.6;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.message {
    margin-top: 20px;
    color: #333;
}
</style>