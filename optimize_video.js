import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { execFile } from 'child_process';
import path from 'path';
import fs from 'fs';

const ffmpeg = ffmpegPath.path;
console.log('Using ffmpeg binary at:', ffmpeg);

const inputPath = path.resolve('public/videos/umami-fire.mp4');
const outputOptimizedMp4 = path.resolve('public/videos/umami-fire-optimized.mp4');
const outputOptimizedWebm = path.resolve('public/videos/umami-fire.webm');
const outputPoster = path.resolve('public/videos/umami-fire-poster.jpg');

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    console.log('Running:', ffmpeg, args.join(' '));
    execFile(ffmpeg, args, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  console.log('1. Extracting high-res poster image...');
  await runFfmpeg([
    '-i', inputPath,
    '-ss', '00:00:01',
    '-vframes', '1',
    '-q:v', '2',
    '-y', outputPoster
  ]);

  console.log('2. Optimizing MP4 (stripping audio, H.264 CRF 26, faststart for streaming/lazy loading)...');
  await runFfmpeg([
    '-i', inputPath,
    '-an', // Strip audio (silent gif behavior)
    '-vcodec', 'libx264',
    '-crf', '26',
    '-preset', 'slow',
    '-movflags', '+faststart',
    '-pix_fmt', 'yuv420p',
    '-y', outputOptimizedMp4
  ]);

  console.log('3. Generating WebM (VP9 ultra-compression)...');
  await runFfmpeg([
    '-i', inputPath,
    '-an',
    '-vcodec', 'libvpx-vp9',
    '-crf', '32',
    '-b:v', '0',
    '-y', outputOptimizedWebm
  ]);

  const originalSize = fs.statSync(inputPath).size;
  const mp4Size = fs.statSync(outputOptimizedMp4).size;
  const webmSize = fs.statSync(outputOptimizedWebm).size;
  const posterSize = fs.statSync(outputPoster).size;

  console.log('\n=== OPTIMIZATION SUMMARY ===');
  console.log(`Original MP4:   ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized MP4:  ${(mp4Size / 1024 / 1024).toFixed(2)} MB (${((1 - mp4Size/originalSize)*100).toFixed(1)}% reduction)`);
  console.log(`Optimized WebM: ${(webmSize / 1024 / 1024).toFixed(2)} MB (${((1 - webmSize/originalSize)*100).toFixed(1)}% reduction)`);
  console.log(`Poster JPG:     ${(posterSize / 1024).toFixed(2)} KB`);
}

main().catch(err => {
  console.error('Failed optimization:', err);
  process.exit(1);
});
