import {
  FaProjectDiagram,
  FaCalendarDay,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";

export const dashboardData = {
  stats: [
    {
      id: 1,
      title: "Total Tasks",
      value: 15,
      description: "50 total tasks",
      icon: FaProjectDiagram, // IconType component
    },
    {
      id: 2,
      title: "Close Due Date",
      value: 5,
      description: "Projects due within 7 days",
      icon: FaCalendarDay,
    },
    {
      id: 3,
      title: "Finished Projects",
      value: 10,
      description: "66.7% completion rate",
      icon: FaCheckCircle,
    },
    {
      id: 4,
      title: "Unfinished Projects",
      value: 5,
      description: "30 tasks remaining",
      icon: FaCircle,
    },
  ],
  projects: [
    {
      id: "1",
      name: "Website Redesign",
      tasks: 8,
      dueDate: "2024-12-05",
      status: "in progress",
    },
    {
      id: "2",
      name: "Mobile App Development",
      tasks: 5,
      dueDate: "2024-12-02",
      status: "in review",
    },
    {
      id: "3",
      name: "Marketing Campaign",
      tasks: 10,
      dueDate: "2024-12-15",
      status: "backlog",
    },
    {
      id: "4",
      name: "Database Optimization",
      tasks: 7,
      dueDate: "2024-12-10",
      status: "finished",
    },
    {
      id: "5",
      name: "New Feature Rollout",
      tasks: 4,
      dueDate: "2024-12-07",
      status: "done",
    },
  ],
  currentDate: "2024-12-01",
};
