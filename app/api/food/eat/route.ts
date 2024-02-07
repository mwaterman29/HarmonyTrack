import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options";
import prisma from "@/app/prisma";
import { NextRequest } from "next/server";
import { startOfDay, endOfDay } from 'date-fns';

const getFoodEaten = async (request: NextRequest) => {
    const session = await getServerSession(authOptions);

    if(!session?.user)
    {
        return new Response("Unauthorized.",
        {
            status: 401,
        });
    }

    const dateString = request.nextUrl.searchParams.get('date');
    const date = (dateString || dateString === 'undefined') ? new Date(dateString) : new Date();
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);


    const foods = await prisma.foodEaten.findMany({
        where: {
            userId: session.user.id as string,
            eatingDay: {
                userId: session.user.id as string,
                date: {
                    gte: dayStart,
                    lte: dayEnd,
                },
            }
        },
        orderBy: {
        },
    });

    return new Response(JSON.stringify(foods),
    {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const createOrUpdateFoodEaten = async (request: Request) => {

    return new Response("Not Implemented",
    {
        status: 501,
    });

    const body = await request.json()
    const { id, name, fat, carbs, protein, calories } = body;
    const session = await getServerSession(authOptions);

    if(!session?.user)
    {
        return new Response("Unauthorized.",
        {
            status: 401,
        });
    }

    let res;

    //Update an existing food entry
    if(id)
    {
        try {
            await prisma.food.update({
                where: {
                    id: id,
                    userId: session.user.id as string,
                },
                data: {
                    name,
                    fat,
                    carbs,
                    protein,
                    calories,
                },
            });

            res = new Response("Resource Updated",
            {
                status: 200,
            });
        } catch (error) {
            console.error('Error creating or updating food entry:', error);
            res = new Response("Internal Server Error",
            {
                status: 500,
            });
        }

        return res;
    }
    //Otherwise, create a new food entry
    else
    {
        try {
            const newFood = await prisma.food.create({
                data: {
                    userId: session.user.id as string,
                    name,
                    fat,
                    carbs,
                    protein,
                    calories,
                },
            });
    
            res = new Response(JSON.stringify(newFood),
            {
                status: 201,
                statusText: "Resource Created",
            });
        } catch (error) {
            console.error('Error creating or updating eating day entry:', error);
            res = new Response("Internal Server Error",
            {
                status: 500,
            });
        }
    
        return res;
    }
};

export { getFoodEaten as GET, createOrUpdateFoodEaten as POST}