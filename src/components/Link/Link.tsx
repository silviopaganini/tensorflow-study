import React, { RefAttributes, PropsWithoutRef, ForwardRefExoticComponent } from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { NavLink as ThemeUILink, NavLinkProps as ThemedUILinkProps } from 'theme-ui'

/**
 * @see https://www.reactjunkie.com/theme-ui-react-router-link-typescript
 */

type ForwardRef<T, P> = ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

export type CustomLinkCombinedProps = ThemedUILinkProps & RouterLinkProps<{}>
export const CustomLink: ForwardRef<HTMLAnchorElement, CustomLinkCombinedProps> = ThemeUILink

const Link = ({ children, ...props }: CustomLinkCombinedProps) => {
  return (
    <CustomLink as={RouterLink} {...props}>
      {children}
    </CustomLink>
  )
}

export default Link
