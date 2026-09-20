# Banner source

`banner.gif` is generated, not hand-drawn. To change it (roles, colours, name):

1. Edit `banner.html` — the `ROLES` array in the script is the typed line; the
   loop is `DUR` seconds and must stay seamless (start state == end state).
2. Capture frames and encode:

```sh
node assets/capture.mjs          # 160 PNG frames at 1200x300@2x
ffmpeg -y -framerate 20 -i frames/%04d.png \
  -vf "scale=1200:300:flags=lanczos,split[a][b];[a]palettegen=max_colors=255:stats_mode=diff[p];[b][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle" \
  -loop 0 assets/banner.gif
```

Needs Chrome + ffmpeg + puppeteer-core. Fonts: Inter Display (name), SF Mono
(terminal line). Accent `#22c55e`, background `#0B0E14`.
