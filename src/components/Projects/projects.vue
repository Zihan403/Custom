<script setup>
import { getAuth } from 'firebase/auth';
import { projectRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc, getDocs, updateDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router';

const projects = ref([]);
const auth = getAuth();
const uid = auth.currentUser.uid;
const router = useRouter();
const fetchAllProjects = async () => {
  const querySnapshot = await getDocs(projectRef);
  querySnapshot.forEach((doc) => {
    const projectId = doc.id;
    const projectData = doc.data();
    projects.value.push({
      id: projectId,
      title: projectData.title,
      description: projectData.description,
      projectImage: projectData.projectImage,
      item1: projectData.numberOfMembers,
      item2: projectData.skillsNeeded,
      item3: projectData.deadline,
      link1: projectData.link1
    });
  });
}

fetchAllProjects();
console.log(projects.value);
console.log(projects.value);
const createProject = () => {
  router.push('/createProject');
}
</script>

<template>
  <button @click="createProject" class="create-project-btn">Create Project</button>
  <div v-if="projects.length != 0">
    <div v-for="project in projects" :key="project.id" class="card" style="width: 18rem;">
      <img :src="project.projectImage" class="card-img-top" alt="Project Image">
      <div class="card-body">
        <h5 class="card-title">{{ project.title }}</h5>
        <p class="card-text">{{ project.description }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ project.item1 }}</li>
        <li class="list-group-item">{{ project.item2 }}</li>
        <li class="list-group-item">{{ project.item3 }}</li>
      </ul>
      <div class="card-body">
        <a :href="project.link1" class="card-link">Card link</a>
        <a :href="'join/' + project.id" class="card-link">Join</a>
      </div>
    </div>
  </div>
</template>
<style scoped>
.create-project-btn {
  border-radius: 50px;
  background: rgb(170, 9, 9);
  color: white;
  position: absolute;
  top: 0.5;
  right: 0;
  margin: 20px;

}

.create-project-btn:hover {
  background-color: #000408;
}
</style>