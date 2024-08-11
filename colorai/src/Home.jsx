import React from "react";
import logo from "./patternpro.svg";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/sign_up"); // Navigate to the home page
  };

  const handleClick = () => {
    navigate("/"); // Navigate to the home page
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} width={150} height={150} />

        <div
          onClick={handleSignUp}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            padding: 8,
            backgroundColor: "#F7F9FC",
            borderRadius: 40,
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;",
            width: "100px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Sign Up
        </div>
      </div>
      <Divider
        orientation="horizontal"
        style={{
          marginTop: "25px",
        }}
      />
      <div style={{ width: "80%", color: "#101928", marginTop: 50 }}>
        <h1 style={{ fontWeight: "bold" }} className="header_">
          Create Your Perfect Color Combination in No Time!
        </h1>
        <p
          style={{
            color: "#475367",
            fontWeight: "500",
            width: "60%",
            marginTop: 25,
          }}
          className="p_"
        >
          Create stunning color palettes quickly with our AI. Just enter your
          idea and get beautiful combinations in seconds!
        </p>
      </div>
      <button
        style={{
          marginTop: 40,
          backgroundColor: "#1671D9",
          color: "white",
          padding: 8,
          width: "20%",
        }}
        onClick={handleClick}
      >
        Generate Now
      </button>
    </div>
  );
}

export default Home;
