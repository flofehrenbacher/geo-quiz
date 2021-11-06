import { useState, useEffect } from 'react'
import { HighscoreBadges } from '../components/highscore-badges'
import { useLocalStorageState } from './use-local-storage-state'

export function useHighscore() {
  const [currentSeriesRight, setCurrentSeriesRight] = useState(0)
  const [highscore, setHighscore] = useLocalStorageState('highscore', 0)

  useEffect(() => {
    if (currentSeriesRight > highscore) {
      setHighscore(currentSeriesRight)
    }
  }, [currentSeriesRight, highscore, setHighscore])

  return {
    increaseCurrentSeries: () => setCurrentSeriesRight((prev) => prev + 1),
    resetCurrentSeries: () => setCurrentSeriesRight(0),
    highscoreBadges: (
      <HighscoreBadges currentSeriesRight={currentSeriesRight} highscore={highscore} />
    ),
  }
}
