import react from "react";
import PokeCardServer from "../components/Cards/PokeCardServer";

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
