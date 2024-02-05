import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/app/prisma";

const getFood = async (request: Request) => {
    const session = await getServerSession(authOptions);

    if(!session?.user)
    {
        return new Response("Unauthorized.",
        {
            status: 401,
        });
    }

    const foods = await prisma.food.findMany({
        where: {
            userId: session.user.id as string,
        },
        orderBy: {
            lastUsed: 'asc',
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

const createOrUpdateFood = async (request: Request) => {
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

export { getFood as GET, createOrUpdateFood as POST}