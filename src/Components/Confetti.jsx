import { Button } from "@/Components/ui/button";
import { Sparkles } from "lucide-react";
import * as React from "react";

export default function ConfettiButton() {
  React.useEffect(() => {
    const importConfetti = async () => {
      const confettiModule = await import("canvas-confetti");
      window.confetti = confettiModule.default;
    };
    importConfetti();
  }, []);

  const fireConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 300, // Increased particle count
        spread: 90, // Increased spread
        origin: { y: 0.5 }, // Adjusted origin for a more centered effect
        angle: 90, // Makes the confetti explode horizontally
        gravity: 0.5, // Adds gravity to the particles for a more natural fall
        ticks: 150 // Duration of the confetti effect
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="dark:bg-gray-950 border-none"
      onClick={fireConfetti}
    >
      <Sparkles className="h-[1.2rem] w-[1.2rem] dark:text-white" />
      <span className="sr-only">Celebrate with confetti</span>
    </Button>
  );
}
