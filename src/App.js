import React from 'react';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
    },
    {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
    }
]



function App() {
  
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <label htmlFor="search">Search</label>
      <input id='search' type='text'/>
      <hr/>
      <ul>
    {list.map(e=>{
    return(
      <li key={e.objectID}>
        <span><a href={e.url}>{e.title}</a></span>
        <span>{e.author}</span>
        <span>{e.num_comments}</span>
        <span>{e.points}</span>
      </li>
    )
    })}
    </ul>
    </div>
  )
};

export default App;
