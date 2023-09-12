'use client'

import { useEffect, useState } from 'react'
import { Country } from '../model/countries'
import { QuizState } from '../model/quiz-state'
import { Game } from './game'

export type GameState = {
  quizState: QuizState
  solutionCountry: Country
  chosenAnswer: Country | null
}
export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <Game />
}
