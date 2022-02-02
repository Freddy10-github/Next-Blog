import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { marked } from 'marked';


const PostPage = ({frontmatter, content, slug}) => {
  const {title, date, cover_image} = frontmatter;
  return ( 
    <>
      <Link href='/'>
        <a className="btn btn-back">Go Back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <img src={cover_image} alt="" />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{__html: marked(content)}}></div>
        </div>
      </div>
    </>
   );
}
 
export default PostPage;

export async function getStaticProps({params: {slug}}) {
  const markdownMeta = fs.readFileSync(path.join('posts', slug+'.md'), 'utf-8')
  const {data: frontmatter, content} = matter(markdownMeta)
  return {
    props: {
      frontmatter,
      content,
      slug
    }
  };
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))
  const paths = files.map(filename => {
    return{
      params:{
        slug: filename.replace('.md', '')
      }
    }
  })
  return {
    paths,
    fallback: false
  };
}