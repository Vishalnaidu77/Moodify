import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ faceLandmarkerRef, videoRef, streamRef}) => {
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

    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      await videoRef.current.play();
    }

    detectLoop();
};

export const detectLoop = ({ faceLandmarkerRef, videoRef, setExpression }) => {
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

      interpretExpression(blendshapes, setExpression);
    }
};

const interpretExpression = (blendshapes, setExpression) => {
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