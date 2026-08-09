#!/usr/bin/env node
// 4 层后处理 + apad 到 visual_dur（按 timeline.json）
// **A1 修改**：去掉 echo（避免楼道回声）+ 段尾 fade out + 段间留 0.5s 静音位
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'audio_raw');
const OUT_DIR = path.join(ROOT, 'public', 'audio');

// 视觉时长（与 SXX.tsx visual_dur 一致）
const VISUAL_DUR = {
  s00: 8, s01: 10, s02: 10, s03: 10, s04: 12, s05: 10, s06: 12,
  s07: 10, s08: 12, s09: 10, s10: 10, s11: 12, s12: 6,
};

// 段间静音（让上一幕收完才进入下一幕）
const END_FADE_DUR = 0.3; // 段尾淡出
const SILENCE_AT_END = 0.5; // 段末 0.5s 静音（让上一幕收尾）

fs.mkdirSync(OUT_DIR, { recursive: true });

const ids = Object.keys(VISUAL_DUR).sort();
for (const id of ids) {
  const src = path.join(SRC_DIR, `${id}.mp3`);
  if (!fs.existsSync(src)) {
    console.log(`⚠️  跳过 ${id}（无源文件）`);
    continue;
  }
  const dur = VISUAL_DUR[id];
  const target = dur + SILENCE_AT_END; // apad 到 visual + 0.5s 静音位
  const out = path.join(OUT_DIR, `${id}.mp3`);

  // 滤镜链：highpass + 2.5kHz +2.5dB + lowpass + 段末 fade out + apad + fade in
  // 关键：去掉 aecho（楼道回声）
  // highpass 80Hz（去低频嗡声）
  // lowpass 12000Hz（去高频嘶声）
  // equalizer 2.5kHz +2.5dB（齿音清晰度）
  // afade t=out:st=dur-0.3（段末 0.3s 淡出）
  // apad（补足到 target 时长）
  // afade t=in:st=0:d=0.05（段头 50ms 淡入）
  const filter = [
    'highpass=f=80',
    'lowpass=f=12000',
    'equalizer=f=2500:t=q:w=1:g=2.5',
    `afade=t=out:st=${dur - END_FADE_DUR}:d=${END_FADE_DUR}`,
    `apad=pad_dur=${target}`,
    'afade=t=in:st=0:d=0.05',
  ].join(',');

  const cmd = `ffmpeg -y -i "${src}" -af "${filter}" -c:a libmp3lame -q:a 4 "${out}" 2>/dev/null`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    const sz = fs.statSync(out).size;
    console.log(`✅ ${id}: ${dur}s → ${target.toFixed(1)}s (${(sz/1024).toFixed(0)}KB)`);
  } catch (e) {
    console.error(`❌ ${id} 失败:`, e.message);
  }
}

// 总时长统计
const total = Object.values(VISUAL_DUR).reduce((a, b) => a + b, 0);
console.log(`\n总视觉时长: ${total}s = ${(total/60).toFixed(1)}min`);
console.log(`每段尾部静音: ${SILENCE_AT_END}s × ${ids.length} = ${(SILENCE_AT_END * ids.length).toFixed(1)}s`);
console.log(`音频总长: ${(total + SILENCE_AT_END * ids.length).toFixed(1)}s`);