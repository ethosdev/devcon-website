import React, { useEffect } from 'react'
import { Session } from 'types/Session'
import css from './list.module.scss'
import { SessionCard } from 'components/domain/app/session'
import moment, { Moment } from 'moment'
import { CollapsedSection, CollapsedSectionContent, CollapsedSectionHeader } from 'components/common/collapsed-section'
import { ScheduleInformation, normalizeDate } from '../Schedule'
import ClockIcon from 'assets/icons/clock.svg'
import { ButtonOverlay } from 'components/domain/app/button-overlay'

interface ListProps extends ScheduleInformation {
  now?: Moment | null
}

export const List = (props: ListProps) => {
  const [openDays, setOpenDays] = React.useState({} as any)
  const normalizedNow = props.now ? normalizeDate(props.now) : ''

  const setNowOpen = React.useMemo(() => {
    return () => {
      if (normalizedNow) {
        const openState = {} as any

        openState[normalizedNow] = true

        setOpenDays(openState)
      }
    }
  }, [normalizedNow])

  useEffect(() => {
    setNowOpen()
  }, [setNowOpen])

  return (
    <div className={css['list']}>
      {props.sessionsByTime.map(({ date, timeslots }) => {
        // TODO: How/why is it ever null?
        if (date.readable === 'Invalid date') return null
        if (timeslots.length === 0) return null

        const dayIsNow = props.now && props.now.isSame(date.moment, 'day')

        return (
          <CollapsedSection
            sticky
            key={date.readable}
            open={openDays[date.readable]}
            setOpen={() => {
              const isOpen = openDays[date.readable]

              const nextOpenState = {
                ...openDays,
                [date.readable]: true,
              }

              if (isOpen) {
                delete nextOpenState[date.readable]
              }

              setOpenDays(nextOpenState)
            }}
          >
            <div className={css['anchor']} id={date.readable}></div>
            <CollapsedSectionHeader className={css['day-header']}>
              <p className="font-md-fixed bold">
                {date.moment ? date.moment.format('dddd, MMM Do') : date.readable}
                <span className={css['header-today-indicator']}>{dayIsNow && 'Today'}</span>
              </p>
            </CollapsedSectionHeader>
            <CollapsedSectionContent dontAnimate>
              {timeslots.map(({ time, sessions }) => {
                const startTime = moment.utc(time)
                const dateOfSession = startTime.format('MMM Do')
                const startTimeFormatted = startTime.format('h:mm A')

                if (dateOfSession !== date.readable) {
                  return null
                }
                if (startTimeFormatted === 'Invalid date') return null

                return (
                  <div key={time} className={css['timeslot']}>
                    <div className={css['start-time']}>{startTimeFormatted} UTC-5</div>

                    {sessions.map(session => {
                      return <SessionCard session={session} key={session.id} />
                    })}
                  </div>
                )
              })}
            </CollapsedSectionContent>
          </CollapsedSection>
        )
      })}

      <ButtonOverlay
        text="Today"
        onClick={() => {
          const nowElement = document.getElementById(`${normalizedNow}`)

          setNowOpen()

          nowElement?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <ClockIcon />
      </ButtonOverlay>
    </div>
  )
}