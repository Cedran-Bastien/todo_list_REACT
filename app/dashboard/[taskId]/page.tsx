'use client'

import React, {useEffect, useState} from "react";
import {Task, TaskDetailsUi} from "@/components/molecule/task";
import {useRouter} from "next/navigation";
import {useTasks} from "@/hooks/useTasks";
import { Box, Fab, } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import { FormUpdateTask } from "@/components/organisms/formUpdateTask";



export default function taskDetail({params}: {params: {taskId: string}}) {
    const {tasks, isSetUp} = useTasks()
    const [open,setOpen]  = useState(false)
    const currentTask = tasks?.filter(item => item.id === params.taskId).at(0) as Task
    const router = useRouter()
    

    useEffect( () => {
        if (!isSetUp) {
            return
        }    

        // Check if the task exist
        if ((tasks?.find(item => item.id == params.taskId) === undefined)) {
            router.push('/')
        }
        
    }, [tasks])

    return (
        <>
        
        {isSetUp && 
            <Box sx={{width: 3/4}}>
                <TaskDetailsUi currentTask={currentTask}></TaskDetailsUi>
                <Fab
                    onClick={() => {
                        setOpen(true)
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 50,
                        right: 125
                    }}
                >
                    <CreateOutlined/>
                </Fab>
                <FormUpdateTask open={{open, setOpen}} current={currentTask}/>
            </Box>
        }
        
        </>
        
    )

}