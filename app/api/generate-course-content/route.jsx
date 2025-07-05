import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import { type } from "os";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";


const config = {
        thinkingConfig: {
        thinkingBudget: -1,
        },
        responseMimeType: 'application/json',
    };
const model = 'gemini-2.5-pro';

const PROMPT=`Depends on Chapter name and Topic Generate content for each topic in HTML 

and give response in JSON format. 

Schema:{

chapterName:<>,

{

topic:<>,

content:<>

}

}

: User Input:

`;


export async function POST(req) {
    const {courseJson, courseTitle, courseId} = await req.json();

    const promises=courseJson?.chapters?.map(async (chapter) => {

    const contents = [
        {
        role: 'user',
        parts: [
            {
            text: PROMPT + JSON.stringify(chapter),
            },
        ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    console.log(response.text);
    const RawResp=response.text;
    const RawJson=RawResp.replace('```json', '').replace('```', '');
    const JSONResp=JSON.parse(RawJson);
    //get youtube video link from JSONResp
    const youtubeVideo=await GetYoutubeVideo(chapter?.chapterName);
    return  {
        youtubeVideo: youtubeVideo,
        courseData: JSONResp,
    }
    })

    const courseContent=await Promise.all(promises);
    const dbResp=await db.update(coursesTable).set({
        courseContent: courseContent
    }).where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
        courseName: courseTitle,
        courseContent: courseContent})

}

const YOUTUBE_BASE_URL=`https://www.googleapis.com/youtube/v3/search`;
const GetYoutubeVideo=async (topic)=>{
    const params= {
        part: 'snippet',
        q: topic,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY,
        maxResults: 4,
    }

    const resp=await axios.get(YOUTUBE_BASE_URL, {params});
    const youtubeVideoListResp=resp.data.items;
    const youtubeVideoList=[];
    youtubeVideoListResp.forEach((video) => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        youtubeVideoList.push({
            videoId: videoId,
            title: videoTitle,
        });
    });
    return youtubeVideoList;
}