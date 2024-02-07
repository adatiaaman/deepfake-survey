import React, { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Slider from 'react-slider';
import { Video } from 'video-metadata-thumbnails';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const base_url = "https://deepfake-backend.onrender.com";

const Survey = ({ videoList }) => {

  const [currentVideoIndex, setCurrentVideoIndex] = useState(() => {
    const savedIndex = parseInt(localStorage.getItem('currentVideoIndex'));
    return isNaN(savedIndex) ? 0 : savedIndex;
  });
  const [sliderValues, setSliderValues] = useState([0, 100]); // Initialize with default values (0% to 100%)
  const [videoType, setvideoType] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [viewCount, setViewCount] = useState(0);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {

    const start_ts = (sliderValues[0] / 100) * videoDuration;
    const end_ts = (sliderValues[1] / 100) * videoDuration; 
    const clientId = currentUser.uid;
    const match = videoList[currentVideoIndex].match(/%2F([^%]+)\.mp4\?alt/)[1]
    const video_id = match
    
    const video_details_fake = {
      "start_ts" : start_ts,
      "end_ts" : end_ts,
      "video_type" : videoType,
      "view_count" : viewCount
    }

    const video_details_real = {
      "video_type" : "real",
      "view_count" : viewCount
    }

    const video_details = videoType === 'fake' ? video_details_fake : video_details_real;

    const data = {
      "clientId" : clientId,
      "resp" : {
        "details"  : {
          "current_video_index": currentVideoIndex,
          [video_id] : video_details
        }
      }
    }

    try {
      const response = await fetch(`${base_url}/response/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }

    resetValues();
  }

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      handleSubmit();
      setCurrentVideoIndex(currentVideoIndex - 1);
      setVideoWatched(false);
    }
  };

  const handleNext = () => {
    if (currentVideoIndex + 1 < videoList.length) {
      handleSubmit();
      setCurrentVideoIndex(currentVideoIndex + 1);
      setVideoWatched(false);
    }
    else{
      handleSubmit();
      alert("Survey Completed");
      logout();
      navigate('/');
    }
  };

  const handleSliderChange = (values) => {
    setSliderValues(values);
  };

  const resetValues = () => {
    setvideoType(null);
    setSliderValues([0, 100]);
    setVideoDuration(null);
    setViewCount(0);
    setIsVideoPlaying(true);
  };

  const start_ts = (sliderValues[0] / 100) * videoDuration;
  const end_ts = (sliderValues[1] / 100) * videoDuration;


  useEffect(() => {
    localStorage.setItem('currentVideoIndex', currentVideoIndex.toString());

    if (videoList[currentVideoIndex]) {
      const videoUrl = videoList[currentVideoIndex];
      const video = new Video(videoUrl);
      video.getMetadata().then((metadata) => {
        setVideoDuration(metadata.duration);
        setVideoWatched(false); 
      });
    }
  }, [currentVideoIndex, videoList]);

  const handleVideoEnd = () => {
    setVideoWatched(true); 
    setIsVideoPlaying(false);
  }

  const onSeeked = () => {
    setIsVideoPlaying(false);
  }
  const onPlayerStart = () => {
    if(isVideoPlaying == false) {
      setIsVideoPlaying(true);
      setViewCount(viewCount + 1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-lavender">
      <div className="text-center mb-2 text-xl">
        Video {currentVideoIndex + 1} / {videoList.length}
      </div>
      <div className="max-w-screen-md mb-8">
        <VideoPlayer key={videoList[currentVideoIndex]} 
          videoUrl={videoList[currentVideoIndex]} 
          onEnded={handleVideoEnd}
          onSeeked={onSeeked}
          onPlayerStart={onPlayerStart}
        />
      </div>

      {!videoWatched && (
        <div className="mb-4 flex flex-col items-center justify-center">
        <label className="block mb-2 text-center">
        Please wait until the video is finished then the questions will appear.
        </label>
        
      </div>
      )}

      {videoWatched && (
      <div className="mb-4 flex flex-col items-center justify-center">
        <label className="block mb-2 text-center">
        Please indicate whether the provided video is real or fake. <br></br>
        If you think it is fake, kindly specify the exact timestamps between which the deepfake content appears.
        </label>
        <div className="flex mb-2">
          <label className="mr-4">
            <input
              type="radio"
              value="real"
              checked={videoType === 'real'}
              onChange={(e) => setvideoType(e.target.value)}
              className="mr-2"
            />
            Real
          </label>
          <label>
            <input
              type="radio"
              value="fake"
              checked={videoType === 'fake'}
              onChange={(e) => setvideoType(e.target.value)}
              className="mr-2"
            />
            Fake
          </label>
        </div>
      </div>
      )}


      {videoType === 'fake' && (
        <div className="mb-4" style={{ width: '400px' }}>
          <Slider
            min={0}
            max={100}
            step={1}
            value={sliderValues}
            onChange={handleSliderChange}
            renderTrack={(props, state) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '4px',
                  borderRadius: '3px',
                  background: 'hsl(348, 100%, 61%)',
                }}
              />
            )}
            renderThumb={(props, state) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '12px',
                  width: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  // boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                }}
              />
            )}
          />

          <div className="flex justify-between mt-4 text-black">
            <span>{start_ts.toFixed(2)}s</span>
            <span>{end_ts.toFixed(2)}s</span>
          </div>
        </div>
      )}

      { (videoType === 'real' || videoType === 'fake')  &&
         (<div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
        >
          {currentVideoIndex === 19 ? 'Submit' : 'Next'}
        </button>
      </div>)}
      
    </div>
  );
};

export default Survey;

