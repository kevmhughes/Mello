import { uuid } from './utils'

export default {
  name: 'Mello-Master',
  backgroundImg: 'pier_full',
  backgroundImgs: [
    'barcelona',
    'coffee',
    'cow',
    'mouth',
  ],
  columns: [
    {
      name: 'Welcome to Mello',
      id: uuid(),
      tasks: [
        {
          description: 'Move tasks to different lists. Change the order of your lists.',
          name: 'Drag and Drop',
          id: uuid(),
          userAssigned: null,
          column: 'Welcome to Mello'
        },
        {
          description: 'Click a task to see/edit details',
          name: 'Add Details',
          id: uuid(),
          userAssigned: null,
          column: 'Welcome to Mello'
        },
        {
          description: 'Change the background. Reorganize your lists as you please!',
          name: 'Personalize!',
          id: uuid(),
          userAssigned: null,
          column: 'Welcome to Mello'
        },
      ]
    },
  ]
}