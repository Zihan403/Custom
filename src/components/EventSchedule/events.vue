<template>
    <div>
      <h1 class="gradient-text">Upcoming Events</h1>
      <p class="text-center">Get to know more about our club's upcoming event!</p>
  
      <div class="calendar">
        <div v-for="event in events" :key="event.id" class="event-card" :style="{ backgroundImage: `url(${event.image})` }">
          <div class="card-overlay">
            <div class="card-body">
              <h5 class="card-title">{{ event.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted date">{{ event.date }}</h6>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
 
  
  
  <script setup>
  import arduino from '@/assets/arduino.jpg';
  import joinus from '@/assets/joinus.jpg';
  import inauguration from '@/assets/inaugural.jpg';
  import robot from '@/assets/robot.jpg';
  import rasberry from '@/assets/rasberry.jpg';
  
  const events = [
    {
      id: 1,
      title: "Monthly Arduino Workshop",
      date: "10-06-2024",
      description: "Join us for our monthly Arduino workshop and learn about the latest projects and technologies!",
      image: arduino
    },
    {
      id: 2,
      title: "Session, Quiz and Competition",
      date: "29-06-2024",
      description: "Join us for a fun session, quiz and competition to test your knowledge and skills! Guest: DR RHYS SHOBBROOK",
      image: joinus
    },
    {
      id: 3,
      title: "Inaugural Ceremony",
      date: "15-07-2024",
      description: "Join us for our inaugural ceremony and get to know more about our club's vision and mission! Guest: DR RHYS SHOBBROOK",
      image: inauguration
    },
    {
      id: 4,
      title: "Robotics Workshop",
      date: "25-07-2024",
      description: "Join us for our robotics workshop and learn about the latest projects and technologies!",
      image: robot
    },
    {
      id: 5,
      title: "Rasberry Pi Workshop",
      date: "10-08-2024",
      description: "Join us for our Rasberry Pi workshop and learn about the latest projects and technologies!",
      image: rasberry
    }
  ];
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
  
  .text-center {
    text-align: center;
  }
  
  .calendar {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .event-card {
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .event-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .card-overlay {
    background: rgba(0, 0, 0, 0.6);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .card-body {
    text-align: center;
  }
  
  .card-title {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }
  
  .card-subtitle {
    font-size: 1rem;
    margin-bottom: 15px;
    
  }
  
  .card-text {
    font-size: 0.875rem;
  }
  .date {
    color: #fdfcfc !important; /* Change this color code to your desired color */
  }
  </style>
  