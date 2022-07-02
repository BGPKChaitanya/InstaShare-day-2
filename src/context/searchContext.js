import React from 'react'

const searchContext = React.createContext({
  searchInput: '',
  searchResultList: [],
  updateSRList: () => {},
  getPostList: () => {},
})

export default searchContext
