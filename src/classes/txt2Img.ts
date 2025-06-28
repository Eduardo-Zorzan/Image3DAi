export type txt2imgRequest = {
    prompt: string;
    steps: number;
};

export type txt2imgResponse = {
    images: string[];
}