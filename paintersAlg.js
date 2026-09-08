
// Used to help catch errors while coding
"use strict";

// WebGL context and program variables
var gl;
var program;

// Define the vertices for a triangle
var points = [
    -0.5, -0.4, 0.0,
    0.5, -0.4, 0.0,
    0.0, 0.5, 0.0
];

// Define the colors for each vertex of the triangle
var colors = [
    0.239, 0.192, 0.357, 1.0,  // Purple
    0.267, 0.294, 0.431, 1.0,  // Blue
    0.439, 0.545, 0.459, 1.0   // Green
];

window.onload = function init() {
    // Get the WebGL rendering context from the canvas
    var canvas = document.getElementById("glCanvas");

    // Initialize the WebGL2 context
    gl = canvas.getContext("webgl2");

    // Check if WebGL2 is available
    if (!gl) {
        alert("WebGL2 is not available in your browser.");  // Display an alert if WebGL2 is not available
    }

    // Set the viewport to match the canvas dimensions
    gl.viewport(0, 0, canvas.clientWidth, canvas.height);

    // Clear the color buffer with the specified clear color
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");  // Initialize the shaders

    // Use the created program
    gl.useProgram(program);

    // Create and bind a buffer for the vertex positions
    var positionBuffer = gl.createBuffer();   // Create a buffer for the vertex positions
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);   // Bind the position buffer to the ARRAY_BUFFER target
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);  // Upload the vertex data to the GPU

    // Get the location of the aPosition attribute in the shader program
    var aPosition = gl.getAttribLocation(program, "aPosition");  // Get the location of the aPosition attribute in the shader program
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0); // Specify how to pull the data from the buffer into the aPosition attribute
    gl.enableVertexAttribArray(aPosition);   // Enable the aPosition attribute for use in the vertex shader

    // Create and bind a buffer for the vertex colors
    var colorBuffer = gl.createBuffer();   // Create a buffer for the vertex colors
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);   // Bind the color buffer to the ARRAY_BUFFER target
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);  // Upload the color data to the GPU

    // Get the location of the aColor attribute in the shader program
    var aColor = gl.getAttribLocation(program, "aColor");  // Get the location of the aColor attribute in the shader program
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0); // Specify how to pull the data from the buffer into the aColor attribute
    gl.enableVertexAttribArray(aColor);   // Enable the aColor attribute for use in the vertex shader

    // Call the render function to draw the scene
    render();
};

// Create the render function
function render() {
    // Clear the color buffer to prepare for drawing the scene
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the triangle using the currently bound buffers and shaders
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}