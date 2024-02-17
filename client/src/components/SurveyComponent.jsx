import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Circles } from 'react-loading-icons'

import Survey from './Survey';

const base_url = "https://deepfake-backend.onrender.com";

const SurveyComponent = () => {
  const [videoList, setVideoList] = useState([]);
  const { currentUser } = useAuth();

  // console.log(currentUser);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/videos/getVideos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientId: currentUser.uid,
          }),
        });
        const data = await response.json();
        console.log(data['urls']);
        setVideoList(data['urls']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentUser.uid]);

  return (
    <div>
      {videoList.length > 0 ? (
        <Survey videoList={videoList} />
      ) : (
        <div className="flex flex-col container h-screen justify-center items-center bg-lavender">
          <div className="text-center mb-2 text-xl">
            <center>
            <Circles />
            </center>
            <br />
            Loading... <br /><br />
            Fetching all the videos, it might take around a minute. <br />
            Survey will start soon
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyComponent;
