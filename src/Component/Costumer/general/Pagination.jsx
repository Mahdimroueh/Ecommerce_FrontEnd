import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = ({ pageCount, page }) => {
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index;
  });
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-x5 sm:btn-md join-item "
          onClick={() => {
            const prevPage = page === 0 ? pageCount - 1 : page - 1;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-x5 sm:btn-md join-item ${
              pageNumber === page ? "bg-base-300 border-base-300" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          className="btn btn-x5 sm:btn-md join-item"
          onClick={() => {
            const nextPage = page === pageCount - 1 ? 0 : page + 1;
            handlePageChange(nextPage);
          }}
        >
          next
        </button>
      </div>
    </div>

  );
};

export default PaginationContainer;
