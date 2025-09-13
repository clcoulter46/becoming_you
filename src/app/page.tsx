'use client'

import KanbanContainer from './Components/KanbanContainer'
import TitleBar from './Components/TitleBar'
import SearchBar from './Components/SearchBar'

import testDataJson from '../../../test-data.json'
import { useEffect, useState } from 'react'
// need to import all data from test-data on render
// pass that info to kanban container
// filtering will adjust what gets passed down


export default function Home(): any {
  const [taskData, setTaskData] = useState(Array)

  useEffect(() => {
    let env = process.env.NODE_ENV
    if (env === "development") {
      setTaskData(testDataJson.tasks)
    }
    // else statement with real data would go here in production case
    // TODO: authentication?
  }, [])

  useEffect

  return (
    <>
      {console.log('in container', taskData)}
      <div
        className='page-container'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TitleBar />
        <SearchBar />
        <KanbanContainer tasks={taskData} />
      </div>
    </>
  );
}
