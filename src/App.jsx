import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [articles, setArticles] = useState([])
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    fetch('https://reqres.in/api/users?per_page=4', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        setArticles(res.data)
        setPagination({
          page: +res.page,
          totalPages: res.total_pages
        })
      })
  }, [])

  const getNextPage = () => {
    fetch(`https://reqres.in/api/users?per_page=4&page=${pagination.page + 1}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        setArticles(res.data)
        setPagination({
          page: +res.page,
          totalPages: res.total_pages
        })
      })
  }

  const getPreviousPage = () => {
    fetch(`https://reqres.in/api/users?per_page=4&page=${pagination.page - 1}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        setArticles(res.data)
        setPagination({
          page: +res.page,
          totalPages: res.total_pages
        })
      })
  }

  return (
    <>
      <h2>React-WebServices</h2>
      <div className="main-articles">
        {
          articles.map(article => {
            return (
              <article key={article.id}>
                <h3>{article.first_name}</h3>
                <p>{article.last_name}</p>
              </article>
            )
          })
        }
      </div>
      <footer>
        {
          pagination.page > 1
          &&
          (
            <button onClick={getPreviousPage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
            </button>
          )
        }

        {
          pagination.page !== pagination.totalPages
          &&
          (
            <button onClick={getNextPage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
            </button>
          )
        }
      </footer>
    </>
  )
}

export default App
