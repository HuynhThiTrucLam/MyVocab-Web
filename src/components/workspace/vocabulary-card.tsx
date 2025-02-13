import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VocabularyCardProps {
  word: string;
  definition: string;
  example: string;
}

export function VocabularyCard({
  word,
  definition,
  example,
}: VocabularyCardProps) {
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle className="text-xl">{word}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-2">{definition}</p>
        <p className="text-gray-500 italic">Example: {example}</p>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
