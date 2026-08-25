import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'

import MouseAtlas from './pages/MouseAtlas'
import HumanAtlas from './pages/HumanAtlas'
import MouseGenes from './pages/MouseGenes'
import MousePopulations from './pages/MousePopulations'
import MousePopulationDetail from './pages/MousePopulationDetail'
import MouseRegions from './pages/MouseRegions'
import MouseRegionDetail from './pages/MouseRegionDetail'
import MouseSpatial from './pages/MouseSpatial'
import MouseDatasets from './pages/MouseDatasets'
import HumanGenes from './pages/HumanGenes'
import HumanPopulations from './pages/HumanPopulations'
import HumanPopulationDetail from './pages/HumanPopulationDetail'
import HumanRegions from './pages/HumanRegions'
import HumanRegionDetail from './pages/HumanRegionDetail'
import HumanDatasets from './pages/HumanDatasets'

function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="app">
      <header className="navbar">
        <button
          className="logo-button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          AstroMap
        </button>

<nav>
  <button onClick={() => navigate('/mouse')}>
    Mouse atlas
  </button>

  <button onClick={() => navigate('/human')}>
    Human atlas
  </button>

  <button
    onClick={() =>
      document
        .getElementById('about')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  >
    About
  </button>
</nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Mouse & human astrocyte atlas</p>

          <h1>AstroMap</h1>

          <p className="subtitle">
            A transcriptomic and spatial resource to explore astrocyte
            heterogeneity across the mouse and human brain.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate('/mouse')}>
              Explore mouse atlas
            </button>

            <button onClick={() => navigate('/human')}>
              Explore human atlas
            </button>
          </div>
        </section>

        <section className="species-selector">
          <article className="species-card">
            <span className="species-label">Mouse</span>

            <h2>Mouse Astrocyte Atlas</h2>

            <p>
              Explore transcriptomic and spatial astrocyte diversity across
              the mouse brain.
            </p>

            <ul className="species-features">
              <li>Gene Explorer</li>
              <li>Astrocyte populations</li>
              <li>Brain regions</li>
              <li>Spatial atlas</li>
              <li>Datasets</li>
            </ul>

            <button onClick={() => navigate('/mouse')}>
              Enter mouse atlas <span>→</span>
            </button>
          </article>

          <article className="species-card">
            <span className="species-label">Human</span>

            <h2>Human Astrocyte Atlas</h2>

            <p>
              Explore astrocyte diversity across human brain datasets,
              regions and transcriptional states.
            </p>

            <ul className="species-features">
              <li>Gene Explorer</li>
              <li>Astrocyte populations</li>
              <li>Brain regions</li>
              <li>Datasets</li>
            </ul>

            <button onClick={() => navigate('/human')}>
              Enter human atlas <span>→</span>
            </button>
          </article>
        </section>

        <section className="about-section" id="about">
          <div className="about-content">
            <div>
              <p className="section-eyebrow">About AstroMap</p>

              <h2>
                A unified resource for exploring astrocyte diversity
              </h2>
            </div>

            <div className="about-text">
              <p>
                AstroMap integrates single-cell and spatial transcriptomic
                datasets to provide a unified view of astrocyte heterogeneity
                across the mouse and human brain.
              </p>

              <p>
                The atlas enables exploration of gene expression, astrocyte
                populations, anatomical distributions and the datasets
                contributing to each atlas.
              </p>
            </div>
          </div>
        </section>


      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mouse" element={<MouseAtlas />} />
      <Route path="/mouse/genes" element={<MouseGenes />} />
      <Route
        path="/mouse/populations"
        element={<MousePopulations />}
      />
      <Route
        path="/mouse/populations/:populationId"
        element={<MousePopulationDetail />}
      />
      <Route
        path="/mouse/regions"
        element={<MouseRegions />}
      />
      <Route
        path="/mouse/regions/:regionId"
        element={<MouseRegionDetail />}
      />
      <Route
        path="/mouse/spatial"
        element={<MouseSpatial />}
      />
      <Route
        path="/mouse/datasets"
        element={<MouseDatasets />}
      />
      <Route path="/human" element={<HumanAtlas />} />
      <Route path="/human/genes" element={<HumanGenes />} />
      <Route
        path="/human/populations"
        element={<HumanPopulations />}
      />
      <Route
        path="/human/populations/:populationId"
        element={<HumanPopulationDetail />}
      />
      <Route
        path="/human/regions"
        element={<HumanRegions />}
      />
      <Route
        path="/human/regions/:regionId"
        element={<HumanRegionDetail />}
      />
      <Route
        path="/human/datasets"
        element={<HumanDatasets />}
      />
    </Routes>
  )
}

export default App
