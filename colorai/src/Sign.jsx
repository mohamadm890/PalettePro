import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db, auth } from "./Firebaseconfig";
import { useNavigate } from "react-router-dom";
import { Text, Input, Button, Box, Container } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function Sign() {
  const [user, setUser] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "You are login successfully!",
        status: "success",
        duration: 2000,
        position: "top",
        colorScheme: "green",

        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
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
          Login
        </Text>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="medium"
          color="#1D2739"
        >
          to start generating
        </Text>

        <form onSubmit={handleSignIn}>
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
              variant="filled"
              type="password"
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

export default Sign;
