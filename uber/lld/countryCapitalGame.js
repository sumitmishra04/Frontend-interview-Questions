import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";
const data = {
  "United States": "Washington, D.C.",
  France: "Paris",
  Japan: "Tokyo",
  India: "New Delhi",
  Brazil: "Brasília",
  Australia: "Canberra",
};

const generateListOfRandomNumsOfLenN = (n) => {
  const arr = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getList = (length, elements) => {
  return generateListOfRandomNumsOfLenN(length).map((index) => elements[index]);
};

const getElements = (data) => Object.entries(data).flat();

const getCapitalCountryData = (data) =>
  Object.entries(data).reduce((acc, [country, capital]) => {
    acc[capital] = country;
    return acc;
  }, {});

export default function App() {
  const [selectedElements, setSelectedElements] = useState([]);
  const [items, setItems] = useState([]);
  const elements = getElements(data);
  const length = elements.length;
  const reverseMap = getCapitalCountryData(data);
  const [error, setError] = useState("");
  const listItems = useMemo(() => getList(length, elements), []);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setItems(listItems);
  }, []);

  useEffect(() => {
    if (selectedElements.length === 2) {
      const [el1, el2] = selectedElements;
      console.log(el1, el2);
      if (data[el1] === el2 || reverseMap[el1] === el2) {
        setItems((prevItems) =>
          prevItems.filter((el) => !selectedElements.includes(el))
        );
        setSelectedElements([]);
        setScore((val) => val + 1);
      } else {
        setError("Game over");
      }
    }
  }, [selectedElements]);

  const setPair = (el) => {
    if (!error) {
      setSelectedElements((prev) => [...prev, el]);
    }
  };

  const onRestart = () => {
    setSelectedElements([]);
    setItems(listItems);
    setError("");
    setScore(0);
  };

  return (
    <div className="App">
      <button onClick={onRestart}>Restart</button>
      <br />
      <br />
      <button onClick={onRestart}>Score: {score}</button>
      <br />
      {items.length === 0 && <div>Congratulations</div>}
      <div>
        {items.map((el) => {
          return (
            <button
              style={{
                background: !selectedElements.includes(el)
                  ? "white"
                  : selectedElements.includes(el) && !error
                  ? "green"
                  : "red",
              }}
              onClick={() => setPair(el)}
            >
              {el}
            </button>
          );
        })}
      </div>
      <p>{error}</p>
    </div>
  );
}
