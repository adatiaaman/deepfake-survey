import React from 'react';

const Landing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-8 py-16 text-white">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
          Deepfake Survey
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 text-center">
          Please help us by filling out this survey, and <span className="text-red-500 font-bold">get 10$ coupon</span>! 
          <br></br>
          You will watch real and fake videos. The fake videos include manipulations at certain time locations. 
          If you think the video has been modified, please select the option deepfake. 
          In that case, please also specify the beginning and end time location of the fake content.
        </p>
        <div className="flex justify-center">
          {/* <a
            href="/login"
            className="inline-block bg-indigo-500 text-white rounded-lg px-8 py-4 text-lg font-medium transition duration-300 hover:bg-indigo-700 mr-4"
          >
            Login
          </a> */}
          <a
            href="/statement"
            className="inline-block bg-gray-700 text-white rounded-lg px-8 py-4 text-lg font-medium transition duration-300 hover:bg-gray-900"
          >
            Start Survey
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
