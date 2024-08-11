import React, { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "./Firebaseconfig";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Text, Input, Button, Box, Container } from "@chakra-ui/react";

function Signup() {
  const [user, setUser] = useState(null);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const Joined = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    console.log(user);
    return () => Joined();
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("You are now in our Vip member");
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Container maxW="container.md" centerContent p={4}>
      <Box
        display="flex"
        flexDirection="column"
        width={{ base: "90%", sm: "80%", md: "60%", lg: "50%" }}
        mx="auto"
        mt={8}
        p={4}
      >
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color="#101928"
        >
          Sign Up
        </Text>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="medium"
          color="#1D2739"
        >
          Try for free Today !
        </Text>

        <form onSubmit={handleSignUp}>
          <Box mt={4}>
            <Input
              placeholder="Enter your Email"
              size="md"
              variant="filled"
              mb={4}
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <Input
              placeholder="Password"
              size="md"
              type="password"
              variant="filled"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Box>
          <Box mt={6}>
            <Button
              colorScheme="blue"
              size="md"
              width="full"
              border="2px"
              type="submit"
            >
              Sign In
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;
