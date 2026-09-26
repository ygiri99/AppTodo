import React, { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PageElement = ({
  currentPage,
  totalTodos,
  itemsPerPage,
  setCurrentPage,
}) => {
  //Total pages
  const totalPages = Math.ceil(totalTodos / itemsPerPage);

  //Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Render page numbers
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <PaginationItem
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        <PaginationLink>{number}</PaginationLink>
      </PaginationItem>,
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </PaginationLink>
        <PaginationLink
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </PaginationLink>
        {paginationItems}
        <PaginationLink
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </PaginationLink>
        <PaginationLink
          onClick={() => {
            handlePageChange(totalPages);
          }}
          disabled={currentPage === totalPages}
        >
          Last
        </PaginationLink>
      </Pagination>
    </div>
  );
};

export default PageElement;
