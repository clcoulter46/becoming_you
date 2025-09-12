import React from "react";
import KanbanCategory from "./KanbanCategory";

export default function KanbanContainer(): any {
    let scheduledTasks
    let inProgressTasks
    let completedTasks

    return (
        <>
            Container
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <KanbanCategory category={'Scheduled'} tasks={scheduledTasks} />
                <KanbanCategory category={'In-progress'} tasks={inProgressTasks} />
                <KanbanCategory category={'Done'} tasks={completedTasks} />
            </div>
        </>
    );
}