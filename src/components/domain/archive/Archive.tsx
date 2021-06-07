import React from 'react'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import css from './archive.module.scss'
import { PageHero } from 'src/components/common/page-hero'
import { CuratedPlaylists, Playlists } from './playlists'
import { StaffPicks } from './staff-picks'
import { StaticImage } from 'gatsby-plugin-image'

type ArchiveProps = {}

export const Archive = (props: ArchiveProps) => {
  return (
    <div className={css['container']}>
      <SEO />
      <Header />

      <PageHero
        gallery={{
          scenes: [
            {
              render: () => {
                return (
                  <div className={css['hero-staff-picks']}>
                    <div className="label">Staff Pick</div>
                    <p>Ethereum in 25 minutes</p>
                    <p>Take a journey through the Ethereum consensus mechanism</p>

                    <div className={css['metadata']}>
                      <p>Vitalik Buterin</p>
                      <p>20:45</p>
                      <p>Devcon 2</p>
                    </div>

                    <div className={css['img']}>
                      <StaticImage
                        src={'../../../assets/images/vitalik.png'}
                        alt="Fellow: Benson Njuguna"
                        placeholder="blurred"
                        layout="fullWidth"
                      />
                    </div>
                  </div>
                )
              },
            },
            {
              render: () => {
                return (
                  <div>
                    <div className="label">Staff Pick</div>
                    <p>Ethereum in 25 minutes</p>
                    <p>Take a journey through the Ethereum consensus mechanism</p>
                  </div>
                )
              },
            },
            {
              render: () => {
                return (
                  <div>
                    <div className="label">Staff Pick</div>
                    <p>Ethereum in 25 minutes</p>
                    <p>Take a journey through the Ethereum consensus mechanism</p>
                  </div>
                )
              },
            },
          ],
        }}
        title="Archive"
        titleSubtext="Devcon"
      />

      <div className={`section ${css['tags']}`}>
        <div className="content">
          <h1>Tagging section</h1>
        </div>
      </div>
      <div className={css['staff-picks']}>
        <StaffPicks />
      </div>

      <div className={`section ${css['curated-playlists']}`}>
        <div className="content">
          <CuratedPlaylists items={[1, 2, 3, 4]} />
        </div>
      </div>
      <div className={`section ${css['playlists']}`}>
        <div className="content">
          <Playlists items={[1, 2, 3, 4, 5]} />
        </div>
      </div>

      <Footer />
    </div>
  )
}