import React from "react";
import { useParams } from "react-router-dom";

const CurriculumList = () => {
  const { major } = useParams();
  console.log(major);
  return <div>{`CurriculumList ${major}`}</div>;
};

export default CurriculumList;
