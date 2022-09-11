import { AppLayout } from 'components/domain/app/Layout'
import { Session } from 'components/domain/app/session'
import { pageHOC } from 'context/pageHOC'
import React from 'react'
import { GetSessions, GetSpeakers } from 'services/programming'
import { DEFAULT_APP_PAGE, DEFAULT_REVALIDATE_PERIOD } from 'utils/constants'
import { getGlobalData } from 'services/global'

export default pageHOC((props: any) => {
  return (
    <AppLayout>
      <Session {...props} />
    </AppLayout>
  )
})

export async function getStaticPaths() {
  const sessions = await GetSessions()
  const paths = sessions.map(i => {
    return { params: { id: i.id }, locale: 'en' }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  const session = (await GetSessions()).find(i => i.id === context.params.id)

  if (!session) {
    return {
      props: null,
      notFound: true,
      revalidate: DEFAULT_REVALIDATE_PERIOD,
    }
  }

  return {
    props: {
      ...(await getGlobalData(context.locale, true)),
      page: DEFAULT_APP_PAGE,
      session,
    },
  }
}