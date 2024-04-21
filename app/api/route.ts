import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAi = new GoogleGenerativeAI(process.env.GEN_KEY);

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log("Data received:", data.message);
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });
  // Process the data as needed
  const chat = model.startChat({
    history: data.history,
  
  });

  const msg = data.message;
  const result = await chat.sendMessage(msg);

  const response = await result.response;
  const text = await response.text();
  console.log(text, "ttt");
  // Return a response back to the client
  return Response.json(text);
}

// //generate text/image to text
// // Converts local file information to a GoogleGenerativeAI.Part object.
// function fileToGenerativePart(path:any, mimeType:any) {
//     return {
//       inlineData: {
//         data: Buffer.from(fs.readFileSync(path)).toString("base64"),
//         mimeType
//       },
//     };
//   }
//   async function generate(){
//      // For text-and-image input (multimodal), use the gemini-pro-vision model
//   const model = genAi.getGenerativeModel({ model: "gemini-pro-vision" });

//   const prompt = "What's different between these pictures?";

//   const imageParts = [
//     fileToGenerativePart(image1, "image/jpeg"),
//     fileToGenerativePart(image1, "image/jpeg"),
//   ];

//   const result = await model.generateContent([prompt, ...imageParts]);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
//   }
//   //chat
//   async function chat(){
//     const model = genAi.getGenerativeModel({ model: "gemini-pro" });
