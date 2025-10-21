import { useRef, useState } from "react";

 const useAudioFunctions=()=>{
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [prescription,setPrescription]=useState();
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
    
      const startRecording = async () => {
        setPrescription("");
        setAudioBlob(null);
        setAudioUrl(null);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaRecorderRef.current = new MediaRecorder(stream);
          audioChunksRef.current = [];
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };
          mediaRecorderRef.current.onstop = () => {
            const audioBlobResult = new Blob(audioChunksRef.current, {
              type: "audio/webm",
            });
            setAudioBlob(audioBlobResult);
            setAudioUrl(URL.createObjectURL(audioBlobResult));
            stream.getTracks().forEach((track) => track.stop());
          };
          mediaRecorderRef.current.start();
          setIsRecording(true);
        } catch {
          alert("Could not access microphone. Please check permissions.");
        }
      };
    
      const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      };
    
      const handlePlay = () => {
        if (audioUrl) new Audio(audioUrl).play();
      };
      return {startRecording,handlePlay,stopRecording,isRecording,setIsRecording,setAudioBlob,audioUrl,setAudioUrl}
 }
 export default useAudioFunctions;