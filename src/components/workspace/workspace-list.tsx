import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WorkspaceItem {
  id: string;
  title: string;
  wordCount: number;
}

export function WorkspaceList() {
  const workspaces: WorkspaceItem[] = [
    { id: "1", title: "English Vocabulary", wordCount: 50 },
    { id: "2", title: "Business Terms", wordCount: 30 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Workspaces</h2>
        <Button>Create New</Button>
      </div>
      {workspaces.map((workspace) => (
        <Card key={workspace.id}>
          <CardHeader>
            <CardTitle>{workspace.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{workspace.wordCount} words</p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline">Open</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
