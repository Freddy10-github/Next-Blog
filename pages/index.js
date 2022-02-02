import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/post'
import { sortByDate } from '../utils'


export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>Dev blog</title>
      </Head>
      <div className='posts'>
        {
          posts.map((post, index) => {
            return (
              <Post key={index} post={post}/>
            )
          })
        }

      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const files = fs.readdirSync(path.join('posts'))
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '')
    const markdownMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )
    const {data: frontmatter} = matter(markdownMeta)
    return {
      slug,
      frontmatter
    }
  })
  return {
    props: {
      posts: posts.sort(sortByDate)
    }
  };
}