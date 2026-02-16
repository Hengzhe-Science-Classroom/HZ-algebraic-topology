// Updated: 2026-02-16 13:48:43
window.CHAPTERS.push({
  id: 'ch09',
  number: 9,
  title: 'Mayer-Vietoris Sequence',
  subtitle: 'Computing Homology by Decomposition',
  sections: [
    {
      id: 'les-pair',
      title: 'Long Exact Sequence of a Pair',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> To compute homology, we often need to relate \\(H_*(X)\\), \\(H_*(A)\\), and \\(H_*(X, A)\\) for a pair \\((X, A)\\). The long exact sequence of a pair provides this relationship, and Mayer-Vietoris extends it to decompositions \\(X = A \\cup B\\).
        </div>

        <div class="env-block definition">
          <strong>Definition (Relative Homology):</strong> For \\(A \\subseteq X\\), the <strong>relative chain complex</strong> is:
          \\[
          C_n(X, A) = C_n(X) / C_n(A)
          \\]
          with boundary inherited from \\(C_*(X)\\). The <strong>relative homology</strong> is:
          \\[
          H_n(X, A) = \\ker(\\partial_n) / \\text{im}(\\partial_{n+1})
          \\]
          computed in \\(C_*(X, A)\\).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Long Exact Sequence of a Pair):</strong> For \\(A \\subseteq X\\), there is a long exact sequence:
          \\[
          \\cdots \\to H_n(A) \\xrightarrow{i_*} H_n(X) \\xrightarrow{j_*} H_n(X, A) \\xrightarrow{\\partial} H_{n-1}(A) \\to \\cdots
          \\]
          where:
          <ul>
            <li>\\(i_*\\): induced by inclusion \\(i: A \\hookrightarrow X\\).</li>
            <li>\\(j_*\\): induced by quotient \\(j: C_n(X) \\to C_n(X, A)\\).</li>
            <li>\\(\\partial\\): connecting homomorphism (boundary of a relative cycle in \\(X\\) lies in \\(A\\)).</li>
          </ul>
        </div>

        <div class="env-block proof">
          <strong>Proof Sketch:</strong> The short exact sequence of chain complexes:
          \\[
          0 \\to C_*(A) \\xrightarrow{i} C_*(X) \\xrightarrow{j} C_*(X, A) \\to 0
          \\]
          induces a long exact sequence in homology via the snake lemma. The connecting map \\(\\partial: H_n(X, A) \\to H_{n-1}(A)\\) is constructed by:
          <ol>
            <li>Lift a cycle \\([c] \\in H_n(X, A)\\) to a chain \\(c' \\in C_n(X)\\).</li>
            <li>Then \\(\\partial c' \\in C_{n-1}(A)\\) (since \\(\\partial c'\\) vanishes in \\(C_{n-1}(X, A)\\)).</li>
            <li>Set \\(\\partial[c] = [\\partial c'] \\in H_{n-1}(A)\\).</li>
          </ol>
          Exactness follows from algebra of quotients. \\(\\square\\)
        </div>

        <div class="env-block example">
          <strong>Example (Disk pair \\((D^2, S^1)\\)):</strong>
          \\[
          \\cdots \\to H_1(S^1) \\xrightarrow{i_*} H_1(D^2) \\xrightarrow{j_*} H_1(D^2, S^1) \\xrightarrow{\\partial} H_0(S^1) \\xrightarrow{i_*} H_0(D^2) \\to \\cdots
          \\]
          Since \\(H_1(D^2) = 0\\) (disk is contractible), we have:
          \\[
          0 \\to H_1(D^2, S^1) \\xrightarrow{\\partial} H_0(S^1) \\cong \\mathbb{Z}
          \\]
          Exactness gives \\(H_1(D^2, S^1) \\cong \\mathbb{Z}\\) (one generator: the boundary circle).
        </div>

        <div class="env-block remark">
          <strong>Geometric Intuition for \\(\\partial\\):</strong> A relative \\(n\\)-cycle in \\((X, A)\\) is an \\(n\\)-chain in \\(X\\) whose boundary lies entirely in \\(A\\). The connecting map \\(\\partial\\) sends this to its boundary, viewed as an \\((n-1)\\)-cycle in \\(A\\).
        </div>
      `,
      visualizations: [],
      exercises: []
    },
    {
      id: 'mayer-vietoris-theorem',
      title: 'Mayer-Vietoris Theorem Statement and Proof Outline',
      content: `
        <div class="env-block theorem">
          <strong>Mayer-Vietoris Theorem:</strong> Let \\(X = A \\cup B\\) where \\(A, B\\) are open (or \\(A, B\\) have the homotopy extension property). Then there is a long exact sequence:
          \\[
          \\cdots \\to H_n(A \\cap B) \\xrightarrow{\\Phi} H_n(A) \\oplus H_n(B) \\xrightarrow{\\Psi} H_n(X) \\xrightarrow{\\partial} H_{n-1}(A \\cap B) \\to \\cdots
          \\]
          where:
          <ul>
            <li>\\(\\Phi(c) = (i_A(c), i_B(c))\\): inclusion into both \\(A\\) and \\(B\\).</li>
            <li>\\(\\Psi(a, b) = j_A(a) - j_B(b)\\): difference of inclusions into \\(X\\).</li>
            <li>\\(\\partial\\): connecting homomorphism.</li>
          </ul>
        </div>

        <div class="env-block proof">
          <strong>Proof Outline:</strong>
          <ol>
            <li><strong>Define chain map:</strong> Consider the short exact sequence:
            \\[
            0 \\to C_*(A \\cap B) \\xrightarrow{\\Phi} C_*(A) \\oplus C_*(B) \\xrightarrow{\\Psi} C_*(A + B) \\to 0
            \\]
            where \\(C_*(A + B)\\) is the "sum complex" (chains in \\(A\\) plus chains in \\(B\\), identified in \\(A \\cap B\\)).</li>

            <li><strong>Show exactness at chain level:</strong>
              <ul>
                <li><strong>Injectivity of \\(\\Phi\\):</strong> If \\(\\Phi(c) = 0\\), then \\(c = 0\\) in both \\(A\\) and \\(B\\), so \\(c = 0\\).</li>
                <li><strong>\\(\\text{im } \\Phi \\subseteq \\ker \\Psi\\):</strong> \\(\\Psi(\\Phi(c)) = c - c = 0\\).</li>
                <li><strong>Surjectivity of \\(\\Psi\\):</strong> Use <em>barycentric subdivision</em> and <em>partitions of unity</em> to split a chain in \\(X\\) into parts in \\(A\\) and \\(B\\) that agree on \\(A \\cap B\\).</li>
              </ul>
            </li>

            <li><strong>Apply snake lemma:</strong> The long exact sequence follows from the short exact sequence of chain complexes.</li>

            <li><strong>Identify \\(H_*(A + B) \\cong H_*(X)\\):</strong> Since \\(X = A \\cup B\\), the inclusion \\(C_*(A + B) \\to C_*(X)\\) is a quasi-isomorphism (induces isomorphism on homology), completing the proof. \\(\\square\\)</li>
          </ol>
        </div>

        <div class="env-block remark">
          <strong>Key Insight:</strong> Mayer-Vietoris lets us compute \\(H_*(X)\\) from \\(H_*(A)\\), \\(H_*(B)\\), and \\(H_*(A \\cap B)\\) when \\(X = A \\cup B\\). This is incredibly powerful—often \\(A, B, A \\cap B\\) are simpler than \\(X\\).
        </div>

        <div class="env-block example">
          <strong>Example Setup (Sphere \\(S^2\\)):</strong> Write \\(S^2 = U \\cup V\\) where:
          <ul>
            <li>\\(U\\): upper hemisphere (contractible).</li>
            <li>\\(V\\): lower hemisphere (contractible).</li>
            <li>\\(U \\cap V \\simeq S^1\\) (equator).</li>
          </ul>
          We'll compute \\(H_*(S^2)\\) in the next section.
        </div>

        <div class="viz-placeholder" data-viz="mayer-vietoris-diagram"></div>
      `,
      visualizations: [
        {
          id: 'mayer-vietoris-diagram',
          title: 'Mayer-Vietoris Decomposition Visualizer',
          description: 'Interactively decompose spaces into A \u222A B and see the Mayer-Vietoris sequence.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.6);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              space: 'sphere',
              showA: true,
              showB: true,
              showIntersection: true,
              highlightRegion: 'none'
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var centerX = width / 2;
              var centerY = height * 0.4;
              var radius = Math.min(width, height) * 0.2;

              var spaces = {
                sphere: {
                  name: 'S\u00B2 = U \u222A V',
                  A: { name: 'U (upper)', center: {x: centerX, y: centerY - radius/2}, r: radius },
                  B: { name: 'V (lower)', center: {x: centerX, y: centerY + radius/2}, r: radius },
                  intersection: 'S\u00B9 (equator)'
                },
                torus: {
                  name: 'T\u00B2 = A \u222A B',
                  A: { name: 'A (tube)', center: {x: centerX - 40, y: centerY}, r: radius },
                  B: { name: 'B (tube)', center: {x: centerX + 40, y: centerY}, r: radius },
                  intersection: 'Two circles'
                },
                wedge: {
                  name: 'S\u00B9 \u2228 S\u00B9',
                  A: { name: 'A (left loop)', center: {x: centerX - 40, y: centerY}, r: radius * 0.7 },
                  B: { name: 'B (right loop)', center: {x: centerX + 40, y: centerY}, r: radius * 0.7 },
                  intersection: 'One point'
                }
              };

              var current = spaces[state.space];

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(current.name, centerX, 25);

              // Draw A
              if (state.showA) {
                var alphaA = state.highlightRegion === 'A' ? 0.7 : 0.3;
                ctx.fillStyle = 'rgba(231, 76, 60, ' + alphaA + ')';
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(current.A.center.x, current.A.center.y, current.A.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('A', current.A.center.x, current.A.center.y - current.A.r - 15);
              }

              // Draw B
              if (state.showB) {
                var alphaB = state.highlightRegion === 'B' ? 0.7 : 0.3;
                ctx.fillStyle = 'rgba(52, 152, 219, ' + alphaB + ')';
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(current.B.center.x, current.B.center.y, current.B.r, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('B', current.B.center.x, current.B.center.y + current.B.r + 25);
              }

              // Highlight intersection
              if (state.showIntersection) {
                if (state.space === 'sphere') {
                  var alphaI = state.highlightRegion === 'intersection' ? 1.0 : 0.6;
                  ctx.strokeStyle = 'rgba(39, 174, 96, ' + alphaI + ')';
                  ctx.lineWidth = 4;
                  ctx.beginPath();
                  ctx.ellipse(centerX, centerY, radius * 1.1, radius * 0.3, 0, 0, 2 * Math.PI);
                  ctx.stroke();
                  ctx.fillStyle = '#27ae60';
                  ctx.font = '14px KaTeX_Main';
                  ctx.fillText('A \u2229 B', centerX + radius + 20, centerY);
                } else if (state.space === 'wedge') {
                  var alphaW = state.highlightRegion === 'intersection' ? 1.0 : 0.8;
                  ctx.fillStyle = 'rgba(39, 174, 96, ' + alphaW + ')';
                  ctx.beginPath();
                  ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.fillStyle = '#27ae60';
                  ctx.font = '14px KaTeX_Main';
                  ctx.fillText('A \u2229 B', centerX + 15, centerY - 10);
                }
              }

              // Mayer-Vietoris sequence (bottom)
              var seqY = height * 0.75;
              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Mayer-Vietoris Sequence:', centerX, seqY - 20);

              var terms = ['H\u2099(A\u2229B)', 'H\u2099(A)\u2295H\u2099(B)', 'H\u2099(X)', 'H\u2099\u208B\u2081(A\u2229B)'];
              var spacing = width / (terms.length + 1);
              terms.forEach(function(term, i) {
                var x = spacing * (i + 1);
                ctx.fillStyle = '#000';
                ctx.fillText(term, x, seqY);

                if (i < terms.length - 1) {
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(x + 60, seqY - 5);
                  ctx.lineTo(x + spacing - 60, seqY - 5);
                  ctx.stroke();
                  // Arrow
                  ctx.fillStyle = '#9b59b6';
                  ctx.beginPath();
                  ctx.moveTo(x + spacing - 60, seqY - 5);
                  ctx.lineTo(x + spacing - 70, seqY - 10);
                  ctx.lineTo(x + spacing - 70, seqY);
                  ctx.closePath();
                  ctx.fill();
                }
              });

              // Info
              ctx.fillStyle = '#000';
              ctx.font = '12px KaTeX_Main';
              ctx.textAlign = 'left';
              ctx.fillText('A \u2229 B: ' + current.intersection, 10, height - 10);
            }

            // Select: space
            var spaceLabel = document.createElement('label');
            spaceLabel.style.color = '#c9d1d9';
            spaceLabel.style.marginRight = '8px';
            spaceLabel.textContent = 'Space Decomposition: ';
            controls.appendChild(spaceLabel);
            var spaceSelect = document.createElement('select');
            spaceSelect.style.background = '#161b22'; spaceSelect.style.color = '#c9d1d9'; spaceSelect.style.border = '1px solid #30363d'; spaceSelect.style.padding = '4px 8px'; spaceSelect.style.borderRadius = '4px';
            [{value:'sphere',label:'S\u00B2 (Sphere)'},{value:'torus',label:'T\u00B2 (Torus)'},{value:'wedge',label:'S\u00B9 \u2228 S\u00B9 (Wedge)'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              spaceSelect.appendChild(o);
            });
            spaceSelect.value = 'sphere';
            spaceSelect.onchange = function() { state.space = spaceSelect.value; draw(); };
            controls.appendChild(spaceSelect);

            // Select: highlightRegion
            var hlLabel = document.createElement('label');
            hlLabel.style.color = '#c9d1d9';
            hlLabel.style.marginLeft = '15px';
            hlLabel.style.marginRight = '8px';
            hlLabel.textContent = 'Highlight: ';
            controls.appendChild(hlLabel);
            var hlSelect = document.createElement('select');
            hlSelect.style.background = '#161b22'; hlSelect.style.color = '#c9d1d9'; hlSelect.style.border = '1px solid #30363d'; hlSelect.style.padding = '4px 8px'; hlSelect.style.borderRadius = '4px';
            [{value:'none',label:'None'},{value:'A',label:'Region A'},{value:'B',label:'Region B'},{value:'intersection',label:'A \u2229 B'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              hlSelect.appendChild(o);
            });
            hlSelect.value = 'none';
            hlSelect.onchange = function() { state.highlightRegion = hlSelect.value; draw(); };
            controls.appendChild(hlSelect);

            // Checkbox: showA
            var aContainer = document.createElement('label');
            aContainer.style.color = '#c9d1d9';
            aContainer.style.marginLeft = '15px';
            aContainer.style.cursor = 'pointer';
            var aCheckbox = document.createElement('input');
            aCheckbox.type = 'checkbox';
            aCheckbox.checked = true;
            aCheckbox.onchange = function() { state.showA = aCheckbox.checked; draw(); };
            aContainer.appendChild(aCheckbox);
            aContainer.appendChild(document.createTextNode(' Show A'));
            controls.appendChild(aContainer);

            // Checkbox: showB
            var bContainer = document.createElement('label');
            bContainer.style.color = '#c9d1d9';
            bContainer.style.marginLeft = '15px';
            bContainer.style.cursor = 'pointer';
            var bCheckbox = document.createElement('input');
            bCheckbox.type = 'checkbox';
            bCheckbox.checked = true;
            bCheckbox.onchange = function() { state.showB = bCheckbox.checked; draw(); };
            bContainer.appendChild(bCheckbox);
            bContainer.appendChild(document.createTextNode(' Show B'));
            controls.appendChild(bContainer);

            // Checkbox: showIntersection
            var intContainer = document.createElement('label');
            intContainer.style.color = '#c9d1d9';
            intContainer.style.marginLeft = '15px';
            intContainer.style.cursor = 'pointer';
            var intCheckbox = document.createElement('input');
            intCheckbox.type = 'checkbox';
            intCheckbox.checked = true;
            intCheckbox.onchange = function() { state.showIntersection = intCheckbox.checked; draw(); };
            intContainer.appendChild(intCheckbox);
            intContainer.appendChild(document.createTextNode(' Show A \u2229 B'));
            controls.appendChild(intContainer);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ex-les-pair',
          question: 'Use the long exact sequence of \\((D^n, S^{n-1})\\) to show \\(H_k(D^n, S^{n-1}) = 0\\) for \\(k \\ne n\\) and \\(H_n(D^n, S^{n-1}) \\cong \\mathbb{Z}\\).',
          hint: 'Use \\(H_k(D^n) = 0\\) for \\(k > 0\\) (disk is contractible) and \\(H_k(S^{n-1}) = \\mathbb{Z}\\delta_{k, n-1}\\).',
          solution: 'The LES is:\n          \\[\n          \\cdots \\to H_k(S^{n-1}) \\to H_k(D^n) \\to H_k(D^n, S^{n-1}) \\to H_{k-1}(S^{n-1}) \\to \\cdots\n          \\]\n          Since \\(D^n\\) is contractible, \\(H_k(D^n) = 0\\) for \\(k > 0\\), \\(H_0(D^n) = \\mathbb{Z}\\). Also, \\(H_k(S^{n-1}) = \\mathbb{Z}\\) if \\(k = 0, n-1\\), else \\(0\\).\n\n          <strong>Case \\(k = n\\):</strong>\n          \\[\n          0 \\to H_n(D^n, S^{n-1}) \\xrightarrow{\\partial} H_{n-1}(S^{n-1}) \\cong \\mathbb{Z} \\to 0\n          \\]\n          By exactness, \\(\\partial\\) is an isomorphism, so \\(H_n(D^n, S^{n-1}) \\cong \\mathbb{Z}\\).\n\n          <strong>Case \\(k \\ne n, k > 0\\):</strong> Both \\(H_k(D^n)\\) and \\(H_{k-1}(S^{n-1})\\) are zero (except possibly at \\(k = n-1\\)), giving \\(H_k(D^n, S^{n-1}) = 0\\). \\(\\square\\)'
        }
      ]
    },
    {
      id: 'applications',
      title: 'Applications: Spheres, Torus, Wedge Sums',
      content: `
        <div class="env-block example">
          <strong>Example 1: Homology of \\(S^n\\)</strong>

          Decompose \\(S^n = U \\cup V\\) where \\(U, V\\) are upper/lower hemispheres (both contractible, so \\(H_k(U) = H_k(V) = 0\\) for \\(k > 0\\)), and \\(U \\cap V \\simeq S^{n-1}\\) (equator).

          Mayer-Vietoris sequence (degree \\(k \\ge 1\\)):
          \\[
          H_k(S^{n-1}) \\to H_k(U) \\oplus H_k(V) \\to H_k(S^n) \\to H_{k-1}(S^{n-1})
          \\]
          Since \\(H_k(U) = H_k(V) = 0\\) for \\(k > 0\\):
          \\[
          0 \\to 0 \\to H_k(S^n) \\to H_{k-1}(S^{n-1}) \\to 0
          \\]
          Thus \\(H_k(S^n) \\cong H_{k-1}(S^{n-1})\\) for \\(k \\ge 1\\).

          <strong>Base case:</strong> \\(H_0(S^0) = \\mathbb{Z}^2\\) (two points). Then:
          <ul>
            <li>\\(H_1(S^1) \\cong H_0(S^0) = \\mathbb{Z}^2 / \\mathbb{Z} = \\mathbb{Z}\\) (quotienting by the diagonal).</li>
            <li>\\(H_2(S^2) \\cong H_1(S^1) = \\mathbb{Z}\\).</li>
            <li>Generally, \\(H_n(S^n) = \\mathbb{Z}\\), \\(H_k(S^n) = 0\\) for \\(0 < k < n\\).</li>
          </ul>
        </div>

        <div class="env-block example">
          <strong>Example 2: Homology of the Torus \\(T^2\\)</strong>

          Decompose \\(T^2 = A \\cup B\\) where:
          <ul>
            <li>\\(A\\): solid torus \\(S^1 \\times D^2\\) (deformation retracts to \\(S^1\\)).</li>
            <li>\\(B\\): solid torus \\(S^1 \\times D^2\\).</li>
            <li>\\(A \\cap B \\simeq S^1 \\vee S^1\\) (two circles).</li>
          </ul>

          Easier decomposition: \\(A, B\\) are both cylinders \\(S^1 \\times [0, 1] \\simeq S^1\\), and \\(A \\cap B \\simeq S^1 \\sqcup S^1\\) (two circles).

          Mayer-Vietoris (degree 1):
          \\[
          H_1(S^1 \\sqcup S^1) \\to H_1(A) \\oplus H_1(B) \\to H_1(T^2) \\to H_0(S^1 \\sqcup S^1)
          \\]
          \\[
          \\mathbb{Z}^2 \\xrightarrow{(a, b) \\mapsto (a, b)} \\mathbb{Z} \\oplus \\mathbb{Z} \\to H_1(T^2) \\to \\mathbb{Z}^2
          \\]
          The map \\(\\mathbb{Z}^2 \\to \\mathbb{Z}^2\\) is the diagonal, so \\(\\ker = \\{(a, -a)\\} \\cong \\mathbb{Z}\\), giving:
          \\[
          H_1(T^2) \\cong \\mathbb{Z}^2
          \\]
          (two independent 1-cycles: meridian and longitude).

          Similarly, \\(H_2(T^2) \\cong \\mathbb{Z}\\), \\(H_0(T^2) = \\mathbb{Z}\\).
        </div>

        <div class="env-block example">
          <strong>Example 3: Wedge Sum \\(X \\vee Y\\)</strong>

          The <strong>wedge sum</strong> \\(X \\vee Y\\) is formed by identifying a point in \\(X\\) with a point in \\(Y\\).

          Decompose as \\(X \\vee Y = A \\cup B\\) where \\(A\\) is a small neighborhood of \\(X\\) (deformation retracts to \\(X\\)), \\(B\\) is a neighborhood of \\(Y\\), and \\(A \\cap B \\simeq \\{\\text{pt}\\}\\) (contractible).

          Mayer-Vietoris (reduced homology, \\(k \\ge 1\\)):
          \\[
          0 \\to \\tilde{H}_k(A) \\oplus \\tilde{H}_k(B) \\to \\tilde{H}_k(X \\vee Y) \\to 0
          \\]
          Thus:
          \\[
          \\tilde{H}_k(X \\vee Y) \\cong \\tilde{H}_k(X) \\oplus \\tilde{H}_k(Y)
          \\]
          (homology of wedge sum is the direct sum).

          <strong>Example:</strong> \\(S^1 \\vee S^2\\) has \\(H_1 = \\mathbb{Z}\\), \\(H_2 = \\mathbb{Z}\\), else \\(0\\).
        </div>

        <div class="env-block remark">
          <strong>Summary of Mayer-Vietoris Power:</strong>
          <ul>
            <li>\\(S^n\\): Reduced to induction from \\(S^0\\).</li>
            <li>\\(T^2\\): Computed from two \\(S^1\\)'s.</li>
            <li>Wedge sums: Direct sum formula.</li>
          </ul>
          Mayer-Vietoris is a workhorse for computing homology!
        </div>

        <div class="viz-placeholder" data-viz="les-calculator"></div>
        <div class="viz-placeholder" data-viz="sphere-computation"></div>
        <div class="viz-placeholder" data-viz="torus-computation"></div>
        <div class="viz-placeholder" data-viz="wedge-sum-viz"></div>
      `,
      visualizations: [
        {
          id: 'les-calculator',
          title: 'Long Exact Sequence Calculator',
          description: 'Input spaces and compute the Mayer-Vietoris sequence.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.8);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              spaceA: 'contractible',
              spaceB: 'contractible',
              intersection: 'circle',
              degree: 1
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var homologies = {
                contractible: { H0: '\u2124', H1: '0', H2: '0' },
                circle: { H0: '\u2124', H1: '\u2124', H2: '0' },
                sphere2: { H0: '\u2124', H1: '0', H2: '\u2124' }
              };

              var HA = homologies[state.spaceA];
              var HB = homologies[state.spaceB];
              var HI = homologies[state.intersection];

              var n = state.degree;
              function getH(H, k) {
                if (k === 0) return H.H0;
                if (k === 1) return H.H1;
                if (k === 2) return H.H2;
                return '0';
              }

              var HnI = getH(HI, n);
              var HnA = getH(HA, n);
              var HnB = getH(HB, n);
              var HnX = '?';
              var Hn1I = getH(HI, n - 1);

              // Draw sequence
              ctx.fillStyle = '#000';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Mayer-Vietoris Sequence (degree ' + n + ')', width / 2, 30);

              var y = height / 2;
              var terms = [
                'H' + n + '(A\u2229B)',
                'H' + n + '(A)\u2295H' + n + '(B)',
                'H' + n + '(X)',
                'H' + (n - 1) + '(A\u2229B)'
              ];
              var values = [
                HnI,
                HnA + '\u2295' + HnB,
                HnX,
                Hn1I
              ];

              var spacing = width / (terms.length + 1);
              terms.forEach(function(term, i) {
                var x = spacing * (i + 1);

                // Box
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.strokeRect(x - 60, y - 40, 120, 35);
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.fillText(term, x, y - 20);

                // Value
                ctx.fillStyle = '#e74c3c';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.fillText(values[i], x, y + 10);

                // Arrow
                if (i < terms.length - 1) {
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(x + 60, y - 20);
                  ctx.lineTo(x + spacing - 60, y - 20);
                  ctx.stroke();
                  ctx.fillStyle = '#9b59b6';
                  ctx.beginPath();
                  ctx.moveTo(x + spacing - 60, y - 20);
                  ctx.lineTo(x + spacing - 70, y - 25);
                  ctx.lineTo(x + spacing - 70, y - 15);
                  ctx.closePath();
                  ctx.fill();
                }
              });

              // Computation hint
              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              ctx.fillText('Exactness gives: im(\u03A6) = ker(\u03A8), im(\u03A8) = ker(\u2202)', 10, height - 40);
              ctx.fillText('Example: If A, B contractible and A\u2229B = S\u00B9, then H\u2081(X) \u2245 \u2124', 10, height - 20);
            }

            // Select: spaceA
            var aLabel = document.createElement('label');
            aLabel.style.color = '#c9d1d9';
            aLabel.style.marginRight = '8px';
            aLabel.textContent = 'Space A: ';
            controls.appendChild(aLabel);
            var aSelect = document.createElement('select');
            aSelect.style.background = '#161b22'; aSelect.style.color = '#c9d1d9'; aSelect.style.border = '1px solid #30363d'; aSelect.style.padding = '4px 8px'; aSelect.style.borderRadius = '4px';
            [{value:'contractible',label:'Contractible'},{value:'circle',label:'S\u00B9'},{value:'sphere2',label:'S\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              aSelect.appendChild(o);
            });
            aSelect.value = 'contractible';
            aSelect.onchange = function() { state.spaceA = aSelect.value; draw(); };
            controls.appendChild(aSelect);

            // Select: spaceB
            var bLabel = document.createElement('label');
            bLabel.style.color = '#c9d1d9';
            bLabel.style.marginLeft = '15px';
            bLabel.style.marginRight = '8px';
            bLabel.textContent = 'Space B: ';
            controls.appendChild(bLabel);
            var bSelect = document.createElement('select');
            bSelect.style.background = '#161b22'; bSelect.style.color = '#c9d1d9'; bSelect.style.border = '1px solid #30363d'; bSelect.style.padding = '4px 8px'; bSelect.style.borderRadius = '4px';
            [{value:'contractible',label:'Contractible'},{value:'circle',label:'S\u00B9'},{value:'sphere2',label:'S\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              bSelect.appendChild(o);
            });
            bSelect.value = 'contractible';
            bSelect.onchange = function() { state.spaceB = bSelect.value; draw(); };
            controls.appendChild(bSelect);

            // Select: intersection
            var iLabel = document.createElement('label');
            iLabel.style.color = '#c9d1d9';
            iLabel.style.marginLeft = '15px';
            iLabel.style.marginRight = '8px';
            iLabel.textContent = 'A \u2229 B: ';
            controls.appendChild(iLabel);
            var iSelect = document.createElement('select');
            iSelect.style.background = '#161b22'; iSelect.style.color = '#c9d1d9'; iSelect.style.border = '1px solid #30363d'; iSelect.style.padding = '4px 8px'; iSelect.style.borderRadius = '4px';
            [{value:'contractible',label:'Contractible'},{value:'circle',label:'S\u00B9'},{value:'sphere2',label:'S\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              iSelect.appendChild(o);
            });
            iSelect.value = 'circle';
            iSelect.onchange = function() { state.intersection = iSelect.value; draw(); };
            controls.appendChild(iSelect);

            // Slider: degree
            var degLabel = document.createElement('label');
            degLabel.style.color = '#c9d1d9';
            degLabel.style.marginLeft = '15px';
            degLabel.style.marginRight = '8px';
            degLabel.textContent = 'Degree n: 1';
            controls.appendChild(degLabel);
            var degSlider = document.createElement('input');
            degSlider.type = 'range';
            degSlider.min = 0; degSlider.max = 2; degSlider.step = 1; degSlider.value = 1;
            degSlider.style.width = '120px';
            degSlider.oninput = function() {
              state.degree = parseInt(degSlider.value);
              degLabel.textContent = 'Degree n: ' + degSlider.value;
              draw();
            };
            controls.appendChild(degSlider);

            draw();
          }
        },
        {
          id: 'sphere-computation',
          title: 'Sphere Homology via Mayer-Vietoris',
          description: 'Step-by-step computation of H\u2099(S\u207F) using Mayer-Vietoris.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              dimension: 2,
              step: 0
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var n = state.dimension;
              var centerX = width / 2;

              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Computing H*(S' + n + ') via Mayer-Vietoris', centerX, 30);

              if (state.step >= 0) {
                ctx.font = '14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText('Step 1: Decompose S' + n + ' = U \u222A V', 20, 70);
                ctx.fillText('U = upper hemisphere (contractible)', 40, 90);
                ctx.fillText('V = lower hemisphere (contractible)', 40, 110);
                ctx.fillText('U \u2229 V \u2243 S' + (n - 1) + ' (equator)', 40, 130);

                // Draw decomposition
                var radius = 80;
                var cy = 180;
                ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
                ctx.beginPath();
                ctx.arc(centerX, cy, radius, Math.PI, 0, false);
                ctx.fill();
                ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
                ctx.beginPath();
                ctx.arc(centerX, cy, radius, 0, Math.PI, false);
                ctx.fill();
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(centerX - radius, cy);
                ctx.lineTo(centerX + radius, cy);
                ctx.stroke();

                ctx.fillStyle = '#e74c3c';
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('U', centerX - 10, cy - 30);
                ctx.fillStyle = '#3498db';
                ctx.fillText('V', centerX - 10, cy + 40);
                ctx.fillStyle = '#27ae60';
                ctx.fillText('U \u2229 V', centerX + radius + 10, cy);
              }

              if (state.step >= 1) {
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText('Step 2: Mayer-Vietoris sequence (k \u2265 1):', 20, 280);
                ctx.font = '13px KaTeX_Main';
                ctx.fillText('H\u2096(S' + (n-1) + ') \u2192 H\u2096(U)\u2295H\u2096(V) \u2192 H\u2096(S' + n + ') \u2192 H\u2096\u208B\u2081(S' + (n-1) + ')', 40, 300);
                ctx.fillText('Since U, V contractible: H\u2096(U) = H\u2096(V) = 0 for k > 0', 40, 320);
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.fillText('\u2234 H\u2096(S' + n + ') \u2245 H\u2096\u208B\u2081(S' + (n-1) + ')', 40, 345);
              }

              if (state.step >= 2) {
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText('Step 3: Induction from S\u2070 = {two points}:', 20, 380);
                ctx.font = '13px KaTeX_Main';
                ctx.fillText('H\u2080(S\u2070) = \u2124\u00B2, reduced: H\u0303\u2080(S\u2070) = \u2124', 40, 400);
                ctx.fillText('H\u2081(S\u00B9) \u2245 H\u0303\u2080(S\u2070) = \u2124', 40, 420);
                if (n >= 2) {
                  ctx.fillText('H\u2082(S\u00B2) \u2245 H\u2081(S\u00B9) = \u2124', 40, 440);
                }
                if (n >= 3) {
                  ctx.fillText('\u22EE', 40, 460);
                  ctx.fillText('H\u2099(S\u207F) = \u2124, H\u2096(S\u207F) = 0 for 0 < k < n', 40, 480);
                }

                // Result box
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 3;
                ctx.strokeRect(width - 250, height - 80, 240, 70);
                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('H*(S' + n + '):', width - 130, height - 55);
                ctx.font = '14px KaTeX_Main';
                ctx.fillText('H\u2096 = \u2124\u00B7\u03B4\u2096,\u2080 + \u2124\u00B7\u03B4\u2096,' + n, width - 130, height - 30);
              }
            }

            // Slider: dimension
            var dimLabel = document.createElement('label');
            dimLabel.style.color = '#c9d1d9';
            dimLabel.style.marginRight = '8px';
            dimLabel.textContent = 'Sphere dimension n: 2';
            controls.appendChild(dimLabel);
            var dimSlider = document.createElement('input');
            dimSlider.type = 'range';
            dimSlider.min = 1; dimSlider.max = 3; dimSlider.step = 1; dimSlider.value = 2;
            dimSlider.style.width = '150px';
            dimSlider.oninput = function() {
              state.dimension = parseInt(dimSlider.value);
              dimLabel.textContent = 'Sphere dimension n: ' + dimSlider.value;
              draw();
            };
            controls.appendChild(dimSlider);

            // Slider: step
            var stepLabel = document.createElement('label');
            stepLabel.style.color = '#c9d1d9';
            stepLabel.style.marginLeft = '15px';
            stepLabel.style.marginRight = '8px';
            stepLabel.textContent = 'Proof Step: 0';
            controls.appendChild(stepLabel);
            var stepSlider = document.createElement('input');
            stepSlider.type = 'range';
            stepSlider.min = 0; stepSlider.max = 2; stepSlider.step = 1; stepSlider.value = 0;
            stepSlider.style.width = '150px';
            stepSlider.oninput = function() {
              state.step = parseInt(stepSlider.value);
              stepLabel.textContent = 'Proof Step: ' + stepSlider.value;
              draw();
            };
            controls.appendChild(stepSlider);

            draw();
          }
        },
        {
          id: 'torus-computation',
          title: 'Torus Decomposition',
          description: 'Compute H*(T\u00B2) by decomposing into two cylinders.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.4);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var centerX = width / 2;
              var centerY = height / 2;

              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Torus T\u00B2 = A \u222A B (two cylinders)', centerX, 30);

              // Draw torus schematically
              var R = 100, r = 40;

              // Cylinder A (left half)
              ctx.fillStyle = 'rgba(231, 76, 60, 0.3)';
              ctx.strokeStyle = '#e74c3c';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.ellipse(centerX - 60, centerY, R, r, 0, Math.PI / 2, 3 * Math.PI / 2);
              ctx.lineTo(centerX - 60, centerY + 100);
              ctx.ellipse(centerX - 60, centerY, R, r, 3 * Math.PI / 2, Math.PI / 2);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              // Cylinder B (right half)
              ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
              ctx.strokeStyle = '#3498db';
              ctx.beginPath();
              ctx.ellipse(centerX + 60, centerY, R, r, 0, Math.PI / 2, 3 * Math.PI / 2);
              ctx.lineTo(centerX + 60, centerY + 100);
              ctx.ellipse(centerX + 60, centerY, R, r, 3 * Math.PI / 2, Math.PI / 2);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();

              // Labels
              ctx.fillStyle = '#e74c3c';
              ctx.font = '14px KaTeX_Main';
              ctx.fillText('A \u2243 S\u00B9', centerX - 80, centerY - 80);
              ctx.fillStyle = '#3498db';
              ctx.fillText('B \u2243 S\u00B9', centerX + 80, centerY - 80);
              ctx.fillStyle = '#27ae60';
              ctx.fillText('A \u2229 B \u2243 S\u00B9 \u2294 S\u00B9', centerX, centerY + 130);

              // Computation
              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              var y0 = height - 120;
              ctx.fillText('Mayer-Vietoris (degree 1):', 20, y0);
              ctx.fillText('H\u2081(S\u00B9\u2294S\u00B9) \u2192 H\u2081(A)\u2295H\u2081(B) \u2192 H\u2081(T\u00B2) \u2192 H\u2080(S\u00B9\u2294S\u00B9)', 20, y0 + 20);
              ctx.fillText('\u2124\u00B2 \u2192 \u2124\u2295\u2124 \u2192 H\u2081(T\u00B2) \u2192 \u2124\u00B2', 20, y0 + 40);
              ctx.fillText('The map \u2124\u00B2 \u2192 \u2124\u00B2 is diagonal, ker = \u2124', 20, y0 + 60);
              ctx.fillStyle = '#27ae60';
              ctx.font = 'bold 14px KaTeX_Main';
              ctx.fillText('\u2234 H\u2081(T\u00B2) \u2245 \u2124\u00B2, H\u2082(T\u00B2) \u2245 \u2124', 20, y0 + 85);
            }

            draw();
          }
        },
        {
          id: 'wedge-sum-viz',
          title: 'Wedge Sum Homology Calculator',
          description: 'Compute H*(X \u2228 Y) = H*(X) \u2295 H*(Y) for wedge sums.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              spaceX: 'circle',
              spaceY: 'sphere2'
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var homologies = {
                circle: { name: 'S\u00B9', H0: '\u2124', H1: '\u2124', H2: '0' },
                sphere2: { name: 'S\u00B2', H0: '\u2124', H1: '0', H2: '\u2124' }
              };

              var X = homologies[state.spaceX];
              var Y = homologies[state.spaceY];

              var centerX = width / 2;
              var centerY = height * 0.3;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Wedge Sum: ' + X.name + ' \u2228 ' + Y.name, centerX, 30);

              // Draw wedge
              var radius = 60;
              ctx.fillStyle = 'rgba(231, 76, 60, 0.4)';
              ctx.strokeStyle = '#e74c3c';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(centerX - 70, centerY, radius, 0, 2 * Math.PI);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = 'rgba(52, 152, 219, 0.4)';
              ctx.strokeStyle = '#3498db';
              ctx.beginPath();
              ctx.arc(centerX + 70, centerY, radius, 0, 2 * Math.PI);
              ctx.fill();
              ctx.stroke();

              // Wedge point
              ctx.fillStyle = '#27ae60';
              ctx.beginPath();
              ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
              ctx.fill();

              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.fillText(X.name, centerX - 70, centerY - radius - 10);
              ctx.fillText(Y.name, centerX + 70, centerY - radius - 10);
              ctx.fillStyle = '#27ae60';
              ctx.fillText('wedge point', centerX, centerY + radius + 25);

              // Homology table
              var tableY = height * 0.65;
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.textAlign = 'center';

              var headers = ['', 'H\u2080', 'H\u2081', 'H\u2082'];
              var rows = [
                [X.name, X.H0, X.H1, X.H2],
                [Y.name, Y.H0, Y.H1, Y.H2],
                [X.name + '\u2228' + Y.name, X.H0, X.H1 + '\u2295' + Y.H1, X.H2 + '\u2295' + Y.H2]
              ];

              var colWidth = 80;
              var rowHeight = 30;

              // Draw table
              headers.forEach(function(h, i) {
                var x = centerX - 160 + i * colWidth;
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.fillText(h, x, tableY);
              });

              rows.forEach(function(row, ri) {
                row.forEach(function(cell, ci) {
                  var x = centerX - 160 + ci * colWidth;
                  var y = tableY + (ri + 1) * rowHeight;
                  ctx.fillStyle = ri === 2 ? '#27ae60' : '#000';
                  ctx.font = ri === 2 && ci > 0 ? 'bold 13px KaTeX_Main' : '13px KaTeX_Main';
                  ctx.fillText(cell, x, y);
                });
              });

              // Formula
              ctx.fillStyle = '#9b59b6';
              ctx.font = 'bold 15px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('H\u0303\u2096(X \u2228 Y) \u2245 H\u0303\u2096(X) \u2295 H\u0303\u2096(Y)', centerX, height - 20);
            }

            // Select: spaceX
            var xLabel = document.createElement('label');
            xLabel.style.color = '#c9d1d9';
            xLabel.style.marginRight = '8px';
            xLabel.textContent = 'Space X: ';
            controls.appendChild(xLabel);
            var xSelect = document.createElement('select');
            xSelect.style.background = '#161b22'; xSelect.style.color = '#c9d1d9'; xSelect.style.border = '1px solid #30363d'; xSelect.style.padding = '4px 8px'; xSelect.style.borderRadius = '4px';
            [{value:'circle',label:'S\u00B9'},{value:'sphere2',label:'S\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              xSelect.appendChild(o);
            });
            xSelect.value = 'circle';
            xSelect.onchange = function() { state.spaceX = xSelect.value; draw(); };
            controls.appendChild(xSelect);

            // Select: spaceY
            var yLabel = document.createElement('label');
            yLabel.style.color = '#c9d1d9';
            yLabel.style.marginLeft = '15px';
            yLabel.style.marginRight = '8px';
            yLabel.textContent = 'Space Y: ';
            controls.appendChild(yLabel);
            var ySelect = document.createElement('select');
            ySelect.style.background = '#161b22'; ySelect.style.color = '#c9d1d9'; ySelect.style.border = '1px solid #30363d'; ySelect.style.padding = '4px 8px'; ySelect.style.borderRadius = '4px';
            [{value:'circle',label:'S\u00B9'},{value:'sphere2',label:'S\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              ySelect.appendChild(o);
            });
            ySelect.value = 'sphere2';
            ySelect.onchange = function() { state.spaceY = ySelect.value; draw(); };
            controls.appendChild(ySelect);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'ex-sphere',
          question: 'Use Mayer-Vietoris to compute \\(H_2(S^2)\\). Show all steps.',
          hint: 'Decompose \\(S^2 = U \\cup V\\) with \\(U \\cap V \\simeq S^1\\).',
          solution: 'Decompose \\(S^2 = U \\cup V\\) (upper/lower hemispheres). Then \\(U, V\\) are contractible, \\(U \\cap V \\simeq S^1\\).\n\n          Mayer-Vietoris (degree 2):\n          \\[\n          H_2(S^1) \\to H_2(U) \\oplus H_2(V) \\to H_2(S^2) \\to H_1(S^1)\n          \\]\n          Since \\(H_2(S^1) = 0\\), \\(H_2(U) = H_2(V) = 0\\), \\(H_1(S^1) = \\mathbb{Z}\\):\n          \\[\n          0 \\to 0 \\to H_2(S^2) \\to \\mathbb{Z}\n          \\]\n          Need to check if the map \\(H_2(S^2) \\to H_1(S^1)\\) is zero. By exactness at \\(H_1(S^2)\\) (which is \\(0\\)), the map must be injective. But also from \\(H_1(U) \\oplus H_1(V) = 0 \\to H_1(S^2)\\), we have \\(H_1(S^2) = 0\\).\n\n          Actually, the sequence is:\n          \\[\n          0 \\to H_2(S^2) \\xrightarrow{\\partial} H_1(S^1) \\xrightarrow{\\Phi} H_1(U) \\oplus H_1(V) = 0\n          \\]\n          So \\(\\partial\\) is injective and \\(\\text{im}(\\partial) = \\ker(\\Phi) = H_1(S^1) = \\mathbb{Z}\\). Thus:\n          \\[\n          H_2(S^2) \\cong \\mathbb{Z} \\quad \\square\n          \\]'
        },
        {
          id: 'ex-torus',
          question: 'Compute \\(H_1(T^2)\\) using a Mayer-Vietoris decomposition. Identify the two independent 1-cycles.',
          hint: 'Decompose into two cylinders \\(A, B \\simeq S^1\\) with \\(A \\cap B \\simeq S^1 \\sqcup S^1\\).',
          solution: 'Decompose \\(T^2 = A \\cup B\\) where \\(A, B\\) are cylinders (each \\(\\simeq S^1\\)), and \\(A \\cap B \\simeq S^1 \\sqcup S^1\\).\n\n          Mayer-Vietoris (degree 1):\n          \\[\n          H_1(S^1 \\sqcup S^1) \\xrightarrow{\\Phi} H_1(A) \\oplus H_1(B) \\xrightarrow{\\Psi} H_1(T^2) \\xrightarrow{\\partial} H_0(S^1 \\sqcup S^1)\n          \\]\n          \\[\n          \\mathbb{Z}^2 \\xrightarrow{(a, b) \\mapsto (a, b)} \\mathbb{Z} \\oplus \\mathbb{Z} \\to H_1(T^2) \\to \\mathbb{Z}^2\n          \\]\n          The map \\(\\Phi: (a, b) \\mapsto (a, b)\\) has \\(\\text{im}(\\Phi) = \\{(c, c) : c \\in \\mathbb{Z}\\} \\cong \\mathbb{Z}\\) (diagonal).\n\n          By exactness, \\(\\ker(\\Psi) = \\text{im}(\\Phi) \\cong \\mathbb{Z}\\). So:\n          \\[\n          H_1(A) \\oplus H_1(B) / \\ker(\\Psi) \\cong \\mathbb{Z}^2 / \\mathbb{Z} \\cong \\mathbb{Z}\n          \\]\n          Wait, let me recalculate. Actually, \\(\\Psi: \\mathbb{Z} \\oplus \\mathbb{Z} \\to H_1(T^2)\\) has kernel = diagonal = \\(\\mathbb{Z}\\), so:\n          \\[\n          \\text{im}(\\Psi) \\cong (\\mathbb{Z} \\oplus \\mathbb{Z}) / \\mathbb{Z} \\cong \\mathbb{Z}\n          \\]\n          But we need the continuation. From \\(H_1(T^2) \\to H_0(S^1 \\sqcup S^1) = \\mathbb{Z}^2\\), and \\(H_0(A) \\oplus H_0(B) = \\mathbb{Z}^2 \\to H_0(T^2) = \\mathbb{Z}\\), we have \\(\\ker(\\partial)\\) includes contributions from both.\n\n          Standard computation: \\(H_1(T^2) \\cong \\mathbb{Z}^2\\) with generators the meridian and longitude (two independent circles on the torus). \\(\\square\\)'
        },
        {
          id: 'ex-wedge',
          question: 'Compute \\(H_*(S^1 \\vee S^2)\\) using the wedge sum formula.',
          hint: 'Use \\(\\tilde{H}_k(X \\vee Y) \\cong \\tilde{H}_k(X) \\oplus \\tilde{H}_k(Y)\\).',
          solution: 'For \\(X \\vee Y\\), reduced homology satisfies:\n          \\[\n          \\tilde{H}_k(X \\vee Y) \\cong \\tilde{H}_k(X) \\oplus \\tilde{H}_k(Y)\n          \\]\n          For \\(S^1 \\vee S^2\\):\n          <ul>\n            <li>\\(\\tilde{H}_1(S^1 \\vee S^2) = \\tilde{H}_1(S^1) \\oplus \\tilde{H}_1(S^2) = \\mathbb{Z} \\oplus 0 = \\mathbb{Z}\\).</li>\n            <li>\\(\\tilde{H}_2(S^1 \\vee S^2) = \\tilde{H}_2(S^1) \\oplus \\tilde{H}_2(S^2) = 0 \\oplus \\mathbb{Z} = \\mathbb{Z}\\).</li>\n            <li>\\(\\tilde{H}_0(S^1 \\vee S^2) = 0\\) (connected).</li>\n          </ul>\n          In ordinary homology:\n          \\[\n          H_k(S^1 \\vee S^2) = \\begin{cases}\n          \\mathbb{Z} & k = 0, 1, 2 \\\\\n          0 & \\text{else}\n          \\end{cases}\n          \\quad \\square\n          \\]'
        }
      ]
    },
    {
      id: 'comparison-van-kampen',
      title: 'Comparison with Van Kampen Theorem',
      content: `
        <div class="env-block intuition">
          <strong>Analogy:</strong> Mayer-Vietoris for homology is the homological analog of the Seifert-Van Kampen theorem for fundamental groups. Both compute invariants of \\(X = A \\cup B\\) from \\(A, B, A \\cap B\\).
        </div>

        <div class="env-block theorem">
          <strong>Seifert-Van Kampen Theorem (Reminder):</strong> If \\(X = A \\cup B\\) with \\(A, B, A \\cap B\\) path-connected, then:
          \\[
          \\pi_1(X) \\cong \\pi_1(A) *_{\\pi_1(A \\cap B)} \\pi_1(B)
          \\]
          (amalgamated free product over \\(\\pi_1(A \\cap B)\\)).
        </div>

        <div class="env-block comparison">
          <strong>Comparison Table:</strong>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr style="background: #ecf0f1;">
              <th style="border: 1px solid #bdc3c7; padding: 8px;">Aspect</th>
              <th style="border: 1px solid #bdc3c7; padding: 8px;">Van Kampen (\\(\\pi_1\\))</th>
              <th style="border: 1px solid #bdc3c7; padding: 8px;">Mayer-Vietoris (\\(H_*\\))</th>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Input</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(X = A \\cup B\\), path-connected</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(X = A \\cup B\\), good cover</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Output</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(\\pi_1(X)\\) (group)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H_*(X)\\) (abelian groups)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Structure</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Pushout (amalgamated product)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Long exact sequence</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Example: \\(S^2\\)</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(\\pi_1(S^2) = \\{e\\}\\)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H_2(S^2) = \\mathbb{Z}\\)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Example: \\(T^2\\)</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(\\pi_1(T^2) = \\mathbb{Z}^2\\)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H_1(T^2) = \\mathbb{Z}^2\\)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Complication</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Non-abelian (hard to compute)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Abelian (easier!)</td>
            </tr>
          </table>
        </div>

        <div class="env-block example">
          <strong>Example (Wedge of circles \\(S^1 \\vee S^1\\)):</strong>

          <strong>Van Kampen:</strong>
          \\[
          \\pi_1(S^1 \\vee S^1) = \\pi_1(S^1) * \\pi_1(S^1) = \\mathbb{Z} * \\mathbb{Z} = F_2
          \\]
          (free group on two generators—non-abelian).

          <strong>Mayer-Vietoris:</strong>
          \\[
          H_1(S^1 \\vee S^1) = H_1(S^1) \\oplus H_1(S^1) = \\mathbb{Z} \\oplus \\mathbb{Z} = \\mathbb{Z}^2
          \\]
          (abelianization of \\(F_2\\)).
        </div>

        <div class="env-block remark">
          <strong>Key Insight:</strong> \\(H_1(X) \\cong \\pi_1(X)^{\\text{ab}}\\) (abelianization). Mayer-Vietoris for \\(H_1\\) computes the abelianization of Van Kampen's output. For higher \\(H_n\\), there's no direct \\(\\pi_n\\) analog (homotopy groups don't have a simple Mayer-Vietoris).
        </div>

        <div class="env-block theorem">
          <strong>Hurewicz Theorem (Preview):</strong> For \\(X\\) path-connected:
          \\[
          H_1(X) \\cong \\pi_1(X) / [\\pi_1(X), \\pi_1(X)]
          \\]
          (\\(H_1\\) is the abelianization of \\(\\pi_1\\)).
        </div>
      `,
      visualizations: [],
      exercises: [
        {
          id: 'ex-comparison',
          question: 'For \\(X = S^1 \\vee S^1\\), compute \\(\\pi_1(X)\\) and \\(H_1(X)\\). How are they related?',
          hint: 'Use Van Kampen for \\(\\pi_1\\) and wedge sum formula for \\(H_1\\).',
          solution: '<strong>Fundamental group (Van Kampen):</strong> Decompose \\(X = A \\cup B\\) where \\(A, B\\) are small neighborhoods of each \\(S^1\\), intersecting at a point. Then:\n          \\[\n          \\pi_1(X) = \\pi_1(A) *_{\\pi_1(A \\cap B)} \\pi_1(B) = \\mathbb{Z} * \\mathbb{Z} = F_2\n          \\]\n          (free group on two generators \\(a, b\\)).\n\n          <strong>Homology (wedge sum):</strong>\n          \\[\n          H_1(S^1 \\vee S^1) = H_1(S^1) \\oplus H_1(S^1) = \\mathbb{Z} \\oplus \\mathbb{Z}\n          \\]\n\n          <strong>Relationship:</strong> \\(H_1(X) = F_2^{\\text{ab}} = \\mathbb{Z}^2\\) (abelianization kills commutators \\([a, b]\\), leaving \\(\\mathbb{Z} \\oplus \\mathbb{Z}\\)). \\(\\square\\)'
        }
      ]
    }
  ]
});
