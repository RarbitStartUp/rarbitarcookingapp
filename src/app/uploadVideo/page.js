import { uploadVideoGS } from "@/lib/uploadVideoGS";

const uploadVideo = () => {
  return (
    <div className="flex flex-col items-center ">
      <form action={uploadVideoGS} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Youtube Video link"
          name="inputLink"
          className="mb-2 p-2 border rounded w-full sm:w-auto sm:p-2"
        ></input>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto sm:px-2 min-h-[2rem]">
          Upload
        </button>
      </form>
    </div>
  );
};

export default uploadVideo;
