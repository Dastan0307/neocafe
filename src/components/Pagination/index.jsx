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
  const [itemOffset, setItemOffset] = useState(0)
  const endOffset = itemOffset + itemsPerPage
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`)
  const currentItems = items.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(items.length / itemsPerPage)
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`,
    // )
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

