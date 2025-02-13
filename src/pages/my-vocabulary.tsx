import { VocabularyCard } from "@/components/workspace/vocabulary-card";

export default function MyVocabulary() {
  const vocabularyItems = [
    {
      word: "Example",
      definition: "A representative form or pattern",
      example: "This is an example of how to use the word.",
    },
    // Add more vocabulary items
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Vocabulary</h1>
      <div className="space-y-4">
        {vocabularyItems.map((item, index) => (
          <VocabularyCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
