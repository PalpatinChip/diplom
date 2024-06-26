import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import yaml from 'js-yaml';

const ObjectDetection = ({ onCapture, webcamRef }) => {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const loadModelAndMetadata = async () => {
      try {
        const model = await tf.loadGraphModel('/model/model.json');
        modelRef.current = model;
        console.log('TensorFlow.js model loaded');

        // Загрузка метаданных
        const metadataResponse = await fetch('/model/metadata.yaml');
        const metadataText = await metadataResponse.text();
        const metadata = yaml.load(metadataText);
        setLabels(metadata.labels);
        console.log('Metadata loaded', metadata);
      } catch (error) {
        console.error('Error loading model or metadata:', error);
      }
    };

    loadModelAndMetadata();
  }, []);

  useEffect(() => {
    let interval;
    if (modelRef.current) {
      interval = setInterval(() => {
        detectObjects();
      }, 1000);

      // Останавливаем распознавание через 5 секунд
      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [modelRef.current]);

  const detectObjects = async () => {
    if (modelRef.current && webcamRef.current) {
      const video = webcamRef.current.video;

      if (video.readyState !== 4) {
        // Видео еще не готово к обработке
        return;
      }

      const videoTensor = tf.browser.fromPixels(video);
      const resizedVideoTensor = tf.image.resizeBilinear(videoTensor, [640, 640]);
      const expandedVideoTensor = resizedVideoTensor.expandDims(0).div(255.0);

      const predictions = modelRef.current.execute(expandedVideoTensor);
      console.log(predictions);

      tf.dispose(videoTensor);
      tf.dispose(resizedVideoTensor);
      tf.dispose(expandedVideoTensor);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <button id="capture-button" onClick={onCapture}>Capture</button>
    </div>
  );
};

export default ObjectDetection;
