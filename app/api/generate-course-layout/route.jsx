import { db } from '@/config/db';
import { coursesTable } from '@/config/schema';
import { currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import axios from 'axios';
import { NextResponse } from 'next/server';

const PROMPT= `Genrate Learning Course depends on following details. In which Make sure to add Course Name, Description,Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, , Topic under each chapters , Duration for each chapters etc, in JSON format only

Schema:

{
"course": {
"name": "string",
"description": "string",
"category": "string",
"level": "string",
"includeVideo": "boolean",
"noOfChapters": "number",

"bannerImagePrompt": "string",
"chapters": [
{
"chapterName": "string",
"duration": "string",
"topics": [
"string"
],

Generated code
}
]

}
}

, User Input: `

export const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

export async function POST(request) {
    const {courseId,...fonrmData} = await request.json();
    const user=await currentUser();

    const config = {
        thinkingConfig: {
        thinkingBudget: -1,
        },
        responseMimeType: 'application/json',
    };
    const model = 'gemini-2.5-pro';
    const contents = [
        {
        role: 'user',
        parts: [
            {
            text: PROMPT + JSON.stringify(fonrmData),
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
    // Parse the response to JSON
    const RawJson=RawResp.replace('```json', '').replace('```', '');
    const JSONResp=JSON.parse(RawJson);
    const ImagePrompt=JSONResp?.course?.bannerImagePrompt;
    const bannerImage=await generateImage(ImagePrompt);
    //save to database
    const result=await db.insert(coursesTable).values({
        ...fonrmData,
        courseJson: JSONResp,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        bannerImage: bannerImage,
        cid: courseId,
    });
    return  NextResponse.json({courseId: courseId})
    }

const generateImage=async (prompt) => {
    const BASE_URL='https://aigurulab.tech';
    const result = await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input: prompt,
            model: 'flux',//'flux'
            aspectRatio:"1:1"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process.env.AI_GURU_LAB, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
    console.log(result.data.image) 
    return result.data.image;
}