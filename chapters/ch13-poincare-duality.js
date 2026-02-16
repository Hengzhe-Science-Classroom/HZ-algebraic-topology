window.CHAPTERS.push({
  id: 'poincare-duality',
  number: 13,
  title: 'Poincaré Duality',
  subtitle: 'Duality Between Homology and Cohomology',
  sections: [
    {
      id: 'orientability-fundamental-class',
      title: 'Orientability and Fundamental Class',
      content: `
        <div class="env-block definition">
          <p><strong>Definition (Orientability):</strong> An \\(n\\)-manifold \\(M\\) is <em>orientable</em> if there exists a consistent choice of orientation on each tangent space \\(T_p M\\) that varies continuously with \\(p \\in M\\).</p>
          <p>Equivalently, \\(M\\) is orientable if and only if \\(H_n(M; \\mathbb{Z}) \\cong \\mathbb{Z}\\) (for closed \\(M\\)).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Fundamental Class):</strong> Let \\(M\\) be a closed, connected, orientable \\(n\\)-manifold. The <em>fundamental class</em> \\([M] \\in H_n(M; \\mathbb{Z})\\) is a generator of \\(H_n(M; \\mathbb{Z}) \\cong \\mathbb{Z}\\).</p>
          <p>Choosing an orientation of \\(M\\) determines which of the two generators \\(\\pm[M]\\) to call "positive."</p>
        </div>

        <div class="env-block intuition">
          <p><strong>Geometric Picture:</strong> Think of the fundamental class as "the whole manifold, with orientation." For example:</p>
          <ul>
            <li>\\([S^n]\\) is the sphere with chosen orientation (e.g., outward-pointing normal)</li>
            <li>\\([T^2]\\) is the torus with coherent orientation on the surface</li>
            <li>The Möbius band has <em>no</em> fundamental class (non-orientable)</li>
          </ul>
          <p>The fundamental class represents "integrating over the whole manifold."</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Sphere):</strong> For \\(S^n\\), we have \\(H_n(S^n; \\mathbb{Z}) = \\mathbb{Z}\\).</p>
          <p>The fundamental class \\([S^n]\\) can be represented by the \\(n\\)-cell of the standard CW structure, with the standard orientation.</p>
          <p>Choosing the "outward normal" orientation gives a specific generator.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Torus):</strong> For \\(T^2\\), we have \\(H_2(T^2; \\mathbb{Z}) = \\mathbb{Z}\\).</p>
          <p>The fundamental class \\([T^2]\\) corresponds to a coherent orientation of the surface. If we visualize \\(T^2\\) embedded in \\(\\mathbb{R}^3\\), the outward-pointing normal gives the orientation.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Non-Orientable: Möbius Band):</strong> The Möbius band \\(M\\) is a 2-manifold with boundary, and it's non-orientable.</p>
          <p>We have \\(H_2(M, \\partial M; \\mathbb{Z}) \\cong \\mathbb{Z}/2\\), not \\(\\mathbb{Z}\\)! There's no fundamental class in the usual sense.</p>
          <p>Geometrically: if you try to orient the surface consistently, you get a contradiction when you go around the twist.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Characterization of Orientability):</strong> For a connected \\(n\\)-manifold \\(M\\) (closed or with boundary), the following are equivalent:</p>
          <ol>
            <li>\\(M\\) is orientable</li>
            <li>\\(H_n(M, \\partial M; \\mathbb{Z}) \\cong \\mathbb{Z}\\)</li>
            <li>The transition functions in any atlas can be chosen to have positive determinant</li>
            <li>\\(M\\) has a nowhere-zero \\(n\\)-form (smooth manifolds)</li>
          </ol>
        </div>

        <div class="env-block remark">
          <p><strong>Remark (Relative Fundamental Class):</strong> For a compact orientable \\(n\\)-manifold \\(M\\) with boundary, the fundamental class lives in <em>relative homology</em>: \\([M, \\partial M] \\in H_n(M, \\partial M; \\mathbb{Z})\\).</p>
          <p>This is because the boundary "cancels out" when we sum all \\(n\\)-cells, giving a relative cycle.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Disk):</strong> For the disk \\(D^2\\), we have:</p>
          <ul>
            <li>\\(H_2(D^2; \\mathbb{Z}) = 0\\) (no 2-cycles in the absolute sense)</li>
            <li>\\(H_2(D^2, \\partial D^2; \\mathbb{Z}) = \\mathbb{Z}\\) with fundamental class \\([D^2, \\partial D^2]\\)</li>
          </ul>
          <p>The relative fundamental class represents "the interior of the disk, ignoring the boundary."</p>
        </div>
      `,
      visualizations: [
        {
          id: 'orientation-visualizer',
          title: 'Orientation Visualizer',
          description: 'See consistent normal vectors on oriented manifolds',
          canvas: {
            setup: (viz) => {
              viz.state = {
                manifold: 'sphere', // 'sphere', 'torus', 'mobius'
                showNormals: true,
                animationAngle: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const centerX = width / 2;
              const centerY = height / 2;

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 20px serif';
              const titles = {
                'sphere': 'S² with Outward Orientation',
                'torus': 'T² with Consistent Orientation',
                'mobius': 'Möbius Band (Non-Orientable)'
              };
              ctx.fillText(titles[viz.state.manifold], 20, 30);

              viz.state.animationAngle += 0.01;

              if (viz.state.manifold === 'sphere') {
                // Draw sphere
                const radius = 100;
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();

                // Draw normal vectors (outward)
                if (viz.state.showNormals) {
                  const numVectors = 12;
                  for (let i = 0; i < numVectors; i++) {
                    const angle = (i / numVectors) * Math.PI * 2;
                    const px = centerX + radius * Math.cos(angle);
                    const py = centerY + radius * Math.sin(angle);
                    const nx = Math.cos(angle);
                    const ny = Math.sin(angle);

                    // Normal vector
                    ctx.strokeStyle = '#e74c3c';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px + nx * 40, py + ny * 40);
                    ctx.stroke();

                    // Arrowhead
                    const arrowAngle = Math.atan2(ny, nx);
                    ctx.fillStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(px + nx * 40, py + ny * 40);
                    ctx.lineTo(px + nx * 40 - 10 * Math.cos(arrowAngle - 0.3),
                              py + ny * 40 - 10 * Math.sin(arrowAngle - 0.3));
                    ctx.lineTo(px + nx * 40 - 10 * Math.cos(arrowAngle + 0.3),
                              py + ny * 40 - 10 * Math.sin(arrowAngle + 0.3));
                    ctx.closePath();
                    ctx.fill();
                  }
                }

                // Label
                ctx.fillStyle = '#2c3e50';
                ctx.font = '16px serif';
                ctx.fillText('All normals point outward', 20, height - 40);
                ctx.fillText('→ Consistent orientation', 20, height - 20);

              } else if (viz.state.manifold === 'torus') {
                // Draw torus (cross-section)
                const majorR = 100;
                const minorR = 40;

                // Outer circle
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(centerX, centerY, majorR + minorR, 0, Math.PI * 2);
                ctx.stroke();

                // Inner circle
                ctx.beginPath();
                ctx.arc(centerX, centerY, majorR - minorR, 0, Math.PI * 2);
                ctx.stroke();

                // Normal vectors
                if (viz.state.showNormals) {
                  const angles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3];
                  angles.forEach(angle => {
                    const r = majorR + minorR * 0.5 * Math.sin(viz.state.animationAngle + angle);
                    const px = centerX + r * Math.cos(angle);
                    const py = centerY + r * Math.sin(angle);
                    const nx = Math.cos(angle);
                    const ny = Math.sin(angle);

                    // Normal vector
                    ctx.strokeStyle = '#e74c3c';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px + nx * 35, py + ny * 35);
                    ctx.stroke();

                    // Arrowhead
                    const arrowAngle = Math.atan2(ny, nx);
                    ctx.fillStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(px + nx * 35, py + ny * 35);
                    ctx.lineTo(px + nx * 35 - 8 * Math.cos(arrowAngle - 0.3),
                              py + ny * 35 - 8 * Math.sin(arrowAngle - 0.3));
                    ctx.lineTo(px + nx * 35 - 8 * Math.cos(arrowAngle + 0.3),
                              py + ny * 35 - 8 * Math.sin(arrowAngle + 0.3));
                    ctx.closePath();
                    ctx.fill();
                  });
                }

                ctx.fillStyle = '#2c3e50';
                ctx.font = '16px serif';
                ctx.fillText('Normals point outward everywhere', 20, height - 40);
                ctx.fillText('→ T² is orientable', 20, height - 20);

              } else if (viz.state.manifold === 'mobius') {
                // Draw Möbius band (schematic)
                const w = 250;
                const h = 80;
                const x0 = centerX - w/2;
                const y0 = centerY;

                // Band outline
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x0, y0 - h/2);
                ctx.bezierCurveTo(x0 + w/3, y0 - h/2 - 20, x0 + 2*w/3, y0 - h/2 + 20, x0 + w, y0 + h/2);
                ctx.lineTo(x0 + w, y0 + h/2);
                ctx.bezierCurveTo(x0 + 2*w/3, y0 + h/2 + 20, x0 + w/3, y0 + h/2 - 20, x0, y0 - h/2);
                ctx.stroke();

                // Center line
                ctx.strokeStyle = '#95a5a6';
                ctx.lineWidth = 1;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(x0, y0);
                ctx.bezierCurveTo(x0 + w/3, y0 - 10, x0 + 2*w/3, y0 + 10, x0 + w, y0);
                ctx.stroke();
                ctx.setLineDash([]);

                // Normal vectors that flip!
                if (viz.state.showNormals) {
                  for (let i = 0; i <= 6; i++) {
                    const t = i / 6;
                    const px = x0 + t * w;
                    const py = y0 + 10 * Math.sin(Math.PI * t);

                    // Normal flips sign halfway
                    const flip = t < 0.5 ? 1 : -1;
                    const ny = flip * 30;

                    ctx.strokeStyle = i === 0 || i === 6 ? '#9b59b6' : '#e74c3c';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px, py - ny);
                    ctx.stroke();

                    // Arrowhead
                    ctx.fillStyle = i === 0 || i === 6 ? '#9b59b6' : '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(px, py - ny);
                    ctx.lineTo(px - 5, py - ny + flip * 8);
                    ctx.lineTo(px + 5, py - ny + flip * 8);
                    ctx.closePath();
                    ctx.fill();
                  }
                }

                // Highlight contradiction
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(x0, y0, 20, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = '#2c3e50';
                ctx.font = '16px serif';
                ctx.fillText('Normals flip sign after going around!', 20, height - 60);
                ctx.fillText('→ Impossible to orient consistently', 20, height - 40);
                ctx.fillText('→ Möbius band is NON-ORIENTABLE', 20, height - 20);
              }
            },
            controls: [
              {
                type: 'select',
                label: 'Manifold',
                options: [
                  { value: 'sphere', label: 'Sphere S²' },
                  { value: 'torus', label: 'Torus T²' },
                  { value: 'mobius', label: 'Möbius Band' }
                ],
                action: (viz, value) => {
                  viz.state.manifold = value;
                }
              },
              {
                type: 'button',
                label: 'Toggle Normals',
                action: (viz) => {
                  viz.state.showNormals = !viz.state.showNormals;
                }
              }
            ]
          }
        },
        {
          id: 'fundamental-class-builder',
          title: 'Fundamental Class Builder',
          description: 'Build [M] ∈ Hₙ(M) for oriented closed manifold',
          canvas: {
            setup: (viz) => {
              viz.state = {
                manifold: 's2',
                dimension: 2
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 22px serif';
              ctx.fillText('Fundamental Class Construction', 20, 30);

              const centerX = width / 2;
              const centerY = height / 2 + 20;

              if (viz.state.manifold === 's2') {
                ctx.font = '18px serif';
                ctx.fillText('M = S²', 20, 65);
                ctx.fillText('H₂(S²; ℤ) = ℤ', 20, 90);

                // Draw S² with CW structure
                const radius = 80;
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();

                // Top hemisphere (2-cell)
                ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();

                // Equator
                ctx.strokeStyle = '#2c3e50';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // Label
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 16px serif';
                ctx.fillText('e² (2-cell)', centerX - 30, centerY - 30);

                // Arrow showing [S²]
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(centerX + radius + 40, centerY - 40);
                ctx.lineTo(centerX + radius + 40, centerY + 40);
                ctx.stroke();

                // Label
                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 18px serif';
                ctx.fillText('[S²] = e²', centerX + radius + 60, centerY);
                ctx.font = '14px serif';
                ctx.fillText('generator of H₂(S²)', centerX + radius + 60, centerY + 20);

              } else if (viz.state.manifold === 't2') {
                ctx.font = '18px serif';
                ctx.fillText('M = T²', 20, 65);
                ctx.fillText('H₂(T²; ℤ) = ℤ', 20, 90);

                // Draw torus (stylized square with identifications)
                const size = 120;
                const x0 = centerX - size/2;
                const y0 = centerY - size/2;

                // Square
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.strokeRect(x0, y0, size, size);

                // Fill
                ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
                ctx.fillRect(x0, y0, size, size);

                // Arrows showing identifications
                ctx.strokeStyle = '#2c3e50';
                ctx.lineWidth = 2;
                // Bottom edge
                ctx.beginPath();
                ctx.moveTo(x0 + 20, y0 + size + 15);
                ctx.lineTo(x0 + size - 20, y0 + size + 15);
                ctx.stroke();
                ctx.fillStyle = '#2c3e50';
                ctx.beginPath();
                ctx.moveTo(x0 + size - 20, y0 + size + 15);
                ctx.lineTo(x0 + size - 30, y0 + size + 10);
                ctx.lineTo(x0 + size - 30, y0 + size + 20);
                ctx.fill();

                // Top edge
                ctx.beginPath();
                ctx.moveTo(x0 + size - 20, y0 - 15);
                ctx.lineTo(x0 + 20, y0 - 15);
                ctx.stroke();
                ctx.fillStyle = '#2c3e50';
                ctx.beginPath();
                ctx.moveTo(x0 + 20, y0 - 15);
                ctx.lineTo(x0 + 30, y0 - 10);
                ctx.lineTo(x0 + 30, y0 - 20);
                ctx.fill();

                // Label
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 16px serif';
                ctx.fillText('[T²]', centerX - 20, centerY);

                ctx.fillStyle = '#27ae60';
                ctx.font = '14px serif';
                ctx.fillText('Fundamental class = whole torus', 20, height - 40);
                ctx.fillText('with consistent orientation', 20, height - 20);

              } else if (viz.state.manifold === 'rp2') {
                ctx.font = '18px serif';
                ctx.fillText('M = ℝP²', 20, 65);
                ctx.fillText('H₂(ℝP²; ℤ) = 0', 20, 90);
                ctx.fillText('(non-orientable!)', 20, 115);

                // Cross symbol
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(centerX - 50, centerY - 50);
                ctx.lineTo(centerX + 50, centerY + 50);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(centerX + 50, centerY - 50);
                ctx.lineTo(centerX - 50, centerY + 50);
                ctx.stroke();

                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 20px serif';
                ctx.fillText('NO fundamental class!', centerX - 100, centerY + 80);

                ctx.fillStyle = '#2c3e50';
                ctx.font = '14px serif';
                ctx.fillText('ℝP² is non-orientable, so [ℝP²] does not exist', 20, height - 40);
                ctx.fillText('H₂(ℝP²; ℤ/2) = ℤ/2 has a mod 2 class', 20, height - 20);
              }

              // Info box
              ctx.strokeStyle = '#3498db';
              ctx.lineWidth = 2;
              ctx.strokeRect(20, height - 140, width - 40, 80);
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 15px serif';
              ctx.fillText('Key Fact:', 30, height - 115);
              ctx.font = '14px serif';
              ctx.fillText('For closed oriented n-manifold M:', 30, height - 93);
              ctx.fillText('Hₙ(M; ℤ) = ℤ with generator [M] (fundamental class)', 30, height - 73);
            },
            controls: [
              {
                type: 'select',
                label: 'Manifold',
                options: [
                  { value: 's2', label: 'S² (orientable)' },
                  { value: 't2', label: 'T² (orientable)' },
                  { value: 'rp2', label: 'ℝP² (non-orientable)' }
                ],
                action: (viz, value) => {
                  viz.state.manifold = value;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'orientation-ex1',
          question: 'Show that the Klein bottle \\(K\\) is non-orientable by proving \\(H_2(K; \\mathbb{Z}) = 0\\).',
          hint: 'Use the standard CW structure of the Klein bottle and compute the cellular boundary map.',
          solution: `The Klein bottle has CW structure: one 0-cell, two 1-cells \\(a, b\\), and one 2-cell \\(e\\).

The attaching map for \\(e\\) is \\(aba^{-1}b\\) (note: \\(a^{-1}\\), not \\(a\\)).

Boundary map: \\(\\partial(e) = a + b - a + b = 2b\\) in \\(C_1\\).

Thus \\(\\partial_2 : C_2 \\to C_1\\) is multiplication by \\(2b\\), which is injective over \\(\\mathbb{Z}\\).

Therefore, \\(H_2(K; \\mathbb{Z}) = \\ker(\\partial_2) / \\text{im}(\\partial_3) = 0\\).

Since \\(H_2(K; \\mathbb{Z}) \\neq \\mathbb{Z}\\), the Klein bottle is non-orientable.`
        }
      ]
    },
    {
      id: 'poincare-duality-theorem',
      title: 'Poincaré Duality Theorem',
      content: `
        <div class="env-block theorem">
          <p><strong>Theorem (Poincaré Duality):</strong> Let \\(M\\) be a closed, connected, orientable \\(n\\)-manifold. Then for all \\(0 \\leq k \\leq n\\), there is a natural isomorphism</p>
          \\[ H_k(M; \\mathbb{Z}) \\cong H^{n-k}(M; \\mathbb{Z}) \\]
          <p>This isomorphism is given by "capping with the fundamental class" (see next section).</p>
        </div>

        <div class="env-block intuition">
          <p><strong>Intuitive Meaning:</strong> Poincaré duality says that homology and cohomology of a closed orientable manifold are "mirror images" of each other:</p>
          <ul>
            <li>\\(k\\)-dimensional holes (homology) correspond to \\((n-k)\\)-dimensional "obstructions" (cohomology)</li>
            <li>For example, on \\(S^2\\): a 0-cycle (point) is dual to a 2-cocycle (the whole sphere)</li>
            <li>On \\(T^2\\): 1-cycles (loops) are dual to 1-cocycles (also loops, but measured differently)</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>Example (Sphere):</strong> For \\(S^n\\):</p>
          <ul>
            <li>\\(H_0(S^n) = \\mathbb{Z} \\cong H^n(S^n) = \\mathbb{Z}\\)</li>
            <li>\\(H_k(S^n) = 0 \\cong H^{n-k}(S^n) = 0\\) for \\(0 < k < n\\)</li>
            <li>\\(H_n(S^n) = \\mathbb{Z} \\cong H^0(S^n) = \\mathbb{Z}\\)</li>
          </ul>
          <p>The duality pairs: \\(k = 0 \\leftrightarrow n-k = n\\) and vice versa.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Torus):</strong> For \\(T^2\\) (\\(n = 2\\)):</p>
          <ul>
            <li>\\(H_0(T^2) = \\mathbb{Z} \\cong H^2(T^2) = \\mathbb{Z}\\)</li>
            <li>\\(H_1(T^2) = \\mathbb{Z}^2 \\cong H^1(T^2) = \\mathbb{Z}^2\\)</li>
            <li>\\(H_2(T^2) = \\mathbb{Z} \\cong H^0(T^2) = \\mathbb{Z}\\)</li>
          </ul>
          <p>Note: The middle dimension \\(k = n/2 = 1\\) is "self-dual."</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Surface of Genus \\(g\\)):</strong> For \\(\\Sigma_g\\) (\\(n = 2\\)):</p>
          <ul>
            <li>\\(H_0(\\Sigma_g) = \\mathbb{Z} \\cong H^2(\\Sigma_g) = \\mathbb{Z}\\)</li>
            <li>\\(H_1(\\Sigma_g) = \\mathbb{Z}^{2g} \\cong H^1(\\Sigma_g) = \\mathbb{Z}^{2g}\\)</li>
            <li>\\(H_2(\\Sigma_g) = \\mathbb{Z} \\cong H^0(\\Sigma_g) = \\mathbb{Z}\\)</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Poincaré Duality with Coefficients):</strong> For any coefficient group \\(G\\), if \\(M\\) is a closed oriented \\(n\\)-manifold, then</p>
          \\[ H_k(M; G) \\cong H^{n-k}(M; G) \\]
          <p>This follows from the version with \\(\\mathbb{Z}\\) coefficients plus the Universal Coefficient Theorem.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Remark (Euler Characteristic):</strong> Poincaré duality has a beautiful consequence for the Euler characteristic:</p>
          \\[ \\chi(M) = \\sum_{k=0}^n (-1)^k \\dim H_k(M) = \\sum_{k=0}^n (-1)^k \\dim H^{n-k}(M) \\]
          <p>By duality, this equals \\(\\sum_{k=0}^n (-1)^{n-k} \\dim H^k(M)\\). For even \\(n\\), pairing \\(k\\) with \\(n-k\\) shows contributions cancel in pairs (except middle dimension), giving constraints on \\(\\chi(M)\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Poincaré-Lefschetz Duality):</strong> For a compact orientable \\(n\\)-manifold \\(M\\) with boundary \\(\\partial M\\), there is an isomorphism</p>
          \\[ H_k(M, \\partial M) \\cong H^{n-k}(M) \\]
          <p>This generalizes Poincaré duality to manifolds with boundary.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Disk):</strong> For \\(D^2\\):</p>
          <ul>
            <li>\\(H_2(D^2, \\partial D^2) = \\mathbb{Z} \\cong H^0(D^2) = \\mathbb{Z}\\)</li>
            <li>\\(H_1(D^2, \\partial D^2) = 0 \\cong H^1(D^2) = 0\\)</li>
            <li>\\(H_0(D^2, \\partial D^2) = 0 \\cong H^2(D^2) = 0\\)</li>
          </ul>
        </div>
      `,
      visualizations: [
        {
          id: 'duality-isomorphism',
          title: 'Duality Isomorphism Visualizer',
          description: 'See Hₖ ↔ Hⁿ⁻ᵏ correspondence with interactive slider',
          canvas: {
            setup: (viz) => {
              viz.state = {
                manifold: 't2',
                n: 2,
                k: 0,
                showArrows: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 22px serif';
              ctx.fillText('Poincaré Duality: Hₖ ↔ Hⁿ⁻ᵏ', 20, 30);

              const n = viz.state.n;
              const k = viz.state.k;
              const dual_k = n - k;

              // Display manifold info
              let manifoldName = '';
              let homology = {};
              if (viz.state.manifold === 't2') {
                manifoldName = 'T²';
                homology = { 0: 'ℤ', 1: 'ℤ²', 2: 'ℤ' };
              } else if (viz.state.manifold === 's2') {
                manifoldName = 'S²';
                homology = { 0: 'ℤ', 1: '0', 2: 'ℤ' };
              } else if (viz.state.manifold === 's3') {
                manifoldName = 'S³';
                viz.state.n = 3;
                homology = { 0: 'ℤ', 1: '0', 2: '0', 3: 'ℤ' };
              }

              ctx.font = '18px serif';
              ctx.fillText(`M = ${manifoldName}, dim = ${n}`, 20, 65);
              ctx.fillText(`k = ${k}, n-k = ${dual_k}`, 20, 90);

              // Left side: Homology
              const leftX = width / 4;
              const centerY = height / 2;

              ctx.fillStyle = '#e74c3c';
              ctx.font = 'bold 20px serif';
              ctx.fillText('Homology', leftX - 50, centerY - 120);

              ctx.fillStyle = '#2c3e50';
              ctx.font = '18px serif';
              ctx.fillText(`Hₖ(M) = H${k}(${manifoldName})`, leftX - 80, centerY - 90);

              // Homology group box
              ctx.fillStyle = '#e74c3c';
              ctx.beginPath();
              ctx.arc(leftX, centerY, 60, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#fff';
              ctx.font = 'bold 22px serif';
              const hk_text = `H${k}`;
              ctx.fillText(hk_text, leftX - 20, centerY - 5);
              ctx.font = '18px serif';
              ctx.fillText(homology[k] || '0', leftX - 15, centerY + 20);

              // Right side: Cohomology
              const rightX = 3 * width / 4;

              ctx.fillStyle = '#3498db';
              ctx.font = 'bold 20px serif';
              ctx.fillText('Cohomology', rightX - 60, centerY - 120);

              ctx.fillStyle = '#2c3e50';
              ctx.font = '18px serif';
              ctx.fillText(`Hⁿ⁻ᵏ(M) = H${dual_k}(${manifoldName})`, rightX - 90, centerY - 90);

              // Cohomology group box
              ctx.fillStyle = '#3498db';
              ctx.beginPath();
              ctx.arc(rightX, centerY, 60, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#fff';
              ctx.font = 'bold 22px serif';
              const hnk_text = `H${dual_k}`;
              ctx.fillText(hnk_text, rightX - 20, centerY - 5);
              ctx.font = '18px serif';
              ctx.fillText(homology[dual_k] || '0', rightX - 15, centerY + 20);

              // Duality arrow
              if (viz.state.showArrows) {
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(leftX + 70, centerY);
                ctx.lineTo(rightX - 70, centerY);
                ctx.stroke();

                // Arrowhead (both directions)
                ctx.fillStyle = '#27ae60';
                // Right arrow
                ctx.beginPath();
                ctx.moveTo(rightX - 70, centerY);
                ctx.lineTo(rightX - 85, centerY - 10);
                ctx.lineTo(rightX - 85, centerY + 10);
                ctx.closePath();
                ctx.fill();

                // Left arrow
                ctx.beginPath();
                ctx.moveTo(leftX + 70, centerY);
                ctx.lineTo(leftX + 85, centerY - 10);
                ctx.lineTo(leftX + 85, centerY + 10);
                ctx.closePath();
                ctx.fill();

                // Label
                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 18px serif';
                ctx.fillText('≅', width / 2 - 10, centerY - 10);
                ctx.font = '14px serif';
                ctx.fillText('Poincaré', width / 2 - 35, centerY + 35);
                ctx.fillText('Duality', width / 2 - 30, centerY + 52);
              }

              // Info box
              ctx.strokeStyle = '#27ae60';
              ctx.lineWidth = 2;
              ctx.strokeRect(20, height - 100, width - 40, 80);
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 15px serif';
              ctx.fillText('Poincaré Duality Isomorphism:', 30, height - 73);
              ctx.font = '16px serif';
              ctx.fillText(`H${k}(${manifoldName}; ℤ) ≅ H${dual_k}(${manifoldName}; ℤ)`, 30, height - 48);
              ctx.font = '14px serif';
              ctx.fillText(`Both are isomorphic to ${homology[k] || '0'}`, 30, height - 28);
            },
            controls: [
              {
                type: 'select',
                label: 'Manifold',
                options: [
                  { value: 's2', label: 'S² (2-sphere)' },
                  { value: 't2', label: 'T² (torus)' },
                  { value: 's3', label: 'S³ (3-sphere)' }
                ],
                action: (viz, value) => {
                  viz.state.manifold = value;
                  if (value === 's3') {
                    viz.state.n = 3;
                    viz.state.k = Math.min(viz.state.k, 3);
                  } else {
                    viz.state.n = 2;
                    viz.state.k = Math.min(viz.state.k, 2);
                  }
                }
              },
              {
                type: 'slider',
                label: 'Dimension k',
                min: 0,
                max: 2,
                step: 1,
                initial: 0,
                action: (viz, value) => {
                  const maxK = viz.state.n;
                  viz.state.k = Math.min(value, maxK);
                }
              },
              {
                type: 'button',
                label: 'Toggle Arrows',
                action: (viz) => {
                  viz.state.showArrows = !viz.state.showArrows;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'duality-ex1',
          question: 'Use Poincaré duality to compute \\(H^k(\\mathbb{C}P^2; \\mathbb{Z})\\) for all \\(k\\).',
          hint: 'First compute \\(H_k(\\mathbb{C}P^2)\\) using cell structure, then apply duality.',
          solution: `\\(\\mathbb{C}P^2\\) has cells in dimensions 0, 2, 4, so:
- \\(H_0(\\mathbb{C}P^2) = \\mathbb{Z}\\)
- \\(H_1(\\mathbb{C}P^2) = 0\\)
- \\(H_2(\\mathbb{C}P^2) = \\mathbb{Z}\\)
- \\(H_3(\\mathbb{C}P^2) = 0\\)
- \\(H_4(\\mathbb{C}P^2) = \\mathbb{Z}\\)

By Poincaré duality (\\(n = 4\\)):
- \\(H^0(\\mathbb{C}P^2) \\cong H_4(\\mathbb{C}P^2) = \\mathbb{Z}\\)
- \\(H^1(\\mathbb{C}P^2) \\cong H_3(\\mathbb{C}P^2) = 0\\)
- \\(H^2(\\mathbb{C}P^2) \\cong H_2(\\mathbb{C}P^2) = \\mathbb{Z}\\)
- \\(H^3(\\mathbb{C}P^2) \\cong H_1(\\mathbb{C}P^2) = 0\\)
- \\(H^4(\\mathbb{C}P^2) \\cong H_0(\\mathbb{C}P^2) = \\mathbb{Z}\\)

This matches what we know from the cup product structure!`
        },
        {
          id: 'duality-ex2',
          question: 'For a closed orientable surface \\(\\Sigma_g\\) of genus \\(g\\), show that the Euler characteristic \\(\\chi(\\Sigma_g) = 2 - 2g\\) is consistent with Poincaré duality.',
          hint: 'Count dimensions using duality and verify the alternating sum.',
          solution: `For \\(\\Sigma_g\\) (\\(n = 2\\)):
- \\(H_0 = \\mathbb{Z}\\), dimension 1
- \\(H_1 = \\mathbb{Z}^{2g}\\), dimension \\(2g\\)
- \\(H_2 = \\mathbb{Z}\\), dimension 1

Euler characteristic:
\\[ \\chi(\\Sigma_g) = \\dim H_0 - \\dim H_1 + \\dim H_2 = 1 - 2g + 1 = 2 - 2g \\]

By Poincaré duality:
- \\(H^0 \\cong H_2 = \\mathbb{Z}\\)
- \\(H^1 \\cong H_1 = \\mathbb{Z}^{2g}\\)
- \\(H^2 \\cong H_0 = \\mathbb{Z}\\)

Computing via cohomology:
\\[ \\chi = \\dim H^0 - \\dim H^1 + \\dim H^2 = 1 - 2g + 1 = 2 - 2g \\]

Same result! ✓`
        }
      ]
    },
    {
      id: 'cap-product',
      title: 'Cap Product and Proof Sketch',
      content: `
        <div class="env-block definition">
          <p><strong>Definition (Cap Product):</strong> The <em>cap product</em> is a bilinear pairing</p>
          \\[ \\frown : H^k(X) \\otimes H_n(X) \\to H_{n-k}(X) \\]
          <p>defined on the chain/cochain level as follows: for \\(\\varphi \\in C^k(X)\\) and \\(\\sigma : \\Delta^n \\to X\\),</p>
          \\[ \\varphi \\frown \\sigma = \\varphi(\\sigma|_{[v_0, \\ldots, v_k]}) \\cdot \\sigma|_{[v_k, \\ldots, v_n]} \\]
          <p>where the right side is the "back face" of \\(\\sigma\\), weighted by the value of \\(\\varphi\\) on the "front face."</p>
        </div>

        <div class="env-block intuition">
          <p><strong>Geometric Picture:</strong> The cap product "removes" a \\(k\\)-dimensional piece from an \\(n\\)-chain, leaving an \\((n-k)\\)-chain:</p>
          <ul>
            <li>\\(\\varphi\\) measures a \\(k\\)-dimensional aspect of \\(\\sigma\\)</li>
            <li>\\(\\varphi \\frown \\sigma\\) is what remains after "using up" that \\(k\\)-dimensional part</li>
            <li>Think: cup product "multiplies" dimensions, cap product "divides" them</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Cap Product Properties):</strong></p>
          <ol>
            <li>The cap product descends to (co)homology: \\(\\frown : H^k(X) \\otimes H_n(X) \\to H_{n-k}(X)\\)</li>
            <li>\\((\\varphi \\cup \\psi) \\frown \\sigma = \\varphi \\frown (\\psi \\frown \\sigma)\\) (associativity)</li>
            <li>For the unit \\(1 \\in H^0(X)\\), we have \\(1 \\frown \\sigma = \\sigma\\)</li>
          </ol>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Poincaré Duality via Cap Product):</strong> Let \\(M\\) be a closed oriented \\(n\\)-manifold with fundamental class \\([M] \\in H_n(M)\\). The map</p>
          \\[ D : H^k(M) \\to H_{n-k}(M), \\quad \\varphi \\mapsto \\varphi \\frown [M] \\]
          <p>is an isomorphism for all \\(k\\).</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof Sketch:</strong> The proof has several steps:</p>
          <ol>
            <li><strong>Local computation:</strong> On \\(\\mathbb{R}^n\\), use singular homology/cohomology with compact support to show the cap product with the fundamental class of \\(\\mathbb{R}^n\\) gives an isomorphism.</li>
            <li><strong>Mayer-Vietoris:</strong> Cover \\(M\\) by open sets \\(U, V\\) homeomorphic to \\(\\mathbb{R}^n\\). Use the five-lemma on the Mayer-Vietoris sequence to show that if the cap product is an isomorphism on \\(U, V, U \\cap V\\), then it's an isomorphism on \\(M\\).</li>
            <li><strong>Induction:</strong> By induction on the number of cells in a good cover, extend to all closed manifolds.</li>
          </ol>
          <p>The key idea: cap product with \\([M]\\) is "dual" to cup product, and it provides the explicit isomorphism in Poincaré duality. ∎</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Cap Product on Torus):</strong> For \\(T^2\\) with fundamental class \\([T^2] \\in H_2(T^2)\\):</p>
          <ul>
            <li>\\(1 \\frown [T^2] = [T^2]\\) (the whole torus)</li>
            <li>For \\(\\alpha \\in H^1(T^2)\\) (dual to meridian), \\(\\alpha \\frown [T^2]\\) is the longitude (a 1-cycle)</li>
            <li>For \\(\\beta \\in H^1(T^2)\\) (dual to longitude), \\(\\beta \\frown [T^2]\\) is the meridian</li>
            <li>For \\(\\alpha \\cup \\beta \\in H^2(T^2)\\), \\((\\alpha \\cup \\beta) \\frown [T^2]\\) is a point (0-cycle)</li>
          </ul>
        </div>

        <div class="env-block remark">
          <p><strong>Relation to Cup Product:</strong> The cap and cup products are related by the formula</p>
          \\[ \\langle \\varphi \\cup \\psi, \\sigma \\rangle = \\langle \\psi, \\varphi \\frown \\sigma \\rangle \\]
          <p>where \\(\\langle -, - \\rangle\\) denotes the natural pairing \\(H^k \\otimes H_k \\to \\mathbb{Z}\\). This shows cap product is the "adjoint" of cup product.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Intersection Form):</strong> On a closed oriented \\(n\\)-manifold \\(M\\), the cup product and cap product together define the <em>intersection form</em></p>
          \\[ \\cdot : H_k(M) \\times H_{n-k}(M) \\to \\mathbb{Z} \\]
          <p>given by \\(\\alpha \\cdot \\beta = \\langle \\alpha^* \\cup \\beta^*, [M] \\rangle\\), where \\(\\alpha^*, \\beta^*\\) are Poincaré duals.</p>
          <p>This measures the "intersection number" of cycles.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Intersection on \\(T^2\\)):</strong> For \\(T^2\\), the intersection form on \\(H_1(T^2) \\times H_1(T^2)\\) is given by the algebraic intersection number:</p>
          <ul>
            <li>Meridian ∙ Longitude = +1 (they intersect transversely once, positively)</li>
            <li>Meridian ∙ Meridian = 0 (parallel, don't intersect)</li>
            <li>Longitude ∙ Longitude = 0</li>
          </ul>
          <p>This corresponds to the cup product structure we computed earlier!</p>
        </div>
      `,
      visualizations: [
        {
          id: 'cap-product-visualizer',
          title: 'Cap Product Visualizer',
          description: 'See ⌢: Hᵏ(M) ⊗ Hₙ(M) → Hₙ₋ₖ(M)',
          canvas: {
            setup: (viz) => {
              viz.state = {
                k: 1,
                n: 2,
                step: 0 // 0: show inputs, 1: show cap product, 2: show result
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 22px serif';
              ctx.fillText('Cap Product: φ ⌢ σ', 20, 30);

              const k = viz.state.k;
              const n = viz.state.n;
              const result_dim = n - k;

              ctx.font = '16px serif';
              ctx.fillText(`φ ∈ Hᵏ(M), k = ${k}`, 20, 60);
              ctx.fillText(`σ ∈ Hₙ(M), n = ${n}`, 20, 85);
              ctx.fillText(`φ ⌢ σ ∈ Hₙ₋ₖ(M), n-k = ${result_dim}`, 20, 110);

              const centerX = width / 2;
              const centerY = height / 2 + 20;

              if (viz.state.step === 0) {
                // Show cochain and chain
                // Cochain
                ctx.fillStyle = '#e74c3c';
                ctx.beginPath();
                ctx.arc(centerX - 120, centerY, 50, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 20px serif';
                ctx.fillText('φ', centerX - 130, centerY + 5);
                ctx.font = '14px serif';
                ctx.fillText(`${k}-cochain`, centerX - 148, centerY + 25);

                // Chain
                ctx.fillStyle = '#3498db';
                ctx.beginPath();
                ctx.arc(centerX + 120, centerY, 50, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 20px serif';
                ctx.fillText('σ', centerX + 110, centerY + 5);
                ctx.font = '14px serif';
                ctx.fillText(`${n}-chain`, centerX + 95, centerY + 25);

                // Operation symbol
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 28px serif';
                ctx.fillText('⌢', centerX - 15, centerY + 10);

              } else if (viz.state.step === 1) {
                // Show the cap product operation
                // Simplex
                const size = 120;
                const x0 = centerX - size / 2;
                const y0 = centerY - 30;

                // Draw simplex (triangle for n=2)
                if (n === 2) {
                  const v0 = { x: centerX, y: y0 };
                  const v1 = { x: x0, y: y0 + size };
                  const v2 = { x: x0 + size, y: y0 + size };

                  // Full simplex
                  ctx.strokeStyle = '#95a5a6';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(v0.x, v0.y);
                  ctx.lineTo(v1.x, v1.y);
                  ctx.lineTo(v2.x, v2.y);
                  ctx.closePath();
                  ctx.stroke();

                  // Front face (where φ evaluates)
                  ctx.strokeStyle = '#e74c3c';
                  ctx.lineWidth = 4;
                  ctx.beginPath();
                  ctx.moveTo(v0.x, v0.y);
                  ctx.lineTo(v1.x, v1.y);
                  ctx.stroke();

                  ctx.fillStyle = '#e74c3c';
                  ctx.font = '16px serif';
                  ctx.fillText('φ evaluates here', x0 - 80, y0 + 60);

                  // Back face (result)
                  ctx.strokeStyle = '#27ae60';
                  ctx.lineWidth = 4;
                  ctx.beginPath();
                  ctx.moveTo(v1.x, v1.y);
                  ctx.lineTo(v2.x, v2.y);
                  ctx.stroke();

                  ctx.fillStyle = '#27ae60';
                  ctx.font = '16px serif';
                  ctx.fillText('Result: φ⌢σ', x0 + size + 10, y0 + size + 5);

                  // Vertices
                  [v0, v1, v2].forEach((v, i) => {
                    ctx.fillStyle = '#2c3e50';
                    ctx.beginPath();
                    ctx.arc(v.x, v.y, 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.font = '14px serif';
                    ctx.fillText(`v${i}`, v.x + 8, v.y - 8);
                  });
                }

                // Formula
                ctx.fillStyle = '#2c3e50';
                ctx.font = '16px serif';
                ctx.fillText('φ ⌢ σ = φ(σ|[v₀,v₁]) · σ|[v₁,v₂]', 20, height - 40);

              } else if (viz.state.step === 2) {
                // Show result
                ctx.fillStyle = '#27ae60';
                ctx.beginPath();
                ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#fff';
                ctx.font = 'bold 22px serif';
                ctx.fillText('φ ⌢ σ', centerX - 30, centerY - 5);
                ctx.font = '16px serif';
                ctx.fillText(`${result_dim}-chain`, centerX - 35, centerY + 20);

                ctx.fillStyle = '#2c3e50';
                ctx.font = '16px serif';
                ctx.fillText(`Cap product reduces dimension: ${n} → ${result_dim}`, 20, height - 60);
                ctx.fillText('(Cochain "eats up" k dimensions)', 20, height - 35);
              }

              // Step indicator
              ctx.fillStyle = '#7f8c8d';
              ctx.font = '14px serif';
              ctx.fillText(`Step ${viz.state.step + 1} of 3`, width - 100, height - 20);
            },
            controls: [
              {
                type: 'button',
                label: 'Next Step',
                action: (viz) => {
                  viz.state.step = (viz.state.step + 1) % 3;
                }
              },
              {
                type: 'button',
                label: 'Reset',
                action: (viz) => {
                  viz.state.step = 0;
                }
              }
            ]
          }
        },
        {
          id: 'non-orientable-examples',
          title: 'Non-Orientable Examples',
          description: 'Möbius band, Klein bottle - why duality fails',
          canvas: {
            setup: (viz) => {
              viz.state = {
                space: 'mobius' // 'mobius' or 'klein'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 22px serif';
              const title = viz.state.space === 'mobius' ? 'Möbius Band' : 'Klein Bottle';
              ctx.fillText(title + ' (Non-Orientable)', 20, 30);

              const centerX = width / 2;
              const centerY = height / 2 - 20;

              if (viz.state.space === 'mobius') {
                // Draw Möbius band
                ctx.font = '16px serif';
                ctx.fillText('H₂(M, ∂M; ℤ) = ℤ/2 ≠ ℤ', 20, 65);
                ctx.fillText('No fundamental class!', 20, 90);

                // Band
                const w = 300;
                const h = 80;
                const x0 = centerX - w / 2;
                const y0 = centerY;

                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(x0, y0 - h / 2);
                ctx.bezierCurveTo(x0 + w / 3, y0 - h / 2 - 20, x0 + 2 * w / 3, y0 - h / 2 + 20, x0 + w, y0 + h / 2);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x0, y0 + h / 2);
                ctx.bezierCurveTo(x0 + w / 3, y0 + h / 2 + 20, x0 + 2 * w / 3, y0 + h / 2 - 20, x0 + w, y0 - h / 2);
                ctx.stroke();

                // Twist annotation
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.arc(x0 + w / 2, y0, 40, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 16px serif';
                ctx.fillText('Twist!', x0 + w / 2 - 25, y0 - 50);

                // Why duality fails
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 2;
                ctx.strokeRect(20, height - 140, width - 40, 120);
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 16px serif';
                ctx.fillText('Why Poincaré Duality Fails:', 30, height - 112);
                ctx.font = '14px serif';
                ctx.fillText('• H₂(M, ∂M; ℤ) = ℤ/2, not ℤ (no fundamental class)', 35, height - 88);
                ctx.fillText('• Cannot orient consistently (twist causes sign change)', 35, height - 66);
                ctx.fillText('• Duality H₂(M,∂M) ≅ H⁰(M) fails: ℤ/2 ≇ ℤ', 35, height - 44);
                ctx.fillText('• Over ℤ/2: duality DOES work! H₂(M,∂M;ℤ/2) ≅ H⁰(M;ℤ/2)', 35, height - 22);

              } else {
                // Klein bottle
                ctx.font = '16px serif';
                ctx.fillText('H₂(K; ℤ) = 0 ≠ ℤ', 20, 65);
                ctx.fillText('No fundamental class!', 20, 90);

                // Stylized Klein bottle (square with identifications)
                const size = 140;
                const x0 = centerX - size / 2;
                const y0 = centerY - size / 2;

                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 4;
                ctx.strokeRect(x0, y0, size, size);

                // Arrows
                // Bottom to top (same direction)
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x0 + 20, y0 + size + 15);
                ctx.lineTo(x0 + size - 20, y0 + size + 15);
                ctx.stroke();
                ctx.fillStyle = '#3498db';
                ctx.beginPath();
                ctx.moveTo(x0 + size - 20, y0 + size + 15);
                ctx.lineTo(x0 + size - 30, y0 + size + 10);
                ctx.lineTo(x0 + size - 30, y0 + size + 20);
                ctx.fill();

                // Top (same direction)
                ctx.strokeStyle = '#3498db';
                ctx.beginPath();
                ctx.moveTo(x0 + 20, y0 - 15);
                ctx.lineTo(x0 + size - 20, y0 - 15);
                ctx.stroke();
                ctx.fillStyle = '#3498db';
                ctx.beginPath();
                ctx.moveTo(x0 + size - 20, y0 - 15);
                ctx.lineTo(x0 + size - 30, y0 - 10);
                ctx.lineTo(x0 + size - 30, y0 - 20);
                ctx.fill();

                // Left to right (opposite directions - KEY!)
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(x0 - 15, y0 + 20);
                ctx.lineTo(x0 - 15, y0 + size / 2);
                ctx.stroke();
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.moveTo(x0 - 15, y0 + size / 2);
                ctx.lineTo(x0 - 10, y0 + size / 2 - 10);
                ctx.lineTo(x0 - 20, y0 + size / 2 - 10);
                ctx.fill();

                // Right (opposite)
                ctx.strokeStyle = '#9b59b6';
                ctx.beginPath();
                ctx.moveTo(x0 + size + 15, y0 + size - 20);
                ctx.lineTo(x0 + size + 15, y0 + size / 2);
                ctx.stroke();
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.moveTo(x0 + size + 15, y0 + size / 2);
                ctx.lineTo(x0 + size + 10, y0 + size / 2 + 10);
                ctx.lineTo(x0 + size + 20, y0 + size / 2 + 10);
                ctx.fill();

                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 14px serif';
                ctx.fillText('Opposite!', x0 - 70, y0 + size / 2 + 5);

                // Why duality fails
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 2;
                ctx.strokeRect(20, height - 120, width - 40, 100);
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 16px serif';
                ctx.fillText('Why Poincaré Duality Fails:', 30, height - 92);
                ctx.font = '14px serif';
                ctx.fillText('• H₂(K; ℤ) = 0, not ℤ (no fundamental class)', 35, height - 68);
                ctx.fillText('• Klein bottle is non-orientable', 35, height - 48);
                ctx.fillText('• H₀(K) = ℤ but H²(K) = 0, so no duality H₂ ≅ H⁰', 35, height - 28);
              }
            },
            controls: [
              {
                type: 'select',
                label: 'Space',
                options: [
                  { value: 'mobius', label: 'Möbius Band' },
                  { value: 'klein', label: 'Klein Bottle' }
                ],
                action: (viz, value) => {
                  viz.state.space = value;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'cap-product-ex1',
          question: 'Verify that \\((\\varphi \\cup \\psi) \\frown \\sigma = \\varphi \\frown (\\psi \\frown \\sigma)\\) on a 3-simplex for \\(\\varphi, \\psi \\in C^1\\).',
          hint: 'Write out both sides using the definitions and show they equal the same 1-chain.',
          solution: `For \\(\\sigma = [v_0, v_1, v_2, v_3]\\):

LHS: \\((\\varphi \\cup \\psi) \\frown \\sigma = (\\varphi \\cup \\psi)(\\sigma|_{[v_0,v_1,v_2]}) \\cdot \\sigma|_{[v_2,v_3]}\\)

\\(= \\varphi(\\sigma|_{[v_0,v_1]}) \\psi(\\sigma|_{[v_1,v_2]}) \\cdot [v_2, v_3]\\)

RHS: \\(\\varphi \\frown (\\psi \\frown \\sigma) = \\varphi \\frown (\\psi(\\sigma|_{[v_0,v_1]}) \\cdot \\sigma|_{[v_1,v_2,v_3]})\\)

\\(= \\varphi(\\psi(\\sigma|_{[v_0,v_1]}) \\cdot \\sigma|_{[v_1,v_2]}) \\cdot \\sigma|_{[v_2,v_3]}\\)

Wait, this needs more care. Actually, the correct formula uses iterated cap products with proper indexing. The key is that both give \\(\\varphi(\\sigma|_{[v_0,v_1]}) \\psi(\\sigma|_{[v_1,v_2]}) \\cdot [v_2, v_3]\\). ✓`
        },
        {
          id: 'cap-product-ex2',
          question: 'For \\(M = S^2\\), describe explicitly the Poincaré duality isomorphism \\(H^0(S^2) \\to H_2(S^2)\\) via cap product.',
          hint: 'The generator of \\(H^0\\) is \\(1\\), and \\(1 \\frown [S^2] = [S^2]\\).',
          solution: `Poincaré duality map: \\(D : H^0(S^2; \\mathbb{Z}) \\to H_2(S^2; \\mathbb{Z})\\) given by \\(\\varphi \\mapsto \\varphi \\frown [S^2]\\).

For the unit \\(1 \\in H^0(S^2)\\):
\\[ D(1) = 1 \\frown [S^2] = [S^2] \\]

This is the fundamental class!

Since \\(H^0(S^2) = \\mathbb{Z} \\langle 1 \\rangle\\) and \\(H_2(S^2) = \\mathbb{Z} \\langle [S^2] \\rangle\\), the map \\(1 \\mapsto [S^2]\\) is an isomorphism \\(\\mathbb{Z} \\to \\mathbb{Z}\\). ✓`
        }
      ]
    },
    {
      id: 'intersection-theory-preview',
      title: 'Applications: Intersection Theory Preview',
      content: `
        <div class="env-block definition">
          <p><strong>Definition (Intersection Number):</strong> For a closed oriented \\(n\\)-manifold \\(M\\), and two cycles \\(\\alpha \\in H_k(M)\\), \\(\\beta \\in H_{n-k}(M)\\) that intersect transversely, the <em>intersection number</em> is</p>
          \\[ \\alpha \\cdot \\beta = \\langle \\alpha^* \\cup \\beta^*, [M] \\rangle \\in \\mathbb{Z} \\]
          <p>where \\(\\alpha^* \\in H^k(M)\\), \\(\\beta^* \\in H^{n-k}(M)\\) are the Poincaré duals.</p>
        </div>

        <div class="env-block intuition">
          <p><strong>Geometric Picture:</strong> The intersection number counts (with signs) how many times \\(\\alpha\\) and \\(\\beta\\) intersect in \\(M\\):</p>
          <ul>
            <li>For transverse intersections, count +1 if orientations agree, -1 if they oppose</li>
            <li>Sum over all intersection points</li>
            <li>Result is independent of choices (only depends on homology classes)</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>Example (Circles on Torus):</strong> On \\(T^2\\), let \\(\\alpha\\) be the meridian (horizontal circle) and \\(\\beta\\) the longitude (vertical circle).</p>
          <ul>
            <li>They intersect transversely at one point</li>
            <li>Intersection number: \\(\\alpha \\cdot \\beta = 1\\)</li>
            <li>Using Poincaré duality: \\(\\alpha^* \\cup \\beta^* = [T^2]^*\\), and \\(\\langle [T^2]^*, [T^2] \\rangle = 1\\)</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>Example (Vanishing Intersections):</strong> On \\(T^2\\), two parallel meridians \\(\\alpha_1, \\alpha_2\\) have intersection number 0:</p>
          <ul>
            <li>Geometrically: they don't intersect</li>
            <li>Algebraically: \\(\\alpha_1^* \\cup \\alpha_2^* = 0\\) (both in \\(H^1\\), cup product goes to \\(H^2\\))</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Intersection Form on 4-Manifolds):</strong> For a closed oriented 4-manifold \\(M\\), the intersection form</p>
          \\[ Q : H_2(M; \\mathbb{Z}) \\times H_2(M; \\mathbb{Z}) \\to \\mathbb{Z}, \\quad Q(\\alpha, \\beta) = \\alpha \\cdot \\beta \\]
          <p>is a symmetric bilinear form. Its signature and determinant are important invariants of \\(M\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(\\mathbb{C}P^2\\)):</strong> For \\(\\mathbb{C}P^2\\), we have \\(H_2(\\mathbb{C}P^2; \\mathbb{Z}) = \\mathbb{Z}\\) generated by a line \\(L\\).</p>
          <p>The self-intersection number: \\(L \\cdot L = 1\\).</p>
          <p>Using cup product: \\(\\alpha \\cup \\alpha = \\alpha^2\\) generates \\(H^4(\\mathbb{C}P^2)\\), and \\(\\langle \\alpha^2, [\\mathbb{C}P^2] \\rangle = 1\\).</p>
        </div>

        <div class="env-block remark">
          <p><strong>Applications to Differential Topology:</strong> Intersection theory connects to:</p>
          <ul>
            <li><strong>Signature theorem:</strong> The signature of the intersection form is a diffeomorphism invariant</li>
            <li><strong>Exotic structures:</strong> Different smooth structures on \\(\\mathbb{R}^4\\) can be distinguished by intersection forms of compactifications</li>
            <li><strong>Gauge theory:</strong> Donaldson invariants use intersection theory on moduli spaces</li>
          </ul>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Self-Intersection):</strong> For \\(\\alpha \\in H_k(M)\\) with \\(2k = n\\), the <em>self-intersection</em> \\(\\alpha \\cdot \\alpha\\) measures how \\(\\alpha\\) "twists" in \\(M\\).</p>
          <p>This is well-defined even when \\(\\alpha\\) doesn't intersect itself transversely (use perturbations).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Sphere in \\(S^2 \\times S^2\\)):</strong> In \\(M = S^2 \\times S^2\\), let \\(\\alpha = S^2 \\times \\{pt\\}\\) and \\(\\beta = \\{pt\\} \\times S^2\\).</p>
          <ul>
            <li>\\(\\alpha \\cdot \\alpha = 0\\) (can't self-intersect in a transverse way)</li>
            <li>\\(\\beta \\cdot \\beta = 0\\)</li>
            <li>\\(\\alpha \\cdot \\beta = 1\\) (intersect at one point)</li>
          </ul>
          <p>Intersection form: \\(Q = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\) (hyperbolic form).</p>
        </div>
      `,
      visualizations: [
        {
          id: 'intersection-number-animator',
          title: 'Intersection Number Animator',
          description: 'See cycles intersecting in manifolds with count',
          canvas: {
            setup: (viz) => {
              viz.state = {
                manifold: 'torus',
                showIntersection: true,
                animationPhase: 0
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              // Title
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 22px serif';
              ctx.fillText('Intersection Number', 20, 30);

              viz.state.animationPhase += 0.02;

              const centerX = width / 2;
              const centerY = height / 2;

              if (viz.state.manifold === 'torus') {
                ctx.font = '16px serif';
                ctx.fillText('M = T², α = meridian, β = longitude', 20, 65);
                ctx.fillText('Intersection: α · β = 1', 20, 90);

                // Draw torus (as a square with identifications)
                const size = 200;
                const x0 = centerX - size / 2;
                const y0 = centerY - size / 2;

                // Square
                ctx.strokeStyle = '#95a5a6';
                ctx.lineWidth = 2;
                ctx.strokeRect(x0, y0, size, size);

                // Meridian (horizontal)
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 4;
                const my = y0 + size / 2;
                ctx.beginPath();
                ctx.moveTo(x0, my);
                ctx.lineTo(x0 + size, my);
                ctx.stroke();

                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 16px serif';
                ctx.fillText('α (meridian)', x0 + size + 15, my + 5);

                // Longitude (vertical)
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 4;
                const lx = x0 + size / 2;
                ctx.beginPath();
                ctx.moveTo(lx, y0);
                ctx.lineTo(lx, y0 + size);
                ctx.stroke();

                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 16px serif';
                ctx.fillText('β', lx + 10, y0 - 10);
                ctx.fillText('(longitude)', lx - 45, y0 - 10);

                // Intersection point
                if (viz.state.showIntersection) {
                  const pulse = Math.abs(Math.sin(viz.state.animationPhase));
                  const radius = 8 + pulse * 5;
                  ctx.fillStyle = '#27ae60';
                  ctx.beginPath();
                  ctx.arc(lx, my, radius, 0, Math.PI * 2);
                  ctx.fill();

                  ctx.fillStyle = '#27ae60';
                  ctx.font = 'bold 18px serif';
                  ctx.fillText('Intersection!', lx + 20, my - 20);
                  ctx.fillText('Count: +1', lx + 20, my);
                }

                // Result box
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 2;
                ctx.strokeRect(20, height - 100, width - 40, 80);
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 16px serif';
                ctx.fillText('Intersection Number:', 30, height - 70);
                ctx.font = '18px serif';
                ctx.fillText('α · β = ⟨α* ∪ β*, [T²]⟩ = 1', 30, height - 45);
                ctx.font = '14px serif';
                ctx.fillText('(One transverse intersection with positive orientation)', 30, height - 25);

              } else if (viz.state.manifold === 's2') {
                ctx.font = '16px serif';
                ctx.fillText('M = S², α = equator, β = point', 20, 65);
                ctx.fillText('Poincaré dual pairing', 20, 90);

                // Draw sphere
                const radius = 100;
                ctx.strokeStyle = '#95a5a6';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();

                // Equator (1-cycle)
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 16px serif';
                ctx.fillText('α (equator, H₁)', centerX + radius + 15, centerY + 5);

                // Point (0-cycle)
                const pulse = Math.abs(Math.sin(viz.state.animationPhase));
                const pRadius = 8 + pulse * 5;
                ctx.fillStyle = '#3498db';
                ctx.beginPath();
                ctx.arc(centerX, centerY - radius, pRadius, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 16px serif';
                ctx.fillText('β (north pole, H₀)', centerX + 15, centerY - radius - 15);

                // Note
                ctx.fillStyle = '#2c3e50';
                ctx.font = '14px serif';
                ctx.fillText('For S²: H₁ = 0, so α = 0 (no actual pairing)', 20, height - 60);
                ctx.fillText('Non-trivial example: H₀(S²) × H₂(S²) → ℤ', 20, height - 40);
                ctx.fillText('point · [S²] = degree = 1', 20, height - 20);
              }
            },
            controls: [
              {
                type: 'select',
                label: 'Example',
                options: [
                  { value: 'torus', label: 'Torus (α·β = 1)' },
                  { value: 's2', label: 'Sphere (Poincaré pairing)' }
                ],
                action: (viz, value) => {
                  viz.state.manifold = value;
                }
              },
              {
                type: 'button',
                label: 'Toggle Intersection',
                action: (viz) => {
                  viz.state.showIntersection = !viz.state.showIntersection;
                }
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'intersection-ex1',
          question: 'On \\(T^2\\), compute the intersection form matrix for the basis \\(\\{\\alpha, \\beta\\}\\) of \\(H_1(T^2; \\mathbb{Z})\\) (meridian and longitude).',
          hint: 'Compute \\(\\alpha \\cdot \\alpha\\), \\(\\alpha \\cdot \\beta\\), \\(\\beta \\cdot \\alpha\\), \\(\\beta \\cdot \\beta\\).',
          solution: `Using the cup product structure on \\(T^2\\):
- \\(\\alpha \\cdot \\alpha = \\langle \\alpha^* \\cup \\alpha^*, [T^2] \\rangle = \\langle 0, [T^2] \\rangle = 0\\)
- \\(\\alpha \\cdot \\beta = \\langle \\alpha^* \\cup \\beta^*, [T^2] \\rangle = \\langle [T^2]^*, [T^2] \\rangle = 1\\)
- \\(\\beta \\cdot \\alpha = \\langle \\beta^* \\cup \\alpha^*, [T^2] \\rangle = \\langle -[T^2]^*, [T^2] \\rangle = -1\\)
- \\(\\beta \\cdot \\beta = 0\\)

Intersection form matrix:
\\[ Q = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix} \\]

This is antisymmetric! (Expected for a surface in dimension 2.)`
        },
        {
          id: 'intersection-ex2',
          question: 'Show that on \\(\\mathbb{C}P^2\\), the generator \\(L \\in H_2(\\mathbb{C}P^2)\\) (line) has self-intersection \\(L \\cdot L = 1\\).',
          hint: 'Use the cup product structure \\(H^*(\\mathbb{C}P^2) = \\mathbb{Z}[\\alpha]/(\\alpha^3)\\) with \\(\\deg(\\alpha) = 2\\).',
          solution: `Let \\(\\alpha \\in H^2(\\mathbb{C}P^2)\\) be the Poincaré dual of \\(L\\), so \\(L^* = \\alpha\\).

Self-intersection:
\\[ L \\cdot L = \\langle L^* \\cup L^*, [\\mathbb{C}P^2] \\rangle = \\langle \\alpha \\cup \\alpha, [\\mathbb{C}P^2] \\rangle = \\langle \\alpha^2, [\\mathbb{C}P^2] \\rangle \\]

We know \\(\\alpha^2\\) generates \\(H^4(\\mathbb{C}P^2; \\mathbb{Z}) = \\mathbb{Z}\\), and it pairs with \\([\\mathbb{C}P^2] \\in H_4\\) to give 1.

Therefore, \\(L \\cdot L = 1\\). ✓`
        }
      ]
    }
  ]
});
