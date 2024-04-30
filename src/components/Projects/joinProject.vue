
    <template>
        <h1>Join</h1>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="semester" class="form-label">Semester</label>
                            <select class="form-control" id="semester" v-model="semester">
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                                <option value="7">Semester 7</option>
                                <option value="8">Semester 8</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="department" class="form-label">Department</label>
                            <select class="form-control" id="department" v-model="department">
                                <option value="IT">IT</option>
                                <option value="CS">CS</option>
                                <option value="EE">EE</option>
                                <option value="ME">ME</option>
                                <option value="CE">CE</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="reason" class="form-label">Why do you want to join?</label>
                            <textarea class="form-control" id="reason" v-model="reason"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="contribution" class="form-label">How can you contribute in the project?</label>
                            <textarea class="form-control" id="contribution" v-model="contribution"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="availability" class="form-label">Availability</label>
                            <input type="text" class="form-control" id="availability" v-model="availability">
                        </div>
                        <div class="mb-3 form-check">
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
