<template>
    <div>
        <h1 class="gradient-text">Upcoming Events</h1>
        <p>Get to know more about our club's upcoming event!</p>

        <div class="calendar">
            <!-- Display events in a calendar format -->
            <div v-for="event in events" :key="event.id"  class="event-card":style="{ backgroundImage: `url(${event.image})` }">
                
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ event.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ event.date }}</h6>
                        <p class="card-text">{{ event.description }}</p>
                        <a :href="getEventLink(event.id)" class="card-link">Event Details</a>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

        

<script setup>
const events = [
    {
        id: 1,
        title: "Monthly Arduino Workshop",
        date: "10-06-2024",
        description: "Join us for our monthly Arduino workshop and learn about the latest projects and technologies!"
        
    },
    {
        id: 2,
        title: "Line following robot competition",
        date: "29-06-2024",
        description: "Compete in our line following robot competition and win exciting prizes!"
    },
    {
        id: 3,
        title: "Introduction to Raspberry Pi",
        date: "15-07-2024",
        description: "Learn the basics of Raspberry Pi and how to build your own projects!"
    }
];

function getEventLink(eventId) {
    // Replace the URL with the desired link to the calendar or another view
    return `https://example.com/calendar?eventId=${eventId}`;
}
</script>

<style scoped>

h1.gradient-text {
   

background-image: -webkit-linear-gradient(0deg, #f8f4f4 0%, #9cc6fa 50%, #fdf8f9 100%);
background-clip: text;
-webkit-background-clip: text;
color: transparent;
-webkit-text-fill-color: transparent;
text-align: center;
  margin: 20px 0;
}

.calendar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.event-card {
    background: rgb(120, 119, 119);
    padding: 20px;
    border-radius: 5px;
    
    color: #e8e7e7;
    text-decoration: none;
    cursor: pointer;
}
</style>