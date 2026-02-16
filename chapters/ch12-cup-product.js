window.CHAPTERS.push({
  id: 'ch12',
  number: 12,
  title: 'Cup Product',
  subtitle: 'Ring Structure on Cohomology',
  sections: [
    {
      id: 'cup-product-definition',
      title: 'Cup Product \\(\\cup: H^p \\otimes H^q \\to H^{p+q}\\)',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> Homology groups \\(H_n(X)\\) capture "holes" in a space, but they are merely <em>abelian groups</em> with no multiplicative structure. Cohomology groups \\(H^n(X; R)\\), being dual, inherit a natural <em>product</em> called the <strong>cup product</strong>. This turns \\(H^*(X; R) = \\bigoplus_n H^n(X; R)\\) into a <em>graded ring</em>, which is a strictly finer invariant than the cohomology groups alone.
        </div>

        <div class="env-block definition">
          <strong>Definition (Cup Product on Cochains):</strong> Let \\(X\\) be a topological space and \\(R\\) a commutative ring. For cochains \\(\\varphi \\in C^p(X; R)\\) and \\(\\psi \\in C^q(X; R)\\), the <strong>cup product</strong> \\(\\varphi \\cup \\psi \\in C^{p+q}(X; R)\\) is defined by:
          \\[
          (\\varphi \\cup \\psi)(\\sigma) = \\varphi(\\sigma|_{[v_0, \\ldots, v_p]}) \\cdot \\psi(\\sigma|_{[v_p, \\ldots, v_{p+q}]})
          \\]
          for every singular \\((p+q)\\)-simplex \\(\\sigma: \\Delta^{p+q} \\to X\\). Here \\(\\sigma|_{[v_i, \\ldots, v_j]}\\) denotes the restriction of \\(\\sigma\\) to the front or back face determined by vertices \\(v_i, \\ldots, v_j\\).
        </div>

        <div class="env-block example">
          <strong>Concrete Example:</strong> Let \\(\\sigma = [v_0, v_1, v_2]\\) be a singular 2-simplex. For \\(\\varphi \\in C^1\\) and \\(\\psi \\in C^1\\):
          <ul>
            <li>The <strong>front 1-face</strong> is \\(\\sigma|_{[v_0, v_1]}\\): the edge from \\(v_0\\) to \\(v_1\\).</li>
            <li>The <strong>back 1-face</strong> is \\(\\sigma|_{[v_1, v_2]}\\): the edge from \\(v_1\\) to \\(v_2\\).</li>
            <li>\\((\\varphi \\cup \\psi)(\\sigma) = \\varphi([v_0, v_1]) \\cdot \\psi([v_1, v_2])\\).</li>
          </ul>
          Think of it as: \\(\\varphi\\) "measures" the front portion of the simplex, \\(\\psi\\) "measures" the back portion, and we multiply the results.
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Leibniz Rule / Coboundary Formula):</strong> The cup product satisfies
          \\[
          \\delta(\\varphi \\cup \\psi) = (\\delta\\varphi) \\cup \\psi + (-1)^{\\deg \\varphi}\\, \\varphi \\cup (\\delta\\psi).
          \\]
          In particular:
          <ol>
            <li>If \\(\\varphi\\) and \\(\\psi\\) are cocycles, so is \\(\\varphi \\cup \\psi\\).</li>
            <li>If either is a coboundary, so is \\(\\varphi \\cup \\psi\\).</li>
          </ol>
          Therefore the cup product descends to a well-defined map on cohomology:
          \\[
          \\cup: H^p(X; R) \\otimes_R H^q(X; R) \\longrightarrow H^{p+q}(X; R).
          \\]
        </div>

        <div class="env-block proof">
          <strong>Proof:</strong> Let \\(\\varphi \\in C^p\\), \\(\\psi \\in C^q\\), and \\(\\sigma: \\Delta^{p+q+1} \\to X\\). We compute:
          \\[
          \\delta(\\varphi \\cup \\psi)(\\sigma) = (\\varphi \\cup \\psi)(\\partial\\sigma) = \\sum_{i=0}^{p+q+1} (-1)^i (\\varphi \\cup \\psi)(\\sigma \\circ d_i)
          \\]
          where \\(d_i\\) omits vertex \\(v_i\\). Split the sum at \\(i = p\\):
          <ul>
            <li>For \\(i \\leq p\\): the front face changes, contributing \\((\\delta\\varphi) \\cup \\psi\\).</li>
            <li>For \\(i > p\\): the back face changes. Shifting indices gives \\((-1)^p \\varphi \\cup (\\delta\\psi)\\).</li>
          </ul>
          Hence \\(\\delta(\\varphi \\cup \\psi) = (\\delta\\varphi) \\cup \\psi + (-1)^p \\varphi \\cup (\\delta\\psi)\\).

          Now if \\(\\delta\\varphi = 0\\) and \\(\\delta\\psi = 0\\), then \\(\\delta(\\varphi \\cup \\psi) = 0\\), so cocycles map to cocycles. If \\(\\varphi = \\delta\\alpha\\), then \\(\\varphi \\cup \\psi = (\\delta\\alpha) \\cup \\psi = \\delta(\\alpha \\cup \\psi)\\) is a coboundary. Similarly if \\(\\psi = \\delta\\beta\\). \\(\\square\\)
        </div>

        <div class="env-block remark">
          <strong>Notation:</strong> The identity element \\(1 \\in H^0(X; R) \\cong R\\) is the cochain that sends every 0-simplex (point) to \\(1 \\in R\\). For any \\(\\alpha \\in H^n(X; R)\\), we have \\(1 \\cup \\alpha = \\alpha \\cup 1 = \\alpha\\).
        </div>
      `,
      visualizations: [
        {
          id: 'cup-product-geometric-viz',
          title: 'Cup Product Visualizer',
          description: 'Geometric multiplication of cochains on simplices: see how φ evaluates on the front face and ψ on the back face.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                simplexDim: 2,
                phiVal: 3,
                psiVal: 2,
                animPhase: 0,
                showFormula: true,
                highlightMode: 'both' // 'front', 'back', 'both', 'product'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const dim = viz.state.simplexDim;

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.textAlign = 'center';
              ctx.fillText('Cup Product on a ' + dim + '-Simplex', width / 2, 28);

              // Animate
              viz.state.animPhase += 0.015;
              const phase = viz.state.animPhase;

              if (dim === 2) {
                // Draw a 2-simplex [v0, v1, v2] with front/back highlighting
                const cx = width / 2;
                const cy = height * 0.45;
                const s = Math.min(width, height) * 0.28;

                const v0 = { x: cx, y: cy - s };
                const v1 = { x: cx - s * 0.9, y: cy + s * 0.6 };
                const v2 = { x: cx + s * 0.9, y: cy + s * 0.6 };

                // Fill the simplex lightly
                ctx.fillStyle = 'rgba(52, 152, 219, 0.08)';
                ctx.beginPath();
                ctx.moveTo(v0.x, v0.y);
                ctx.lineTo(v1.x, v1.y);
                ctx.lineTo(v2.x, v2.y);
                ctx.closePath();
                ctx.fill();

                // Draw all edges faintly
                ctx.strokeStyle = '#bdc3c7';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(v0.x, v0.y); ctx.lineTo(v1.x, v1.y);
                ctx.lineTo(v2.x, v2.y); ctx.closePath();
                ctx.stroke();

                const mode = viz.state.highlightMode;

                // Front face [v0, v1] for phi
                if (mode === 'front' || mode === 'both' || mode === 'product') {
                  const glow = 0.6 + 0.4 * Math.sin(phase * 2);
                  ctx.strokeStyle = `rgba(231, 76, 60, ${glow})`;
                  ctx.lineWidth = 5;
                  ctx.beginPath();
                  ctx.moveTo(v0.x, v0.y);
                  ctx.lineTo(v1.x, v1.y);
                  ctx.stroke();

                  // Label
                  const mx = (v0.x + v1.x) / 2 - 60;
                  const my = (v0.y + v1.y) / 2;
                  ctx.fillStyle = '#e74c3c';
                  ctx.font = 'bold 15px KaTeX_Main, serif';
                  ctx.textAlign = 'right';
                  ctx.fillText('Front face', mx, my - 8);
                  ctx.fillText('\u03C6 = ' + viz.state.phiVal, mx, my + 12);
                }

                // Back face [v1, v2] for psi
                if (mode === 'back' || mode === 'both' || mode === 'product') {
                  const glow = 0.6 + 0.4 * Math.sin(phase * 2 + Math.PI);
                  ctx.strokeStyle = `rgba(52, 152, 219, ${glow})`;
                  ctx.lineWidth = 5;
                  ctx.beginPath();
                  ctx.moveTo(v1.x, v1.y);
                  ctx.lineTo(v2.x, v2.y);
                  ctx.stroke();

                  const mx = (v1.x + v2.x) / 2 + 10;
                  const my = (v1.y + v2.y) / 2 + 25;
                  ctx.fillStyle = '#3498db';
                  ctx.font = 'bold 15px KaTeX_Main, serif';
                  ctx.textAlign = 'left';
                  ctx.fillText('Back face', mx, my - 8);
                  ctx.fillText('\u03C8 = ' + viz.state.psiVal, mx, my + 12);
                }

                // Vertices
                [v0, v1, v2].forEach((v, i) => {
                  ctx.fillStyle = '#2c3e50';
                  ctx.beginPath();
                  ctx.arc(v.x, v.y, 6, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.fillStyle = '#2c3e50';
                  ctx.font = '16px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  const labels = ['v\u2080', 'v\u2081', 'v\u2082'];
                  const offsets = [{ dx: 0, dy: -14 }, { dx: -14, dy: 18 }, { dx: 14, dy: 18 }];
                  ctx.fillText(labels[i], v.x + offsets[i].dx, v.y + offsets[i].dy);
                });

                // Show product result
                if (mode === 'product') {
                  const prod = viz.state.phiVal * viz.state.psiVal;
                  ctx.fillStyle = '#27ae60';
                  ctx.font = 'bold 20px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('(\u03C6 \u222A \u03C8)(\u03C3) = ' + viz.state.phiVal + ' \u00D7 ' + viz.state.psiVal + ' = ' + prod, width / 2, cy + s + 50);
                }

              } else if (dim === 3) {
                // 3-simplex: phi in C^1 evaluates on [v0,v1], psi in C^2 on [v1,v2,v3]
                const cx = width / 2;
                const cy = height * 0.45;
                const s = Math.min(width, height) * 0.22;

                const v0 = { x: cx - s, y: cy - s * 0.8 };
                const v1 = { x: cx + s, y: cy - s * 0.6 };
                const v2 = { x: cx - s * 0.5, y: cy + s };
                const v3 = { x: cx + s * 0.7, y: cy + s * 0.9 };

                // Draw all edges faintly
                ctx.strokeStyle = '#bdc3c7';
                ctx.lineWidth = 1;
                const pts = [v0, v1, v2, v3];
                for (let i = 0; i < 4; i++) {
                  for (let j = i + 1; j < 4; j++) {
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.stroke();
                  }
                }

                const mode = viz.state.highlightMode;

                // Front 1-face: [v0, v1]
                if (mode === 'front' || mode === 'both' || mode === 'product') {
                  ctx.strokeStyle = '#e74c3c';
                  ctx.lineWidth = 5;
                  ctx.beginPath();
                  ctx.moveTo(v0.x, v0.y);
                  ctx.lineTo(v1.x, v1.y);
                  ctx.stroke();
                  ctx.fillStyle = '#e74c3c';
                  ctx.font = 'bold 14px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('\u03C6 on [v\u2080,v\u2081]', (v0.x + v1.x) / 2, (v0.y + v1.y) / 2 - 15);
                }

                // Back 2-face: [v1, v2, v3]
                if (mode === 'back' || mode === 'both' || mode === 'product') {
                  ctx.fillStyle = 'rgba(52, 152, 219, 0.15)';
                  ctx.beginPath();
                  ctx.moveTo(v1.x, v1.y);
                  ctx.lineTo(v2.x, v2.y);
                  ctx.lineTo(v3.x, v3.y);
                  ctx.closePath();
                  ctx.fill();
                  ctx.strokeStyle = '#3498db';
                  ctx.lineWidth = 4;
                  ctx.stroke();
                  ctx.fillStyle = '#3498db';
                  ctx.font = 'bold 14px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('\u03C8 on [v\u2081,v\u2082,v\u2083]', (v1.x + v2.x + v3.x) / 3, (v1.y + v2.y + v3.y) / 3 + 5);
                }

                // Vertices
                pts.forEach((v, i) => {
                  ctx.fillStyle = '#2c3e50';
                  ctx.beginPath();
                  ctx.arc(v.x, v.y, 5, 0, Math.PI * 2);
                  ctx.fill();
                  ctx.font = '15px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('v' + String.fromCharCode(0x2080 + i), v.x, v.y - 12);
                });

                if (mode === 'product') {
                  ctx.fillStyle = '#27ae60';
                  ctx.font = 'bold 18px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  ctx.fillText('\u03C6 \u2208 C\u00B9, \u03C8 \u2208 C\u00B2 \u21D2 \u03C6\u222A\u03C8 \u2208 C\u00B3', width / 2, cy + s + 60);
                }
              }

              // Formula box at bottom
              if (viz.state.showFormula) {
                const boxY = height - 65;
                ctx.fillStyle = 'rgba(44, 62, 80, 0.05)';
                ctx.fillRect(15, boxY - 5, width - 30, 55);
                ctx.strokeStyle = '#7f8c8d';
                ctx.lineWidth = 1;
                ctx.strokeRect(15, boxY - 5, width - 30, 55);
                ctx.fillStyle = '#2c3e50';
                ctx.font = '15px KaTeX_Main, serif';
                ctx.textAlign = 'center';
                if (dim === 2) {
                  ctx.fillText('(\u03C6 \u222A \u03C8)(\u03C3) = \u03C6(\u03C3|[v\u2080,v\u2081]) \u00B7 \u03C8(\u03C3|[v\u2081,v\u2082])', width / 2, boxY + 15);
                  ctx.fillText('\u03C6 \u2208 C\u00B9(X; R),  \u03C8 \u2208 C\u00B9(X; R),  \u03C6\u222A\u03C8 \u2208 C\u00B2(X; R)', width / 2, boxY + 38);
                } else {
                  ctx.fillText('(\u03C6 \u222A \u03C8)(\u03C3) = \u03C6(\u03C3|[v\u2080,v\u2081]) \u00B7 \u03C8(\u03C3|[v\u2081,v\u2082,v\u2083])', width / 2, boxY + 15);
                  ctx.fillText('\u03C6 \u2208 C\u00B9(X; R),  \u03C8 \u2208 C\u00B2(X; R),  \u03C6\u222A\u03C8 \u2208 C\u00B3(X; R)', width / 2, boxY + 38);
                }
              }
            },
            controls: [
              {
                type: 'select',
                label: 'Simplex dimension',
                options: [
                  { value: '2', label: '2-simplex (p=q=1)' },
                  { value: '3', label: '3-simplex (p=1, q=2)' }
                ],
                action: (viz, value) => {
                  viz.state.simplexDim = parseInt(value);
                }
              },
              {
                type: 'select',
                label: 'Highlight',
                options: [
                  { value: 'both', label: 'Both faces' },
                  { value: 'front', label: 'Front face (\u03C6)' },
                  { value: 'back', label: 'Back face (\u03C8)' },
                  { value: 'product', label: 'Product result' }
                ],
                action: (viz, value) => {
                  viz.state.highlightMode = value;
                }
              },
              {
                type: 'slider',
                label: '\u03C6 value',
                min: -3,
                max: 5,
                step: 1,
                initial: 3,
                action: (viz, value) => {
                  viz.state.phiVal = value;
                }
              },
              {
                type: 'slider',
                label: '\u03C8 value',
                min: -3,
                max: 5,
                step: 1,
                initial: 2,
                action: (viz, value) => {
                  viz.state.psiVal = value;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'cup-def-ex1',
          question: 'Verify the Leibniz rule \\(\\delta(\\varphi \\cup \\psi) = \\delta\\varphi \\cup \\psi + (-1)^p \\varphi \\cup \\delta\\psi\\) explicitly for \\(p = q = 1\\) on a 2-simplex \\(\\sigma = [v_0, v_1, v_2]\\).',
          hint: 'Compute \\(\\partial\\sigma = [v_1, v_2] - [v_0, v_2] + [v_0, v_1]\\). Then expand both the LHS \\((\\varphi \\cup \\psi)(\\partial\\sigma)\\) and RHS separately.',
          solution: `LHS: \\(\\delta(\\varphi \\cup \\psi)(\\sigma) = (\\varphi \\cup \\psi)(\\partial\\sigma) = (\\varphi \\cup \\psi)([v_1,v_2] - [v_0,v_2] + [v_0,v_1])\\).

For 1-cochains on a 1-simplex, \\((\\varphi \\cup \\psi)([a,b]) = \\varphi([a]) \\cdot \\psi([b])\\), so:
\\[ \\text{LHS} = \\varphi([v_1])\\psi([v_2]) - \\varphi([v_0])\\psi([v_2]) + \\varphi([v_0])\\psi([v_1]) \\]

RHS first term: \\((\\delta\\varphi \\cup \\psi)(\\sigma) = (\\delta\\varphi)([v_0,v_1]) \\cdot \\psi([v_1,v_2])\\)
\\[ = (\\varphi([v_1]) - \\varphi([v_0])) \\cdot \\psi([v_1,v_2]) \\]

RHS second term: \\((-1)^1(\\varphi \\cup \\delta\\psi)(\\sigma) = -\\varphi([v_0,v_1]) \\cdot (\\delta\\psi)([v_1,v_2])\\)
\\[ = -\\varphi([v_0,v_1]) \\cdot (\\psi([v_2]) - \\psi([v_1])) \\]

Combining: both sides equal \\(\\varphi([v_1])\\psi([v_2]) - \\varphi([v_0])\\psi([v_2]) + \\varphi([v_0])\\psi([v_1])\\). \\(\\checkmark\\)`
        }
      ]
    },
    {
      id: 'graded-commutativity',
      title: 'Graded Commutativity and Associativity',
      content: `
        <div class="env-block theorem">
          <strong>Theorem (Graded Commutativity):</strong> For \\(\\alpha \\in H^p(X; R)\\) and \\(\\beta \\in H^q(X; R)\\),
          \\[
          \\alpha \\cup \\beta = (-1)^{pq}\\, \\beta \\cup \\alpha.
          \\]
          This sign rule is called the <strong>Koszul sign convention</strong>: whenever two elements of degrees \\(p\\) and \\(q\\) are swapped, the sign \\((-1)^{pq}\\) appears.
        </div>

        <div class="env-block proof">
          <strong>Proof Sketch:</strong> The key tool is the <em>Alexander-Whitney diagonal approximation</em>
          \\[
          \\Delta_{AW}: C_n(X) \\to \\bigoplus_{p+q=n} C_p(X) \\otimes C_q(X), \\qquad \\sigma \\mapsto \\sum_{p+q=n} \\sigma|_{[v_0,\\ldots,v_p]} \\otimes \\sigma|_{[v_p,\\ldots,v_n]}
          \\]
          which defines the cup product via \\((\\varphi \\cup \\psi)(\\sigma) = (\\varphi \\otimes \\psi)(\\Delta_{AW}(\\sigma))\\).

          There is another diagonal approximation, the <em>Eilenberg-Zilber map</em> \\(\\Delta_{EZ}\\), which is chain homotopic to \\(\\Delta_{AW}\\). The swap map \\(T: C_p \\otimes C_q \\to C_q \\otimes C_p\\) introduces a sign \\((-1)^{pq}\\), and since chain homotopic maps induce the same map on cohomology, we get \\(\\alpha \\cup \\beta = (-1)^{pq}\\beta \\cup \\alpha\\). \\(\\square\\)
        </div>

        <div class="env-block example">
          <strong>Key Consequence -- Odd-Degree Elements:</strong> If \\(\\alpha \\in H^p(X; R)\\) with \\(p\\) odd, then
          \\[
          \\alpha \\cup \\alpha = (-1)^{p \\cdot p}\\, \\alpha \\cup \\alpha = -\\alpha \\cup \\alpha
          \\]
          so \\(2(\\alpha \\cup \\alpha) = 0\\). Over \\(\\mathbb{Z}\\) this means \\(\\alpha \\cup \\alpha\\) has order dividing 2. Over \\(\\mathbb{Q}\\) or any ring where 2 is invertible, \\(\\alpha \\cup \\alpha = 0\\). But over \\(\\mathbb{Z}/2\\), all signs disappear (since \\(-1 = 1\\)), so \\(\\alpha \\cup \\alpha\\) can be nonzero.
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Associativity):</strong> The cup product is associative on both cochains and cohomology:
          \\[
          (\\alpha \\cup \\beta) \\cup \\gamma = \\alpha \\cup (\\beta \\cup \\gamma) \\quad \\text{for all } \\alpha \\in H^p, \\beta \\in H^q, \\gamma \\in H^r.
          \\]
        </div>

        <div class="env-block proof">
          <strong>Proof:</strong> For cochains \\(\\varphi \\in C^p, \\psi \\in C^q, \\chi \\in C^r\\) and a \\((p+q+r)\\)-simplex \\(\\sigma\\):
          \\[
          ((\\varphi \\cup \\psi) \\cup \\chi)(\\sigma) = (\\varphi \\cup \\psi)(\\sigma|_{[v_0,\\ldots,v_{p+q}]}) \\cdot \\chi(\\sigma|_{[v_{p+q},\\ldots,v_{p+q+r}]})
          \\]
          \\[
          = \\varphi(\\sigma|_{[v_0,\\ldots,v_p]}) \\cdot \\psi(\\sigma|_{[v_p,\\ldots,v_{p+q}]}) \\cdot \\chi(\\sigma|_{[v_{p+q},\\ldots,v_{p+q+r}]})
          \\]
          The same triple product results from \\((\\varphi \\cup (\\psi \\cup \\chi))(\\sigma)\\). \\(\\square\\)
        </div>

        <div class="env-block definition">
          <strong>Definition (Cohomology Ring):</strong> The <strong>cohomology ring</strong> of \\(X\\) with coefficients in \\(R\\) is the graded ring
          \\[
          H^*(X; R) = \\bigoplus_{n \\geq 0} H^n(X; R)
          \\]
          with multiplication given by the cup product. It is:
          <ul>
            <li><strong>Graded:</strong> \\(H^p \\cup H^q \\subseteq H^{p+q}\\).</li>
            <li><strong>Associative:</strong> \\((\\alpha \\cup \\beta) \\cup \\gamma = \\alpha \\cup (\\beta \\cup \\gamma)\\).</li>
            <li><strong>Graded-commutative:</strong> \\(\\alpha \\cup \\beta = (-1)^{pq} \\beta \\cup \\alpha\\).</li>
            <li><strong>Unital:</strong> \\(1 \\in H^0(X; R)\\) acts as the identity.</li>
          </ul>
        </div>

        <div class="env-block remark">
          <strong>Functoriality:</strong> If \\(f: X \\to Y\\) is continuous, the induced map \\(f^*: H^*(Y; R) \\to H^*(X; R)\\) is a <em>ring homomorphism</em>:
          \\[
          f^*(\\alpha \\cup \\beta) = f^*(\\alpha) \\cup f^*(\\beta).
          \\]
          This is a major advantage of the cup product: it provides a <strong>functorial ring structure</strong> that continuous maps must respect.
        </div>

        <div class="env-block intuition">
          <strong>Why is the ring structure useful?</strong> Consider \\(\\mathbb{C}P^2\\) and \\(S^2 \\vee S^4\\). Both have:
          \\[
          H^k \\cong \\begin{cases} \\mathbb{Z} & k = 0, 2, 4 \\\\ 0 & \\text{else} \\end{cases}
          \\]
          The groups are isomorphic! But the ring structures differ:
          <ul>
            <li>\\(H^*(\\mathbb{C}P^2) = \\mathbb{Z}[\\alpha]/(\\alpha^3)\\) with \\(|\\alpha| = 2\\) and \\(\\alpha^2 \\neq 0\\).</li>
            <li>\\(H^*(S^2 \\vee S^4) = \\mathbb{Z}[\\beta, \\gamma]/(\\beta^2, \\gamma^2, \\beta\\gamma)\\) with \\(\\beta^2 = 0\\).</li>
          </ul>
          The cup product \\(\\alpha^2 \\neq 0\\) vs \\(\\beta^2 = 0\\) proves \\(\\mathbb{C}P^2 \\not\\simeq S^2 \\vee S^4\\)!
        </div>
      `,
      visualizations: [
        {
          id: 'ring-structure-table-viz',
          title: 'Ring Structure Table',
          description: 'Interactive multiplication table for H*(X) showing all cup products between generators.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.4,
            setup: (viz) => {
              viz.state = {
                space: 'torus',
                highlightCell: null
              };
              viz.spaces = {
                torus: {
                  name: 'H*(T\u00B2; \u2124)',
                  ring: '\u039B[\u03B1, \u03B2]  (exterior algebra)',
                  gens: ['1', '\u03B1', '\u03B2', '\u03B1\u222A\u03B2'],
                  degrees: [0, 1, 1, 2],
                  table: [
                    ['1',      '\u03B1',      '\u03B2',      '\u03B1\u222A\u03B2'],
                    ['\u03B1', '0',           '\u03B1\u222A\u03B2', '0'],
                    ['\u03B2', '-\u03B1\u222A\u03B2', '0',           '0'],
                    ['\u03B1\u222A\u03B2', '0',   '0',           '0']
                  ]
                },
                sphere: {
                  name: 'H*(S\u00B2; \u2124)',
                  ring: '\u2124[\u03B1]/(\u03B1\u00B2)',
                  gens: ['1', '\u03B1'],
                  degrees: [0, 2],
                  table: [
                    ['1', '\u03B1'],
                    ['\u03B1', '0']
                  ]
                },
                rp2: {
                  name: 'H*(\u211DP\u00B2; \u2124/2)',
                  ring: '\u2124/2[\u03B1]/(\u03B1\u00B3)',
                  gens: ['1', '\u03B1', '\u03B1\u00B2'],
                  degrees: [0, 1, 2],
                  table: [
                    ['1', '\u03B1', '\u03B1\u00B2'],
                    ['\u03B1', '\u03B1\u00B2', '0'],
                    ['\u03B1\u00B2', '0', '0']
                  ]
                },
                cp2: {
                  name: 'H*(\u2102P\u00B2; \u2124)',
                  ring: '\u2124[\u03B1]/(\u03B1\u00B3),  deg(\u03B1)=2',
                  gens: ['1', '\u03B1', '\u03B1\u00B2'],
                  degrees: [0, 2, 4],
                  table: [
                    ['1', '\u03B1', '\u03B1\u00B2'],
                    ['\u03B1', '\u03B1\u00B2', '0'],
                    ['\u03B1\u00B2', '0', '0']
                  ]
                },
                klein: {
                  name: 'H*(K; \u2124/2)',
                  ring: '\u2124/2[\u03B1,\u03B2]/(\u03B1\u00B2+\u03B1\u03B2, \u03B2\u00B2)',
                  gens: ['1', '\u03B1', '\u03B2', '\u03B1\u03B2'],
                  degrees: [0, 1, 1, 2],
                  table: [
                    ['1',      '\u03B1',     '\u03B2',     '\u03B1\u03B2'],
                    ['\u03B1', '\u03B1\u03B2', '\u03B1\u03B2', '0'],
                    ['\u03B2', '\u03B1\u03B2', '0',          '0'],
                    ['\u03B1\u03B2', '0',     '0',          '0']
                  ]
                },
                wedge: {
                  name: 'H*(S\u00B2 \u2228 S\u2074; \u2124)',
                  ring: '\u03B2\u00B2 = 0 (trivial products)',
                  gens: ['1', '\u03B2', '\u03B3'],
                  degrees: [0, 2, 4],
                  table: [
                    ['1', '\u03B2', '\u03B3'],
                    ['\u03B2', '0', '0'],
                    ['\u03B3', '0', '0']
                  ]
                }
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const sp = viz.spaces[viz.state.space];
              const n = sp.gens.length;
              const cellW = Math.min(90, (width - 100) / (n + 1));
              const cellH = 44;
              const offsetX = 70;
              const offsetY = 90;

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.textAlign = 'left';
              ctx.fillText('Multiplication Table: ' + sp.name, 15, 28);
              ctx.font = '14px KaTeX_Main, serif';
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText('Ring: ' + sp.ring, 15, 50);

              // Header: cup symbol
              ctx.fillStyle = '#34495e';
              ctx.font = 'bold 16px KaTeX_Main, serif';
              ctx.textAlign = 'center';
              ctx.fillText('\u222A', offsetX - cellW / 2, offsetY + cellH / 2 + 5);

              // Column headers
              for (let j = 0; j < n; j++) {
                const x = offsetX + j * cellW + cellW / 2;
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 13px KaTeX_Main, serif';
                ctx.fillText(sp.gens[j], x, offsetY - 10);
                ctx.fillStyle = '#95a5a6';
                ctx.font = '11px KaTeX_Main, serif';
                ctx.fillText('H' + String.fromCharCode(0x2070 + sp.degrees[j] > 9 ? 0x2070 : (sp.degrees[j] < 4 ? [0x2070, 0xB9, 0xB2, 0xB3][sp.degrees[j]] : 0x2070 + sp.degrees[j])), x, offsetY - 25);
              }

              // Row headers
              for (let i = 0; i < n; i++) {
                const y = offsetY + i * cellH + cellH / 2 + 5;
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 13px KaTeX_Main, serif';
                ctx.textAlign = 'right';
                ctx.fillText(sp.gens[i], offsetX - 10, y);
              }

              // Table cells
              for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                  const x = offsetX + j * cellW;
                  const y = offsetY + i * cellH;
                  const val = sp.table[i][j];
                  const isZero = val === '0';
                  const isHighlighted = viz.state.highlightCell &&
                    viz.state.highlightCell[0] === i && viz.state.highlightCell[1] === j;

                  // Cell background
                  if (isHighlighted) {
                    ctx.fillStyle = '#f39c12';
                    ctx.fillRect(x, y, cellW, cellH);
                  } else if (isZero) {
                    ctx.fillStyle = 'rgba(231, 76, 60, 0.08)';
                    ctx.fillRect(x, y, cellW, cellH);
                  } else {
                    ctx.fillStyle = 'rgba(39, 174, 96, 0.08)';
                    ctx.fillRect(x, y, cellW, cellH);
                  }

                  // Cell border
                  ctx.strokeStyle = '#ddd';
                  ctx.lineWidth = 1;
                  ctx.strokeRect(x, y, cellW, cellH);

                  // Cell text
                  ctx.fillStyle = isZero ? '#e74c3c' : '#27ae60';
                  ctx.font = isHighlighted ? 'bold 14px KaTeX_Main, serif' : '13px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  ctx.fillText(val, x + cellW / 2, y + cellH / 2 + 5);
                }
              }

              // Legend
              ctx.fillStyle = '#7f8c8d';
              ctx.font = '12px KaTeX_Main, serif';
              ctx.textAlign = 'left';
              ctx.fillText('Green = non-trivial product   Red = zero product', 15, height - 15);
            },
            controls: [
              {
                type: 'select',
                label: 'Space',
                options: [
                  { value: 'torus', label: 'Torus T\u00B2' },
                  { value: 'sphere', label: 'Sphere S\u00B2' },
                  { value: 'rp2', label: '\u211DP\u00B2 (mod 2)' },
                  { value: 'cp2', label: '\u2102P\u00B2 (over \u2124)' },
                  { value: 'klein', label: 'Klein bottle (mod 2)' },
                  { value: 'wedge', label: 'S\u00B2 \u2228 S\u2074 (wedge)' }
                ],
                action: (viz, value) => {
                  viz.state.space = value;
                }
              }
            ]
          }
        },
        {
          id: 'graded-commutativity-checker-viz',
          title: 'Graded Commutativity Checker',
          description: 'Interactively verify that swapping two cohomology classes introduces a sign (-1)^{pq}.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                p: 1,
                q: 1,
                showSwap: false,
                animT: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const p = viz.state.p;
              const q = viz.state.q;
              const sign = Math.pow(-1, p * q);
              const signStr = sign > 0 ? '+1' : '-1';
              const signPrefix = sign > 0 ? '' : '-';

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.textAlign = 'center';
              ctx.fillText('Graded Commutativity: \u03B1 \u222A \u03B2 = (-1)^{pq} \u03B2 \u222A \u03B1', width / 2, 30);

              // Degree info
              ctx.font = '16px KaTeX_Main, serif';
              ctx.fillStyle = '#e74c3c';
              ctx.fillText('\u03B1 \u2208 H^' + p, width * 0.3, 65);
              ctx.fillStyle = '#3498db';
              ctx.fillText('\u03B2 \u2208 H^' + q, width * 0.7, 65);

              // Sign computation box
              ctx.fillStyle = 'rgba(155, 89, 182, 0.1)';
              const boxW = 280;
              ctx.fillRect(width / 2 - boxW / 2, 80, boxW, 50);
              ctx.strokeStyle = '#9b59b6';
              ctx.lineWidth = 1;
              ctx.strokeRect(width / 2 - boxW / 2, 80, boxW, 50);
              ctx.fillStyle = '#9b59b6';
              ctx.font = 'bold 16px KaTeX_Main, serif';
              ctx.fillText('(-1)^{' + p + '\u00D7' + q + '} = (-1)^{' + (p * q) + '} = ' + signStr, width / 2, 110);

              // Visual swap animation
              viz.state.animT += 0.02;
              const t = viz.state.showSwap ? Math.min((Math.sin(viz.state.animT) + 1) / 2, 1) : 0;

              const y1 = 185;
              const leftX = width * 0.3;
              const rightX = width * 0.7;
              const swappedLeftX = leftX + t * (rightX - leftX);
              const swappedRightX = rightX - t * (rightX - leftX);
              const arcY = y1 - t * 40;

              // Left circle (alpha)
              ctx.fillStyle = '#e74c3c';
              ctx.beginPath();
              ctx.arc(viz.state.showSwap ? swappedLeftX : leftX, viz.state.showSwap ? arcY + t * 10 : y1, 35, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = '#fff';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.fillText('\u03B1', viz.state.showSwap ? swappedLeftX : leftX, (viz.state.showSwap ? arcY + t * 10 : y1) + 6);

              // Right circle (beta)
              ctx.fillStyle = '#3498db';
              ctx.beginPath();
              ctx.arc(viz.state.showSwap ? swappedRightX : rightX, viz.state.showSwap ? arcY + t * 10 : y1, 35, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = '#fff';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.fillText('\u03B2', viz.state.showSwap ? swappedRightX : rightX, (viz.state.showSwap ? arcY + t * 10 : y1) + 6);

              // Cup symbol between
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 22px KaTeX_Main, serif';
              ctx.fillText('\u222A', width / 2, y1 + 6);

              // Result display
              const resultY = 260;
              ctx.fillStyle = '#2c3e50';
              ctx.font = '18px KaTeX_Main, serif';
              ctx.fillText('\u03B1 \u222A \u03B2  =  ' + signPrefix + '(\u03B2 \u222A \u03B1)', width / 2, resultY);

              // Sign interpretation
              ctx.font = '15px KaTeX_Main, serif';
              ctx.fillStyle = '#7f8c8d';
              if (p * q % 2 === 0) {
                ctx.fillText('pq = ' + (p * q) + ' is even  \u21D2  commutative (no sign change)', width / 2, resultY + 30);
              } else {
                ctx.fillText('pq = ' + (p * q) + ' is odd  \u21D2  anti-commutative (sign flip!)', width / 2, resultY + 30);
              }

              // Examples table
              const tableY = resultY + 65;
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 15px KaTeX_Main, serif';
              ctx.fillText('Sign Table (-1)^{pq}', width / 2, tableY);

              const tblX = width / 2 - 100;
              const tblCellW = 50;
              const tblCellH = 28;
              ctx.font = '13px KaTeX_Main, serif';

              // Headers
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText('p\\q', tblX, tableY + 20);
              for (let qi = 0; qi <= 3; qi++) {
                ctx.fillText('' + qi, tblX + 30 + qi * tblCellW, tableY + 20);
              }

              // Rows
              for (let pi = 0; pi <= 3; pi++) {
                ctx.fillStyle = '#7f8c8d';
                ctx.fillText('' + pi, tblX, tableY + 20 + (pi + 1) * tblCellH);
                for (let qi = 0; qi <= 3; qi++) {
                  const s = Math.pow(-1, pi * qi);
                  const isActive = pi === p && qi === q;
                  if (isActive) {
                    ctx.fillStyle = '#f39c12';
                    ctx.fillRect(tblX + 10 + qi * tblCellW, tableY + 5 + (pi + 1) * tblCellH, tblCellW - 5, tblCellH);
                  }
                  ctx.fillStyle = s > 0 ? '#27ae60' : '#e74c3c';
                  ctx.font = isActive ? 'bold 14px KaTeX_Main, serif' : '13px KaTeX_Main, serif';
                  ctx.fillText(s > 0 ? '+' : '-', tblX + 30 + qi * tblCellW, tableY + 20 + (pi + 1) * tblCellH);
                }
              }
            },
            controls: [
              {
                type: 'slider',
                label: 'Degree p',
                min: 0,
                max: 4,
                step: 1,
                initial: 1,
                action: (viz, value) => { viz.state.p = value; }
              },
              {
                type: 'slider',
                label: 'Degree q',
                min: 0,
                max: 4,
                step: 1,
                initial: 1,
                action: (viz, value) => { viz.state.q = value; }
              },
              {
                type: 'button',
                label: 'Toggle Swap Animation',
                action: (viz) => { viz.state.showSwap = !viz.state.showSwap; viz.state.animT = 0; }
              }
            ]
          }
        },
        {
          id: 'associativity-tree-viz',
          title: 'Associativity Visualizer',
          description: 'See the two bracketings (\\alpha \\cup \\beta) \\cup \\gamma and \\alpha \\cup (\\beta \\cup \\gamma) yield the same triple product on a simplex.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                p: 1,
                q: 1,
                r: 1,
                showLeft: true,
                showRight: true,
                animT: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const p = viz.state.p;
              const q = viz.state.q;
              const r = viz.state.r;

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.textAlign = 'center';
              ctx.fillText('Associativity: (\u03B1 \u222A \u03B2) \u222A \u03B3 = \u03B1 \u222A (\u03B2 \u222A \u03B3)', width / 2, 28);

              ctx.font = '14px KaTeX_Main, serif';
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText('deg(\u03B1)=' + p + ',  deg(\u03B2)=' + q + ',  deg(\u03B3)=' + r + '    \u21D2    result \u2208 H^' + (p + q + r), width / 2, 52);

              // Draw the (p+q+r)-simplex at top
              const total = p + q + r;
              const simpY = 90;
              const simpW = width * 0.7;
              const simpX0 = (width - simpW) / 2;
              const segW = simpW / total;

              // Vertices
              for (let i = 0; i <= total; i++) {
                const x = simpX0 + i * segW;
                ctx.fillStyle = '#2c3e50';
                ctx.beginPath();
                ctx.arc(x, simpY, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.font = '11px KaTeX_Main, serif';
                ctx.fillText('v' + i, x, simpY - 12);
              }
              // Edges
              ctx.strokeStyle = '#bdc3c7';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.moveTo(simpX0, simpY);
              ctx.lineTo(simpX0 + total * segW, simpY);
              ctx.stroke();

              // Color regions: front p, middle q, back r
              // Front
              ctx.fillStyle = 'rgba(231, 76, 60, 0.25)';
              ctx.fillRect(simpX0, simpY - 8, p * segW, 16);
              ctx.fillStyle = '#e74c3c';
              ctx.font = 'bold 13px KaTeX_Main, serif';
              ctx.fillText('\u03B1', simpX0 + p * segW / 2, simpY + 28);

              // Middle
              ctx.fillStyle = 'rgba(52, 152, 219, 0.25)';
              ctx.fillRect(simpX0 + p * segW, simpY - 8, q * segW, 16);
              ctx.fillStyle = '#3498db';
              ctx.fillText('\u03B2', simpX0 + p * segW + q * segW / 2, simpY + 28);

              // Back
              ctx.fillStyle = 'rgba(39, 174, 96, 0.25)';
              ctx.fillRect(simpX0 + (p + q) * segW, simpY - 8, r * segW, 16);
              ctx.fillStyle = '#2ecc71';
              ctx.fillText('\u03B3', simpX0 + (p + q) * segW + r * segW / 2, simpY + 28);

              // Left bracketing: (alpha cup beta) cup gamma
              const treeY = 160;
              if (viz.state.showLeft) {
                const lx = width * 0.28;

                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 14px KaTeX_Main, serif';
                ctx.fillText('Left: (\u03B1 \u222A \u03B2) \u222A \u03B3', lx, treeY);

                // Step 1: alpha cup beta on front p+q face
                ctx.font = '13px KaTeX_Main, serif';
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('Step 1: evaluate \u03B1\u222A\u03B2', lx, treeY + 28);
                ctx.fillText('on [v\u2080,...,v' + (p + q) + ']', lx, treeY + 46);

                // Bracket visual
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(lx - 50, treeY + 60);
                ctx.lineTo(lx - 50, treeY + 75);
                ctx.lineTo(lx + 50, treeY + 75);
                ctx.lineTo(lx + 50, treeY + 60);
                ctx.stroke();

                ctx.fillStyle = '#9b59b6';
                ctx.fillText('\u03B1\u222A\u03B2 \u2208 C^' + (p + q), lx, treeY + 95);

                // Step 2: multiply by gamma
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('Step 2: (\u03B1\u222A\u03B2) \u00B7 \u03B3', lx, treeY + 118);
                ctx.fillText('on [v' + (p + q) + ',...,v' + total + ']', lx, treeY + 136);
              }

              // Right bracketing: alpha cup (beta cup gamma)
              if (viz.state.showRight) {
                const rx = width * 0.72;

                ctx.fillStyle = '#1abc9c';
                ctx.font = 'bold 14px KaTeX_Main, serif';
                ctx.fillText('Right: \u03B1 \u222A (\u03B2 \u222A \u03B3)', rx, treeY);

                ctx.font = '13px KaTeX_Main, serif';
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('Step 1: evaluate \u03B2\u222A\u03B3', rx, treeY + 28);
                ctx.fillText('on [v' + p + ',...,v' + total + ']', rx, treeY + 46);

                ctx.strokeStyle = '#1abc9c';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(rx - 50, treeY + 60);
                ctx.lineTo(rx - 50, treeY + 75);
                ctx.lineTo(rx + 50, treeY + 75);
                ctx.lineTo(rx + 50, treeY + 60);
                ctx.stroke();

                ctx.fillStyle = '#1abc9c';
                ctx.fillText('\u03B2\u222A\u03B3 \u2208 C^' + (q + r), rx, treeY + 95);

                ctx.fillStyle = '#2c3e50';
                ctx.fillText('Step 2: \u03B1 \u00B7 (\u03B2\u222A\u03B3)', rx, treeY + 118);
                ctx.fillText('on [v\u2080,...,v' + p + ']', rx, treeY + 136);
              }

              // Conclusion
              const concY = treeY + 170;
              ctx.fillStyle = '#e67e22';
              ctx.font = 'bold 16px KaTeX_Main, serif';
              ctx.fillText('Both give: \u03B1(front) \u00B7 \u03B2(middle) \u00B7 \u03B3(back)', width / 2, concY);

              ctx.fillStyle = '#2c3e50';
              ctx.font = '14px KaTeX_Main, serif';
              ctx.fillText('= \u03C6(\u03C3|[v\u2080,...,v' + p + ']) \u00B7 \u03C8(\u03C3|[v' + p + ',...,v' + (p + q) + ']) \u00B7 \u03C7(\u03C3|[v' + (p + q) + ',...,v' + total + '])', width / 2, concY + 24);

              // Checkmark
              ctx.fillStyle = '#27ae60';
              ctx.font = 'bold 20px KaTeX_Main, serif';
              ctx.fillText('\u2713  Same triple product!', width / 2, concY + 55);
            },
            controls: [
              {
                type: 'slider',
                label: 'deg(\u03B1) = p',
                min: 1,
                max: 3,
                step: 1,
                initial: 1,
                action: (viz, value) => { viz.state.p = value; }
              },
              {
                type: 'slider',
                label: 'deg(\u03B2) = q',
                min: 1,
                max: 3,
                step: 1,
                initial: 1,
                action: (viz, value) => { viz.state.q = value; }
              },
              {
                type: 'slider',
                label: 'deg(\u03B3) = r',
                min: 1,
                max: 3,
                step: 1,
                initial: 1,
                action: (viz, value) => { viz.state.r = value; }
              },
              {
                type: 'button',
                label: 'Toggle Left Path',
                action: (viz) => { viz.state.showLeft = !viz.state.showLeft; }
              },
              {
                type: 'button',
                label: 'Toggle Right Path',
                action: (viz) => { viz.state.showRight = !viz.state.showRight; }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'graded-comm-ex1',
          question: 'Let \\(\\alpha \\in H^2(X; \\mathbb{Z})\\). What does graded commutativity say about \\(\\alpha \\cup \\alpha\\)? Can it be nonzero?',
          hint: 'Compute \\((-1)^{2 \\cdot 2}\\). Contrast with odd-degree classes.',
          solution: `Graded commutativity gives \\(\\alpha \\cup \\alpha = (-1)^{2 \\cdot 2}\\alpha \\cup \\alpha = (+1)\\alpha \\cup \\alpha\\).

This is trivially satisfied -- no constraint! So \\(\\alpha \\cup \\alpha\\) <em>can</em> be nonzero.

Example: In \\(H^*(\\mathbb{C}P^2; \\mathbb{Z}) = \\mathbb{Z}[\\alpha]/(\\alpha^3)\\) with \\(\\deg(\\alpha) = 2\\), we have \\(\\alpha \\cup \\alpha = \\alpha^2 \\neq 0\\), generating \\(H^4(\\mathbb{C}P^2)\\).

In contrast, odd-degree classes \\(\\beta \\in H^1\\) satisfy \\(\\beta \\cup \\beta = -\\beta \\cup \\beta\\), forcing \\(2(\\beta^2) = 0\\).`
        },
        {
          id: 'graded-comm-ex2',
          question: 'Show that over \\(\\mathbb{Z}/2\\) coefficients, the cup product is genuinely commutative (no signs).',
          hint: 'What is \\(-1\\) in \\(\\mathbb{Z}/2\\)?',
          solution: `In \\(\\mathbb{Z}/2\\), we have \\(-1 \\equiv 1 \\pmod{2}\\).

Therefore \\((-1)^{pq} = 1\\) in \\(\\mathbb{Z}/2\\) for all \\(p, q\\).

Graded commutativity becomes:
\\[\\alpha \\cup \\beta = (-1)^{pq} \\beta \\cup \\alpha = 1 \\cdot \\beta \\cup \\alpha = \\beta \\cup \\alpha\\]

So \\(H^*(X; \\mathbb{Z}/2)\\) is a genuinely commutative graded ring. This is why \\(\\mathbb{Z}/2\\) coefficients are especially nice for computations.`
        }
      ]
    },
    {
      id: 'torus-cohomology-ring',
      title: 'The Exterior Algebra H*(T\u00b2; Z) = \u039b[\u03b1,\u03b2]',
      content: `
        <div class="env-block theorem">
          <strong>Theorem:</strong> The cohomology ring of the torus is the <strong>exterior algebra</strong>:
          \\[
          H^*(T^2; \\mathbb{Z}) \\cong \\Lambda_{\\mathbb{Z}}[\\alpha, \\beta]
          \\]
          where \\(\\alpha, \\beta \\in H^1(T^2; \\mathbb{Z})\\) are degree 1 generators, satisfying:
          \\[
          \\alpha \\smile \\alpha = 0, \\quad \\beta \\smile \\beta = 0, \\quad \\alpha \\smile \\beta = -\\beta \\smile \\alpha
          \\]
          The ring has \\(\\mathbb{Z}\\)-basis \\(\\{1, \\alpha, \\beta, \\alpha \\smile \\beta\\}\\) with:
          \\[
          H^0 = \\mathbb{Z} \\cdot 1, \\quad H^1 = \\mathbb{Z} \\cdot \\alpha \\oplus \\mathbb{Z} \\cdot \\beta, \\quad H^2 = \\mathbb{Z} \\cdot (\\alpha \\smile \\beta)
          \\]
        </div>

        <div class="env-block proof">
          <strong>Proof:</strong> Give \\(T^2\\) the standard CW structure: one 0-cell \\(v\\), two 1-cells \\(a, b\\), and one 2-cell \\(e\\) attached via \\(aba^{-1}b^{-1}\\).

          <strong>Step 1 (Cellular cochains):</strong>
          \\[
          C^0 = \\mathbb{Z}, \\quad C^1 = \\mathbb{Z}^2 \\text{ (dual to } a, b\\text{)}, \\quad C^2 = \\mathbb{Z} \\text{ (dual to } e\\text{)}
          \\]
          Let \\(\\alpha, \\beta \\in C^1\\) be the dual basis to \\(a, b\\): \\(\\alpha(a) = 1, \\alpha(b) = 0\\), etc.

          <strong>Step 2 (Coboundary):</strong> The boundary map \\(\\partial_2(e) = a + b - a - b = 0\\), so:
          \\[
          \\delta^1(\\alpha)(e) = \\alpha(\\partial e) = \\alpha(0) = 0
          \\]
          Thus \\(\\delta^1 = 0\\). Also \\(\\delta^0 = 0\\) (one vertex). Therefore \\(H^k = C^k\\) for all \\(k\\).

          <strong>Step 3 (Cup product):</strong> We need to refine the CW structure with a simplicial subdivision. Divide the square into two triangles: \\([v_0, v_1, v_3]\\) and \\([v_1, v_2, v_3]\\) (where vertices are identified appropriately on the torus).

          On this triangulation, the cup product evaluates as:
          \\[
          (\\alpha \\smile \\beta)([v_0, v_1, v_3]) = \\alpha([v_0, v_1]) \\cdot \\beta([v_1, v_3]) = 1 \\cdot 1 = 1
          \\]
          So \\(\\alpha \\smile \\beta\\) is a generator of \\(H^2(T^2) \\cong \\mathbb{Z}\\).

          By graded commutativity (\\(|\\alpha| = |\\beta| = 1\\)):
          \\[
          \\alpha \\smile \\beta = (-1)^{1 \\cdot 1} \\beta \\smile \\alpha = -\\beta \\smile \\alpha
          \\]
          and \\(\\alpha^2 = \\beta^2 = 0\\) (odd degree).

          These are exactly the relations of the exterior algebra \\(\\Lambda[\\alpha, \\beta]\\). \\(\\square\\)
        </div>

        <div class="env-block definition">
          <strong>Definition (Exterior Algebra):</strong> The <strong>exterior algebra</strong> \\(\\Lambda_R[x_1, \\ldots, x_n]\\) over a ring \\(R\\) is the quotient:
          \\[
          \\Lambda_R[x_1, \\ldots, x_n] = T_R(x_1, \\ldots, x_n) / (x_i^2, \\; x_i x_j + x_j x_i)
          \\]
          where \\(T_R\\) is the tensor algebra. It has \\(R\\)-rank \\(2^n\\), with basis \\(\\{x_{i_1} \\wedge \\cdots \\wedge x_{i_k} : i_1 < \\cdots < i_k\\}\\).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Higher Tori via K\u00fcnneth):</strong> For the \\(n\\)-torus \\(T^n = (S^1)^n\\), the K\u00fcnneth formula gives:
          \\[
          H^*(T^n; \\mathbb{Z}) \\cong \\Lambda_{\\mathbb{Z}}[\\alpha_1, \\ldots, \\alpha_n]
          \\]
          with each \\(|\\alpha_i| = 1\\). The Betti numbers are:
          \\[
          \\beta_k(T^n) = \\binom{n}{k}
          \\]
        </div>

        <div class="env-block example">
          <strong>Example (\\(T^3\\)):</strong> The 3-torus has cohomology ring \\(\\Lambda[\\alpha_1, \\alpha_2, \\alpha_3]\\):
          \\[
          \\begin{aligned}
          H^0 &= \\mathbb{Z} \\cdot 1 \\\\
          H^1 &= \\mathbb{Z}^3 \\quad (\\alpha_1, \\alpha_2, \\alpha_3) \\\\
          H^2 &= \\mathbb{Z}^3 \\quad (\\alpha_1 \\alpha_2, \\alpha_1 \\alpha_3, \\alpha_2 \\alpha_3) \\\\
          H^3 &= \\mathbb{Z} \\cdot \\alpha_1 \\alpha_2 \\alpha_3
          \\end{aligned}
          \\]
          Betti numbers: \\(1, 3, 3, 1\\) (the row of Pascal's triangle!).
        </div>

        <div class="env-block remark">
          <strong>Geometric Interpretation:</strong> The generators \\(\\alpha, \\beta \\in H^1(T^2)\\) are Poincar\u00e9 dual to the two fundamental loops. The cup product \\(\\alpha \\smile \\beta\\) measures the <em>intersection number</em> of these loops: the meridian and longitude of the torus cross exactly once, so \\(\\alpha \\smile \\beta\\) is a generator of \\(H^2(T^2) \\cong \\mathbb{Z}\\).
        </div>
      `,
      visualizations: [
        {
          id: 'torus-cup-product-viz',
          title: 'Torus Cup Product Geometry',
          description: 'See the geometric meaning of alpha cup beta as intersection on the torus.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                showAlpha: true,
                showBeta: true,
                showIntersection: true,
                time: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              viz.state.time += 0.02;

              const centerX = width / 2;
              const centerY = height * 0.45;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Torus T\u00b2: Cup Product as Intersection', centerX, 25);

              // Draw flat torus (rectangle with identified edges)
              const rectW = Math.min(width * 0.6, 280);
              const rectH = rectW * 0.75;
              const rx = centerX - rectW / 2;
              const ry = centerY - rectH / 2;

              // Fill background
              ctx.fillStyle = 'rgba(236, 240, 241, 0.5)';
              ctx.fillRect(rx, ry, rectW, rectH);

              // Draw rectangle border with identification arrows
              ctx.strokeStyle = '#2c3e50';
              ctx.lineWidth = 2;
              ctx.strokeRect(rx, ry, rectW, rectH);

              // Identification arrows
              const arrowSize = 8;

              // Top/bottom edges (identified: alpha)
              if (viz.state.showAlpha) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                // Bottom edge
                ctx.beginPath();
                ctx.moveTo(rx, ry + rectH);
                ctx.lineTo(rx + rectW, ry + rectH);
                ctx.stroke();
                // Arrow
                ctx.fillStyle = '#3498db';
                ctx.beginPath();
                ctx.moveTo(rx + rectW / 2 + arrowSize, ry + rectH - arrowSize);
                ctx.lineTo(rx + rectW / 2 + arrowSize, ry + rectH + arrowSize);
                ctx.lineTo(rx + rectW / 2 + arrowSize * 2, ry + rectH);
                ctx.closePath();
                ctx.fill();

                // Top edge
                ctx.beginPath();
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx + rectW, ry);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(rx + rectW / 2 + arrowSize, ry - arrowSize);
                ctx.lineTo(rx + rectW / 2 + arrowSize, ry + arrowSize);
                ctx.lineTo(rx + rectW / 2 + arrowSize * 2, ry);
                ctx.closePath();
                ctx.fill();
              }

              // Left/right edges (identified: beta)
              if (viz.state.showBeta) {
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 3;
                // Right edge
                ctx.beginPath();
                ctx.moveTo(rx + rectW, ry);
                ctx.lineTo(rx + rectW, ry + rectH);
                ctx.stroke();
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.moveTo(rx + rectW - arrowSize, ry + rectH / 2 + arrowSize);
                ctx.lineTo(rx + rectW + arrowSize, ry + rectH / 2 + arrowSize);
                ctx.lineTo(rx + rectW, ry + rectH / 2 + arrowSize * 2);
                ctx.closePath();
                ctx.fill();

                // Left edge
                ctx.beginPath();
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx, ry + rectH);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(rx - arrowSize, ry + rectH / 2 + arrowSize);
                ctx.lineTo(rx + arrowSize, ry + rectH / 2 + arrowSize);
                ctx.lineTo(rx, ry + rectH / 2 + arrowSize * 2);
                ctx.closePath();
                ctx.fill();
              }

              // Draw alpha cycle (horizontal line through middle)
              if (viz.state.showAlpha) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(rx, ry + rectH / 2);
                ctx.lineTo(rx + rectW, ry + rectH / 2);
                ctx.stroke();

                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'right';
                ctx.fillText('\u03b1', rx - 10, ry + rectH / 2 + 5);
              }

              // Draw beta cycle (vertical line through middle)
              if (viz.state.showBeta) {
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(rx + rectW / 2, ry);
                ctx.lineTo(rx + rectW / 2, ry + rectH);
                ctx.stroke();

                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('\u03b2', rx + rectW / 2, ry - 10);
              }

              // Intersection point
              if (viz.state.showIntersection && viz.state.showAlpha && viz.state.showBeta) {
                const pulse = 8 + 3 * Math.sin(viz.state.time * 3);
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.arc(rx + rectW / 2, ry + rectH / 2, pulse, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText('\u03b1 \u2323 \u03b2 = +1', rx + rectW / 2 + 15, ry + rectH / 2 - 10);
              }

              // Labels
              const labelY = centerY + rectH / 2 + 30;
              ctx.fillStyle = '#2c3e50';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Flat torus: rectangle with opposite edges identified', centerX, labelY);
              ctx.fillText('\u03b1 \u2323 \u03b2 generates H\u00b2(T\u00b2) \u2245 \u2124 (intersection number = 1)', centerX, labelY + 20);

              // Ring summary
              ctx.fillStyle = '#7f8c8d';
              ctx.font = '12px KaTeX_Main';
              ctx.fillText('H*(T\u00b2) = \u039b[\u03b1,\u03b2]: \u03b1\u00b2 = \u03b2\u00b2 = 0, \u03b1\u03b2 = -\u03b2\u03b1', centerX, height - 10);
            },
            controls: [
              {
                type: 'checkbox',
                id: 'showAlpha',
                label: 'Show \u03b1 cycle',
                value: true
              },
              {
                type: 'checkbox',
                id: 'showBeta',
                label: 'Show \u03b2 cycle',
                value: true
              },
              {
                type: 'checkbox',
                id: 'showIntersection',
                label: 'Show intersection',
                value: true
              }
            ]
          }
        },
        {
          id: 'exterior-algebra-viz',
          title: 'Exterior Algebra Structure',
          description: 'Explore the exterior algebra for n-tori and see Pascal triangle Betti numbers.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                torusDim: 2
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const n = viz.state.torusDim;
              const centerX = width / 2;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Exterior Algebra \u039b[\u03b1\u2081, ..., \u03b1${subscript(n)}] for T${superscript(n)}`, centerX, 25);

              // Betti numbers
              const betti = [];
              for (let k = 0; k <= n; k++) {
                betti.push(binomial(n, k));
              }

              // Draw Betti number bar chart
              const barW = Math.min(60, (width - 100) / (n + 1));
              const maxBetti = Math.max(...betti);
              const barAreaH = height * 0.35;
              const barY = 70;

              for (let k = 0; k <= n; k++) {
                const x = centerX - ((n + 1) * barW) / 2 + k * barW;
                const barH = (betti[k] / maxBetti) * barAreaH;
                const y = barY + barAreaH - barH;

                // Bar
                const hue = (k / (n + 1)) * 240;
                ctx.fillStyle = `hsl(${hue}, 60%, 60%)`;
                ctx.fillRect(x + 5, y, barW - 10, barH);
                ctx.strokeStyle = `hsl(${hue}, 60%, 45%)`;
                ctx.lineWidth = 1;
                ctx.strokeRect(x + 5, y, barW - 10, barH);

                // Betti number label
                ctx.fillStyle = '#000';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText(betti[k].toString(), x + barW / 2, y - 5);

                // Degree label
                ctx.font = '12px KaTeX_Main';
                ctx.fillText(`H${superscript(k)}`, x + barW / 2, barY + barAreaH + 18);
              }

              // Basis listing
              const basisY = barY + barAreaH + 45;
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 13px KaTeX_Main';
              ctx.textAlign = 'left';
              ctx.fillText('Basis elements:', 20, basisY);

              ctx.font = '12px KaTeX_Main';
              let curY = basisY + 20;
              for (let k = 0; k <= Math.min(n, 4); k++) {
                const elems = getBasisElements(n, k);
                const line = `H${superscript(k)}: ${elems.join(', ')}  (rank ${betti[k]})`;
                ctx.fillText(line, 30, curY);
                curY += 18;
              }
              if (n > 4) {
                ctx.fillText('...', 30, curY);
                curY += 18;
              }

              // Total dimension
              ctx.fillStyle = '#7f8c8d';
              ctx.font = '12px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Total rank: 2${superscript(n)} = ${Math.pow(2, n)}   |   Euler char: \u03c7(T${superscript(n)}) = 0`, centerX, height - 10);

              function superscript(d) {
                const sup = '\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079';
                return String(d).split('').map(c => sup[parseInt(c)]).join('');
              }
              function subscript(d) {
                const sub = '\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089';
                return String(d).split('').map(c => sub[parseInt(c)]).join('');
              }
              function binomial(n, k) {
                if (k < 0 || k > n) return 0;
                let result = 1;
                for (let i = 0; i < k; i++) {
                  result = result * (n - i) / (i + 1);
                }
                return Math.round(result);
              }
              function getBasisElements(n, k) {
                if (k === 0) return ['1'];
                const names = [];
                for (let i = 1; i <= Math.min(n, 6); i++) names.push(`\u03b1${subscript(i)}`);
                if (k === 1) return names.slice(0, n);
                // Generate combinations
                const combos = [];
                const indices = [];
                function choose(start, remaining) {
                  if (remaining === 0) {
                    combos.push(indices.map(i => names[i]).join(''));
                    return;
                  }
                  if (combos.length >= 6) return; // limit display
                  for (let i = start; i < n; i++) {
                    indices.push(i);
                    choose(i + 1, remaining - 1);
                    indices.pop();
                  }
                }
                choose(0, k);
                if (binomial(n, k) > 6) combos.push('...');
                return combos;
              }
            },
            controls: [
              {
                type: 'slider',
                id: 'torusDim',
                label: 'Torus dimension n',
                min: 1,
                max: 6,
                step: 1,
                value: 2
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-torus-1',
          question: 'Verify that the Euler characteristic \\(\\chi(T^n) = 0\\) for all \\(n \\geq 1\\) using the Betti numbers \\(\\beta_k = \\binom{n}{k}\\).',
          hint: 'Use \\(\\chi = \\sum (-1)^k \\beta_k\\) and the binomial theorem with \\(x = -1\\).',
          solution: `The Euler characteristic is:
          \\[
          \\chi(T^n) = \\sum_{k=0}^{n} (-1)^k \\beta_k = \\sum_{k=0}^{n} (-1)^k \\binom{n}{k}
          \\]
          By the binomial theorem:
          \\[
          (1 + x)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k
          \\]
          Setting \\(x = -1\\):
          \\[
          (1 + (-1))^n = 0^n = 0 \\quad (\\text{for } n \\geq 1)
          \\]
          Therefore \\(\\chi(T^n) = 0\\) for all \\(n \\geq 1\\). \\(\\square\\)`
        }
      ]
    },
    {
      id: 'projective-space-ring',
      title: 'Truncated Polynomial Rings: H*(RPn) and H*(CPn)',
      content: `
        <div class="env-block theorem">
          <strong>Theorem (Cohomology Ring of \\(\\mathbb{R}P^n\\)):</strong> With \\(\\mathbb{Z}/2\\) coefficients:
          \\[
          H^*(\\mathbb{R}P^n; \\mathbb{Z}/2) \\cong \\mathbb{Z}/2[\\alpha] / (\\alpha^{n+1})
          \\]
          where \\(|\\alpha| = 1\\). This is a <strong>truncated polynomial ring</strong>: \\(\\alpha, \\alpha^2, \\ldots, \\alpha^n\\) are all nonzero, but \\(\\alpha^{n+1} = 0\\).
        </div>

        <div class="env-block proof">
          <strong>Proof outline:</strong>
          <ol>
            <li>\\(\\mathbb{R}P^n\\) has a CW structure with one cell in each dimension \\(0, 1, \\ldots, n\\).</li>
            <li>With \\(\\mathbb{Z}/2\\) coefficients, all boundary maps in the cellular chain complex vanish (\\(\\partial = 0 \\pmod{2}\\)), so:
            \\[
            H^k(\\mathbb{R}P^n; \\mathbb{Z}/2) = \\mathbb{Z}/2 \\quad \\text{for } 0 \\leq k \\leq n
            \\]</li>
            <li>Let \\(\\alpha \\in H^1(\\mathbb{R}P^n; \\mathbb{Z}/2)\\) be the nonzero element. One can show that the cup product \\(\\alpha^k \\neq 0\\) for all \\(1 \\leq k \\leq n\\) using the <em>cell structure</em> and induction on \\(n\\) via the pair \\((\\mathbb{R}P^n, \\mathbb{R}P^{n-1})\\).</li>
            <li>Since \\(H^k(\\mathbb{R}P^n; \\mathbb{Z}/2) = \\mathbb{Z}/2\\) has only one nonzero element, \\(\\alpha^k\\) must be the generator of \\(H^k\\).</li>
            <li>\\(\\alpha^{n+1} = 0\\) since \\(H^{n+1}(\\mathbb{R}P^n) = 0\\) (no \\((n+1)\\)-cells).</li>
          </ol>
          \\(\\square\\)
        </div>

        <div class="env-block example">
          <strong>Example (\\(\\mathbb{R}P^2\\)):</strong>
          \\[
          H^*(\\mathbb{R}P^2; \\mathbb{Z}/2) = \\mathbb{Z}/2[\\alpha]/(\\alpha^3) = \\{1, \\alpha, \\alpha^2\\}
          \\]
          <ul>
            <li>\\(H^0 = \\mathbb{Z}/2 \\cdot 1\\)</li>
            <li>\\(H^1 = \\mathbb{Z}/2 \\cdot \\alpha\\), where \\(\\alpha\\) detects the non-orientability.</li>
            <li>\\(H^2 = \\mathbb{Z}/2 \\cdot \\alpha^2\\), the "top class".</li>
          </ul>
          The crucial fact is \\(\\alpha^2 \\neq 0\\). This means the generator in \\(H^1\\) "squares up" to the top class.
        </div>

        <div class="env-block remark">
          <strong>Why \\(\\mathbb{Z}/2\\) coefficients?</strong> With integer coefficients, the ring structure of \\(H^*(\\mathbb{R}P^n; \\mathbb{Z})\\) is more complicated because of 2-torsion:
          \\[
          H^k(\\mathbb{R}P^n; \\mathbb{Z}) = \\begin{cases}
          \\mathbb{Z} & k = 0 \\text{ or } k = n \\text{ (n odd)} \\\\
          \\mathbb{Z}/2 & k \\text{ even}, \\; 0 < k < n \\text{ (from Ext)} \\\\
          0 & \\text{else}
          \\end{cases}
          \\]
          With \\(\\mathbb{Z}/2\\) coefficients, the torsion disappears and we get the clean polynomial ring. This is why <strong>mod 2 cohomology</strong> is especially natural for projective spaces.
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Cohomology Ring of \\(\\mathbb{C}P^n\\)):</strong> With integer coefficients:
          \\[
          H^*(\\mathbb{C}P^n; \\mathbb{Z}) \\cong \\mathbb{Z}[\\alpha] / (\\alpha^{n+1})
          \\]
          where \\(|\\alpha| = 2\\). The cohomology is concentrated in even degrees, with \\(H^{2k}(\\mathbb{C}P^n) = \\mathbb{Z}\\) for \\(0 \\leq k \\leq n\\).
        </div>

        <div class="env-block proof">
          <strong>Proof sketch:</strong> \\(\\mathbb{C}P^n\\) has a CW structure with one cell in each even dimension \\(0, 2, 4, \\ldots, 2n\\). The cellular boundary maps are all zero (no odd-dimensional cells), giving \\(H^{2k}(\\mathbb{C}P^n) = \\mathbb{Z}\\). The cup product is computed by induction using the pair \\((\\mathbb{C}P^n, \\mathbb{C}P^{n-1})\\) and the Thom isomorphism. \\(\\square\\)
        </div>

        <div class="env-block example">
          <strong>Example (\\(\\mathbb{C}P^\\infty\\)):</strong> Taking the direct limit:
          \\[
          H^*(\\mathbb{C}P^\\infty; \\mathbb{Z}) \\cong \\mathbb{Z}[\\alpha]
          \\]
          (the full polynomial ring, with no truncation). This is the classifying space \\(B\\text{U}(1)\\) and the generator \\(\\alpha \\in H^2\\) is the <strong>universal Chern class</strong> \\(c_1\\).
        </div>

        <div class="env-block theorem">
          <strong>Application (Immersion Bounds):</strong> The cup product structure of \\(H^*(\\mathbb{R}P^n; \\mathbb{Z}/2)\\) constrains immersions of \\(\\mathbb{R}P^n\\) into Euclidean space. If \\(\\mathbb{R}P^n\\) immerses in \\(\\mathbb{R}^{n+k}\\), then the Stiefel-Whitney class \\(\\bar{w}_k \\neq 0\\) (expressible in terms of \\(\\alpha^k\\)). This gives lower bounds on the codimension of immersions—a purely topological obstruction detected by the cup product.
        </div>
      `,
      visualizations: [
        {
          id: 'truncated-poly-viz',
          title: 'Truncated Polynomial Ring Visualizer',
          description: 'Explore the ring structure of H*(RPn; Z/2) and H*(CPn; Z) as truncated polynomial rings.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                space: 'rp',
                n: 4,
                highlightPower: 1
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const centerX = width / 2;
              const n = viz.state.n;
              const isRP = viz.state.space === 'rp';
              const genDeg = isRP ? 1 : 2;
              const topDeg = n * genDeg;
              const spaceName = isRP ? `\u211dP${superscript(n)}` : `\u2102P${superscript(n)}`;
              const coeffName = isRP ? '\u2124/2' : '\u2124';
              const genName = '\u03b1';

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`H*(${spaceName}; ${coeffName}) = ${coeffName}[${genName}]/(${genName}${superscript(n + 1)})`, centerX, 25);

              // Draw the powers as a chain
              const chainY = height * 0.35;
              const boxW = 55;
              const totalW = (n + 1) * boxW + n * 20;
              const startX = centerX - totalW / 2;

              for (let k = 0; k <= n; k++) {
                const x = startX + k * (boxW + 20);
                const deg = k * genDeg;
                const isHighlighted = k === viz.state.highlightPower;

                // Box
                ctx.fillStyle = isHighlighted ? 'rgba(155, 89, 182, 0.2)' : 'rgba(236, 240, 241, 0.8)';
                ctx.fillRect(x, chainY - 25, boxW, 50);
                ctx.strokeStyle = isHighlighted ? '#9b59b6' : '#bdc3c7';
                ctx.lineWidth = isHighlighted ? 3 : 1;
                ctx.strokeRect(x, chainY - 25, boxW, 50);

                // Content
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.textAlign = 'center';
                const label = k === 0 ? '1' : k === 1 ? genName : `${genName}${superscript(k)}`;
                ctx.fillText(label, x + boxW / 2, chainY - 2);

                // Degree
                ctx.fillStyle = '#7f8c8d';
                ctx.font = '11px KaTeX_Main';
                ctx.fillText(`H${superscript(deg)}`, x + boxW / 2, chainY + 18);

                // Arrow to next
                if (k < n) {
                  ctx.strokeStyle = '#27ae60';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(x + boxW, chainY);
                  ctx.lineTo(x + boxW + 20, chainY);
                  ctx.stroke();
                  ctx.fillStyle = '#27ae60';
                  ctx.beginPath();
                  ctx.moveTo(x + boxW + 20, chainY);
                  ctx.lineTo(x + boxW + 14, chainY - 4);
                  ctx.lineTo(x + boxW + 14, chainY + 4);
                  ctx.closePath();
                  ctx.fill();

                  ctx.fillStyle = '#27ae60';
                  ctx.font = '10px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(`\u00d7${genName}`, x + boxW + 10, chainY - 8);
                }
              }

              // Truncation indicator
              const lastX = startX + n * (boxW + 20) + boxW + 10;
              if (lastX < width - 40) {
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(lastX, chainY);
                ctx.lineTo(lastX + 30, chainY);
                ctx.stroke();
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText('= 0', lastX + 32, chainY + 5);
                ctx.font = '11px KaTeX_Main';
                ctx.fillText(`${genName}${superscript(n + 1)}`, lastX + 10, chainY - 10);
              }

              // Key properties
              const infoY = height * 0.65;
              ctx.fillStyle = '#2c3e50';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              const props = isRP ? [
                `\u2022 Generator: |\u03b1| = 1 (detects non-orientability)`,
                `\u2022 \u03b1\u1d4f \u2260 0 for 1 \u2264 k \u2264 ${n}`,
                `\u2022 \u03b1${superscript(n + 1)} = 0 (no cells above dim ${n})`,
                `\u2022 Over \u2124/2: all signs vanish (\u03b1\u00b2 = \u03b1 \u2323 \u03b1)`,
                `\u2022 Stiefel-Whitney class: w\u2081(\u03b3) = \u03b1`
              ] : [
                `\u2022 Generator: |\u03b1| = 2 (first Chern class c\u2081)`,
                `\u2022 \u03b1\u1d4f \u2260 0 for 1 \u2264 k \u2264 ${n}`,
                `\u2022 \u03b1${superscript(n + 1)} = 0 (no cells above dim ${2 * n})`,
                `\u2022 Over \u2124: no sign issues (even degrees)`,
                `\u2022 Limiting case: H*(\u2102P\u221e) = \u2124[\u03b1] (no truncation)`
              ];
              props.forEach((prop, i) => {
                ctx.fillText(prop, 20, infoY + i * 20);
              });

              function superscript(d) {
                const sup = '\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079';
                return String(d).split('').map(c => sup[parseInt(c)]).join('');
              }
            },
            controls: [
              {
                type: 'select',
                id: 'space',
                label: 'Space',
                options: [
                  { value: 'rp', label: '\u211dP\u207f (real projective)' },
                  { value: 'cp', label: '\u2102P\u207f (complex projective)' }
                ],
                value: 'rp'
              },
              {
                type: 'slider',
                id: 'n',
                label: 'n (dimension)',
                min: 1,
                max: 6,
                step: 1,
                value: 4
              },
              {
                type: 'slider',
                id: 'highlightPower',
                label: 'Highlight power k',
                min: 0,
                max: 6,
                step: 1,
                value: 1
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-proj-1',
          question: 'Show that \\(\\mathbb{R}P^2\\) does not retract onto \\(\\mathbb{R}P^1 = S^1\\).',
          hint: 'A retraction \\(r: \\mathbb{R}P^2 \\to \\mathbb{R}P^1\\) induces \\(r^*: H^*(\\mathbb{R}P^1; \\mathbb{Z}/2) \\to H^*(\\mathbb{R}P^2; \\mathbb{Z}/2)\\) with \\(r^* \\circ i^* = \\text{id}\\). Look at \\(\\alpha^2\\).',
          solution: `Suppose \\(r: \\mathbb{R}P^2 \\to \\mathbb{R}P^1\\) is a retraction, so \\(r \\circ i = \\text{id}_{\\mathbb{R}P^1}\\) where \\(i: \\mathbb{R}P^1 \\hookrightarrow \\mathbb{R}P^2\\).

          The induced map \\(i^*: H^1(\\mathbb{R}P^2; \\mathbb{Z}/2) \\to H^1(\\mathbb{R}P^1; \\mathbb{Z}/2)\\) is an isomorphism (both \\(\\mathbb{Z}/2\\)), and \\(r^* \\circ i^* = \\text{id}\\). Let \\(\\alpha \\in H^1(\\mathbb{R}P^2; \\mathbb{Z}/2)\\) be the generator.

          Since \\(r^*\\) is a ring homomorphism:
          \\[
          r^*(\\alpha^2_{\\mathbb{R}P^1}) = (r^* \\alpha)^2
          \\]
          But \\(\\alpha^2_{\\mathbb{R}P^1} = 0\\) since \\(H^2(\\mathbb{R}P^1; \\mathbb{Z}/2) = 0\\) (\\(\\mathbb{R}P^1 = S^1\\) is 1-dimensional).

          On the other hand, \\(r^*\\) must send the generator of \\(H^1(\\mathbb{R}P^1)\\) to a nonzero element (since \\(r^* \\circ i^* = \\text{id}\\)), so \\(r^*(\\alpha_{\\mathbb{R}P^1}) = \\alpha\\). Then:
          \\[
          (r^* \\alpha_{\\mathbb{R}P^1})^2 = \\alpha^2 \\neq 0
          \\]
          since \\(\\alpha^2\\) generates \\(H^2(\\mathbb{R}P^2; \\mathbb{Z}/2) = \\mathbb{Z}/2\\).

          Contradiction: \\(r^*(0) = 0\\) but \\((r^* \\alpha)^2 = \\alpha^2 \\neq 0\\). \\(\\square\\)`
        }
      ]
    }
,
    {
      id: 'cohomology-ring-computations',
      title: 'Cohomology Ring Computations',
      content: `
        <div class="env-block definition">
          <strong>Definition (Cohomology Ring Computation):</strong> To determine \\(H^*(X; R)\\) as a graded ring, one must:
          <ol>
            <li><strong>Find generators:</strong> Identify generators for each \\(H^n(X; R)\\) as an \\(R\\)-module.</li>
            <li><strong>Determine cup products:</strong> Compute all products between generators.</li>
            <li><strong>Express as quotient:</strong> Present \\(H^*(X; R)\\) as a quotient of a free graded algebra by the ideal of relations.</li>
          </ol>
        </div>

        <div class="env-block example">
          <strong>Example (Sphere \\(S^n\\)):</strong>
          \\[
          H^*(S^n; \\mathbb{Z}) = \\mathbb{Z}[\\alpha]/(\\alpha^2), \\qquad \\deg(\\alpha) = n.
          \\]
          There is only one generator \\(\\alpha\\) in degree \\(n\\), and \\(\\alpha^2 = 0\\) because \\(H^{2n}(S^n) = 0\\).
        </div>

        <div class="env-block example">
          <strong>Example (Product of Spheres \\(S^m \\times S^n\\)):</strong> By the Kunneth formula:
          \\[
          H^*(S^m \\times S^n; \\mathbb{Z}) = \\mathbb{Z}[\\alpha, \\beta]/(\\alpha^2, \\beta^2, \\alpha\\beta - (-1)^{mn}\\beta\\alpha)
          \\]
          with \\(\\deg(\\alpha) = m\\), \\(\\deg(\\beta) = n\\). Basis: \\(\\{1, \\alpha, \\beta, \\alpha\\beta\\}\\).
        </div>

        <div class="env-block example">
          <strong>Example (Orientable Surface \\(\\Sigma_g\\) of Genus \\(g\\)):</strong>
          \\[
          H^*(\\Sigma_g; \\mathbb{Z}) = \\Lambda[\\alpha_1, \\beta_1, \\ldots, \\alpha_g, \\beta_g] / I
          \\]
          where \\(\\deg(\\alpha_i) = \\deg(\\beta_i) = 1\\), and the ideal \\(I\\) encodes:
          <ul>
            <li>\\(\\alpha_i \\cup \\beta_i = -\\beta_i \\cup \\alpha_i = [\\Sigma_g]^*\\) for each \\(i\\)</li>
            <li>\\(\\alpha_i \\cup \\alpha_j = 0\\), \\(\\beta_i \\cup \\beta_j = 0\\), \\(\\alpha_i \\cup \\beta_j = 0\\) for \\(i \\neq j\\)</li>
          </ul>
          The cup product pairing \\(H^1 \\times H^1 \\to H^2 \\cong \\mathbb{Z}\\) gives a <em>symplectic form</em> on the \\(2g\\)-dimensional space \\(H^1\\).
        </div>

        <div class="env-block example">
          <strong>Example (Klein Bottle \\(K\\)):</strong> Over \\(\\mathbb{Z}\\), \\(H^2(K; \\mathbb{Z}) = 0\\) (non-orientable), so all cup products of 1-classes are trivial. Over \\(\\mathbb{Z}/2\\):
          \\[
          H^*(K; \\mathbb{Z}/2) = \\mathbb{Z}/2[\\alpha, \\beta]/(\\alpha^2 + \\alpha\\beta,\\, \\beta^2)
          \\]
          with \\(\\deg(\\alpha) = \\deg(\\beta) = 1\\). Note \\(\\alpha^2 = \\alpha\\beta \\neq 0\\) but \\(\\beta^2 = 0\\).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Cup Product and Maps):</strong> If \\(f: X \\to Y\\) is continuous, then \\(f^*: H^*(Y; R) \\to H^*(X; R)\\) is a graded ring homomorphism. In particular:
          <ul>
            <li>If \\(f\\) is a homotopy equivalence, \\(f^*\\) is a ring isomorphism.</li>
            <li>If the rings \\(H^*(X; R)\\) and \\(H^*(Y; R)\\) are not isomorphic as graded rings, then \\(X \\not\\simeq Y\\).</li>
          </ul>
        </div>

        <div class="env-block remark">
          <strong>Computational Techniques:</strong>
          <ol>
            <li><strong>CW structure:</strong> Use cellular cochains with explicit cup product formulas.</li>
            <li><strong>Kunneth formula:</strong> For products, \\(H^*(X \\times Y) \\cong H^*(X) \\otimes H^*(Y)\\) as graded rings.</li>
            <li><strong>Mayer-Vietoris:</strong> Decompose and patch using connecting homomorphisms.</li>
            <li><strong>Poincare duality:</strong> For closed orientable manifolds (next chapter).</li>
          </ol>
        </div>
      `,
      visualizations: [],
      exercises: [
        {
          id: 'comp-ring-ex1',
          question: 'Compute the full ring structure of \\(H^*(\\mathbb{R}P^3; \\mathbb{Z}/2)\\) and list all cup products between generators.',
          hint: 'The ring is \\(\\mathbb{Z}/2[\\alpha]/(\\alpha^4)\\) with \\(\\deg(\\alpha) = 1\\).',
          solution: `The cohomology ring is \\(H^*(\\mathbb{R}P^3; \\mathbb{Z}/2) = \\mathbb{Z}/2[\\alpha]/(\\alpha^4)\\).

Generators and groups:
\\[H^0 = \\mathbb{Z}/2\\langle 1 \\rangle, \\quad H^1 = \\mathbb{Z}/2\\langle \\alpha \\rangle, \\quad H^2 = \\mathbb{Z}/2\\langle \\alpha^2 \\rangle, \\quad H^3 = \\mathbb{Z}/2\\langle \\alpha^3 \\rangle\\]

Cup products:
\\[\\alpha \\cup \\alpha = \\alpha^2 \\neq 0 \\in H^2\\]
\\[\\alpha \\cup \\alpha^2 = \\alpha^2 \\cup \\alpha = \\alpha^3 \\neq 0 \\in H^3\\]
\\[\\alpha^2 \\cup \\alpha^2 = \\alpha^4 = 0\\]
\\[\\alpha \\cup \\alpha^3 = \\alpha^3 \\cup \\alpha = \\alpha^4 = 0\\]

All products are determined by the single generator \\(\\alpha\\) and the truncation relation \\(\\alpha^4 = 0\\).`
        }
      ]
    }
  ]
});
