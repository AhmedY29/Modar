import React from "react";

import { IoCloseCircleOutline } from "react-icons/io5";

function Dialog(props) {
  return (
    <dialog
      open={props.open}
      className={`${
        props.open ? "flex" : ""
      } items-center justify-center bg-black/50 fixed top-0 w-full h-full`}
    >
      <div className="dialog-content bg-white rounded-xl p-3 min-w-[20rem]">
        <div className="flex justify-between text-2xl">
          <h1>{props.title}</h1>
          <IoCloseCircleOutline
            onClick={() => props.setOpenDialog(false)}
            className="text-3xl cursor-pointer"
          />
        </div>
        <hr />
        {props.children}
      </div>
    </dialog>
  );
}

export default Dialog;
