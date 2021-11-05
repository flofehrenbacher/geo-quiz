import { countries, Country } from '../model/countries'
import { useEffect, useState } from 'react'
import { pickRandom } from '../utils/pick-random'
import { uniq } from 'ramda'
import { shuffle } from '../utils/shuffle'

export type CapitalOptions = Country[]

const optionsLength = 4

/**
 * @param country correct country
 * @returns three uniq options where one is the correct country or null
 */
export function useCapitalOptions(country: Country): CapitalOptions {
  const [capitalOptions, setCapitalOptions] = useState<CapitalOptions>([])

  // reset when country changes
  useEffect(() => {
    setCapitalOptions([])
  }, [country])

  useEffect(() => {
    if (capitalOptions.includes(country) && capitalOptions.length === optionsLength) return

    let newCapitalOptions: Country[] = [country]
    while (newCapitalOptions.length !== optionsLength) {
      newCapitalOptions = uniq([...newCapitalOptions, pickRandom(countries)])
    }
    setCapitalOptions(shuffle(newCapitalOptions))
  }, [country, capitalOptions])

  return capitalOptions
}
