import AtlasNavbar from '../components/AtlasNavbar'
import { useEffect, useState } from 'react'

type Dataset = {
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

function HumanDatasets() {

  const [datasets, setDatasets] = useState<Dataset[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    async function loadDatasets() {
      try {
        const response = await fetch(
          `${import.meta.env.BASE_URL}data/human/datasets.json`,
        )

        if (!response.ok) {
          throw new Error('Could not load human dataset data')
        }

        const data: Dataset[] = await response.json()

        setDatasets(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoadError(true)
        setLoading(false)
      }
    }

    loadDatasets()
  }, [])

  return (
    <div className="atlas-page">
      <AtlasNavbar species="human" />

      <main>
        <section className="gene-hero">
          <p className="eyebrow">Human atlas</p>

          <h1>Datasets</h1>

          <p>
            Explore the studies, technologies and samples contributing
            to the Human Astrocyte Atlas.
          </p>
        </section>

        <section className="population-browser">
          {loading && <p>Loading datasets...</p>}

          {loadError && (
            <p>Human dataset information could not be loaded.</p>
          )}

          {!loading && !loadError && (
            <div className="dataset-grid">
              {datasets.map((dataset) => (
                <article className="dataset-card" key={dataset.id}>
                  <div className="dataset-card-header">
                    <span className="dataset-year">
                      {dataset.year}
                    </span>

                    <span className="dataset-assay">
                      {dataset.assay}
                    </span>
                  </div>

                  <h2>{dataset.name}</h2>

                  <p className="dataset-technology">
                    {dataset.technology}
                  </p>

                  <p className="dataset-coverage">
                    {dataset.coverage}
                  </p>

                  <div className="dataset-metrics">
                    <div>
                      <strong>{dataset.nLibraries}</strong>
                      <span>Libraries</span>
                    </div>

                    <div>
                      <strong>
                        {dataset.nCells.toLocaleString()}
                      </strong>
                      <span>Cells</span>
                    </div>
                  </div>

                  <div className="dataset-reference">
                    <span>Reference</span>
                    <p>{dataset.reference}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default HumanDatasets
