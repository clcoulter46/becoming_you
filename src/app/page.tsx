'use client'

import KanbanContainer from './Components/KanbanContainer'
import TitleBar from './Components/TitleBar'
import FilterBar from './Components/FilterBar'

// need to import all data from test-data on render
// pass that info to kanban container
// filtering will adjust what gets passed down


export default function Home(): any {
  return (
    <>
      <div
        className='page-container'
        style={{ display: 'flex', flexDirection: 'column'}}
      >
        <TitleBar />
        <FilterBar />
        <KanbanContainer />
      </div>
    </>
  );
}
