export type img2imgRequest = {
    prompt: string;
    steps: number | null;
    nameFile: string | null;
    width: number;
    height: number;
    sampler_name: string;
    cfg_scale: number;
    init_images: string[];
    include_init_images: boolean;
    batch_size: number;
};

export type txt2imgResponse = {
    images: string[];
}