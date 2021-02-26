import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Flex, MenuButton } from 'theme-ui'
import { Link } from '..'
import Routes from '../../routes'

const Nav = () => {
  const location = useLocation()
  const [show, setVisibility] = useState<boolean>(false)

  return (
    <>
      <Flex
        as="nav"
        sx={{
          zIndex: 100,
          flexDirection: 'column',
          px: 3,
          py: [5, 5, 4],
          background: 'linear-gradient(180deg, #111 0%, #222 100%)',
          position: ['fixed', 'fixed', 'relative'],
          minHeight: '100vh',
          minWidth: ['100vw', '100vw', '230px'],
          width: '230px',
          transition: '0.2s left ease-out',
          left: [show ? 0 : '-100%', show ? 0 : '-100%', '0'],
        }}
      >
        {Routes.map(r => {
          return (
            <Link
              key={r.name}
              variant="links.nav"
              onClick={() => {
                setVisibility(false)
              }}
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
      <MenuButton
        onClick={() => {
          setVisibility(!show)
        }}
        sx={{
          zIndex: 101,
          position: 'fixed',
          top: 2,
          left: 2,
          display: ['block', 'block', 'none'],
        }}
      />
    </>
  )
}

export default Nav
