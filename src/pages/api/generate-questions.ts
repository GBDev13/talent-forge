import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';
import { decryptApiKey } from "@/utils/encrypt";
import { testJSON } from "@/utils/test-json";
import { AxiosError } from "axios";

const generateQuestionsBodySchema = z.object({
  position: z.string().nonempty(),
  skills: z.string().optional(),
  encryptedApiKey: z.string().nonempty(),
  quantity: z.number().optional().default(5),
})

const MAX_CHAR_PER_QUESTION = 100;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { position, skills, encryptedApiKey, quantity } = generateQuestionsBodySchema.parse(req.body);

    const MAX_CHAR = MAX_CHAR_PER_QUESTION * quantity;

    const apiKey = decryptApiKey(encryptedApiKey);

    const configuration = new Configuration({
      apiKey
    });
    
    const openai = new OpenAIApi(configuration);

    const prompt = `Generate ${quantity} interview questions and answers for a ${position} role${skills ? ` that requires skills in ${skills}` : ''}. The sum of all text created must have a maximum of ${MAX_CHAR} characters.
    Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
    [{
      "question": "generated questions",
      "answer": "generated answer"
    }]
    The JSON response:`.trim()

    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: MAX_CHAR,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const questionsString = result?.data?.choices[0]?.text?.trim();

    if (!questionsString) return res.status(400).json({ error: true, message: "No questions generated" })

    const isValidJSON = testJSON(questionsString);

    if(!isValidJSON) {
      return res.status(400).json({ error: true, message: "Invalid JSON" })
    }

    const questions = JSON.parse(questionsString);

    return res.status(200).json({ questions })
  } catch (error) {
    return res.status((error as AxiosError)?.response?.status ?? 500).json({ error: true, message: "Unhandled Error" })
  }
}