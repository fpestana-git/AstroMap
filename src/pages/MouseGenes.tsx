import AtlasNavbar from '../components/AtlasNavbar'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'


type ExpressionEntry = {
  name: string
  expression: number
}

type GeneData = {
  description: string
  meanExpression: number
  percentExpressed: number
  populations: ExpressionEntry[]
  regions: ExpressionEntry[]
}

type GeneDatabase = Record<string, GeneData>

function MouseGenes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [genes, setGenes] = useState<GeneDatabase>({})
  const geneFromUrl = searchParams.get('gene') || ''

  const [query, setQuery] = useState(geneFromUrl)
  const [selectedGene, setSelectedGene] = useState<string | null>(null)

  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadGenes() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/mouse/genes.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load gene data')
        }

        const data: GeneDatabase = await response.json()

        setGenes(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoading(false)
      }
    }

    loadGenes()
  }, [])

  useEffect(() => {
  if (loading || !geneFromUrl) {
    return
  }

  const match = Object.keys(genes).find(
    (gene) => gene.toLowerCase() === geneFromUrl.toLowerCase(),
  )

  if (match) {
    setQuery(match)
    setSelectedGene(match)
    setNotFound(false)
  }
}, [genes, geneFromUrl, loading])

  function handleSearch() {
    const match = Object.keys(genes).find(
      (gene) => gene.toLowerCase() === query.trim().toLowerCase(),
    )

    if (match) {
      setSelectedGene(match)
      setNotFound(false)
      setSearchParams({ gene: match })
    } else {
      setSelectedGene(null)
      setNotFound(true)
    }
  }

  const geneData = selectedGene ? genes[selectedGene] : null

const suggestions =
  query.length > 0
    ? Object.keys(genes)
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
              disabled={loading || loadError}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch()
                }
              }}
            />

            <button
              onClick={handleSearch}
              disabled={loading || loadError}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>

  {suggestions.length > 0 && (
    <div className="gene-suggestions">
      {suggestions.map((gene) => (
        <button
          key={gene}
          onClick={() => {
            setQuery(gene)
            setSelectedGene(gene)
            setNotFound(false)
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
            Gene data could not be loaded.
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