import React from "react";

const ResultPageExplorer = ({ changePageHandler, page, dogData }) => {
  const pages = (function () {
    const allPages = [...Array(Math.ceil(dogData.length / 9)).keys()];
    let pageIndex = page - 1;
    let start = pageIndex > 5 ? pageIndex - 5 : 0;
    let end = start + 10;
    return allPages.slice(start, end);
  })();

  console.log(pages);

  return (
    <div className="ResultPageExplorerContainer">
      <button
        onClick={() => changePageHandler(-1)}
        disabled={page === 1 ? "disabled" : null}
      >
        Previous
      </button>
      <div className="pageNumWrapper">
        {pages.map((pagesIndex) => {
          const goToPageNo = pagesIndex + 1;
          return goToPageNo !== page ? (
            <span
              className="pageExplorerNumsDefault"
              key={`page${goToPageNo}`}
              onClick={() => changePageHandler(goToPageNo - page)}
            >
              {goToPageNo}
            </span>
          ) : (
            <span className="pageExplorerNumsActive" key={`page${goToPageNo}`}>
              {goToPageNo}
            </span>
          );
        })}
      </div>
      <button
        onClick={() => changePageHandler(1)}
        disabled={Math.ceil(dogData.length / 9) === page ? "disabled" : null}
      >
        Next
      </button>
    </div>
  );
};

export default ResultPageExplorer;
