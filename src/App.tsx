import ApprovalCard from "@/components/primitives/ApprovalCard";

export default function App() {
  return (
    <main className="flex min-h-full items-center justify-center p-8">
      <ApprovalCard
        onSubmitted={(answers) => console.log("answers", answers)}
        onAnswerChange={(questionIndex, answer) =>
          console.log("change", questionIndex, answer)
        }
      />
    </main>
  );
}
