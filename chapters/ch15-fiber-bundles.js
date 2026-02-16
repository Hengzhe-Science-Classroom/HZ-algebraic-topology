window.CHAPTERS.push({
  id: 'ch15',
  number: 15,
  title: 'Fiber Bundles & Spectral Sequences',
  subtitle: 'Twisted Products and the Leray-Serre Machine',
  sections: [
    // ============================================================
    // Section 1: Fiber Bundles — Definitions and First Examples
    // ============================================================
    {
      id: 'fiber-bundles-definitions',
      title: 'Fiber Bundles: Definitions and First Examples',
      content: `
        <div class="env-block intuition">
          <p><strong>The Central Idea:</strong> A fiber bundle is a space that "locally looks like a product" \\(F \\times U\\) but may be globally twisted. The simplest example is the cylinder \\(S^1 \\times [0,1]\\) vs. the Mobius band: both are locally \\(\\mathbb{R} \\times [0,1]\\), but the Mobius band has a twist. Fiber bundles provide the geometric framework for understanding how topology can vary over a base space.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Fiber Bundle):</strong> A <em>fiber bundle</em> consists of:</p>
          <ul>
            <li>A <em>total space</em> \\(E\\),</li>
            <li>A <em>base space</em> \\(B\\),</li>
            <li>A <em>fiber</em> \\(F\\),</li>
            <li>A continuous surjection \\(\\pi: E \\to B\\),</li>
          </ul>
          <p>satisfying the <em>local triviality</em> condition: every point \\(b \\in B\\) has a neighborhood \\(U\\) such that \\(\\pi^{-1}(U) \\cong U \\times F\\) (homeomorphism compatible with \\(\\pi\\)). We write the bundle as</p>
          \\[ F \\hookrightarrow E \\xrightarrow{\\pi} B \\]
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Structure Group):</strong> The <em>transition functions</em> \\(g_{\\alpha\\beta}: U_\\alpha \\cap U_\\beta \\to \\mathrm{Homeo}(F)\\) measure how local trivializations differ on overlaps. If these can be taken in a subgroup \\(G \\leq \\mathrm{Homeo}(F)\\), we say the bundle has <em>structure group</em> \\(G\\). The transition functions satisfy the cocycle condition:</p>
          \\[ g_{\\alpha\\beta}(b) \\cdot g_{\\beta\\gamma}(b) = g_{\\alpha\\gamma}(b) \\quad \\text{on } U_\\alpha \\cap U_\\beta \\cap U_\\gamma \\]
        </div>

        <div class="env-block example">
          <p><strong>Example (Trivial Bundle):</strong> The product \\(E = B \\times F\\) with \\(\\pi = \\text{proj}_1\\) is a fiber bundle. All transition functions are the identity. This is the "untwisted" case.</p>
          <ul>
            <li>The cylinder \\(S^1 \\times I \\to S^1\\) is a trivial bundle with fiber \\(I = [0,1]\\).</li>
            <li>\\(\\mathbb{R}^n \\times \\mathbb{R}^k \\to \\mathbb{R}^n\\) is the trivial \\(\\mathbb{R}^k\\)-bundle.</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>Example (Mobius Band):</strong> The Mobius band is a fiber bundle over \\(S^1\\) with fiber \\([0,1]\\). The structure group is \\(\\mathbb{Z}/2 = \\{\\text{id}, \\text{reflection}\\}\\). There is a single nontrivial transition function that flips the fiber, making it globally non-orientable.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Covering Spaces):</strong> Every covering space \\(p: \\widetilde{X} \\to X\\) is a fiber bundle with discrete fiber. The number of sheets equals \\(|F|\\). For instance:</p>
          <ul>
            <li>\\(\\mathbb{R} \\to S^1\\) is a fiber bundle with fiber \\(\\mathbb{Z}\\)</li>
            <li>\\(S^n \\to \\mathbb{R}P^n\\) is a fiber bundle with fiber \\(\\{\\pm 1\\} = \\mathbb{Z}/2\\)</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>Example (Tangent Bundle):</strong> For a smooth \\(n\\)-manifold \\(M\\), the tangent bundle \\(TM \\to M\\) is a fiber bundle with fiber \\(\\mathbb{R}^n\\) and structure group \\(GL(n, \\mathbb{R})\\). Each fiber \\(T_pM\\) is the tangent space at \\(p\\), and the local trivializations come from coordinate charts. The tangent bundle of \\(S^2\\) is non-trivial (by the hairy ball theorem).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Section):</strong> A <em>section</em> of a fiber bundle \\(\\pi: E \\to B\\) is a continuous map \\(s: B \\to E\\) such that \\(\\pi \\circ s = \\text{id}_B\\). A section picks a point in each fiber continuously.</p>
          <p>Not every bundle admits a global section. A vector bundle always has the zero section, but a <em>nowhere-vanishing</em> section may not exist (cf. the hairy ball theorem).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Fibration):</strong> A map \\(p: E \\to B\\) is a <em>fibration</em> (or <em>Hurewicz fibration</em>) if it satisfies the <em>homotopy lifting property</em> (HLP) for all spaces: given any homotopy \\(H: X \\times I \\to B\\) and a lift \\(\\widetilde{h}_0: X \\to E\\) of \\(H(-, 0)\\), there exists a homotopy \\(\\widetilde{H}: X \\times I \\to E\\) lifting \\(H\\) with \\(\\widetilde{H}(-, 0) = \\widetilde{h}_0\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem:</strong> Every fiber bundle is a Hurewicz fibration (when the base \\(B\\) is paracompact).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Long Exact Sequence of a Fibration):</strong> For a fibration \\(F \\hookrightarrow E \\xrightarrow{p} B\\) with \\(B\\) path-connected, there is a long exact sequence of homotopy groups:</p>
          \\[
          \\cdots \\to \\pi_n(F) \\xrightarrow{i_*} \\pi_n(E) \\xrightarrow{p_*} \\pi_n(B) \\xrightarrow{\\partial} \\pi_{n-1}(F) \\to \\cdots \\to \\pi_0(F) \\to \\pi_0(E) \\to 0.
          \\]
          The connecting homomorphism \\(\\partial\\) comes from lifting homotopies in the base to the total space.
        </div>

        <div class="env-block example">
          <p><strong>Example (Path-Loop Fibration):</strong> For any space \\(X\\) with basepoint \\(x_0\\), the path space \\(PX = \\{\\gamma: [0,1] \\to X \\mid \\gamma(0) = x_0\\}\\) fibers over \\(X\\) via \\(\\gamma \\mapsto \\gamma(1)\\), with fiber \\(\\Omega X\\) (the loop space). Since \\(PX\\) is contractible, the long exact sequence gives \\(\\pi_n(\\Omega X) \\cong \\pi_{n+1}(X)\\) for all \\(n \\geq 0\\).</p>
        </div>
      `,
      visualizations: [
        {
          id: 'fiber-bundle-visualizer',
          title: 'Fiber Bundle Visualizer',
          description: 'See how fibers sit over base points: trivial bundles vs. twisted bundles like the Mobius band.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                bundleType: 'cylinder',
                animAngle: 0,
                showFibers: true,
                fiberCount: 12,
                highlightFiber: -1
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const cx = width / 2;
              const cy = height / 2 + 15;
              viz.state.animAngle += 0.008;
              const t = viz.state.animAngle;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.textAlign = 'center';

              const type = viz.state.bundleType;

              if (type === 'cylinder') {
                ctx.fillText('Trivial Bundle: S\u00B9 \u00D7 I (Cylinder)', cx, 28);

                const R = Math.min(width, height) * 0.22;
                const halfH = R * 0.7;
                const tilt = 0.3;

                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.ellipse(cx, cy - halfH, R, R * tilt, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = 'rgba(52,152,219,0.08)';
                ctx.fill();

                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.ellipse(cx, cy + halfH, R, R * tilt, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = 'rgba(52,152,219,0.08)';
                ctx.fill();

                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx - R, cy - halfH);
                ctx.lineTo(cx - R, cy + halfH);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(cx + R, cy - halfH);
                ctx.lineTo(cx + R, cy + halfH);
                ctx.stroke();

                if (viz.state.showFibers) {
                  const N = viz.state.fiberCount;
                  for (let i = 0; i < N; i++) {
                    const angle = (i / N) * Math.PI * 2 + t;
                    const bx = cx + R * Math.cos(angle);
                    const byTop = cy - halfH + R * tilt * Math.sin(angle);
                    const byBot = cy + halfH + R * tilt * Math.sin(angle);

                    const isHighlight = (i === Math.floor(t * 2) % N);
                    ctx.strokeStyle = isHighlight ? '#e74c3c' : 'rgba(231,76,60,0.35)';
                    ctx.lineWidth = isHighlight ? 3 : 1.5;
                    ctx.beginPath();
                    ctx.moveTo(bx, byTop);
                    ctx.lineTo(bx, byBot);
                    ctx.stroke();

                    if (isHighlight) {
                      ctx.fillStyle = '#e74c3c';
                      ctx.beginPath();
                      ctx.arc(bx, byTop, 4, 0, Math.PI * 2);
                      ctx.fill();
                      ctx.beginPath();
                      ctx.arc(bx, byBot, 4, 0, Math.PI * 2);
                      ctx.fill();
                    }
                  }
                }

                ctx.fillStyle = '#2c3e50';
                ctx.font = '15px KaTeX_Main, serif';
                ctx.textAlign = 'left';
                ctx.fillText('Base: S\u00B9 (circle)', 15, height - 50);
                ctx.fillText('Fiber: I = [0,1] (interval)', 15, height - 30);
                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 14px KaTeX_Main, serif';
                ctx.fillText('Globally trivial: E = S\u00B9 \u00D7 I', 15, height - 10);

              } else if (type === 'mobius') {
                ctx.fillText('Non-Trivial Bundle: Mobius Band', cx, 28);

                const bandW = Math.min(width * 0.65, 360);
                const bandH = 55;
                const x0 = cx - bandW / 2;

                const steps = 60;
                for (let i = 0; i < steps; i++) {
                  const frac = i / steps;
                  const nextFrac = (i + 1) / steps;
                  const twist = Math.PI * frac;
                  const nextTwist = Math.PI * nextFrac;

                  const halfW1 = bandH / 2 * Math.cos(twist);
                  const halfW2 = bandH / 2 * Math.cos(nextTwist);

                  const px = x0 + frac * bandW;
                  const px2 = x0 + nextFrac * bandW;
                  const py = cy + 15 * Math.sin(Math.PI * 2 * frac);
                  const py2 = cy + 15 * Math.sin(Math.PI * 2 * nextFrac);

                  ctx.fillStyle = `rgba(52,152,219,${0.1 + 0.1 * Math.abs(Math.cos(twist))})`;
                  ctx.beginPath();
                  ctx.moveTo(px, py - halfW1);
                  ctx.lineTo(px2, py2 - halfW2);
                  ctx.lineTo(px2, py2 + halfW2);
                  ctx.lineTo(px, py + halfW1);
                  ctx.closePath();
                  ctx.fill();
                }

                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                for (let i = 0; i <= steps; i++) {
                  const frac = i / steps;
                  const twist = Math.PI * frac;
                  const halfW = bandH / 2 * Math.cos(twist);
                  const px = x0 + frac * bandW;
                  const py = cy + 15 * Math.sin(Math.PI * 2 * frac);
                  if (i === 0) ctx.moveTo(px, py - halfW);
                  else ctx.lineTo(px, py - halfW);
                }
                ctx.stroke();
                ctx.beginPath();
                for (let i = 0; i <= steps; i++) {
                  const frac = i / steps;
                  const twist = Math.PI * frac;
                  const halfW = bandH / 2 * Math.cos(twist);
                  const px = x0 + frac * bandW;
                  const py = cy + 15 * Math.sin(Math.PI * 2 * frac);
                  if (i === 0) ctx.moveTo(px, py + halfW);
                  else ctx.lineTo(px, py + halfW);
                }
                ctx.stroke();

                if (viz.state.showFibers) {
                  const N = viz.state.fiberCount;
                  for (let i = 0; i < N; i++) {
                    const frac = i / N;
                    const twist = Math.PI * frac;
                    const halfW = bandH / 2 * Math.cos(twist);
                    const px = x0 + frac * bandW;
                    const py = cy + 15 * Math.sin(Math.PI * 2 * frac);

                    const isHighlight = (i === Math.floor(t * 2) % N);
                    ctx.strokeStyle = isHighlight ? '#e74c3c' : 'rgba(231,76,60,0.4)';
                    ctx.lineWidth = isHighlight ? 3 : 1.5;
                    ctx.beginPath();
                    ctx.moveTo(px, py - halfW);
                    ctx.lineTo(px, py + halfW);
                    ctx.stroke();
                  }
                }

                // Identification arrows showing twist
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 2;
                const arrowLen = 30;
                ctx.beginPath();
                ctx.moveTo(x0 - 12, cy + arrowLen / 2);
                ctx.lineTo(x0 - 12, cy - arrowLen / 2);
                ctx.stroke();
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.moveTo(x0 - 12, cy - arrowLen / 2 - 4);
                ctx.lineTo(x0 - 17, cy - arrowLen / 2 + 6);
                ctx.lineTo(x0 - 7, cy - arrowLen / 2 + 6);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(x0 + bandW + 12, cy - arrowLen / 2);
                ctx.lineTo(x0 + bandW + 12, cy + arrowLen / 2);
                ctx.stroke();
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.moveTo(x0 + bandW + 12, cy + arrowLen / 2 + 4);
                ctx.lineTo(x0 + bandW + 7, cy + arrowLen / 2 - 6);
                ctx.lineTo(x0 + bandW + 17, cy + arrowLen / 2 - 6);
                ctx.closePath();
                ctx.fill();

                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 13px KaTeX_Main, serif';
                ctx.textAlign = 'center';
                ctx.fillText('Reversed identification', cx, cy + 65);

                ctx.fillStyle = '#2c3e50';
                ctx.font = '15px KaTeX_Main, serif';
                ctx.textAlign = 'left';
                ctx.fillText('Base: S\u00B9, Fiber: I, but fiber flips around the loop', 15, height - 30);
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 14px KaTeX_Main, serif';
                ctx.fillText('Non-trivial: E \u2247 S\u00B9 \u00D7 I', 15, height - 10);

              } else if (type === 'covering') {
                ctx.fillText('Covering Space as Fiber Bundle', cx, 28);

                const R = Math.min(width, height) * 0.16;
                const baseY = cy + R + 40;
                const coverY = cy - 30;
                const layers = 4;

                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(cx, baseY, R, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#2c3e50';
                ctx.font = '14px KaTeX_Main, serif';
                ctx.textAlign = 'center';
                ctx.fillText('Base: S\u00B9', cx, baseY + R + 20);

                for (let k = 0; k < layers; k++) {
                  const ly = coverY - k * 28;
                  const alpha = 0.7 - k * 0.12;
                  ctx.strokeStyle = `rgba(231,76,60,${alpha})`;
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.arc(cx, ly, R * 0.8, 0, Math.PI * 2);
                  ctx.stroke();
                }

                const N = 6;
                for (let i = 0; i < N; i++) {
                  const angle = (i / N) * Math.PI * 2 + t;
                  const bx = cx + R * Math.cos(angle);
                  const by = baseY + R * 0.15 * Math.sin(angle);

                  for (let k = 0; k < layers; k++) {
                    const ly = coverY - k * 28;
                    const fx = cx + R * 0.8 * Math.cos(angle);
                    const fy = ly;

                    if (i === 0) {
                      ctx.strokeStyle = 'rgba(39,174,96,0.4)';
                      ctx.lineWidth = 1;
                      ctx.setLineDash([3, 3]);
                      ctx.beginPath();
                      ctx.moveTo(fx, fy);
                      ctx.lineTo(bx, by - 5);
                      ctx.stroke();
                      ctx.setLineDash([]);
                    }

                    ctx.fillStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.arc(fx, fy, 3, 0, Math.PI * 2);
                    ctx.fill();
                  }

                  if (i === 0) {
                    ctx.fillStyle = '#3498db';
                    ctx.beginPath();
                    ctx.arc(bx, by, 5, 0, Math.PI * 2);
                    ctx.fill();
                  }
                }

                ctx.fillStyle = '#e74c3c';
                ctx.font = '14px KaTeX_Main, serif';
                ctx.textAlign = 'left';
                ctx.fillText('Fiber: discrete set', 15, height - 50);
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('p: \u211D \u2192 S\u00B9 is a covering with fiber \u2124', 15, height - 30);
                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 14px KaTeX_Main, serif';
                ctx.fillText('Every covering space is a fiber bundle', 15, height - 10);
              }

              ctx.textAlign = 'start';
            },
            controls: [
              {
                type: 'select',
                label: 'Bundle Type',
                options: [
                  { value: 'cylinder', label: 'Cylinder (Trivial)' },
                  { value: 'mobius', label: 'Mobius Band (Twisted)' },
                  { value: 'covering', label: 'Covering Space' }
                ],
                action: (viz, value) => {
                  viz.state.bundleType = value;
                }
              },
              {
                type: 'button',
                label: 'Toggle Fibers',
                action: (viz) => {
                  viz.state.showFibers = !viz.state.showFibers;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'bundle-mobius-nontrivial',
          question: 'Prove that the Mobius band, viewed as a line bundle over \\(S^1\\), is not isomorphic to the trivial bundle \\(S^1 \\times [0,1]\\). (Hint: consider the boundary.)',
          hint: 'The boundary of the cylinder \\(S^1 \\times [0,1]\\) is \\(S^1 \\sqcup S^1\\) (two circles), while the boundary of the Mobius band is a single circle. A bundle isomorphism would preserve boundaries.',
          solution: `The cylinder \\(S^1 \\times [0,1]\\) has boundary \\(S^1 \\times \\{0\\} \\sqcup S^1 \\times \\{1\\}\\) -- two disjoint circles.

The Mobius band has boundary consisting of a single circle (the edge traverses the full band twice before closing).

A bundle isomorphism \\(\\phi: E_1 \\to E_2\\) covering the identity on \\(S^1\\) would restrict to a homeomorphism of boundaries. But a two-component space cannot be homeomorphic to a connected space.

Therefore the Mobius band is a nontrivial bundle over \\(S^1\\).

Alternatively: the cylinder is orientable (\\(H_2 \\neq 0\\) relative to boundary) while the Mobius band is not. Since bundle isomorphisms preserve orientability, they cannot be isomorphic. \\(\\square\\)`
        }
      ]
    },

    // ============================================================
    // Section 2: The Hopf Fibration and Principal Bundles
    // ============================================================
    {
      id: 'hopf-fibration',
      title: 'The Hopf Fibration and Principal Bundles',
      content: `
        <div class="env-block intuition">
          <p><strong>Motivation:</strong> The Hopf fibration \\(S^1 \\hookrightarrow S^3 \\xrightarrow{\\pi} S^2\\) is the most important nontrivial fiber bundle in topology. It shows that \\(S^3\\) can be decomposed into circles (fibers) parametrized by \\(S^2\\), and this decomposition is globally twisted -- \\(S^3 \\neq S^2 \\times S^1\\). It is the prototype of a <em>principal bundle</em> and connects to deep phenomena in homotopy theory.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Hopf Map):</strong> Identify \\(S^3 \\subset \\mathbb{C}^2\\) with \\(\\{(z_1, z_2) : |z_1|^2 + |z_2|^2 = 1\\}\\) and \\(S^2 \\cong \\mathbb{C}P^1\\). The <em>Hopf map</em> is:</p>
          \\[ \\pi: S^3 \\to S^2, \\quad \\pi(z_1, z_2) = [z_1 : z_2] \\]
          <p>Each fiber \\(\\pi^{-1}([z_1:z_2])\\) is a great circle in \\(S^3\\), obtained by \\((z_1, z_2) \\mapsto (e^{i\\theta}z_1, e^{i\\theta}z_2)\\). The structure group is \\(U(1) \\cong S^1\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Hopf Bundle is Nontrivial):</strong> The Hopf fibration \\(S^1 \\hookrightarrow S^3 \\to S^2\\) is a nontrivial principal \\(U(1)\\)-bundle. Equivalently, \\(S^3\\) is not homeomorphic to \\(S^2 \\times S^1\\).</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof:</strong> If the Hopf bundle were trivial, we would have \\(S^3 \\cong S^2 \\times S^1\\). But:</p>
          <ul>
            <li>\\(\\pi_1(S^3) = 0\\), while \\(\\pi_1(S^2 \\times S^1) = \\mathbb{Z}\\).</li>
          </ul>
          <p>Contradiction. Therefore the bundle is nontrivial. \\(\\square\\)</p>
          <p>More precisely, the Hopf bundle represents the generator of \\(\\pi_3(S^2) \\cong \\mathbb{Z}\\), and its first Chern class \\(c_1 = 1 \\in H^2(S^2; \\mathbb{Z}) = \\mathbb{Z}\\) classifies it as the fundamental \\(U(1)\\)-bundle over \\(S^2\\).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Principal Bundle):</strong> A <em>principal \\(G\\)-bundle</em> is a fiber bundle \\(G \\hookrightarrow P \\xrightarrow{\\pi} B\\) where \\(G\\) acts freely and transitively on each fiber (on the right), and the local trivializations are \\(G\\)-equivariant. Each fiber is a copy of \\(G\\) as a \\(G\\)-torsor.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Trivial iff Section for Principal Bundles):</strong> A principal \\(G\\)-bundle \\(P \\to B\\) is trivial if and only if it admits a global section.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Frame Bundle):</strong> For a smooth \\(n\\)-manifold \\(M\\), the <em>frame bundle</em> \\(\\mathrm{Fr}(M) \\to M\\) is a principal \\(GL(n, \\mathbb{R})\\)-bundle. Each fiber consists of all ordered bases of the tangent space \\(T_pM\\). The tangent bundle is the associated bundle \\(\\mathrm{Fr}(M) \\times_{GL(n)} \\mathbb{R}^n\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Hopf Fibrations in Other Dimensions):</strong> There are four Hopf fibrations, corresponding to the four normed division algebras:</p>
          <ul>
            <li>\\(S^0 \\hookrightarrow S^1 \\to S^1\\) (real: double cover)</li>
            <li>\\(S^1 \\hookrightarrow S^3 \\to S^2\\) (complex: the classical Hopf map)</li>
            <li>\\(S^3 \\hookrightarrow S^7 \\to S^4\\) (quaternionic)</li>
            <li>\\(S^7 \\hookrightarrow S^{15} \\to S^8\\) (octonionic)</li>
          </ul>
          <p>By Adams' theorem, these are the only fiber bundles \\(S^k \\hookrightarrow S^{2k+1} \\to S^{k+1}\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Applying LES to Hopf):</strong> For \\(S^1 \\hookrightarrow S^3 \\to S^2\\):</p>
          \\[ \\cdots \\to \\pi_n(S^1) \\to \\pi_n(S^3) \\to \\pi_n(S^2) \\to \\pi_{n-1}(S^1) \\to \\cdots \\]
          <p>Since \\(\\pi_n(S^1) = 0\\) for \\(n \\geq 2\\), this gives \\(\\pi_n(S^3) \\cong \\pi_n(S^2)\\) for \\(n \\geq 3\\). In particular:</p>
          \\[ \\pi_3(S^2) \\cong \\pi_3(S^3) \\cong \\mathbb{Z} \\]
          <p>This was Hopf's original discovery: the first example of a nontrivial higher homotopy group of a sphere!</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Hopf Invariant):</strong> For a map \\(f: S^{2n-1} \\to S^n\\) (\\(n \\geq 2\\)), form the mapping cone \\(C_f = S^n \\cup_f e^{2n}\\). The cohomology ring \\(H^*(C_f) = \\mathbb{Z}\\) in degrees 0, \\(n\\), and \\(2n\\). If \\(\\alpha\\) generates \\(H^n\\) and \\(\\beta\\) generates \\(H^{2n}\\), then \\(\\alpha^2 = h \\cdot \\beta\\) for some integer \\(h\\). This integer \\(h = H(f)\\) is the <em>Hopf invariant</em> of \\(f\\).</p>
        </div>

        <div class="env-block remark">
          <p><strong>Classification of Principal Bundles:</strong> Principal \\(G\\)-bundles over a space \\(B\\) are classified (up to isomorphism) by homotopy classes of maps \\(B \\to BG\\), where \\(BG\\) is the <em>classifying space</em> of \\(G\\). For \\(G = U(1)\\), \\(BU(1) = \\mathbb{C}P^\\infty\\), and bundles are classified by \\([B, \\mathbb{C}P^\\infty] \\cong H^2(B; \\mathbb{Z})\\) via the first Chern class.</p>
        </div>
      `,
      visualizations: [
        {
          id: 'hopf-fibration-viz',
          title: 'Hopf Fibration Visualization',
          description: 'Visualize the Hopf fibration: circles in S\u00B3 mapped to points on S\u00B2',
          canvas: {
            setup: (viz) => {
              viz.state = {
                viewAngle: 0,
                numFibers: 8,
                selectedFiber: -1,
                animating: true,
                showBase: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.fillText('Hopf Fibration: S\u00B9 \u2192 S\u00B3 \u2192 S\u00B2', 20, 28);

              const cx = width / 2;
              const cy = height / 2 + 10;
              const R = Math.min(width, height) * 0.3;

              if (viz.state.animating) {
                viz.state.viewAngle += 0.008;
              }
              const angle = viz.state.viewAngle;

              // Draw the base sphere S^2
              if (viz.state.showBase) {
                ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cx, cy, R, 0, Math.PI * 2);
                ctx.stroke();

                ctx.strokeStyle = 'rgba(52, 152, 219, 0.2)';
                ctx.beginPath();
                ctx.ellipse(cx, cy, R, R * 0.3, 0, 0, Math.PI * 2);
                ctx.stroke();
              }

              // Draw Hopf fibers as linked circles
              const nFib = viz.state.numFibers;
              const colors = [
                '#e74c3c', '#3498db', '#27ae60', '#f39c12',
                '#9b59b6', '#1abc9c', '#e67e22', '#2ecc71',
                '#e91e63', '#00bcd4', '#ff9800', '#8bc34a'
              ];

              for (let i = 0; i < nFib; i++) {
                const phi = (2 * Math.PI * i) / nFib;
                const selected = viz.state.selectedFiber === i;

                const theta0 = Math.PI * 0.3;
                const bx = Math.cos(phi + angle) * Math.sin(theta0);
                const by = Math.sin(phi + angle) * Math.sin(theta0);
                const bz = Math.cos(theta0);

                const basePx = cx + bx * R;
                const basePy = cy - bz * R * 0.8 + by * R * 0.3;

                if (viz.state.showBase) {
                  ctx.fillStyle = colors[i % colors.length];
                  ctx.globalAlpha = selected ? 1.0 : 0.6;
                  ctx.beginPath();
                  ctx.arc(basePx, basePy, selected ? 6 : 4, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.globalAlpha = 1.0;
                }

                const fiberR = R * 0.25;
                const tilt = phi + angle;
                const fiberCx = cx + Math.cos(tilt) * R * 0.5;
                const fiberCy = cy + Math.sin(tilt) * R * 0.15 - R * 0.1;

                ctx.strokeStyle = colors[i % colors.length];
                ctx.lineWidth = selected ? 3 : 1.5;
                ctx.globalAlpha = selected ? 1.0 : 0.5;
                ctx.beginPath();
                ctx.ellipse(fiberCx, fiberCy, fiberR, fiberR * 0.4, tilt * 0.5, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
              }

              // Second ring of fibers at different latitude
              for (let i = 0; i < nFib; i++) {
                const phi = (2 * Math.PI * i) / nFib + Math.PI / nFib;
                const theta1 = Math.PI * 0.65;
                const bx = Math.cos(phi + angle) * Math.sin(theta1);
                const by = Math.sin(phi + angle) * Math.sin(theta1);
                const bz = Math.cos(theta1);

                const basePx = cx + bx * R;
                const basePy = cy - bz * R * 0.8 + by * R * 0.3;

                if (viz.state.showBase) {
                  ctx.fillStyle = colors[(i + 4) % colors.length];
                  ctx.globalAlpha = 0.4;
                  ctx.beginPath();
                  ctx.arc(basePx, basePy, 3, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.globalAlpha = 1.0;
                }

                const fiberR = R * 0.35;
                const tilt = phi + angle;
                const fiberCx = cx + Math.cos(tilt + Math.PI) * R * 0.35;
                const fiberCy = cy + Math.sin(tilt) * R * 0.1 + R * 0.2;

                ctx.strokeStyle = colors[(i + 4) % colors.length];
                ctx.lineWidth = 1;
                ctx.globalAlpha = 0.35;
                ctx.beginPath();
                ctx.ellipse(fiberCx, fiberCy, fiberR, fiberR * 0.3, tilt * 0.3 + 1, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
              }

              // Annotations
              ctx.fillStyle = '#2c3e50';
              ctx.font = '14px serif';
              ctx.fillText('Each colored circle is one S\u00B9 fiber', 20, height - 70);
              ctx.fillText('Every two fibers are linked (Hopf linking number = 1)', 20, height - 50);
              ctx.fillText('\u03C0\u2083(S\u00B2) = Z, generated by this fibration', 20, height - 30);

              if (viz.state.showBase) {
                ctx.fillStyle = '#3498db';
                ctx.font = '13px serif';
                ctx.fillText('Base S\u00B2', cx + R + 10, cy);
              }
            },
            controls: [
              {
                type: 'slider',
                label: 'Fibers per ring',
                min: 4,
                max: 16,
                step: 1,
                initial: 8,
                action: (viz, value) => { viz.state.numFibers = value; }
              },
              {
                type: 'button',
                label: 'Toggle Animation',
                action: (viz) => { viz.state.animating = !viz.state.animating; }
              },
              {
                type: 'button',
                label: 'Toggle Base S\u00B2',
                action: (viz) => { viz.state.showBase = !viz.state.showBase; }
              }
            ]
          }
        },
        {
          id: 'les-fibration',
          title: 'Long Exact Sequence of a Fibration',
          description: 'Visualize the LES connecting homotopy groups of fiber, total space, and base',
          canvas: {
            setup: (viz) => {
              viz.state = {
                bundle: 'hopf',
                highlightLevel: -1
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const bundle = viz.state.bundle;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';

              const bundles = {
                hopf: {
                  label: 'Hopf: S\u00B9 \u2192 S\u00B3 \u2192 S\u00B2',
                  fiber: ['Z', '0', '0', '0', '0'],
                  total: ['Z', '0', '0', 'Z', '0'],
                  base:  ['Z', '0', 'Z', 'Z', 'Z\u2082'],
                  fiberName: 'S\u00B9', totalName: 'S\u00B3', baseName: 'S\u00B2'
                },
                covering: {
                  label: 'Universal cover: pt \u2192 R \u2192 S\u00B9',
                  fiber: ['0', '0', '0', '0', '0'],
                  total: ['0', '0', '0', '0', '0'],
                  base:  ['Z', 'Z', '0', '0', '0'],
                  fiberName: 'pt', totalName: 'R', baseName: 'S\u00B9'
                },
                pathspace: {
                  label: 'Path-loop: \u03A9B \u2192 PB \u2192 B (B=S\u00B2)',
                  fiber: ['Z', '0', 'Z', 'Z', 'Z\u2082'],
                  total: ['0', '0', '0', '0', '0'],
                  base:  ['Z', '0', 'Z', 'Z', 'Z\u2082'],
                  fiberName: '\u03A9S\u00B2', totalName: 'PS\u00B2', baseName: 'S\u00B2'
                }
              };

              const d = bundles[bundle];
              ctx.fillText(d.label, 20, 28);

              const startY = 65;
              const rowH = 42;
              const colW = Math.min(120, (width - 140) / 4);
              const startX = 30;

              ctx.font = 'bold 14px serif';
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText('n', startX, startY);
              ctx.fillStyle = '#e74c3c';
              ctx.fillText('\u03C0_n(' + d.fiberName + ')', startX + colW, startY);
              ctx.fillStyle = '#3498db';
              ctx.fillText('\u03C0_n(' + d.totalName + ')', startX + 2 * colW, startY);
              ctx.fillStyle = '#27ae60';
              ctx.fillText('\u03C0_n(' + d.baseName + ')', startX + 3 * colW, startY);

              for (let n = 0; n < 5; n++) {
                const y = startY + (n + 1) * rowH;
                const hl = viz.state.highlightLevel === n;

                if (hl) {
                  ctx.fillStyle = 'rgba(52, 152, 219, 0.08)';
                  ctx.fillRect(startX - 10, y - 15, colW * 4 + 30, rowH - 5);
                }

                ctx.font = '15px serif';
                ctx.fillStyle = '#7f8c8d';
                ctx.fillText(String(n), startX, y + 5);

                ctx.fillStyle = '#e74c3c';
                ctx.fillText(d.fiber[n], startX + colW, y + 5);

                ctx.fillStyle = '#3498db';
                ctx.fillText(d.total[n], startX + 2 * colW, y + 5);

                ctx.fillStyle = '#27ae60';
                ctx.fillText(d.base[n], startX + 3 * colW, y + 5);

                // Arrows
                const arrowY = y + 2;
                ctx.strokeStyle = '#95a5a6';
                ctx.lineWidth = 1;

                const ax1 = startX + colW + 30;
                const ax2 = startX + 2 * colW - 20;
                ctx.beginPath();
                ctx.moveTo(ax1, arrowY);
                ctx.lineTo(ax2, arrowY);
                ctx.stroke();
                ctx.fillStyle = '#95a5a6';
                ctx.beginPath();
                ctx.moveTo(ax2, arrowY);
                ctx.lineTo(ax2 - 5, arrowY - 3);
                ctx.lineTo(ax2 - 5, arrowY + 3);
                ctx.fill();

                const bx1 = startX + 2 * colW + 30;
                const bx2 = startX + 3 * colW - 25;
                ctx.beginPath();
                ctx.moveTo(bx1, arrowY);
                ctx.lineTo(bx2, arrowY);
                ctx.stroke();
                ctx.fillStyle = '#95a5a6';
                ctx.beginPath();
                ctx.moveTo(bx2, arrowY);
                ctx.lineTo(bx2 - 5, arrowY - 3);
                ctx.lineTo(bx2 - 5, arrowY + 3);
                ctx.fill();

                // Boundary map
                if (n > 0) {
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 1;
                  ctx.setLineDash([3, 3]);
                  ctx.beginPath();
                  const dx1 = startX + 3 * colW + 40;
                  const dy1 = y - rowH + 8;
                  const dx2 = startX + colW - 25;
                  const dy2 = y - 2;
                  ctx.moveTo(dx1, dy1);
                  ctx.bezierCurveTo(dx1 + 30, (dy1 + dy2) / 2, dx2 - 30, (dy1 + dy2) / 2, dx2, dy2);
                  ctx.stroke();
                  ctx.setLineDash([]);

                  ctx.fillStyle = '#9b59b6';
                  ctx.font = '11px serif';
                  ctx.fillText('\u2202', (dx1 + dx2) / 2 + 10, (dy1 + dy2) / 2 - 8);
                }
              }

              ctx.fillStyle = '#2c3e50';
              ctx.font = '13px serif';
              const legY = height - 35;
              ctx.fillText('Exact: im = ker at each node. Purple arrows = boundary maps \u2202.', 20, legY);

              if (bundle === 'hopf') {
                ctx.fillText('Key: \u03C0_n(S\u00B3) \u2245 \u03C0_n(S\u00B2) for n \u2265 3 (since \u03C0_n(S\u00B9)=0)', 20, legY + 18);
              }
            },
            controls: [
              {
                type: 'select',
                label: 'Fibration',
                options: [
                  { value: 'hopf', label: 'Hopf: S\u00B9 \u2192 S\u00B3 \u2192 S\u00B2' },
                  { value: 'covering', label: 'Cover: pt \u2192 R \u2192 S\u00B9' },
                  { value: 'pathspace', label: 'Loop-path: \u03A9S\u00B2 \u2192 PS\u00B2 \u2192 S\u00B2' }
                ],
                action: (viz, value) => { viz.state.bundle = value; }
              },
              {
                type: 'slider',
                label: 'Highlight level n',
                min: -1,
                max: 4,
                step: 1,
                initial: -1,
                action: (viz, value) => { viz.state.highlightLevel = value; }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'hopf-les-computation',
          question: 'Use the long exact sequence of the Hopf fibration \\(S^1 \\hookrightarrow S^3 \\to S^2\\) to prove \\(\\pi_2(S^2) \\cong \\mathbb{Z}\\) and \\(\\pi_3(S^2) \\cong \\mathbb{Z}\\).',
          hint: 'Write out the LES for \\(n = 2\\) and \\(n = 3\\). Use \\(\\pi_k(S^1) = 0\\) for \\(k \\geq 2\\), \\(\\pi_1(S^1) = \\mathbb{Z}\\), \\(\\pi_1(S^3) = 0\\), and \\(\\pi_3(S^3) = \\mathbb{Z}\\).',
          solution: `The LES of the Hopf fibration gives:

For \\(n = 2\\):
\\[ \\pi_2(S^1) \\to \\pi_2(S^3) \\to \\pi_2(S^2) \\xrightarrow{\\partial} \\pi_1(S^1) \\to \\pi_1(S^3) \\to \\pi_1(S^2) \\]
\\[ 0 \\to 0 \\to \\pi_2(S^2) \\xrightarrow{\\partial} \\mathbb{Z} \\to 0 \\to 0 \\]

Exactness forces \\(\\partial: \\pi_2(S^2) \\xrightarrow{\\cong} \\mathbb{Z}\\), so \\(\\pi_2(S^2) \\cong \\mathbb{Z}\\).

For \\(n = 3\\):
\\[ \\pi_3(S^1) \\to \\pi_3(S^3) \\to \\pi_3(S^2) \\xrightarrow{\\partial} \\pi_2(S^1) \\]
\\[ 0 \\to \\mathbb{Z} \\to \\pi_3(S^2) \\to 0 \\]

So \\(\\pi_3(S^2) \\cong \\pi_3(S^3) \\cong \\mathbb{Z}\\), generated by the Hopf map itself. \\(\\square\\)`
        }
      ]
    },

    // ============================================================
    // Section 3: The Leray-Serre Spectral Sequence
    // ============================================================
    {
      id: 'leray-serre-spectral-sequence',
      title: 'The Leray-Serre Spectral Sequence',
      content: `
        <div class="env-block intuition">
          <p><strong>Why Spectral Sequences?</strong> The long exact sequence of a fibration relates <em>homotopy</em> groups of fiber, total space, and base. But what about <em>homology</em>? The relationship is more subtle because homology does not split as cleanly. The <em>Leray-Serre spectral sequence</em> is the tool that systematically computes the homology of the total space from the homology of the fiber and base. It is an algebraic "successive approximation" machine.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Spectral Sequence):</strong> A <em>(cohomological) spectral sequence</em> is a sequence of bigraded abelian groups \\(\\{E_r^{p,q}\\}_{r \\geq 2}\\) with differentials</p>
          \\[ d_r: E_r^{p,q} \\to E_r^{p+r, q-r+1} \\]
          <p>such that \\(E_{r+1}^{p,q} = \\ker d_r / \\operatorname{im} d_r\\) at \\((p,q)\\). The sequence "converges" when the pages stabilize: \\(E_r = E_{r+1} = \\cdots = E_\\infty\\). The limit \\(E_\\infty\\) is related to the graded pieces of a filtration on the target.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Leray-Serre Spectral Sequence):</strong> Let \\(F \\hookrightarrow E \\xrightarrow{\\pi} B\\) be a fibration with \\(B\\) path-connected. Assume \\(\\pi_1(B)\\) acts trivially on \\(H_*(F)\\) (e.g., \\(B\\) is simply connected). Then there is a spectral sequence with:</p>
          \\[ E_2^{p,q} = H^p(B; H^q(F)) \\implies H^{p+q}(E) \\]
          <p>In words: the \\(E_2\\) page has rows indexed by cohomology of the fiber and columns by cohomology of the base. The spectral sequence converges to the cohomology of the total space.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Reading the \\(E_2\\) Page:</strong> The entry at position \\((p,q)\\) is \\(H^p(B; H^q(F))\\). Think of it as a grid:</p>
          <ul>
            <li>The bottom row (\\(q = 0\\)): \\(H^p(B; H^0(F)) \\cong H^p(B)\\). This is the cohomology of the base.</li>
            <li>The left column (\\(p = 0\\)): \\(H^0(B; H^q(F)) \\cong H^q(F)\\). This is the cohomology of the fiber.</li>
            <li>The \\(d_2\\) differential goes right 2, down 1: \\(d_2: E_2^{p,q} \\to E_2^{p+2,q-1}\\).</li>
          </ul>
          <p>If all differentials are zero (the spectral sequence "collapses at \\(E_2\\)"), then \\(H^n(E) \\cong \\bigoplus_{p+q=n} H^p(B) \\otimes H^q(F)\\), recovering the Kunneth formula for trivial bundles.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Trivial Bundle \\(E = B \\times F\\)):</strong> All differentials are zero, so \\(E_2 = E_\\infty\\), and we recover:</p>
          \\[ H^n(B \\times F) \\cong \\bigoplus_{p+q=n} H^p(B) \\otimes H^q(F) \\]
          <p>This is the Kunneth formula (over a field).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Hopf Fibration via SS):</strong> For \\(S^1 \\hookrightarrow S^3 \\to S^2\\), the \\(E_2\\) page is:</p>
          \\[ E_2^{p,q} = H^p(S^2) \\otimes H^q(S^1) \\]
          <p>The nonzero entries form a 2x3 grid: \\(E_2^{0,0} = E_2^{2,0} = E_2^{0,1} = E_2^{2,1} = \\mathbb{Z}\\). The total space \\(S^3\\) has \\(H^*(S^3) = \\{\\mathbb{Z}, 0, 0, \\mathbb{Z}\\}\\). So the spectral sequence must kill \\(E_2^{2,0}\\) and \\(E_2^{0,1}\\). Indeed, \\(d_2: E_2^{0,1} \\to E_2^{2,0}\\) is an isomorphism!</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Gysin Sequence):</strong> For an oriented sphere bundle \\(S^{n-1} \\hookrightarrow E \\to B\\), the Leray-Serre SS degenerates to a long exact sequence (the <em>Gysin sequence</em>):</p>
          \\[ \\cdots \\to H^k(E) \\to H^{k-n+1}(B) \\xrightarrow{\\cup e} H^{k+1}(B) \\to H^{k+1}(E) \\to \\cdots \\]
          <p>where \\(e \\in H^n(B)\\) is the <em>Euler class</em> of the bundle. This is a direct consequence of the SS having only two nonzero rows.</p>
        </div>

        <div class="env-block remark">
          <p><strong>The Philosophy of Spectral Sequences:</strong> Think of a spectral sequence as a "successive approximation" algorithm. The \\(E_2\\) page is the crude estimate (tensor product of fiber and base cohomology). Each page refines this by "killing" spurious classes via differentials, until \\(E_\\infty\\) gives the true answer. The art lies in identifying which differentials are nonzero.</p>
        </div>
      `,
      visualizations: [
        {
          id: 'ss-e2-page',
          title: 'Spectral Sequence E\u2082 Page',
          description: 'Visualize the E\u2082 page of the Leray-Serre spectral sequence for various bundles',
          canvas: {
            setup: (viz) => {
              viz.state = {
                bundle: 'hopf',
                page: 2,
                showDifferentials: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const bundle = viz.state.bundle;
              const page = viz.state.page;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';

              const data = {
                hopf: {
                  label: 'SS for S\u00B9 \u2192 S\u00B3 \u2192 S\u00B2',
                  maxP: 4, maxQ: 2,
                  e2: {
                    '0,0': 'Z', '2,0': 'Z',
                    '0,1': 'Z', '2,1': 'Z'
                  },
                  e3: {
                    '0,0': 'Z', '2,1': 'Z'
                  },
                  differentials2: [
                    { from: [0, 1], to: [2, 0], label: 'd\u2082 \u2245', iso: true }
                  ],
                  convergesTo: 'H*(S\u00B3) = {Z, 0, 0, Z}'
                },
                cpn: {
                  label: 'SS for S\u00B9 \u2192 S\u2075 \u2192 CP\u00B2',
                  maxP: 5, maxQ: 2,
                  e2: {
                    '0,0': 'Z', '2,0': 'Z', '4,0': 'Z',
                    '0,1': 'Z', '2,1': 'Z', '4,1': 'Z'
                  },
                  e3: {
                    '0,0': 'Z', '4,1': 'Z'
                  },
                  differentials2: [
                    { from: [0, 1], to: [2, 0], label: 'd\u2082 \u2245', iso: true },
                    { from: [2, 1], to: [4, 0], label: 'd\u2082 \u2245', iso: true }
                  ],
                  convergesTo: 'H*(S\u2075) = {Z, 0, 0, 0, 0, Z}'
                },
                trivial: {
                  label: 'SS for trivial S\u00B9 \u00D7 S\u00B2 (collapses)',
                  maxP: 4, maxQ: 2,
                  e2: {
                    '0,0': 'Z', '2,0': 'Z',
                    '0,1': 'Z', '2,1': 'Z'
                  },
                  e3: {
                    '0,0': 'Z', '2,0': 'Z',
                    '0,1': 'Z', '2,1': 'Z'
                  },
                  differentials2: [],
                  convergesTo: 'H*(S\u00B9\u00D7S\u00B2) = {Z, Z, Z, Z}'
                }
              };

              const d = data[bundle];
              ctx.fillText(d.label, 20, 28);

              const gridX = 60;
              const gridY = height - 80;
              const cellW = Math.min(70, (width - 120) / (d.maxP + 1));
              const cellH = Math.min(55, (height - 160) / (d.maxQ + 1));

              // Axes
              ctx.strokeStyle = '#2c3e50';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(gridX, gridY);
              ctx.lineTo(gridX + (d.maxP + 1) * cellW, gridY);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(gridX, gridY);
              ctx.lineTo(gridX, gridY - (d.maxQ + 1) * cellH);
              ctx.stroke();

              ctx.fillStyle = '#7f8c8d';
              ctx.font = '13px serif';
              ctx.fillText('p', gridX + d.maxP * cellW + cellW / 2, gridY + 20);
              ctx.fillText('q', gridX - 20, gridY - d.maxQ * cellH);

              // Grid lines
              ctx.strokeStyle = 'rgba(0,0,0,0.08)';
              ctx.lineWidth = 0.5;
              for (let p = 0; p <= d.maxP; p++) {
                const x = gridX + p * cellW;
                ctx.beginPath();
                ctx.moveTo(x, gridY);
                ctx.lineTo(x, gridY - (d.maxQ + 1) * cellH);
                ctx.stroke();
              }
              for (let q = 0; q <= d.maxQ; q++) {
                const y = gridY - q * cellH;
                ctx.beginPath();
                ctx.moveTo(gridX, y);
                ctx.lineTo(gridX + (d.maxP + 1) * cellW, y);
                ctx.stroke();
              }

              // Axis numbers
              ctx.fillStyle = '#7f8c8d';
              ctx.font = '12px serif';
              for (let p = 0; p <= d.maxP; p++) {
                ctx.fillText(String(p), gridX + p * cellW + cellW / 2 - 3, gridY + 15);
              }
              for (let q = 0; q <= d.maxQ; q++) {
                ctx.fillText(String(q), gridX - 15, gridY - q * cellH - cellH / 2 + 4);
              }

              const entries = page <= 2 ? d.e2 : d.e3;

              // Draw entries
              for (const [key, val] of Object.entries(entries)) {
                const [p, q] = key.split(',').map(Number);
                const x = gridX + p * cellW + cellW / 2;
                const y = gridY - q * cellH - cellH / 2;

                let bgColor = 'rgba(52, 152, 219, 0.12)';
                if (val === '0') bgColor = 'rgba(0,0,0,0.03)';
                ctx.fillStyle = bgColor;
                ctx.fillRect(gridX + p * cellW + 2, gridY - (q + 1) * cellH + 2, cellW - 4, cellH - 4);

                ctx.fillStyle = val === '0' ? '#bdc3c7' : '#2c3e50';
                ctx.font = 'bold 15px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(val, x, y);
              }

              // Draw differentials
              if (viz.state.showDifferentials && page === 2 && d.differentials2.length > 0) {
                for (const diff of d.differentials2) {
                  const [fp, fq] = diff.from;
                  const [tp, tq] = diff.to;
                  const x1 = gridX + fp * cellW + cellW / 2 + 15;
                  const y1 = gridY - fq * cellH - cellH / 2;
                  const x2 = gridX + tp * cellW + cellW / 2 - 15;
                  const y2 = gridY - tq * cellH - cellH / 2;

                  ctx.strokeStyle = diff.iso ? '#e74c3c' : '#f39c12';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.lineTo(x2, y2);
                  ctx.stroke();

                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const len = Math.sqrt(dx * dx + dy * dy);
                  const ux = dx / len;
                  const uy = dy / len;
                  ctx.fillStyle = diff.iso ? '#e74c3c' : '#f39c12';
                  ctx.beginPath();
                  ctx.moveTo(x2, y2);
                  ctx.lineTo(x2 - 8 * ux + 4 * uy, y2 - 8 * uy - 4 * ux);
                  ctx.lineTo(x2 - 8 * ux - 4 * uy, y2 - 8 * uy + 4 * ux);
                  ctx.fill();

                  ctx.fillStyle = diff.iso ? '#e74c3c' : '#f39c12';
                  ctx.font = '12px serif';
                  ctx.fillText(diff.label, (x1 + x2) / 2, (y1 + y2) / 2 - 10);
                }
              }

              ctx.textAlign = 'left';
              ctx.textBaseline = 'alphabetic';

              ctx.fillStyle = '#2c3e50';
              ctx.font = '14px serif';
              ctx.fillText('Page: E' + (page <= 2 ? '\u2082' : '\u2083 = E\u221E'), 20, height - 55);
              ctx.fillText('Converges to: ' + d.convergesTo, 20, height - 35);

              if (page === 2 && d.differentials2.length > 0) {
                ctx.fillStyle = '#e74c3c';
                ctx.fillText('Red arrows: nontrivial d\u2082 differentials', 20, height - 15);
              } else if (page === 2 && d.differentials2.length === 0) {
                ctx.fillStyle = '#27ae60';
                ctx.fillText('No differentials: SS collapses at E\u2082 (Kunneth!)', 20, height - 15);
              }
            },
            controls: [
              {
                type: 'select',
                label: 'Bundle',
                options: [
                  { value: 'hopf', label: 'Hopf: S\u00B9 \u2192 S\u00B3 \u2192 S\u00B2' },
                  { value: 'cpn', label: 'S\u00B9 \u2192 S\u2075 \u2192 CP\u00B2' },
                  { value: 'trivial', label: 'Trivial: S\u00B9 \u00D7 S\u00B2' }
                ],
                action: (viz, value) => { viz.state.bundle = value; viz.state.page = 2; }
              },
              {
                type: 'slider',
                label: 'Page',
                min: 2,
                max: 3,
                step: 1,
                initial: 2,
                action: (viz, value) => { viz.state.page = value; }
              },
              {
                type: 'button',
                label: 'Toggle Differentials',
                action: (viz) => { viz.state.showDifferentials = !viz.state.showDifferentials; }
              }
            ]
          }
        },
        {
          id: 'ss-convergence-walkthrough',
          title: 'Spectral Sequence Convergence',
          description: 'Walk through the spectral sequence step by step for the Hopf bundle',
          canvas: {
            setup: (viz) => {
              viz.state = {
                step: 0,
                animPhase: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const step = viz.state.step;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.fillText('Convergence Walkthrough: Hopf Bundle', 20, 28);

              const cx = width / 2;
              const steps = [
                {
                  title: 'Step 1: E\u2082 page = H*(S\u00B2) \u2297 H*(S\u00B9)',
                  desc: 'Naive guess: 4 nonzero groups',
                  grid: [
                    { p: 0, q: 0, val: 'Z', color: '#3498db' },
                    { p: 2, q: 0, val: 'Z', color: '#3498db' },
                    { p: 0, q: 1, val: 'Z', color: '#e74c3c' },
                    { p: 2, q: 1, val: 'Z', color: '#e74c3c' }
                  ]
                },
                {
                  title: 'Step 2: d\u2082 kills two terms',
                  desc: 'd\u2082: E\u2082^{0,1} \u2192 E\u2082^{2,0} is an isomorphism',
                  grid: [
                    { p: 0, q: 0, val: 'Z', color: '#3498db' },
                    { p: 2, q: 0, val: 'Z', color: '#95a5a6', strike: true },
                    { p: 0, q: 1, val: 'Z', color: '#95a5a6', strike: true },
                    { p: 2, q: 1, val: 'Z', color: '#e74c3c' }
                  ]
                },
                {
                  title: 'Step 3: E\u221E = E\u2083',
                  desc: 'Only diagonal (0,0) and (2,1) survive',
                  grid: [
                    { p: 0, q: 0, val: 'Z', color: '#27ae60' },
                    { p: 2, q: 1, val: 'Z', color: '#27ae60' }
                  ]
                },
                {
                  title: 'Step 4: Reassemble H*(S\u00B3)',
                  desc: 'H\u2070=Z (from 0+0), H\u00B3=Z (from 2+1), rest 0',
                  grid: []
                }
              ];

              const s = steps[step];
              ctx.font = '16px serif';
              ctx.fillText(s.title, 20, 60);
              ctx.font = '14px serif';
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText(s.desc, 20, 82);

              if (step < 3) {
                const gridX = 80;
                const gridY = height - 100;
                const cellW = Math.min(80, (width - 200) / 5);
                const cellH = 60;

                ctx.strokeStyle = '#2c3e50';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(gridX, gridY);
                ctx.lineTo(gridX + 4 * cellW, gridY);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(gridX, gridY);
                ctx.lineTo(gridX, gridY - 3 * cellH);
                ctx.stroke();

                ctx.fillStyle = '#7f8c8d';
                ctx.font = '12px serif';
                for (let p = 0; p <= 3; p++) ctx.fillText(String(p), gridX + p * cellW + cellW / 2, gridY + 15);
                for (let q = 0; q <= 1; q++) ctx.fillText(String(q), gridX - 15, gridY - q * cellH - cellH / 2 + 4);

                for (const entry of s.grid) {
                  const x = gridX + entry.p * cellW + cellW / 2;
                  const y = gridY - entry.q * cellH - cellH / 2;

                  ctx.fillStyle = entry.color + '22';
                  ctx.fillRect(gridX + entry.p * cellW + 2, gridY - (entry.q + 1) * cellH + 2, cellW - 4, cellH - 4);

                  ctx.fillStyle = entry.color;
                  ctx.font = 'bold 18px serif';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText(entry.val, x, y);

                  if (entry.strike) {
                    ctx.strokeStyle = '#e74c3c';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(x - 12, y - 8);
                    ctx.lineTo(x + 12, y + 8);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(x + 12, y - 8);
                    ctx.lineTo(x - 12, y + 8);
                    ctx.stroke();
                  }
                }

                // Draw d2 arrow in step 1
                if (step === 1) {
                  const x1 = gridX + 0 * cellW + cellW / 2 + 15;
                  const y1 = gridY - 1 * cellH - cellH / 2;
                  const x2 = gridX + 2 * cellW + cellW / 2 - 15;
                  const y2 = gridY - 0 * cellH - cellH / 2;
                  ctx.strokeStyle = '#e74c3c';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.lineTo(x2, y2);
                  ctx.stroke();
                  ctx.fillStyle = '#e74c3c';
                  ctx.font = '12px serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('d\u2082 (iso!)', (x1 + x2) / 2, (y1 + y2) / 2 - 12);
                }

                ctx.textAlign = 'left';
                ctx.textBaseline = 'alphabetic';

              } else {
                // Step 3: show final H*(S^3)
                const barX = 80;
                const barW = 60;
                const maxH = height * 0.3;
                const baseY = height - 80;

                const hGroups = [
                  { n: 0, val: 'Z', rank: 1 },
                  { n: 1, val: '0', rank: 0 },
                  { n: 2, val: '0', rank: 0 },
                  { n: 3, val: 'Z', rank: 1 }
                ];

                for (const g of hGroups) {
                  const x = barX + g.n * (barW + 20);
                  const h = g.rank * maxH;

                  ctx.fillStyle = g.rank > 0 ? '#27ae60' : 'rgba(0,0,0,0.05)';
                  ctx.fillRect(x, baseY - h, barW, h || 3);

                  ctx.fillStyle = '#2c3e50';
                  ctx.font = 'bold 16px serif';
                  ctx.textAlign = 'center';
                  ctx.fillText(g.val, x + barW / 2, baseY - h - 15);
                  ctx.font = '14px serif';
                  ctx.fillText('H' + g.n, x + barW / 2, baseY + 18);
                }

                ctx.textAlign = 'left';
                ctx.fillStyle = '#2c3e50';
                ctx.font = '15px serif';
                ctx.fillText('H*(S\u00B3; Z) = {Z, 0, 0, Z}  -- confirmed!', barX, baseY + 45);
              }
            },
            controls: [
              {
                type: 'slider',
                label: 'Step',
                min: 0,
                max: 3,
                step: 1,
                initial: 0,
                action: (viz, value) => { viz.state.step = value; }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ss-cp2-bundle',
          question: 'Use the Leray-Serre spectral sequence for the fibration \\(S^1 \\hookrightarrow S^5 \\to \\mathbb{C}P^2\\) to verify \\(H^*(S^5)\\). Identify which \\(d_2\\) differentials must be isomorphisms.',
          hint: 'The \\(E_2\\) page has entries \\(E_2^{p,q} = H^p(\\mathbb{C}P^2) \\otimes H^q(S^1)\\). There are 6 nonzero entries. Since \\(H^*(S^5)\\) has only \\(H^0 = H^5 = \\mathbb{Z}\\), four entries must be killed by \\(d_2\\).',
          solution: `The \\(E_2\\) page: \\(H^*(\\mathbb{C}P^2) = \\{\\mathbb{Z}, 0, \\mathbb{Z}, 0, \\mathbb{Z}\\}\\) and \\(H^*(S^1) = \\{\\mathbb{Z}, \\mathbb{Z}\\}\\).

Nonzero entries:
\\[ E_2^{0,0} = E_2^{2,0} = E_2^{4,0} = E_2^{0,1} = E_2^{2,1} = E_2^{4,1} = \\mathbb{Z} \\]

Target: \\(H^n(S^5) = \\mathbb{Z}\\) for \\(n = 0, 5\\) and \\(0\\) otherwise.

On the diagonal \\(p+q = n\\):
- \\(n = 0\\): only \\(E^{0,0} = \\mathbb{Z}\\). Survives. Good.
- \\(n = 1\\): only \\(E^{0,1} = \\mathbb{Z}\\). Must die.
- \\(n = 2\\): \\(E^{2,0} = \\mathbb{Z}\\). Must die.
- \\(n = 3\\): \\(E^{2,1} = \\mathbb{Z}\\). Must die.
- \\(n = 4\\): \\(E^{4,0} = \\mathbb{Z}\\). Must die.
- \\(n = 5\\): \\(E^{4,1} = \\mathbb{Z}\\). Must survive.

The differentials \\(d_2: E_2^{p,1} \\to E_2^{p+2,0}\\):
- \\(d_2: E_2^{0,1} \\to E_2^{2,0}\\): must be an isomorphism (kills both)
- \\(d_2: E_2^{2,1} \\to E_2^{4,0}\\): must be an isomorphism (kills both)

After \\(d_2\\): \\(E_3^{0,0} = \\mathbb{Z}\\), \\(E_3^{4,1} = \\mathbb{Z}\\), all else zero. This is \\(E_\\infty\\).

Reassembling: \\(H^0(S^5) = \\mathbb{Z}\\), \\(H^5(S^5) = \\mathbb{Z}\\), all else zero. Correct! \\(\\square\\)`
        }
      ]
    },

    // ============================================================
    // Section 4: Applications — Computing with Fiber Bundles
    // ============================================================
    {
      id: 'applications-computing',
      title: 'Applications: Computing with Fiber Bundles',
      content: `
        <div class="env-block intuition">
          <p><strong>The Payoff:</strong> Armed with fiber bundles and spectral sequences, we can compute (co)homology groups that would be intractable by direct methods. The strategy is always: find a fibration, write down the \\(E_2\\) page, determine differentials, and read off the answer.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Homology of \\(\\Omega S^n\\), \\(n \\geq 2\\)):</strong></p>
          \\[ H_*(\\Omega S^n; \\mathbb{Z}) \\cong \\mathbb{Z}[x], \\quad \\deg(x) = n-1. \\]
          <p>That is, \\(H_k(\\Omega S^n) \\cong \\mathbb{Z}\\) if \\((n-1) \\mid k\\), and \\(0\\) otherwise. This is a polynomial algebra on one generator of degree \\(n-1\\).</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof Sketch:</strong> Consider the path-loop fibration \\(\\Omega S^n \\hookrightarrow PS^n \\to S^n\\).</p>
          <ul>
            <li>\\(PS^n\\) is contractible, so \\(H_k(PS^n) = 0\\) for \\(k > 0\\)</li>
            <li>\\(E^2_{p,q} = H_p(S^n; H_q(\\Omega S^n))\\), which is nonzero only for \\(p = 0\\) and \\(p = n\\)</li>
            <li>The \\(E^2\\) page has exactly two columns: \\(p = 0\\) and \\(p = n\\)</li>
          </ul>
          <p>Since \\(E^\\infty = 0\\) (except at total degree 0), the differentials \\(d^n: E^n_{n,q} \\to E^n_{0,q+n-1}\\) must be isomorphisms for \\(q \\geq 0\\). Starting with \\(H_0(\\Omega S^n) = \\mathbb{Z}\\), we inductively get \\(H_{k(n-1)}(\\Omega S^n) = \\mathbb{Z}\\) for all \\(k \\geq 0\\). \\(\\square\\)</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Cohomology of \\(\\mathbb{C}P^n\\)):</strong> The fibration \\(S^1 \\hookrightarrow S^{2n+1} \\to \\mathbb{C}P^n\\) allows an inductive computation. By the Gysin sequence (or directly from the Leray-Serre SS):</p>
          \\[ H^*(\\mathbb{C}P^n; \\mathbb{Z}) = \\mathbb{Z}[x]/(x^{n+1}), \\quad |x| = 2 \\]
          <p>where \\(x\\) is the first Chern class of the tautological line bundle. The cohomology ring is a truncated polynomial algebra.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Cohomology of \\(BU(1) = \\mathbb{C}P^\\infty\\)):</strong> Taking \\(n \\to \\infty\\), we get the classifying space of \\(U(1)\\):</p>
          \\[ H^*(\\mathbb{C}P^\\infty; \\mathbb{Z}) = \\mathbb{Z}[x], \\quad |x| = 2 \\]
          <p>a polynomial algebra in one generator. This is the universal home for first Chern classes.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Thom Isomorphism):</strong> Let \\(\\xi: E \\to B\\) be an oriented rank-\\(n\\) real vector bundle with Thom space \\(\\text{Th}(\\xi)\\). Then:</p>
          \\[ \\tilde{H}^{k+n}(\\text{Th}(\\xi); \\mathbb{Z}) \\cong H^k(B; \\mathbb{Z}) \\]
          <p>The isomorphism is given by cupping with the <em>Thom class</em> \\(u \\in H^n(\\text{Th}(\\xi))\\). Combined with Poincare duality, this connects the Euler class, Thom class, and intersection theory.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Leray-Hirsch):</strong> Let \\(F \\hookrightarrow E \\to B\\) be a fiber bundle. Suppose there exist classes \\(e_1, \\ldots, e_r \\in H^*(E; R)\\) whose restrictions to each fiber form a basis for \\(H^*(F; R)\\). Then as an \\(H^*(B; R)\\)-module:</p>
          \\[ H^*(E; R) \\cong H^*(B; R) \\otimes_R \\langle e_1, \\ldots, e_r \\rangle \\]
          <p>This is the "easy" case where the spectral sequence collapses, generalizing Kunneth to non-trivial bundles.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Flag Manifolds):</strong> The complete flag manifold \\(\\mathrm{Fl}(\\mathbb{C}^n) = U(n)/T^n\\) has a tower of fibrations:</p>
          \\[ \\mathbb{C}P^{n-1} \\to \\mathrm{Fl}(\\mathbb{C}^n) \\to \\mathrm{Fl}(\\mathbb{C}^{n-1}) \\]
          <p>Iterating the Leray-Hirsch theorem gives \\(H^*(\\mathrm{Fl}(\\mathbb{C}^n); \\mathbb{Z}) = \\mathbb{Z}[x_1, \\ldots, x_n] / \\text{(symmetric functions)}\\), where \\(|x_i| = 2\\). This connects to the theory of Schubert calculus and the cohomology of Grassmannians.</p>
        </div>

        <div class="env-block remark">
          <p><strong>The Bigger Picture:</strong> Fiber bundles, spectral sequences, and characteristic classes form a tightly interwoven trio that pervades modern topology and geometry:</p>
          <ul>
            <li><em>Fiber bundles</em> are the geometric objects.</li>
            <li><em>Characteristic classes</em> (Chapter 16) are the algebraic invariants that classify them.</li>
            <li><em>Spectral sequences</em> are the computational engine that connects fiber, base, and total space.</li>
          </ul>
          <p>Together, they allow us to reduce global topological questions to local and algebraic ones.</p>
        </div>
      `,
      visualizations: [
        {
          id: 'leray-serre-calculator',
          title: 'Leray-Serre Calculator',
          description: 'Select a fibration and see the spectral sequence computation step by step.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                fibration: 'omega-s2',
                step: 0,
                animPhase: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              viz.state.animPhase += 0.01;
              const fib = viz.state.fibration;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 17px KaTeX_Main, serif';
              ctx.textAlign = 'center';

              if (fib === 'omega-s2') {
                ctx.fillText('Computing H*(\u03A9S\u00B2) via \u03A9S\u00B2 \u2192 PS\u00B2 \u2192 S\u00B2', width / 2, 25);
              } else if (fib === 'omega-s3') {
                ctx.fillText('Computing H*(\u03A9S\u00B3) via \u03A9S\u00B3 \u2192 PS\u00B3 \u2192 S\u00B3', width / 2, 25);
              } else if (fib === 'gysin-cpn') {
                ctx.fillText('Gysin: S\u00B9 \u2192 S\u2075 \u2192 \u2102P\u00B2', width / 2, 25);
              }

              const boxX = 20;
              const boxY = 45;
              const boxW = width - 40;
              const boxH = height - 60;

              ctx.fillStyle = 'rgba(236,240,241,0.5)';
              ctx.fillRect(boxX, boxY, boxW, boxH);

              ctx.font = '14px KaTeX_Main, serif';
              ctx.textAlign = 'left';
              ctx.fillStyle = '#2c3e50';

              let lines = [];

              if (fib === 'omega-s2') {
                lines = [
                  { text: 'Step 1: Fibration \u03A9S\u00B2 \u2192 PS\u00B2 \u2192 S\u00B2', bold: true },
                  { text: '  E = PS\u00B2 is contractible, so H*(E) = \u2124 in degree 0 only.' },
                  { text: '  B = S\u00B2: H\u2080 = \u2124, H\u2082 = \u2124, rest = 0.' },
                  { text: '' },
                  { text: 'Step 2: E\u00B2 page', bold: true },
                  { text: '  E\u00B2_{p,q} = H_p(S\u00B2) \u2297 H_q(\u03A9S\u00B2)' },
                  { text: '  Two columns: p = 0 and p = 2.' },
                  { text: '  E\u00B2_{0,q} = H_q(\u03A9S\u00B2),  E\u00B2_{2,q} = H_q(\u03A9S\u00B2).' },
                  { text: '' },
                  { text: 'Step 3: Differentials', bold: true },
                  { text: '  Only d\u2082: E\u00B2_{2,q} \u2192 E\u00B2_{0,q+1} can be nonzero.' },
                  { text: '  For E\u221E = 0 (above degree 0), d\u2082 must be iso for q \u2265 0.' },
                  { text: '' },
                  { text: 'Step 4: Induction', bold: true },
                  { text: '  H\u2080(\u03A9S\u00B2) = \u2124  (known).' },
                  { text: '  d\u2082: H\u2080(\u03A9S\u00B2) \u2245 H\u2081(\u03A9S\u00B2),  so H\u2081 = \u2124.' },
                  { text: '  d\u2082: H\u2081(\u03A9S\u00B2) \u2245 H\u2082(\u03A9S\u00B2),  so H\u2082 = \u2124.' },
                  { text: '  Continue: H_k(\u03A9S\u00B2) = \u2124 for all k \u2265 0.' },
                  { text: '' },
                  { text: 'Result: H*(\u03A9S\u00B2) \u2245 \u2124[x], deg(x) = 1.', bold: true, color: '#27ae60' }
                ];
              } else if (fib === 'omega-s3') {
                lines = [
                  { text: 'Step 1: Fibration \u03A9S\u00B3 \u2192 PS\u00B3 \u2192 S\u00B3', bold: true },
                  { text: '  E = PS\u00B3 contractible. B = S\u00B3: H\u2080 = H\u2083 = \u2124.' },
                  { text: '' },
                  { text: 'Step 2: E\u00B2 page', bold: true },
                  { text: '  Two columns: p = 0 and p = 3.' },
                  { text: '  Only differential: d\u2083: E\u00B3_{3,q} \u2192 E\u00B3_{0,q+2}.' },
                  { text: '' },
                  { text: 'Step 3: d\u2082 = 0 (no nonzero source/target pairs)', bold: true },
                  { text: '  So E\u00B3 = E\u00B2. Then d\u2083 must kill everything.' },
                  { text: '' },
                  { text: 'Step 4: Induction', bold: true },
                  { text: '  H\u2080(\u03A9S\u00B3) = \u2124.' },
                  { text: '  d\u2083: H\u2080 \u2245 H\u2082,  so H\u2082 = \u2124.' },
                  { text: '  d\u2083: H\u2082 \u2245 H\u2084,  so H\u2084 = \u2124.' },
                  { text: '  H\u2081 must be 0 (no differential targets it).' },
                  { text: '  H\u2083 = 0 similarly.' },
                  { text: '' },
                  { text: 'Result: H_{2k}(\u03A9S\u00B3) = \u2124, H_{odd} = 0.', bold: true, color: '#27ae60' },
                  { text: 'H*(\u03A9S\u00B3) \u2245 \u2124[x], deg(x) = 2.', bold: true, color: '#27ae60' }
                ];
              } else if (fib === 'gysin-cpn') {
                lines = [
                  { text: 'Gysin sequence for S\u00B9 \u2192 S\u2075 \u2192 \u2102P\u00B2', bold: true },
                  { text: '' },
                  { text: '... \u2192 H_k(S\u2075) \u2192 H_k(\u2102P\u00B2) \u2192 H_{k-2}(\u2102P\u00B2) \u2192 H_{k-1}(S\u2075) \u2192 ...', bold: true },
                  { text: '' },
                  { text: 'k = 0: 0 \u2192 H\u2080(\u2102P\u00B2) \u2192 0.  So H\u2080 = \u2124.' },
                  { text: 'k = 1: 0 \u2192 H\u2081(\u2102P\u00B2) \u2192 0.  So H\u2081 = 0.' },
                  { text: 'k = 2: 0 \u2192 H\u2082(\u2102P\u00B2) \u2192 H\u2080(\u2102P\u00B2) \u2192 0.' },
                  { text: '  So H\u2082 \u2245 H\u2080 = \u2124 (e\u00B7: multiplication by Euler class).' },
                  { text: 'k = 3: 0 \u2192 H\u2083(\u2102P\u00B2) \u2192 H\u2081 = 0.  So H\u2083 = 0.' },
                  { text: 'k = 4: 0 \u2192 H\u2084(\u2102P\u00B2) \u2192 H\u2082 = \u2124 \u2192 0.' },
                  { text: '  So H\u2084 \u2245 \u2124.' },
                  { text: 'k = 5: \u2124 \u2192 H\u2085(\u2102P\u00B2). But dim(\u2102P\u00B2) = 4, so H\u2085 = 0.' },
                  { text: '' },
                  { text: 'Result: H*(\u2102P\u00B2) = (\u2124, 0, \u2124, 0, \u2124).', bold: true, color: '#27ae60' }
                ];
              }

              let y = boxY + 22;
              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.text === '') { y += 8; continue; }
                ctx.font = (line.bold ? 'bold ' : '') + '14px KaTeX_Main, serif';
                ctx.fillStyle = line.color || '#2c3e50';
                ctx.fillText(line.text, boxX + 12, y);
                y += 20;
              }

              ctx.textAlign = 'start';
            },
            controls: [
              {
                type: 'select',
                label: 'Fibration',
                options: [
                  { value: 'omega-s2', label: '\u03A9S\u00B2 \u2192 PS\u00B2 \u2192 S\u00B2' },
                  { value: 'omega-s3', label: '\u03A9S\u00B3 \u2192 PS\u00B3 \u2192 S\u00B3' },
                  { value: 'gysin-cpn', label: 'Gysin: S\u00B9 \u2192 S\u2075 \u2192 \u2102P\u00B2' }
                ],
                action: (viz, value) => {
                  viz.state.fibration = value;
                  viz.state.step = 0;
                }
              }
            ]
          }
        },
        {
          id: 'cpn-cohomology-ring',
          title: 'Cohomology Ring of CP^n',
          description: 'Visualize the truncated polynomial ring H*(CP^n) = Z[x]/(x^{n+1})',
          canvas: {
            setup: (viz) => {
              viz.state = {
                n: 3,
                showRing: true,
                highlightDegree: -1
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const n = viz.state.n;

              function superscript(num) {
                const sups = ['\u2070', '\u00B9', '\u00B2', '\u00B3', '\u2074', '\u2075', '\u2076', '\u2077'];
                if (num < sups.length) return sups[num];
                return String(num);
              }

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.fillText(`H*(CP${superscript(n)}; Z) = Z[x] / (x${superscript(n + 1)})`, 20, 28);
              ctx.font = '14px serif';
              ctx.fillText(`where |x| = 2, so generators in degrees 0, 2, 4, ..., ${2 * n}`, 20, 50);

              const barW = Math.min(60, (width - 80) / (n + 2));
              const maxBarH = height * 0.4;
              const baseY = height * 0.75;
              const startX = (width - (n + 1) * barW * 1.5) / 2;

              for (let k = 0; k <= n; k++) {
                const x = startX + k * barW * 1.5;
                const deg = 2 * k;
                const barH = maxBarH * 0.8;

                const hl = viz.state.highlightDegree === k;

                const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c'];
                ctx.fillStyle = hl ? colors[k % colors.length] : colors[k % colors.length] + '99';
                ctx.fillRect(x, baseY - barH, barW, barH);
                ctx.strokeStyle = '#2c3e50';
                ctx.lineWidth = 1;
                ctx.strokeRect(x, baseY - barH, barW, barH);

                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 15px serif';
                ctx.textAlign = 'center';
                const genLabel = k === 0 ? '1' : (k === 1 ? 'x' : `x${superscript(k)}`);
                ctx.fillText(genLabel, x + barW / 2, baseY - barH - 12);

                ctx.font = '13px serif';
                ctx.fillText(`deg ${deg}`, x + barW / 2, baseY + 18);
                ctx.fillText('Z', x + barW / 2, baseY + 35);
              }

              // Truncation
              const truncX = startX + (n + 1) * barW * 1.5;
              ctx.fillStyle = '#e74c3c';
              ctx.font = 'bold 15px serif';
              ctx.textAlign = 'center';
              ctx.fillText(`x${superscript(n + 1)} = 0`, truncX, baseY - maxBarH * 0.4);
              ctx.strokeStyle = '#e74c3c';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(truncX - 15, baseY - maxBarH * 0.4 + 5);
              ctx.lineTo(truncX + 15, baseY - maxBarH * 0.4 + 5);
              ctx.stroke();

              ctx.textAlign = 'left';

              if (viz.state.showRing) {
                ctx.fillStyle = '#7f8c8d';
                ctx.font = '14px serif';
                ctx.fillText('Ring structure: x^a cup x^b = x^{a+b} if a+b <= n, else 0', 20, height - 35);
                ctx.fillText('Poincare duality: H^{2k} paired with H^{2n-2k} via cup product', 20, height - 15);
              }
            },
            controls: [
              {
                type: 'slider',
                label: 'n (CP^n)',
                min: 1,
                max: 6,
                step: 1,
                initial: 3,
                action: (viz, value) => { viz.state.n = value; }
              },
              {
                type: 'slider',
                label: 'Highlight degree',
                min: -1,
                max: 6,
                step: 1,
                initial: -1,
                action: (viz, value) => { viz.state.highlightDegree = value; }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'loop-space-omega-s4',
          question: 'Use the path-loop fibration \\(\\Omega S^4 \\hookrightarrow PS^4 \\to S^4\\) and the Leray-Serre spectral sequence to compute \\(H_k(\\Omega S^4)\\) for \\(0 \\leq k \\leq 12\\).',
          hint: 'The \\(E^2\\) page has two columns at \\(p = 0\\) and \\(p = 4\\). The only possibly nonzero differential is \\(d^4: E^4_{4,q} \\to E^4_{0,q+3}\\). Use the fact that \\(E^\\infty = 0\\) above degree 0.',
          solution: `Fibration: \\(\\Omega S^4 \\hookrightarrow PS^4 \\to S^4\\) with \\(PS^4 \\simeq *\\).

\\(E^2\\) page: \\(E^2_{p,q} = H_p(S^4; H_q(\\Omega S^4))\\). Nonzero only at \\(p = 0, 4\\).
Two columns: \\(E^2_{0,q} = H_q(\\Omega S^4)\\) and \\(E^2_{4,q} = H_q(\\Omega S^4)\\).

Differentials \\(d^2, d^3\\) are zero (no nonzero source-target pairs in the two-column setup). So \\(E^4 = E^2\\).

\\(d^4: E^4_{4,q} \\to E^4_{0,q+3}\\) must be isomorphisms for all \\(q \\geq 0\\) (since \\(E^\\infty = 0\\) above degree 0).

Induction: \\(H_0(\\Omega S^4) = \\mathbb{Z}\\). Then:
- \\(d^4: H_0 \\xrightarrow{\\cong} H_3\\), so \\(H_3 = \\mathbb{Z}\\)
- \\(d^4: H_3 \\xrightarrow{\\cong} H_6\\), so \\(H_6 = \\mathbb{Z}\\)
- \\(d^4: H_6 \\xrightarrow{\\cong} H_9\\), so \\(H_9 = \\mathbb{Z}\\)
- \\(d^4: H_9 \\xrightarrow{\\cong} H_{12}\\), so \\(H_{12} = \\mathbb{Z}\\)

For degrees not divisible by 3: \\(H_1 = H_2 = H_4 = H_5 = H_7 = H_8 = H_{10} = H_{11} = 0\\).

Result: \\(H_k(\\Omega S^4) = \\begin{cases} \\mathbb{Z} & 3 \\mid k \\\\ 0 & \\text{otherwise} \\end{cases}\\) for \\(0 \\leq k \\leq 12\\). \\(\\square\\)`
        },
        {
          id: 'gysin-euler-class',
          question: 'The unit tangent bundle of \\(S^2\\) gives a fibration \\(S^1 \\hookrightarrow T_1 S^2 \\to S^2\\). Using the Gysin sequence, show that \\(T_1 S^2 \\cong \\mathrm{SO}(3) \\cong \\mathbb{R}P^3\\), and compute \\(H^*(T_1 S^2; \\mathbb{Z})\\). (The Euler class of \\(TS^2\\) is \\(e = 2 \\in H^2(S^2)\\).)',
          hint: 'The Gysin sequence for an \\(S^1\\)-bundle is \\(\\cdots \\to H^k(E) \\to H^{k-1}(B) \\xrightarrow{\\cup e} H^{k+1}(B) \\to H^{k+1}(E) \\to \\cdots\\). The Euler class \\(e = 2\\) means the cup product map is multiplication by 2.',
          solution: `The Gysin sequence for the \\(S^1\\)-bundle \\(S^1 \\hookrightarrow T_1 S^2 \\to S^2\\) gives:

\\[ \\cdots \\to H^k(T_1 S^2) \\to H^{k-1}(S^2) \\xrightarrow{\\cup e} H^{k+1}(S^2) \\to H^{k+1}(T_1 S^2) \\to \\cdots \\]

Since \\(e = 2 \\in H^2(S^2) \\cong \\mathbb{Z}\\), the map \\(\\cup e: H^0(S^2) \\to H^2(S^2)\\) is \\(1 \\mapsto 2\\), i.e., multiplication by 2.

Setting up relevant parts:
- \\(k = 0\\): \\(H^0(T_1 S^2) \\xleftarrow{} \\cdots\\) gives \\(H^0 = \\mathbb{Z}\\).
- \\(k = 1\\): \\(0 \\to H^1(T_1 S^2) \\to H^0(S^2) \\xrightarrow{\\times 2} H^2(S^2) \\to H^2(T_1 S^2) \\to H^1(S^2) = 0\\)

  i.e., \\(0 \\to H^1(T_1 S^2) \\to \\mathbb{Z} \\xrightarrow{\\times 2} \\mathbb{Z} \\to H^2(T_1 S^2) \\to 0\\)

  This gives \\(H^1(T_1 S^2) = 0\\) and \\(H^2(T_1 S^2) = \\mathbb{Z}/2\\).

- \\(k = 3\\): \\(H^3(T_1 S^2) = \\mathbb{Z}\\) (from the top of the fibration).

So \\(H^*(T_1 S^2; \\mathbb{Z}) = \\{\\mathbb{Z}, 0, \\mathbb{Z}/2, \\mathbb{Z}\\}\\), which matches \\(H^*(\\mathbb{R}P^3; \\mathbb{Z})\\).

Indeed \\(T_1 S^2 \\cong \\mathrm{SO}(3) \\cong \\mathbb{R}P^3\\) (a rotation is determined by its axis and angle, giving the identification). \\(\\square\\)`
        }
      ]
    }
  ]
});
