import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  
  return (
    <section className='landingsec'>
      <article className='articlesec'>
        <Link to='/home'><button>Get Start</button></Link>
      </article>
    </section>
  )
}

export default Landing