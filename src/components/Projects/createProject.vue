<script setup>
import { getAuth } from 'firebase/auth';
import { projectRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc, getDoc, updateDoc, setDoc } from '@firebase/firestore';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import {ref as storageRef} from 'firebase/storage';
import { useFileDialog } from '@vueuse/core'

const auth = getAuth();
const uid = auth.currentUser.uid;
const coverPhoto = ref('');
const title = ref('');
const description = ref('');
const numberOfMembers = ref('');
const skillsNeeded = ref('');
const deadline = ref('');
const storage = useFirebaseStorage();
const fileName = ref('');
const {files, open, reset} = useFileDialog();
const projectPictureRef = storageRef(storage, 'projectPictures/' + uid);
const {url,uploadProgress, uploadError, uploadTask, upload} = useStorageFile(projectPictureRef);
auth.onAuthStateChanged((user) => {
    if (!user) {
        router.push('/login');
    }
});
const createProject = async () => {
    await setDoc(doc(projectRef), {
        creatorId: uid,
        coverPhoto: coverPhoto.value,
        title: title.value,
        description: description.value,
        numberOfMembers: numberOfMembers.value,
        skillsNeeded: skillsNeeded.value,
        deadline: deadline.value
    });
    alert('Project created successfully');
    coverPhoto.value = '';
    title.value = '';
    description.value = '';
    numberOfMembers.value = '';
    skillsNeeded.value = '';
    deadline.value = '';
    
}
async function uploadPicture() {
  const data = files.value?.item(0)
  if (data) {
    fileName.value = data.name;
    upload(data)
    await uploadTask.value.then(() => {
      console.log('File uploaded successfully');
      const docRef = doc(userRef, uid);
      updateDoc(docRef, {
        projectPicture: url.value
      });
      console.log('url:', url.value)
    });
  
  }

 
}

</script>
<template>
    <div class="container">
        <h1>Create New Project</h1>

        <form class="form" @submit.prevent="createProject">
            <div class="form-group">
                <label for="coverPhoto">Cover Photo</label>
                <input type="file" class="form-control" id="coverPhoto" />
            </div>
            <div class ='projectImage'>
                <label for="coverPhoto">Project Image</label>
                <img :src="coverPhoto" alt="Project Image" />
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="title" type="text" class="form-control" id="title" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model="description" class="form-control" id="description"></textarea>
            </div>
            <div class="form-group">
                <label for="numberOfMembers">Number of Members</label>
                <input v-model="numberOfMembers" type="number" class="form-control" id="numberOfMembers" />
            </div>
            <div class="form-group">
                <label for="skillsNeeded">Skills Needed</label>
                <input v-model="skillsNeeded" type="text" class="form-control" id="skillsNeeded" />
            </div>
            <div class="form-group">
                <label for="deadline">Deadline</label>
                <input v-model="deadline" type="date" class="form-control" id="deadline" />
            </div>
            <button type="submit" class="btn btn-primary">Create Project</button>
        </form>
    </div>
</template>




<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.container h1 {
    color: #000408; /* replace with your desired color */
}

.form {
    display: flex;
    flex-direction: column;
    width: 30%; /* reduce the width of the form */
    margin: 0 auto; /* center the form horizontally */
    background-color: rgb(170, 9, 9);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #f5f5f5
}

.form-group input,
.form-group textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    width: 100%; /* make the input fields take up the full width of the form */
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #000306;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #000408;
}
</style>