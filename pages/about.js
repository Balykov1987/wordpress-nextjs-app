import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function About( {page} ){
  // console.log({page});

  
  return(
    <div>
    <h1>{page.title}</h1>
    <div>
      {page.content}
    </div>
    <Image width={640} height={400} src={page.featuredImage.node.sourceUrl} alt={page.title}/>
    </div>
  )

}

export async function getStaticProps(){

  const res = await fetch('https://suncoat-of-texas.directline.company/graphql',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`
      query MyQuery {
        page(id: "about", idType: URI) {
          slug
          title
          content
          featuredImage {
            node {
              id
              sourceUrl
            }
          }
        }
      }
      `,
    })
  })

  const json = await res.json()

  return {
    props: {
      page: json.data.page,
    }
  }

}