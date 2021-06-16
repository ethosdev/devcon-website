import React from 'react'
import css from './page-hero.module.scss'
import { Link } from 'src/components/common/link'
import useGetElementHeight from 'src/hooks/useGetElementHeight'
import usePageCategory from './usePageCategory'
import useIsScrolled from 'src/hooks/useIsScrolled'
import { usePageContext } from 'src/context/page-context'
import ChevronLeft from 'src/assets/icons/chevron_left.svg'
import ChevronRight from 'src/assets/icons/chevron_right.svg'
import WatchIcon from 'src/assets/icons/local_play.svg'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

type NavigationLink = {
  to: string
  title: string
}

type CTALink = {
  to: string
  title: string
  icon: any
}

type PageHeroProps = {
  title?: string
  titleSubtext?: string
  scenes?: any[]
  background?: string
  cta?: Array<CTALink>
  renderCustom?(props?: any): JSX.Element
  navigation?: Array<NavigationLink>
}

export const PageHero = (props: PageHeroProps) => {
  const pageContext = usePageContext()
  const stripHeight = useGetElementHeight('strip')
  const headerHeight = useGetElementHeight('header')
  const pageHeaderHeight = useGetElementHeight('page-navigation')
  const pageHeroHeight = useGetElementHeight('page-hero')
  const negativeOffset = `-${pageHeroHeight - pageHeaderHeight - headerHeight}px`
  const pageCategory = usePageCategory()
  const isScrolled = useIsScrolled()
  const [currentScene, setCurrentScene] = React.useState(0)
  const hasScenes = !!props.scenes

  let style: any = {
    '--negative-offset': negativeOffset,
    '--strip-height': `${stripHeight}px`,
  }

  if (props.background) {
    style.backgroundImage = `url(${props.background})`
    style.backgroundSize = 'cover'
  }

  return (
    <div
      id="page-hero"
      className={`${css['hero']} ${props.background ? css['custom-background'] : ''} ${
        isScrolled ? css['scrolled'] : ''
      } ${hasScenes ? css['has-scenes'] : ''}`}
      style={style}
    >
      <div className="section">
        <div className={css['info']}>
          <p className={`${css['page-category']} font-xs text-uppercase`}>{pageCategory}</p>

          <div className={css['title-block']}>
            <h1 className={`${props.titleSubtext ? css['subtext'] : ''} font-massive-2`}>
              {props.title || pageContext?.current?.title}
              {props.titleSubtext && <span>{props.titleSubtext}</span>}
            </h1>

            {props.cta && (
              <div className={css['buttons']}>
                {props.cta.map((link: CTALink) => {
                  return (
                    <Link key={link.to + link.title} className="button white lg" to={link.to}>
                      {link.icon}
                      <span>{link.title}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {props.scenes && (
            <div className={css['scenes']}>
              {props.scenes.map((scene: any, i: number) => {
                const selected = i === currentScene

                let className = css['scene']

                if (selected) className += ` ${css['active']}`

                return (
                  <div key={i} className={className}>
                    {scene.content()}
                  </div>
                )
              })}

              <div className={css['controls-dots']}>
                {props.scenes.map((_: any, i: number) => {
                  const selected = i === currentScene

                  let className = css['dot']

                  if (selected) className += ` ${css['active']}`

                  return (
                    <div key={i} className={className} onClick={() => setCurrentScene(i)}>
                      <div className={css['circle']}></div>
                    </div>
                  )
                })}
              </div>

              <div className={css['controls']}>
                <button className={`red ${css['watch-now']}`}>
                  <span>WATCH NOW</span> <WatchIcon />{' '}
                </button>

                <div className={css['arrows']}>
                  <button
                    className={`${css['arrow']} red squared`}
                    disabled={currentScene === 0}
                    onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    className={`${css['arrow']} red squared`}
                    disabled={currentScene === props.scenes.length - 1}
                    onClick={() => setCurrentScene(Math.min(props.scenes.length - 1, currentScene + 1))}
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          )}

          {props.renderCustom && props.renderCustom()}

          {props.navigation && (
            <div id="page-navigation" className={css['page-navigation']}>
              {props.navigation &&
                props.navigation.map(link => {
                  return (
                    <Link
                      key={link.to + link.title}
                      to={link.to}
                      indicateExternal
                      className="font-xs bold text-uppercase"
                    >
                      {link.title}
                    </Link>
                  )
                })}
            </div>
          )}
        </div>
      </div>

      {props.scenes?.map((scene: any, i: number) => {
        const selected = i === currentScene

        let className = css['scene-background-image']

        if (selected) className += ` ${css['active']}`

        return (
          <div key={i} className={className}>
            <GatsbyImage image={getImage(scene.image)} {...scene.imageProps} placeholder="blurred" layout="fullWidth" />
          </div>
        )
      })}
    </div>
  )
}
