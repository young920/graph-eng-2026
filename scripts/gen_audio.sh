#!/bin/bash
# Edge TTS 生成 13 段男声配音（zh-CN-YunxiNeural，温暖有情感）

cd "$(dirname "$0")/.."

mkdir -p public/audio

VOICE="zh-CN-YunxiNeural"
RATE="-5%"
PITCH="0Hz"

echo "=== 生成 13 段男声配音 ==="

for i in $(seq -f "%02g" 0 12); do
  id="s$i"
  text=$(node -e "
    const data = require('./src/text.json');
    const seg = data.segments.find(s => s.id === '$id');
    process.stdout.write(seg.text);
  ")

  echo "[$id] $text"

  edge-tts --voice "$VOICE" --rate=-5% --pitch=+0Hz \
    --text "$text" \
    --write-media "public/audio/${id}.mp3" 2>&1 | tail -1
done

echo ""
echo "=== 配音时长统计 ==="
for f in public/audio/*.mp3; do
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" 2>/dev/null)
  echo "$(basename $f): ${dur}s"
done