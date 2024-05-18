<script setup>
import { getAuth } from 'firebase/auth';
import { projectRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router';

const projectId = window.location.pathname.split('/')[2];
const project = ref({});
const auth = getAuth();
const uid = auth.currentUser.uid;
const router = useRouter();
const isAdmin = ref(true);
const checkIfAdmin = async () => {
    const docRef = doc(projectRef, projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const projectData = docSnap.data();
        if (projectData.creatorId === uid) {
            isAdmin.value = true;
        }
    } else {
        console.log("No such document!");
    }
}
const fetchProject = async () => {
    const docRef = doc(projectRef, projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const projectData = docSnap.data();
        project.value = {
            id: projectId,
            title: projectData.title,
            description: projectData.description,
            projectImage: projectData.projectImage,
            item1: projectData.numberOfMembers,
            item2: projectData.skillsNeeded,
            item3: projectData.deadline,
            link1: projectData.link1
        };
    } else {
        console.log("No such document!");
    }
}

fetchProject();

</script>

<template>
    <div class="container">
        <div v-if="isAdmin" class="row mt-1">
            <div class="col-md-2">
                <router-link :to="`/joinRequests/${projectId}`" class="btn btn-primary">View Requests</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h1 class="text-center">{{ project.title }}</h1>
            </div>
        </div>
    </div>

</template>

<style scoped>
h1.gradient-text {


    background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #a8cdf9 50%, #fdf8f9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-align: center;
    margin: 20px 0;
}

h3.gradient-text {


    background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #d6e6f9 50%, #fdf8f9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-align: center;
    margin: 20px 0;
}


.create-project-btn {
    border-radius: 50px;
    background: rgb(11, 100, 244);
    color: rgb(255, 255, 255);
    position: absolute;
    top: 0.5;
    right: 0;
    margin: 20px;
}

.create-project-btn:hover {
    background-color: #000408;
}

.scaled-card {
    transform: scale(1.1);
    margin: 15px;
}
</style>
