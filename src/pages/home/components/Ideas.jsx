import React from "react";
import TeacherInfo from "./ideas/TeacherInfo";
import IdeasCard from "./ideas/IdeasCard";
import FormGroup from "../../auth/components/FormGroup";

function Ideas() {
  return (
    <section className="flex flex-col gap-5 w-full bg-gray-200/40 mx-5 rounded-xl p-10">
      <div className="w">
        <TeacherInfo />
      </div>
      <div className="ideas-content">
        <div className="flex w-full bg-white/40 p-2 rounded-xl">
          <div className="w-full">
            <FormGroup
              label={"idea"}
              type={"text"}
              placeholder={"Enter Your Idea"}
            />
          </div>
          <button
            className={`bg-black hover:bg-[#333] px-10 p-1 text-white cursor-pointer rounded-xl transition-all duration-200 `}
          >
            Add
          </button>
        </div>
        <hr className="my-5" />
        <div className="ideas bg-white/40 p-2 rounded-xl">
          <h1 className="text-2xl">Ideas</h1>
          <div className="ideas-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
            <IdeasCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ideas;
