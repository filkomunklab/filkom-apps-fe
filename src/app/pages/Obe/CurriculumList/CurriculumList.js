import React from "react";
import { useParams } from "react-router-dom";

const CurriculumList = () => {
  const { major } = useParams();
  console.log(major);
  return <div className="text-2xl">{`CurriculumList ${major}`}</div>;
};

export default CurriculumList;
