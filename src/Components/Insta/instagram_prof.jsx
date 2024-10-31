import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const InstagramProfileHeader = ({
  profileImage,
  name,
  bio,
  posts,
  followers,
  following,
  darkMode
}) => {

  return (
    <MDBContainer
      style={{
        backgroundColor: darkMode ? "#000" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <MDBRow className="align-items-center">
        <MDBCol size="4">
          <img
            src={profileImage}
            alt="Profile Image"
            className="w-100 rounded-circle"
          />
        </MDBCol>
        <MDBCol size="8">
          <h2>{name}</h2>
          <div className="d-flex">
            <div className="mr-5">
              <strong>{posts}</strong> posts
            </div>
            <div className="mr-5">
              <strong>{followers}</strong> followers
            </div>
            <div className="mr-5">
              <strong>{following}</strong> following
            </div>
          </div>
          <p>{bio}</p>
        </MDBCol>
      </MDBRow>
     
    </MDBContainer>
  );
};

export default InstagramProfileHeader;
