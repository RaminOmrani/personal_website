"""Shape text with HarfBuzz and return it as one SVG path, so the wordmark never depends on a font.
usage: python3 text2path.py FONT WEIGHT SIZE TEXT [TRACKING_EM] -> JSON {d, width, ascent, descent, bbox}
The path's origin is the baseline at x=0; y grows downwards (SVG)."""
import json, sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.varLib.instancer import instantiateVariableFont

font_path, weight, size, text = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4]
tracking = float(sys.argv[5]) if len(sys.argv) > 5 else 0.0

tt = TTFont(font_path)
if 'fvar' in tt:
    axes = {a.axisTag: a for a in tt['fvar'].axes}
    w = max(axes['wght'].minValue, min(axes['wght'].maxValue, weight)) if 'wght' in axes else None
    if w is not None:
        tt = instantiateVariableFont(tt, {'wght': w})
import io
tt.flavor = None
buf = io.BytesIO(); tt.save(buf); data = buf.getvalue()

face = hb.Face(data)
hbfont = hb.Font(face)
upem = face.upem
b = hb.Buffer()
b.add_str(text)
b.guess_segment_properties()
hb.shape(hbfont, b, {"kern": True, "liga": True})

gs = tt.getGlyphSet()
order = tt.getGlyphOrder()
scale = size / upem
pen = SVGPathPen(gs)
bp = BoundsPen(gs)
x = 0.0
track = tracking * upem
infos, poss = b.glyph_infos, b.glyph_positions
for i, (info, pos) in enumerate(zip(infos, poss)):
    name = order[info.codepoint]
    gx = x + pos.x_offset
    gy = pos.y_offset
    t = (scale, 0, 0, -scale, gx * scale, -gy * scale)
    gs[name].draw(TransformPen(pen, t))
    gs[name].draw(TransformPen(bp, t))
    x += pos.x_advance + (track if i < len(infos) - 1 else 0)
hhea = tt['hhea']
os2 = tt['OS/2']
print(json.dumps({
    'd': pen.getCommands(),
    'width': x * scale,
    'ascent': os2.sTypoAscender * scale,
    'descent': -os2.sTypoDescender * scale,
    'capHeight': getattr(os2, 'sCapHeight', 0) * scale,
    'xHeight': getattr(os2, 'sxHeight', 0) * scale,
    'bbox': bp.bounds,  # xMin, yMin(top), xMax, yMax(bottom) in SVG coords
}))
