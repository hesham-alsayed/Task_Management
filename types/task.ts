import { Task } from "@/components/epicDetails/EpicModalDetails";

export interface IUser {
  id: string | null;
  name: string | null;
  email: string | null;
  department: string | null;
}

export interface IEpic {
  id: string;
  epic_id: string;
  title: string;
}

export interface ITaskDetails {
  id: string;
  task_id: string;
  title: string;
  description: string | null;
  status:
    | "TO_DO"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "IN_REVIEW"
    | "READY_FOR_QA"
    | "REOPENED"
    | "READY_FOR_PRODUCTION"
    | "DONE";
  due_date: string;
  created_at: string;
  project_id: string;
  epic_id: string;
  assignee: IUser;
  created_by: IUser;
  epic: IEpic;
}

export type BoardItem = {
  key: string;
  name: string;
  tasks: Task[];
  offset: number;
  limit: number;
  totalCount: number;
  loading: boolean;
  loadingMore: boolean;
  loaded: boolean;
  hasMore: boolean;
};
