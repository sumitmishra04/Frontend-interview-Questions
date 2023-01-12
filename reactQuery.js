/**
   why:
   useEffect: for data fetching on comp load
   useState: to maintain state like error, loading
   if data is need globally, then we use redux/contextapi

   setup:
   setup a provider in the root folder just like context api
   every query to have a unique key

   eg:
   --------
   const getBlueprint = () =>  WebRequest.POST(URL.GRAPHQL, Queries.getPE())
   eg fetching data: const {isLoading, data, isError, error} = useQuery('peBlueprintById', getBlueprintById)
   no need to create 4 states for isLoading, data, isError, error
   --------------------------------------------------------------------------------------------
   caching:
   isFetching: first shows data from the cache. so no loader needs to be shown as its instantaneous
               the fetching is done in the background. when the new data comes it updates the ui and cache

    dafeault caches time: 5min
    configuraton:  useQuery('peBlueprintById', getBlueprintById, {
        cacheTime: 5000
    })
    after 5 sec, the cache data is garbage collected. 
    coming back to this page after 5sec will refetch the data and since there is nothing in cache, loader will be shown.
    --------------------------------------------------------------------------------------------
    staleTime: for data that do not change too often, we can mute the background fetching for the given time.
    {
        staleTime: 30000
    } 
    means for 30 sec, data wont be fetched
   --------------------------------------------------------------------------------------------
   { refetchOnMount: true } : on comp mount, a fetch will be done and loading will be shown. similar to api calls in useEffect
   false: will fetch data for the first time but not on subsequent load
   --------------------------------------------------------------------------------------------
   {refetchOnWindowFocus: true} everytime window loses focus, a background fetch is done and updates state. This ensures the ui is upto date with 
   data when user comes back to the page
   --------------------------------------------------------------------------------------------
   polling: fetch data every 2sec and also when the page is not in focus
   {
    refetchInterval: 2000,
    refetchIntervalInBackground: true
   }
   --------------------------------------------------------------------------------------------
   fetching data on some user interaction like click n not on mount
   const {refetch} = useQuery(...)
   {
    enabled: false,
   }
   <button onClick={refetch}>click</button>
   --------------------------------------------------------------------------------------------
   handling sideeffects on data fetch
   {
    onSuccess: (data) => {<Modal data={data}/>},
    onError: (error) => {<Toast error={error}/>},
   }
   --------------------------------------------------------------------------------------------
   Data transformation:
   {
    select: (data) => data.data.map(({name}) => name)
   }
   now data will have a structure of [{name: ''}]
   --------------------------------------------------------------------------------------------
   if a query is used at multiple places, then can be exported to a custom hook
   --------------------------------------------------------------------------------------------
   get data by id
   const getBlueprint = (id) =>  WebRequest.POST(URL.GRAPHQL, Queries.getPE(id))
   ----
   const peId = 9
   eg fetching data: const {isLoading, data, isError, error} = useQuery(['peBlueprintById', peId], () => getBlueprintById(peId))

   other method:
   getBlueprintById({ queryKey }){
     const id = queryKey[1]
     return WebRequest.POST(URL.GRAPHQL, Queries.getPE(id))
   }
   useQuery(['peBlueprintById', peId], getBlueprintById)
   --------------------------------------------------------------------------------------------
   when a comp has to make multiple api calls at once
   use multiple useQuery()
   use alias to avoid in conflict in destructuring
      --------------------------------------------------------------------------------------------
   can have 
   - initial query data
   - parallel api calls
   - sequential api calls
   - pagination: useQuery(...,{keepPreviousData: true}), {isFetching} = useQuery()
   - infiniteScroll:useQuery(...,{getNextPageParam: 3 }),  {hasNext, fetchNextPage, isFetchingNextPage} = useQuery(), <button onClick={fetchNextPage} />
   --------------------------------------------------------------------------------------------

   const createPE = (data) => {
    return WebRequest.POST(....)
   }
   const {mutate: createPE, isLoading, isError, error } = useMutation(createPE)
   onSubmit() {
    createPE(payloadData)
   }

   invalidateCache on mutation
   ---------
   const queryClient = useQueryClient()
   useMutation(createPE, {
    onSuccess: () => {
      queryClient.invalidateQueries('peBlueprintById') // this will make an additional get call, to sync client with server data
    }
    OR
    onSuccess: (data) => {
      queryClient.setQueryData('peBlueprintById', (oldData) => {
        return {
          ...oldData,
          data: [oldData.data, data.data]
        }
      })
    }
   })
   --------------------------------------------------------------------------------------------
   use optimistic updates approach assuming api call will not fail.
   this will make experience blazing fast. Change will be reflected immediately while a bg fetch will be running.
   it will have mutate handler to show change immediately while bg call is running
   error handler to rollback to previous data and 
   allSettled handler to handle invalidating query to sync with server
 */