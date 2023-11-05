---
title: Generating Pyramided Tiles from a GeoTIFF using GeoTrellis
postSlug: generating-pyramided-tiles-from-a-geotiff-using-geotrellis
date_published: 2018-08-06T23:00:00.000Z
date_updated: 2018-08-06T23:00:00.000Z
tags:
  - programming
  - software
  - azavea
  - geospatial
ogImage: https://ik.imagekit.io/rajadain/geotrellis-2018.gif?updatedAt=1686511825604
---

![Pyramided Tiles](https://ik.imagekit.io/rajadain/geotrellis-2018.gif?updatedAt=1686511825604)

> To show the appropriate detail at a certain zoom level while conserving bandwidth, images of large geographic areas are tiled to optimize delivery. In a zoomed out state, we may need only a single image to show the entire area, albeit at a very coarse resolution. In a zoomed in state, a small area should be shown in much more detail. Each zoom level has 4 times the tiles of the previous one, with Zoom Level 0 starting with exactly 1 tile. The size of each tile in the scheme is identical, most often 256px square on the web.

This blog post presents a tutorial for generating pyramided map tiles (also called Slippy Map tiles) from a GeoTIFF using GeoTrellis, which can be used in Leaflet or OpenLayers. [Read the full article on the Azavea blog here.](https://www.azavea.com/blog/2018/08/06/generating-pyramided-tiles-from-a-geotiff-using-geotrellis/)

Also see [this alternative which uses GDAL](/posts/generating-pyramided-tiles-from-a-geotiff-using-gdal).
