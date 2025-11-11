async function fetcher(id) {
  return new Promise((res) => {
    const timer = Math.floor(Math.random() * 2000);

    setTimeout(() => {
      res("User " + id);
    }, timer);
  });
}

// ["User 1", "User 2", "User 3", "User 4", "User 5"]
async function fetchRecords(ids) {
  const result = [];
  for (let i = 0; i < ids.length; i++) {
    result[i] = await fetcher(ids[i]);
  }
  return result;
}

const data = fetchRecords([1, 2, 3, 4, 5]);
data.then(console.log);

// in the order of Fetcher response
async function fetchRecords2(ids) {
  const promises = ids.map((id) => fetcher(id));
  const values = [];

  const promise = new Promise((res) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];

      promise.then((value) => {
        values.push(value);
        if (values.length === ids.length) {
          res(values);
        }
      });
    }
  });

  const value = await promise;
  return value;
}

const data2 = fetchRecords2([1, 2, 3, 4, 5]);
data2.then(console.log);

// in the order of Fetcher response
async function fetchRecords3(ids) {
  const promises = ids.map((id) => fetcher(id));
  const values = [];

  const promise = new Promise((res) => {
    function helper(promises) {
      const promise = promises.shift();
      if (!promise) {
        res(values);
        return;
      }
      promise.then((value) => {
        values.push(value);
        helper(promises);
      });
    }

    helper(promises);
  });

  const value = await promise;
  return value;
}

const data3 = fetchRecords3([1, 2, 3, 4, 5]);
data3.then(console.log);
