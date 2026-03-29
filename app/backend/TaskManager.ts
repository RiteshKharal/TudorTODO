'use server';

import React from 'react'
import { redirect } from 'next/navigation';
import { prisma } from '../lib/auth';
// import { useSession } from '../lib/auth-client';
import { auth } from '../lib/auth';
import { headers } from 'next/headers';


export default async function TaskManager(formdata : FormData) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const Task = formdata.get('TaskTitle')?.toString()
    const TaskDesc = formdata.get('TaskDesc')?.toString() || null 
    const TaskDate = formdata.get('TaskDueTime')?.toString()

    if (!Task || !TaskDate || !session) return;

    await prisma.task.create({
        data:{
            title: Task,
            description: TaskDesc,
            date:TaskDate,
            userId: session.user.id
        }

    })

    return 'Success'
    
}

export async function UserTasks() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) return null;

  const tasks = await prisma.task.findMany({
    where: { 
        userId:session.user.id,
        
     },
    orderBy: [
        {read:'asc'},
        {date: 'desc'},
        
    ],
  });

  return tasks;
}

export async function ToggleTaskRead(TaskID: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) return null;

    const crnttask = await prisma.task.findFirst({
        where:{
            userId:session.user.id,
            id:TaskID
        }
    })

    if(!crnttask) return

  await prisma.task.update({
    where:{
        id:TaskID
    },
    data:{
        read: !crnttask.read,
    }
  });

}

export async function DeleteTask(TaskID: number) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) return null;

  await prisma.task.delete({
    where:{
        id:TaskID
    }
  });

}
