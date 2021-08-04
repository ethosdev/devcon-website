import React from 'react'
import { useEfTalks } from 'src/hooks/useEfTalks'
import { useLatest } from 'src/hooks/useLatest'
import { useMostPopular } from 'src/hooks/useMostPopular'
import css from './playlists.module.scss'
import { useStaffPicks } from 'src/hooks/useStaffPicks'
import { VideoCard } from './VideoCard'
import { Slider, useSlider } from 'src/components/common/slider'
import { PlaylistCard } from './Curated'
import { Playlist } from 'src/types/Playlist'

function getSliderSettings(nItems: number) {
  return {
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(nItems, 4),
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 100,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(nItems, 3),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(nItems, 1.1),
        },
      },
    ],
  }
}


function limit15(entries: any[], playlist: Playlist, canSlide: boolean) {
  if (entries.length > 15) {
    return [
      ...entries.slice(0, 15),
      {
        playlist: true,
        render: () => (
          <PlaylistCard
            key="plist"
            small
            playlist={playlist}
            canSlide={canSlide}
          />
        )
      }
    ];
  }

  return entries;
}

export const Playlists = () => {
  const mostPopular = useMostPopular()
  const latest = useLatest()
  const efTalks = useEfTalks()

  const sliderPropsMostPopular = useSlider(getSliderSettings(mostPopular.videoCount));
  const sliderPropsLatest = useSlider(getSliderSettings(latest.videoCount));
  const sliderPropsEFTalks = useSlider(getSliderSettings(efTalks.videoCount));

  return (
    <div className="section">
      <div className="content">
        <div className={css['playlists']}>
          <div className="margin-top border-top padding-bottom">
            <Slider className={css['slider']} sliderProps={sliderPropsMostPopular} title="Most Popular">
              {limit15(mostPopular.videos, mostPopular, sliderPropsMostPopular[1].canSlide).map((item: any, i: number) => {
                if (item.playlist) return item.render();

                const first = i === 0
                let className = first ? css['first'] : ''

                return (
                  <VideoCard
                    slide
                    playlist={mostPopular}
                    canSlide={sliderPropsMostPopular[1].canSlide}
                    key={i}
                    className={className}
                    video={item}
                  />
                )
              })}
            </Slider>
          </div>

          <div className="border-top padding-bottom">
            <Slider className={css['slider']} sliderProps={sliderPropsLatest} title="Devcon 5">
              {limit15(latest.videos, latest, sliderPropsLatest[1].canSlide).map((item: any, i: number) => {
                if (item.playlist) return item.render();
                
                const first = i === 0
                let className = first ? css['first'] : ''

                return (
                  <VideoCard
                    playlist={latest}
                    slide
                    canSlide={sliderPropsLatest[1].canSlide}
                    key={i}
                    className={className}
                    video={item}
                  />
                )
              })}
            </Slider>
          </div>

          <div className="border-top padding-bottom">
            <Slider className={css['slider']} sliderProps={sliderPropsEFTalks} title="EF Talks">
              {limit15(efTalks.videos, efTalks, sliderPropsEFTalks[1].canSlide).map((item: any, i: number) => {
                if (item.playlist) return item.render();

                const first = i === 0
                let className = first ? css['first'] : ''

                return (
                  <VideoCard
                    slide
                    playlist={efTalks}
                    canSlide={sliderPropsEFTalks[1].canSlide}
                    key={i}
                    className={className}
                    video={item}
                  />
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export const StaffPicks = (props: any) => {
  const staffPicks = useStaffPicks()

  const sliderSettings = {
    infinite: false,
    touchThreshold: 100,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 3,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const sliderProps = useSlider(sliderSettings)

  return (
    <div className="section">
      <div className="content">
        <div className="padding-bottom border-top">
          <Slider className={css['slider']} sliderProps={sliderProps} title="Staff Picks">
            {staffPicks.videos.map(i => {
              let className = ''

              return (
                <VideoCard
                  key={i.id}
                  playlist={staffPicks}
                  slide
                  canSlide={sliderProps[1].canSlide}
                  video={i}
                  className={className}
                />
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}