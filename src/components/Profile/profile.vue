<script setup>
import { getAuth } from 'firebase/auth';
import { userRef } from '@/firebaseConfig';
import { ref, onMounted } from 'vue';
import { doc, getDoc, updateDoc } from '@firebase/firestore';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { useFileDialog } from '@vueuse/core';

const storage = useFirebaseStorage();

const auth = getAuth();
const uid = auth.currentUser.uid;
const fileName = ref('');
const { files, open, reset } = useFileDialog();
const profilePictureRef = storageRef(storage, `profilePictures/${uid}`);
const { url, uploadProgress, uploadError, uploadTask, upload } = useStorageFile(profilePictureRef);

var email = ref('');
var username = ref('');
var loaded = ref(false);
var about = ref('');
var contact = ref('');
var skills = ref('');
var projects = ref('');
var profilePicture = ref('');

// Fallback URL
const defaultProfilePictureUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrijjw-xF369QwQgouTEJBEeOAq0cLETni17kfUVuUvw&s';

const fetchUserData = async () => {
  const docRef = doc(userRef, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    email.value = docSnap.data().email;
    username.value = docSnap.data().name;
    about.value = docSnap.data().about || '';
    contact.value = docSnap.data().contact || '';
    skills.value = docSnap.data().skills || '';
    projects.value = docSnap.data().projects || '';

    // Check if profile picture exists
    const profilePictureUrl = docSnap.data().profilePicture || defaultProfilePictureUrl;
    profilePicture.value = profilePictureUrl


    loaded.value = true;
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
}

var updating = ref(false);

onMounted(() => {
  fetchUserData();
});

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
  });
  updating.value = false;
  alert("User data updated successfully");
}

async function uploadPicture() {
  const data = files.value?.item(0)
  if (data) {
    fileName.value = data.name;
    upload(data).then(() => {
      getDownloadURL(profilePictureRef).then(async (url) => {
        profilePicture.value = url;
        console.log(profilePicture.value);
        const docRef = doc(userRef, uid);

        await updateDoc(docRef, {
          profilePicture: url
        });
        window.location.reload();
      });
    });
  }
}

</script>

<template>
  <div v-if="loaded" class="container my-5">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4">
        <!-- Profile Picture Section -->
        <div class="text-center mb-4">

          <img :src="profilePicture" alt="Profile Picture" class="rounded-circle img-fluid profile-picture">
          <div>
            <fieldset :disabled="!!uploadTask">
              <button type="button" @click="open({ accept: 'image/*', multiple: false })" class="btn btn-primary mt-3">
                <template v-if="files?.length === 1">
                  <div class="selected-file">
                    <span class="file-name" title="files.item(0).name">Selected: {{ files.item(0).name }}</span>
                    <span class="file-actions" @click="open({ accept: 'image/*', multiple: false })"> Change</span>
                  </div>
                </template>
                <template v-else>Change Profile Picture</template>
              </button>
              <button v-if="files?.length" @click="uploadPicture" class="btn btn-success mt-3 mx-3">Save</button>
            </fieldset>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-8">
        <!-- User Data Form -->
        <form>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input id="email" type="text" class="form-control" :placeholder="email" disabled>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input id="username" type="text" class="form-control" v-model="username" :disabled="!updating"
                  data-bs-toggle="tooltip" title="Enter your username">
              </div>
              <div class="mb-3">
                <label for="about" class="form-label">About:</label>
                <textarea id="about" class="form-control" v-model="about" :disabled="!updating" data-bs-toggle="tooltip"
                  title="Tell us about yourself"></textarea>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <label for="contact" class="form-label">Contact:</label>
                <input id="contact" type="number" class="form-control" v-model="contact" :disabled="!updating"
                  data-bs-toggle="tooltip" title="Enter your contact number">
              </div>
              <div class="mb-3">
                <label for="skills" class="form-label">Skills:</label>
                <input id="skills" type="text" class="form-control" v-model="skills" :disabled="!updating"
                  data-bs-toggle="tooltip" title="Enter your skills">
              </div>
              <div class="mb-3">
                <label for="projects" class="form-label">Projects:</label>
                <input id="projects" type="text" class="form-control" v-model="projects" :disabled="!updating"
                  data-bs-toggle="tooltip" title="Enter your projects">
              </div>
            </div>
          </div>
          <button v-if="!updating" @click="updating = true" class="btn btn-primary">Update</button>
          <button v-if="updating" @click.prevent="updateUserData" class="btn btn-success">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.profile-picture {
  width: 150px; /* Adjust the width as needed */
  height: 150px; /* Adjust the height as needed */
}
</style>