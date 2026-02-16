window.CHAPTERS.push({
  id: 'applications-frontiers',
  number: 18,
  title: 'Applications and Frontiers',
  subtitle: 'From Fixed Points to Modern Topology',
  sections: [
    // ============================================================
    // Section 1: Brouwer Fixed Point Theorem
    // ============================================================
    {
      id: 'brouwer-fixed-point',
      title: 'Brouwer Fixed Point Theorem',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> One of the most celebrated applications of algebraic topology is the Brouwer Fixed Point Theorem: every continuous map from a disk to itself must have a fixed point. This seemingly geometric statement is proved purely through homological algebra -- a stunning demonstration of algebraic topology's power.
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Brouwer Fixed Point Theorem):</strong> Every continuous map \\(f: D^n \\to D^n\\) from the closed \\(n\\)-disk to itself has a fixed point, i.e., there exists \\(x \\in D^n\\) with \\(f(x) = x\\).</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof:</strong> Suppose for contradiction that \\(f(x) \\neq x\\) for all \\(x \\in D^n\\). Then we can define a retraction \\(r: D^n \\to S^{n-1}\\) by sending each \\(x\\) to the point where the ray from \\(f(x)\\) through \\(x\\) hits \\(\\partial D^n = S^{n-1}\\).</p>
          <p>Let \\(i: S^{n-1} \\hookrightarrow D^n\\) be the inclusion. Then \\(r \\circ i = \\mathrm{id}_{S^{n-1}}\\), so \\(r\\) is a retraction.</p>
          <p>Applying \\(H_{n-1}(-)\\):</p>
          \\[
          H_{n-1}(S^{n-1}) \\xrightarrow{i_*} H_{n-1}(D^n) \\xrightarrow{r_*} H_{n-1}(S^{n-1})
          \\]
          <p>with \\(r_* \\circ i_* = \\mathrm{id}\\). But \\(H_{n-1}(S^{n-1}) \\cong \\mathbb{Z}\\) and \\(H_{n-1}(D^n) = 0\\), so the identity map on \\(\\mathbb{Z}\\) factors through 0 -- a contradiction. \\(\\square\\)</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(n = 1\\)):</strong> Any continuous \\(f: [0,1] \\to [0,1]\\) has a fixed point. This follows from the Intermediate Value Theorem: the function \\(g(x) = f(x) - x\\) satisfies \\(g(0) \\geq 0\\) and \\(g(1) \\leq 0\\), so \\(g(x_0) = 0\\) for some \\(x_0\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(n = 2\\)):</strong> Stir a cup of coffee, then let it settle. The Brouwer theorem guarantees at least one point returns to its original position. More precisely, the map \\(f: D^2 \\to D^2\\) sending each point to its final position must have a fixed point.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Remark (Non-Retraction Theorem):</strong> The key ingredient is really the <em>No-Retraction Theorem</em>: there is no retraction \\(r: D^n \\to S^{n-1}\\). Equivalently, \\(S^{n-1}\\) is not a retract of \\(D^n\\). This is a purely topological obstruction detected by homology.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Remark (Sharpness):</strong> The Brouwer theorem fails for:</p>
          <ul>
            <li><strong>Open disks:</strong> \\(f: \\mathring{D}^n \\to \\mathring{D}^n\\) given by \\(x \\mapsto (x_1 + (1-|x|)/2,\\, x_2, \\ldots)\\) can be fixed-point-free.</li>
            <li><strong>Spheres:</strong> The antipodal map \\(x \\mapsto -x\\) on \\(S^n\\) has no fixed points.</li>
            <li><strong>Non-compact domains:</strong> Translation \\(x \\mapsto x + e_1\\) on \\(\\mathbb{R}^n\\) has no fixed points.</li>
          </ul>
        </div>
      `,
      visualizations: [
        {
          id: 'brouwer-fixed-point-viz',
          title: 'Brouwer Fixed Point Theorem',
          description: 'Visualize continuous maps from the disk to itself and their fixed points. Observe the retraction construction that leads to contradiction.',
          canvas: {
            setup: (viz) => {
              viz.state = {
                mode: 'map',
                mapType: 'rotation',
                animPhase: 0,
                gridPoints: [],
                fixedPoint: null,
                showRetraction: false,
                showGrid: true
              };
              const pts = [];
              for (let i = -8; i <= 8; i++) {
                for (let j = -8; j <= 8; j++) {
                  const x = i / 8;
                  const y = j / 8;
                  if (x * x + y * y <= 1.0) {
                    pts.push({ x, y });
                  }
                }
              }
              viz.state.gridPoints = pts;
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const cx = width / 2;
              const cy = height / 2 + 15;
              const R = Math.min(width, height) * 0.32;

              viz.state.animPhase += 0.008;
              const t = viz.state.animPhase;
              const anim = Math.min(t % 3, 1);

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.textAlign = 'center';
              const titles = {
                rotation: 'Partial Rotation of D\u00B2',
                contraction: 'Contraction Map',
                swirl: 'Swirl Deformation'
              };
              ctx.fillText(titles[viz.state.mapType] || 'Map f: D\u00B2 \u2192 D\u00B2', cx, 28);
              ctx.textAlign = 'left';

              const mapPoint = (px, py) => {
                if (viz.state.mapType === 'rotation') {
                  const angle = 0.8 * (1 - (px * px + py * py));
                  const c = Math.cos(angle), s = Math.sin(angle);
                  return { x: c * px - s * py, y: s * px + c * py };
                } else if (viz.state.mapType === 'contraction') {
                  const k = 0.5;
                  return { x: k * px + 0.3, y: k * py + 0.2 };
                } else {
                  const r = Math.sqrt(px * px + py * py);
                  const angle = 1.5 * (1 - r);
                  const c = Math.cos(angle), s = Math.sin(angle);
                  const nx = c * px - s * py;
                  const ny = s * px + c * py;
                  return { x: 0.7 * nx, y: 0.7 * ny };
                }
              };

              ctx.strokeStyle = '#3498db';
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.arc(cx, cy, R, 0, Math.PI * 2);
              ctx.stroke();

              ctx.fillStyle = 'rgba(52,152,219,0.06)';
              ctx.beginPath();
              ctx.arc(cx, cy, R, 0, Math.PI * 2);
              ctx.fill();

              if (viz.state.showGrid) {
                for (const pt of viz.state.gridPoints) {
                  const fp = mapPoint(pt.x, pt.y);
                  const sx = cx + pt.x * R;
                  const sy = cy + pt.y * R;
                  const ex = cx + (pt.x + anim * (fp.x - pt.x)) * R;
                  const ey = cy + (pt.y + anim * (fp.y - pt.y)) * R;

                  ctx.strokeStyle = 'rgba(231,76,60,0.35)';
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(sx, sy);
                  ctx.lineTo(ex, ey);
                  ctx.stroke();

                  ctx.fillStyle = 'rgba(231,76,60,0.6)';
                  ctx.beginPath();
                  ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
                  ctx.fill();
                }
              }

              let bestDist = Infinity;
              let bestPt = { x: 0, y: 0 };
              for (let i = -30; i <= 30; i++) {
                for (let j = -30; j <= 30; j++) {
                  const x = i / 30;
                  const y = j / 30;
                  if (x * x + y * y > 1) continue;
                  const fp = mapPoint(x, y);
                  const d = (fp.x - x) ** 2 + (fp.y - y) ** 2;
                  if (d < bestDist) {
                    bestDist = d;
                    bestPt = { x, y };
                  }
                }
              }

              const fpx = cx + bestPt.x * R;
              const fpy = cy + bestPt.y * R;
              ctx.strokeStyle = '#27ae60';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(fpx, fpy, 10, 0, Math.PI * 2);
              ctx.stroke();
              ctx.fillStyle = 'rgba(39,174,96,0.3)';
              ctx.beginPath();
              ctx.arc(fpx, fpy, 10, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#27ae60';
              ctx.font = 'bold 14px serif';
              ctx.textAlign = 'left';
              ctx.fillText('Fixed point: f(x) = x', fpx + 15, fpy - 5);

              ctx.fillStyle = '#2c3e50';
              ctx.font = '14px serif';
              ctx.textAlign = 'center';
              ctx.fillText('Every continuous f: D\u00B2 \u2192 D\u00B2 must have at least one fixed point', cx, height - 15);
              ctx.textAlign = 'left';
            },
            controls: [
              {
                type: 'select',
                label: 'Map Type',
                options: [
                  { value: 'rotation', label: 'Partial Rotation' },
                  { value: 'contraction', label: 'Contraction' },
                  { value: 'swirl', label: 'Swirl' }
                ],
                action: (viz, value) => {
                  viz.state.mapType = value;
                  viz.state.animPhase = 0;
                }
              },
              {
                type: 'button',
                label: 'Toggle Grid',
                action: (viz) => {
                  viz.state.showGrid = !viz.state.showGrid;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'brouwer-hex-ex',
          question: 'Use the Brouwer Fixed Point Theorem to prove that in the board game Hex, the game cannot end in a draw.',
          hint: 'Model the Hex board as a triangulation of a disk. A draw would mean neither player has a connecting path. Show this implies the existence of a retraction from the disk to its boundary.',
          solution: `Consider the \\(n \\times n\\) Hex board as a rhombus with vertices labeled N, E, S, W. Player 1 connects N-S, player 2 connects E-W. The board can be triangulated to form a disk.

Suppose the game ends in a draw: every cell is filled but neither player has a winning path. We construct a continuous map from the board (a disk) to its boundary:

Define a coloring: color each cell Red (player 1) or Blue (player 2). By assumption, there is no red path from N to S and no blue path from E to W.

Using a "flow" argument: direct each edge of the triangulation so that you can always escape to the boundary without crossing a winning path. This constructs a retraction \\(r: D^2 \\to S^1\\).

But the Brouwer theorem (via the No-Retraction Theorem) says no such retraction exists. Contradiction!

Therefore, every completed Hex game has a winner. \\(\\square\\)

This is equivalent to the Brouwer Fixed Point Theorem for \\(n = 2\\) -- in fact, it can be used to prove it.`
        }
      ]
    },

    // ============================================================
    // Section 2: Lefschetz Fixed Point Theorem
    // ============================================================
    {
      id: 'lefschetz-fixed-point',
      title: 'Lefschetz Fixed Point Theorem',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> Brouwer's theorem tells us <em>that</em> a fixed point exists for maps \\(D^n \\to D^n\\), but says nothing about maps on more general spaces. The <strong>Lefschetz Fixed Point Theorem</strong> provides a powerful algebraic criterion: if a certain alternating trace (the Lefschetz number) is nonzero, then the map must have a fixed point. This generalizes Brouwer's theorem and connects fixed-point theory to the full power of homology.
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Lefschetz Number):</strong> Let \\(X\\) be a compact polyhedron and \\(f: X \\to X\\) a continuous map. The <strong>Lefschetz number</strong> of \\(f\\) is:</p>
          \\[
          \\Lambda(f) = \\sum_{k=0}^{\\dim X} (-1)^k \\operatorname{tr}\\bigl(f_{*k}: H_k(X; \\mathbb{Q}) \\to H_k(X; \\mathbb{Q})\\bigr)
          \\]
          <p>where \\(f_{*k}\\) is the induced map on rational homology and \\(\\operatorname{tr}\\) denotes the matrix trace.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Lefschetz Fixed Point Theorem):</strong> If \\(\\Lambda(f) \\neq 0\\), then \\(f\\) has a fixed point.</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof Sketch:</strong> Choose a simplicial approximation \\(g\\) of \\(f\\). If \\(f\\) has no fixed points, then after sufficient subdivision, \\(g\\) moves every simplex off itself (since \\(\\{x : f(x) = x\\}\\) is empty and compact). Such a map has zero trace on every chain group. By the Hopf trace formula:</p>
          \\[
          \\Lambda(f) = \\sum_k (-1)^k \\operatorname{tr}(f_{*k}) = \\sum_k (-1)^k \\operatorname{tr}(g_{\\#k}: C_k \\to C_k) = 0
          \\]
          <p>Contrapositive: \\(\\Lambda(f) \\neq 0\\) implies \\(f\\) has a fixed point. \\(\\square\\)</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Recovering Brouwer):</strong> For \\(f: D^n \\to D^n\\), the disk is contractible, so \\(H_0(D^n; \\mathbb{Q}) = \\mathbb{Q}\\) and all higher homology vanishes. Thus:</p>
          \\[
          \\Lambda(f) = \\operatorname{tr}(f_{*0}) = 1 \\neq 0
          \\]
          <p>So \\(f\\) has a fixed point. Brouwer's theorem is a special case.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Identity Map):</strong> For \\(\\mathrm{id}: X \\to X\\), each \\(f_{*k} = \\mathrm{id}\\), so \\(\\operatorname{tr}(f_{*k}) = \\beta_k\\) (the \\(k\\)-th Betti number). Thus:</p>
          \\[
          \\Lambda(\\mathrm{id}) = \\sum_k (-1)^k \\beta_k = \\chi(X)
          \\]
          <p>The Lefschetz number of the identity is the <strong>Euler characteristic</strong>. So if \\(\\chi(X) \\neq 0\\), every map homotopic to the identity has a fixed point.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Antipodal Map on \\(S^n\\)):</strong> The antipodal map \\(a: S^n \\to S^n\\), \\(x \\mapsto -x\\), induces \\(a_{*k} = (-1)^{k+1} \\cdot \\mathrm{id}\\) on \\(H_k(S^n)\\). So:</p>
          \\[
          \\Lambda(a) = 1 + (-1)^n \\cdot (-1)^{n+1} = 1 + (-1)^{2n+1} = 1 - 1 = 0
          \\]
          <p>Lefschetz gives no information -- consistent with \\(a\\) having no fixed points.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Map on Torus):</strong> Let \\(f: T^2 \\to T^2\\) be the map induced by the linear map \\(A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}\\) on \\(\\mathbb{R}^2\\) (descending to \\(\\mathbb{R}^2/\\mathbb{Z}^2\\)). Then:</p>
          \\[
          \\Lambda(f) = 1 - \\operatorname{tr}(A) + \\det(A) = 1 - 3 + 1 = -1 \\neq 0
          \\]
          <p>So \\(f\\) has a fixed point. (In fact, it has \\(|\\det(A - I)| = |\\det\\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}| = 1\\) fixed point.)</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Maps on \\(S^n\\)):</strong> For \\(f: S^n \\to S^n\\) of degree \\(d\\):</p>
          \\[
          \\Lambda(f) = 1 + (-1)^n d
          \\]
          <p>So \\(f\\) must have a fixed point unless \\(d = (-1)^{n+1}\\), i.e., \\(d = -1\\) when \\(n\\) is even, or \\(d = 1\\) when \\(n\\) is odd. For \\(n\\) even: only the antipodal map (degree \\(-1\\)) can be fixed-point-free.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Lefschetz-Hopf Index Formula):</strong> If \\(f: M \\to M\\) is a smooth map on a compact manifold with only isolated, non-degenerate fixed points, then:</p>
          \\[
          \\Lambda(f) = \\sum_{f(p) = p} \\operatorname{index}_p(f)
          \\]
          <p>where \\(\\operatorname{index}_p(f) = \\mathrm{sign}\\, \\det(I - Df_p)\\) is the local fixed-point index.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Remark (Converse Fails):</strong> \\(\\Lambda(f) = 0\\) does <em>not</em> mean \\(f\\) has no fixed points. For example, the identity map on \\(S^1\\) has \\(\\Lambda(\\mathrm{id}) = 0\\) but every point is fixed.</p>
        </div>
      `,
      visualizations: [
        {
          id: 'lefschetz-number-viz',
          title: 'Lefschetz Number Calculator',
          description: 'Compute the Lefschetz number for various maps on different spaces and see whether fixed points are guaranteed.',
          canvas: {
            setup: (viz) => {
              viz.state = {
                space: 'torus',
                matA: 2, matB: 1, matC: 1, matD: 1,
                animPhase: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.textAlign = 'center';
              ctx.fillText('Lefschetz Number Computation', width / 2, 28);

              const st = viz.state;
              const cx = width / 2;
              let y = 55;
              st.animPhase += 0.01;

              ctx.textAlign = 'left';
              ctx.font = '16px serif';

              if (st.space === 'torus') {
                const a = st.matA, b = st.matB, c = st.matC, d = st.matD;
                const tr = a + d;
                const det = a * d - b * c;
                const lambda = 1 - tr + det;

                const tcx = width * 0.25;
                const tcy = 130;
                const rM = 45, rm = 18;
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(tcx, tcy, rM + rm, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(tcx, tcy, rM - rm, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = 'rgba(52,152,219,0.1)';
                ctx.beginPath();
                ctx.arc(tcx, tcy, rM + rm, 0, Math.PI * 2);
                ctx.arc(tcx, tcy, rM - rm, Math.PI * 2, 0, true);
                ctx.fill();
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 14px serif';
                ctx.textAlign = 'center';
                ctx.fillText('T\u00B2', tcx, tcy + 5);

                const rx = width * 0.45;
                ctx.textAlign = 'left';
                ctx.font = '15px serif';
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('f induced by A = [' + a + ' ' + b + ' ; ' + c + ' ' + d + ']', rx, 75);

                y = 100;
                ctx.fillText('H\u2080(T\u00B2) = \u211A: f* = id, trace = 1', rx, y); y += 22;
                ctx.fillText('H\u2081(T\u00B2) = \u211A\u00B2: f* = A, trace = ' + tr, rx, y); y += 22;
                ctx.fillText('H\u2082(T\u00B2) = \u211A: f* = \u00D7' + det + ', trace = ' + det, rx, y); y += 32;

                ctx.font = 'bold 16px serif';
                ctx.fillText('\u039B(f) = 1 - ' + tr + ' + ' + det + ' = ' + lambda, rx, y); y += 30;

                if (lambda !== 0) {
                  ctx.fillStyle = '#27ae60';
                  ctx.font = 'bold 16px serif';
                  ctx.fillText('\u039B(f) \u2260 0  \u21d2  f has a fixed point!', rx, y);

                  ctx.strokeStyle = '#27ae60';
                  ctx.lineWidth = 4;
                  ctx.beginPath();
                  ctx.moveTo(rx - 25, y - 8);
                  ctx.lineTo(rx - 18, y);
                  ctx.lineTo(rx - 7, y - 18);
                  ctx.stroke();
                } else {
                  ctx.fillStyle = '#e74c3c';
                  ctx.font = 'bold 16px serif';
                  ctx.fillText('\u039B(f) = 0  \u21d2  no conclusion', rx, y);
                }

                y += 30;
                const detAI = Math.abs((a - 1) * (d - 1) - b * c);
                ctx.fillStyle = '#7f8c8d';
                ctx.font = '14px serif';
                ctx.fillText('|det(A - I)| = ' + detAI + ' fixed point' + (detAI !== 1 ? 's' : '') + ' (when non-degenerate)', rx, y);

              } else if (st.space === 'sphere') {
                const deg = st.matA;
                const n = st.matB;

                const tcx = width * 0.25;
                const tcy = 130;
                const rr = 50;
                const grad = ctx.createRadialGradient(tcx - rr * 0.3, tcy - rr * 0.3, rr * 0.1, tcx, tcy, rr);
                grad.addColorStop(0, 'rgba(155,89,182,0.3)');
                grad.addColorStop(1, 'rgba(155,89,182,0.08)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(tcx, tcy, rr, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(tcx, tcy, rr, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 14px serif';
                ctx.textAlign = 'center';
                ctx.fillText('S' + (n < 10 ? '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'[n] || n : n), tcx, tcy + 5);

                const rx = width * 0.45;
                ctx.textAlign = 'left';
                ctx.font = '15px serif';
                ctx.fillStyle = '#2c3e50';

                y = 85;
                ctx.fillText('f: S' + n + ' \u2192 S' + n + ' of degree ' + deg, rx, y); y += 25;
                ctx.fillText('H\u2080(S' + n + ') = \u211A: trace = 1', rx, y); y += 22;
                ctx.fillText('H' + n + '(S' + n + ') = \u211A: f* = \u00D7' + deg + ', trace = ' + deg, rx, y); y += 30;

                const lambda = 1 + (n % 2 === 0 ? 1 : -1) * deg;
                ctx.font = 'bold 16px serif';
                ctx.fillText('\u039B(f) = 1 + (-1)' + n + '\u00B7' + deg + ' = ' + lambda, rx, y); y += 30;

                if (lambda !== 0) {
                  ctx.fillStyle = '#27ae60';
                  ctx.font = 'bold 16px serif';
                  ctx.fillText('\u039B(f) \u2260 0  \u21d2  f has a fixed point!', rx, y);
                } else {
                  ctx.fillStyle = '#e74c3c';
                  ctx.font = 'bold 16px serif';
                  ctx.fillText('\u039B(f) = 0  \u21d2  no conclusion', rx, y);
                }

              } else if (st.space === 'disk') {
                const tcx = width * 0.25;
                const tcy = 130;
                const rr = 55;
                ctx.fillStyle = 'rgba(39,174,96,0.12)';
                ctx.beginPath();
                ctx.arc(tcx, tcy, rr, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.arc(tcx, tcy, rr, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 14px serif';
                ctx.textAlign = 'center';
                ctx.fillText('D\u00B2', tcx, tcy + 5);

                const rx = width * 0.45;
                ctx.textAlign = 'left';
                ctx.font = '15px serif';
                ctx.fillStyle = '#2c3e50';
                y = 85;
                ctx.fillText('f: D\u00B2 \u2192 D\u00B2 (any continuous map)', rx, y); y += 25;
                ctx.fillText('D\u00B2 is contractible:', rx, y); y += 22;
                ctx.fillText('  H\u2080 = \u211A, H\u2081 = H\u2082 = 0', rx, y); y += 22;
                ctx.fillText('  f* on H\u2080 is identity, trace = 1', rx, y); y += 30;

                ctx.font = 'bold 16px serif';
                ctx.fillText('\u039B(f) = 1 \u2260 0  always!', rx, y); y += 30;

                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 16px serif';
                ctx.fillText('\u21d2  Brouwer: every f has a fixed point', rx, y);
              }

              ctx.fillStyle = '#7f8c8d';
              ctx.font = '13px serif';
              ctx.textAlign = 'center';
              ctx.fillText('\u039B(f) = \u03A3 (-1)\u1D4F tr(f*\u2096) -- the alternating sum of traces on homology', cx, height - 15);
              ctx.textAlign = 'left';
            },
            controls: [
              {
                type: 'select',
                label: 'Space',
                options: [
                  { value: 'torus', label: 'Torus T\u00B2' },
                  { value: 'sphere', label: 'Sphere S\u207F' },
                  { value: 'disk', label: 'Disk D\u00B2 (Brouwer)' }
                ],
                action: (viz, value) => {
                  viz.state.space = value;
                  if (value === 'torus') {
                    viz.state.matA = 2; viz.state.matB = 1; viz.state.matC = 1; viz.state.matD = 1;
                  } else if (value === 'sphere') {
                    viz.state.matA = 2; viz.state.matB = 2;
                  }
                }
              },
              {
                type: 'range',
                label: 'Parameter a / degree',
                min: -3, max: 5, step: 1,
                action: (viz, value) => { viz.state.matA = parseInt(value); }
              },
              {
                type: 'range',
                label: 'Parameter d / dimension',
                min: 1, max: 5, step: 1,
                action: (viz, value) => {
                  if (viz.state.space === 'torus') viz.state.matD = parseInt(value);
                  else viz.state.matB = parseInt(value);
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'lefschetz-torus-ex',
          question: 'Let \\(f: T^2 \\to T^2\\) be the map induced by \\(A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\) (rotation by 90 degrees). Compute \\(\\Lambda(f)\\) and determine whether \\(f\\) has a fixed point.',
          hint: 'Use \\(\\Lambda(f) = 1 - \\operatorname{tr}(A) + \\det(A)\\). What are the trace and determinant of a 90-degree rotation matrix?',
          solution: `For \\(A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}\\):
\\[\\operatorname{tr}(A) = 0 + 0 = 0, \\qquad \\det(A) = 0 \\cdot 0 - (-1) \\cdot 1 = 1\\]

The Lefschetz number:
\\[\\Lambda(f) = 1 - \\operatorname{tr}(A) + \\det(A) = 1 - 0 + 1 = 2 \\neq 0\\]

Since \\(\\Lambda(f) = 2 \\neq 0\\), the Lefschetz theorem guarantees \\(f\\) has a fixed point.

In fact, the fixed points satisfy \\(Ax = x \\pmod{\\mathbb{Z}^2}\\), i.e., \\((A - I)x \\in \\mathbb{Z}^2\\). We need \\(\\begin{pmatrix} -1 & -1 \\\\ 1 & -1 \\end{pmatrix} x \\in \\mathbb{Z}^2\\), which has \\(|\\det(A - I)| = |1 + 1| = 2\\) solutions in \\(\\mathbb{R}^2/\\mathbb{Z}^2\\): the points \\((0,0)\\) and \\((1/2, 1/2)\\).`
        }
      ]
    },

    // ============================================================
    // Section 3: Degree Theory and Applications
    // ============================================================
    {
      id: 'degree-theory',
      title: 'Degree Theory and Applications',
      content: `
        <div class="env-block definition">
          <p><strong>Definition (Degree of a Map):</strong> Let \\(f: S^n \\to S^n\\) be a continuous map. Since \\(H_n(S^n) \\cong \\mathbb{Z}\\), the induced map \\(f_*: H_n(S^n) \\to H_n(S^n)\\) is multiplication by an integer \\(d\\). This integer is the <strong>degree</strong> of \\(f\\):</p>
          \\[
          \\deg(f) = d \\quad \\text{where } f_*([S^n]) = d \\cdot [S^n].
          \\]
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Properties of Degree):</strong></p>
          <ol>
            <li><strong>Homotopy invariance:</strong> \\(f \\simeq g \\implies \\deg(f) = \\deg(g)\\).</li>
            <li><strong>Multiplicativity:</strong> \\(\\deg(f \\circ g) = \\deg(f) \\cdot \\deg(g)\\).</li>
            <li><strong>Identity:</strong> \\(\\deg(\\mathrm{id}) = 1\\).</li>
            <li><strong>Constant maps:</strong> \\(\\deg(\\mathrm{const}) = 0\\).</li>
            <li><strong>Reflection:</strong> If \\(r\\) is a reflection of \\(S^n\\), then \\(\\deg(r) = -1\\).</li>
            <li><strong>Antipodal map:</strong> \\(\\deg(-\\mathrm{id}) = (-1)^{n+1}\\).</li>
          </ol>
        </div>

        <div class="env-block proof">
          <p><strong>Proof of (6):</strong> The antipodal map \\(-\\mathrm{id}: S^n \\to S^n\\) is the composition of \\((n+1)\\) reflections (negate each coordinate in \\(\\mathbb{R}^{n+1}\\)). Since each reflection has degree \\(-1\\):</p>
          \\[
          \\deg(-\\mathrm{id}) = (-1)^{n+1}. \\quad \\square
          \\]
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Hairy Ball Theorem):</strong> If \\(n\\) is even, there is no continuous nonvanishing tangent vector field on \\(S^n\\).</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof:</strong> Suppose \\(v: S^n \\to \\mathbb{R}^{n+1}\\) is a continuous vector field with \\(v(x) \\perp x\\) and \\(v(x) \\neq 0\\) for all \\(x\\). Normalize: \\(\\hat{v}(x) = v(x)/|v(x)|\\).</p>
          <p>Define \\(H_t(x) = \\cos(\\pi t) \\cdot x + \\sin(\\pi t) \\cdot \\hat{v}(x)\\). This is a homotopy from \\(\\mathrm{id}\\) to \\(-\\mathrm{id}\\) through maps \\(S^n \\to S^n\\) (since \\(|H_t(x)| = 1\\)).</p>
          <p>Then \\(\\deg(\\mathrm{id}) = \\deg(-\\mathrm{id})\\), i.e., \\(1 = (-1)^{n+1}\\). This fails when \\(n\\) is even. \\(\\square\\)</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Odd Spheres Have Vector Fields):</strong> On \\(S^{2k-1} \\subset \\mathbb{R}^{2k}\\), the vector field \\(v(x_1, x_2, \\ldots, x_{2k-1}, x_{2k}) = (-x_2, x_1, -x_4, x_3, \\ldots, -x_{2k}, x_{2k-1})\\) is tangent and nonvanishing. This is consistent with \\(\\deg(-\\mathrm{id}) = (-1)^{2k} = 1 = \\deg(\\mathrm{id})\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Borsuk-Ulam):</strong> For every continuous map \\(f: S^n \\to \\mathbb{R}^n\\), there exists \\(x \\in S^n\\) with \\(f(x) = f(-x)\\). In other words, some pair of antipodal points maps to the same value.</p>
        </div>

        <div class="env-block example">
          <p><strong>Application (Ham Sandwich Theorem):</strong> Given \\(n\\) measurable sets in \\(\\mathbb{R}^n\\), there exists a hyperplane that simultaneously bisects all \\(n\\) sets. This follows from Borsuk-Ulam applied to the function \\(f: S^n \\to \\mathbb{R}^n\\) where \\(f(v)\\) measures the volume imbalance of each set relative to the hyperplane with normal \\(v\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Fundamental Theorem of Algebra):</strong> Every non-constant polynomial \\(p(z) \\in \\mathbb{C}[z]\\) has a root.</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof via Degree Theory:</strong> Let \\(p(z) = z^n + a_{n-1}z^{n-1} + \\cdots + a_0\\) with \\(n \\geq 1\\). Suppose \\(p\\) has no root. Consider \\(p\\) restricted to the circle \\(|z| = R\\). For large \\(R\\), \\(p(z)\\) behaves like \\(z^n\\), so the winding number (degree of \\(p/|p|: S^1 \\to S^1\\)) is \\(n\\).</p>
          <p>For \\(R = 0\\), the map is constant (degree 0). As \\(R\\) varies continuously and \\(p\\) never hits 0, the degree stays constant -- contradicting \\(n \\neq 0\\). \\(\\square\\)</p>
        </div>
      `,
      visualizations: [
        {
          id: 'degree-winding-viz',
          title: 'Degree and Winding Number',
          description: 'Visualize maps from S\u00B9 to S\u00B9 and their winding numbers. See how the image wraps around the target circle.',
          canvas: {
            setup: (viz) => {
              viz.state = {
                degree: 2,
                animPhase: 0,
                showDomain: true,
                showImage: true,
                traceProgress: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const st = viz.state;
              st.animPhase += 0.005;
              st.traceProgress = (st.traceProgress + 0.003) % 1;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.textAlign = 'center';
              ctx.fillText('Degree ' + st.degree + ' Map: S\u00B9 \u2192 S\u00B9', width / 2, 28);

              const lcx = width * 0.28;
              const lcy = height * 0.52;
              const Rl = Math.min(width * 0.2, height * 0.3);

              const rcx = width * 0.72;
              const rcy = height * 0.52;
              const Rr = Math.min(width * 0.2, height * 0.3);

              ctx.fillStyle = '#7f8c8d';
              ctx.font = '14px serif';
              ctx.fillText('Domain S\u00B9', lcx, lcy + Rl + 25);
              ctx.fillText('Codomain S\u00B9', rcx, rcy + Rr + 25);

              if (st.showDomain) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.arc(lcx, lcy, Rl, 0, Math.PI * 2);
                ctx.stroke();
              }

              ctx.strokeStyle = '#95a5a6';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(rcx, rcy, Rr, 0, Math.PI * 2);
              ctx.stroke();

              const d = st.degree;
              const N = 200;
              if (st.showImage) {
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                for (let i = 0; i <= N; i++) {
                  const theta = (i / N) * Math.PI * 2;
                  const imgTheta = d * theta;
                  const x = rcx + Rr * Math.cos(imgTheta);
                  const y = rcy + Rr * Math.sin(imgTheta);
                  if (i === 0) ctx.moveTo(x, y);
                  else ctx.lineTo(x, y);
                }
                ctx.stroke();
              }

              const traceTheta = st.traceProgress * Math.PI * 2;
              const domX = lcx + Rl * Math.cos(traceTheta);
              const domY = lcy + Rl * Math.sin(traceTheta);
              const imgTheta = d * traceTheta;
              const imgX = rcx + Rr * Math.cos(imgTheta);
              const imgY = rcy + Rr * Math.sin(imgTheta);

              ctx.fillStyle = '#e67e22';
              ctx.beginPath();
              ctx.arc(domX, domY, 6, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#e74c3c';
              ctx.beginPath();
              ctx.arc(imgX, imgY, 6, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = 'rgba(230,126,34,0.4)';
              ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              ctx.moveTo(domX, domY);
              ctx.lineTo(imgX, imgY);
              ctx.stroke();
              ctx.setLineDash([]);

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 15px serif';
              ctx.textAlign = 'center';
              ctx.fillText('f(\u03B8) = ' + d + '\u03B8', width / 2, lcy - Rl - 5);

              ctx.fillStyle = '#2c3e50';
              ctx.font = '14px serif';
              ctx.fillText('Image wraps around ' + Math.abs(d) + ' time' + (Math.abs(d) !== 1 ? 's' : '') + (d < 0 ? ' (reversed)' : ''), width / 2, height - 15);
              ctx.textAlign = 'left';
            },
            controls: [
              {
                type: 'range',
                label: 'Degree',
                min: -4, max: 5, step: 1,
                action: (viz, value) => {
                  viz.state.degree = parseInt(value);
                }
              },
              {
                type: 'button',
                label: 'Reset Animation',
                action: (viz) => {
                  viz.state.traceProgress = 0;
                  viz.state.animPhase = 0;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'degree-composition-ex',
          question: 'Let \\(f: S^2 \\to S^2\\) have degree 3 and \\(g: S^2 \\to S^2\\) have degree \\(-2\\). Compute \\(\\deg(f \\circ g)\\), \\(\\deg(g \\circ f)\\), and \\(\\Lambda(f)\\).',
          hint: 'Use multiplicativity of degree. For the Lefschetz number, recall \\(\\Lambda(f) = 1 + (-1)^n \\deg(f)\\) for maps \\(S^n \\to S^n\\).',
          solution: `By multiplicativity: \\(\\deg(f \\circ g) = \\deg(f) \\cdot \\deg(g) = 3 \\cdot (-2) = -6\\).

Similarly: \\(\\deg(g \\circ f) = \\deg(g) \\cdot \\deg(f) = (-2) \\cdot 3 = -6\\).

(Composition of degrees is commutative since integer multiplication is.)

For the Lefschetz number on \\(S^2\\) (\\(n = 2\\)):
\\[\\Lambda(f) = \\operatorname{tr}(f_{*0}) + (-1)^2 \\operatorname{tr}(f_{*2}) = 1 + \\deg(f) = 1 + 3 = 4\\]

Since \\(\\Lambda(f) = 4 \\neq 0\\), the map \\(f\\) must have a fixed point. \\(\\checkmark\\)`
        },
        {
          id: 'hairy-ball-ex',
          question: 'Use the Hairy Ball Theorem to show that at any moment, there exists a point on Earth where the wind speed is exactly zero.',
          hint: 'Model wind as a continuous tangent vector field on \\(S^2\\). What does the Hairy Ball Theorem say about such fields?',
          solution: `Model the Earth as \\(S^2\\) and wind as a continuous tangent vector field \\(v: S^2 \\to TS^2\\), where \\(v(x)\\) is tangent to \\(S^2\\) at \\(x\\).

By the Hairy Ball Theorem, since \\(S^2\\) is an even-dimensional sphere, there is no continuous nonvanishing tangent vector field on \\(S^2\\).

Assuming wind varies continuously (a reasonable physical approximation), the vector field \\(v\\) must vanish at some point \\(x_0 \\in S^2\\), meaning \\(v(x_0) = 0\\).

Therefore, at any given moment there is at least one point on Earth where the wind velocity is zero.

(More precisely, there must be a point where the horizontal wind component is zero. This is sometimes stated as: "you can't comb the hair on a coconut flat without creating a cowlick.")`
        }
      ]
    },

    // ============================================================
    // Section 4: Morse Theory Connection
    // ============================================================
    {
      id: 'morse-theory-connection',
      title: 'Morse Theory Connection',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> Morse theory provides a bridge between <em>differential topology</em> and <em>algebraic topology</em>. By studying smooth functions \\(f: M \\to \\mathbb{R}\\) and their critical points, we can reconstruct the topology of \\(M\\) -- its homology groups, Betti numbers, and even CW structure.
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Morse Function):</strong> A smooth function \\(f: M \\to \\mathbb{R}\\) on a smooth manifold \\(M\\) is a <strong>Morse function</strong> if:</p>
          <ol>
            <li>Every critical point \\(p\\) (where \\(df_p = 0\\)) is <strong>non-degenerate</strong>: the Hessian matrix \\(H_f(p) = \\left(\\frac{\\partial^2 f}{\\partial x_i \\partial x_j}(p)\\right)\\) is non-singular.</li>
            <li>All critical values \\(f(p)\\) are distinct.</li>
          </ol>
          <p>The <strong>index</strong> of a critical point \\(p\\) is the number of negative eigenvalues of \\(H_f(p)\\), denoted \\(\\lambda_p\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Morse Lemma):</strong> Near a non-degenerate critical point \\(p\\) of index \\(\\lambda\\), there exist local coordinates \\((x_1, \\ldots, x_n)\\) centered at \\(p\\) such that:</p>
          \\[
          f(x) = f(p) - x_1^2 - \\cdots - x_\\lambda^2 + x_{\\lambda+1}^2 + \\cdots + x_n^2.
          \\]
          <p>The critical point "looks like" a saddle in exactly \\(\\lambda\\) directions.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (CW Structure from Morse Theory):</strong> If \\(f: M \\to \\mathbb{R}\\) is a Morse function on a compact manifold, then \\(M\\) is homotopy equivalent to a CW complex with one \\(k\\)-cell for each critical point of index \\(k\\).</p>
          <p>Concretely, as \\(t\\) increases past a critical value \\(f(p)\\) where \\(p\\) has index \\(\\lambda\\), the sublevel set \\(M_t = f^{-1}((-\\infty, t])\\) changes by attaching a \\(\\lambda\\)-cell:</p>
          \\[
          M_{f(p)+\\epsilon} \\simeq M_{f(p)-\\epsilon} \\cup_{\\varphi} e^\\lambda
          \\]
        </div>

        <div class="env-block example">
          <p><strong>Example (Height Function on Torus):</strong> Consider the standard torus \\(T^2\\) embedded in \\(\\mathbb{R}^3\\) and the height function \\(f(x,y,z) = z\\). It has four critical points:</p>
          <ul>
            <li><strong>Minimum</strong> (index 0): bottom of the torus -- one 0-cell</li>
            <li><strong>Saddle 1</strong> (index 1): lower inner rim -- one 1-cell</li>
            <li><strong>Saddle 2</strong> (index 1): upper inner rim -- one 1-cell</li>
            <li><strong>Maximum</strong> (index 2): top of the torus -- one 2-cell</li>
          </ul>
          <p>This gives a CW structure with one 0-cell, two 1-cells, and one 2-cell, consistent with \\(\\chi(T^2) = 1 - 2 + 1 = 0\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Morse Inequalities):</strong> Let \\(c_k\\) be the number of critical points of index \\(k\\). Then:</p>
          <ol>
            <li><strong>Weak Morse inequalities:</strong> \\(c_k \\geq \\beta_k\\) for each \\(k\\).</li>
            <li><strong>Strong Morse inequalities:</strong> For each \\(m\\):</li>
          </ol>
          \\[
          \\sum_{k=0}^{m} (-1)^{m-k} c_k \\geq \\sum_{k=0}^{m} (-1)^{m-k} \\beta_k
          \\]
          <p>with equality when \\(m = \\dim M\\):</p>
          \\[
          \\sum_{k=0}^{n} (-1)^k c_k = \\sum_{k=0}^{n} (-1)^k \\beta_k = \\chi(M).
          \\]
        </div>

        <div class="env-block example">
          <p><strong>Example (Sphere \\(S^n\\)):</strong> The height function \\(f(x_0, \\ldots, x_n) = x_n\\) has exactly two critical points: a minimum (index 0) and a maximum (index \\(n\\)). So \\(c_0 = 1\\), \\(c_n = 1\\), all others 0. This matches \\(\\beta_0 = 1\\), \\(\\beta_n = 1\\) for \\(S^n\\), and the Morse inequalities are tight.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Remark (Existence of Morse Functions):</strong> Morse functions are <em>generic</em> -- the set of Morse functions is open and dense in \\(C^\\infty(M, \\mathbb{R})\\). Every smooth manifold admits a Morse function, and a small perturbation of any smooth function is Morse.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Remark (Smale's h-Cobordism Theorem):</strong> Morse theory played a central role in Smale's proof of the h-cobordism theorem (1962) and the generalized Poincare conjecture for \\(n \\geq 5\\). The idea is to cancel critical points in pairs using handle manipulation.</p>
        </div>
      `,
      visualizations: [],
      exercises: [
        {
          id: 'euler-char-morse-ex',
          question: 'A smooth function \\(f: \\Sigma_2 \\to \\mathbb{R}\\) on the genus-2 surface has exactly 1 minimum and 1 maximum. What is the minimum number of saddle points? Justify using the Morse inequalities.',
          hint: 'Use \\(\\chi(\\Sigma_2) = 2 - 2g = -2\\). The Euler characteristic equals the alternating sum of critical point counts.',
          solution: `Let \\(c_k\\) denote the number of critical points of index \\(k\\). We are given \\(c_0 = 1\\) (minimum) and \\(c_2 = 1\\) (maximum).

By the Morse equality (alternating sum):
\\[c_0 - c_1 + c_2 = \\chi(\\Sigma_2) = 2 - 2 \\cdot 2 = -2\\]
\\[1 - c_1 + 1 = -2\\]
\\[c_1 = 4\\]

We also verify the weak Morse inequalities: \\(c_1 = 4 \\geq \\beta_1 = 4\\). (Recall \\(\\beta_0 = 1, \\beta_1 = 4, \\beta_2 = 1\\) for \\(\\Sigma_2\\).)

The minimum number of saddle points is \\(\\boxed{4}\\).

Geometrically, the genus-2 surface has two "handles," and each handle contributes two saddle points to any Morse function -- you need a saddle to "open" and "close" each handle.`
        }
      ]
    },

    // ============================================================
    // Section 5: Modern Directions
    // ============================================================
    {
      id: 'modern-directions',
      title: 'Modern Directions',
      content: `
        <div class="env-block intuition">
          <strong>Overview:</strong> Algebraic topology is far from a completed subject. The foundational ideas we have studied -- homotopy, homology, cohomology, duality -- continue to evolve and find applications in areas ranging from data science to theoretical physics. Here we survey some modern frontiers.
        </div>

        <div class="env-block definition">
          <p><strong>Persistent Homology and Topological Data Analysis (TDA):</strong> Given a finite point cloud \\(P \\subset \\mathbb{R}^n\\), build a family of simplicial complexes \\(\\{K_\\epsilon\\}_{\\epsilon \\geq 0}\\) (e.g., Vietoris-Rips or \\v{C}ech complexes) indexed by a scale parameter \\(\\epsilon\\). The inclusions \\(K_{\\epsilon_1} \\hookrightarrow K_{\\epsilon_2}\\) for \\(\\epsilon_1 < \\epsilon_2\\) induce maps on homology:</p>
          \\[
          H_k(K_{\\epsilon_1}) \\to H_k(K_{\\epsilon_2})
          \\]
          <p>A <strong>persistent homology class</strong> is one that "persists" across a range of scales \\([\\epsilon_{\\mathrm{birth}}, \\epsilon_{\\mathrm{death}})\\). Features with long persistence are considered topologically significant; short-lived features are noise.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Stability of Persistence Diagrams):</strong> Let \\(X, Y\\) be two point clouds. Then:</p>
          \\[
          d_B(\\mathrm{Dgm}(X), \\mathrm{Dgm}(Y)) \\leq d_{GH}(X, Y)
          \\]
          <p>where \\(d_B\\) is the bottleneck distance between persistence diagrams and \\(d_{GH}\\) is the Gromov-Hausdorff distance. Small perturbations of data produce small perturbations of the persistence diagram -- this is what makes persistent homology practical.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Applications of TDA:</strong> Persistent homology has found use in:</p>
          <ul>
            <li><strong>Shape recognition:</strong> Classifying 3D shapes by persistent homology signatures</li>
            <li><strong>Neuroscience:</strong> Detecting topological features in neural connectivity</li>
            <li><strong>Materials science:</strong> Analyzing porous structures and grain boundaries</li>
            <li><strong>Genomics:</strong> Identifying circular structures in gene expression data</li>
            <li><strong>Protein structure:</strong> Detecting loops (alpha helices), cavities (binding pockets), and domains</li>
          </ul>
        </div>

        <div class="env-block definition">
          <p><strong>Topological Quantum Field Theory (TQFT):</strong> A TQFT (Atiyah, 1988) is a symmetric monoidal functor:</p>
          \\[
          Z: \\mathbf{Cob}_n \\to \\mathbf{Vect}
          \\]
          <p>from the category of \\(n\\)-dimensional cobordisms to the category of vector spaces. This assigns:</p>
          <ul>
            <li>To each closed \\((n-1)\\)-manifold \\(\\Sigma\\): a vector space \\(Z(\\Sigma)\\)</li>
            <li>To each cobordism \\(M: \\Sigma_1 \\to \\Sigma_2\\): a linear map \\(Z(M): Z(\\Sigma_1) \\to Z(\\Sigma_2)\\)</li>
          </ul>
          <p>TQFTs encode topological invariants of manifolds in the language of quantum mechanics. Examples include Chern-Simons theory, Dijkgraaf-Witten theory, and the Turaev-Viro invariants. The cobordism hypothesis (Baez-Dolan, proved by Lurie) classifies extended TQFTs using higher categories.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Homotopy Groups of Spheres:</strong> Computing \\(\\pi_n(S^k)\\) remains one of the deepest unsolved problems in topology. Key tools include the Serre and Adams spectral sequences, and chromatic homotopy theory, which organizes the stable homotopy groups by "wavelength" using formal group laws. Known results include \\(\\pi_3(S^2) \\cong \\mathbb{Z}\\) (Hopf fibration), \\(\\pi_4(S^3) \\cong \\mathbb{Z}/2\\), and the stable stems computed through dimension ~90.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Stable Homotopy Theory and Spectra:</strong> The <strong>stable homotopy category</strong> is obtained by "stabilizing" the homotopy category -- taking the colimit over iterated suspension:</p>
          \\[
          \\{X, Y\\}_s = \\operatorname{colim}_k [\\Sigma^k X, \\Sigma^k Y]
          \\]
          <p>A <strong>spectrum</strong> is a sequence of spaces \\(E_0, E_1, E_2, \\ldots\\) with structure maps \\(\\Sigma E_n \\to E_{n+1}\\). Spectra represent generalized cohomology theories: ordinary cohomology (Eilenberg-MacLane spectrum), K-theory, cobordism, etc.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Chromatic Homotopy Theory:</strong> The stable homotopy groups of spheres \\(\\pi_*^s\\) exhibit rich periodic patterns organized by the "chromatic filtration." At each prime \\(p\\):</p>
          <ul>
            <li><strong>Height 0:</strong> Rational information, detected by rational cohomology</li>
            <li><strong>Height 1:</strong> \\(v_1\\)-periodicity, detected by K-theory</li>
            <li><strong>Height 2:</strong> \\(v_2\\)-periodicity, detected by elliptic cohomology / topological modular forms (TMF)</li>
            <li><strong>Height \\(n\\):</strong> \\(v_n\\)-periodicity, detected by Morava K-theory and E-theory</li>
          </ul>
        </div>

        <div class="env-block remark">
          <p><strong>Topological Phases of Matter:</strong> In condensed matter physics, topological insulators and superconductors are classified by K-theory groups. The periodic table of topological phases uses Bott periodicity:</p>
          \\[
          K(pt) \\cong \\mathbb{Z}, \\quad KO(pt) \\text{ has period 8}
          \\]
          <p>This is algebraic topology directly informing the classification of quantum materials.</p>
        </div>

        <div class="env-block definition">
          <p><strong>\\(\\infty\\)-Categories and Higher Algebra:</strong> Jacob Lurie's framework of <strong>\\(\\infty\\)-categories</strong> (quasi-categories) provides the natural language for modern homotopy theory. An \\(\\infty\\)-category has objects, morphisms, 2-morphisms (homotopies), 3-morphisms (homotopies between homotopies), and so on to all levels. This framework unifies and extends classical homological algebra, sheaf theory, and stable homotopy theory into <strong>higher algebra</strong>.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Homotopy Type Theory (HoTT):</strong> Homotopy type theory reinterprets the foundations of mathematics through the lens of homotopy theory: types are spaces, terms are points, equality proofs are paths, and higher equalities are higher homotopies. The <strong>Univalence Axiom</strong> (Voevodsky) states that equivalent types are equal, providing a computational foundation for algebraic topology.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Further Frontiers:</strong></p>
          <ul>
            <li><strong>Motivic homotopy theory</strong> (Voevodsky): extends algebraic topology to algebraic geometry, leading to the proof of the Milnor and Bloch-Kato conjectures (Fields Medal, 2002)</li>
            <li><strong>Equivariant homotopy theory:</strong> Hill-Hopkins-Ravenel's solution of the Kervaire invariant one problem (2016)</li>
            <li><strong>Condensed mathematics</strong> (Clausen-Scholze): Reimagining topological algebra through condensed sets</li>
            <li><strong>Floer homology:</strong> Infinite-dimensional Morse theory in symplectic geometry</li>
            <li><strong>Khovanov homology:</strong> Categorification of the Jones polynomial in knot theory</li>
            <li><strong>Applied topology:</strong> Topological methods in robotics (motion planning via topological complexity), sensor networks (coverage via homology), and machine learning</li>
          </ul>
          <p>From Poincare's Analysis Situs to the \\(\\infty\\)-categorical revolution, algebraic topology remains one of the most vibrant and far-reaching branches of mathematics.</p>
        </div>
      `,
      visualizations: [],
      exercises: [
        {
          id: 'config-space-braid-ex',
          question: 'Let \\(\\mathrm{Conf}_n(\\mathbb{R}^2) = \\{(z_1, \\ldots, z_n) \\in (\\mathbb{R}^2)^n : z_i \\neq z_j \\text{ for } i \\neq j\\}\\) be the configuration space of \\(n\\) distinct points in the plane. Show that \\(\\pi_1(\\mathrm{Conf}_n(\\mathbb{R}^2))\\) is the pure braid group on \\(n\\) strands.',
          hint: 'Consider the fibration \\(\\mathrm{Conf}_n(\\mathbb{R}^2) \\to \\mathrm{Conf}_{n-1}(\\mathbb{R}^2)\\) given by forgetting the last point. The fiber over a configuration \\((z_1, \\ldots, z_{n-1})\\) is \\(\\mathbb{R}^2 \\setminus \\{z_1, \\ldots, z_{n-1}\\}\\), which has \\(\\pi_1 \\cong F_{n-1}\\).',
          solution: `Consider the map \\(p: \\mathrm{Conf}_n(\\mathbb{R}^2) \\to \\mathrm{Conf}_{n-1}(\\mathbb{R}^2)\\) that forgets the last point. This is a fibration with fiber:
\\[ F = \\mathbb{R}^2 \\setminus \\{z_1, \\ldots, z_{n-1}\\} \\]

This fiber is homotopy equivalent to a wedge of \\((n-1)\\) circles, so \\(\\pi_1(F) \\cong F_{n-1}\\) (free group on \\(n-1\\) generators) and all higher homotopy groups vanish.

The long exact sequence of the fibration gives:
\\[ \\cdots \\to \\pi_2(\\mathrm{Conf}_{n-1}) \\to \\pi_1(F) \\to \\pi_1(\\mathrm{Conf}_n) \\to \\pi_1(\\mathrm{Conf}_{n-1}) \\to \\pi_0(F) \\]

By induction, all \\(\\mathrm{Conf}_k(\\mathbb{R}^2)\\) are \\(K(\\pi, 1)\\) spaces (all higher homotopy groups vanish), so \\(\\pi_2 = 0\\) and we get:
\\[ 1 \\to F_{n-1} \\to \\pi_1(\\mathrm{Conf}_n(\\mathbb{R}^2)) \\to \\pi_1(\\mathrm{Conf}_{n-1}(\\mathbb{R}^2)) \\to 1 \\]

A loop in \\(\\mathrm{Conf}_n(\\mathbb{R}^2)\\) is a continuous motion of \\(n\\) distinct labeled points in the plane returning to their starting positions -- this is precisely a pure braid. The group operation is concatenation of braids. The short exact sequence above is the Birman exact sequence, building the pure braid group \\(P_n\\) inductively:
\\[ 1 \\to F_{n-1} \\to P_n \\to P_{n-1} \\to 1 \\]
with \\(P_1 = 1\\), \\(P_2 \\cong \\mathbb{Z}\\), etc.`
        }
      ]
    }
  ]
});
