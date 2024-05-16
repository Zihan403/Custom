
<template>
    <div class="container">
        <h1 class="text-center">Join</h1>
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" v-model="name" required>
                    </div>
                    <div class="form-group">
                        <label for="semester">Semester</label>
                        <select class="form-control" id="semester" v-model="semester" required>
                            <option v-for="n in 8" :value="n">Semester {{ n }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="department">Department</label>
                        <select class="form-control" id="department" v-model="department" required>
                            <option v-for="dept in ['IT', 'CS', 'EE', 'ME', 'CE']" :value="dept">{{ dept }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="reason">Why do you want to join?</label>
                        <textarea class="form-control" id="reason" v-model="reason" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="contribution">How can you contribute in the project?</label>
                        <textarea class="form-control" id="contribution" v-model="contribution" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="availability">Availability</label>
                        <input type="text" class="form-control" id="availability" v-model="availability" required>
                    </div>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input" id="shareProfile" v-model="shareProfile">
                        <label class="form-check-label" for="shareProfile">Share profile information</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

    <script setup>
    import { ref } from 'vue';
    import {getDoc, setDoc, doc} from 'firebase/firestore';
    import { projectRef } from '@/firebaseConfig';
    import { joinRequestRef, userRef } from '@/firebaseConfig';
    import { getAuth } from 'firebase/auth';


    const name = ref('');
    const semester = ref('');
    const department = ref('');
    const reason = ref('');
    const contribution = ref('');
    const availability = ref('');
    const shareProfile = ref(false);
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    const projectId = window.location.pathname.split('/')[2];
    const email = ref('');
    const skills = ref([]);
    const projects = ref([]);
    const contact = ref('');
    const fetchUserData = async () => {
        const docRef = doc(userRef, uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            email.value = docSnap.data().email;
            contact.value = docSnap.data().contact ? docSnap.data().contact : '';
            skills.value = docSnap.data().skills ? docSnap.data().skills : [];
            projects.value = docSnap.data().projects ? docSnap.data().projects : [];
            
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    }
    fetchUserData();
    const handleSubmit = async () => {
        if(shareProfile.value){
            await setDoc(doc(joinRequestRef), {
                projectId: projectId,
                userId: uid,
                name: name.value,
                semester: semester.value,
                department: department.value,
                reason: reason.value,
                contribution: contribution.value,
                availability: availability.value,
                shareProfile: shareProfile.value,
                email: email.value,
                skills: skills.value,
                contact: contact.value
            });
        }else{
            await setDoc(doc(joinRequestRef), {
                projectId: projectId,
                userId: uid,
                name: name.value,
                semester: semester.value,
                department: department.value,
                reason: reason.value,
                contribution: contribution.value,
                availability: availability.value,
                shareProfile: shareProfile.value
            });
        }
        alert('Request sent successfully');
        name.value = '';
        semester.value = '';
        department.value = '';
        reason.value = '';
        contribution.value = '';
        availability.value = '';
        shareProfile.value = false;
    }

            
    </script>
    <style scoped>
    @media (min-width: 576px) {
        form {
            max-width: 540px;
        }
    }
    @media (min-width: 768px) {
        form {
            max-width: 720px;
        }
    }
    @media (min-width: 992px) {
        form {
            max-width: 960px;
        }
    }
    </style>
