import react from "react";
import PokeCardServer from "./server/PokeCardServer";
import Header from "../components/Header/Header";

const PokeHome: react.FC = () => {
  return (
    <>
      <div>
        <PokeCardServer />
      </div>
    </>
  );
};

export default PokeHome;
