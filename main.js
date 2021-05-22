// WebGL variables
let gl, program;

// The bounds of the WebGL world
const glBounds = [
    -1, 1,  // Upper left
    1, 1,   // Upper right
    -1, -1, // Lower left
    1, -1,  // Lower right
];

// The changing animation value (0 to 1)
let alpha = 0;

// The time (in ms) the last frame was drawn
let lastFrameTime = Date.now();

// The current frame rate
let fps = 0;


// The main function called on window load
function main() {

    // WebGL setup
    const canvas = document.querySelector('canvas');
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }
    program = initShaders(gl, 'vshader', 'fshader');
    gl.useProgram(program);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Ray tracing setup
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(glBounds), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'vPosition');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // Trigger first render
    requestAnimationFrame(render);

    // Trigger frame rate display updates
    setInterval(() => {
        const text = `Frame Rate: ${fps.toFixed(2)} fps`;
        document.getElementById('fps').textContent = text;
    }, 400);
}


// The render function
function render() {

    // Change the animation value
    alpha = (alpha + 0.002) % 1;
    gl.uniform1f(gl.getUniformLocation(program, 'alpha'), alpha);

    // Calculate fps
    const currFrameTime = Date.now();
    fps = 1000 / (currFrameTime - lastFrameTime);
    lastFrameTime = currFrameTime;

    // Set the image
    gl.uniform1f(
        gl.getUniformLocation(program, 'img'),
        parseFloat(document.getElementById('image').value),
    );

    // Set the number of reflections
    gl.uniform1f(
        gl.getUniformLocation(program, 'reflections'),
        parseFloat(document.getElementById('number-reflections').value),
    );

    // Set the focal length
    gl.uniform1f(
        gl.getUniformLocation(program, 'focalLength'),
        parseFloat(document.getElementById('focal-length').value),
    );

    // Trigger the draw
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
}
