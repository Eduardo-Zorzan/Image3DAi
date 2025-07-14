export type txt2imgRequest = {
    prompt: string;
    steps: number | null;
    nameFile: string | null;
    width: number;
    height: number;
    sampler_index: string;
    cfg_scale: number;
};

export type txt2imgResponse = {
    images: string[];
}