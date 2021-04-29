import React from 'react'
import css from './menu.module.scss'
import { Link } from 'src/components/common/link'
import { Navigation } from './navigation'
import { usePageContext } from 'src/context/page-context'
import { Link as LinkType } from 'src/types/Link'
import { Foldout } from './foldout'
import AccountIcon from 'src/assets/icons/account.svg'
import { LanguageToggle } from 'src/components/common/layouts/header/strip/language-toggle'
/*
  Menu structure overview:

    <STRIP> <--- REUSED
      <NOTIFICATION> 
      <LANGUAGE-TOGGLE> <--- HIDDEN
    </STRIP>

    <HEADER> <--- REUSED
      <DEVCON-LOGO> <--- REUSED
      <LEFT-NAV> <--- HIDDEN
      <RIGHT-NAV> <--- HIDDEN
      <ACCOUNT> <--- REUSED
      <HAMBURGER> 
        <FOLDOUT>
          <LEFT-NAV>
          <LANGUAGE-TOGGLE>
          <RIGHT-NAV-AS-ACCORDION> <---- DUPLICATED + MODIFIED (SAME DATASET)
          <SOCIAL-MEDIA> <---- DUPLICATED + MODIFIED
        </FOLDOUT>
      </HAMBURGER>
    <HEADER>
*/

export const Account = (props: any) => {
  return (
    <div className={css['account']}>
      <Link to={'/account'}>
        <button className={`${css['desktop']} ${css['account-button']} white`}>
          <AccountIcon />
          <p>Account</p>
        </button>
      </Link>

      <AccountIcon className={`icon ${css['account-icon']} ${css['mobile']}`} />
    </div>
  )
}

export const Left = (props: any) => {
  return (
    <div className={css['left']}>
      {props.navigationData.top.map((i: LinkType) => {
        return (
          <Link key={`top-${i.url}`} external to={i.url} className={css['highlighted-link']}>
            {i.title}
          </Link>
        )
      })}
    </div>
  )
}

export const Menu = (props: any) => {
  const { navigation } = usePageContext()

  return (
    <div className={css['menu']}>
      <Left navigationData={navigation} />

      <div className={css['right']}>
        <Navigation navigationData={navigation} />
      </div>

      <Account />

      <Foldout foldoutOpen={props.foldoutOpen} setFoldoutOpen={props.setFoldoutOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Left navigationData={navigation} />
          <LanguageToggle />
        </div>
        <Navigation navigationData={navigation} mobile={true} />
      </Foldout>
    </div>
  )
}
