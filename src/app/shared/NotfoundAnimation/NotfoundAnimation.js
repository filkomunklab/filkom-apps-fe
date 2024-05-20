import Lottie from "lottie-react";
import React from "react";
import NofoundLottie from "../../lotties/not-found.json";

const NotfoundAnimation = ({ message }) => {
  return (
    <div className="flex flex-col items-center">
      <Lottie
        animationData={NofoundLottie}
        loop={true}
        style={{ height: 200 }}
      />
      <h1 className="text-lg">
        I’m sorry, but the data you’re looking for is not available
      </h1>
      {message && <h3 className="text-md">{message}</h3>}
    </div>
  );
};

export default NotfoundAnimation;
