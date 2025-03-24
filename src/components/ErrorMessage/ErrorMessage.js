import { ERROR_MESSAGE, RETRY } from "../../utils/constants";
import "./ErrorMessage.css";

const ErrorMessage = ({ retry }) => {
    return (
        <div className="error-container">
            <p>{ERROR_MESSAGE}</p>
            <button onClick={retry}>{RETRY}</button>
        </div>
    );
};

export default ErrorMessage;
