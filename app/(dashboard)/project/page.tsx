import { Suspense } from "react";
import GetAllProjects from "@/components/projects/GetAllProjects";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GetAllProjects />
    </Suspense>
  );
}
