import { getAllProjectsAction } from "@/app/server-actions/project/getAllProjects";
import { usePaginationData } from "./usePaginationData";

export const useGetAllProjects = () => {
  const pagination = usePaginationData(getAllProjectsAction, 4);

  return {
    projects: pagination.data,
    ...pagination,
  };
};
