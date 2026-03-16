export const TYPES = {
  FILE: 'file',
  FOLDER: 'folder'
}
export const data = [
  {
    id: '1',
    name: 'File1',
    type: TYPES.FILE
  },
  {
    id: '2',
    name: 'File2',
    type: TYPES.FILE
  },
  {
    id: '3',
    name: 'Folder2',
    type: TYPES.FOLDER,
    children: [
      {
      id: '3.1',
      name: 'File3.1',
      type: TYPES.FILE
      },
      {
        id: '3.2',
        name: 'File3.2',
        type: TYPES.FILE
      },
      {
        id: '3.3',
        name: 'Folder3.3',
        type: TYPES.FOLDER,
        children: [
            {
            id: '3.3.1',
            name: 'File3.3.1',
            type: TYPES.FILE
            },
            {
              id: '3.3.2',
              name: 'File3.3.2',
              type: TYPES.FILE
            },
            {
              id: '3.3.3',
              name: 'File3.3.3',
              type: TYPES.FILE
            }
          ]
      }
    ]
  },
  {
    id: '4',
    name: 'Folder1',
    type: TYPES.FOLDER,
    children: [
      {
      id: '4.1',
      name: 'File4.1',
      type: TYPES.FILE
      },
      {
        id: '4.2',
        name: 'File4.2',
        type: TYPES.FILE
      },
      {
        id: '4.3',
        name: 'File4.3',
        type: TYPES.FILE
      }
    ]
  }
]