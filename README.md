# [WebGL Ray Tracing Example](http://www.gsconrad.com/WebGL-RayTracer/)
**Created by Gregory Conrad**

## Description
A relatively simple ray tracer built with WebGL that showcases several different scenes.

At a high level, this ray tracer supports:
- Animation
- Singular light source (using Phong model)
- Variable number of reflections
- Several types of objects (currently planes and spheres)

Refractions and other world object types could be added fairly easily, but that is outside the scope of this simple demo.

Note: This project is a largely modified version of the starter code supplied in CS 543 at WPI. It was almost completely rewritten but some basic concepts still remain in this final product.

## Project Structure
- `index.html` - the main HTML file that contains both shaders
- `main.js` - the main JS file
- `lib/` - JS libraries used for WebGL setup and usability
  - `initShaders.js` - grabs shaders from HTML and compiles them
  - `MV.js` - contains many convenience methods for handling vectors & matrices in JS
  - `webgl-utils.js` - contains utility methods, including a setup method for WebGL
