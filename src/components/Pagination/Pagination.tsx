import React from "react";

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
        <button key="prev" onClick={() => handlePagination(currentPage - 1)}>
          Prev
        </button>
      );
    }

    if (currentPage > 2) {
      buttons.push(
        <button key={1} onClick={() => handlePagination(1)}>
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
          key={currentPage - 1}
          onClick={() => handlePagination(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      );
    }

    buttons.push(
      <button key={currentPage} disabled>
        {currentPage}
      </button>
    );

    if (currentPage < totalPages) {
      buttons.push(
        <button
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
        <button key={totalPages} onClick={() => handlePagination(totalPages)}>
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button key="next" onClick={() => handlePagination(currentPage + 1)}>
          Next
        </button>
      );
    }

    return buttons;
  };

  return <div>{getPaginationButtons()}</div>;
};

export default Pagination;

// import React from "react";

// interface PaginationProps {
//   currentPage: number;
//   pokemonsPerPage: number;
//   totalPokemons: number;
//   handlePagination: (pageNumber: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   pokemonsPerPage,
//   totalPokemons,
//   handlePagination,
// }) => {
//   const paginationNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
//     paginationNumbers.push(i);
//   }

//   return (
//     <div>
//       {paginationNumbers.map((pageNumber) => (
//         <button
//           key={pageNumber}
//           onClick={() => handlePagination(pageNumber)}
//           disabled={currentPage === pageNumber}
//         >
//           {pageNumber}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;

// import React from "react";
// import { useState } from "react";
// import PokeCardClient from "../Cards/PokeCardClient";

// const Pagination = ({
//   currentPage,
//   filteredPokemons,
//   handlePagination,
//   pokemonsPerPage,
//   count,
// }) => {
//   const paginationNumbers = [];

//   const indexOfLastPokemon = currentPage * pokemonsPerPage;
//   const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
//   const currentPokemons = filteredPokemons.slice(
//     indexOfFirstPokemon,
//     indexOfLastPokemon
//   );

//   for (let i = 1; i <= Math.ceil(count / pokemonsPerPage); i++) {
//     paginationNumbers.push(i);
//   }

//   return (
//     <div>
//       <div>
//         {paginationNumbers.map((pageNumber) => (
//           <button onClick={() => handlePagination(pageNumber)} key={pageNumber}>
//             {pageNumber}
//           </button>
//         ))}
//       </div>
//       <PokeCardClient pokeData={currentPokemons} />
//     </div>
//   );
// };

// export default Pagination;
