import Spinner from "../icons/Spinner";

export default function ProcessingRequestInfo() {
  return (
    <div className="flex mx-auto px-3 py-2 bg-blue-800 rounded-lg">
      <Spinner />
      <p className="flex text-sm font-semibold">Request is being processed</p>
    </div>
  );
}
