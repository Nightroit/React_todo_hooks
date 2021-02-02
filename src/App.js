import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([
		{itemName: "Nietzsche", quantity: 1, isSelected: false},
		{itemName: "Satra", quantity: 1, isSelected: false},
		{itemName: "Kafka", quantity: 1, isSelected: false},
	]);

  const [inputValue, setInputValue] = useState('');
  const [totalItemCount, setTotalItemCount] = useState(3);
	
  const calculateTotal = () => {
	const totalItemCount = items.reduce((total, item) => {
		return total + item.quantity
	}, 0);
	setTotalItemCount(totalItemCount);
}
	

  const handleAddButtonClick = () =>{
	  const newItem = {
		  itemName: inputValue,
		  quantity: 1, 
		  isSelected: false
	  }
	  const newItems = [...items, newItem];
	  setItems(newItems);
	  setInputValue('');
	  calculateTotal()
  }

  const handleQuantityIncrease = (index) => {
	  const newItems = [...items];
	  newItems[index].quantity++;;
	  setItems(newItems);
	  calculateTotal()
  }
  const handleQuantityDecrease = (index) => {
	  const newItems = [...items];
	  if(newItems[index].quantity > 0)
		  newItems[index].quantity--;
		  setItems(newItems);
		  calculateTotal()
  }

  const onSelectCheck = (index) => {
	  const newItems = [...items];
	  console.log(newItems[index]);
	  newItems[index].isSelected = !(newItems[index].isSelected);
	  newItems[index].quantity = 0;
	  setItems(newItems)
	  calculateTotal()
  }

	return (
		
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value = {inputValue} 
					onChange = {(event) => setInputValue(event.target.value)}
					className='add-item-input' placeholder='Add an item...' />
					<FontAwesomeIcon icon={faPlus} onClick = {()=> handleAddButtonClick()} />
				</div>
				<div className='item-list'>
          {items.map((e, i) => 			
          <div className='item-container'   >
						<div className='item-name' >
							{/* HINT: replace false with a boolean indicating the item has been completed or not */}
							{e.isSelected ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} onClick = {() => onSelectCheck(i)}/>
									<span className='completed' >{e.itemName}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle}
									onClick = {() => onSelectCheck(i)} />
									<span>{e.itemName}</span>
								</>
							)}
						</div>
						<div className='quantity'>
							<button>
								<FontAwesomeIcon icon={faChevronLeft} onClick 
								 = {() => handleQuantityDecrease(i)}/>
							</button>
							<span>{e.quantity} </span>
							<button>
								<FontAwesomeIcon icon={faChevronRight} onClick = {() => handleQuantityIncrease(i)} />
							</button>
						</div>
					</div>)
          }
				</div>
				<div className='total'>Total: {totalItemCount}</div>
			</div>
		</div>
	);
};

export default App;