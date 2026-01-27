
import React, { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';

interface GlitchTextProps {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  fontSize = 120,
  fontWeight = '900',
  color = '#ffffff',
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Create a texture by drawing text on a 2D canvas
    const textCanvas = document.createElement('canvas');
    const ctx = textCanvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution for the text canvas
    const scale = 2; 
    textCanvas.width = 1024 * scale;
    textCanvas.height = 256 * scale;
    
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    ctx.font = `${fontWeight} ${fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 512, 128);

    // 2. Setup OGL WebGL
    const renderer = new Renderer({ antialias: true, alpha: true });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const texture = new Texture(gl, {
      generateMipmaps: false,
      width: textCanvas.width,
      height: textCanvas.height,
    });
    texture.image = textCanvas;

    const vertex = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = `
      precision highp float;
      uniform sampler2D tMap;
      uniform float uTime;
      varying vec2 vUv;

      float rand(vec2 n) { 
        return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        float res = mix(
          mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
          mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
        return res*res;
      }

      void main() {
        vec2 uv = vUv;
        
        // Horizontal glitch displacement
        float glitchThreshold = 0.96;
        float glitchTime = floor(uTime * 15.0);
        float lineNoise = pow(rand(vec2(glitchTime, uv.y)), 3.0) * step(glitchThreshold, rand(vec2(glitchTime)));
        
        // Bigger block displacements
        float blockGlitch = step(0.98, rand(vec2(floor(uTime * 8.0), floor(uv.y * 5.0)))) * (rand(vec2(uTime)) - 0.5) * 0.1;

        float offX = lineNoise * 0.05 + blockGlitch;
        
        // RGB split
        float splitShift = 0.005 * sin(uTime * 2.0);
        vec4 r = texture2D(tMap, uv + vec2(offX + splitShift, 0.0));
        vec4 g = texture2D(tMap, uv + vec2(offX, 0.0));
        vec4 b = texture2D(tMap, uv + vec2(offX - splitShift, 0.0));
        
        // Scanlines
        float s = sin(uv.y * 400.0) * 0.05;
        
        vec4 finalColor = vec4(r.r, g.g, b.b, (r.a + g.a + b.a) / 3.0);
        finalColor.rgb += s;

        // Random alpha flickering
        if (rand(vec2(uTime)) > 0.99) finalColor.a *= 0.5;

        gl_FragColor = finalColor;
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: texture },
        uTime: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', resize);
    resize();

    let request: number;
    const update = (t: number) => {
      request = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene: mesh });
    };
    request = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(request);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentElement) {
        gl.canvas.parentElement.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [text, fontSize, fontWeight, color]);

  return <div ref={containerRef} className={`relative w-full h-32 md:h-48 ${className}`} />;
};

export default GlitchText;
