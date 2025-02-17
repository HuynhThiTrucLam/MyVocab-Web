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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">{word}</p>
        <p className="text-sm text-gray-500">{definition}</p>
      </div>
      
    </div>
  );
}
