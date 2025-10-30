import {
  TextField,
  Snackbar,
  Alert,
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useUser } from "./context/UserContext";
import useGeneratePrescription from "./hooks/useGeneratePrescription";
import useAudioFunctions from "./hooks/useAudioFunctions";
import Header from "./components/Header";
import { LatestPrescriptions } from "./components/Services";

const Home = () => {
  const { user } = useUser();
  const {
    symptoms,
    setSymptoms,
    notificationMsg,
    error,
    prescription,
    handleSubmit,
  } = useGeneratePrescription();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { startRecording, handlePlay, stopRecording, isRecording, audioUrl,transcribedText } =
    useAudioFunctions();

  return (
    <>
      <Header />

      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f6f6daff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 2, sm: 4 },
        }}
      >
        {/* Greeting Section */}
        <Typography
          variant={isMobile ? "h4" : "h2"}
          align="center"
          sx={{
            mt: { xs: 2, sm: 3 },
            mb: { xs: 1, sm: 2 },
            color: "#223322",
            fontWeight: 600,
            letterSpacing: 0.2,
          }}
        >
          Hi {user?.name || "User"}, how are you?
        </Typography>

        {/* Input Form */}
        <Paper
          elevation={3}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: { xs: "100%", sm: "80%", md: "60%", lg: "40%" },
            bgcolor: "#F5F8EF",
            borderRadius: 5,
            p: { xs: 1.5, sm: 3 },
            boxShadow: "0 2px 18px 0 rgba(60,70,50,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              gap: { xs: 2, sm: 1 },
              bgcolor: "#F0F2F5",
              borderRadius: 5,
              p: { xs: 2, sm: 2.5 },
              boxShadow: "inset 0 1px 2px rgba(40,40,40,0.04)",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Tell me how you are feeling today..."
              fullWidth
              multiline
              minRows={isMobile ? 3 : 2}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: "1rem",
                  color: "black",
                  opacity: 1,
                  paddingTop: "8px",
                },
              }}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              sx={{
                flexGrow: 1,
                ".MuiInputBase-input": { resize: "none" },
              }}
            />

            {/* Mic / Stop / Play Buttons */}
            <Stack
              direction="row"
              justifyContent="center"
              spacing={isMobile ? 3 : 2}
              sx={{
                alignSelf: isMobile ? "center" : "flex-end",
              }}
            >
              <MicIcon
                onClick={startRecording}
                sx={{
                  fontSize: isMobile ? 36 : 30,
                  cursor: "pointer",
                  color: isRecording ? "gray" : "inherit",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.3)",
                    color: "lightblue",
                  },
                }}
              />

              <StopIcon
                onClick={stopRecording}
                sx={{
                  fontSize: isMobile ? 36 : 30,
                  cursor: "pointer",
                  color: !isRecording ? "gray" : "inherit",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.3)",
                    color: "tomato",
                  },
                }}
              />

              <PlayArrowIcon
                onClick={handlePlay}
                sx={{
                  fontSize: isMobile ? 36 : 30,
                  cursor: !audioUrl ? "not-allowed" : "pointer",
                  color: !audioUrl || isRecording ? "gray" : "inherit",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: audioUrl ? "scale(1.3)" : "none",
                    color: audioUrl ? "green" : "gray",
                  },
                }}
              />
            </Stack>
            {audioUrl && (
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  fontStyle: "italic",
                  color: "#333",
                  bgcolor: "#f7f7f7",
                  p: 1.5,
                  borderRadius: 2,
                  width: "100%",
                }}
              >
                {transcribedText || "Processing transcription..."}
              </Typography>
            )}

          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </Paper>

        {/* Services Section */}
        <Box sx={{ width: "100%", mt: { xs: 4, sm: 6 } }}>
          <LatestPrescriptions isMobile={isMobile} />
        </Box>

      </Box>
    </>
  );
};

export default Home;
