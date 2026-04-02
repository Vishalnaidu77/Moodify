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
        outputFaceBlendshapes: true, 
      });

    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      await videoRef.current.play();
    }
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

      return interpretExpression(blendshapes, setExpression);
    }

    return null;
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

    const sad =
      (getScore("mouthFrownLeft") + getScore("mouthFrownRight")) / 2

   let currentExpression = "neutral"


    if (blink > 0.6) {
      currentExpression = "blink";
    } else if (mouthOpen > 0.2) {
      currentExpression = "surprise";
    } else if (smile > 0.2) {
      currentExpression = "happy";
    } else if(sad > 0.2) {
      currentExpression = "sad"
    }

    setExpression(currentExpression)

    return currentExpression
};
