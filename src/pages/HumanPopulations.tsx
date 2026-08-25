import type { Population } from '../types/atlas'
import AtlasNavbar from '../components/AtlasNavbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function HumanPopulations() {
  const navigate = useNavigate()

  const [populations, setPopulations] = useState<Population[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadPopulations() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/human/populations.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load human population data')
        }

        const data: Population[] = await response.json()

        setPopulations(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoading(false)
      }
    }

    loadPopulations()
  }, [])

  return (
    <div className="atlas-page">
      <AtlasNavbar species="human" />

      <main>
        <section className="gene-hero">
          <p className="eyebrow">Human atlas</p>

          <h1>Astrocyte Populations</h1>

          <p>
            Explore human astrocyte populations, their marker genes,
            transcriptional states and anatomical distributions.
          </p>
        </section>

        <section className="population-browser">
          {loading && <p>Loading populations...</p>}

          {loadError && (
            <p>Human population data could not be loaded.</p>
          )}

          {!loading && !loadError && (
            <div className="population-grid">
              {populations.map((population) => (
                <article
                  className="population-card"
                  key={population.id}
                >
                  <div className="population-card-header">
                    <span className="population-region">
                      {population.region}
                    </span>

                    <span className="population-count">
                      {population.nCells.toLocaleString()} cells
                    </span>
                  </div>

                  <h2>{population.name}</h2>

                  <p className="population-description">
                    {population.description}
                  </p>

                  <div className="population-markers">
                    <span className="marker-heading">
                      Top markers
                    </span>

                    <div className="marker-list">
                      {population.markers.map((marker) => (
                        <button
                          key={marker}
                          onClick={() =>
                            navigate(
                              `/human/genes?gene=${encodeURIComponent(marker)}`,
                            )
                          }
                        >
                          {marker}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    className="population-open"
                    onClick={() =>
                      navigate(`/human/populations/${encodeURIComponent(population.id)}`)
                    }
                  >
                    View population <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default HumanPopulations
