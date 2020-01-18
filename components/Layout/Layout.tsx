import * as React from 'react';
import Head from 'next/head';

type Props = {
  title?: string
}

/**
 * 
 * @param children react prop to apply elements to live within this card
 * @param title string page title
 */
const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Tech Challenge for Dept" />
    </Head>
    {children}
  </>
)

export default Layout
