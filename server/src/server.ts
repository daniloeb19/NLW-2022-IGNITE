import express from "express";
import { PrismaClient } from '@prisma/client';
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesStringToHour } from "./utils/convert-minutes-string-to-hour";
import cors from 'cors';
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }

        }
    });
    return response.status(200).json(games);
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId: any = request.params.id;
    const body: any = request.body;


    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            discord: body.discord,
            useVoiceChannel: body.useVoiceChannel,
        }
    });

    return response.status(201).json(ad);
});


app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            gameId: true,
            name: true,
            yearsPlaying: true,
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesStringToHour(ad.hourStart),
            hourEnd: convertMinutesStringToHour(ad.hourEnd)
        }
    }));
});

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })
    return response.json({ discord: ad.discord });
});

app.listen(3333, () => {
    console.log("Tudo Ok")
});