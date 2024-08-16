import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import homepage from '../images/homepage.jpg';
import Footer from './Footer.js';
import { 
  School as SchoolIcon, 
  Group as GroupIcon, 
  LibraryBooks as LibraryBooksIcon, 
  SchoolTwoTone as SchoolTwoToneIcon, 
  People as PeopleIcon, 
  AccessTime as AccessTimeIcon, 
  AddBox as AddBoxIcon 
} from '@mui/icons-material';

const portalsData = {
  Admin: {
    description: 'Manage the entire school administration, monitor staff performance, and oversee the educational activities.',
    image: '/images/Admin.jpg',
  },
  Student: {
    description: 'Access course materials, submit assignments, and keep track of academic progress.',
    image: '/images/Student.jpg',
  },
  Faculty: {
    description: 'Manage class schedules, track student performance, and communicate with parents.',
    image: '/images/teacher.png',
  },
};

const HomePage = () => {
  const [selectedPortal, setSelectedPortal] = useState('Admin');

  return (
    <div className="homepage">
      <section className='herocontainer'>
        <h1 className="hero-title">
          Welcome to EduManage!
        </h1>
        <div className='hero-img'><img src={homepage} alt='School Management' /></div>
        <h2 className="hero-subtitle">
          Revolutionizing School and College Management
        </h2>
        <Button variant='contained' color='secondary' className='getstartbtn'>Get Started</Button>
      </section>

      <section className="sample-photos">
        <h2>Features</h2>
        <div className="featurescontainer">
          <div className="feature">
            <SchoolIcon className="feature-icon" />
            <h2>Admin Access</h2>
            <p>Full control over the platform, including class and department management, user roles, and system settings.</p>
          </div>
          <div className="feature">
            <LibraryBooksIcon className="feature-icon" />
            <h2>Teacher Tools</h2>
            <p>Create and manage classes, add and distribute notes, track and update attendance.</p>
          </div>
          <div className="feature">
            <GroupIcon className="feature-icon" />
            <h2>Student Profiles</h2>
            <p>Personalized profiles featuring basic details, attendance percentage, recent activity, grades, and more.</p>
          </div>
          <div className="feature">
            <AccessTimeIcon className="feature-icon" />
            <h2>Class Management</h2>
            <p>Admins and teachers can oversee and manage their respective classes.</p>
          </div>
          <div className="feature">
            <AddBoxIcon className="feature-icon" />
            <h2>Notes and Materials</h2>
            <p>Students can easily access notes and materials provided by their teachers.</p>
          </div>
          <div className="feature">
            <PeopleIcon className="feature-icon" />
            <h2>Future Parent Access</h2>
            <p>In future updates, parents will be able to monitor their children's activities, attendance, and performance.</p>
          </div>
        </div>
      </section>

      <section className="carousel-section">
        <h2>Educational Quotes</h2>
        <Carousel autoPlay interval={5000} transitionTime={1000} infiniteLoop showThumbs={false} showStatus={false}>
          <div>
            <img src="./images/edu1.jpg" alt="Quote 1" className="quote-image" />
            <p className="legend">"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela</p>
          </div>
          <div>
            <img src="./images/edu2.jpg" alt="Quote 2" className="quote-image" />
            <p className="legend">"The beautiful thing about learning is that no one can take it away from you." - B.B. King</p>
          </div>
          <div>
            <img src="./images/edu3.jpg" alt="Quote 3" className="quote-image" />
            <p className="legend">"Education is not preparation for life; education is life itself." - John Dewey</p>
          </div>
        </Carousel>
      </section>

      {/* Portals Section */}
      <section className='portalsection'>
        <h1>Portal For Every User Personal</h1>
        <section className="portals-section">
          <div className="portals-menu">
            {Object.keys(portalsData).map((portal) => (
              <div
                key={portal}
                className={`portal-item ${selectedPortal === portal ? 'active' : ''}`}
                onClick={() => setSelectedPortal(portal)}
              >
                {portal} portal
                {selectedPortal === portal && <p className="portal-description">{portalsData[portal].description}</p>}
              </div>
            ))}
          </div>
          <div className="portal-details">
            <img src={portalsData[selectedPortal].image} alt={`${selectedPortal} portal`} />
          </div>
        </section>
      </section>

      <Box className="app-container">
        <Box className="header" textAlign="center">
          <h1>Why EduManage?</h1>
          <p>EduManage low-code-based education ERP is tailored to fit your institute's unique requirements. Build apps that reflect your processes with minimal coding, or choose from our selection of prebuilt applications and customize as you scale.</p>
        </Box>
        <Grid container spacing={2} className="features-container">
          <Grid item xs={12} md={6} container alignItems="center">
            <Grid item xs={4}>
              <img src="https://cdn-icons-png.flaticon.com/256/1283/1283187.png" alt="Customizable Icon" className="feature-icon" />
            </Grid>
            <Grid item xs={8}>
              <h2>Customizable</h2>
              <p>Edumanage education ERP adapts to your unique requirements. It works the way you do, ensuring a seamless fit for your institution.</p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container alignItems="center">
            <Grid item xs={8}>
              <h2>All-in-one solution</h2>
              <p>Run your educational institution from a single app. Manage admissions, track attendance, handle event management, streamline communications, plan courses, and more—all in one place.</p>
            </Grid>
            <Grid item xs={4}>
              <img src="https://cdn-icons-png.flaticon.com/256/9792/9792951.png" alt="All-in-one Icon" className="feature-icon" />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container alignItems="center">
            <Grid item xs={4}>
              <img src="https://cdn-icons-png.flaticon.com/256/9104/9104585.png" alt="Highly Integrable Icon" className="feature-icon" />
            </Grid>
            <Grid item xs={8}>
              <h2>Highly integrable</h2>
              <p>Easily integrate over 650+ applications on a visual drag-and-drop interface and automate tasks effortlessly.</p>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container alignItems="center">
            <Grid item xs={8}>
              <h2>Education Management</h2>
              <p>Easily collaborate with parents with visual reports, a chatbot that helps students to come up with new ideas, etc.</p>
            </Grid>
            <Grid item xs={4}>
              <img src="https://cdn-icons-png.flaticon.com/256/3884/3884999.png" alt="Education Management Icon" className="feature-icon" />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonial">
          <p>"ClassroomApp has revolutionized the way I manage my classes. Highly recommend!"</p>
          <span>- Jane Doe, Teacher</span>
        </div>
        <div className="testimonial">
          <p>"As a student, ClassroomApp helps me keep track of all my assignments and deadlines."</p>
          <span>- John Smith, Student</span>
        </div>
        <div className="testimonial">
          <p>"The best tool for administrators to oversee classroom activities efficiently."</p>
          <span>- Sarah Johnson, Admin</span>
        </div>
      </section>

      <section className="aboutus">
        <h2>About Us</h2>
        <p>At ClassroomApp, our mission is to simplify and enhance the educational experience for students, teachers, and administrators alike. Our platform provides a user-friendly interface and powerful tools to manage all aspects of classroom activities.</p>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
