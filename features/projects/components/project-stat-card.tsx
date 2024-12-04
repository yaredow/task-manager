import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IconType } from "react-icons/lib";

type ProjectStatCardProps = {
  title: string;
  Icon?: IconType | React.ComponentType<{ className?: string }>;
  value: number | string;
  description: string;
};

export default function ProjectStatCard({
  title,
  Icon,
  value,
  description,
}: ProjectStatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
