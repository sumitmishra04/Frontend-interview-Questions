import { useState, useEffect } from 'react'

const userData = [
    {
        Name: 'Cherey Duggan',
        Email: 'cduggan0@istockphoto.com',
        Department: 'Support',
        Actions: 'Delete',
    },
    {
        Name: 'Jodee Cheasman',
        Email: 'jcheasman1@imdb.com',
        Department: 'Business Development',
        Actions: 'Delete',
    },
    {
        Name: 'Roanna Macci',
        Email: 'rmacci2@etsy.com',
        Department: 'Legal',
        Actions: 'Delete',
    },
    {
        Name: 'Alan Pearce',
        Email: 'apearce@roku.com',
        Department: 'Engineering',
        Actions: 'Delete',
    },
    {
        Name: 'Anallese Hawkswood',
        Email: 'ahawkswood4@marriott.com',
        Department: 'Support',
        Actions: 'Delete',
    },
]

function useQuery() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    const fetchData = async () => {
        setLoading(true)
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    setData(userData)
                    resolve()
                }, 1000)
            })
        } catch (e) {
            setError('Error fetching', e)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return { error, loading, data }
}

export default useQuery

const { data, error, loading } = useQuery()
