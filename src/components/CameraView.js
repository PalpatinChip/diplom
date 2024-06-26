import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import ObjectDetection from './ObjectDetection';

const CameraView = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const videoConstraints = {
    facingMode: "environment"
  };

  return (
    <div className="camera-view">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <ObjectDetection webcamRef={webcamRef} onCapture={onCapture} />
      <div className="camera-overlay"></div>
    </div>
  );
};

export default CameraView;
