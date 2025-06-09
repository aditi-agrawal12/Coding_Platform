import React from 'react';

const storeItems = [
  { id: 1, name: "Custom Avatar", cost: 100 },
  { id: 2, name: "Premium Badge", cost: 250 },
  { id: 3, name: "Exclusive Theme", cost: 150 },
  { id: 4, name: "Problem Hint", cost: 50 },
];

function Store({ coins, onClose, onRedeem }) {
  const handleRedeem = (item) => {
    const success = onRedeem(item.cost);
    if (success) {
      alert(`You've redeemed ${item.name}!`);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className="store-modal">
      <div className="store-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Code Store</h2>
        <p className="balance">Your balance: {coins} coins</p>
        
        <div className="store-items">
          {storeItems.map(item => (
            <div key={item.id} className="store-item">
              <h3>{item.name}</h3>
              <p>{item.cost} coins</p>
              <button 
                onClick={() => handleRedeem(item)}
                disabled={coins < item.cost}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Store;