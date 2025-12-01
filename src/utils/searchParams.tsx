import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const coordinatesSearchParams = {
  test: parseAsString.withDefault("")
}

export const loadSearchParams = createLoader(coordinatesSearchParams)