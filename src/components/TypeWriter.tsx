import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Enter",
    },
    {
      text: "your",
    },
    {
      text: "treatment",
    },
    {
      text: "and",
    },
    {
      text: "Location",
    },
    {
      text: "to",
    },
    {
      text: "Discover",
    },
    {
      text: "top-rated",
    },
    {
      text: "hospitals",
    },
    {
      text: "near",
    },
    {
      text: "you.",
    },
  ];
  return <TypewriterEffectSmooth words={words} />;
}
