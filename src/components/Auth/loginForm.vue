<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Login</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ref } from "vue";
import {useRouter} from "vue-router";


const email = ref("");
const password = ref("");
const error = ref(null);

async function login() {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        
        email.value = "";
        password.value = "";
        error.value = null;
        // Redirect to a success page or show a success message
        
        if (user){
            console.log("User signed up successfully!");
            const router = useRouter();
            window.location.href= '/profile'
        }
        else{

        }
    } catch (e) {
        console.error(e);
        error.value = e.message;
    }
}
</script>

<style scoped>
.login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

h1 {
    text-align: center;
    color: black;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.error {
    color: red;
    margin-top: 10px;
    text-align: center;
}
</style>