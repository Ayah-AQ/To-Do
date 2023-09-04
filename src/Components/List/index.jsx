import React, { useContext } from 'react';
import { settingsContext } from '../Context/Settings';
import { Pagination } from '@mantine/core';


export default function List({ list, toggleComplete }) {

const {ItemsInPage,currentPage,setCurrentPage} = useContext(settingsContext);


  const startIndex = (currentPage - 1) * ItemsInPage; 
  const endIndex = startIndex + ItemsInPage; 


  const itemsToDisplay = list.slice(startIndex, endIndex); 

 
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {itemsToDisplay.map((item) => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p>
            <small>Assigned to: {item.assignee}</small>
          </p>
          <p>
            <small>Difficulty: {item.difficulty}</small>
          </p>
          <button onClick={() => toggleComplete(item.id)} style={{cursor:"pointer"}}>
            Complete: {item.complete.toString()}
          </button>
          <hr />
        </div>
      ))}

      {list.length > ItemsInPage && (
        <Pagination
          total={Math.ceil(list.length / ItemsInPage)} 
          value={currentPage}
          onChange={handlePageChange}
          position="center"
          styles={(theme) => ({
            control: {
              '&[data-active]': {
                backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
                border: 0,
              },
            },
          })}
        />
      )}
    </div>
  );
}