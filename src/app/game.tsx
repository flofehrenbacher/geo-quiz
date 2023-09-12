import { Center, VStack, Heading, Box, Button } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { AnswerOption } from '../components/answer-option'
import { BodyBackground } from '../components/body-background'
import { useAnswerOptions } from '../hooks/use-capital-options'
import { useHighscore } from '../hooks/use-highscore'
import { countries, Country } from '../model/countries'
import { pickRandom } from '../utils/pick-random'
import { GameState } from './page'
import { Metadata } from 'next'
import { bgColors } from '../utils/background-colors'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export function Game() {
  const [gameState, setGameState] = useState<GameState>({
    quizState: 'question',
    chosenAnswer: null,
    solutionCountry: pickRandom(countries),
  })

  const { solutionCountry, quizState } = gameState

  useEffect(() => {
    const themeColor = document.querySelector('[name="theme-color"]')
    themeColor?.setAttribute('content', bgColors[quizState])
  }, [quizState])

  const nextButtonRef = useRef<HTMLButtonElement | null>(null)

  const answerOptions = useAnswerOptions(solutionCountry)
  const { increaseCurrentSeries, resetCurrentSeries, highscoreBadges } = useHighscore()

  const onChooseAnswer = (answer: Country) => {
    if (answer.capital === solutionCountry.capital) {
      setGameState((prev) => ({ ...prev, chosenAnswer: answer, quizState: 'correct' }))
      increaseCurrentSeries()
    } else {
      setGameState((prev) => ({ ...prev, chosenAnswer: answer, quizState: 'wrong' }))
      resetCurrentSeries()
    }
  }

  const onClickNext = () => {
    setGameState({
      solutionCountry: pickRandom(countries),
      chosenAnswer: null,
      quizState: 'question',
    })
  }

  return (
    <main>
      <BodyBackground quizState={quizState} />
      <Center h="100vh" w="100vw" color="white">
        <VStack spacing={6} textAlign="center">
          {highscoreBadges}
          <Heading as="h1" size="4xl" textShadow="2px 2px 0px hotpink, 4px 4px 0px yellow">
            Geo Quiz
            <Heading as="div" mt="5" size="md" textShadow="none">
              Was ist die Hauptstadt von...?
            </Heading>
          </Heading>
          <Heading as="h2" size="xl" textShadow="2px 2px 0px black">
            {solutionCountry.name}
          </Heading>
          <VStack spacing={4} w="100%">
            {answerOptions.map((answerOption) => (
              <AnswerOption
                key={answerOption.capital}
                country={answerOption}
                gameState={gameState}
                handleClickAnswer={quizState === 'question' ? onChooseAnswer : onClickNext}
              />
            ))}
            <Box h="5">
              {quizState === 'question' ? null : (
                <Button
                  autoFocus
                  size="sm"
                  minW="100"
                  ref={nextButtonRef}
                  colorScheme="yellow"
                  onClick={onClickNext}
                >
                  Weiter
                </Button>
              )}
            </Box>
          </VStack>
        </VStack>
      </Center>
    </main>
  )
}
