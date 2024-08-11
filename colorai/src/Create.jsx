import React, { useState } from "react";
import {
  Center,
  Heading,
  Button,
  Text,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Select, Stack } from "@chakra-ui/react";

function Create({ Generator, color, setColor, loading }) {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = () => {
    if (code) {
      // Handle submission logic
      toast({
        title: "Submitted!",
        description: `Color inspiration "${code}" has been submitted.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // Navigate or perform other actions
    } else {
      toast({
        title: "Error",
        description: "Please enter a mood or base color.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Center flexDirection="column" p={8} textAlign="center">
      <Heading size="xl" mb={4}>
        Create Your Perfect Color
      </Heading>
      <Text fontSize="lg" color="#424242" mb={6}>
        Enter color name or theme
      </Text>
      <Box
        p={4}
        borderRadius="40"
        boxShadow="md"
        bg="#F9FAFB"
        width="80%"
        maxW="600px" // Restrict the maximum width for better responsiveness
        display="flex"
        alignItems="center"
        gap={4}
      >
        <Input
          placeholder="e.g., sunset, calm, energetic"
          borderRadius="24"
          border="none"
          bg="transparent"
          size="md"
          flex="1" // Allow input to take available space
          onChange={(e) => setColor(e.target.value)} // Correct
          focusBorderColor="transparent" // Removes border on hover/focus
          _focus={{ boxShadow: "none" }}
        />

        <Button
          colorScheme="blue"
          onClick={Generator}
          borderRadius="24"
          size="md" // Set button size for consistency
          flexShrink={0} // Prevent the button from shrinking
          minW="120px" // Ensure the button has a minimum width
        >
          {loading ? <Spinner /> : <p>Generate</p>}
        </Button>
      </Box>
    </Center>
  );
}

export default Create;
