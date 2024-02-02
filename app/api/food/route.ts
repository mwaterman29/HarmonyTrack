import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "@/app/prisma";


export const createOrUpdateEatingDay = async (request: Request) => {
    const body = await request.json()
    const { name, fat, carbs, protein, calories } = body;
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
        await prisma.food.create({
            data: {
                userId: session.user.id as string,
                name,
                fat,
                carbs,
                protein,
                calories,
            },
        });

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
