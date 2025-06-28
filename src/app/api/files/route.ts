import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const GET = async (req: NextRequest) => {
    try {
        let listFiles : String[] = [];
        const uploadFolder : string = path.resolve(process.env.ROOT_PATH ?? "", "public", "uploads");

        

        fs.readdirSync(uploadFolder).forEach(file => {
                listFiles.push(file);
            });

        // Retorne o resultado como resposta JSON
        return NextResponse.json({ files: listFiles });
    } catch (error) {
      console.error("Erro interno na API:", error);
      return NextResponse.json(
        { success: false, error: "Erro interno na rota da IA." },
        { status: 500 }
      );
    }
}