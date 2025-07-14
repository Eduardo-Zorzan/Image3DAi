import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { txt2imgRequest, txt2imgResponse } from "@/classes/txt2Img";

export const POST = async (req: NextRequest) => {
    try {
      const options: txt2imgRequest = await req.json();
      
      options.prompt = `You are a generation bot that generates 3D images simulated, the image that you will create, it's going to be render using the THREEJS library.
                        You must generate the image following the follow command, but don't forget your first order. Prompt: "${options.prompt}"`;

      const {
          prompt,
          steps = 30,
          height = 500,
          width = 1000,
          sampler_index = "DPM++2M",
          cfg_scale = 11
        } = options;
      console.log(options)
      const controller = new AbortController();
      const timeLifeRequest = setTimeout(() => controller.abort(), 2147483645);
      
      let res;
      try {
        res = await fetch('http://192.168.18.38:7860/sdapi/v1/txt2img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                steps,
                height,
                width,
                sampler_index,
                cfg_scale
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
        const nameImage : string = options.nameFile ?? "image";

        data.images.forEach(image => {
          if (image) {
            const imagePath = path.resolve(process.env.ROOT_PATH ?? "", "public", "uploads", `${nameImage}.png`);
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