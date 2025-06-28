export type progressResponse = {
    progress: number,
    eta_relative: 0.0,
    state: {
        skipped: boolean,
        interruped: boolean,
        stopping_generation: boolean,
        job: string,
        job_count: number,
        job_timestamp: string,
        job_no: number,
        sampling_step: number,
        sampling_steps: number
    },
    current_image: null | string,
    textinfo: null | string
}