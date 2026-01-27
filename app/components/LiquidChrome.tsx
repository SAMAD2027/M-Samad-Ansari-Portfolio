
import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

import './LiquidChrome.css';

interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

export const LiquidChrome: React.FC<LiquidChromeProps> = ({
  baseColor = [0.05, 0.05, 0.08],
  speed = 0.15,
  amplitude = 0.6,
  frequencyX = 2.0,
  frequencyY = 1.5,
  interactive = true,
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
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      // Pseudo-random noise
      float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      vec4 renderLiquid(vec2 uvCoord, float shift) {
          vec2 uv = (uvCoord * 2.0 - 1.0);
          uv.x *= uResolution.z; // Aspect ratio
          
          float time = uTime + shift;
          
          // Warp coordinates for the liquid feel
          for(float i = 1.0; i < 6.0; i++) {
              uv.x += uAmplitude / i * sin(i * uFrequencyX * uv.y + time + uMouse.x * 2.0);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + time + uMouse.y * 2.0);
          }
          
          // Mouse trail influence
          vec2 mouseDiff = uvCoord - uMouse;
          float dist = length(mouseDiff);
          float force = exp(-dist * 8.0) * 0.15;
          uv += (mouseDiff / (dist + 0.01)) * force;

          // Color calculation with some "chromatic" shift
          float intensity = abs(sin(uv.y + uv.x + time * 0.5));
          vec3 color = uBaseColor / (intensity + 0.1);
          
          // Add highlights
          float specular = pow(max(0.0, 1.0 - intensity), 20.0);
          color += vec3(specular) * 0.4;

          return vec4(color, 0.85);
      }

      void main() {
          // Chromatic aberration effect
          vec4 r = renderLiquid(vUv, 0.0);
          vec4 g = renderLiquid(vUv, 0.01);
          vec4 b = renderLiquid(vUv, 0.02);
          
          gl_FragColor = vec4(r.r, g.g, b.b, (r.a + g.a + b.a) / 3.0);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height])
        },
        uBaseColor: { value: new Float32Array(baseColor) },
        uAmplitude: { value: amplitude },
        uFrequencyX: { value: frequencyX },
        uFrequencyY: { value: frequencyY },
        uMouse: { value: new Float32Array([0.5, 0.5]) }
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

    // Smoothed mouse tracking
    let targetMouse = { x: 0.5, y: 0.5 };
    let currentMouse = { x: 0.5, y: 0.5 };

    function handleMouseMove(event: MouseEvent) {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);
      
      // Lerp mouse for smoothness
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;
      
      const mouseUniform = program.uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = currentMouse.x;
      mouseUniform[1] = currentMouse.y;
      
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animationId = requestAnimationFrame(update);

    container.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseColor, speed, amplitude, frequencyX, frequencyY, interactive]);

  return <div ref={containerRef} className={`liquidChrome-container ${className}`} {...props} />;
};

export default LiquidChrome;
