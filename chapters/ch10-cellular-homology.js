// Updated: 2026-02-16 13:48:43
window.CHAPTERS.push({
  id: 'ch10',
  number: 10,
  title: 'Cellular Homology',
  subtitle: 'Efficient Computation via CW Structures',
  sections: [
    {
      id: 'cw-review',
      title: 'CW Complexes Reviewed',
      content: `
        <div class="env-block definition">
          <strong>Definition (CW Complex - Recap):</strong> A <strong>CW complex</strong> \\(X\\) is built by attaching cells:
          <ol>
            <li><strong>0-skeleton \\(X^0\\):</strong> Discrete set of points (0-cells).</li>
            <li><strong>\\(n\\)-skeleton \\(X^n\\):</strong> Obtained from \\(X^{n-1}\\) by attaching \\(n\\)-cells \\(e_\\alpha^n\\) via characteristic maps \\(\\Phi_\\alpha: D^n \\to X^n\\) with attaching maps \\(\\phi_\\alpha: S^{n-1} \\to X^{n-1}\\).</li>
            <li><strong>Topology:</strong> \\(A \\subseteq X\\) is closed iff \\(A \\cap \\overline{e_\\alpha^n}\\) is closed for all cells (weak topology).</li>
          </ol>
        </div>

        <div class="env-block example">
          <strong>Example 1 (\\(S^n\\)):</strong> One 0-cell \\(e^0\\), one \\(n\\)-cell \\(e^n\\). Attaching map \\(\\phi: S^{n-1} \\to e^0\\) (constant).
        </div>

        <div class="env-block example">
          <strong>Example 2 (Torus \\(T^2\\)):</strong>
          <ul>
            <li>One 0-cell \\(e^0\\).</li>
            <li>Two 1-cells \\(e_a^1, e_b^1\\) (meridian, longitude), each attached to \\(e^0\\) at both ends.</li>
            <li>One 2-cell \\(e^2\\), attached via the commutator path \\([a, b] = aba^{-1}b^{-1}\\) on the 1-skeleton.</li>
          </ul>
          Total: 1 vertex, 2 edges, 1 face.
        </div>

        <div class="env-block example">
          <strong>Example 3 (Real projective space \\(\\mathbb{R}P^n\\)):</strong>
          \\[
          \\mathbb{R}P^n = e^0 \\cup e^1 \\cup e^2 \\cup \\cdots \\cup e^n
          \\]
          One cell in each dimension \\(0, 1, \\ldots, n\\). The \\(k\\)-cell is attached via the quotient map \\(S^{k-1} \\to \\mathbb{R}P^{k-1}\\) (identifying antipodal points).
        </div>

        <div class="env-block definition">
          <strong>Definition (Good CW Complex):</strong> A CW complex is <strong>regular</strong> if all characteristic maps \\(\\Phi_\\alpha: D^n \\to X^n\\) are homeomorphisms onto their image. Most examples we care about are regular.
        </div>

        <div class="env-block remark">
          <strong>Why CW complexes?</strong>
          <ul>
            <li>Flexible: many spaces have natural CW structures (manifolds, Lie groups, etc.).</li>
            <li>Computable: cellular homology has one generator per cell (much smaller than simplicial).</li>
            <li>Homotopy-invariant: CW approximation shows any space is weakly equivalent to a CW complex.</li>
          </ul>
        </div>
      `,
      visualizations: [
        {
          id: 'cw-structure-viz',
          title: 'CW Structure Visualizer',
          description: 'Explore how cells attach to build up the skeleton.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                space: 'torus', // 'sphere', 'torus', 'rp2', 'klein'
                skeleton: 2, // 0, 1, 2
                showLabels: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const centerX = width / 2;
              const centerY = height / 2;

              const structures = {
                sphere: {
                  name: 'S²',
                  cells: {
                    0: [{ label: 'e⁰', x: centerX, y: centerY - 80 }],
                    1: [],
                    2: [{ label: 'e²', x: centerX, y: centerY + 40, r: 90 }]
                  }
                },
                torus: {
                  name: 'T²',
                  cells: {
                    0: [{ label: 'e⁰', x: centerX, y: centerY }],
                    1: [
                      { label: 'eₐ¹', x: centerX - 80, y: centerY, path: 'loop-left' },
                      { label: 'eᵦ¹', x: centerX + 80, y: centerY, path: 'loop-right' }
                    ],
                    2: [{ label: 'e²', x: centerX, y: centerY, r: 100 }]
                  }
                },
                rp2: {
                  name: 'ℝP²',
                  cells: {
                    0: [{ label: 'e⁰', x: centerX - 120, y: centerY }],
                    1: [{ label: 'e¹', x: centerX, y: centerY, path: 'line' }],
                    2: [{ label: 'e²', x: centerX + 120, y: centerY, r: 60 }]
                  }
                },
                klein: {
                  name: 'Klein Bottle',
                  cells: {
                    0: [{ label: 'e⁰', x: centerX, y: centerY }],
                    1: [
                      { label: 'eₐ¹', x: centerX - 80, y: centerY, path: 'loop-left' },
                      { label: 'eᵦ¹', x: centerX + 80, y: centerY, path: 'loop-right' }
                    ],
                    2: [{ label: 'e²', x: centerX, y: centerY, r: 100 }]
                  }
                }
              };

              const current = structures[viz.state.space];

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`CW Structure: ${current.name}`, centerX, 25);
              ctx.font = '14px KaTeX_Main';
              ctx.fillText(`Showing ${viz.state.skeleton}-skeleton`, centerX, 50);

              // Draw cells up to current skeleton
              for (let dim = 0; dim <= viz.state.skeleton; dim++) {
                const cells = current.cells[dim] || [];

                cells.forEach(cell => {
                  if (dim === 0) {
                    // 0-cell (point)
                    ctx.fillStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.arc(cell.x, cell.y, 8, 0, 2 * Math.PI);
                    ctx.fill();
                    if (viz.state.showLabels) {
                      ctx.fillStyle = '#000';
                      ctx.font = '13px KaTeX_Main';
                      ctx.fillText(cell.label, cell.x + 15, cell.y - 10);
                    }
                  } else if (dim === 1) {
                    // 1-cell (edge/loop)
                    ctx.strokeStyle = '#27ae60';
                    ctx.lineWidth = 4;
                    if (cell.path === 'loop-left') {
                      ctx.beginPath();
                      ctx.arc(cell.x, cell.y, 35, 0, 2 * Math.PI);
                      ctx.stroke();
                    } else if (cell.path === 'loop-right') {
                      ctx.beginPath();
                      ctx.arc(cell.x, cell.y, 35, 0, 2 * Math.PI);
                      ctx.stroke();
                    } else if (cell.path === 'line') {
                      ctx.beginPath();
                      ctx.moveTo(centerX - 120, centerY);
                      ctx.lineTo(centerX + 40, centerY);
                      ctx.stroke();
                    }
                    if (viz.state.showLabels) {
                      ctx.fillStyle = '#000';
                      ctx.font = '13px KaTeX_Main';
                      ctx.fillText(cell.label, cell.x, cell.y - 50);
                    }
                  } else if (dim === 2) {
                    // 2-cell (disk)
                    ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
                    ctx.strokeStyle = '#3498db';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(cell.x, cell.y, cell.r, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.stroke();
                    if (viz.state.showLabels) {
                      ctx.fillStyle = '#000';
                      ctx.font = '14px KaTeX_Main';
                      ctx.fillText(cell.label, cell.x, cell.y + 5);
                    }
                  }
                });
              }

              // Cell count
              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              const c0 = (current.cells[0] || []).length;
              const c1 = (current.cells[1] || []).length;
              const c2 = (current.cells[2] || []).length;
              ctx.fillText(`Cells: c₀ = ${c0}, c₁ = ${c1}, c₂ = ${c2}`, 10, height - 20);
            },
            controls: [
              {
                type: 'select',
                id: 'space',
                label: 'Space',
                options: [
                  { value: 'sphere', label: 'S²' },
                  { value: 'torus', label: 'T²' },
                  { value: 'rp2', label: 'ℝP²' },
                  { value: 'klein', label: 'Klein Bottle' }
                ],
                value: 'torus'
              },
              {
                type: 'slider',
                id: 'skeleton',
                label: 'Skeleton dimension',
                min: 0,
                max: 2,
                step: 1,
                value: 2
              },
              {
                type: 'checkbox',
                id: 'showLabels',
                label: 'Show Labels',
                value: true
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-cw-1',
          question: 'Describe a CW structure for \\(S^1 \\times S^1\\) (torus) with 1 vertex, 2 edges, and 1 face.',
          hint: 'The two edges are the meridian \\(a\\) and longitude \\(b\\). The 2-cell is attached via \\(aba^{-1}b^{-1}\\).',
          solution: `<strong>CW structure for \\(T^2 = S^1 \\times S^1\\):</strong>
          <ul>
            <li><strong>\\(X^0\\):</strong> One 0-cell \\(e^0\\) (base point).</li>
            <li><strong>\\(X^1\\):</strong> Two 1-cells \\(e_a^1, e_b^1\\):
              <ul>
                <li>\\(e_a^1\\): loop attached to \\(e^0\\) at both ends (meridian).</li>
                <li>\\(e_b^1\\): loop attached to \\(e^0\\) at both ends (longitude).</li>
              </ul>
            </li>
            <li><strong>\\(X^2\\):</strong> One 2-cell \\(e^2\\), attached via \\(\\phi: S^1 \\to X^1\\) that traces the path \\(aba^{-1}b^{-1}\\) (commutator—going around both loops and back).</li>
          </ul>
          This gives a CW structure with Euler characteristic \\(\\chi = c_0 - c_1 + c_2 = 1 - 2 + 1 = 0\\). \\(\\square\\)`
        }
      ]
    },
    {
      id: 'cellular-chain',
      title: 'Cellular Chain Complex',
      content: `
        <div class="env-block definition">
          <strong>Definition (Cellular Chain Complex):</strong> For a CW complex \\(X\\), define:
          \\[
          C_n^{\\text{CW}}(X) = H_n(X^n, X^{n-1})
          \\]
          (relative homology of the \\(n\\)-skeleton mod the \\((n-1)\\)-skeleton).

          This is a <strong>free abelian group</strong> with one generator \\([e_\\alpha^n]\\) for each \\(n\\)-cell \\(e_\\alpha^n\\).
        </div>

        <div class="env-block definition">
          <strong>Definition (Cellular Boundary Map):</strong> The boundary map \\(d_n: C_n^{\\text{CW}} \\to C_{n-1}^{\\text{CW}}\\) is defined via the long exact sequence:
          \\[
          H_n(X^n, X^{n-1}) \\xrightarrow{\\partial} H_{n-1}(X^{n-1}) \\to H_{n-1}(X^{n-1}, X^{n-2})
          \\]
          Compose the connecting map \\(\\partial\\) with the quotient map to get \\(d_n\\).

          Explicitly: if \\(e^n\\) is an \\(n\\)-cell with attaching map \\(\\phi: S^{n-1} \\to X^{n-1}\\), then:
          \\[
          d_n(e^n) = \\sum_\\beta d_{\\alpha\\beta} e_\\beta^{n-1}
          \\]
          where \\(d_{\\alpha\\beta}\\) is the <strong>degree</strong> of the composite:
          \\[
          S^{n-1} \\xrightarrow{\\phi_\\alpha} X^{n-1} \\to X^{n-1} / (X^{n-1} \\setminus e_\\beta^{n-1}) \\cong S^{n-1}
          \\]
          (collapse all cells except \\(e_\\beta^{n-1}\\) to get a sphere).
        </div>

        <div class="env-block theorem">
          <strong>Theorem:</strong> \\(d_{n-1} \\circ d_n = 0\\), so \\((C_*^{\\text{CW}}, d)\\) is a chain complex.
        </div>

        <div class="env-block proof">
          <strong>Proof:</strong> This follows from \\(\\partial \\circ \\partial = 0\\) in the long exact sequences of pairs \\((X^n, X^{n-1})\\). Algebraically, it's a consequence of exactness. \\(\\square\\)
        </div>

        <div class="env-block example">
          <strong>Example (\\(S^2\\) with minimal CW structure):</strong>
          <ul>
            <li>\\(C_0^{\\text{CW}} = \\langle e^0 \\rangle \\cong \\mathbb{Z}\\).</li>
            <li>\\(C_1^{\\text{CW}} = 0\\) (no 1-cells).</li>
            <li>\\(C_2^{\\text{CW}} = \\langle e^2 \\rangle \\cong \\mathbb{Z}\\).</li>
          </ul>
          The boundary map \\(d_2(e^2) = 0\\) (attaching map \\(S^1 \\to e^0\\) is constant, degree 0).

          Chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{0} 0 \\to \\mathbb{Z} \\to 0
          \\]
          Homology: \\(H_0 = \\mathbb{Z}\\), \\(H_2 = \\mathbb{Z}\\), else \\(0\\). Matches singular homology!
        </div>

        <div class="env-block example">
          <strong>Example (Torus \\(T^2\\)):</strong>
          CW structure: \\(e^0, e_a^1, e_b^1, e^2\\).
          <ul>
            <li>\\(C_0 = \\mathbb{Z}\\), \\(C_1 = \\mathbb{Z}^2\\), \\(C_2 = \\mathbb{Z}\\).</li>
            <li>\\(d_1(e_a^1) = 0\\), \\(d_1(e_b^1) = 0\\) (both loops attach to \\(e^0\\) at both ends, so boundary is \\(e^0 - e^0 = 0\\)).</li>
            <li>\\(d_2(e^2) = 0\\) (the attaching map \\(S^1 \\to X^1\\) traces \\(aba^{-1}b^{-1}\\), which is a null-homotopic loop in \\(X^1\\), giving degree 0 on each cell).</li>
          </ul>
          Chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z}^2 \\xrightarrow{0} \\mathbb{Z} \\to 0
          \\]
          Homology: \\(H_0 = \\mathbb{Z}\\), \\(H_1 = \\mathbb{Z}^2\\), \\(H_2 = \\mathbb{Z}\\). ✓
        </div>

        <div class="env-block remark">
          <strong>Computational Advantage:</strong> For \\(T^2\\), the cellular complex has 4 generators total. A simplicial complex for \\(T^2\\) might have 18 triangles, 27 edges, 9 vertices—much larger! Cellular homology is extremely efficient.
        </div>
      `,
      visualizations: [
        {
          id: 'cellular-boundary-viz',
          title: 'Cellular Boundary Animator',
          description: 'Watch the boundary map dₙ: Cₙ → Cₙ₋₁ via attaching maps and degrees.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.6,
            setup: (viz) => {
              viz.state = {
                space: 'rp2', // 'sphere', 'torus', 'rp2'
                highlightCell: 'e2',
                showDegree: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const examples = {
                sphere: {
                  name: 'S²',
                  cells: { e0: '0-cell', e2: '2-cell' },
                  boundary: { e2: '0 (constant attaching map)' },
                  diagram: { e0: {x: 150, y: 200}, e2: {x: 450, y: 200, r: 80} }
                },
                torus: {
                  name: 'T²',
                  cells: { e0: '0-cell', ea: '1-cell a', eb: '1-cell b', e2: '2-cell' },
                  boundary: { ea: '0', eb: '0', e2: '0' },
                  diagram: {
                    e0: {x: 100, y: 250},
                    ea: {x: 250, y: 180},
                    eb: {x: 250, y: 320},
                    e2: {x: 450, y: 250, r: 70}
                  }
                },
                rp2: {
                  name: 'ℝP²',
                  cells: { e0: '0-cell', e1: '1-cell', e2: '2-cell' },
                  boundary: { e1: '0', e2: '2·e¹ (degree 2)' },
                  diagram: {
                    e0: {x: 100, y: 250},
                    e1: {x: 280, y: 250},
                    e2: {x: 480, y: 250, r: 70}
                  }
                }
              };

              const current = examples[viz.state.space];

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Cellular Boundary: ${current.name}`, width / 2, 30);

              // Draw cells
              Object.keys(current.diagram).forEach(key => {
                const cell = current.diagram[key];
                const isHighlighted = viz.state.highlightCell === key;

                if (key === 'e0') {
                  ctx.fillStyle = isHighlighted ? '#e74c3c' : '#95a5a6';
                  ctx.beginPath();
                  ctx.arc(cell.x, cell.y, 10, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.fillStyle = '#000';
                  ctx.font = '13px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText('e⁰', cell.x, cell.y + 30);
                } else if (key.startsWith('e1') || key === 'ea' || key === 'eb') {
                  ctx.strokeStyle = isHighlighted ? '#27ae60' : '#95a5a6';
                  ctx.lineWidth = isHighlighted ? 5 : 3;
                  ctx.beginPath();
                  if (viz.state.space === 'torus') {
                    ctx.arc(cell.x, cell.y, 40, 0, 2 * Math.PI);
                  } else {
                    const e0 = current.diagram.e0;
                    ctx.moveTo(e0.x + 20, e0.y);
                    ctx.lineTo(cell.x - 20, cell.y);
                  }
                  ctx.stroke();
                  ctx.fillStyle = '#000';
                  ctx.font = '13px KaTeX_Main';
                  ctx.textAlign = 'center';
                  const label = key === 'ea' ? 'eₐ¹' : key === 'eb' ? 'eᵦ¹' : 'e¹';
                  ctx.fillText(label, cell.x, cell.y - 50);
                } else if (key === 'e2') {
                  ctx.fillStyle = isHighlighted ? 'rgba(52, 152, 219, 0.5)' : 'rgba(149, 165, 166, 0.3)';
                  ctx.strokeStyle = isHighlighted ? '#3498db' : '#95a5a6';
                  ctx.lineWidth = isHighlighted ? 4 : 2;
                  ctx.beginPath();
                  ctx.arc(cell.x, cell.y, cell.r, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.stroke();
                  ctx.fillStyle = '#000';
                  ctx.font = '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText('e²', cell.x, cell.y + 5);
                }
              });

              // Show boundary computation
              if (viz.state.showDegree && viz.state.highlightCell === 'e2') {
                const boundaryText = current.boundary.e2;
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 15px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText(`d₂(e²) = ${boundaryText}`, 20, height - 60);

                if (viz.state.space === 'rp2') {
                  ctx.font = '13px KaTeX_Main';
                  ctx.fillText('Attaching map: S¹ → ℝP¹ ≃ S¹ is z ↦ z² (degree 2)', 20, height - 35);
                  ctx.fillText('∴ The 2-cell wraps twice around the 1-cell', 20, height - 15);
                }
              }

              // Chain complex
              const chainY = 100;
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Cellular Chain Complex:', width / 2, chainY - 20);

              const terms = viz.state.space === 'torus'
                ? ['C₂ = ℤ', 'C₁ = ℤ²', 'C₀ = ℤ']
                : ['C₂ = ℤ', 'C₁ = ℤ', 'C₀ = ℤ'];

              const spacing = width / (terms.length + 1);
              terms.forEach((term, i) => {
                const x = spacing * (i + 1);
                ctx.fillText(term, x, chainY);

                if (i < terms.length - 1) {
                  ctx.strokeStyle = '#e74c3c';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(x + 40, chainY - 5);
                  ctx.lineTo(x + spacing - 40, chainY - 5);
                  ctx.stroke();
                  ctx.fillStyle = '#e74c3c';
                  ctx.beginPath();
                  ctx.moveTo(x + spacing - 40, chainY - 5);
                  ctx.lineTo(x + spacing - 50, chainY - 10);
                  ctx.lineTo(x + spacing - 50, chainY);
                  ctx.closePath();
                  ctx.fill();
                  ctx.fillStyle = '#000';
                  ctx.fillText(`d${2 - i}`, (x + x + spacing) / 2, chainY + 20);
                }
              });
            },
            controls: [
              {
                type: 'select',
                id: 'space',
                label: 'Space',
                options: [
                  { value: 'sphere', label: 'S²' },
                  { value: 'torus', label: 'T²' },
                  { value: 'rp2', label: 'ℝP²' }
                ],
                value: 'rp2'
              },
              {
                type: 'select',
                id: 'highlightCell',
                label: 'Highlight Cell',
                options: [
                  { value: 'e0', label: 'e⁰' },
                  { value: 'e1', label: 'e¹' },
                  { value: 'e2', label: 'e²' }
                ],
                value: 'e2'
              },
              {
                type: 'checkbox',
                id: 'showDegree',
                label: 'Show Degree Calculation',
                value: true
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-cellular-1',
          question: 'Compute the cellular chain complex for \\(S^1\\) with CW structure: one 0-cell, one 1-cell.',
          hint: 'The 1-cell attaches to the 0-cell at both ends. What is \\(d_1(e^1)\\)?',
          solution: `CW structure: \\(e^0, e^1\\).
          <ul>
            <li>\\(C_0 = \\langle e^0 \\rangle \\cong \\mathbb{Z}\\).</li>
            <li>\\(C_1 = \\langle e^1 \\rangle \\cong \\mathbb{Z}\\).</li>
          </ul>
          The attaching map \\(\\phi: \\partial D^1 = \\{0, 1\\} \\to e^0\\) sends both endpoints to the same point, so:
          \\[
          d_1(e^1) = 1 \\cdot e^0 - 1 \\cdot e^0 = 0
          \\]
          Chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\to 0
          \\]
          Homology: \\(H_0 = \\mathbb{Z}\\), \\(H_1 = \\mathbb{Z}\\). \\(\\square\\)`
        },
        {
          id: 'ex-cellular-2',
          question: 'For \\(\\mathbb{R}P^2\\) with cells \\(e^0, e^1, e^2\\), compute \\(d_2(e^2)\\) given that the attaching map \\(S^1 \\to \\mathbb{R}P^1\\) has degree 2.',
          hint: 'The degree is the coefficient in the cellular boundary.',
          solution: `The attaching map for \\(e^2\\) is \\(\\phi: S^1 \\to \\mathbb{R}P^1 \\cong S^1\\), the quotient map identifying antipodal points. This has degree 2 (wraps around twice).

          Thus:
          \\[
          d_2(e^2) = 2 \\cdot e^1
          \\]
          Cellular chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{d_2 = \\times 2} \\mathbb{Z} \\xrightarrow{d_1 = 0} \\mathbb{Z} \\to 0
          \\]
          Homology:
          <ul>
            <li>\\(H_0 = \\mathbb{Z}\\) (connected).</li>
            <li>\\(H_1 = \\mathbb{Z} / 2\\mathbb{Z}\\) (kernel of \\(d_1\\) mod image of \\(d_2\\)).</li>
            <li>\\(H_2 = 0\\) (\\(d_2\\) is injective after tensoring with \\(\\mathbb{Q}\\), but has cokernel \\(\\mathbb{Z}/2\\) in \\(H_1\\)).</li>
          </ul>
          Result: \\(H_*(\\mathbb{R}P^2) = (\\mathbb{Z}, \\mathbb{Z}/2, 0)\\). \\(\\square\\)`
        }
      ]
    },
    {
      id: 'cellular-equals-singular',
      title: 'Cellular = Singular Homology',
      content: `
        <div class="env-block theorem">
          <strong>Main Theorem (Cellular Homology):</strong> For any CW complex \\(X\\):
          \\[
          H_n(X) \\cong H_n(C_*^{\\text{CW}}(X))
          \\]
          That is, singular homology of \\(X\\) equals the homology of the cellular chain complex.
        </div>

        <div class="env-block proof">
          <strong>Proof Outline:</strong>
          <ol>
            <li><strong>Step 1 (Relative homology):</strong> We have \\(C_n^{\\text{CW}} = H_n(X^n, X^{n-1})\\). The long exact sequence of the pair \\((X^n, X^{n-1})\\) gives:
            \\[
            \\cdots \\to H_n(X^{n-1}) \\to H_n(X^n) \\to H_n(X^n, X^{n-1}) \\xrightarrow{\\partial} H_{n-1}(X^{n-1}) \\to \\cdots
            \\]
            </li>

            <li><strong>Step 2 (Cellular boundary):</strong> The cellular boundary \\(d_n: C_n^{\\text{CW}} \\to C_{n-1}^{\\text{CW}}\\) is precisely the connecting map \\(\\partial\\) composed with the quotient to \\(H_{n-1}(X^{n-1}, X^{n-2})\\).</li>

            <li><strong>Step 3 (Induction on skeleton):</strong> For \\(X\\) finite-dimensional (say \\(X = X^N\\)), we have:
            \\[
            H_n(X) = H_n(X^N) = \\cdots = H_n(X^n)
            \\]
            (since attaching higher cells doesn't affect lower homology).

            By induction and the long exact sequences, we can show:
            \\[
            H_n(X) \\cong \\frac{\\ker(d_n: C_n^{\\text{CW}} \\to C_{n-1}^{\\text{CW}})}{\\text{im}(d_{n+1}: C_{n+1}^{\\text{CW}} \\to C_n^{\\text{CW}})}
            \\]
            </li>

            <li><strong>Step 4 (Infinite-dimensional case):</strong> For infinite CW complexes, take the direct limit over finite subcomplexes. \\(\\square\\)</li>
          </ol>
        </div>

        <div class="env-block remark">
          <strong>Why is this powerful?</strong> Cellular homology reduces computations to linear algebra over \\(\\mathbb{Z}\\) on a <em>finite</em> or countable set of generators (one per cell), rather than the uncountably many singular simplices.
        </div>

        <div class="env-block example">
          <strong>Example (\\(\\mathbb{C}P^2\\) - Complex Projective Plane):</strong>
          CW structure: \\(\\mathbb{C}P^2 = e^0 \\cup e^2 \\cup e^4\\) (one cell in dimensions 0, 2, 4).

          Cellular chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\to 0
          \\]
          (all boundary maps are zero by degree considerations).

          Homology:
          \\[
          H_k(\\mathbb{C}P^2) = \\begin{cases}
          \\mathbb{Z} & k = 0, 2, 4 \\\\
          0 & \\text{else}
          \\end{cases}
          \\]
          Super easy computation!
        </div>
      `,
      visualizations: [
        {
          id: 'cellular-singular-comparison',
          title: 'Cellular vs Singular Homology Comparison',
          description: 'See that both methods give the same answer.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.8,
            setup: (viz) => {
              viz.state = {
                space: 'rp2'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const examples = {
                sphere: { name: 'S²', cells: '1+0+1=2', H0: 'ℤ', H1: '0', H2: 'ℤ' },
                torus: { name: 'T²', cells: '1+2+1=4', H0: 'ℤ', H1: 'ℤ²', H2: 'ℤ' },
                rp2: { name: 'ℝP²', cells: '1+1+1=3', H0: 'ℤ', H1: 'ℤ/2', H2: '0' },
                cp2: { name: 'ℂP²', cells: '1+0+1+0+1=3', H0: 'ℤ', H2: 'ℤ', H4: 'ℤ' }
              };

              const current = examples[viz.state.space];

              const leftX = width * 0.25;
              const rightX = width * 0.75;
              const centerY = height / 2;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Space: ${current.name}`, width / 2, 30);

              // Cellular side
              ctx.fillStyle = '#3498db';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.fillText('Cellular Homology', leftX, 70);

              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              const leftStart = leftX - 80;
              ctx.fillText(`Total cells: ${current.cells}`, leftStart, 100);
              ctx.fillText('One generator per cell', leftStart, 120);
              ctx.fillText('Compute degree of attaching maps', leftStart, 140);
              ctx.fillText('⟹ Small chain complex', leftStart, 160);

              // Chain complex boxes
              const boxY = 190;
              ['C₂', 'C₁', 'C₀'].forEach((label, i) => {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                const y = boxY + i * 50;
                ctx.strokeRect(leftStart, y, 120, 35);
                ctx.fillStyle = '#000';
                ctx.textAlign = 'center';
                ctx.fillText(label, leftStart + 60, y + 22);
              });

              // Results
              ctx.fillStyle = '#27ae60';
              ctx.font = 'bold 14px KaTeX_Main';
              ctx.textAlign = 'left';
              const resY = boxY + 170;
              ctx.fillText('Results:', leftStart, resY);
              ctx.font = '13px KaTeX_Main';
              ctx.fillText(`H₀ = ${current.H0}`, leftStart, resY + 20);
              ctx.fillText(`H₁ = ${current.H1}`, leftStart, resY + 40);
              if (current.H2) ctx.fillText(`H₂ = ${current.H2}`, leftStart, resY + 60);
              if (current.H4) ctx.fillText(`H₄ = ${current.H4}`, leftStart, resY + 80);

              // Singular side
              ctx.fillStyle = '#9b59b6';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Singular Homology', rightX, 70);

              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              const rightStart = rightX - 80;
              ctx.fillText('Infinitely many generators', rightStart, 100);
              ctx.fillText('(all continuous maps Δⁿ → X)', rightStart, 120);
              ctx.fillText('Hard to compute directly', rightStart, 140);
              ctx.fillText('⟹ Need tools like MV, CW', rightStart, 160);

              // Singular complex (schematic)
              const sBoxY = 200;
              ctx.strokeStyle = '#9b59b6';
              ctx.lineWidth = 2;
              ctx.strokeRect(rightStart, sBoxY, 120, 80);
              ctx.fillStyle = '#000';
              ctx.textAlign = 'center';
              ctx.fillText('C₂(X)', rightStart + 60, sBoxY + 25);
              ctx.font = '11px KaTeX_Main';
              ctx.fillText('(free on all', rightStart + 60, sBoxY + 45);
              ctx.fillText('singular 2-simplices)', rightStart + 60, sBoxY + 60);

              // Results (same)
              ctx.fillStyle = '#27ae60';
              ctx.font = 'bold 14px KaTeX_Main';
              ctx.textAlign = 'left';
              ctx.fillText('Results:', rightStart, resY);
              ctx.font = '13px KaTeX_Main';
              ctx.fillText(`H₀ = ${current.H0}`, rightStart, resY + 20);
              ctx.fillText(`H₁ = ${current.H1}`, rightStart, resY + 40);
              if (current.H2) ctx.fillText(`H₂ = ${current.H2}`, rightStart, resY + 60);
              if (current.H4) ctx.fillText(`H₄ = ${current.H4}`, rightStart, resY + 80);

              // Equivalence arrow
              ctx.strokeStyle = '#f39c12';
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.moveTo(leftX + 100, centerY + 80);
              ctx.lineTo(rightX - 100, centerY + 80);
              ctx.stroke();
              ctx.fillStyle = '#f39c12';
              ctx.beginPath();
              ctx.moveTo(rightX - 100, centerY + 80);
              ctx.lineTo(rightX - 115, centerY + 75);
              ctx.lineTo(rightX - 115, centerY + 85);
              ctx.closePath();
              ctx.fill();
              ctx.beginPath();
              ctx.moveTo(leftX + 100, centerY + 80);
              ctx.lineTo(leftX + 115, centerY + 75);
              ctx.lineTo(leftX + 115, centerY + 85);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#000';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('≅', width / 2, centerY + 85);
            },
            controls: [
              {
                type: 'select',
                id: 'space',
                label: 'Space',
                options: [
                  { value: 'sphere', label: 'S²' },
                  { value: 'torus', label: 'T²' },
                  { value: 'rp2', label: 'ℝP²' },
                  { value: 'cp2', label: 'ℂP²' }
                ],
                value: 'rp2'
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-equiv-1',
          question: 'Verify that cellular homology gives \\(H_*(\\mathbb{C}P^2) = (\\mathbb{Z}, 0, \\mathbb{Z}, 0, \\mathbb{Z})\\).',
          hint: 'CW structure: \\(e^0, e^2, e^4\\). All boundary maps are zero.',
          solution: `CW structure: \\(\\mathbb{C}P^2 = e^0 \\cup e^2 \\cup e^4\\).

          Cellular chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{d_4 = 0} 0 \\to \\mathbb{Z} \\xrightarrow{d_2 = 0} 0 \\to \\mathbb{Z} \\to 0
          \\]
          (Boundary maps are zero because there are no adjacent-dimension cells to attach to.)

          Homology:
          <ul>
            <li>\\(H_0 = \\mathbb{Z}\\) (connected).</li>
            <li>\\(H_1 = 0\\) (no 1-cells).</li>
            <li>\\(H_2 = \\mathbb{Z}\\) (kernel of \\(d_2 = 0\\)).</li>
            <li>\\(H_3 = 0\\) (no 3-cells).</li>
            <li>\\(H_4 = \\mathbb{Z}\\) (kernel of \\(d_4 = 0\\)).</li>
          </ul>
          Thus \\(H_*(\\mathbb{C}P^2) = (\\mathbb{Z}, 0, \\mathbb{Z}, 0, \\mathbb{Z})\\). \\(\\square\\)`
        }
      ]
    },
    {
      id: 'examples',
      title: 'Examples: RP², CP², Lens Spaces',
      content: `
        <div class="env-block example">
          <strong>Example 1: Real Projective Plane \\(\\mathbb{R}P^2\\)</strong>

          <strong>CW structure:</strong> \\(e^0 \\cup e^1 \\cup e^2\\).
          <ul>
            <li>\\(C_0 = \\mathbb{Z}\\), \\(C_1 = \\mathbb{Z}\\), \\(C_2 = \\mathbb{Z}\\).</li>
            <li>\\(d_1(e^1) = 0\\) (loop attached at both ends to \\(e^0\\)).</li>
            <li>\\(d_2(e^2) = 2 e^1\\) (attaching map \\(S^1 \\to \\mathbb{R}P^1 \\cong S^1\\) has degree 2).</li>
          </ul>

          Chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{\\times 2} \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\to 0
          \\]

          Homology:
          <ul>
            <li>\\(H_0 = \\mathbb{Z}\\).</li>
            <li>\\(H_1 = \\ker(0) / \\text{im}(\\times 2) = \\mathbb{Z} / 2\\mathbb{Z}\\).</li>
            <li>\\(H_2 = \\ker(\\times 2) = 0\\).</li>
          </ul>
          Result: \\(H_*(\\mathbb{R}P^2) = (\\mathbb{Z}, \\mathbb{Z}/2, 0)\\).
        </div>

        <div class="env-block example">
          <strong>Example 2: Real Projective Space \\(\\mathbb{R}P^n\\)</strong>

          <strong>CW structure:</strong> \\(e^0 \\cup e^1 \\cup \\cdots \\cup e^n\\) (one cell per dimension).

          Cellular chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{d_n} \\mathbb{Z} \\xrightarrow{d_{n-1}} \\cdots \\xrightarrow{d_1} \\mathbb{Z} \\to 0
          \\]
          where:
          \\[
          d_k = \\begin{cases}
          0 & k \\text{ odd} \\\\
          \\times 2 & k \\text{ even}
          \\end{cases}
          \\]
          (Each even-dimensional cell wraps twice around the previous cell.)

          <strong>Homology:</strong>
          <ul>
            <li>\\(H_0(\\mathbb{R}P^n) = \\mathbb{Z}\\).</li>
            <li>\\(H_k(\\mathbb{R}P^n) = \\mathbb{Z}/2\\) for \\(0 < k < n\\), \\(k\\) odd.</li>
            <li>\\(H_n(\\mathbb{R}P^n) = \\mathbb{Z}\\) if \\(n\\) odd, \\(0\\) if \\(n\\) even.</li>
          </ul>

          Example: \\(H_*(\\mathbb{R}P^3) = (\\mathbb{Z}, \\mathbb{Z}/2, 0, \\mathbb{Z})\\).
        </div>

        <div class="env-block example">
          <strong>Example 3: Complex Projective Space \\(\\mathbb{C}P^n\\)</strong>

          <strong>CW structure:</strong> \\(e^0 \\cup e^2 \\cup e^4 \\cup \\cdots \\cup e^{2n}\\) (one cell in each even dimension).

          All boundary maps are zero (no adjacent-dimension cells).

          Chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{0} \\cdots \\xrightarrow{0} \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\to 0
          \\]

          Homology:
          \\[
          H_k(\\mathbb{C}P^n) = \\begin{cases}
          \\mathbb{Z} & k = 0, 2, 4, \\ldots, 2n \\\\
          0 & \\text{else}
          \\end{cases}
          \\]
          Super clean! \\(\\mathbb{C}P^n\\) has no torsion.
        </div>

        <div class="env-block example">
          <strong>Example 4: Lens Space \\(L(p, q)\\)</strong>

          A <strong>lens space</strong> \\(L(p, q)\\) is a 3-manifold obtained by gluing two solid tori with a twist. For \\(p, q\\) coprime:

          <strong>CW structure:</strong> \\(e^0 \\cup e^1 \\cup e^2 \\cup e^3\\) (4 cells total).

          Cellular chain complex (for \\(L(p, 1)\\)):
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{\\times p} \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\to 0
          \\]

          Homology:
          <ul>
            <li>\\(H_0(L(p, q)) = \\mathbb{Z}\\).</li>
            <li>\\(H_1(L(p, q)) = \\mathbb{Z}/p\\).</li>
            <li>\\(H_2(L(p, q)) = 0\\).</li>
            <li>\\(H_3(L(p, q)) = \\mathbb{Z}\\) (3-manifold, orientable).</li>
          </ul>

          Example: \\(L(5, 1)\\) has \\(H_1 = \\mathbb{Z}/5\\). Lens spaces are distinguished by their fundamental group and homology.
        </div>

        <div class="env-block remark">
          <strong>Summary:</strong> Cellular homology makes computing \\(H_*(X)\\) for CW complexes extremely efficient:
          <ul>
            <li>\\(\\mathbb{R}P^n\\): uses \\(n+1\\) cells.</li>
            <li>\\(\\mathbb{C}P^n\\): uses \\(n+1\\) cells (even dimensions only).</li>
            <li>Lens spaces: 4 cells for all \\(L(p, q)\\).</li>
          </ul>
          Compare this to simplicial complexes, which need many more simplices!
        </div>
      `,
      visualizations: [
        {
          id: 'projective-builder',
          title: 'Projective Space Builder',
          description: 'Build ℝPⁿ and ℂPⁿ and see their cellular homology.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                type: 'real', // 'real', 'complex'
                dimension: 2,
                showHomology: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const centerX = width / 2;
              const isReal = viz.state.type === 'real';
              const n = viz.state.dimension;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              const spaceName = isReal ? `ℝP${n}` : `ℂP${n}`;
              ctx.fillText(`Cellular Structure: ${spaceName}`, centerX, 30);

              // Draw cells
              const cellY = 100;
              const cellSpacing = 100;

              if (isReal) {
                // ℝPⁿ: cells in all dimensions 0 to n
                for (let k = 0; k <= n; k++) {
                  const x = 50 + k * cellSpacing;
                  const y = cellY;

                  // Cell
                  const colors = ['#e74c3c', '#27ae60', '#3498db', '#9b59b6'];
                  ctx.fillStyle = colors[k % colors.length] + '40';
                  ctx.strokeStyle = colors[k % colors.length];
                  ctx.lineWidth = 3;
                  const size = 30 + k * 10;
                  ctx.beginPath();
                  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.stroke();

                  // Label
                  ctx.fillStyle = '#000';
                  ctx.font = '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(`e${k}`, x, y + 5);

                  // Boundary arrow
                  if (k > 0) {
                    const prevX = 50 + (k - 1) * cellSpacing;
                    ctx.strokeStyle = '#e74c3c';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.moveTo(prevX + 30, cellY);
                    ctx.lineTo(x - 30, cellY);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Degree label
                    ctx.fillStyle = '#e74c3c';
                    ctx.font = '12px KaTeX_Main';
                    const deg = k % 2 === 0 ? '×2' : '0';
                    ctx.fillText(deg, (prevX + x) / 2, cellY - 10);
                  }
                }
              } else {
                // ℂPⁿ: cells in even dimensions 0, 2, 4, ..., 2n
                for (let k = 0; k <= n; k++) {
                  const dim = 2 * k;
                  const x = 50 + k * cellSpacing;
                  const y = cellY;

                  const colors = ['#e74c3c', '#3498db', '#f39c12', '#9b59b6'];
                  ctx.fillStyle = colors[k % colors.length] + '40';
                  ctx.strokeStyle = colors[k % colors.length];
                  ctx.lineWidth = 3;
                  const size = 30 + k * 12;
                  ctx.beginPath();
                  ctx.arc(x, y, size / 2, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.stroke();

                  ctx.fillStyle = '#000';
                  ctx.font = '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(`e${dim}`, x, y + 5);

                  if (k > 0) {
                    const prevX = 50 + (k - 1) * cellSpacing;
                    ctx.strokeStyle = '#27ae60';
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 5]);
                    ctx.beginPath();
                    ctx.moveTo(prevX + 35, cellY);
                    ctx.lineTo(x - 35, cellY);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.fillStyle = '#27ae60';
                    ctx.font = '12px KaTeX_Main';
                    ctx.fillText('0', (prevX + x) / 2, cellY - 10);
                  }
                }
              }

              // Homology results
              if (viz.state.showHomology) {
                const resY = cellY + 120;
                ctx.fillStyle = '#000';
                ctx.font = 'bold 15px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText('Homology Groups:', 20, resY);

                ctx.font = '13px KaTeX_Main';
                if (isReal) {
                  ctx.fillText(`H₀ = ℤ`, 40, resY + 25);
                  for (let k = 1; k < n; k++) {
                    if (k % 2 === 1) {
                      ctx.fillText(`H${k} = ℤ/2`, 40, resY + 25 + k * 20);
                    } else {
                      ctx.fillText(`H${k} = 0`, 40, resY + 25 + k * 20);
                    }
                  }
                  const Hn = n % 2 === 1 ? 'ℤ' : '0';
                  ctx.fillText(`H${n} = ${Hn}`, 40, resY + 25 + n * 20);
                } else {
                  for (let k = 0; k <= n; k++) {
                    const dim = 2 * k;
                    ctx.fillText(`H${dim} = ℤ`, 40, resY + 25 + k * 20);
                  }
                  ctx.fillText('(all other Hₖ = 0)', 40, resY + 25 + (n + 1) * 20);
                }
              }

              // Info
              ctx.fillStyle = '#555';
              ctx.font = '12px KaTeX_Main';
              ctx.textAlign = 'center';
              const info = isReal
                ? 'ℝPⁿ has one cell per dimension, boundary degrees alternate 0, 2'
                : 'ℂPⁿ has cells in even dimensions only, all boundaries zero';
              ctx.fillText(info, centerX, height - 15);
            },
            controls: [
              {
                type: 'select',
                id: 'type',
                label: 'Projective Space',
                options: [
                  { value: 'real', label: 'Real (ℝPⁿ)' },
                  { value: 'complex', label: 'Complex (ℂPⁿ)' }
                ],
                value: 'real'
              },
              {
                type: 'slider',
                id: 'dimension',
                label: 'Dimension n',
                min: 1,
                max: 3,
                step: 1,
                value: 2
              },
              {
                type: 'checkbox',
                id: 'showHomology',
                label: 'Show Homology',
                value: true
              }
            ]
          }
        },
        {
          id: 'degree-calculator',
          title: 'Attaching Map Degree Calculator',
          description: 'Compute deg(φ: Sⁿ → Sⁿ) for attaching maps.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.4,
            setup: (viz) => {
              viz.state = {
                mapType: 'antipodal', // 'identity', 'antipodal', 'double', 'constant'
                dimension: 1
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const maps = {
                identity: { name: 'Identity: z ↦ z', degree: 1, description: 'Preserves orientation' },
                antipodal: { name: 'Antipodal: z ↦ -z', degree: -1, description: 'Reverses orientation (reflection)' },
                double: { name: 'Double cover: z ↦ z²', degree: 2, description: 'Wraps twice around (ℝP¹ quotient)' },
                constant: { name: 'Constant: z ↦ 1', degree: 0, description: 'Collapses to a point' }
              };

              const current = maps[viz.state.mapType];
              const n = viz.state.dimension;

              const centerX = width / 2;
              const centerY = height / 2;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Degree of φ: S${n} → S${n}`, centerX, 30);

              // Draw domain and codomain
              const leftX = centerX - 150;
              const rightX = centerX + 150;
              const radius = 60;

              // Domain
              ctx.strokeStyle = '#3498db';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(leftX, centerY, radius, 0, 2 * Math.PI);
              ctx.stroke();
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.fillText(`S${n}`, leftX, centerY - radius - 15);
              ctx.fillText('(domain)', leftX, centerY - radius - 0);

              // Codomain
              ctx.strokeStyle = '#e74c3c';
              ctx.beginPath();
              ctx.arc(rightX, centerY, radius, 0, 2 * Math.PI);
              ctx.stroke();
              ctx.fillText(`S${n}`, rightX, centerY - radius - 15);
              ctx.fillText('(codomain)', rightX, centerY - radius - 0);

              // Arrow
              ctx.strokeStyle = '#9b59b6';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(leftX + radius, centerY);
              ctx.lineTo(rightX - radius, centerY);
              ctx.stroke();
              ctx.fillStyle = '#9b59b6';
              ctx.beginPath();
              ctx.moveTo(rightX - radius, centerY);
              ctx.lineTo(rightX - radius - 10, centerY - 5);
              ctx.lineTo(rightX - radius - 10, centerY + 5);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('φ', centerX, centerY - 10);

              // Map info
              const infoY = height - 120;
              ctx.fillStyle = '#000';
              ctx.font = 'bold 15px KaTeX_Main';
              ctx.fillText(current.name, centerX, infoY);
              ctx.font = '13px KaTeX_Main';
              ctx.fillText(current.description, centerX, infoY + 25);

              // Degree box
              ctx.strokeStyle = '#27ae60';
              ctx.lineWidth = 4;
              ctx.strokeRect(centerX - 80, infoY + 45, 160, 50);
              ctx.fillStyle = '#27ae60';
              ctx.font = 'bold 20px KaTeX_Main';
              ctx.fillText(`deg(φ) = ${current.degree}`, centerX, infoY + 75);
            },
            controls: [
              {
                type: 'select',
                id: 'mapType',
                label: 'Map Type',
                options: [
                  { value: 'identity', label: 'Identity' },
                  { value: 'antipodal', label: 'Antipodal' },
                  { value: 'double', label: 'Double Cover' },
                  { value: 'constant', label: 'Constant' }
                ],
                value: 'antipodal'
              },
              {
                type: 'slider',
                id: 'dimension',
                label: 'Dimension n',
                min: 1,
                max: 3,
                step: 1,
                value: 1
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-rp3',
          question: 'Compute \\(H_*(\\mathbb{R}P^3)\\) using cellular homology.',
          hint: 'CW structure: \\(e^0, e^1, e^2, e^3\\). Boundary maps: \\(d_1 = 0\\), \\(d_2 = \\times 2\\), \\(d_3 = 0\\).',
          solution: `CW structure: \\(\\mathbb{R}P^3 = e^0 \\cup e^1 \\cup e^2 \\cup e^3\\).

          Cellular chain complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\xrightarrow{\\times 2} \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z} \\to 0
          \\]

          Homology:
          <ul>
            <li>\\(H_0 = \\mathbb{Z}\\).</li>
            <li>\\(H_1 = \\ker(\\times 2) / \\text{im}(0) = 0 / 0 = ... \\) wait, let me recalculate. Actually, \\(H_1 = \\ker(d_1) / \\text{im}(d_2) = \\mathbb{Z} / 2\\mathbb{Z}\\).</li>
            <li>\\(H_2 = \\ker(d_2) / \\text{im}(d_3) = 0 / 0 = 0\\).</li>
            <li>\\(H_3 = \\ker(d_3) / 0 = \\mathbb{Z}\\).</li>
          </ul>

          Result: \\(H_*(\\mathbb{R}P^3) = (\\mathbb{Z}, \\mathbb{Z}/2, 0, \\mathbb{Z})\\). \\(\\square\\)`
        },
        {
          id: 'ex-cp1',
          question: 'Show that \\(\\mathbb{C}P^1 \\cong S^2\\) by comparing their homology.',
          hint: 'Both have the same cellular structure: \\(e^0 \\cup e^2\\).',
          solution: `<strong>\\(\\mathbb{C}P^1\\):</strong> CW structure \\(e^0 \\cup e^2\\). Cellular chain:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{0} 0 \\to \\mathbb{Z} \\to 0
          \\]
          Homology: \\(H_0 = \\mathbb{Z}\\), \\(H_2 = \\mathbb{Z}\\), else \\(0\\).

          <strong>\\(S^2\\):</strong> Minimal CW structure \\(e^0 \\cup e^2\\), same complex, same homology.

          Since both have the same CW structure and both are simply connected (\\(\\pi_1 = 0\\)), they are homotopy equivalent. In fact, \\(\\mathbb{C}P^1 \\cong S^2\\) as manifolds (Riemann sphere). \\(\\square\\)`
        },
        {
          id: 'ex-lens',
          question: 'For lens space \\(L(5, 1)\\), verify \\(H_1(L(5, 1)) = \\mathbb{Z}/5\\).',
          hint: 'Cellular chain: \\(\\mathbb{Z} \\xrightarrow{\\times 5} \\mathbb{Z} \\xrightarrow{0} \\mathbb{Z}\\).',
          solution: `Cellular chain complex for \\(L(5, 1)\\):
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{d_3 = ?} \\mathbb{Z} \\xrightarrow{d_2 = \\times 5} \\mathbb{Z} \\xrightarrow{d_1 = 0} \\mathbb{Z} \\to 0
          \\]
          (The degree 5 comes from the twisting parameter in the gluing of solid tori.)

          Homology:
          <ul>
            <li>\\(H_0 = \\mathbb{Z}\\).</li>
            <li>\\(H_1 = \\ker(d_1) / \\text{im}(d_2) = \\mathbb{Z} / 5\\mathbb{Z}\\).</li>
            <li>\\(H_2 = \\ker(d_2) / \\text{im}(d_3) = 0\\) (assuming \\(d_3\\) surjective).</li>
            <li>\\(H_3 = \\mathbb{Z}\\) (3-manifold, orientable).</li>
          </ul>

          Result: \\(H_1(L(5, 1)) = \\mathbb{Z}/5\\). \\(\\square\\)`
        }
      ]
    }
  ]
});
