import React from 'react'
import { AppBar as CinderblockAppBar } from 'cinderblock'
import listingsLinkIcon from '../public/listings-link-icon.svg'
import resourcesLinkIcon from '../public/resource-link-icon.svg'
import knotelLinkIcon from '../public/knotel-link-icon.svg'
import { useCommonTranslation } from './i18n'

const AppBar = () => {
  const { t } = useCommonTranslation()

  const links = [
    {
      label: t('page.index.title'),
      href: `/`,
      as: `/`,
      icon: listingsLinkIcon,
    },
    {
      label: t('page.resources.title'),
      href: `/resources`,
      as: `/resources`,
      icon: resourcesLinkIcon,
    },
    {
      label: 'Knotel.com',
      href: '//www.knotel.com/?ref=Brokers',
      as: '//www.knotel.com/?ref=Brokers',
      prefetch: false,
      icon: knotelLinkIcon,
      target: '_blank',
      rel: 'noopener noreferrer',
    }
  ]

  return <CinderblockAppBar isSticky links={links} />
}

export default AppBar
