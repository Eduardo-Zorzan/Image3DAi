import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { txt2imgRequest, txt2imgResponse } from "@/classes/txt2Img";
import { image } from "@tensorflow/tfjs";

export const POST = async (req: NextRequest) => {
    try {
      const options: txt2imgRequest = await req.json();

      console.log(options);
    const {
        prompt,
        steps = 20,
      } = options;
    
    const controller = new AbortController();
    const timeLifeRequest = setTimeout(() => controller.abort(), 30000000);
    
    let res;
    try {
      res = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              prompt,
              steps,
          }),
          signal: controller.signal
      })
    } finally {
        clearTimeout(timeLifeRequest);
    }

    if (!res.ok) {
        return NextResponse.json(
          { success: false, error: "Erro ao chamar o modelo local." },
          { status: res.status }
        );
      }
      const data: txt2imgResponse = await res.json();
      
      data.images.forEach(image => {
        if (image) {
          const imagePath = path.resolve(process.env.ROOT_PATH ?? "", "public", "uploads", `image_${Date.now()}_.png`);
          const buffer = Buffer.from(image, "base64");
          fs.writeFileSync(imagePath, buffer);
        }
      });

      // Retorne o resultado como resposta JSON
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Erro interno na API:", error);
      return NextResponse.json(
        { success: false, error: "Erro interno na rota da IA." },
        { status: 500 }
      );
    }
}