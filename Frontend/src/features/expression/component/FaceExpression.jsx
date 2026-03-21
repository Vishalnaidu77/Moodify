import { useEffect, useRef, useState } from "react";
import { detectLoop, init } from "../utils/utils";

function FaceExpression() {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");
  const streamRef = useRef(null);
  const faceLandmarkerRef = useRef(null)

  useEffect(() => {
    init({ faceLandmarkerRef, videoRef, streamRef});

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
      <button onClick={() => (detectLoop({ faceLandmarkerRef, videoRef, setExpression}))}>Detect Expression</button>
    </div>
  );
}

export default FaceExpression