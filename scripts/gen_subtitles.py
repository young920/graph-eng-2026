#!/usr/bin/env python3
"""按 SOP 切分字幕 + 配时间戳"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
text = json.loads((ROOT / "src" / "text.json").read_text())
timeline = json.loads((ROOT / "src" / "timeline.json").read_text())

# 实测每段配音时长
audio_durs = {}
for seg in timeline["segments"]:
    f = ROOT / "public" / "audio" / f"{seg['id']}.mp3"
    if f.exists():
        import subprocess
        out = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "csv=p=0", str(f)],
            capture_output=True, text=True
        ).stdout.strip()
        audio_durs[seg["id"]] = float(out)
    else:
        audio_durs[seg["id"]] = seg["duration"]

# 切句：按 。 ！？ 切
def split_sentences(text):
    # 保留分隔符
    parts = re.split(r'(?<=[。！？])', text)
    return [p.strip() for p in parts if p.strip()]

# 构造 subtitles.json
subs = {}
for seg in text["segments"]:
    seg_id = seg["id"]
    seg_start = seg["start"]
    audio_dur = audio_durs.get(seg_id, seg["duration"])
    # 用 audio_dur 而不是 seg.duration（更精确）
    sentences = split_sentences(seg["text"])
    if not sentences:
        sentences = [seg["text"]]
    # 按字数比例分配时间
    total_chars = sum(len(s) for s in sentences)
    sub_list = []
    cur = 0.0
    for s in sentences:
        ratio = len(s) / total_chars
        dur = audio_dur * ratio
        sub_list.append({
            "text": s,
            "start": round(seg_start + cur, 2),
            "end": round(seg_start + cur + dur, 2),
        })
        cur += dur
    subs[seg_id] = sub_list

(ROOT / "src" / "subtitles.json").write_text(
    json.dumps(subs, ensure_ascii=False, indent=2)
)

print(f"=== subtitles.json 生成完成 ===")
total_subs = sum(len(v) for v in subs.values())
print(f"共 {total_subs} 句字幕，覆盖 {len(subs)} 段")
for k, v in subs.items():
    print(f"  {k}: {len(v)} 句 ({audio_durs.get(k, 0):.2f}s)")