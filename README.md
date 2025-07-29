3D Environment Generator with Stable Diffusion & Three.js


This was a quick project to experiment with the Stable Diffusion API for generating 2D images that can be simulated as 3D environments using Three.js. It also saves the generated images to a predetermined directory, so they can be opened at any time.

Project Outcome & Challenges
The project was partially successful. A few challenges arose:

The AI seemed to have a hard time generating seamless 3D environments.

My GPU, which I used to run Stable Diffusion, doesn't support generating larger images.

To run the project, you'll need to follow these steps.

Prerequisites
Node.js, ThreeJS and npm.
A working Stable Diffusion API instance on your local network.

Configure API Endpoint:
You will need to adapt the routes in the code to the IP address where your Stable Diffusion instance is running.

Note: The configuration for the Stable Diffusion API varies depending on your GPU and operating system.

Application Architecture

The application's architecture works as follows:
Frontend (Next.js/React): The user interacts with the UI to submit a prompt.
Internal API (Next.js API Route): The frontend communicates with an internal Next.js API.
Stable Diffusion API: The internal API, in turn, communicates with the Stable Diffusion API.
Image Saving: The internal API is also responsible for saving the generated image.

Thanks for checking out my project. If you have any comments or suggestions, feel free to share them.
