import { useNavigate } from 'react-router-dom'

function MouseAtlas() {
  const navigate = useNavigate()

  return (
    <div className="atlas-page">
      <header className="navbar">
        <button className="logo-button" onClick={() => navigate('/')}>
          AstroMap
        </button>

        <nav>
          <button>Overview</button>
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
          <button onClick={() => navigate('/mouse/datasets')}>
            Datasets
          </button>
        </nav>
      </header>

      <main>
        <section className="atlas-hero">
          <p className="eyebrow">Mouse atlas</p>

          <h1>Mouse Astrocyte Atlas</h1>

          <p className="subtitle">
            Explore transcriptomic and spatial astrocyte diversity
            across the mouse brain.
          </p>
        </section>

        <section className="atlas-tools">
          <article className="atlas-tool-card">
            <span className="card-number">01</span>
            <h2>Genes</h2>
            <p>
              Search genes and explore their expression across astrocyte
              populations and anatomical regions.
            </p>
            <button onClick={() => navigate('/mouse/genes')}>
              Explore genes <span>→</span>
            </button>
          </article>

          <article className="atlas-tool-card">
            <span className="card-number">02</span>
            <h2>Astrocyte populations</h2>
            <p>
              Explore consensus astrocyte populations, marker genes and
              anatomical distributions.
            </p>
            <button onClick={() => navigate('/mouse/populations')}>
              Explore populations <span>→</span>
            </button>
          </article>

          <article className="atlas-tool-card">
            <span className="card-number">03</span>
            <h2>Brain regions</h2>
            <p>
              Explore regional astrocyte diversity across the mouse brain.
            </p>
            <button onClick={() => navigate('/mouse/regions')}>
              Explore regions <span>→</span>
            </button>
          </article>

          <article className="atlas-tool-card">
            <span className="card-number">04</span>
            <h2>Spatial atlas</h2>
            <p>
              Explore spatial distributions of genes and astrocyte
              populations across brain sections.
            </p>
            <button onClick={() => navigate('/mouse/spatial')}>
              Explore spatial data <span>→</span>
            </button>
          </article>
        </section>
      </main>
    </div>
  )
}

export default MouseAtlas