import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg mb-4">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-gray-600 italic">
          <i>{error.statusText || error.message}</i>
        </p>
        <Link to={'/user'}  className="mt-8 inline-block rounded-lg bg-blue-500 px-5 py-3 text-white transition-all hover:bg-blue-600" >
        Go Back to Homepage
        </Link>

      </div>
    </div>
  );
}
