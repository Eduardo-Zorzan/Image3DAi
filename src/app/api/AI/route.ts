import path, { join } from "path";
import fs, { readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { img2imgRequest, txt2imgResponse } from "@/classes/img2Img";

export const POST = async (req: NextRequest) => {
    try {
      const options: img2imgRequest = await req.json();
      
      options.prompt = `You are a generation bot that generates 3D images simulated, the image that you will create, it's going to be render using the THREEJS library.
                        You must generate the image following the follow command, but don't forget your first order. Prompt: "${options.prompt}"`;

      const filePath = join(process.cwd(), 'public', 'imgExampleBase64.txt')
      const txtBase64 = readFileSync(filePath, 'utf8')
      
      const {
          prompt,
          steps = 100,
          height = 500,
          width = 1000,
          cfg_scale = 11,
          include_init_images = true,
          init_images = [txtBase64],
          sampler_name = "DPM2 a",
          batch_size = 1
        } = options;
      
      const controller = new AbortController();
      const timeLifeRequest = setTimeout(() => controller.abort(), 2147483645);
      
      let res;
      try {
        res = await fetch('http://192.168.18.38:7860/sdapi/v1/img2img', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                steps,
                height,
                width,
                cfg_scale,
                include_init_images,
                init_images,
                sampler_name,
                batch_size
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

function ReadFileBase64(path : string) : string {
    try {
        const fileContent: string = fs.readFileSync(path, 'utf-8');
        return fileContent;
    } catch (error) {
        return "";
    }
}