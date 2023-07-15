import React, { useState } from "react";

const Pagination = () => {
  const pages = ["1", "2", "3", "4", "5"];
  const currentPage = pages[0];
  return (
    <div className="paginationWrap">
      <div className="pagination">
        <div className="arrow left"></div>
        {pages.map((page) => (
          <div
            key={page}
            className={`page${currentPage === page ? " current" : ""}`}
          >
            {page}
          </div>
        ))}
        <div className="arrow"></div>
      </div>
    </div>
  );
};

export default Pagination;
