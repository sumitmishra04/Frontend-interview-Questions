import React, { useEffect, useState } from "react";

const FetchData = ({ url, render }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then(setData);
    }, [url]);

    return render(data);
};

const App = () => {
    return (
        <FetchData url="https://jsonplaceholder.typicode.com/users" render={(data) => (
            data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <h2>Loading...</h2>
        )} />
    );
};

export default App;
