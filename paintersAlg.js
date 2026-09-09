
// Used to help catch errors while coding
"use strict";

// WebGL context and program variables
var gl;
var program;

// Create three separate triangles with different colors and distances from the viewer
var triangles = [
    // Farthest triangle
    {
        distance: 3,
        vertices: [
            -0.6, -0.4, 0.5,
            0.4, -0.4, 0.5,
            -0.1, 0.6, 0.5
        ],
        color: [0.239, 0.192, 0.357, 1.0]  // Purple
    },
    // Middle triangle
    {
        distance: 2,
        vertices: [
            -0.4, -0.5, 0.0,
            0.6, -0.5, 0.0,
            0.1, 0.5, 0.0
        ],
        color: [0.267, 0.294, 0.431, 1.0]  // Blue
    },
    // Nearest triangle
    {
        distance: 1,    
        vertices: [
            -0.5, -0.6, -0.5,
            0.5, -0.6, -0.5,
            0.0, 0.4, -0.5
        ],
        color: [0.439, 0.545, 0.459, 1.0]  // Green
    }
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

    // All of this is now being completed inside the for loop within render(). The for loop now iterates over each triangle, creating and binding buffers for their vertices and colors, and setting up the attribute pointers accordingly.
    // // Create and bind a buffer for the vertex positions
    // var positionBuffer = gl.createBuffer();   // Create a buffer for the vertex positions
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);   // Bind the position buffer to the ARRAY_BUFFER target
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);  // Upload the vertex data to the GPU

    // // Get the location of the aPosition attribute in the shader program
    // var aPosition = gl.getAttribLocation(program, "aPosition");  // Get the location of the aPosition attribute in the shader program
    // gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0); // Specify how to pull the data from the buffer into the aPosition attribute
    // gl.enableVertexAttribArray(aPosition);   // Enable the aPosition attribute for use in the vertex shader

    // // Create and bind a buffer for the vertex colors
    // var colorBuffer = gl.createBuffer();   // Create a buffer for the vertex colors
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);   // Bind the color buffer to the ARRAY_BUFFER target
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);  // Upload the color data to the GPU

    // // Get the location of the aColor attribute in the shader program
    // var aColor = gl.getAttribLocation(program, "aColor");  // Get the location of the aColor attribute in the shader program
    // gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0); // Specify how to pull the data from the buffer into the aColor attribute
    // gl.enableVertexAttribArray(aColor);   // Enable the aColor attribute for use in the vertex shader

    // Call the render function to draw the scene
    render();
};

// Create the render function
function render() {
    // Clear the color buffer to prepare for drawing the scene
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Sort the triangles according to their distance from farthest to nearest.
    // Object sorting algorithm is based on the Array.sort() provided by MDN Web Docs.
    // Back-to-front rendering is based on the Painter's Algorithm described by Angel and Shreiner (2020).
    triangles.sort(function(a, b) {
        return b.distance - a.distance;  // Sort in descending order of distance
    });

    // Loop through the triangles array and draw each triangle in order of distance (Painter's Algorithm)
    for (var i = 0; i < triangles.length; i++) {

        var triangle = triangles[i];  // Get the current triangle

        var positionBuffer = gl.createBuffer();   // Create a buffer for the vertex positions
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);   // Bind the position buffer to the ARRAY_BUFFER target
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangle.points), gl.STATIC_DRAW);  // Upload the vertex data to the GPU

        var aPosition = gl.getAttribLocation(program, "aPosition");  // Get the location of the aPosition attribute in the shader program
        gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0); // Specify how to pull the data from the buffer into the aPosition attribute
        gl.enableVertexAttribArray(aPosition);   // Enable the aPosition attribute for use in the vertex shader

        // Define a color for each triangle vertex
        var triangleColors = [
            triangle.color[0], triangle.color[1], triangle.color[2], triangle.color[3],
            triangle.color[0], triangle.color[1], triangle.color[2], triangle.color[3],
            triangle.color[0], triangle.color[1], triangle.color[2], triangle.color[3]
        ];

        var colorBuffer = gl.createBuffer();   // Create a buffer for the vertex colors
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);   // Bind the color buffer to the ARRAY_BUFFER target
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleColors), gl.STATIC_DRAW);  // Upload the color data to the GPU

        var aColor = gl.getAttribLocation(program, "aColor");  // Get the location of the aColor attribute in the shader program
        gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0); // Specify how to pull the data from the buffer into the aColor attribute
        gl.enableVertexAttribArray(aColor);   // Enable the aColor attribute for use in the vertex shader
    }

    // Draw the triangle using the currently bound buffers and shaders
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}