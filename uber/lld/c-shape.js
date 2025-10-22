// Use this data to create the shape
import { useState, useEffect, useRef } from 'react'
const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function getCellCount() {
  return BOX_DATA.reduce((acc, curr) => {
    return acc + curr.filter(Boolean).length
  }, 0)
}
export default function App() {
  const [idOrder, setIdOrder] = useState([]);
  let timerRef = useRef(null);
  const total = getCellCount()

  useEffect(() => {
    if (idOrder.length === total) {
      timerRef.current = setInterval(() => {
        setIdOrder((order) => {
          const newOrder = [...order].slice(0, -1)
          if (newOrder.length === 0) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          return newOrder
        })
      }, 1000)
    }
  }, [idOrder])

  const handleClick = (id, value) => {
    if (value && !idOrder.includes(id) && !timerRef.current) {
      setIdOrder([...idOrder, id])
    }
  }

  return <main>
      {BOX_DATA.map((row, index) => {
        return row.map((value, colIndex) => {
            const id = index + colIndex;
            const isSelected = idOrder.includes(id)
            return <div key={id} 
                        style={{ background: isSelected ? 'green' : 'white' }} 
                        onClick={() => handleClick(id, value)} 
                        className={value === 1 ? 'show' : 'hide'}>
                    </div>
        })
      })}
  </main>;
}


// .show {
//     width: 100px;
//     height: 100px;
//     border: 1px solid black;
//     margin: 5px;
//   }
  
//   .hide {
//     width: 100px;
//     height: 100px;
//     border: 1px solid white;
//     margin: 5px;
//   }
  
//   main {
//     display: flex;
//     flex-direction: column;
//   }
  
//   .row {
//     display: flex;
//   }