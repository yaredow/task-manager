type ProjectWithIdPageProps = {
  params: {
    projectId: string;
  };
};

export default function ProjectWithIdPage({ params }: ProjectWithIdPageProps) {
  return <main>{params.projectId}</main>;
}
