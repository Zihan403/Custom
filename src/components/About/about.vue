<template>
    <div>
        <h1>About Us</h1>
        <p>Welcome to our company's About Us page!</p>
        
        <button @click="changeMessage">Click me!</button>
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
h1 {
    color: #333;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>