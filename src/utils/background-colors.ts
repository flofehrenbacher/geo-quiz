import { theme } from '@chakra-ui/react'
import { QuizState } from '../model/quiz-state'

export const bgColors: Record<QuizState, string> = {
  question: theme.colors.blue[400],
  correct: theme.colors.green[400],
  wrong: theme.colors.red[400],
}
