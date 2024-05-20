<template>
    <div class="signup">
        <h1>Sign Up</h1>
        <form @submit.prevent="signup">
            <input type="text" v-model="name" placeholder="Name" required>
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { userRef } from "@/firebaseConfig";
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref(null);

async function signup() {
    try {
        const auth = getAuth();

        if (email.value.endsWith("@student.swin.edu.au") || email.value.endsWith("@swin.edu.au")) {
            console.log("Valid email");
        }
        else {
            error.value = "Invalid email";
            return;
        }
        if (password.value.length < 8) {
            error.value = "Password must be at least 8 characters";
            return;
        }
        if (password.value.search(/[a-z]/) < 0) {
            error.value = "Password must contain at least one lowercase letter";
            return;
        }
        if (password.value.search(/[A-Z]/) < 0) {
            error.value = "Password must contain at least one uppercase letter";
            return;
        }
        if (password.value.search(/[0-9]/) < 0) {
            error.value = "Password must contain at least one number";
            return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        await setDoc(doc(userRef, user.uid), {
            name: name.value,
            email: user.email,
        });

        name.value = "";
        email.value = "";
        password.value = "";
        error.value = null;
        window.location.href = "/profile";

        console.log("User signed up successfully!");
    } catch (e) {
        console.error(e);
        error.value = e.message;
    }
}
</script>

<style scoped>
.signup {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

h1 {
    text-align: center;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
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
﻿
