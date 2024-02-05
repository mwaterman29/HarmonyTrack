import { startOfDay, endOfDay } from 'date-fns';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/app/prisma";
import { NextRequest } from 'next/server';

const createOrUpdateEatingDay = async (request: Request) => {

    const body = await request.json()
    const { fat, carbs, protein, calories } = body;
    const today = new Date();
    const dayStart = startOfDay(today);
    const dayEnd = endOfDay(today);

    const session = await getServerSession(authOptions);

    if(!session?.user)
    {
        return new Response("Unauthorized.",
        {
            status: 401,
        });
    }

    let res;

    try {
        const existingEatingDay = await prisma.eatingDay.findFirst({
            where: {
                date: {
                    gte: dayStart,
                    lte: dayEnd,
                },
            },
        });

        if (existingEatingDay) {
            await prisma.eatingDay.update({
                where: {
                    id: existingEatingDay.id,
                    userId: session.user.id as string,
                },
                data: {
                    fat,
                    carbs,
                    protein,
                    calories,
                },
            });
        } else {
            await prisma.eatingDay.create({
                data: {
                    userId: session.user.id as string,
                    fat,
                    carbs,
                    protein,
                    calories,
                },
            });
        }

        res = new Response("Resource Created",
        {
            status: 201,
        });
    } catch (error) {
        console.error('Error creating or updating eating day entry:', error);
        res = new Response("Internal Server Error",
        {
            status: 500,
        });
    }

    return res;
};

const getEatingDay = async (request: NextRequest) => {
    const dateString = request.nextUrl.searchParams.get('date');

    if(!dateString)
    {
        return new Response("Bad request.",
        {
            status: 400,
        });
    }

    const date = new Date(dateString);

    let res;
    
    await prisma.eatingDay.findFirst({
        where: {
            date: {
                gte: startOfDay(date),
                lte: endOfDay(date),
            },
        },
    }).then((entry) => {
        res = new Response(JSON.stringify(entry),
        {
            status: 200,
        });
    }).catch((error) => {
        console.error('Error getting eating day entry:', error);
        res = new Response("Internal Server Error",
        {
            status: 500,
        });
    });

    return res;
};

export { createOrUpdateEatingDay as POST, getEatingDay as GET}