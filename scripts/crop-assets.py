from PIL import Image
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
specs=[('blik-code',35,(806,199,989,598)),('blik-confirm',35,(1298,199,1482,598)),('blik-review',35,(317,199,501,598)),('verification-before',37,(317,199,501,598)),('verification-notice',37,(845,167,1044,566)),('upload-entry',37,(1075,167,1266,566)),('document-form',33,(316,698,513,1121)),('web-setup',38,(637,372,850,601))]
index=json.loads((root/'docs/wix-source-index.json').read_text())
manifest=[]
for name,num,box in specs:
 im=Image.open(root/f'docs/wix/{num}.png'); scale=im.width/1800
 coords=tuple(round(n*scale) for n in box); crop=im.crop(coords)
 crop.save(root/f'docs/wix/{name}-recovered.png',optimize=True)
 manifest.append(dict(file=name+'.png',source=next(x['url'] for x in index if x['index']==num),archive=f'docs/wix/{num}.png',crop=coords,width=crop.width,height=crop.height,method='Unmodified crop of original published portfolio export; not a new Figma export.'))
(root/'docs/recovered-assets.json').write_text(json.dumps(manifest,indent=2))
