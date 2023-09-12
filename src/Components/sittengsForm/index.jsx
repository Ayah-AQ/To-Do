import React, { useContext, useEffect } from 'react';
import { settingsContext } from '../Context/Settings';
import useForm from '../../hooks/form';


export default function SettingForm() {
  const { itemsInPage, showCompleted, setItemsInPage, toggleShowCompleted, setShowCompleted } = useContext(settingsContext);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    callback({...values});
  };
 
  useEffect(() => {
    setItemsInPage(itemsInPage);
    toggleShowCompleted(showCompleted);
  }, [itemsInPage, showCompleted]);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Items In Page:
          <input
            type="number"
            value={itemsInPage}
            onChange={(e) => setItemsInPage(Number(e.target.value))}
          />
        </label>

        <label>
          Show Completed:
          <input type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />
        </label>
      </form>
    </div>
  );
}
