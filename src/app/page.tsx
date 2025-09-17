'use client'

import KanbanContainer from './Components/KanbanContainer'
import TitleBar from './Components/TitleBar'

import testDataJson from '../../../test-data.json'
import { useEffect, useState } from 'react'

export default function Home(): any {
  const [taskData, setTaskData] = useState(Array)

  useEffect(() => {
    let env = process.env.NODE_ENV
    // if (env === "development") {
      setTaskData(testDataJson.tasks)
    // }
    // else statement with real data would go here in production case
    // TODO: authentication?
  }, [])


  return (
    <div
      className='page-container'
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <TitleBar />
      <KanbanContainer tasks={taskData} />
    </div>
  );
}
 