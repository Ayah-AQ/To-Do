import React, { useContext, useEffect } from 'react';
import { settingsContext } from '../Context/Settings';
import { Pagination } from '@mantine/core';
import Auth from '../Auth';


export default function List({ list, toggleComplete }) {

const { itemsInPage, showCompleted, updateItemsInPage, toggleShowCompleted,currentPage,setCurrentPage, setShowCompleted, incomplete} = useContext(settingsContext);


  const startIndex = (currentPage - 1) * itemsInPage; 
  const endIndex = startIndex + itemsInPage; 

  // const itemsToDisplay = list.slice(startIndex, endIndex); 

   const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

 
    const itemsToDisplay = list
    .filter((item) => (showCompleted ? true : !item.complete))
    .slice(startIndex, endIndex);



  useEffect(() => {
    updateItemsInPage(itemsInPage);
    toggleShowCompleted(showCompleted);
  }, [itemsInPage, showCompleted]);
 
  return (
    <div>
    {/* <form >

      <label>
        Items In Page:
        <input
            type="number"
            value={itemsInPage}
            onChange={(e) => updateItemsInPage(Number(e.target.value))}
          />
      </label>

      <label>
        Show Completed:
        <input type="checkbox" checked={showCompleted}  onChange={() => setShowCompleted(!showCompleted)}
/>
      </label>
</form> */}
    
        {/* <Auth capability="read">  */}
        {itemsToDisplay.map((item) => (
          <div key={item.id}>
            {/* ... */}
            <button onClick={() => toggleComplete(item.id)} style={{ cursor: "pointer", backgroundColor: item.complete ? 'green' : 'red', color: 'white' }}>
              Complete: {item.complete.toString()}
            </button>
            <hr />
          </div>
        ))}
      {/* </Auth> */}
      {list.length > itemsInPage && (
        <Pagination
          total={Math.ceil(list.length / itemsInPage)}
          value={currentPage}
          onChange={handlePageChange}
          position="center"
          styles={(theme) => ({
            control: {
              '&[data-active]': {
                backgroundImage: theme.fn.gradient({ from: 'pink', to: 'purple' }),
                border: 0,
              },
            },
          })}
        />
      )}
    </div>
  );
}