
import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Geometry, Program, Mesh } from 'ogl';

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

const fragment = /* glsl */ `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;

        vec3 color = vec3(0.0);
        
        // Fluid flow simulation attempt via sine waves and time
        float d = 0.0;
        d = sin(st.x * 2.0 + uTime * 0.5) * 0.5 + 0.5;
        d += sin(st.y * 3.0 - uTime * 0.3) * 0.5 + 0.5;
        
        // Liquid distortion colors
        vec3 color1 = vec3(0.03, 0.04, 0.1); // Deep slate
        vec3 color2 = vec3(0.08, 0.1, 0.25); // Indigo wash
        
        color = mix(color1, color2, d * 0.5);
        
        // Add subtle noise
        float noise = fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
        color += noise * 0.015;

        gl_FragColor = vec4(color, 1.0);
    }
`;

const FloodieBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const camera = new Camera(gl);
    camera.position.z = 5;

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let request: number;
    const update = (t: number) => {
      request = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
      renderer.render({ scene: mesh });
    };
    request = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(request);
      window.removeEventListener('resize', resize);
      if (containerRef.current && gl.canvas.parentElement === containerRef.current) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-20 pointer-events-none opacity-40" 
      style={{ filter: 'blur(20px)' }}
    />
  );
};

export default FloodieBackground;
