import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Lists from '../components/Lists'
import Projects from '../components/Projects'
import SEO from '../components/SEO'
import SearchForm from '../components/SearchForm'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import projects from '../data/projects'
import interviews from '../data/interviews'
import speaking from '../data/speaking'

import tania from '../../content/images/tania-2020.png'

export default function BlogIndex({ data, ...props }) {
  const latest = data.latest.edges
  const popular = data.popular.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])

  const Section = ({ title, children, ...props }) => (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <section className="lead">
        <div>
          <h1>
            Hey! My name is <Link to="/me">Tania Rascia</Link>. I'm a software
            engineer and open-source creator.
          </h1>
          <p>
            This website is my digital garden&mdash;a compendium of the things I
            have learned over the years. I believe in having no ads, sponsored
            posts, or any of the rest of the annoying noise we're so accustomed
            to seeing on the internet these days.
          </p>
          <p>
            You can read my <Link to="/blog">blog</Link>, view my{' '}
            <Link to="/guides">guides &amp; tutorials</Link>, or contact{' '}
            <Link to="/me">me</Link> at <b>hello</b>@<b>taniarascia.com</b>.
          </p>
        </div>
        <div>
          <img src={tania} alt="Tania" />
        </div>
      </section>
      <Section title="Latest">
        <Posts data={simplifiedLatest} tags />
      </Section>
      <Section title="Popular">
        <Posts data={simplifiedPopular} tags />
      </Section>
      <Section title="Projects">
        <Projects data={projects} />
      </Section>
      <Section title="Interviews &amp; Podcasts" className="medium">
        <Lists data={interviews} />
      </Section>
      <Section title="Speaking" className="medium">
        <Lists data={speaking} />
      </Section>
      <Section title="Newsletter" className="small">
        <p>
          I sent out an email when I've created something new. Never any spam,
          easy unsubscribe whenever. Keep in touch!
        </p>
        <a
          href="https://taniarascia.substack.com/subscribe"
          target="_blank"
          rel="noreferrer"
          className="button"
        >
          Subscribe to the Email list
        </a>
      </Section>
      <Section title="Search" className="small">
        <p>Search anything in the blog.</p>
        <SearchForm {...props} />
      </Section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`