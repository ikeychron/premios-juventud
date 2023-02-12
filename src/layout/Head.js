import NextHead from "next/head"
import { string } from "prop-types"
import { colors } from "../theme/index"

const title = "Premios Juventud"
const URL = process.env.NEXT_PUBLIC_URI
const description = "App para votar por los nominados en los Premios Juventud"
const ogImage = "/cup.png"

const Head = () => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="keywords" content="firebase, next, app, votes, rewards" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    {/* PWA primary color */}
    <meta name="theme-color" content={colors.secondary[600]} />

    {/* Helps prevent duplicate content issues */}
    <link rel="canonical" href={URL} />

    {/* Name of web application (only should be used if the website is used as an app) */}
    <meta name="application-name" content={title} />

    {/* Control the behavior of search engine crawling and indexing */}
    <meta name="robots" content="index,follow" />
    {/* All Search Engines */}
    <meta name="googlebot" content="index,follow" />
    {/* Google Specific */}

    {/* Tells Google not to show the sitelinks search box */}
    <meta name="google" content="nositelinkssearchbox" />

    {/* Tells Google not to provide a translation for this document */}

    <meta name="google" content="notranslate" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="shortcut icon" href="/favicon.ico" />

    <meta property="og:site_name" content={title} />
    <meta property="og:type" content="website" />
    <meta name="og:url" content={URL} />
    <meta name="og:title" content={title} />
    <meta name="og:description" content={description} />
    <meta name="omg:image" content={ogImage} />
    <meta property="og:image:alt" content={title} />
    <meta name="omg:image:width" content="1200" />
    <meta name="omg:image:height" content="630" />
    <meta name="twitter:site" content={URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage} />
  </NextHead>
)

Head.propTypes = {
  title: string,
}

export default Head
