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
  const { startRecording, handlePlay, stopRecording, isRecording, audioUrl } = useAudioFunctions();

  return (
    <>

      <Header />
      <Box
        sx={{
          minHeight:" 100vh",
          bgcolor: "#f6f6daff",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "flex-start",
          px: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h3" : "h2"}
          align="center"
          sx={{ mt: 2, color: "#223322", fontWeight: 600, letterSpacing: 0.2, mt: 2 }}
        >
          Hi {user?.name || "User"}, how are you?
        </Typography>
        <Paper
          elevation={3}
          onSubmit={handleSubmit}
          component="form"
          sx={{
            p: isMobile ? 0.5 : 2,
            width: isMobile ? "100%" : "40vw",
            bgcolor: "#F5F8EF",
            borderRadius: 5,
            boxShadow: "0 2px 18px 0 rgba(60,70,50,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#F0F2F5",
              borderRadius: 5,
              p: 2,
              boxShadow: "inset 0 1px 2px rgba(40,40,40,0.04)",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Tell me how you are feeling today..."
              fullWidth
              multiline
              minRows={2}
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
                mr: 1,
                ".MuiInputBase-input": { resize: "none" },
              }}
            />
            <Stack direction="row" justifyContent="center" spacing={2}>
              <MicIcon
                variant="contained"
                disabled={isRecording}
                onClick={startRecording}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  border: "2px solid transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderRadius: '50%',
                    transform: "scale(1.4)",
                    color: 'lightblue',
                  },
                }}
              />


              <StopIcon
                variant="contained"
                disabled={!isRecording}
                onClick={stopRecording}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  border: "2px solid transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderRadius: '50%',
                    transform: "scale(1.4)",
                    color: 'tomato',
                  },
                }}
              />


              <PlayArrowIcon
                variant="contained"
                disabled={!audioUrl || isRecording}
                onClick={handlePlay}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  border: "2px solid transparent",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderRadius: '50%',
                    transform: "scale(1.4)",
                    color: "green",
                  },
                }}
              />

            </Stack>

          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </Paper>
        <Snackbar
          open={notificationMsg}
          autoHideDuration={10000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            You will be notified when the prescription is ready
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!prescription}
          autoHideDuration={8000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {typeof prescription === "string"
              ? prescription
              : "Prescription generated successfully!"}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Home;
