<script setup>
import { getAuth } from 'firebase/auth';
import { projectRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc, getDoc, updateDoc, deleteDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router';

const projectId = window.location.pathname.split('/')[2];
const project = ref({});
const auth = getAuth();
const uid = auth.currentUser.uid;
const router = useRouter();
//check kortesi admin kina eta lagbe karon admin na hoile view and delete button gula dekhabo na
const isAdmin = ref(false);
const checkIfAdmin = async () => {
    const docRef = doc(projectRef, projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const projectData = docSnap.data();
        //jodi current project er creator id and amar id same hoy tar mane ami admin 
        if (projectData.creatorId === uid) {
            isAdmin.value = true;
        }
    } else {
        console.log("No such document!");
    }
}
checkIfAdmin();
//project er basic details fetch korlam
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
//just delete function call kore delete kore dilam
const deleteProject = async () => {
    const docRef = doc(projectRef, projectId);
    await deleteDoc(docRef);
    router.push('/projects');
}



fetchProject();

</script>

<template>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-black" id="exampleModalLabel">Confirm Deletion</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-black">
                    Are you sure you want to delete this project?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="deleteProject">Confirm</button>
                </div>
            </div>
        </div>
    </div>




    <div class="container">

        <div v-if="isAdmin" class="row mt-1 justify-content-between">
            <div class="col-md-2">
                <router-link :to="`/joinRequests/${projectId}`" class="btn btn-primary">View Requests</router-link>
            </div>
            <div class="col-md-2 ">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete Project
                </button>
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
