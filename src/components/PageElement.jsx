import { Pagination } from "react-bootstrap";

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
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        <Pagination.Item
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </Pagination.Item>
        <Pagination.Item
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Pagination.Item>
        {paginationItems}
        <Pagination.Item
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Pagination.Item>
        <Pagination.Item
          onClick={() => {
            handlePageChange(totalPages);
          }}
          disabled={currentPage === totalPages}
        >
          Last
        </Pagination.Item>
      </Pagination>
    </div>
  );
};

export default PageElement;
