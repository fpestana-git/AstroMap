import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Population = {
  id: string
  name: string
  region: string
  nCells: number
  description: string
  markers: string[]
}

function MousePopulationDetail() {
  const navigate = useNavigate()
  const { populationId } = useParams()

  const [population, setPopulation] = useState<Population | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadPopulation() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/mouse/populations.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load population data')
        }

        const data: Population[] = await response.json()

        const match = data.find(
          (item) => item.id === populationId,
        )

        if (!match) {
          throw new Error('Population not found')
        }

        setPopulation(match)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoading(false)
      }
    }

    loadPopulation()
  }, [populationId])

  return (
    <div className="atlas-page">
      <header className="navbar">
        <button className="logo-button" onClick={() => navigate('/')}>
          AstroMap
        </button>

        <nav>
          <button onClick={() => navigate('/mouse')}>Overview</button>

          <button onClick={() => navigate('/mouse/genes')}>
            Genes
          </button>

          <button onClick={() => navigate('/mouse/populations')}>
            Populations
          </button>

          <button onClick={() => navigate('/mouse/regions')}>
            Brain regions
          </button>
          <button onClick={() => navigate('/mouse/spatial')}>
            Spatial
          </button>
          <button>Datasets</button>
        </nav>
      </header>

      <main>
        {loading && (
          <div className="population-detail-status">
            Loading population...
          </div>
        )}

        {loadError && (
          <div className="population-detail-status">
            Population could not be loaded.
          </div>
        )}

        {population && (
          <>
            <section className="gene-hero">
              <p className="eyebrow">
                Mouse atlas · {population.region}
              </p>

              <h1>{population.name}</h1>

              <p>{population.description}</p>
            </section>

            <section className="population-detail">
              <div className="population-detail-card">
                <div className="population-detail-metric">
                  <strong>
                    {population.nCells.toLocaleString()}
                  </strong>
                  <span>Astrocytes</span>
                </div>

                <div className="population-detail-section">
                  <h2>Top marker genes</h2>

                  <div className="marker-list">
                    {population.markers.map((marker) => (
                      <button
                        key={marker}
                        onClick={() =>
                          navigate(
                            `/mouse/genes?gene=${encodeURIComponent(marker)}`,
                          )
                        }
                      >
                        {marker}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default MousePopulationDetail
