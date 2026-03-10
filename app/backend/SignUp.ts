'use server';

import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({adapter});


type acctypes = {
  email:string,
  password: string
}


export async function acc(formdata: FormData){

  const Email = formdata.get('email')?.toString() || ''
  const pass = formdata.get('password')?.toString() || ''
  const name = formdata.get('name')?.toString() || ''

  const PHash = await bcrypt.hash(pass,10)

    await prisma.user.create({
      data:{
        name:name,
        email: Email,
        password: PHash
      }
    })

    await logacc(formdata)

    return 'Success'
}

 export async function logacc(formdata: FormData){

    const Email = formdata.get('email')?.toString()
  const pass = formdata.get('password')?.toString()


    const user = await  prisma.user.findUnique({
      where:{
        email: Email,
      }
    })
    if (!user) return;

  if (!pass) return;

  const PassMatch =await bcrypt.compare(pass,user.password)
  if(!PassMatch) return;

   // set cookie on the current request/response
   const CookieStore = await cookies();
   CookieStore.set('UID', user.id,{
    secure:true,
    maxAge:60*60*24*9,
    httpOnly:true,
    path:'/',
    sameSite:'lax',
  })

  return 'Success' ;

}

export async function getUser(){
  const CookieStore = cookies();
  const usid = (await CookieStore).get('UID')?.value;

  if (!usid) return null;

  const u = await prisma.user.findUnique({
    where:{
      id:usid
    }
  });

  return u;
}


