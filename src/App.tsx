import React, { useState } from "react";

import "./App.css";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPage = 20;

  return (
    <div className="container">
      <h1>React TypeScript Pagination</h1>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
