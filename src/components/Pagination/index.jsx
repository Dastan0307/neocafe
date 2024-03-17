import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate'
import styles from './pagination.module.scss'
// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div key={index}>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  )
}
export default function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage
  console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    )
    setItemOffset(newOffset)
  }

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        activeClassName={styles.selected}
        nextClassName={styles.next}
        previousClassName={styles.previous}
      />
    </>
  )
}
