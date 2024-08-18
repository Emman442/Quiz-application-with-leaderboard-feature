import { CubeSpinner} from "react-spinners-kit";
export default function Loader() {
  return (
    <div className="loader-container">
      {/* <div className="loader"></div>
       */}
       <CubeSpinner/>
      <p>Loading questions...</p>
    </div>
  );
}
