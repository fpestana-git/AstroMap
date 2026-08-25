import type { Region } from '../types/atlas'
import AtlasNavbar from '../components/AtlasNavbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MouseRegions() {
  const navigate = useNavigate()

  const [regions, setRegions] = useState<Region[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadRegions() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/mouse/regions.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load region data')
        }

        const data: Region[] = await response.json()

        setRegions(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoading(false)
      }
    }

    loadRegions()
  }, [])

  return (
    <div className="atlas-page">
      <AtlasNavbar species="mouse" />

      <main>
        <section className="gene-hero">
          <p className="eyebrow">Mouse atlas</p>

          <h1>Brain Regions</h1>

          <p>
            Explore how astrocyte populations and transcriptional
            programs vary across anatomical regions of the mouse brain.
          </p>
        </section>

        <section className="population-browser">
          {loading && <p>Loading brain regions...</p>}

          {loadError && (
            <p>
              Brain region data could not be loaded.
            </p>
          )}

          {!loading && !loadError && (
            <div className="region-grid">
              {regions.map((region) => (
                <article className="region-card" key={region.id}>
                  <div className="region-card-header">
                    <span className="region-abbreviation">
                      {region.abbreviation}
                    </span>

                    <span className="region-count">
                      {region.nCells.toLocaleString()} astrocytes
                    </span>
                  </div>

                  <h2>{region.name}</h2>

                  <p className="region-description">
                    {region.description}
                  </p>

                  <div className="region-stats">
                    <div>
                      <strong>{region.nPopulations}</strong>
                      <span>Populations</span>
                    </div>
                  </div>

                  {region.topPopulations.length > 0 && (
                    <div className="region-populations">
                      <span className="marker-heading">
                        Representative populations
                      </span>

                      <div className="marker-list">
                        {region.topPopulations.map((population) => (
                          <button
                            key={population}
                            onClick={() =>
                              navigate(
                                `/mouse/populations/${encodeURIComponent(population)}`,
                              )
                            }
                          >
                            {population}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    className="population-open"
                    onClick={() =>
                      navigate(`/mouse/regions/${encodeURIComponent(region.id)}`)
                    }
                  >
                    Explore region <span>→</span>
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

export default MouseRegions