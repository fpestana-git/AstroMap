import { useLocation, useNavigate } from 'react-router-dom'

type AtlasNavbarProps = {
  species: 'mouse' | 'human'
}

function AtlasNavbar({ species }: AtlasNavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isMouse = species === 'mouse'

  function isActive(path: string) {
    if (path === `/${species}`) {
      return location.pathname === path
    }

    return location.pathname.startsWith(path)
  }

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <button
          className="logo-button"
          onClick={() => navigate('/')}
        >
          AstroMap
        </button>

        <div className="species-switcher">
          <button
            className={species === 'mouse' ? 'active' : ''}
            onClick={() => navigate('/mouse')}
          >
            Mouse
          </button>

          <button
            className={species === 'human' ? 'active' : ''}
            onClick={() => navigate('/human')}
          >
            Human
          </button>
        </div>
      </div>

      <nav>
        <button
          className={isActive(`/${species}`) ? 'active' : ''}
          onClick={() => navigate(`/${species}`)}
        >
          Overview
        </button>

        <button
          className={isActive(`/${species}/genes`) ? 'active' : ''}
          onClick={() => navigate(`/${species}/genes`)}
        >
          Genes
        </button>

        <button
          className={
            isActive(`/${species}/populations`) ? 'active' : ''
          }
          onClick={() => navigate(`/${species}/populations`)}
        >
          Populations
        </button>

        <button
          className={isActive(`/${species}/regions`) ? 'active' : ''}
          onClick={() => navigate(`/${species}/regions`)}
        >
          Brain regions
        </button>

        {isMouse && (
          <button
            className={isActive('/mouse/spatial') ? 'active' : ''}
            onClick={() => navigate('/mouse/spatial')}
          >
            Spatial
          </button>
        )}

        <button
          className={isActive(`/${species}/datasets`) ? 'active' : ''}
          onClick={() => navigate(`/${species}/datasets`)}
        >
          Datasets
        </button>
      </nav>
    </header>
  )
}

export default AtlasNavbar