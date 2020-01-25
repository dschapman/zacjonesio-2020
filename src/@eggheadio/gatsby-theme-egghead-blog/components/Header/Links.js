import React from 'react'
import { Link } from 'gatsby'
import { useTheme } from '@eggheadio/gatsby-theme-egghead-blog/src/components/Theming'
import ThemeToggler from '@eggheadio/gatsby-theme-egghead-blog/src/components/Header/ThemeToggler'

export default () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Link to="/" activeClassName="active" aria-label="View blog page">
        Blog
      </Link>
      <Link to="/about/" activeClassName="active" aria-label="View about page">
        About
      </Link>

      <ThemeToggler
        css={{}}
        toggleTheme={theme.toggleTheme}
        themeName={theme.themeName}
      />
    </React.Fragment>
  )
}