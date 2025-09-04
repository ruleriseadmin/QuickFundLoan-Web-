// Webcam.tsx
import ReactWebcam, { WebcamProps } from "react-webcam";


const aspectRatios = {
  landscape: {
    width: 1920,
    height: 1080,
  },
  portrait: {
    height: 1024,
    width: 768,
  },
};

const Webcam = ({ webcamRef, type = "portrait" }) => {
  return (
    <div className="webcam my-6">
      <ReactWebcam
        ref={webcamRef}
        mirrored
        screenshotFormat={"image/png"}
        screenshotQuality={1}
        videoConstraints={{
          facingMode: "user",
          ...aspectRatios[type],
        }}
      />
    </div>
  );
};

export default Webcam;
