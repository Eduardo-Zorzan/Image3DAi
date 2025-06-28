import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { progressResponse } from "@/classes/progress";

export const GET = async (req: NextRequest) => {
    try {
    const res = await fetch('http://127.0.0.1:7860/sdapi/v1/progress', {
        method: 'GET',
    })
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: "Erro ao chamar o modelo local." },
        { status: res.status }
      );
    }
    const data: progressResponse = await res.json();

      // Retorne o resultado como resposta JSON
      return NextResponse.json(data);
    } catch (error) {
      console.error("Erro interno na API:", error);
      return NextResponse.json(
        { success: false, error: "Erro interno na rota da IA." },
        { status: 500 }
      );
    }
}