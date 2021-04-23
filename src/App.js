import React from 'react';

{/*Completed up to pg 92.... need to commit / add that work.*/} 

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

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
        story => action.payload.objectID !== story.objectID
        ),
      };
    default:
    throw new Error();
    }
  };

  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

{/*------------------------------------------------------ */}

const App= () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','React');

  const [stories, dispatchStories] = React.useReducer(storiesReducer,{data:[], isLoading:false, isError:false});
  
 
  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(`${API_ENDPOINT}react`) // B
      .then(response => response.json()) // C
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits, // D
        });
       })
    .catch(() =>
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    );
    }, []);


  const handleRemoveStory = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = event =>{
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.data.filter(story=>{
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
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (<p>Loading...</p>) : (

        <List list = {searchedStories} onRemoveItem={handleRemoveStory}/>

      )}
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

