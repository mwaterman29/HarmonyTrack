import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/prisma";

export async function GET(request: NextRequest)
{
    const searchParams = request.nextUrl.searchParams
   
    return new Response("Not yet implemented.",
    {
        status: 501,
    });
}


/*
POST params:
-
*/
export async function POST(request: Request)
{
    const body = await request.json()
    const session = await getServerSession(authOptions);

    if(!session?.user)
    {
        return new Response("Unauthorized.",
        {
            status: 401,
        });
    }

    const userId = session.user.id as string;

    if(body.feeling === undefined || body.value === undefined)
    {
        return new Response("Bad request.",
        {
            status: 400,
        });
    } 

    let res;
    const feeling = await prisma.feeling.create(
    {
        data:
        {
            feeling: body.feeling,
            value: body.value,
            user:
            {
                connect:
                {
                    id: userId,
                },
            },
        },
    }).catch((error) => {
        res = Response.json({
            message: "Internal server error",
            status: 500,
        });
    }).then((result) => {
        res = Response.json({
            message: "Feeling created.",
            status: 201,
        });
    });

    return res;
}