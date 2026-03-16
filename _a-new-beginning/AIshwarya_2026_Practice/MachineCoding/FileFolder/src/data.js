import { useEffect, useState } from 'react';

const data = [
  {
    id: '1',
    name: 'Office Map',
  },
  {
    id: '2',
    name: 'New Employee Onboarding',
    children: [
      {
        id: '8',
        name: 'Onboarding Materials',
      },
      {
        id: '9',
        name: 'Training',
      },
    ],
  },
  {
    id: '3',
    name: 'Office Events',
    children: [
      {
        id: '6',
        name: '2018',
        children: [
          {
            id: '10',
            name: 'Summer Picnic',
            currentPage: true,
          },
          {
            id: '11',
            name: "Valentine's Day Party",
          },
          {
            id: '12',
            name: "New Year's Party",
          },
        ],
      },
      {
        id: '7',
        name: '2017',
        children: [
          {
            id: '13',
            name: 'Company Anniversary Celebration',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Public Holidays',
  },
  {
    id: '5',
    name: 'Vacations and Sick Leaves',
  },
];

function getData() {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 500);
  });
}

function useData() {
  const [treeData, setTreeData] = useState({
    loading: false,
    treeData: null,
    error: null,
  });

  const fetchData = async () => {
    setTreeData((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    try {
      const data = await getData();
      setTreeData((prev) => {
        return {
          ...prev,
          treeData: data,
        };
      });
    } catch (e) {
      setTreeData((prev) => {
        return {
          ...prev,
          error: 'error occured',
        };
      });
    } finally {
      setTreeData((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return treeData;
}

export default useData;
