import { Bot, Brain, Cloud, Database, Sparkles } from "lucide-react";
import {
  SiDocker,
  SiLangchain,
  SiOpenai,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";
import SkillCard from "@/components/ui/SkillCard";

const skills = [
  {
    label: "React Native",
    icon: <SiReact size={34} className="text-cyan-500" />,
  },
  {
    label: "TypeScript",
    icon: <SiTypescript size={34} className="text-blue-600" />,
  },
  {
    label: "Python",
    icon: <SiPython size={34} className="text-blue-500" />,
  },
  {
    label: "Machine Learning",
    icon: <Brain size={34} className="text-primary" />,
  },
  {
    label: "Generative AI",
    icon: <Sparkles size={34} className="text-violet-500" />,
  },
  {
    label: "LangChain",
    icon: <SiLangchain size={34} className="text-emerald-700" />,
  },
  {
    label: "PyTorch",
    icon: <SiPytorch size={34} className="text-orange-600" />,
  },
  {
    label: "TensorFlow",
    icon: <SiTensorflow size={34} className="text-orange-500" />,
  },
  {
    label: "RAG",
    icon: <Database size={34} className="text-cyan-600" />,
  },
  {
    label: "LLMs",
    icon: <Bot size={34} className="text-zinc-900 dark:text-white" />,
  },
  {
    label: "Scikit-learn",
    icon: <SiScikitlearn size={34} className="text-orange-500" />,
  },
  {
    label: "Docker",
    icon: <SiDocker size={34} className="text-sky-500" />,
  },
  {
    label: "OpenAI",
    icon: <SiOpenai size={34} className="text-black dark:text-white" />,
  },
  {
    label: "IBM Cloud",
    icon: <Cloud size={34} className="text-blue-700" />,
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <section className="max-w-3xl">
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
            What I do
          </h1>
          <p className="mt-8 text-base leading-8 text-zinc-800 dark:text-zinc-200">
            I am a software engineer with a PhD in Engineering, a background in
            computer engineering, and an IBM AI Engineering Professional
            Certificate. I build practical AI-powered applications, data-driven
            tools, and clean web interfaces using modern software engineering
            workflows. My focus is on turning complex ideas into usable
            products, combining full-stack development with machine learning,
            generative AI, RAG systems, and LLM-based applications.
          </p>
        </section>

        <section className="mt-20 w-full">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
            Technologies I Build With
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {skills.map((skill, index) => (
              <SkillCard
                key={`${skill.label}-${index}`}
                icon={skill.icon}
                label={skill.label}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
