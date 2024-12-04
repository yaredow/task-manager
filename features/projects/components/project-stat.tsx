import { dashboardData } from "../constants";
import ProjectStatCard from "./project-stat-card";

export default function ProjectStat() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {dashboardData.stats.map((stat) => (
        <ProjectStatCard
          key={stat.id}
          Icon={stat.icon}
          description={stat.description}
          value={stat.value}
          title={stat.title}
        />
      ))}
    </div>
  );
}
