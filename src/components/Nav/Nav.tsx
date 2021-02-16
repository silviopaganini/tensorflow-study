import { useLocation } from 'react-router-dom'
import { Flex } from 'theme-ui'
import { Link } from '..'
import Routes from '../../routes'

const Nav = () => {
  const location = useLocation()

  return (
    <Flex as="nav" sx={{ px: 3, py: 4, bg: 'muted' }}>
      {Routes.map(r => (
        <Link key={r.name} variant={location.pathname === r.path ? 'navActive' : 'nav'} to={r.path}>
          {r.name}
        </Link>
      ))}
    </Flex>
  )
}

export default Nav
