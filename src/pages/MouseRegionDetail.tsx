import AtlasNavbar from '../components/AtlasNavbar'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type Region = {
  id: string
  name: string
  abbreviation: string
  nCells: number
  nPopulations: number
  description: string
  topPopulations: string[]
}

function MouseRegionDetail() {
  const navigate = useNavigate()
  const { regionId } = useParams()

  const [region, setRegion] = useState<Region | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadRegion() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/mouse/regions.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load region data')
        }

        const data: Region[] = await response.json()

        const match = data.find(
          (item) => item.id === regionId,
        )

        if (!match) {
          throw new Error('Region not found')
        }

        setRegion(match)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoading(false)
      }
    }

    loadRegion()
  }, [regionId])

  return (
    <div className="atlas-page">
      <AtlasNavbar species="mouse" />

      <main>
        {loading && (
          <div className="population-detail-status">
            Loading brain region...
          </div>
        )}

        {loadError && (
          <div className="population-detail-status">
            Brain region could not be loaded.
          </div>
        )}

        {region && (
          <>
            <section className="gene-hero">
              <p className="eyebrow">
                Mouse atlas · {region.abbreviation}
              </p>

              <h1>{region.name}</h1>

              <p>{region.description}</p>
            </section>

            <section className="population-detail">
              <div className="population-detail-card">
                <div className="gene-metrics">
                  <div className="gene-metric">
                    <strong>
                      {region.nCells.toLocaleString()}
                    </strong>
                    <span>Astrocytes</span>
                  </div>

                  <div className="gene-metric">
                    <strong>{region.nPopulations}</strong>
                    <span>Astrocyte populations</span>
                  </div>
                </div>

                {region.topPopulations.length > 0 && (
                  <div className="population-detail-section">
                    <h2>Representative populations</h2>

                    <div className="marker-list">
                      {region.topPopulations.map((population) => (
                        <button
                          key={population}
                          onClick={() =>
                            navigate(
                              `/mouse/populations/${encodeURIComponent(
                                population,
                              )}`,
                            )
                          }
                        >
                          {population}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default MouseRegionDetail
