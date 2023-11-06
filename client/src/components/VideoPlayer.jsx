import React from 'react';

const VideoPlayer = ({ videoUrl, onEnded, onSeeked, onPlayerStart }) => {
  // console.log("Video Url" , videoUrl);
  return (
    <video width="400" height="400" controls 
      onEnded={onEnded}
      onSeeked={onSeeked}
      onPlay={onPlayerStart}
    >
      <source src={videoUrl} />
    </video>
  )
};

export default VideoPlayer;
