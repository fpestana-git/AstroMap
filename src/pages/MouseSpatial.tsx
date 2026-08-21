import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type SpatialSection = {
  id: string
  name: string
  orientation: string
  technology: string
  species: string
  sectionNumber: number
}

function MouseSpatial() {
  const navigate = useNavigate()

  const [sections, setSections] = useState<SpatialSection[]>([])
  const [selectedSectionId, setSelectedSectionId] = useState('')
  const [displayMode, setDisplayMode] = useState('populations')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadSections() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/mouse/spatial_sections.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load spatial section data')
        }

        const data: SpatialSection[] = await response.json()

        setSections(data)

        if (data.length > 0) {
          setSelectedSectionId(data[0].id)
        }

        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoading(false)
      }
    }

    loadSections()
  }, [])

  const selectedSection = sections.find(
    (section) => section.id === selectedSectionId,
  )

  return (
    <div className="atlas-page">
      <header className="navbar">
        <button className="logo-button" onClick={() => navigate('/')}>
          AstroMap
        </button>

        <nav>
          <button onClick={() => navigate('/mouse')}>
            Overview
          </button>

          <button onClick={() => navigate('/mouse/genes')}>
            Genes
          </button>

          <button onClick={() => navigate('/mouse/populations')}>
            Populations
          </button>

          <button onClick={() => navigate('/mouse/regions')}>
            Brain regions
          </button>

          <button>Spatial</button>
          <button>Datasets</button>
        </nav>
      </header>

      <main>
        <section className="gene-hero">
          <p className="eyebrow">Mouse atlas</p>

          <h1>Spatial Atlas</h1>

          <p>
            Explore spatial distributions of astrocyte populations and
            gene expression across mouse brain sections.
          </p>
        </section>

        <section className="spatial-workspace">
          <aside className="spatial-controls">
            <h2>Explore section</h2>

            {loading && <p>Loading sections...</p>}

            {loadError && (
              <p>Spatial section data could not be loaded.</p>
            )}

            {!loading && !loadError && (
              <>
                <label>
                  Brain section

                  <select
                    value={selectedSectionId}
                    onChange={(event) =>
                      setSelectedSectionId(event.target.value)
                    }
                  >
                    {sections.map((section) => (
                      <option
                        key={section.id}
                        value={section.id}
                      >
                        {section.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Display

                  <select
                    value={displayMode}
                    onChange={(event) =>
                      setDisplayMode(event.target.value)
                    }
                  >
                    <option value="populations">
                      Astrocyte populations
                    </option>

                    <option value="genes">
                      Gene expression
                    </option>
                  </select>
                </label>

                <label>
                  Population / gene

                  <input
                    type="text"
                    placeholder="e.g. Aqp4 or ASTRO-CTX-1"
                    value={query}
                    onChange={(event) =>
                      setQuery(event.target.value)
                    }
                  />
                </label>
              </>
            )}
          </aside>

          <div className="spatial-viewer">
            <div className="spatial-placeholder">
              <span>Spatial brain section viewer</span>

              <p>
                Visium section and spatial overlays will appear here.
              </p>
            </div>

            {selectedSection && (
              <div className="spatial-metadata">
                <div>
                  <strong>{selectedSection.name}</strong>
                  <span>Section</span>
                </div>

                <div>
                  <strong>{selectedSection.technology}</strong>
                  <span>Technology</span>
                </div>

                <div>
                  <strong>{selectedSection.species}</strong>
                  <span>Species</span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default MouseSpatial