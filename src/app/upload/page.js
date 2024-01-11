import { uploadVideoGS } from "@/api/uploadVideoGS";
import { useRouter } from "next/navigation";

export function UploadVideo() {
  const router = useRouter();
  function pageRoute() {
    console.log("upload button clicked");
    router.push("/src/app/(checkbox)");
  }
  return (
    <div className="flex flex-col items-center ">
      <form action={uploadVideoGS} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Paste Your Youtube Link"
          name="inputLink"
          className="mb-2 p-2 shadow-inner border text-center rounded w-full sm:w-auto sm:p-2 focus:outline-none focus:ring-5 focus:ring-slate-500 "
        ></input>

        <button
          onClick={pageRoute}
          className="bg-slate-300 text-slate-700 drop-shadow-md font-semibold px-4 py-2 rounded w-full sm:w-auto sm:px-2 min-h-[2rem]"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
