<script setup>
import { getAuth } from 'firebase/auth';
import { projectRef, postRef, userRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc, getDoc, updateDoc, setDoc } from '@firebase/firestore';
import { useFirebaseStorage, useStorageFile } from 'vuefire';
import { ref as storageRef, getDownloadURL } from 'firebase/storage';
import { useFileDialog } from '@vueuse/core'
import router from '@/router';

const auth = getAuth();
const uid = auth.currentUser.uid;
const projectId = window.location.pathname.split('/')[2];
const post = ref("")
const userName = ref("")
//again username ta nilam
const getusername = async () => {
    const docRef = doc(userRef, uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const userData = docSnap.data();
        userName.value = userData.name;
    } else {
        console.log("No such document!");
    }
}
//function ta call korlam
getusername();
const createPost = async () => {
    await setDoc(doc(postRef), {
        creatorId: uid,
        creatorname: userName.value,
        post: post.value,
        projectId: projectId,
        likes: [],
        comments: [],
        likesCount: 0,
        commentsCount: 0,
        postTime: new Date().toISOString(),

    });
    alert('Post created successfully');
    post.value = '';
    router.go();
}

</script>
<template>
    <div class="container">

        <div class="row">
            <div class="col">
                <textarea v-model="post" class="form-control" rows="5" placeholder="Write your post here"></textarea>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                <button class="btn" @click="createPost">Create Post</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
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