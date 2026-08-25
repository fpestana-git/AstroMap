export type ExpressionEntry = {
  name: string
  expression: number
}

export type GeneData = {
  description: string
  meanExpression: number
  percentExpressed: number
  populations: ExpressionEntry[]
  regions: ExpressionEntry[]
}

export type GeneDatabase = Record<string, GeneData>

export type Population = {
  id: string
  name: string
  region: string
  nCells: number
  description: string
  markers: string[]
}

export type Region = {
  id: string
  name: string
  abbreviation: string
  nCells: number
  nPopulations: number
  description: string
  topPopulations: string[]
}

export type Dataset = {
  id: string
  name: string
  year: number
  technology: string
  assay: string
  nCells: number
  nLibraries: number
  coverage: string
  reference: string
}

export type SpatialSection = {
  id: string
  name: string
  orientation: string
  technology: string
  species: string
  sectionNumber: number
}
