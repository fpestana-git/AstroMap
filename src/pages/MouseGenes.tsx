import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import AtlasNavbar from '../components/AtlasNavbar'
import type { GeneData } from '../types/atlas'

function MouseGenes() {
  const [searchParams, setSearchParams] = useSearchParams()

  const geneFromUrl = searchParams.get('gene') || ''

  const [geneIndex, setGeneIndex] = useState<string[]>([])
  const [query, setQuery] = useState(geneFromUrl)
  const [selectedGene, setSelectedGene] = useState<string | null>(null)
  const [geneData, setGeneData] = useState<GeneData | null>(null)

  const [loadingIndex, setLoadingIndex] = useState(true)
  const [loadingGene, setLoadingGene] = useState(false)

  const [notFound, setNotFound] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadGeneIndex() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/mouse/gene_index.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load gene index')
        }

        const data: string[] = await response.json()

        setGeneIndex(data)
        setLoadingIndex(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoadingIndex(false)
      }
    }

    loadGeneIndex()
  }, [])

  async function loadGene(gene: string) {
    try {
      setLoadingGene(true)
      setNotFound(false)
      setGeneData(null)

      const response = await fetch(
        `${import.meta.env.BASE_URL}data/mouse/genes/${encodeURIComponent(
          gene,
        )}.json`,
      )

      if (!response.ok) {
        throw new Error(`Could not load gene ${gene}`)
      }

      const data: GeneData = await response.json()

      setSelectedGene(gene)
      setGeneData(data)
      setLoadingGene(false)
    } catch (error) {
      console.error(error)
      setSelectedGene(null)
      setGeneData(null)
      setNotFound(true)
      setLoadingGene(false)
    }
  }

  useEffect(() => {
    if (loadingIndex || !geneFromUrl) {
      return
    }

    const match = geneIndex.find(
      (gene) => gene.toLowerCase() === geneFromUrl.toLowerCase(),
    )

    if (match) {
      setQuery(match)
      loadGene(match)
    } else {
      setSelectedGene(null)
      setGeneData(null)
      setNotFound(true)
    }
  }, [geneIndex, geneFromUrl, loadingIndex])

  function handleSearch() {
    const match = geneIndex.find(
      (gene) => gene.toLowerCase() === query.trim().toLowerCase(),
    )

    if (match) {
      setSearchParams({ gene: match })
    } else {
      setSelectedGene(null)
      setGeneData(null)
      setNotFound(true)
    }
  }

  const suggestions =
    query.length > 0
      ? geneIndex
          .filter((gene) =>
            gene.toLowerCase().startsWith(query.toLowerCase()),
          )
          .slice(0, 8)
      : []

  return (
    <div className="atlas-page">
      <AtlasNavbar species="mouse" />

      <main>
        <section className="gene-hero">
          <p className="eyebrow">Mouse atlas</p>

          <h1>Gene Explorer</h1>

          <p>
            Search for a gene to explore its expression across mouse
            astrocyte populations and brain regions.
          </p>

          <div className="gene-search-wrapper">
            <div className="gene-search">
              <input
                type="text"
                placeholder="Search gene, e.g. Aqp4"
                value={query}
                disabled={loadingIndex || loadError}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch()
                  }
                }}
              />

              <button
                onClick={handleSearch}
                disabled={loadingIndex || loadError || loadingGene}
              >
                {loadingIndex
                  ? 'Loading...'
                  : loadingGene
                    ? 'Loading gene...'
                    : 'Search'}
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="gene-suggestions">
                {suggestions.map((gene) => (
                  <button
                    key={gene}
                    onClick={() => {
                      setQuery(gene)
                      setSearchParams({ gene })
                    }}
                  >
                    {gene}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {loadError && (
          <div className="gene-not-found">
            Mouse gene index could not be loaded.
          </div>
        )}

        {loadingGene && (
          <div className="gene-not-found">
            Loading gene data...
          </div>
        )}

        {geneData && selectedGene && (
          <section className="gene-result">
            <div className="gene-result-card">
              <h2>{selectedGene}</h2>

              <p className="gene-description">
                {geneData.description}
              </p>

              <div className="gene-metrics">
                <div className="gene-metric">
                  <strong>{geneData.meanExpression}</strong>
                  <span>Mean expression</span>
                </div>

                <div className="gene-metric">
                  <strong>{geneData.percentExpressed}%</strong>
                  <span>Astrocytes expressing gene</span>
                </div>
              </div>

              <div className="expression-section">
                <h3>Expression by astrocyte population</h3>

                <div className="expression-list">
                  {geneData.populations.map((population) => (
                    <div
                      className="expression-row"
                      key={population.name}
                    >
                      <div className="expression-label">
                        <span>{population.name}</span>
                        <strong>{population.expression}</strong>
                      </div>

                      <div className="expression-track">
                        <div
                          className="expression-bar"
                          style={{
                            width: `${(population.expression / 5) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="expression-section">
                <h3>Expression by brain region</h3>

                <div className="expression-list">
                  {geneData.regions.map((region) => (
                    <div
                      className="expression-row"
                      key={region.name}
                    >
                      <div className="expression-label">
                        <span>{region.name}</span>
                        <strong>{region.expression}</strong>
                      </div>

                      <div className="expression-track">
                        <div
                          className="expression-bar"
                          style={{
                            width: `${(region.expression / 5) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {notFound && (
          <div className="gene-not-found">
            Gene not found.
          </div>
        )}
      </main>
    </div>
  )
}

export default MouseGenes