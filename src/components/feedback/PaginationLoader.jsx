import React from "react";
import paginationLoader from "@/lotties/pagination-loader";
import Lottie from "lottie-react";
const PaginationLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Lottie animationData={paginationLoader} loop={true} />;
    </div>
  );
};

export default PaginationLoader;
