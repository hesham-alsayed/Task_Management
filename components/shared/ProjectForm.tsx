import React from "react";
import HeaderAddProject from "../add-project/HeaderAddProject";
import FormAddProject from "../add-project/FormAddProject";
import FooterAddProject from "../add-project/FooterAddProject";

export default function ProjectForm() {
  return (
    <div className="p-2 ">
      <HeaderAddProject />

      <div className="sm:max-w-240 w-full max-h-176 h-full mt-5 rounded-lg p-1 mx-auto">
        <div className="max-w-2xl w-full mx-auto rounded-lg sm:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <FormAddProject />
          <FooterAddProject />
        </div>
      </div>
    </div>
  );
}
