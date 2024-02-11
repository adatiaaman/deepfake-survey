const complete = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-4xl mx-auto px-8 py-16 text-white">

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
          Survey Completed
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 text-center">
          Thank you for participating in the survey.
          <br />
          Please email Zhixi Cai (<a href="mailto:zhixi.cai@monash.edu" className="underline">zhixi.cai@monash.edu</a>) to get the 10$ coupon. 
          <br />
          <br />
          You can now close the tab.
        </p>
        
      </div>
    </div>
    );
}

export default complete;