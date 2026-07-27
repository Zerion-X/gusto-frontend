import { Link } from "react-router-dom";

export default function ErrorPage() {
    return(
        <div style={{ textAlign: "center", marginTop: "4rem"}}>
            <h1> Page not Found </h1>
            <p> Your address is wrong </p>
            <li><Link to="/">try this</Link></li>
        </div>
    );
}