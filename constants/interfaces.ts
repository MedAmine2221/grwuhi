import { ReactNode } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface QuizState {
  quiz: null
}

interface QuizResultState {
  quizResult: null
}

interface UserState {
  users: User[] | null
}

interface LoadingState {
    loading: boolean
}

interface FlagItemProps { text: string; color: string }

interface MetricItemProps {
  label: string;
  value: string | number;
  variant?: "gold" | "teal" | "default";
}

interface SectionCardProps {
  title: string;
  titleColor?: string;
  accent?: string;
  children?: ReactNode;
}

interface AdviceBodyProps {data: any, setActiveStep: (step: number) => void, activeStep: number, step: any}

interface AdviceCardProps {
  title: string;
  description: string;
  tag: string;
  tagColor?: string;
  imageSrc: string;
  imageAlt: string;
  href?: string;
};

interface AdviceHeaderProps {title1: string, title2: string, description: string, buttonText: string, buttonLink: string, imageSrc: string}

interface PostDescriptionProps {setPostDesc: (text: string)=> void, postDesc: string, isPressed: boolean}

interface SocialButtonProps { icon: React.ElementType; label: string, link: string }

interface UploadCVProps {setCv: (cv: any)=> void, cv: any, isPressed: boolean}

interface QuestionAnswer {
  question: string;
  answer: string | null;
}

interface AllAnswersType {
  hr: QuestionAnswer[];
  technical: QuestionAnswer[];
}

interface HRProps {
  question: string,
  category: string,
  preferred_answer: string,
  red_flag_answer: string,
  follow_up: string,
  estimated_time_seconds: string,
}

interface TechnicalProps {
  question: string,
  type: "theory" | "practical" | "trap",
  difficulty: "easy" | "medium" | "hard",
  correct_answer: string,
  common_mistake: string,
  estimated_time_seconds: string,
}

interface QuizModalProps {
  hr: HRProps[],
  technical: TechnicalProps[]
}

interface ScoreRingProps {
  score: number; 
  max?: number
}

interface QuizResultProps {
  candidateName: string; 
  candidatePost: string
}

interface QuestionCardProps {
  item: any;
  index: number;
  accentColor: string;
}

interface CategorySectionProps {
  title: string;
  items: any[];
  accentColor: string;
}

interface RaitingState {
  raiting: any[]
} 

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  color?: string;
  avatar?: string;
}

interface EmailModalProps {
  recipients: User[];
  onClose: () => void;
  onSend: (subject: string, message: string) => void;
}


interface DataTableProps {
  data: User[];
}

export type {DataTableProps, EmailModalProps, RaitingState, User, CategorySectionProps, QuestionCardProps, QuizResultProps, ScoreRingProps, QuizState, UserState, LoadingState, FlagItemProps, MetricItemProps, SectionCardProps, AdviceBodyProps, AdviceCardProps, AdviceHeaderProps, PostDescriptionProps, SocialButtonProps, UploadCVProps, QuestionAnswer, AllAnswersType, QuizResultState, QuizModalProps}