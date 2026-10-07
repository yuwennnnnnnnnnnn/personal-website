"""Prepare flat pages, using the reading order in Figma's layout overview.
Usage: python3 scripts/prepare-handmaiden-pages.py '/path/to/inner pages'
Original sources remain untouched. Cross-page artwork is split at the exact centre.
"""
import json
import sys
from pathlib import Path
from PIL import Image

source = Path(sys.argv[1])
output = Path(__file__).resolve().parents[1] / 'public/assets/handmaiden/pages'
output.mkdir(parents=True, exist_ok=True)
order = [8829, 8827, 8839, 8825, 8831, 8830, 8833, 8832, 8834, 8826, 8835, 8837, 8836, 8840, 8841]
manifest = []
for frame in order:
    file = source / f'Frame 141011{frame}.png'
    image = Image.open(file).convert('RGB')
    width, height = image.size
    assert (width, height) == ((3060, 4590) if frame == 8829 else (6120, 4590)), file
    parts = [('cover', image)] if frame == 8829 else [
        ('left', image.crop((0, 0, width // 2, height))),
        ('right', image.crop((width // 2, 0, width, height))),
    ]
    for side, page in parts:
        index = len(manifest)
        name = f'page-{index:02d}.webp'
        page.resize((1000, 1500), Image.Resampling.LANCZOS).save(output / name, 'WEBP', quality=92)
        manifest.append({'src': '/assets/handmaiden/pages/' + name, 'source': file.name,
                         'side': side, 'sourceSize': [width, height], 'pageSize': [3060, 4590],
                         'width': 1000, 'height': 1500, 'label': 'Cover' if index == 0 else f'Page {index}'})
(output / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Prepared {len(manifest)-1} inner pages and one cover.')
