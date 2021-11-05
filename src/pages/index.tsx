import { Badge, Box, Button, Center, Heading, HStack, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { useCapitalOptions } from '../hooks/use-capital-options'
import { useLocalStorageState } from '../hooks/use-local-storage-state'
import { countries, Country } from '../model/countries'
import { pickRandom } from '../utils/pick-random'

const Home: NextPage = () => {
  const [country, setCountry] = useState<Country>(pickRandom(countries))
  const [quizState, setQuizState] = useState<'question' | 'right' | 'wrong'>('question')

  const capitalOptions = useCapitalOptions(country)
  const nextButtonRef = useRef<HTMLButtonElement | null>(null)

  const [currentSeriesRight, setCurrentSeriesRight] = useState(0)
  const [highscore, setHighscore] = useLocalStorageState('highscore', 0)
  const [chosenAnswer, setChosenAnswer] = useState<Country | null>(null)

  useEffect(() => {
    if (currentSeriesRight > highscore) {
      setHighscore(currentSeriesRight)
    }
  }, [currentSeriesRight, highscore, setHighscore])

  const onChooseAnswer = (answer: Country) => {
    setChosenAnswer(country)
    if (answer.capital === country.capital) {
      setQuizState('right')
      setCurrentSeriesRight((prev) => prev + 1)
    } else {
      setQuizState('wrong')
      setCurrentSeriesRight(0)
    }
  }

  const onClickNext = () => {
    setCountry(pickRandom(countries))
    setQuizState('question')
    setChosenAnswer(null)
  }

  return (
    <main>
      <Head>
        <title>Geo Quiz</title>
        <link rel="manifest" href="/manifest.json" />
        <link href="/icon_72x72.png" rel="icon" type="image/png" sizes="72x72" />
        <link href="/icon_144x144.png" rel="icon" type="image/png" sizes="144x144" />
        <link rel="apple-touch-icon" href="/icon_192x192.png"></link>
        <meta name="theme-color" content="#FFF" />
      </Head>
      <Center
        bg={quizState === 'question' ? 'blue.200' : quizState === 'right' ? 'green.200' : 'red.200'}
        h="100vh"
        w="100vw"
        color="white"
      >
        <VStack spacing={5} textAlign="center">
          <Badge bg="whiteAlpha.900" color="green.500">
            Highscore {highscore}
          </Badge>
          <Badge bg="whiteAlpha.900" color="gray.500">
            Richtig in Folge {currentSeriesRight}
          </Badge>

          <Heading as="h1" size="4xl" textShadow="2px 2px 0px hotpink, 4px 4px 0px yellow">
            Geo Quiz
            <Heading as="div" mt="5" size="xl" textShadow="none">
              Was ist die Hauptstadt von...?
            </Heading>
          </Heading>
          <Heading as="h2" size="xl">
            {country.name}
          </Heading>
          <VStack spacing={5} w="100%">
            {capitalOptions.map((capitalOption) => (
              <Button
                size="md"
                key={capitalOption.name}
                w="50%"
                disabled={quizState !== 'question'}
                colorScheme={'blackAlpha'}
                bg={
                  chosenAnswer?.capital === capitalOption.capital &&
                  chosenAnswer?.capital === country.capital
                    ? 'green'
                    : undefined
                }
                onClick={() => onChooseAnswer(capitalOption)}
              >
                {capitalOption.capital}
              </Button>
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

export default Home
