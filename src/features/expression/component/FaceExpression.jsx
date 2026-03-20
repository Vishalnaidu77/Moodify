import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver
} from "@mediapipe/tasks-vision";

function FaceExpression() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");
  const faceLandmarkerRef = useRef(null);
  const animationRef = useRef(null);
  let stream;

  const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );

      faceLandmarkerRef.current =
        await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },
          runningMode: "VIDEO",
          numFaces: 1,
          outputFaceBlendshapes: true, // 🔥 important
        });

      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      detectLoop();
    };

    const detectLoop = () => {
      const video = videoRef.current;
      const faceLandmarker = faceLandmarkerRef.current;

      if (!video || !faceLandmarker) return;

      const results = faceLandmarker.detectForVideo(
        video,
        performance.now()
      );

      if (
        results.faceBlendshapes &&
        results.faceBlendshapes.length > 0
      ) {
        const blendshapes =
          results.faceBlendshapes[0].categories;

        interpretExpression(blendshapes);
      }
    };

    const interpretExpression = (blendshapes) => {
      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)
          ?.score || 0;

      const smile =
        (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;

      const blink =
        (getScore("eyeBlinkLeft") +
          getScore("eyeBlinkRight")) /
        2;

      const mouthOpen = getScore("jawOpen");

      const sad = (getScore("frownLeft" > 0.5) + getScore("frownRight" > 0.5)) / 2

        console.log(smile, mouthOpen);


      if (blink > 0.6) {
        setExpression("😉 Blink");
      } else if (mouthOpen > 0.2) {
        setExpression("😮 Surprise");
      } else if (smile > 0.2) {
        setExpression("😄 Happy");
      } else if(sad > 0.2) {
        setExpression("☹️ Sad")
      } 
      else {
        setExpression("😐 Neutral");
      }
    };

  useEffect(() => {
    init();

    // cleanup
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Face Expression Detection</h2>

      <video
        ref={videoRef}
        width="640"
        height="480"
        style={{ borderRadius: "10px" }}
        autoPlay
        muted
      />

      <h3 style={{ marginTop: "10px" }}>
        Expression: {expression}
      </h3>
      <button onClick={detectLoop}>Detect Expression</button>
    </div>
  );
}

export default FaceExpression