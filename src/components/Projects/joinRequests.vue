<script setup>
import { getAuth } from 'firebase/auth';
import { projectRef, joinRequestRef, userRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc, getDocs, getDoc, updateDoc, deleteDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router';

const joinRequests = ref([]);
const selectedJoinReq = ref({});
const projectId = window.location.pathname.split('/')[2];
const auth = getAuth();
const uid = auth.currentUser.uid;
const router = useRouter();
const isAdmin = ref(true);

const fetchAllJoinRequests = async () => {
    const querySnapshot = await getDocs(joinRequestRef);
    
    querySnapshot.forEach((doc) => {
        const joinRequestId = doc.id;
        const joinRequestData = doc.data();
        if (joinRequestData.projectId === projectId) {
            joinRequests.value.push(
                {
                    id: joinRequestId,
                    userId: joinRequestData.userId,
                    projectId: joinRequestData.projectId,
                    name: joinRequestData.name,
                    department: joinRequestData.department,
                    reason: joinRequestData.reason,
                    availability: joinRequestData.availability,
                    skills: joinRequestData.skills,
                    status: joinRequestData.status
                },
            );
        }
    });
}

fetchAllJoinRequests();



const approveJoinRequest = async (joinRequest) => {
    try {

        console.log(joinRequest);
       
        const projectDocumentRef = doc(projectRef, joinRequest.projectId);
        const joinRequestDocumentRef = doc(joinRequestRef, joinRequest.id);

        const projectSnapshot = await getDoc(projectDocumentRef);
        if (!projectSnapshot.exists()) {
            throw new Error("Project document does not exist");
        }

        const projectData = projectSnapshot.data();
        const currentMembers = projectData.members || [];

        await updateDoc(projectDocumentRef, {
            members: [
                ...currentMembers,
                {
                    name: joinRequest.name,
                    id: joinRequest.userId
                }
            ]
        });


        await deleteDoc(joinRequestDocumentRef);
        alert("Approved " + joinRequest.name);
        router.go();
    } catch (error) {
        console.error("Error approving join request: ", error);
    }
}

const showDetailsModal = async (joinRequest) => {
    selectedJoinReq.value = joinRequest;
}
</script>

<template>
    <div class="container">
        <div class="card-deck">

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-black" id="staticBackdropLabel">Join Request Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p class="text-black"><strong>User Name:</strong> {{ selectedJoinReq.name }}</p>
                            <p class="text-black"><strong>Department:</strong> {{ selectedJoinReq.department }}</p>
                            <p class="text-black"><strong>Reason:</strong> {{ selectedJoinReq.reason }}</p>
                            <p class="text-black"><strong>Availability:</strong> {{ selectedJoinReq.availability }}</p>
                            <p class="text-black"><strong>Skills:</strong> {{ selectedJoinReq.skills }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="joinRequests.length === 0" class="card mt-5">
                <div class="card-body">
                    <h5 class="card-title text-center">No join requests</h5>
                </div>
            </div>
            <div v-else>
                <div v-for="joinRequest in joinRequests" :key="joinRequest.id" class="card scaled-card">
                    <div v-if="!joinRequest.status" class="card-body row">
                        <div class="col-9">
                            <h5 class="card-title">{{ joinRequest.name }}</h5>
                            <p class="card-text">{{ joinRequest.department }}</p>
                        </div>
                        <div class="col-3 m-0">
                            <button class="btn btn-primary m-2 "
                                @click="approveJoinRequest(joinRequest)">Approve</button>
                            <button type="button" class="btn btn-primary mx-2 " data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop" @click="showDetailsModal(joinRequest)">View
                                Details</button>
                        </div>
                    </div>
                </div>
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
