import React from "react";

function IdeasCard() {
  return (
    <div className="flex flex-col gap-5 bg-zinc-300/50 rounded-xl p-4 ">
      <div className="cat flex justify-between">
        <h1 className="bg-blue-400 text-blue-900 p-1 px-2 font-light rounded-xl uppercase">
          Category
        </h1>
        <h1>:</h1>
      </div>
      <div className="idea">
        <h1 className="font-bold">Idea Title</h1>
        <p className=" text-black/60 break-words line-clamp-2">
          Loremipsum,dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffdd
        </p>
      </div>
      <div className="flex justify-between">
        <div className="status w-fit">
          <h1 className="bg-gray-400 text-gray-900 p-1 px-2 font-light rounded-xl">
            Pending
          </h1>
        </div>
        <div className="details">
          <button className="bg-black hover:bg-[#333] p-2 px-3 text-white rounded-xl cursor-pointer transition-all duration-200">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default IdeasCard;
