import AtlasNavbar from '../components/AtlasNavbar'
import { useNavigate } from 'react-router-dom'

function HumanAtlas() {
  const navigate = useNavigate()

  return (
    <div className="atlas-page">
      <AtlasNavbar species="human" />

      <main>
        <section className="atlas-hero">
          <p className="eyebrow">Human atlas</p>

          <h1>Human Astrocyte Atlas</h1>

          <p className="subtitle">
            Explore astrocyte diversity across human brain datasets,
            anatomical regions and transcriptional states.
          </p>
        </section>

        <section className="atlas-tools">
          <article className="atlas-tool-card">
            <span className="card-number">01</span>

            <h2>Genes</h2>

            <p>
              Search genes and explore their expression across human
              astrocyte populations and brain regions.
            </p>

            <button onClick={() => navigate('/human/genes')}>
              Explore genes <span>→</span>
            </button>
          </article>

          <article className="atlas-tool-card">
            <span className="card-number">02</span>

            <h2>Astrocyte populations</h2>

            <p>
              Explore human astrocyte populations, transcriptional
              states and marker genes.
            </p>

            <button onClick={() => navigate('/human/populations')}>
              Explore populations <span>→</span>
            </button>
          </article>

          <article className="atlas-tool-card">
            <span className="card-number">03</span>

            <h2>Brain regions</h2>

            <p>
              Explore regional differences in astrocyte composition
              across the human brain.
            </p>

            <button onClick={() => navigate('/human/regions')}>
              Explore regions <span>→</span>
            </button>
          </article>

          <article className="atlas-tool-card">
            <span className="card-number">04</span>

            <h2>Datasets</h2>

            <p>
              Explore the studies, donors, technologies and samples
              contributing to the Human Astrocyte Atlas.
            </p>

            <button onClick={() => navigate('/human/datasets')}>
              Explore datasets <span>→</span>
            </button>
          </article>
        </section>
      </main>
    </div>
  )
}

export default HumanAtlas
