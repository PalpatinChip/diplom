import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import Webcam from 'react-webcam';

const ObjectDetection = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [capturedTag, setCapturedTag] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        console.log('Модель загружена');
      } catch (error) {
        console.error('Ошибка загрузки модели:', error);
      }
    };
    loadModel();
  }, []);

  const detectFrame = useCallback(async () => {
    if (webcamRef.current && model) {
      const video = webcamRef.current.video;
      const predictions = await model.detect(video);

      drawRectangles(predictions, video);

      const bestPrediction = getBestPrediction(predictions);
      if (bestPrediction) {
        setCapturedTag(bestPrediction.class);
      }
    }
  }, [model]);

  const drawRectangles = (predictions, video) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = 'red';
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      );
    });
  };

  const getBestPrediction = (predictions) => {
    let bestPrediction = null;
    let maxArea = 0;

    predictions.forEach((prediction) => {
      const area = prediction.bbox[2] * prediction.bbox[3];
      if (area > maxArea) {
        bestPrediction = prediction;
        maxArea = area;
      }
    });

    return bestPrediction;
  };

  useEffect(() => {
    const interval = setInterval(detectFrame, 1000);
    return () => clearInterval(interval);
  }, [detectFrame]);

  const videoConstraints = {
    facingMode: "environment"
  };

  return (
    <div className="detection-container">
      <canvas className="detection-canvas" ref={canvasRef} />
      <Webcam
        audio={false}
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
          zIndex: 1
        }}
        ref={webcamRef}
      />
      <button className="capture-button" onClick={() => onCapture(capturedTag)}>Захват</button>
    </div>
  );
};

export default ObjectDetection;
