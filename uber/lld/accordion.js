// .itemContainer {
//     margin: 2px;
//     font - family: 'Segoe UI', Tahoma, Geneva, Verdana, sans - serif;
// }

//   .itemContainer header {
//     background - color: rgb(244, 126, 63);
//     color: rgb(153, 56, 4);
//     height: 40px;
//     padding: 10px;
//     display: flex;
//     align - items: center;
//     cursor: pointer;
// }

//   .itemContainer section {
//     background - color: rgb(246, 158, 110);
//     color: rgb(153, 56, 4);
//     min - height: 100px;
//     padding: 10px;
//     align - items: center;
// }

//   .hidden {
//     display: none;
// }

//   .show {
//     display: block;
// }


import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

const DATA = [
    {
        title: 'Kolkata',
        description: 'City of joy',
    },
    {
        title: 'Mumbai',
        description: 'Financial capital of india',
    },
    {
        title: 'Jaipur',
        description: 'The pink city',
    },
]

const AccordionItem = React.memo(({ item }) => {
    const [open, setOpen] = useState(false)
    const toggle = React.useCallback(() => {
        setOpen((p) => !p)
    }, [])

    return (
        <div className="itemContainer" onClick={toggle}>
            <header>{item.title}</header>
            <section className={open ? 'show' : 'hidden'}>{item.description}</section>
        </div>
    )
})

function Accordion({ data }) {
    return (
        <div>
            {data.map((item) => {
                return <AccordionItem item={item} key={item.title} />
            })}
        </div>
    )
}

function App() {
    return <Accordion data={DATA} />
}

ReactDOM.render(<App />, document.getElementById('root'))
