---
title: How to Build Asynchronous Workflows in a Geospatial Application
postSlug: how-to-build-asynchronous-workflows-in-a-geospatial-application
date_published: 2016-10-20T23:00:00.000Z
date_updated: 2016-10-20T23:00:00.000Z
tags:
  - programming
  - software
  - architecture
  - azavea
  - mmw
ogImage: https://ik.imagekit.io/rajadain/mmw-2016.webp?updatedAt=1686510877909
---

![Model My Watershed](https://ik.imagekit.io/rajadain/mmw-2016.webp?updatedAt=1686510877909)

> A responsive app should always be ready to respond to the user, regardless of any background processing that may be happening. This is especially true for geoprocessing applications which often entail long-running processes. To keep the app responsive, the thread that processes user interaction must always be ready to respond, and never be blocked. To keep the app available, the thread that handles web requests must always have the capacity for new requests.

I write a case study on how to asynchrony in general, and Celery in particular, to perform high performance geoprocessing on the web. Read the full article on the Azavea blog here: https://www.azavea.com/blog/2016/10/20/how-to-build-asynchronous-workflows-geospatial-application/.
