export type txt2imgRequest = {
    prompt: string;
    steps: number | null;
    nameFile: string | null;
};

export type txt2imgResponse = {
    images: string[];
}