import { css, Global } from '@emotion/react'
import { QuizState } from '../model/quiz-state'
import { bgColors } from '../utils/background-colors'

export function BodyBackground({ quizState }: { quizState: QuizState }) {
  return (
    <Global
      styles={css`
        body {
          background-color: ${bgColors[quizState]};
          transition: background-color 150ms ease-in-out;
        }
      `}
    />
  )
}
