import { useLocation } from 'react-router-dom'
import { Flex } from 'theme-ui'
import { Link } from '..'
import Routes from '../../routes'

const Nav = () => {
  const location = useLocation()

  return (
    <Flex
      as="nav"
      sx={{
        flexDirection: 'column',
        px: 3,
        py: 4,
        background: 'linear-gradient(180deg, #111 0%, #222 100%)',
        minHeight: '100vh',
        minWidth: '230px',
        width: '230px',
      }}
    >
      {Routes.map(r => {
        return (
          <Link
            key={r.name}
            variant="links.nav"
            sx={{
              color: location.pathname === r.path ? 'green' : 'primary',
              pointerEvents: location.pathname === r.path ? 'none' : 'visible',
            }}
            to={r.path}
          >
            {r.name}
          </Link>
        )
      })}
    </Flex>
  )
}

export default Nav
