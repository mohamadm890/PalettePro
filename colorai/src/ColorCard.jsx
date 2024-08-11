import React from "react";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function ColorCard({ color, index }) {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      toast({
        title: "Copied!",
        status: "success",
        duration: 2000,
        position: "top",
        colorScheme: "blue",

        isClosable: true,
      });
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="Card_container">
      <div
        className="Card"
        index={index}
        onClick={handleCopy}
        style={{ backgroundColor: color, cursor: "pointer" }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          textAlign: "center",
          marginTop: 8,
          cursor: "pointer",
        }}
      >
        <Text
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#98A2B3",
            cursor: "pointer",
          }}
          onClick={handleCopy}
        >
          Copy me
        </Text>
        <Text
          style={{
            fontSize: "20px",
            fontWeight: 900,
            color: "#101928",
            cursor: "pointer",
          }}
          onClick={handleCopy}
        >
          {color}
        </Text>
      </div>
    </div>
  );
}

export default ColorCard;
