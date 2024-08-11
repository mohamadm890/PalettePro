import React from "react";
import { Button, Center, Text } from "@chakra-ui/react";
import ColorCard from "./ColorCard";
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "./Firebaseconfig";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import Colors_display from "./Colors_display";
import Create from "./Create";
import { SmallAddIcon } from "@chakra-ui/icons";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

function Colors({ user, isLogging, setlogin }) {
  const [code, setCode] = useState([]);
  console.log(code);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [loveColor, setLoveColor] = useState([]);
  const chunk = loveColor.slice(0, 5);
  const [color, setColor] = useState("");

  console.log(color);
  const save = async () => {
    try {
      if (user && code.length > 0) {
        const colorstore = collection(db, "colors");
        console.log("Attempting to save data:", { code });
        setlogin(true);

        await addDoc(colorstore, {
          uid: user.uid,
          color: code,
          createdAt: new Date(),
        });

        toast({
          title: "Save!",
          status: "success",
          duration: 2000,
          position: "top",
          colorScheme: "green",

          isClosable: true,
        });
      } else {
        toast({
          title: "Attention!",
          description: "You are not logged in",
          status: "error",
          duration: 2000,
          position: "top",
          colorScheme: "red",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("we can not save your color code", error);
    }
  };
  const Generator = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://palettepro-1.onrender.com/generate-colors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ color: color }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("done!");
      const data = await response.json();
      console.log("Received from server:", data);
      const trimmedColors = data.colors.trim();

      // Step 2: Split by newline character
      const splitColors = trimmedColors.split("\n");
      setCode(splitColors); // Process the color string
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "colors"), where("uid", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const colors = [];
        querySnapshot.forEach((doc) => {
          colors.push(doc.data().color);
        });
        const chunk = chunkColors(colors, 5);
        setLoveColor(chunk);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const chunkColors = (colors, chunkSize) => {
    const result = [];
    for (let i = 0; i < colors.length; i += chunkSize) {
      result.push(colors.slice(i, i + chunkSize));
    }
    return result;
  };

  console.log(loveColor);
  return (
    <div
      style={{
        marginTop: 28,
      }}
    >
      <Create
        Generator={Generator}
        color={color}
        setColor={setColor}
        loading={loading}
      />
      <div
        onClick={save}
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          padding: 4,
          backgroundColor: "rgb(247, 249, 252)",
          width: "80px",
          borderRadius: "24px",
        }}
      >
        <SmallAddIcon />
        <p style={{ marginLeft: 8 }}>Save</p>
      </div>
      <div
        className="color_card"
        style={{
          display: "flex",
          gap: 32,
          marginTop: 24,
        }}
      >
        {code.map((color, index) => (
          <ColorCard key={index} color={color} index={index} />
        ))}
      </div>
      <div
        style={{
          padding: 32,
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
        }}
      ></div>
      <div style={{ marginTop: 50 }}>
        <Text as="b" style={{ color: "#475367", fontSize: "24px" }}>
          Recently Generated
        </Text>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 32,
          }}
        >
          {chunk.map((colors, index) =>
            colors.map((color, colorindex) => (
              <div style={{}}>
                <div
                  style={{
                    padding: 16,
                    display: "flex",
                    margin: "auto",
                    flexDirection: "row",
                  }}
                >
                  <Colors_display color={color} colorindex={colorindex} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Colors;
