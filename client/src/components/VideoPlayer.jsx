import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  console.log("Video Url" , videoUrl);
  return (
    <video width="500" height="500" controls>
      <source src={videoUrl} />
    </video>
  )
};

export default VideoPlayer;
