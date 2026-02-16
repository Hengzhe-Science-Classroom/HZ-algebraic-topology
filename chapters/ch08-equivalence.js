// Updated: 2026-02-16 13:48:43
window.CHAPTERS.push({
  id: 'ch08',
  number: 8,
  title: 'Equivalence of Theories',
  subtitle: 'Simplicial and Singular Homology Agree',
  sections: [
    {
      id: 'subdivision',
      title: 'Subdivision and Comparison Maps',
      content: `
        <div class="env-block intuition">
          <strong>Intuition:</strong> We've developed two theories of homology: simplicial (for simplicial complexes) and singular (for all spaces). Do they agree when both apply? The answer is yes, via <em>subdivision</em>—refining simplices into smaller pieces that approximate singular chains.
        </div>

        <div class="env-block definition">
          <strong>Definition (Barycentric Subdivision):</strong> For a simplex \\([v_0, \\ldots, v_n]\\), the <strong>barycentric subdivision</strong> \\(\\text{Sd}(\\sigma)\\) replaces \\(\\sigma\\) with smaller simplices using the barycenter \\(\\hat{v} = \\frac{1}{n+1}\\sum v_i\\).

          Recursively:
          \\[
          \\text{Sd}([v_0, \\ldots, v_n]) = \\sum_{i=0}^n (-1)^i [\\hat{v}, v_0, \\ldots, \\hat{v_i}, \\ldots, v_n]
          \\]
          where \\(\\hat{v_i}\\) is the barycenter of \\([v_0, \\ldots, \\hat{v_i}, \\ldots, v_n]\\).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Subdivision Induces Chain Map):</strong> The subdivision operator extends to a chain map \\(\\text{Sd}: C_n^\\Delta(X) \\to C_n^\\Delta(X)\\) that is chain homotopic to the identity:
          \\[
          \\text{Sd} \\simeq \\text{id} \\implies H_n^\\Delta(X) \\cong H_n^\\Delta(X)
          \\]
        </div>

        <div class="env-block proof">
          <strong>Proof Outline:</strong>
          <ol>
            <li><strong>Define Sd on simplices:</strong> For \\(\\sigma: \\Delta^n \\to X\\), subdivide \\(\\Delta^n\\) and compose with \\(\\sigma\\).</li>
            <li><strong>Check \\(\\partial \\circ \\text{Sd} = \\text{Sd} \\circ \\partial\\):</strong> Subdivision commutes with boundary since it's a geometric operation.</li>
            <li><strong>Construct chain homotopy:</strong> Define \\(T: C_n \\to C_{n+1}\\) via the cone construction: \\(T(\\sigma) = [\\hat{v}, \\sigma]\\). Then:
            \\[
            \\partial T + T \\partial = \\text{Sd} - \\text{id}
            \\]
            </li>
          </ol>
          Thus \\(\\text{Sd}\\) induces the identity on homology. \\(\\square\\)
        </div>

        <div class="env-block definition">
          <strong>Definition (Simplicial Approximation):</strong> Let \\(f: |K| \\to |L|\\) be continuous between polyhedra. A <strong>simplicial approximation</strong> to \\(f\\) is a simplicial map \\(\\phi: K' \\to L\\) (after subdividing \\(K\\) to \\(K'\\)) such that:
          \\[
          f(\\text{St}(v)) \\subseteq \\text{St}(\\phi(v)) \\quad \\forall v \\in K'
          \\]
          where \\(\\text{St}(v)\\) is the open star of vertex \\(v\\).
        </div>

        <div class="env-block theorem">
          <strong>Simplicial Approximation Theorem:</strong> Every continuous map \\(f: |K| \\to |L|\\) between polyhedra has a simplicial approximation after sufficiently many subdivisions of \\(K\\). Moreover, \\(\\phi \\simeq f\\) (homotopic).
        </div>

        <div class="env-block example">
          <strong>Example (Approximating a Curve):</strong> Consider \\(f: S^1 \\to S^1\\), \\(z \\mapsto z^2\\). Subdivide \\(S^1\\) into 8 vertices. A simplicial approximation maps each vertex \\(v\\) to the nearest vertex in the target, creating a "polygonal approximation" to the doubling map.
        </div>

        <div class="env-block remark">
          <strong>Key Insight:</strong> Simplicial approximation allows us to replace continuous maps with combinatorial ones (simplicial maps), which induce chain maps algebraically. This bridges geometry and algebra.
        </div>

        <div class="viz-placeholder" data-viz="subdivision-viz"></div>
        <div class="viz-placeholder" data-viz="chain-map-viz"></div>
      `,
      visualizations: [
        {
          id: 'subdivision-viz',
          title: 'Subdivision Isomorphism Visualizer',
          description: 'See how barycentric subdivision refines a triangle and induces the same homology.',
          setup: function(body, controls) {
            const canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            const ctx = canvas.getContext('2d');

            const state = {
              level: 0,
              showBarycenters: true,
              showChain: false
            };

            function draw() {
              const width = canvas.width;
              const height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              const centerX = width / 2;
              const centerY = height / 2;
              const size = Math.min(width, height) * 0.35;

              // Original triangle vertices
              const v0 = { x: centerX, y: centerY - size };
              const v1 = { x: centerX - size * Math.sqrt(3) / 2, y: centerY + size / 2 };
              const v2 = { x: centerX + size * Math.sqrt(3) / 2, y: centerY + size / 2 };

              // Recursive subdivision
              function subdivide(vertices, level) {
                if (level === 0) {
                  return [vertices];
                }
                const [a, b, c] = vertices;
                const barycenter = {
                  x: (a.x + b.x + c.x) / 3,
                  y: (a.y + b.y + c.y) / 3
                };

                if (state.showBarycenters && level === state.level) {
                  ctx.fillStyle = '#e74c3c';
                  ctx.beginPath();
                  ctx.arc(barycenter.x, barycenter.y, 4, 0, 2 * Math.PI);
                  ctx.fill();
                }

                const mid01 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
                const mid12 = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
                const mid20 = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 };

                var result = [];
                result.push.apply(result, subdivide([a, mid01, mid20], level - 1));
                result.push.apply(result, subdivide([mid01, b, mid12], level - 1));
                result.push.apply(result, subdivide([mid20, mid12, c], level - 1));
                result.push.apply(result, subdivide([mid01, mid12, mid20], level - 1));
                return result;
              }

              var triangles = subdivide([v0, v1, v2], state.level);

              // Draw subdivided triangles
              triangles.forEach(function(tri, idx) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(tri[0].x, tri[0].y);
                ctx.lineTo(tri[1].x, tri[1].y);
                ctx.lineTo(tri[2].x, tri[2].y);
                ctx.closePath();
                ctx.stroke();

                if (state.showChain) {
                  ctx.fillStyle = 'rgba(52, 152, 219, 0.2)';
                  ctx.fill();
                }
              });

              // Draw original vertices
              [v0, v1, v2].forEach(function(v, i) {
                ctx.fillStyle = '#2c3e50';
                ctx.beginPath();
                ctx.arc(v.x, v.y, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.font = '16px KaTeX_Main';
                ctx.fillText('v' + i, v.x + 10, v.y - 10);
              });

              // Info text
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.fillText('Subdivision level: ' + state.level, 10, 20);
              ctx.fillText('Triangles: ' + triangles.length, 10, 40);
              ctx.fillText('Homology: H\u2080 = \u2124, H\u2081 = 0, H\u2082 = 0 (unchanged)', 10, height - 10);
            }

            // Controls: slider for level
            var levelLabel = document.createElement('label');
            levelLabel.style.color = '#c9d1d9';
            levelLabel.style.marginRight = '8px';
            levelLabel.textContent = 'Subdivision Level: 0';
            controls.appendChild(levelLabel);
            var levelSlider = document.createElement('input');
            levelSlider.type = 'range';
            levelSlider.min = 0; levelSlider.max = 3; levelSlider.step = 1; levelSlider.value = 0;
            levelSlider.style.width = '200px';
            levelSlider.oninput = function() {
              state.level = parseInt(levelSlider.value);
              levelLabel.textContent = 'Subdivision Level: ' + levelSlider.value;
              draw();
            };
            controls.appendChild(levelSlider);

            // Checkbox: showBarycenters
            var barContainer = document.createElement('label');
            barContainer.style.color = '#c9d1d9';
            barContainer.style.marginLeft = '15px';
            barContainer.style.cursor = 'pointer';
            var barCheckbox = document.createElement('input');
            barCheckbox.type = 'checkbox';
            barCheckbox.checked = true;
            barCheckbox.onchange = function() { state.showBarycenters = barCheckbox.checked; draw(); };
            barContainer.appendChild(barCheckbox);
            barContainer.appendChild(document.createTextNode(' Show Barycenters'));
            controls.appendChild(barContainer);

            // Checkbox: showChain
            var chainContainer = document.createElement('label');
            chainContainer.style.color = '#c9d1d9';
            chainContainer.style.marginLeft = '15px';
            chainContainer.style.cursor = 'pointer';
            var chainCheckbox = document.createElement('input');
            chainCheckbox.type = 'checkbox';
            chainCheckbox.checked = false;
            chainCheckbox.onchange = function() { state.showChain = chainCheckbox.checked; draw(); };
            chainContainer.appendChild(chainCheckbox);
            chainContainer.appendChild(document.createTextNode(' Highlight Chains'));
            controls.appendChild(chainContainer);

            draw();
          }
        },
        {
          id: 'chain-map-viz',
          title: 'Chain Map Visualizer',
          description: 'See how subdivision induces a chain map Sd: C\u2099 \u2192 C\u2099.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              showOriginal: true,
              showSubdivided: true,
              showArrows: true
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var leftX = width * 0.25;
              var rightX = width * 0.75;
              var centerY = height / 2;
              var boxSize = 80;

              // Original chain complex (left)
              if (state.showOriginal) {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.strokeRect(leftX - boxSize / 2, centerY - boxSize / 2, boxSize, boxSize);
                ctx.fillStyle = '#000';
                ctx.font = '16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('C\u2082(X)', leftX, centerY - boxSize);
                ctx.fillText('1\u00B7\u03C3', leftX, centerY);

                // C_1
                ctx.strokeRect(leftX - boxSize / 2, centerY + boxSize, boxSize, boxSize / 2);
                ctx.fillText('C\u2081(X)', leftX, centerY + boxSize - 10);

                // Boundary arrow
                ctx.strokeStyle = '#e74c3c';
                ctx.beginPath();
                ctx.moveTo(leftX, centerY + boxSize / 2);
                ctx.lineTo(leftX, centerY + boxSize);
                ctx.stroke();
                // Arrow head
                ctx.beginPath();
                ctx.moveTo(leftX, centerY + boxSize);
                ctx.lineTo(leftX - 5, centerY + boxSize - 10);
                ctx.lineTo(leftX + 5, centerY + boxSize - 10);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.fillText('\u2202\u2082', leftX + 20, centerY + boxSize * 0.75);
              }

              // Subdivided chain complex (right)
              if (state.showSubdivided) {
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 2;
                ctx.strokeRect(rightX - boxSize / 2, centerY - boxSize / 2, boxSize, boxSize);
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('C\u2082(X)', rightX, centerY - boxSize);
                ctx.fillText('4\u00B7Sd(\u03C3)', rightX, centerY - 10);
                ctx.font = '11px KaTeX_Main';
                ctx.fillText('(4 subtriangles)', rightX, centerY + 10);

                // C_1
                ctx.strokeRect(rightX - boxSize / 2, centerY + boxSize, boxSize, boxSize / 2);
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('C\u2081(X)', rightX, centerY + boxSize - 10);

                // Boundary arrow
                ctx.strokeStyle = '#e74c3c';
                ctx.beginPath();
                ctx.moveTo(rightX, centerY + boxSize / 2);
                ctx.lineTo(rightX, centerY + boxSize);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(rightX, centerY + boxSize);
                ctx.lineTo(rightX - 5, centerY + boxSize - 10);
                ctx.lineTo(rightX + 5, centerY + boxSize - 10);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.fillText('\u2202\u2082', rightX + 20, centerY + boxSize * 0.75);
              }

              // Horizontal arrow (Sd map)
              if (state.showArrows) {
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(leftX + boxSize / 2 + 10, centerY);
                ctx.lineTo(rightX - boxSize / 2 - 10, centerY);
                ctx.stroke();
                // Arrow head
                ctx.fillStyle = '#9b59b6';
                ctx.beginPath();
                ctx.moveTo(rightX - boxSize / 2 - 10, centerY);
                ctx.lineTo(rightX - boxSize / 2 - 20, centerY - 6);
                ctx.lineTo(rightX - boxSize / 2 - 20, centerY + 6);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.font = '16px KaTeX_Main';
                ctx.fillText('Sd', (leftX + rightX) / 2, centerY - 20);
              }

              // Info
              ctx.textAlign = 'left';
              ctx.font = '13px KaTeX_Main';
              ctx.fillStyle = '#000';
              ctx.fillText('Subdivision is a chain map: \u2202 \u2218 Sd = Sd \u2218 \u2202', 10, height - 30);
              ctx.fillText('Sd \u2243 id \u27F9 induces isomorphism on homology', 10, height - 10);
            }

            // Checkbox: showOriginal
            var origContainer = document.createElement('label');
            origContainer.style.color = '#c9d1d9';
            origContainer.style.marginRight = '15px';
            origContainer.style.cursor = 'pointer';
            var origCheckbox = document.createElement('input');
            origCheckbox.type = 'checkbox';
            origCheckbox.checked = true;
            origCheckbox.onchange = function() { state.showOriginal = origCheckbox.checked; draw(); };
            origContainer.appendChild(origCheckbox);
            origContainer.appendChild(document.createTextNode(' Show Original'));
            controls.appendChild(origContainer);

            // Checkbox: showSubdivided
            var subContainer = document.createElement('label');
            subContainer.style.color = '#c9d1d9';
            subContainer.style.marginRight = '15px';
            subContainer.style.cursor = 'pointer';
            var subCheckbox = document.createElement('input');
            subCheckbox.type = 'checkbox';
            subCheckbox.checked = true;
            subCheckbox.onchange = function() { state.showSubdivided = subCheckbox.checked; draw(); };
            subContainer.appendChild(subCheckbox);
            subContainer.appendChild(document.createTextNode(' Show Subdivided'));
            controls.appendChild(subContainer);

            // Checkbox: showArrows
            var arrowContainer = document.createElement('label');
            arrowContainer.style.color = '#c9d1d9';
            arrowContainer.style.cursor = 'pointer';
            var arrowCheckbox = document.createElement('input');
            arrowCheckbox.type = 'checkbox';
            arrowCheckbox.checked = true;
            arrowCheckbox.onchange = function() { state.showArrows = arrowCheckbox.checked; draw(); };
            arrowContainer.appendChild(arrowCheckbox);
            arrowContainer.appendChild(document.createTextNode(' Show Chain Map'));
            controls.appendChild(arrowContainer);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ex-subdivision-1',
          question: 'Compute the first barycentric subdivision of the 1-simplex \\([v_0, v_1]\\). Show that \\(\\partial(\\text{Sd}([v_0, v_1])) = \\text{Sd}(\\partial([v_0, v_1]))\\).',
          hint: 'The barycenter is \\(\\hat{v} = (v_0 + v_1)/2\\). Subdivision gives two 1-simplices.',
          solution: 'The barycenter is \\(\\hat{v} = \\frac{v_0 + v_1}{2}\\). Then:\n          \\[\n          \\text{Sd}([v_0, v_1]) = [v_0, \\hat{v}] + [\\hat{v}, v_1]\n          \\]\n          Applying \\(\\partial\\):\n          \\[\n          \\partial(\\text{Sd}([v_0, v_1])) = \\partial([v_0, \\hat{v}]) + \\partial([\\hat{v}, v_1]) = (\\hat{v} - v_0) + (v_1 - \\hat{v}) = v_1 - v_0\n          \\]\n          On the other hand:\n          \\[\n          \\text{Sd}(\\partial([v_0, v_1])) = \\text{Sd}(v_1 - v_0) = v_1 - v_0\n          \\]\n          Thus \\(\\partial \\circ \\text{Sd} = \\text{Sd} \\circ \\partial\\). \\(\\square\\)'
        },
        {
          id: 'ex-simplicial-approx',
          question: 'Let \\(f: S^1 \\to S^1\\), \\(z \\mapsto z^3\\). Describe a simplicial approximation using a triangulation with 6 vertices.',
          hint: 'Place vertices at \\(e^{2\\pi i k/6}\\) for \\(k = 0, \\ldots, 5\\). Map each vertex to the nearest vertex under \\(f\\).',
          solution: 'Triangulate \\(S^1\\) with vertices \\(v_k = e^{2\\pi i k/6}\\) for \\(k = 0, \\ldots, 5\\). Then \\(f(v_k) = e^{2\\pi i k/2}\\).\n\n          A simplicial approximation \\(\\phi\\) maps:\n          \\[\n          \\phi(v_k) = v_{3k \\mod 6}\n          \\]\n          For example, \\(\\phi(v_0) = v_0\\), \\(\\phi(v_1) = v_3\\), \\(\\phi(v_2) = v_0\\), etc. This wraps the circle 3 times, matching the degree of \\(f\\). \\(\\square\\)'
        }
      ]
    },
    {
      id: 'simplicial-singular',
      title: 'Proof that Simplicial = Singular for Polyhedra',
      content: `
        <div class="env-block theorem">
          <strong>Main Theorem:</strong> For a polyhedron \\(X = |K|\\) (the geometric realization of a simplicial complex \\(K\\)), the simplicial homology \\(H_n^\\Delta(X)\\) is naturally isomorphic to the singular homology \\(H_n(X)\\):
          \\[
          H_n^\\Delta(X) \\cong H_n(X)
          \\]
        </div>

        <div class="env-block proof">
          <strong>Proof:</strong>
          <ol>
            <li><strong>Step 1 (Natural inclusion):</strong> Each simplex \\(\\sigma \\in K\\) defines a singular simplex \\(\\sigma: \\Delta^n \\to X\\). This gives a chain map:
            \\[
            i: C_n^\\Delta(X) \\to C_n(X)
            \\]
            sending simplicial chains to singular chains.</li>

            <li><strong>Step 2 (Induced map on homology):</strong> Since \\(i\\) is a chain map (\\(\\partial \\circ i = i \\circ \\partial\\)), it induces:
            \\[
            i_*: H_n^\\Delta(X) \\to H_n(X)
            \\]
            We must show \\(i_*\\) is an isomorphism.</li>

            <li><strong>Step 3 (Simplicial approximation):</strong> Given a singular simplex \\(\\sigma: \\Delta^n \\to X\\), subdivide \\(\\Delta^n\\) sufficiently so that a simplicial approximation \\(\\phi: \\text{Sd}^k(\\Delta^n) \\to K\\) exists with \\(|\\phi| \\simeq \\sigma\\).

            This defines a map:
            \\[
            \\phi_*: C_n(X) \\to C_n^\\Delta(X)
            \\]
            </li>

            <li><strong>Step 4 (Check \\(i \\circ \\phi \\simeq \\text{id}\\)):</strong> The composition \\(i \\circ \\phi\\) sends a singular simplex to a simplicial approximation, then back to singular. By the simplicial approximation theorem, \\(|\\phi| \\simeq \\sigma\\), so:
            \\[
            i \\circ \\phi \\simeq \\text{id}: C_n(X) \\to C_n(X)
            \\]
            (chain homotopic to identity).</li>

            <li><strong>Step 5 (Check \\(\\phi \\circ i = \\text{id}\\)):</strong> For a simplicial simplex \\(\\sigma \\in K\\), \\(i(\\sigma)\\) views it as singular, then \\(\\phi\\) approximates it—but it's already simplicial! So \\(\\phi \\circ i = \\text{id}\\) exactly.</li>

            <li><strong>Conclusion:</strong> Since \\(i_*\\) and \\(\\phi_*\\) are inverses on homology:
            \\[
            H_n^\\Delta(X) \\cong H_n(X) \\quad \\square
            \\]
            </li>
          </ol>
        </div>

        <div class="env-block example">
          <strong>Example (Torus):</strong> Triangulate \\(T^2\\) with 18 triangles (standard CW structure). Then:
          \\[
          H_n^\\Delta(T^2) = H_n(T^2) = \\begin{cases}
          \\mathbb{Z} & n = 0, 2 \\\\
          \\mathbb{Z}^2 & n = 1 \\\\
          0 & \\text{else}
          \\end{cases}
          \\]
          Both theories give the same answer!
        </div>

        <div class="env-block remark">
          <strong>Remark:</strong> This theorem is crucial—it says simplicial homology (easy to compute) agrees with singular homology (works for all spaces) whenever both apply. For non-polyhedra (e.g., solenoid, Hawaiian earring), only singular homology is defined.
        </div>

        <div class="env-block definition">
          <strong>Definition (Polyhedron):</strong> A <strong>polyhedron</strong> is a space \\(X\\) homeomorphic to \\(|K|\\) for some simplicial complex \\(K\\). Examples: all finite CW complexes, compact manifolds, graphs.
        </div>

        <div class="viz-placeholder" data-viz="simplicial-singular-comparison"></div>
      `,
      visualizations: [
        {
          id: 'simplicial-singular-comparison',
          title: 'Simplicial vs Singular Comparison',
          description: 'Compare simplicial and singular homology computations side-by-side.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.8);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              space: 'circle',
              showSimplicial: true,
              showSingular: true
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var leftX = width * 0.25;
              var rightX = width * 0.75;
              var centerY = height / 2;

              var spaces = {
                circle: { name: 'S\u00B9', H0: '\u2124', H1: '\u2124', H2: '0' },
                torus: { name: 'T\u00B2', H0: '\u2124', H1: '\u2124\u00B2', H2: '\u2124' },
                sphere: { name: 'S\u00B2', H0: '\u2124', H1: '0', H2: '\u2124' }
              };

              var current = spaces[state.space];

              // Simplicial side
              if (state.showSimplicial) {
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 18px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Simplicial Homology', leftX, 30);

                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('Space: ' + current.name, leftX, 60);

                // Chain complex
                var y0 = 100;
                var spacing = 50;
                ['C\u2082', 'C\u2081', 'C\u2080'].forEach(function(label, i) {
                  ctx.strokeStyle = '#3498db';
                  ctx.lineWidth = 2;
                  var y = y0 + i * spacing;
                  ctx.strokeRect(leftX - 40, y - 15, 80, 30);
                  ctx.fillStyle = '#000';
                  ctx.fillText(label + '\u1D43(X)', leftX, y + 5);

                  if (i < 2) {
                    ctx.strokeStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(leftX, y + 15);
                    ctx.lineTo(leftX, y + 15 + spacing - 30);
                    ctx.stroke();
                    // Arrow
                    ctx.fillStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(leftX, y + spacing - 15);
                    ctx.lineTo(leftX - 4, y + spacing - 25);
                    ctx.lineTo(leftX + 4, y + spacing - 25);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#000';
                    ctx.fillText('\u2202', leftX + 25, y + spacing - 20);
                  }
                });

                // Homology groups
                ctx.font = '16px KaTeX_Main';
                ctx.fillStyle = '#27ae60';
                var resY = y0 + 180;
                ctx.fillText('Results:', leftX, resY);
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('H\u2080 = ' + current.H0, leftX, resY + 25);
                ctx.fillText('H\u2081 = ' + current.H1, leftX, resY + 45);
                ctx.fillText('H\u2082 = ' + current.H2, leftX, resY + 65);
              }

              // Singular side
              if (state.showSingular) {
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 18px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Singular Homology', rightX, 30);

                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('Space: ' + current.name, rightX, 60);

                // Chain complex
                var y0s = 100;
                var spacings = 50;
                ['C\u2082', 'C\u2081', 'C\u2080'].forEach(function(label, i) {
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 2;
                  var y = y0s + i * spacings;
                  ctx.strokeRect(rightX - 40, y - 15, 80, 30);
                  ctx.fillStyle = '#000';
                  ctx.fillText(label + '(X)', rightX, y + 5);

                  if (i < 2) {
                    ctx.strokeStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(rightX, y + 15);
                    ctx.lineTo(rightX, y + 15 + spacings - 30);
                    ctx.stroke();
                    ctx.fillStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(rightX, y + spacings - 15);
                    ctx.lineTo(rightX - 4, y + spacings - 25);
                    ctx.lineTo(rightX + 4, y + spacings - 25);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#000';
                    ctx.fillText('\u2202', rightX + 25, y + spacings - 20);
                  }
                });

                // Homology groups
                ctx.font = '16px KaTeX_Main';
                ctx.fillStyle = '#27ae60';
                var resYs = y0s + 180;
                ctx.fillText('Results:', rightX, resYs);
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('H\u2080 = ' + current.H0, rightX, resYs + 25);
                ctx.fillText('H\u2081 = ' + current.H1, rightX, resYs + 45);
                ctx.fillText('H\u2082 = ' + current.H2, rightX, resYs + 65);
              }

              // Equivalence arrow
              ctx.strokeStyle = '#f39c12';
              ctx.lineWidth = 4;
              var arrowY = centerY + 50;
              ctx.beginPath();
              ctx.moveTo(leftX + 60, arrowY);
              ctx.lineTo(rightX - 60, arrowY);
              ctx.stroke();
              // Double arrow
              ctx.fillStyle = '#f39c12';
              ctx.beginPath();
              ctx.moveTo(rightX - 60, arrowY);
              ctx.lineTo(rightX - 75, arrowY - 6);
              ctx.lineTo(rightX - 75, arrowY + 6);
              ctx.closePath();
              ctx.fill();
              ctx.beginPath();
              ctx.moveTo(leftX + 60, arrowY);
              ctx.lineTo(leftX + 75, arrowY - 6);
              ctx.lineTo(leftX + 75, arrowY + 6);
              ctx.closePath();
              ctx.fill();

              ctx.fillStyle = '#000';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('\u2245', (leftX + rightX) / 2, arrowY - 10);
              ctx.font = '12px KaTeX_Main';
              ctx.fillText('(for polyhedra)', (leftX + rightX) / 2, arrowY + 25);
            }

            // Select: space
            var spaceLabel = document.createElement('label');
            spaceLabel.style.color = '#c9d1d9';
            spaceLabel.style.marginRight = '8px';
            spaceLabel.textContent = 'Space: ';
            controls.appendChild(spaceLabel);
            var spaceSelect = document.createElement('select');
            spaceSelect.style.background = '#161b22'; spaceSelect.style.color = '#c9d1d9'; spaceSelect.style.border = '1px solid #30363d'; spaceSelect.style.padding = '4px 8px'; spaceSelect.style.borderRadius = '4px';
            [{value:'circle',label:'Circle S\u00B9'},{value:'torus',label:'Torus T\u00B2'},{value:'sphere',label:'Sphere S\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              spaceSelect.appendChild(o);
            });
            spaceSelect.value = 'circle';
            spaceSelect.onchange = function() { state.space = spaceSelect.value; draw(); };
            controls.appendChild(spaceSelect);

            // Checkbox: showSimplicial
            var simpContainer = document.createElement('label');
            simpContainer.style.color = '#c9d1d9';
            simpContainer.style.marginLeft = '15px';
            simpContainer.style.cursor = 'pointer';
            var simpCheckbox = document.createElement('input');
            simpCheckbox.type = 'checkbox';
            simpCheckbox.checked = true;
            simpCheckbox.onchange = function() { state.showSimplicial = simpCheckbox.checked; draw(); };
            simpContainer.appendChild(simpCheckbox);
            simpContainer.appendChild(document.createTextNode(' Show Simplicial'));
            controls.appendChild(simpContainer);

            // Checkbox: showSingular
            var singContainer = document.createElement('label');
            singContainer.style.color = '#c9d1d9';
            singContainer.style.marginLeft = '15px';
            singContainer.style.cursor = 'pointer';
            var singCheckbox = document.createElement('input');
            singCheckbox.type = 'checkbox';
            singCheckbox.checked = true;
            singCheckbox.onchange = function() { state.showSingular = singCheckbox.checked; draw(); };
            singContainer.appendChild(singCheckbox);
            singContainer.appendChild(document.createTextNode(' Show Singular'));
            controls.appendChild(singContainer);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ex-equiv-1',
          question: 'Verify that the natural inclusion \\(i: C_n^\\Delta(S^1) \\to C_n(S^1)\\) is a chain map for the circle triangulated with 3 vertices.',
          hint: 'Check that \\(\\partial \\circ i = i \\circ \\partial\\) on a 1-simplex \\([v_0, v_1]\\).',
          solution: 'Triangulate \\(S^1\\) with vertices \\(v_0, v_1, v_2\\) and edges \\([v_0, v_1], [v_1, v_2], [v_2, v_0]\\).\n\n          For a simplicial 1-chain \\(c = [v_0, v_1]\\), we have:\n          \\[\n          \\partial([v_0, v_1]) = v_1 - v_0 \\quad \\text{(simplicial boundary)}\n          \\]\n          Applying \\(i\\):\n          \\[\n          i(\\partial([v_0, v_1])) = i(v_1 - v_0) = v_1 - v_0 \\quad \\text{(as singular 0-chains)}\n          \\]\n          On the other hand:\n          \\[\n          \\partial(i([v_0, v_1])) = \\partial([v_0, v_1]) = v_1 - v_0 \\quad \\text{(singular boundary)}\n          \\]\n          Thus \\(\\partial \\circ i = i \\circ \\partial\\), so \\(i\\) is a chain map. \\(\\square\\)'
        },
        {
          id: 'ex-equiv-2',
          question: 'Show that for \\(X = S^2\\) (2-sphere), \\(H_2^\\Delta(X) \\cong H_2(X) \\cong \\mathbb{Z}\\).',
          hint: 'Use a triangulation with 2 triangles glued along their boundaries.',
          solution: 'Triangulate \\(S^2\\) with upper and lower hemispheres as 2-simplices \\(\\sigma_+\\) and \\(\\sigma_-\\), sharing boundary \\(\\partial \\sigma_+ = -\\partial \\sigma_-\\) (the equator).\n\n          <strong>Simplicial:</strong> \\(C_2^\\Delta = \\langle \\sigma_+, \\sigma_- \\rangle \\cong \\mathbb{Z}^2\\). The boundary map:\n          \\[\n          \\partial_2(a\\sigma_+ + b\\sigma_-) = a(\\partial \\sigma_+) + b(\\partial \\sigma_-) = (a - b)(\\partial \\sigma_+)\n          \\]\n          Thus \\(\\ker \\partial_2 = \\langle \\sigma_+ + \\sigma_- \\rangle \\cong \\mathbb{Z}\\) (cycles are "whole sphere").\n          Since \\(\\text{im } \\partial_3 = 0\\), \\(H_2^\\Delta(S^2) = \\mathbb{Z}\\).\n\n          <strong>Singular:</strong> Any singular 2-cycle represents a multiple of the fundamental class \\([S^2]\\). By the equivalence theorem, \\(H_2(S^2) \\cong \\mathbb{Z}\\).\n\n          The isomorphism \\(i_*: H_2^\\Delta \\to H_2\\) sends \\([\\sigma_+ + \\sigma_-] \\mapsto [S^2]\\). \\(\\square\\)'
        }
      ]
    },
    {
      id: 'cw-complexes',
      title: 'CW Complexes and Cellular Homology Preview',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> Simplicial complexes are too rigid—vertices, edges, faces must fit perfectly. <em>CW complexes</em> generalize this: build spaces by gluing cells (disks) of increasing dimension. This is more flexible and natural for many spaces (e.g., projective spaces, Lie groups).
        </div>

        <div class="env-block definition">
          <strong>Definition (CW Complex):</strong> A <strong>CW complex</strong> is a space \\(X\\) built inductively:
          <ol>
            <li><strong>Start (\\(X^{-1} = \\emptyset\\)):</strong> Begin with the empty space.</li>
            <li><strong>0-skeleton \\(X^0\\):</strong> A discrete set of points (0-cells).</li>
            <li><strong>Inductive step:</strong> Form \\(X^n\\) from \\(X^{n-1}\\) by attaching \\(n\\)-cells: for each \\(n\\)-cell \\(e_\\alpha^n\\), attach a copy of \\(D^n\\) via a <strong>characteristic map</strong> \\(\\Phi_\\alpha: D^n \\to X^n\\) such that:
              <ul>
                <li>\\(\\Phi_\\alpha|_{\\text{int}(D^n)}: \\text{int}(D^n) \\to X^n\\) is a homeomorphism onto its image.</li>
                <li>\\(\\Phi_\\alpha|_{S^{n-1}}: S^{n-1} \\to X^{n-1}\\) is the <strong>attaching map</strong>.</li>
              </ul>
            </li>
            <li><strong>Topology:</strong> \\(X = \\bigcup_n X^n\\) with the <strong>weak topology</strong>: \\(A \\subseteq X\\) is closed iff \\(A \\cap X^n\\) is closed for all \\(n\\).</li>
          </ol>
          <strong>C</strong> = closure-finite, <strong>W</strong> = weak topology.
        </div>

        <div class="env-block example">
          <strong>Example (\\(S^2\\) as CW complex):</strong>
          <ul>
            <li>One 0-cell: \\(e^0\\) (the north pole).</li>
            <li>One 2-cell: \\(e^2 = D^2\\), attached via \\(\\phi: S^1 \\to e^0\\) (boundary collapses to a point).</li>
          </ul>
          This is much simpler than a triangulation (which needs many vertices/edges).
        </div>

        <div class="env-block example">
          <strong>Example (Real projective space \\(\\mathbb{R}P^n\\)):</strong>
          \\[
          \\mathbb{R}P^n = e^0 \\cup e^1 \\cup e^2 \\cup \\cdots \\cup e^n
          \\]
          One cell in each dimension! The attaching map \\(S^{k-1} \\to \\mathbb{R}P^{k-1}\\) is the quotient map identifying antipodal points.
        </div>

        <div class="env-block definition">
          <strong>Definition (Cellular Chain Complex):</strong> For a CW complex \\(X\\), define:
          \\[
          C_n^{\\text{CW}}(X) = H_n(X^n, X^{n-1})
          \\]
          (relative homology of the \\(n\\)-skeleton). This is a free abelian group with one generator per \\(n\\)-cell.

          The <strong>cellular boundary map</strong> \\(d_n: C_n^{\\text{CW}} \\to C_{n-1}^{\\text{CW}}\\) is defined via the composition:
          \\[
          H_n(X^n, X^{n-1}) \\xrightarrow{\\partial} H_{n-1}(X^{n-1}) \\to H_{n-1}(X^{n-1}, X^{n-2})
          \\]
          where the first map is from the long exact sequence of \\((X^n, X^{n-1})\\).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Cellular Homology):</strong> For a CW complex \\(X\\):
          \\[
          H_n(X) \\cong H_n(C_*^{\\text{CW}}(X))
          \\]
          That is, singular homology equals the homology of the cellular chain complex.
        </div>

        <div class="env-block remark">
          <strong>Why is this useful?</strong>
          <ul>
            <li>The cellular chain complex has one generator per cell (much smaller than singular chains).</li>
            <li>For \\(\\mathbb{R}P^n\\), \\(C_k^{\\text{CW}} = \\mathbb{Z}\\) for \\(0 \\le k \\le n\\), \\(0\\) else. Super simple!</li>
            <li>We'll prove this theorem and compute many examples in Chapter 10.</li>
          </ul>
        </div>

        <div class="env-block example">
          <strong>Example Preview (\\(\\mathbb{R}P^2\\)):</strong>
          CW structure: \\(e^0 \\cup e^1 \\cup e^2\\). Cellular complex:
          \\[
          0 \\to \\mathbb{Z} \\xrightarrow{d_2} \\mathbb{Z} \\xrightarrow{d_1} \\mathbb{Z} \\to 0
          \\]
          where \\(d_2 = 0\\) (attaching map \\(S^1 \\to \\mathbb{R}P^1\\) has degree 2, but we'll see \\(d_2 = 2\\) in Chapter 10).

          Result: \\(H_0 = \\mathbb{Z}\\), \\(H_1 = \\mathbb{Z}/2\\), \\(H_2 = 0\\).
        </div>

        <div class="viz-placeholder" data-viz="cw-builder"></div>
      `,
      visualizations: [
        {
          id: 'cw-builder',
          title: 'CW Complex Builder',
          description: 'Build CW complexes interactively by attaching cells.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              structure: 'sphere',
              dimension: 2,
              showCells: true,
              showAttaching: false
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var centerX = width / 2;
              var centerY = height / 2;

              var structures = {
                sphere: {
                  name: 'S\u00B2',
                  cells: [
                    { dim: 0, label: 'e\u2070', x: centerX, y: centerY - 100, color: '#e74c3c' },
                    { dim: 2, label: 'e\u00B2', x: centerX, y: centerY + 50, color: '#3498db', radius: 80 }
                  ],
                  description: 'S\u00B2 = e\u2070 \u222A e\u00B2'
                },
                torus: {
                  name: 'T\u00B2',
                  cells: [
                    { dim: 0, label: 'e\u2070', x: centerX, y: centerY - 100, color: '#e74c3c' },
                    { dim: 1, label: 'e\u00B9\u2090', x: centerX - 80, y: centerY, color: '#27ae60' },
                    { dim: 1, label: 'e\u00B9\u1D47', x: centerX + 80, y: centerY, color: '#27ae60' },
                    { dim: 2, label: 'e\u00B2', x: centerX, y: centerY + 80, color: '#3498db', radius: 60 }
                  ],
                  description: 'T\u00B2 = e\u2070 \u222A e\u00B9\u2090 \u222A e\u00B9\u1D47 \u222A e\u00B2'
                },
                rp2: {
                  name: '\u211DP\u00B2',
                  cells: [
                    { dim: 0, label: 'e\u2070', x: centerX - 100, y: centerY, color: '#e74c3c' },
                    { dim: 1, label: 'e\u00B9', x: centerX, y: centerY, color: '#27ae60' },
                    { dim: 2, label: 'e\u00B2', x: centerX + 100, y: centerY, color: '#3498db', radius: 50 }
                  ],
                  description: '\u211DP\u00B2 = e\u2070 \u222A e\u00B9 \u222A e\u00B2'
                }
              };

              var current = structures[state.structure];

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 20px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('CW Structure: ' + current.name, centerX, 30);
              ctx.font = '14px KaTeX_Main';
              ctx.fillText(current.description, centerX, 55);

              // Draw cells
              if (state.showCells) {
                current.cells.forEach(function(cell) {
                  if (cell.dim <= state.dimension) {
                    if (cell.dim === 0) {
                      // 0-cell (point)
                      ctx.fillStyle = cell.color;
                      ctx.beginPath();
                      ctx.arc(cell.x, cell.y, 8, 0, 2 * Math.PI);
                      ctx.fill();
                      ctx.fillStyle = '#000';
                      ctx.font = '14px KaTeX_Main';
                      ctx.fillText(cell.label, cell.x + 15, cell.y - 10);
                    } else if (cell.dim === 1) {
                      // 1-cell (arc)
                      ctx.strokeStyle = cell.color;
                      ctx.lineWidth = 4;
                      ctx.beginPath();
                      ctx.arc(cell.x, cell.y, 30, 0, Math.PI);
                      ctx.stroke();
                      ctx.fillStyle = '#000';
                      ctx.font = '14px KaTeX_Main';
                      ctx.fillText(cell.label, cell.x, cell.y + 50);
                    } else if (cell.dim === 2) {
                      // 2-cell (disk)
                      ctx.fillStyle = cell.color + '40';
                      ctx.strokeStyle = cell.color;
                      ctx.lineWidth = 3;
                      ctx.beginPath();
                      ctx.arc(cell.x, cell.y, cell.radius, 0, 2 * Math.PI);
                      ctx.fill();
                      ctx.stroke();
                      ctx.fillStyle = '#000';
                      ctx.font = '16px KaTeX_Main';
                      ctx.fillText(cell.label, cell.x, cell.y + 5);
                    }
                  }
                });
              }

              // Show attaching maps
              if (state.showAttaching && state.structure === 'sphere') {
                ctx.strokeStyle = '#9b59b6';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                var e0 = current.cells[0];
                var e2 = current.cells[1];
                ctx.moveTo(e2.x, e2.y - e2.radius);
                ctx.lineTo(e0.x, e0.y);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillStyle = '#9b59b6';
                ctx.font = '12px KaTeX_Main';
                ctx.fillText('\u2202e\u00B2 \u2192 e\u2070', centerX + 40, centerY - 30);
                ctx.fillText('(boundary collapses)', centerX + 40, centerY - 15);
              }

              // Cell count
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.textAlign = 'left';
              var cells0 = current.cells.filter(function(c) { return c.dim === 0; }).length;
              var cells1 = current.cells.filter(function(c) { return c.dim === 1; }).length;
              var cells2 = current.cells.filter(function(c) { return c.dim === 2; }).length;
              ctx.fillText('0-cells: ' + cells0, 10, height - 60);
              ctx.fillText('1-cells: ' + cells1, 10, height - 40);
              ctx.fillText('2-cells: ' + cells2, 10, height - 20);
            }

            // Select: structure
            var structLabel = document.createElement('label');
            structLabel.style.color = '#c9d1d9';
            structLabel.style.marginRight = '8px';
            structLabel.textContent = 'CW Structure: ';
            controls.appendChild(structLabel);
            var structSelect = document.createElement('select');
            structSelect.style.background = '#161b22'; structSelect.style.color = '#c9d1d9'; structSelect.style.border = '1px solid #30363d'; structSelect.style.padding = '4px 8px'; structSelect.style.borderRadius = '4px';
            [{value:'sphere',label:'S\u00B2 (Sphere)'},{value:'torus',label:'T\u00B2 (Torus)'},{value:'rp2',label:'\u211DP\u00B2 (Projective Plane)'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              structSelect.appendChild(o);
            });
            structSelect.value = 'sphere';
            structSelect.onchange = function() { state.structure = structSelect.value; draw(); };
            controls.appendChild(structSelect);

            // Slider: dimension
            var dimLabel = document.createElement('label');
            dimLabel.style.color = '#c9d1d9';
            dimLabel.style.marginLeft = '15px';
            dimLabel.style.marginRight = '8px';
            dimLabel.textContent = 'Show up to dimension: 2';
            controls.appendChild(dimLabel);
            var dimSlider = document.createElement('input');
            dimSlider.type = 'range';
            dimSlider.min = 0; dimSlider.max = 2; dimSlider.step = 1; dimSlider.value = 2;
            dimSlider.style.width = '120px';
            dimSlider.oninput = function() {
              state.dimension = parseInt(dimSlider.value);
              dimLabel.textContent = 'Show up to dimension: ' + dimSlider.value;
              draw();
            };
            controls.appendChild(dimSlider);

            // Checkbox: showCells
            var cellContainer = document.createElement('label');
            cellContainer.style.color = '#c9d1d9';
            cellContainer.style.marginLeft = '15px';
            cellContainer.style.cursor = 'pointer';
            var cellCheckbox = document.createElement('input');
            cellCheckbox.type = 'checkbox';
            cellCheckbox.checked = true;
            cellCheckbox.onchange = function() { state.showCells = cellCheckbox.checked; draw(); };
            cellContainer.appendChild(cellCheckbox);
            cellContainer.appendChild(document.createTextNode(' Show Cells'));
            controls.appendChild(cellContainer);

            // Checkbox: showAttaching
            var attachContainer = document.createElement('label');
            attachContainer.style.color = '#c9d1d9';
            attachContainer.style.marginLeft = '15px';
            attachContainer.style.cursor = 'pointer';
            var attachCheckbox = document.createElement('input');
            attachCheckbox.type = 'checkbox';
            attachCheckbox.checked = false;
            attachCheckbox.onchange = function() { state.showAttaching = attachCheckbox.checked; draw(); };
            attachContainer.appendChild(attachCheckbox);
            attachContainer.appendChild(document.createTextNode(' Show Attaching Maps'));
            controls.appendChild(attachContainer);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ex-cw-1',
          question: 'Describe a CW structure on the circle \\(S^1\\) with one 0-cell and one 1-cell. What is the attaching map?',
          hint: 'Attach \\(D^1 = [0, 1]\\) by sending both endpoints to the same point.',
          solution: 'Choose one 0-cell \\(e^0 = \\{\\text{pt}\\}\\). Then attach a 1-cell \\(e^1 = [0, 1]\\) via:\n          \\[\n          \\phi: \\partial D^1 = \\{0, 1\\} \\to e^0\n          \\]\n          sending both \\(0\\) and \\(1\\) to the single 0-cell. The result is \\(S^1 = e^0 \\cup e^1\\).\n\n          Cellular complex:\n          \\[\n          0 \\to \\mathbb{Z} \\xrightarrow{d_1 = 0} \\mathbb{Z} \\to 0\n          \\]\n          (boundary of the 1-cell is \\(1 - 1 = 0\\) since both ends attach to the same point).\n\n          Thus \\(H_0(S^1) = \\mathbb{Z}\\), \\(H_1(S^1) = \\mathbb{Z}\\). \\(\\square\\)'
        },
        {
          id: 'ex-cw-2',
          question: 'Show that \\(\\mathbb{R}P^2\\) has a CW structure with cells \\(e^0, e^1, e^2\\). Describe the attaching maps.',
          hint: 'Start with a point, attach a 1-cell (loop), then attach a 2-cell via the double cover \\(S^1 \\to S^1\\).',
          solution: '<strong>CW structure:</strong>\n          <ul>\n            <li>\\(X^0 = e^0\\): a single point.</li>\n            <li>\\(X^1 = e^0 \\cup e^1\\): attach \\(D^1\\) with both endpoints identified (forming \\(\\mathbb{R}P^1 \\cong S^1\\)).</li>\n            <li>\\(X^2 = \\mathbb{R}P^2\\): attach \\(D^2\\) via \\(\\phi: S^1 \\to \\mathbb{R}P^1\\), the 2-to-1 quotient map (identifies antipodal points).</li>\n          </ul>\n\n          <strong>Attaching map for \\(e^2\\):</strong> The map \\(\\phi: S^1 \\to S^1\\), \\(z \\mapsto z^2\\) (degree 2 covering). This "wraps" the boundary of the 2-disk twice around \\(\\mathbb{R}P^1\\), creating the twisted topology of \\(\\mathbb{R}P^2\\).\n\n          <strong>Cellular chain complex:</strong>\n          \\[\n          0 \\to \\mathbb{Z} \\xrightarrow{d_2 = 2} \\mathbb{Z} \\xrightarrow{d_1 = 0} \\mathbb{Z} \\to 0\n          \\]\n          (The degree 2 map gives \\(d_2 = 2\\); we\'ll compute this carefully in Chapter 10.) \\(\\square\\)'
        }
      ]
    }
  ]
});
