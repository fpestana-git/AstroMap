import { useNavigate } from 'react-router-dom'

type AtlasNavbarProps = {
  species: 'mouse' | 'human'
}

function AtlasNavbar({ species }: AtlasNavbarProps) {
  const navigate = useNavigate()

  const isMouse = species === 'mouse'

  return (
    <header className="navbar">
      <button
        className="logo-button"
        onClick={() => navigate('/')}
      >
        AstroMap
      </button>

      <nav>
        <button onClick={() => navigate(`/${species}`)}>
          Overview
        </button>

        <button onClick={() => navigate(`/${species}/genes`)}>
          Genes
        </button>

        <button onClick={() => navigate(`/${species}/populations`)}>
          Populations
        </button>

        <button onClick={() => navigate(`/${species}/regions`)}>
          Brain regions
        </button>

        {isMouse && (
          <button onClick={() => navigate('/mouse/spatial')}>
            Spatial
          </button>
        )}

        <button onClick={() => navigate(`/${species}/datasets`)}>
          Datasets
        </button>
      </nav>
    </header>
  )
}

export default AtlasNavbar
