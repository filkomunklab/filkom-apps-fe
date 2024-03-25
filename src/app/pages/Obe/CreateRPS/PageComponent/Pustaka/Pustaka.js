import React from "react";
import { useState, useEffect } from "react";
import PustakaUtama from "./component/PustakaUtama";
import PustakaPendukung from "./component/PustakaPendukung";

const Pustaka = () => {
  return (
    <div className="bg-white rounded-sm p-5">
      <h1 className="text-lg font-semibold mb-5">Pustaka</h1>

      <div>
        <PustakaUtama />
        <PustakaPendukung />
      </div>
    </div>
  );
};

export default Pustaka;
