<h1 align="center">
  <img alt='Cheese Logo' src="https://github.com/aaronleopold/cheese/blob/main/static/temp-readme-logo.png" />
</h1>

A menubar application to take pictures or record videos of yourself using your webcam. I love a good menubar app 😄

<h1 align="center">
  <img alt='Cringey Demo Gif' src="https://github.com/aaronleopold/cheese/blob/main/static/temp-readme-demo-very-cringe-lol.gif" />
</h1>

## Roadmap

This is more of a TODO list for me :)

- [x] Get basic UI set up
- [x] Make UI responsive
- [x] Allow selection of available devices
- [x] Allow customized storage paths
- [x] Set up application flows (e.g. home, recording, recorded/viewing, screenshot, etc)
- [ ] Allow screen shots (selfies; halfway done, I can get the image buffer currently)
  - [x] display
  - [ ] download (test each of the below works)
    - [x] png
    - [ ] jpg
    - [ ] webp
- [ ] Allow recording
  - [x] start/stop recording to chunks
  - [x] display before download (displays as webm)
  - [ ] download (test each of the below works)
    - [x] webp
    - [ ] avi
    - [ ] ogg
    - [x] mp4
- [x] Add a yellow/orange theme (I mean, it IS cheese so)
- [x] Finish dark theme
- [ ] Fix the viewport for the camera
  - currently, restricting the size of the camera window changes the size of the resulting video. I just want the overflow to be hidden, rather than actually setting the size of the video.
- [x] Fix the dependencies
  - ~This is a MESS currently. A lot of the deps just don't play well with each other and require very specific versions, which is introducing some security issues. These should be sorted out eventually.~ Fixed all fixable security issues from this. electron-webpack is not currently maintained, so in the future it might be wise to move away from webpack. see [Future Work](#future-work)
- [x] Fix the icon on build ~(it doesn't work D:)~

## Future Work

There are two potential, major changes/migrations I can see choosing between for the (distant) future of this application:

- Migrate to [Vite](https://github.com/cawa-93/vite-electron-builder) from Webpack
  - Maintained library, less security updates/maintenence, etc.
- Mirgrate away from Electron over to [Neutralinojs](https://github.com/neutralinojs/neutralinojs)
  - Smaller bundle, less resource heavy, etc

## Attribution

The logo I use for Cheese was created by an [artist](https://www.vecteezy.com/members/pisuttardging180463) found on [Vecteezy](https://www.vecteezy.com/free-vector/cheese-logo)
