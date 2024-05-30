<script setup>
import { getAuth } from 'firebase/auth';
import { projectRef } from '@/firebaseConfig';
import { ref } from 'vue';
import { doc, getDocs, updateDoc } from '@firebase/firestore';
import { useRouter } from 'vue-router';

// Initialize a reactive reference to an empty array for storing all projects
const projects = ref([]);

// Initialize a reactive reference to an empty array for storing user's own projects
const myProjects = ref([]);

// Initialize a reactive reference to an empty array for storing ongoing projects
const ongoingProjects = ref([]);

// Get the authentication object from Firebase
const auth = getAuth();

// Get the unique ID of the currently logged in user
const uid = auth.currentUser.uid;

// Get the Vue Router instance for navigating between pages
const router = useRouter();
const searchResults = ref([]);
const search = ref('');
const searchProject = (searchText) => {
  console.log(searchText);
  search.value = searchText;
  const lowerCaseSearchText = searchText.toLowerCase();
  searchResults.value = projects.value.filter(project => {
    const lowerCaseTitle = project.title.toLowerCase();
    const lowerCaseSkillsNeeded = project.skillsNeeded.toLowerCase();
    const lowerCaseDescription = project.description.toLowerCase();
    return lowerCaseTitle.includes(lowerCaseSearchText) || lowerCaseSkillsNeeded.includes(lowerCaseSearchText) || lowerCaseDescription.includes(lowerCaseSearchText);
  });
};

//shob projects fetch korbo
const fetchAllProjects = async () => {
  const querySnapshot = await getDocs(projectRef);
  querySnapshot.forEach((doc) => {
    const projectId = doc.id;
    const projectData = doc.data();
    const project = {
      id: projectId,
      title: projectData.title,
      description: projectData.description,
      projectImage: projectData.projectImage,
      numberOfMembers: projectData.numberOfMembers,
      skillsNeeded: projectData.skillsNeeded,
      deadline: projectData.deadline,
      members: projectData.members,
      creatorId: projectData.creatorId
    };

    projects.value.push(project);
    //ekhon shob projects theke dui bhag korbo , jegular ami member ba jegula ami banaisi ogula my projects e nibo ar bakigula ongoing e dhukabo

    if (project.members.some(member => member.id === uid) || project.creatorId === uid) {
      myProjects.value.push(project);
    } else {
      ongoingProjects.value.push(project);
    }
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
  <div class="d-flex flex-row justify-content-between mt-3">
    <div class="create-project-container">
      <button @click="createProject" class="create-project-btn">Create Project</button>
    </div>
    <div>
      <form class=" d-flex " role="search">
        <input class="form-control me-2" type="search" placeholder="Search project" aria-label="Search"
          v-model="searchText" @input="searchProject(searchText)">
      </form>
    </div>

  </div>

  <div v-if="search.length != 0">
    <h1 class=" gradient-text">Search Results</h1>

    <div class="container" v-if="searchResults.length != 0">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="project in searchResults" :key="project.id">
          <a :href="'project/' + project.id" class="card-link">
            <div class="card mb-4 scaled-card">
              <img :src="project.projectImage" class="card-img-top" alt="Project Image">
              <div class="card-body">
                <h5 class="card-title">{{ project.title }}</h5>
                <p class="card-text">{{ project.description }}</p>
                <p class="card-text">{{ project.skillsNeeded }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="gradient-text">My Projects</h1>

    <div class="container" v-if="myProjects.length != 0">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="project in myProjects" :key="project.id">
          <a :href="'project/' + project.id" class="card-link">
            <div class="card mb-4 scaled-card">
              <img :src="project.projectImage" class="card-img-top" alt="Project Image">
              <div class="card-body">
                <h5 class="card-title">{{ project.title }}</h5>
                <p class="card-text">{{ project.description }}</p>

              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <h1 class="gradient-text">Ongoing Projects</h1>
    <h3 class="gradient-text">Join a project to collaborate with other members!</h3>

    <div class="container" v-if="ongoingProjects.length != 0">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="project in ongoingProjects" :key="project.id">
          <div class="card mb-4 scaled-card">
            <img :src="project.projectImage" class="card-img-top" alt="Project Image">
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">{{ project.description }}</p>
              <p class="card-text">{{ project.skillsNeeded }}</p>
            </div>

            <div class="card-body">
              <a :href="'join/' + project.id" class="card-link">
                <button class="btn">
                  Join
                </button>
              </a>
            </div>
          </div>
        </div>
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

h1.gradient-text {


  background-image: -webkit-linear-gradient(0deg, #ffffff 0%, #aaceef 50%, #1b70f8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 20px 0;
}

h3.gradient-text {


  background-image: -webkit-linear-gradient(10deg, #ffffff 0%, #aaceef 50%, #1b70f8 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 20px 0;
}

a {
  text-decoration: none;
}

.create-project-btn {
  border-radius: 50px;
  background: rgb(11, 100, 244);
  color: rgb(255, 255, 255);

}

-->.create-project-btn:hover {
  background-color: #000408;
}

.scaled-card {
  transform: scale(1.1);
  margin: 15px;
}
</style>
