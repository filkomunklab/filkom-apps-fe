"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Home = () => {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return <div>Home</div>;
};

export default Home;
