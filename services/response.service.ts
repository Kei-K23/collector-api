import { db } from "../lib/db";
import { CreateResponseSchema } from "../schema/response.schema";

// create new response
//TODO: Need to improve the performance for creating answers
export async function createResponse({ data }: { data: CreateResponseSchema }) {
  const { formId, userId, answer } = data;
  let createdResponse: any; // this is the response model object

  try {
    if (answer && answer.length > 0) {
      // If answer is present and not empty
      createdResponse = await db.response.create({
        data: {
          formId,
          userId,
        },
        include: {
          user: true,
          answer: {
            include: {
              answerOption: true,
              question: true,
            },
          },
        },
      });

      answer.forEach(async (ans) => {
        if (ans.answerOption && ans.answerOption.length > 0) {
          await db.answer.create({
            data: {
              questionId: ans.questionId,
              text: ans.text,
              responseId: createdResponse.id,
              answerOption: {
                createMany: {
                  data: [...ans.answerOption],
                },
              },
            },
          });
        } else {
          await db.answer.create({
            data: {
              questionId: ans.questionId,
              text: ans.text,
              responseId: createdResponse.id,
            },
          });
        }
      });
    } else {
      throw new Error("Answer is required!");
    }

    return createdResponse;
  } catch (e: any) {
    throw new Error("Something went wrong when creating responses.");
  }
}
