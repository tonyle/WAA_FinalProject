import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col gap-4 justify-center border border-gray-300 p-8 rounded-2xl">
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to="/"><a className="text-sky-600 underline">Go to Homepage</a></Link>
        </div>
    );
};

export default NotFound;
