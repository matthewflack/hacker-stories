import React from 'react';

{/*Completed up to pg 58.... need to commit / add that work.*/} 

{/*------------------------------------------------------ */}

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  
  React.useEffect(() => {
    localStorage.setItem(key, value);
    }, [value, key]);
    return [value, setValue];
};

{/*------------------------------------------------------ */}

const App= () => {

  const initialStories = [
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
  ];

const getAsyncStories = () =>
  new Promise(resolve =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      2000
    )
  );

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','React');
  const [stories, setStories] = React.useState([]);

  React.useEffect(() => {
    getAsyncStories().then(result => {
    setStories(result.data.stories);
    });
    }, []);

  const handleRemoveStory = item => {
      const newStories = stories.filter(
        story => item.objectID !== story.objectID
      );
      setStories(newStories);
    };

  const handleSearch = event =>{
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter(story=>{
    return story.title.toLowerCase().includes(searchTerm.toLowerCase())
  });

return(
    
    <div>
      <h1>My Hacker Stories</h1>
        
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search</strong>
      </InputWithLabel>
      <hr/>
      
        <List list = {searchedStories} onRemoveItem={handleRemoveStory}/>
    </div>
  )};

{/*------------------------------------------------------ */}
{/*isFocused = false sets Input to not receive focus on render*/}

const InputWithLabel = ({ id, value, type = 'text',isFocused, onInputChange, children }) => {

  //A
  const inputRef = React.useRef();
  
  
  //C
  React.useEffect(() => {
      if (isFocused) {
        // D
        inputRef.current.focus();
  
      }
    }, [isFocused]
  );
    
    return(
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      {/* B */}
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
    </>
  )};

{/*------------------------------------------------------ */}


const List= ({list, onRemoveItem}) => (
  list.map(item => <Item 
    key={item.objectID} 
    item ={item} 
    onRemoveItem={onRemoveItem}
    />)
  );

{/*------------------------------------------------------ */}

const Item =({item,onRemoveItem})=>{ 
const handleRemoveItem = ()=> {
  onRemoveItem(item);
}
return(
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
    <button type="button" onClick={handleRemoveItem}>
      Dismiss
    </button>
    </span>
  </div>
)};

{/*------------------------------------------------------ */}

export default App;

