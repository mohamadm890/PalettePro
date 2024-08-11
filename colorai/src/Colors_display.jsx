import React from "react";
import { Button, Text } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { DownloadIcon } from "@chakra-ui/icons";

function Colors_display({ color, colorindex }) {
  const toast = useToast();
  console.log(color);

  const exportAsImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = 100; // Width of each color block
    const height = 100; // Height of each color block
    const padding = 10; // Space between blocks

    canvas.width = (width + padding) * color.length - padding; // Total canvas width
    canvas.height = height; // Total canvas height

    color.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(index * (width + padding), 0, width, height);
    });

    // Convert canvas to image
    const img = canvas.toDataURL("image/png");

    // Create a link to download the image
    const link = document.createElement("a");
    link.href = img;
    link.download = "colors.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <div>
      <div
        className="colors_display"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {color.map((singleColor, index) => (
          <div style={{}}>
            <div style={{ display: "flex" }}>
              <div
                key={index}
                style={{
                  backgroundColor: singleColor,
                  width: 60,
                  height: 70,
                  margin: 0,
                  textAlign: "center",
                  borderTopLeftRadius: index === 0 ? "10px" : "0", // Border radius for the first item
                  borderBottomLeftRadius: index === 0 ? "10px" : "0", // Border radius for the first item
                  borderTopRightRadius:
                    index === color.length - 1 ? "10px" : "0", // Border radius for the last item
                  borderBottomRightRadius:
                    index === color.length - 1 ? "10px" : "0", // Border radius for the last item
                }}
              >
                {" "}
                <Tooltip label={singleColor} style={{ margin: 3 }}>
                  <div></div>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h4
        style={{
          fontWeight: "bold",
          color: "#98A2B3", // Text color
          marginTop: 12,
          float: "right",
          cursor: "pointer",
        }}
        onClick={handleCopy}
      >
        Copy me
      </h4>
      <button
        onClick={exportAsImage}
        style={{
          display: "flex",
          alignItems: "center", // Center icon and text vertically
          justifyContent: "center", // Center icon and text horizontally
          border: "none", // Remove the default border
          padding: "12px 4px", // Padding inside the button
          fontWeight: "bold", // Bold text
          color: "#98A2B3", // Text color
          cursor: "pointer", // Pointer cursor on hover
        }}
      >
        <DownloadIcon style={{ marginRight: "8px" }} />{" "}
        {/* Space between icon and text */}
        Save as Png
      </button>
    </div>
  );
}

export default Colors_display;
