import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

import Survey from './Survey';

const base_url = "https://deepfake-backend.onrender.com";

const SurveyComponent = () => {
  const [videoList, setVideoList] = useState([]);
  const { currentUser } = useAuth();

  console.log(currentUser);

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
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SurveyComponent;
