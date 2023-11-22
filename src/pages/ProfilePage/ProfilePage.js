// Import the necessary modules
import React from 'react';
import './ProfilePage.css';
import profileImage from './profile.png'; 

const ProfilePage = () => {
  // Function to handle the image click
  const handleImageClick = () => {
    // Redirect to the specified link when the image is clicked
    window.location.href = 'https://linktr.ee/fhazzami';
  };

  return (
    <div className="profile-container">
      <h1>Hello!</h1>
      <div className="profile-info">
        {/* Add the onClick event to handle the image click */}
        <img
          src={profileImage}
          alt="Profile"
          className="profile-image"
          onClick={handleImageClick}
        />
        <p>Nama: Fadhil Hadrian Azzami</p>
        <p>NIM: 21120121130120</p>
      </div>
    </div>
  );
};

export default ProfilePage;
