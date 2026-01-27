
import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

interface LetterGlitchProps extends React.HTMLAttributes<HTMLDivElement> {
  glitchSpeed?: number;
  color1?: [number, number, number];
  color2?: [number, number, number];
  color3?: [number, number, number];
  gridSize?: number;
  charOpacity?: number;
}

const LetterGlitch: React.FC<LetterGlitchProps> = ({
  glitchSpeed = 10.0,
  color1 = [0.1, 0.6, 0.7], // Cyan
  color2 = [0.0, 0.8, 0.5], // Greenish Teal
  color3 = [0.2, 0.4, 0.8], // Blue
  gridSize = 45.0,
  charOpacity = 0.6,
  className = "",
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new Renderer({ antialias: true, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uSpeed;
      uniform float uGridSize;
      uniform float uOpacity;
      varying vec2 vUv;

      float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
      }

      // Helper to draw segments of characters
      float segment(vec2 uv, vec2 p1, vec2 p2, float w) {
          vec2 pa = uv - p1, ba = p2 - p1;
          float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
          return step(length(pa - ba * h), w);
      }

      // Approximate character shapes using a grid-based segment method
      float getCharacter(vec2 gv, float h) {
          float pattern = 0.0;
          float type = floor(h * 10.0);
          
          gv = gv * 2.0 - 1.0; // center -1 to 1
          
          if (type == 0.0) { // 'A' like
              pattern += segment(gv, vec2(-0.4, -0.6), vec2(0.0, 0.6), 0.08);
              pattern += segment(gv, vec2(0.4, -0.6), vec2(0.0, 0.6), 0.08);
              pattern += segment(gv, vec2(-0.2, 0.0), vec2(0.2, 0.0), 0.08);
          } else if (type == 1.0) { // '0' or 'O' like
              pattern += step(abs(length(gv) - 0.5), 0.08);
          } else if (type == 2.0) { // 'H' like
              pattern += segment(gv, vec2(-0.4, -0.6), vec2(-0.4, 0.6), 0.08);
              pattern += segment(gv, vec2(0.4, -0.6), vec2(0.4, 0.6), 0.08);
              pattern += segment(gv, vec2(-0.4, 0.0), vec2(0.4, 0.0), 0.08);
          } else if (type == 3.0) { // 'X' or 'K' like
              pattern += segment(gv, vec2(-0.4, -0.6), vec2(0.4, 0.6), 0.08);
              pattern += segment(gv, vec2(0.4, -0.6), vec2(-0.4, 0.6), 0.08);
          } else if (type == 4.0) { // '#' like
              pattern += segment(gv, vec2(-0.2, -0.6), vec2(-0.2, 0.6), 0.06);
              pattern += segment(gv, vec2(0.2, -0.6), vec2(0.2, 0.6), 0.06);
              pattern += segment(gv, vec2(-0.6, -0.2), vec2(0.6, -0.2), 0.06);
              pattern += segment(gv, vec2(-0.6, 0.2), vec2(0.6, 0.2), 0.06);
          } else if (type == 5.0) { // 'T' like
              pattern += segment(gv, vec2(0.0, -0.6), vec2(0.0, 0.6), 0.08);
              pattern += segment(gv, vec2(-0.4, 0.6), vec2(0.4, 0.6), 0.08);
          } else if (type == 6.0) { // '@' or circle like
              pattern += step(abs(length(gv) - 0.4), 0.05);
              pattern += step(length(gv - vec2(0.1, 0.1)), 0.1);
          } else if (type == 7.0) { // '$' like
              pattern += segment(gv, vec2(0.0, -0.7), vec2(0.0, 0.7), 0.05);
              pattern += step(abs(gv.y), 0.05) * step(abs(gv.x), 0.4);
              pattern += step(abs(gv.y-0.4), 0.05) * step(abs(gv.x), 0.4);
              pattern += step(abs(gv.y+0.4), 0.05) * step(abs(gv.x), 0.4);
          } else { // random noise
              pattern = step(0.8, hash(gv + h));
          }
          
          return clamp(pattern, 0.0, 1.0);
      }

      void main() {
          vec2 uv = vUv;
          uv.x *= uResolution.z;

          vec2 gridUv = uv * uGridSize;
          vec2 id = floor(gridUv);
          vec2 gv = fract(gridUv);

          // Dynamic change based on time and position
          float h = hash(id + floor(uTime * uSpeed * 0.15));
          float char = getCharacter(gv, h);
          
          // Matrix-style falling intensity
          float falling = fract(id.x * 0.1 - uTime * 0.2 + hash(vec2(id.x)) * 10.0);
          falling = smoothstep(0.0, 0.2, falling) * smoothstep(1.0, 0.5, falling);

          // Random flickering
          float flicker = step(0.95, hash(vec2(uTime * 0.05, id.x + id.y)));
          
          vec3 color = uColor1;
          if (h > 0.3) color = uColor2;
          if (h > 0.6) color = uColor3;
          
          // Density control
          float mask = char * step(0.1, h); 
          
          // Edge vignettes
          float edgeFade = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x) *
                           smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);

          gl_FragColor = vec4(color, mask * edgeFade * uOpacity * (0.8 + flicker * 0.2 + falling * 0.5));
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height]) },
        uColor1: { value: new Float32Array(color1) },
        uColor2: { value: new Float32Array(color2) },
        uColor3: { value: new Float32Array(color3) },
        uSpeed: { value: glitchSpeed },
        uGridSize: { value: gridSize },
        uOpacity: { value: charOpacity }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      const resUniform = program.uniforms.uResolution.value as Float32Array;
      resUniform[0] = gl.canvas.width;
      resUniform[1] = gl.canvas.height;
      resUniform[2] = gl.canvas.width / gl.canvas.height;
    }
    
    window.addEventListener('resize', resize);
    resize();

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color1, color2, color3, glitchSpeed, gridSize, charOpacity]);

  return <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`} {...props} />;
};

export default LetterGlitch;
