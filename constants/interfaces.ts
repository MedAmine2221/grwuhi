/* eslint-disable @typescript-eslint/no-explicit-any */
interface QuizState {
  quiz: null
}

interface QuizResultState {
  quizResult: null
}

interface UserState {
  user: null
}

interface LoadingState {
    loading: boolean
}

interface FlagItemProps { text: string; color: string }

interface MetricItemProps { label: string; value: string }

interface SectionCardProps {
  title: string;
  titleColor?: string;
  children: React.ReactNode;
  accent?: string;
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


export type {QuizState, UserState, LoadingState, FlagItemProps, MetricItemProps, SectionCardProps, AdviceBodyProps, AdviceCardProps, AdviceHeaderProps, PostDescriptionProps, SocialButtonProps, UploadCVProps, QuestionAnswer, AllAnswersType, QuizResultState}