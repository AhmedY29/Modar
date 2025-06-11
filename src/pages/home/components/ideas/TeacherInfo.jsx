import React from "react";

function TeacherInfo() {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between text-2xl font-rubik w-full">
      <div className="bg-white/40 rounded-xl p-5 w-full">
        <h1 className="text-sm">Teacher Name</h1>
        <h1 className="">Demah</h1>
      </div>
      <div className="bg-white/40 rounded-xl p-5 w-full h-full text-wrap">
        <h1 className="text-sm">Team Member count 3</h1>
        <div className="flex flex-wrap gap-5">
          <p>mosa altaamari</p>
          <p>ahmed alsaleh</p>
          <p>nasser alshwash</p>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfo;
