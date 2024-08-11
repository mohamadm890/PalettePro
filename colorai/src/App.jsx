import { useState, useEffect } from "react";

import { Button, ButtonGroup } from "@chakra-ui/react";
import "./App.css";
import logo from "./patternpro.svg";
import { Text } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Flex, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Colors from "./Colors";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useToast } from "@chakra-ui/react";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "./Firebaseconfig";

function App() {
  const [user, setUser] = useState(null);
  const [isLogging, setlogin] = useState(true);
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const Joined = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => Joined();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");

        toast({
          title: "You are log out!",
          status: "success",
          duration: 2000,
          position: "top",
          colorScheme: "orange",

          isClosable: true,
        });
        navigate("/Home");
      })

      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  return (
    <>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <img src={logo} width={150} height={150} />

          <div
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
            }}
          >
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/sign_in" style={{ textDecoration: "none" }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#475367",
                    marginLeft: "54",
                    padding: "12",
                  }}
                >
                  Login{" "}
                </Text>
              </Link>
            )}
          </div>
        </div>
        <Divider
          orientation="horizontal"
          style={{
            marginTop: "25px",
          }}
        />
        <Colors user={user} isLogging={isLogging} setlogin={setlogin} />
      </div>
    </>
  );
}

export default App;
