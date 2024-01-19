import Link from "next/link";
const Notfound = () => {
  return (
    <div>
      <h2 className="text-white font-bold">Not Found</h2>
      <p className="text-white font-bold">Sorry, the page you are looking does not exist.</p>
      <Link className="text-white font-bold" href="/">Return Home</Link>
    </div>
  );
};

export default Notfound;
