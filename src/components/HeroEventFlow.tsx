// components/HeroEventFlow.tsx
// Fully functional Next.js component for:
// "Event Flow — Order from Chaos"
// - Start: scattered particles (chaos)
// - Morph (3–4s): particles self-organize into a structure
//   Mode A: timeline with milestones
//   Mode B: calendar grid
//   Mode C: flow chart (nodes + connecting edges)
// - Interactivity: cursor ripples & gentle bounce near pointer
// - Camera eases back during morph to reveal the final structure
// - Brand-aware colors via CSS vars --el-accent-1 / --el-accent-2
// - Respects prefers-reduced-motion
//
// Usage example:
//   import HeroEventFlow from '@/components/HeroEventFlow'
//   export default function Page() {
//     return (
//       <section style={{position:'relative', minHeight:'82vh', overflow:'hidden'}}>
//         <HeroEventFlow mode="timeline" />
//         {/* overlay your hero copy above */}
//       </section>
//     )
//   }
//
// Install dependency: npm i three

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Mode = 'timeline' | 'calendar' | 'flowchart';

type Props = {
  className?: string;
  mode?: Mode;                 // 'timeline' | 'calendar' | 'flowchart'
  desktopCount?: number;       // ~20k is a sweet spot
  mobileCount?: number;        // ~9k for phones
  morphDurationMs?: number;    // chaos -> order duration
};

export default function HeroEventFlow({
  className,
  mode = 'timeline',
  desktopCount = 20000,
  mobileCount = 9000,
  morphDurationMs = 3200
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    if (typeof window === 'undefined') return;

    // Motion & device
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia?.('(max-width: 768px)').matches ?? false;

    // Counts
    const COUNT = isMobile ? mobileCount : desktopCount;

    // Brand colors from CSS
    const css = getComputedStyle(document.documentElement);
    const brandA = css.getPropertyValue('--el-accent-1').trim() || '#64d8ff';
    const brandB = css.getPropertyValue('--el-accent-2').trim() || '#b38cff';
    const colorA = new THREE.Color(brandA);
    const colorB = new THREE.Color(brandB);

    // --- THREE setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
    const CAM_START_Z = 4.2;
    const CAM_END_Z = 5.8; // pulls back to reveal structure
    camera.position.set(0, 0, CAM_START_Z);

    const DPR = Math.min(window.devicePixelRatio || 1, 1.8);

    // --- Buffers: chaos (position) & seeds ---
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      // Disc-like chaos cloud with slight jitter
      const r = Math.sqrt(Math.random()) * 1.95;
      const a = Math.random() * Math.PI * 2;
      positions[i3 + 0] = r * Math.cos(a) + (Math.random() - 0.5) * 0.22;
      positions[i3 + 1] = r * Math.sin(a) + (Math.random() - 0.5) * 0.22;
      positions[i3 + 2] = (Math.random() - 0.5) * 1.5;

      seeds[i3 + 0] = Math.random() * 10.0;
      seeds[i3 + 1] = Math.random() * 10.0;
      seeds[i3 + 2] = Math.random() * 10.0;
    }

    // --- Targets & structural lines per mode ---
    const targets = new Float32Array(COUNT * 3);
    const auxGroup = new THREE.Group(); // grid / connectors / timeline line
    scene.add(auxGroup);

    if (mode === 'timeline') {
      buildTimelineTargetsAndLines(targets, auxGroup, isMobile, colorA, colorB, COUNT);
    } else if (mode === 'calendar') {
      buildCalendarTargetsAndGrid(targets, auxGroup, colorA, colorB, COUNT);
    } else {
      buildFlowchartTargetsAndEdges(targets, auxGroup, colorA, colorB, COUNT);
    }

    // --- Geometry / Attributes ---
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('target', new THREE.BufferAttribute(targets, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 3));

    // --- Uniforms ---
    const uniforms: Record<string, { value: any }> = {
      u_time: { value: 0 },
      u_morph: { value: 0 }, // 0 → chaos, 1 → order
      u_mouse: { value: new THREE.Vector2(9999, 9999) },
      u_mousePulse: { value: 0 }, // decays over time to create ripple pulses
      u_intensity: { value: 0.55 },
      u_size: { value: isMobile ? 1.7 : 2.3 },
      u_colorA: { value: colorA },
      u_colorB: { value: colorB },
      u_alpha: { value: 0.9 },
      u_noiseChaos: { value: 0.24 },
      u_noiseOrder: { value: 0.08 }
    };

    // --- Shaders ---
    const vertexShader = /* glsl */`
      uniform float u_time;
      uniform float u_morph;
      uniform vec2  u_mouse;
      uniform float u_mousePulse;
      uniform float u_intensity;
      uniform float u_size;
      uniform float u_noiseChaos;
      uniform float u_noiseOrder;

      attribute vec3 target;
      attribute vec3 aSeed;

      varying float vMix;
      varying float vSpark;

      // light-weight trig noise
      vec3 cheapNoise(vec3 p, float t, float amp) {
        p.x += sin(p.y * 1.37 + t * 0.62) * amp;
        p.y += sin(p.z * 1.09 + t * 0.57) * amp;
        p.z += sin(p.x * 1.21 + t * 0.71) * amp;
        return p;
      }

      void main() {
        float t = u_time;

        // chaos → order position blending (with separate noise amps)
        vec3 pChaos = cheapNoise(position + aSeed * 0.17, t, u_noiseChaos);
        vec3 pOrder = cheapNoise(target   + aSeed * 0.09, t, u_noiseOrder);
        float morph = smoothstep(0.0, 1.0, u_morph);
        vec3 p = mix(pChaos, pOrder, morph);

        // mouse field + ripple wave
        vec3 m = vec3(u_mouse, 0.0);
        vec3 toM = p - m;
        float d = length(toM) + 1e-6;

        // subtle attraction/repulsion
        float eff = u_intensity / (1.0 + d * d * 2.0);
        float fall = mix(1.0, 0.5, morph); // weaken after order emerges
        p += normalize(toM) * eff * fall;

        // ripple: outward wave that modulates perpendicular to the radius
        // wave peaks move with time; pulse factor boosts amplitude after pointer moves
        float wave = sin(d * 12.0 - t * 3.0);
        float rippleAmp = (0.08 + 0.28 * u_mousePulse) * (1.0 - 0.35 * morph);
        p.xy += normalize(p.xy - m.xy) * wave * rippleAmp / (1.0 + d * 6.0);

        // project
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;

        float dist = -mv.z;
        float hover = exp(-d * 3.0); // gentle "bounce" enlargement near cursor
        float size = u_size * (1.0 + 0.65 * sin(t * 1.2 + d * 1.4 + aSeed.x));
        size *= (1.0 + 0.9 * hover);
        gl_PointSize = clamp(size * (300.0 / dist), 1.0, 6.0);

        vMix = morph;
        vSpark = clamp(eff * 4.0 + (0.5 + 0.5 * sin(t + d * 2.0 + aSeed.y)), 0.0, 1.0);
      }
    `;

    const fragmentShader = /* glsl */`
      precision highp float;
      uniform vec3 u_colorA;
      uniform vec3 u_colorB;
      uniform float u_alpha;

      varying float vMix;
      varying float vSpark;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        // soft round sprite with feathered edge
        float mask = 1.0 - smoothstep(0.35, 0.5, r);

        // color shifts slightly as order increases + sparkle near pointer
        vec3 col = mix(u_colorA, u_colorB, clamp(vMix * 0.85 + vSpark * 0.25, 0.0, 1.0));
        float alpha = mask * (0.35 + 0.65 * vSpark) * (0.75 + 0.25 * vMix) * u_alpha;

        if (alpha < 0.015) discard;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Resize / DPR ---
    const resize = () => {
      const w = Math.max(1, wrapper.clientWidth);
      const h = Math.max(1, wrapper.clientHeight);
      renderer.setPixelRatio(DPR);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrapper);
    resize();

    // --- Mouse world mapping on z=0 plane ---
    const vec = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const setMouse = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      vec.set(x, y, 0.5).unproject(camera);
      dir.copy(vec).sub(camera.position).normalize();
      const t = -camera.position.z / dir.z;
      tmp.copy(camera.position).add(dir.multiplyScalar(t));
      (uniforms.u_mouse.value as THREE.Vector2).set(tmp.x, tmp.y);
      // trigger a pulse that decays in the render loop
      uniforms.u_mousePulse.value = 1.0;
    };
    const clearMouse = () => (uniforms.u_mouse.value as THREE.Vector2).set(9999, 9999);

    window.addEventListener('pointermove', setMouse, { passive: true });
    window.addEventListener('pointerleave', clearMouse, { passive: true });
    window.addEventListener('pointerdown', setMouse, { passive: true });

    // --- Animation ---
    const clock = new THREE.Clock();
    let rafId = 0;
    const startTime = performance.now();
    const delayMs = 700; // brief initial "chaos" hold before morph
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Fade helpers for structural lines
    const setAuxOpacity = (alpha: number) => {
      auxGroup.traverse(obj => {
        const mat = (obj as any).material as THREE.Material | undefined;
        if (mat && 'opacity' in mat) {
          (mat as THREE.MeshBasicMaterial | THREE.LineBasicMaterial).opacity = alpha;
          (mat as any).transparent = true;
        }
      });
    };

    const renderFrame = () => {
      const elapsed = performance.now() - startTime;

      if (reduceMotion) {
        // Respect reduced motion: render once in ORDER and stop
        uniforms.u_time.value = clock.getElapsedTime();
        uniforms.u_morph.value = 1.0;
        setAuxOpacity(0.22);
        camera.position.z = CAM_END_Z;
        renderer.render(scene, camera);
        return; // no rAF
      }

      // morph after delay
      let morph = 0;
      if (elapsed > delayMs) {
        const t = Math.min(1, (elapsed - delayMs) / morphDurationMs);
        morph = easeInOutCubic(t);
      }
      uniforms.u_morph.value = morph;

      // fade structural lines/grid in as order emerges
      setAuxOpacity(0.24 * morph);

      // camera pullback synchronized with morph
      camera.position.z = THREE.MathUtils.lerp(CAM_START_Z, CAM_END_Z, morph);

      // decay mouse pulse smoothly
      uniforms.u_mousePulse.value *= 0.92;

      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('pointermove', setMouse);
      window.removeEventListener('pointerleave', clearMouse);
      window.removeEventListener('pointerdown', setMouse);

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      // dispose aux objects
      auxGroup.traverse(obj => {
        if ((obj as any).geometry) (obj as any).geometry.dispose?.();
        const mat = (obj as any).material as THREE.Material | undefined;
        if (mat && 'dispose' in mat) (mat as any).dispose();
      });
      scene.clear();
    };

    // --- helpers: target builders ---
    function buildTimelineTargetsAndLines(
      tgt: Float32Array,
      group: THREE.Group,
      mobile: boolean,
      cA: THREE.Color,
      cB: THREE.Color,
      total: number
    ) {
      const MILESTONES = mobile ? 5 : 7;
      const left = -2.2, right = 2.2, span = right - left;
      const anchors: THREE.Vector3[] = [];
      for (let j = 0; j < MILESTONES; j++) {
        const t = MILESTONES <= 1 ? 0.5 : j / (MILESTONES - 1);
        anchors.push(new THREE.Vector3(left + span * t, 0, 0));
      }

      // connecting line
      const lineGeo = new THREE.BufferGeometry().setFromPoints(anchors);
      const lineMat = new THREE.LineBasicMaterial({
        color: cA.clone().lerp(cB, 0.4),
        transparent: true, opacity: 0.0
      });
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);

      // milestone tick marks
      anchors.forEach((a) => {
        const tickGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(a.x, -0.18, 0),
          new THREE.Vector3(a.x,  0.18, 0)
        ]);
        const tickMat = new THREE.LineBasicMaterial({
          color: cA.clone().lerp(cB, 0.65),
          transparent: true, opacity: 0.0
        });
        group.add(new THREE.Line(tickGeo, tickMat));
      });

      // fill targets in clusters around anchors
      const perCluster = Math.floor(total / MILESTONES);
      let idx = 0;
      for (let j = 0; j < MILESTONES; j++) {
        const anchor = anchors[j];
        const groupSize = j === MILESTONES - 1 ? (total - idx) : perCluster;

        for (let k = 0; k < groupSize; k++) {
          const i3 = (idx + k) * 3;
          const rr = Math.sqrt(Math.random());
          const ang = Math.random() * Math.PI * 2;
          const spreadX = 0.22, spreadY = 0.18, spreadZ = 0.35;

          tgt[i3 + 0] = anchor.x + Math.cos(ang) * rr * spreadX;
          const band = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 0.12);
          tgt[i3 + 1] = 0 + Math.sin(ang) * rr * spreadY + band;
          tgt[i3 + 2] = 0 + (Math.random() - 0.5) * spreadZ;
        }
        idx += groupSize;
      }
    }

    function buildCalendarTargetsAndGrid(
      tgt: Float32Array,
      group: THREE.Group,
      cA: THREE.Color,
      cB: THREE.Color,
      total: number
    ) {
      // Grid bounds
      const cols = 7, rows = 5;
      const w = 4.6, h = 2.8;
      const left = -w / 2, right = w / 2, top = h / 2, bottom = -h / 2;
      const cellW = w / cols, cellH = h / rows;

      // grid lines
      const segs: THREE.Vector3[] = [];
      for (let i = 0; i <= cols; i++) {
        const x = left + i * cellW;
        segs.push(new THREE.Vector3(x, top, 0), new THREE.Vector3(x, bottom, 0));
      }
      for (let j = 0; j <= rows; j++) {
        const y = top - j * cellH;
        segs.push(new THREE.Vector3(left, y, 0), new THREE.Vector3(right, y, 0));
      }
      const gridGeo = new THREE.BufferGeometry();
      gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(segs.flatMap(v => [v.x, v.y, v.z])), 3));
      const gridMat = new THREE.LineBasicMaterial({
        color: cA.clone().lerp(cB, 0.35),
        transparent: true, opacity: 0.0
      });
      const grid = new THREE.LineSegments(gridGeo, gridMat);
      group.add(grid);

      // assign particles to random cells; cluster near cell centers
      for (let i = 0; i < total; i++) {
        const i3 = i * 3;
        const cx = Math.floor(Math.random() * cols);
        const cy = Math.floor(Math.random() * rows);
        const centerX = left + cx * cellW + cellW / 2;
        const centerY = top - cy * cellH - cellH / 2;

        const rr = Math.sqrt(Math.random()) * 0.45;
        const ang = Math.random() * Math.PI * 2;
        tgt[i3 + 0] = centerX + Math.cos(ang) * rr * (cellW * 0.45);
        tgt[i3 + 1] = centerY + Math.sin(ang) * rr * (cellH * 0.45);
        tgt[i3 + 2] = (Math.random() - 0.5) * 0.35;
      }
    }

    function buildFlowchartTargetsAndEdges(
      tgt: Float32Array,
      group: THREE.Group,
      cA: THREE.Color,
      cB: THREE.Color,
      total: number
    ) {
      // Node anchors arranged in a gentle directed layout
      const nodes = [
        new THREE.Vector3(-2.2,  1.0, 0),  // Inquiry
        new THREE.Vector3(-0.8,  0.6, 0),  // Venue
        new THREE.Vector3(-0.8, -0.6, 0),  // Suppliers
        new THREE.Vector3( 0.8,  0.6, 0),  // Budget/Approvals
        new THREE.Vector3( 0.8, -0.6, 0),  // Logistics
        new THREE.Vector3( 2.0,  0.0, 0)   // Event Day / Summary
      ];
      const edges: Array<[number, number]> = [
        [0,1],[0,2],[1,3],[2,4],[3,5],[4,5]
      ];

      // edges as lines
      const segs: THREE.Vector3[] = [];
      edges.forEach(([a,b]) => {
        segs.push(nodes[a], nodes[b]);
      });
      const edgeGeo = new THREE.BufferGeometry().setFromPoints(segs);
      const edgeMat = new THREE.LineBasicMaterial({
        color: cA.clone().lerp(cB, 0.5),
        transparent: true, opacity: 0.0
      });
      group.add(new THREE.LineSegments(edgeGeo, edgeMat));

      // cluster sizes proportional-ish to stage importance
      const weights = [1.1, 1.0, 1.0, 1.1, 1.1, 1.3];
      const weightSum = weights.reduce((a,b)=>a+b,0);
      const counts = weights.map(w => Math.floor((w / weightSum) * total));
      counts[counts.length - 1] += total - counts.reduce((a,b)=>a+b,0); // fix rounding

      // fill targets
      let idx = 0;
      for (let n = 0; n < nodes.length; n++) {
        const anchor = nodes[n];
        const nCount = counts[n];
        for (let k = 0; k < nCount; k++) {
          const i3 = (idx + k) * 3;
          // elliptical cluster with slight elongation toward next node if any
          const rr = Math.sqrt(Math.random());
          const ang = Math.random() * Math.PI * 2;
          const spreadX = 0.26, spreadY = 0.2, spreadZ = 0.36;

          // nudge points along outgoing direction
          let dirX = 0.0, dirY = 0.0;
          const nextIdx = edges.find(e => e[0] === n)?.[1];
          if (nextIdx !== undefined) {
            const toNext = nodes[nextIdx].clone().sub(anchor).normalize();
            dirX = toNext.x * 0.12; dirY = toNext.y * 0.12;
          }

          tgt[i3 + 0] = anchor.x + Math.cos(ang) * rr * spreadX + dirX * rr;
          tgt[i3 + 1] = anchor.y + Math.sin(ang) * rr * spreadY + dirY * rr;
          tgt[i3 + 2] = (Math.random() - 0.5) * spreadZ;
        }
        idx += nCount;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, desktopCount, mobileCount, morphDurationMs]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
      <style jsx>{`
        :root {
          /* Override in your globals to match brand precisely */
          --el-accent-1: #64d8ff;
          --el-accent-2: #b38cff;
        }

        @media (prefers-reduced-motion: reduce) {
          /* Static, tasteful backdrop when motion is reduced */
          div[aria-hidden='true'] {
            background:
              radial-gradient(800px 400px at 70% -10%, rgba(255,255,255,0.12), transparent 60%),
              linear-gradient(180deg, #0b1020 0%, #0a0d17 100%);
          }
        }
      `}</style>
    </div>
  );
}