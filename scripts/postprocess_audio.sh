#!/bin/bash
# 4 层后处理 + apad 到 visual_dur
set -e

cd "$(dirname "$0")/.."
mkdir -p public/audio_v2

# visual_dur map（从 timeline.json 取）
declare -A VDUR=(
  [s00]=8 [s01]=10 [s02]=10 [s03]=10 [s04]=12
  [s05]=10 [s06]=12 [s07]=10 [s08]=12 [s09]=10
  [s10]=10 [s11]=12 [s12]=4
)

for id in s00 s01 s02 s03 s04 s05 s06 s07 s08 s09 s10 s11 s12; do
  raw="public/audio_raw/${id}.mp3"
  out="public/audio_v2/${id}.mp3"
  vdur=${VDUR[$id]}
  
  # 思路：先用 apad 把 raw 拉长到 vdur+0.5s（呼吸位），再做 4 层后处理
  ffmpeg -y -i "$raw" \
    -af "highpass=f=80, lowpass=f=12000, equalizer=f=2500:t=q:w=1:g=2.5, acompressor=threshold=-18dB:ratio=3:attack=20:release=200, aecho=0.7:0.6:80:0.4, apad=whole_dur=$vdur.5, afade=t=out:st=$(echo "$vdur-0.3" | bc):d=0.3" \
    -c:a libmp3lame -q:a 4 "$out" 2>&1 | grep -E "(size|error)" | head -2
  
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out" 2>/dev/null)
  echo "  [$id] visual_dur=${vdur}s, audio_dur=${dur}s"
done
