import React from "react";
import PaginationStyle from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  pokemonsPerPage: number;
  totalPokemons: number;
  handlePagination: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pokemonsPerPage,
  totalPokemons,
  handlePagination,
}) => {
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  const getPaginationButtons = () => {
    let buttons = [];

    if (currentPage > 1) {
      buttons.push(
        <button
          className={PaginationStyle.Button}
          key="prev"
          onClick={() => handlePagination(currentPage - 1)}
        >
          Prev
        </button>
      );
    }

    if (currentPage > 2) {
      buttons.push(
        <button
          className={PaginationStyle.Button}
          key={1}
          onClick={() => handlePagination(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        buttons.push(<span key="ellipsis1">...</span>);
      }
    }

    if (currentPage > 1) {
      buttons.push(
        <button
          className={PaginationStyle.Button}
          key={currentPage - 1}
          onClick={() => handlePagination(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      );
    }

    buttons.push(
      <button className={PaginationStyle.Button} key={currentPage} disabled>
        {currentPage}
      </button>
    );

    if (currentPage < totalPages) {
      buttons.push(
        <button
          className={PaginationStyle.Button}
          key={currentPage + 1}
          onClick={() => handlePagination(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        buttons.push(<span key="ellipsis2">...</span>);
      }

      buttons.push(
        <button
          className={PaginationStyle.Button}
          key={totalPages}
          onClick={() => handlePagination(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          className={PaginationStyle.Button}
          key="next"
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={PaginationStyle.Container}>{getPaginationButtons()}</div>
  );
};

export default Pagination;
