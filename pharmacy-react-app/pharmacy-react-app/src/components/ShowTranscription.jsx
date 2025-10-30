import { Fade, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const ShowTranscription = ({ audioUrl, transcribedText }) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (audioUrl) {
      setShowText(true); // show when audio starts
    }

    if (transcribedText) {
      const timer = setTimeout(() => {
        setShowText(false); // hide after 5 sec
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [audioUrl, transcribedText]);

  if (!showText) return null;

  return (
    <Fade in={showText} timeout={500}>
      <Box
        sx={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2000,
          bgcolor: "#f7f7f7",
          borderRadius: 2,
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
          p: 2,
          maxWidth: "80%",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            color: "#333",
            textAlign: "center",
          }}
        >
          {transcribedText?'Completed' : "Processing audio transcription..."}
        </Typography>
      </Box>
    </Fade>
  );
};

export default ShowTranscription;
