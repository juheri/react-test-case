import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

export const loader = () => {
    return (
        <div
        style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
        }}
        >
        <Spinner animation="border">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>
    );
};
