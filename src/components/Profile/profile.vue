<script setup>
import { getAuth } from 'firebase/auth';
import { userRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc,getDoc, updateDoc } from '@firebase/firestore';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import {ref as storageRef} from 'firebase/storage';
import { useFileDialog } from '@vueuse/core'

const storage = useFirebaseStorage();


const auth = getAuth();
const uid = auth.currentUser.uid;
const fileName = ref('');
const {files, open, reset} = useFileDialog();
const profilePictureRef = storageRef(storage, 'profilePictures/' + uid);
const {url,uploadProgress, uploadError, uploadTask, upload} = useStorageFile(profilePictureRef);

var email = ref('');
var username = ref('');
var loaded = ref(false);
var about = ref('');
var contact = ref('');
var skills = ref([]);
var projects = ref([]);
var profilePicture = ref('');


const fetchUserData = async () => {
    const docRef = doc(userRef, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        email.value = docSnap.data().email;
        username.value = docSnap.data().name;
        about.value = docSnap.data().about ? docSnap.data().about : '';
        contact.value = docSnap.data().contact ? docSnap.data().contact : '';
        skills.value = docSnap.data().skills ? docSnap.data().skills : [];
        projects.value = docSnap.data().projects ? docSnap.data().projects : [];
        profilePicture.value = docSnap.data().profilePicture ? docSnap.data().profilePicture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrijjw-xF369QwQgouTEJBEeOAq0cLETni17kfUVuUvw&s';
        loaded.value = true;
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}



var updating = ref(false);


fetchUserData();

const showUpdatedUserName = () => {
    alert(username.value);
}

const updateUserData = async () => {
    const docRef = doc(userRef, uid);
    await updateDoc(docRef, {
        name: username.value,
        about: about.value,
        contact: contact.value,
        skills: skills.value,
        projects: projects.value,
        profilePicture: url
    });
    updating.value = false;
    alert("User data updated successfully");
}

async function uploadPicture() {
  const data = files.value?.item(0)
  if (data) {
    fileName.value = data.name;
    upload(data)
    
  
  }

 
}


</script>
<template>
  <div v-if="loaded" class="container my-5">
    <div class="text-center mb-4">
      <img :src="url" alt="Profile Picture" class="rounded-circle" style="width: 200px; height: 200px;">
      <div>
        <fieldset :disabled="!!uploadTask">
          <button type="button" @click="open({ accept: 'image/*', multiple: false })" class="btn btn-primary mt-3">
            <template v-if="files?.length === 1">
              Selected file: {{ files.item(0).name }} (Click to select another)
            </template>
            <template v-else> Select one picture </template>
          </button>
          <div class="progress mt-2">
            <div class="progress-bar" role="progressbar" :style="{ width: uploadProgress + '%' }" :aria-valuenow="uploadProgress" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <button @click='uploadPicture' class="btn btn-success mt-2">Upload</button>
        </fieldset>
      </div>
    </div>
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input id="email" type="text" class="form-control" :placeholder="email" disabled>
      </div>
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input id="username" type="text" class="form-control" :placeholder="username" v-model="username" :disabled="!updating" data-bs-toggle="tooltip" title="Enter your username">
      </div>
      <div class="mb-3">
        <label for="about" class="form-label">About:</label>
        <textarea id="about" class="form-control" v-model="about" :disabled="!updating" data-bs-toggle="tooltip" title="Tell us about yourself"></textarea>
      </div>
      <div class="mb-3">
        <label for="contact" class="form-label">Contact:</label>
        <input id="contact" type="number" class="form-control" :placeholder="contact" v-model="contact" :disabled="!updating" data-bs-toggle="tooltip" title="Enter your contact number">
      </div>
      <div class="mb-3">
        <label for="skills" class="form-label">Skills:</label>
        <input id="skills" type="text" class="form-control" :placeholder="skills" v-model="skills" :disabled="!updating" data-bs-toggle="tooltip" title="Enter your skills">
      </div>
      <div class="mb-3">
        <label for="projects" class="form-label">Projects:</label>
        <input id="projects" type="text" class="form-control" :placeholder="projects" v-model="projects" :disabled="!updating" data-bs-toggle="tooltip" title="Enter your projects">
      </div>
      <button v-if="!updating" @click="updating = true" class="btn btn-primary">Update</button>
      <button v-if="updating" @click="updateUserData" class="btn btn-success">Save</button>
    </form>
  </div>
</template>