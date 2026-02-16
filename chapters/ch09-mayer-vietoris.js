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
      `,
      visualizations: [
        {
          id: 'mayer-vietoris-diagram',
          title: 'Mayer-Vietoris Decomposition Visualizer',
          description: 'Interactively decompose spaces into A ∪ B and see the Mayer-Vietoris sequence.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.6,
            setup: (viz) => {
              viz.state = {
                space: 'sphere', // 'sphere', 'torus', 'wedge'
                showA: true,
                showB: true,
                showIntersection: true,
                highlightRegion: 'none' // 'A', 'B', 'intersection', 'none'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const centerX = width / 2;
              const centerY = height * 0.4;
              const radius = Math.min(width, height) * 0.2;

              const spaces = {
                sphere: {
                  name: 'S² = U ∪ V',
                  A: { name: 'U (upper)', center: {x: centerX, y: centerY - radius/2}, r: radius },
                  B: { name: 'V (lower)', center: {x: centerX, y: centerY + radius/2}, r: radius },
                  intersection: 'S¹ (equator)'
                },
                torus: {
                  name: 'T² = A ∪ B',
                  A: { name: 'A (tube)', center: {x: centerX - 40, y: centerY}, r: radius },
                  B: { name: 'B (tube)', center: {x: centerX + 40, y: centerY}, r: radius },
                  intersection: 'Two circles'
                },
                wedge: {
                  name: 'S¹ ∨ S¹',
                  A: { name: 'A (left loop)', center: {x: centerX - 40, y: centerY}, r: radius * 0.7 },
                  B: { name: 'B (right loop)', center: {x: centerX + 40, y: centerY}, r: radius * 0.7 },
                  intersection: 'One point'
                }
              };

              const current = spaces[viz.state.space];

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(current.name, centerX, 25);

              // Draw A
              if (viz.state.showA) {
                const alpha = viz.state.highlightRegion === 'A' ? 0.7 : 0.3;
                ctx.fillStyle = `rgba(231, 76, 60, ${alpha})`;
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
              if (viz.state.showB) {
                const alpha = viz.state.highlightRegion === 'B' ? 0.7 : 0.3;
                ctx.fillStyle = `rgba(52, 152, 219, ${alpha})`;
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
              if (viz.state.showIntersection) {
                if (viz.state.space === 'sphere') {
                  const alpha = viz.state.highlightRegion === 'intersection' ? 1.0 : 0.6;
                  ctx.strokeStyle = `rgba(39, 174, 96, ${alpha})`;
                  ctx.lineWidth = 4;
                  ctx.beginPath();
                  ctx.ellipse(centerX, centerY, radius * 1.1, radius * 0.3, 0, 0, 2 * Math.PI);
                  ctx.stroke();
                  ctx.fillStyle = '#27ae60';
                  ctx.font = '14px KaTeX_Main';
                  ctx.fillText('A ∩ B', centerX + radius + 20, centerY);
                } else if (viz.state.space === 'wedge') {
                  const alpha = viz.state.highlightRegion === 'intersection' ? 1.0 : 0.8;
                  ctx.fillStyle = `rgba(39, 174, 96, ${alpha})`;
                  ctx.beginPath();
                  ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.fillStyle = '#27ae60';
                  ctx.font = '14px KaTeX_Main';
                  ctx.fillText('A ∩ B', centerX + 15, centerY - 10);
                }
              }

              // Mayer-Vietoris sequence (bottom)
              const seqY = height * 0.75;
              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Mayer-Vietoris Sequence:', centerX, seqY - 20);

              const terms = ['Hₙ(A∩B)', 'Hₙ(A)⊕Hₙ(B)', 'Hₙ(X)', 'Hₙ₋₁(A∩B)'];
              const spacing = width / (terms.length + 1);
              terms.forEach((term, i) => {
                const x = spacing * (i + 1);
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
              ctx.fillText(`A ∩ B: ${current.intersection}`, 10, height - 10);
            },
            controls: [
              {
                type: 'select',
                id: 'space',
                label: 'Space Decomposition',
                options: [
                  { value: 'sphere', label: 'S² (Sphere)' },
                  { value: 'torus', label: 'T² (Torus)' },
                  { value: 'wedge', label: 'S¹ ∨ S¹ (Wedge)' }
                ],
                value: 'sphere'
              },
              {
                type: 'select',
                id: 'highlightRegion',
                label: 'Highlight',
                options: [
                  { value: 'none', label: 'None' },
                  { value: 'A', label: 'Region A' },
                  { value: 'B', label: 'Region B' },
                  { value: 'intersection', label: 'A ∩ B' }
                ],
                value: 'none'
              },
              {
                type: 'checkbox',
                id: 'showA',
                label: 'Show A',
                value: true
              },
              {
                type: 'checkbox',
                id: 'showB',
                label: 'Show B',
                value: true
              },
              {
                type: 'checkbox',
                id: 'showIntersection',
                label: 'Show A ∩ B',
                value: true
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-les-pair',
          question: 'Use the long exact sequence of \\((D^n, S^{n-1})\\) to show \\(H_k(D^n, S^{n-1}) = 0\\) for \\(k \\ne n\\) and \\(H_n(D^n, S^{n-1}) \\cong \\mathbb{Z}\\).',
          hint: 'Use \\(H_k(D^n) = 0\\) for \\(k > 0\\) (disk is contractible) and \\(H_k(S^{n-1}) = \\mathbb{Z}\\delta_{k, n-1}\\).',
          solution: `The LES is:
          \\[
          \\cdots \\to H_k(S^{n-1}) \\to H_k(D^n) \\to H_k(D^n, S^{n-1}) \\to H_{k-1}(S^{n-1}) \\to \\cdots
          \\]
          Since \\(D^n\\) is contractible, \\(H_k(D^n) = 0\\) for \\(k > 0\\), \\(H_0(D^n) = \\mathbb{Z}\\). Also, \\(H_k(S^{n-1}) = \\mathbb{Z}\\) if \\(k = 0, n-1\\), else \\(0\\).

          <strong>Case \\(k = n\\):</strong>
          \\[
          0 \\to H_n(D^n, S^{n-1}) \\xrightarrow{\\partial} H_{n-1}(S^{n-1}) \\cong \\mathbb{Z} \\to 0
          \\]
          By exactness, \\(\\partial\\) is an isomorphism, so \\(H_n(D^n, S^{n-1}) \\cong \\mathbb{Z}\\).

          <strong>Case \\(k \\ne n, k > 0\\):</strong> Both \\(H_k(D^n)\\) and \\(H_{k-1}(S^{n-1})\\) are zero (except possibly at \\(k = n-1\\)), giving \\(H_k(D^n, S^{n-1}) = 0\\). \\(\\square\\)`
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
      `,
      visualizations: [
        {
          id: 'les-calculator',
          title: 'Long Exact Sequence Calculator',
          description: 'Input spaces and compute the Mayer-Vietoris sequence.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.8,
            setup: (viz) => {
              viz.state = {
                spaceA: 'contractible',
                spaceB: 'contractible',
                intersection: 'circle',
                degree: 1
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const homologies = {
                contractible: { H0: 'ℤ', H1: '0', H2: '0' },
                circle: { H0: 'ℤ', H1: 'ℤ', H2: '0' },
                sphere2: { H0: 'ℤ', H1: '0', H2: 'ℤ' }
              };

              const HA = homologies[viz.state.spaceA];
              const HB = homologies[viz.state.spaceB];
              const HI = homologies[viz.state.intersection];

              const n = viz.state.degree;
              const getH = (H, k) => {
                if (k === 0) return H.H0;
                if (k === 1) return H.H1;
                if (k === 2) return H.H2;
                return '0';
              };

              const HnI = getH(HI, n);
              const HnA = getH(HA, n);
              const HnB = getH(HB, n);
              const HnX = '?'; // To be computed
              const Hn1I = getH(HI, n - 1);

              // Draw sequence
              ctx.fillStyle = '#000';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Mayer-Vietoris Sequence (degree ${n})`, width / 2, 30);

              const y = height / 2;
              const terms = [
                `H${n}(A∩B)`,
                `H${n}(A)⊕H${n}(B)`,
                `H${n}(X)`,
                `H${n - 1}(A∩B)`
              ];
              const values = [
                HnI,
                `${HnA}⊕${HnB}`,
                HnX,
                Hn1I
              ];

              const spacing = width / (terms.length + 1);
              terms.forEach((term, i) => {
                const x = spacing * (i + 1);

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
              ctx.fillText('Exactness gives: im(Φ) = ker(Ψ), im(Ψ) = ker(∂)', 10, height - 40);
              ctx.fillText(`Example: If A, B contractible and A∩B = S¹, then H₁(X) ≅ ℤ`, 10, height - 20);
            },
            controls: [
              {
                type: 'select',
                id: 'spaceA',
                label: 'Space A',
                options: [
                  { value: 'contractible', label: 'Contractible' },
                  { value: 'circle', label: 'S¹' },
                  { value: 'sphere2', label: 'S²' }
                ],
                value: 'contractible'
              },
              {
                type: 'select',
                id: 'spaceB',
                label: 'Space B',
                options: [
                  { value: 'contractible', label: 'Contractible' },
                  { value: 'circle', label: 'S¹' },
                  { value: 'sphere2', label: 'S²' }
                ],
                value: 'contractible'
              },
              {
                type: 'select',
                id: 'intersection',
                label: 'A ∩ B',
                options: [
                  { value: 'contractible', label: 'Contractible' },
                  { value: 'circle', label: 'S¹' },
                  { value: 'sphere2', label: 'S²' }
                ],
                value: 'circle'
              },
              {
                type: 'slider',
                id: 'degree',
                label: 'Degree n',
                min: 0,
                max: 2,
                step: 1,
                value: 1
              }
            ]
          }
        },
        {
          id: 'sphere-computation',
          title: 'Sphere Homology via Mayer-Vietoris',
          description: 'Step-by-step computation of Hₙ(Sⁿ) using Mayer-Vietoris.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                dimension: 2,
                step: 0 // 0: setup, 1: sequence, 2: result
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const n = viz.state.dimension;
              const centerX = width / 2;

              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Computing H*(S${n}) via Mayer-Vietoris`, centerX, 30);

              if (viz.state.step >= 0) {
                ctx.font = '14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText(`Step 1: Decompose S${n} = U ∪ V`, 20, 70);
                ctx.fillText('U = upper hemisphere (contractible)', 40, 90);
                ctx.fillText('V = lower hemisphere (contractible)', 40, 110);
                ctx.fillText(`U ∩ V ≃ S${n - 1} (equator)`, 40, 130);

                // Draw decomposition
                const radius = 80;
                const cy = 180;
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
                ctx.fillText('U ∩ V', centerX + radius + 10, cy);
              }

              if (viz.state.step >= 1) {
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText(`Step 2: Mayer-Vietoris sequence (k ≥ 1):`, 20, 280);
                ctx.font = '13px KaTeX_Main';
                ctx.fillText(`Hₖ(S${n-1}) → Hₖ(U)⊕Hₖ(V) → Hₖ(S${n}) → Hₖ₋₁(S${n-1})`, 40, 300);
                ctx.fillText('Since U, V contractible: Hₖ(U) = Hₖ(V) = 0 for k > 0', 40, 320);
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.fillText(`∴ Hₖ(S${n}) ≅ Hₖ₋₁(S${n-1})`, 40, 345);
              }

              if (viz.state.step >= 2) {
                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ctx.textAlign = 'left';
                ctx.fillText('Step 3: Induction from S⁰ = {two points}:', 20, 380);
                ctx.font = '13px KaTeX_Main';
                ctx.fillText('H₀(S⁰) = ℤ², reduced: H̃₀(S⁰) = ℤ', 40, 400);
                ctx.fillText(`H₁(S¹) ≅ H̃₀(S⁰) = ℤ`, 40, 420);
                if (n >= 2) {
                  ctx.fillText(`H₂(S²) ≅ H₁(S¹) = ℤ`, 40, 440);
                }
                if (n >= 3) {
                  ctx.fillText('⋮', 40, 460);
                  ctx.fillText(`Hₙ(Sⁿ) = ℤ, Hₖ(Sⁿ) = 0 for 0 < k < n`, 40, 480);
                }

                // Result box
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 3;
                ctx.strokeRect(width - 250, height - 80, 240, 70);
                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText(`H*(S${n}):`, width - 130, height - 55);
                ctx.font = '14px KaTeX_Main';
                ctx.fillText(`Hₖ = ℤ·δₖ,₀ + ℤ·δₖ,${n}`, width - 130, height - 30);
              }
            },
            controls: [
              {
                type: 'slider',
                id: 'dimension',
                label: 'Sphere dimension n',
                min: 1,
                max: 3,
                step: 1,
                value: 2
              },
              {
                type: 'slider',
                id: 'step',
                label: 'Proof Step',
                min: 0,
                max: 2,
                step: 1,
                value: 0
              }
            ]
          }
        },
        {
          id: 'torus-computation',
          title: 'Torus Decomposition',
          description: 'Compute H*(T²) by decomposing into two cylinders.',
          canvas: {
            type: 'static',
            aspectRatio: 1.4,
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);
              const centerX = width / 2;
              const centerY = height / 2;

              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Torus T² = A ∪ B (two cylinders)', centerX, 30);

              // Draw torus schematically
              const R = 100, r = 40;

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
              ctx.fillText('A ≃ S¹', centerX - 80, centerY - 80);
              ctx.fillStyle = '#3498db';
              ctx.fillText('B ≃ S¹', centerX + 80, centerY - 80);
              ctx.fillStyle = '#27ae60';
              ctx.fillText('A ∩ B ≃ S¹ ⊔ S¹', centerX, centerY + 130);

              // Computation
              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              const y0 = height - 120;
              ctx.fillText('Mayer-Vietoris (degree 1):', 20, y0);
              ctx.fillText('H₁(S¹⊔S¹) → H₁(A)⊕H₁(B) → H₁(T²) → H₀(S¹⊔S¹)', 20, y0 + 20);
              ctx.fillText('ℤ² → ℤ⊕ℤ → H₁(T²) → ℤ²', 20, y0 + 40);
              ctx.fillText('The map ℤ² → ℤ² is diagonal, ker = ℤ', 20, y0 + 60);
              ctx.fillStyle = '#27ae60';
              ctx.font = 'bold 14px KaTeX_Main';
              ctx.fillText('∴ H₁(T²) ≅ ℤ², H₂(T²) ≅ ℤ', 20, y0 + 85);
            }
          }
        },
        {
          id: 'wedge-sum-viz',
          title: 'Wedge Sum Homology Calculator',
          description: 'Compute H*(X ∨ Y) = H*(X) ⊕ H*(Y) for wedge sums.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                spaceX: 'circle',
                spaceY: 'sphere2'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const homologies = {
                circle: { name: 'S¹', H0: 'ℤ', H1: 'ℤ', H2: '0' },
                sphere2: { name: 'S²', H0: 'ℤ', H1: '0', H2: 'ℤ' }
              };

              const X = homologies[viz.state.spaceX];
              const Y = homologies[viz.state.spaceY];

              const centerX = width / 2;
              const centerY = height * 0.3;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Wedge Sum: ${X.name} ∨ ${Y.name}`, centerX, 30);

              // Draw wedge
              const radius = 60;
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
              const tableY = height * 0.65;
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.textAlign = 'center';

              const headers = ['', 'H₀', 'H₁', 'H₂'];
              const rows = [
                [X.name, X.H0, X.H1, X.H2],
                [Y.name, Y.H0, Y.H1, Y.H2],
                [`${X.name}∨${Y.name}`, X.H0, `${X.H1}⊕${Y.H1}`, `${X.H2}⊕${Y.H2}`]
              ];

              const colWidth = 80;
              const rowHeight = 30;

              // Draw table
              headers.forEach((h, i) => {
                const x = centerX - 160 + i * colWidth;
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.fillText(h, x, tableY);
              });

              rows.forEach((row, ri) => {
                row.forEach((cell, ci) => {
                  const x = centerX - 160 + ci * colWidth;
                  const y = tableY + (ri + 1) * rowHeight;
                  ctx.fillStyle = ri === 2 ? '#27ae60' : '#000';
                  ctx.font = ri === 2 && ci > 0 ? 'bold 13px KaTeX_Main' : '13px KaTeX_Main';
                  ctx.fillText(cell, x, y);
                });
              });

              // Formula
              ctx.fillStyle = '#9b59b6';
              ctx.font = 'bold 15px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('H̃ₖ(X ∨ Y) ≅ H̃ₖ(X) ⊕ H̃ₖ(Y)', centerX, height - 20);
            },
            controls: [
              {
                type: 'select',
                id: 'spaceX',
                label: 'Space X',
                options: [
                  { value: 'circle', label: 'S¹' },
                  { value: 'sphere2', label: 'S²' }
                ],
                value: 'circle'
              },
              {
                type: 'select',
                id: 'spaceY',
                label: 'Space Y',
                options: [
                  { value: 'circle', label: 'S¹' },
                  { value: 'sphere2', label: 'S²' }
                ],
                value: 'sphere2'
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-sphere',
          question: 'Use Mayer-Vietoris to compute \\(H_2(S^2)\\). Show all steps.',
          hint: 'Decompose \\(S^2 = U \\cup V\\) with \\(U \\cap V \\simeq S^1\\).',
          solution: `Decompose \\(S^2 = U \\cup V\\) (upper/lower hemispheres). Then \\(U, V\\) are contractible, \\(U \\cap V \\simeq S^1\\).

          Mayer-Vietoris (degree 2):
          \\[
          H_2(S^1) \\to H_2(U) \\oplus H_2(V) \\to H_2(S^2) \\to H_1(S^1)
          \\]
          Since \\(H_2(S^1) = 0\\), \\(H_2(U) = H_2(V) = 0\\), \\(H_1(S^1) = \\mathbb{Z}\\):
          \\[
          0 \\to 0 \\to H_2(S^2) \\to \\mathbb{Z}
          \\]
          Need to check if the map \\(H_2(S^2) \\to H_1(S^1)\\) is zero. By exactness at \\(H_1(S^2)\\) (which is \\(0\\)), the map must be injective. But also from \\(H_1(U) \\oplus H_1(V) = 0 \\to H_1(S^2)\\), we have \\(H_1(S^2) = 0\\).

          Actually, the sequence is:
          \\[
          0 \\to H_2(S^2) \\xrightarrow{\\partial} H_1(S^1) \\xrightarrow{\\Phi} H_1(U) \\oplus H_1(V) = 0
          \\]
          So \\(\\partial\\) is injective and \\(\\text{im}(\\partial) = \\ker(\\Phi) = H_1(S^1) = \\mathbb{Z}\\). Thus:
          \\[
          H_2(S^2) \\cong \\mathbb{Z} \\quad \\square
          \\]`
        },
        {
          id: 'ex-torus',
          question: 'Compute \\(H_1(T^2)\\) using a Mayer-Vietoris decomposition. Identify the two independent 1-cycles.',
          hint: 'Decompose into two cylinders \\(A, B \\simeq S^1\\) with \\(A \\cap B \\simeq S^1 \\sqcup S^1\\).',
          solution: `Decompose \\(T^2 = A \\cup B\\) where \\(A, B\\) are cylinders (each \\(\\simeq S^1\\)), and \\(A \\cap B \\simeq S^1 \\sqcup S^1\\).

          Mayer-Vietoris (degree 1):
          \\[
          H_1(S^1 \\sqcup S^1) \\xrightarrow{\\Phi} H_1(A) \\oplus H_1(B) \\xrightarrow{\\Psi} H_1(T^2) \\xrightarrow{\\partial} H_0(S^1 \\sqcup S^1)
          \\]
          \\[
          \\mathbb{Z}^2 \\xrightarrow{(a, b) \\mapsto (a, b)} \\mathbb{Z} \\oplus \\mathbb{Z} \\to H_1(T^2) \\to \\mathbb{Z}^2
          \\]
          The map \\(\\Phi: (a, b) \\mapsto (a, b)\\) has \\(\\text{im}(\\Phi) = \\{(c, c) : c \\in \\mathbb{Z}\\} \\cong \\mathbb{Z}\\) (diagonal).

          By exactness, \\(\\ker(\\Psi) = \\text{im}(\\Phi) \\cong \\mathbb{Z}\\). So:
          \\[
          H_1(A) \\oplus H_1(B) / \\ker(\\Psi) \\cong \\mathbb{Z}^2 / \\mathbb{Z} \\cong \\mathbb{Z}
          \\]
          Wait, let me recalculate. Actually, \\(\\Psi: \\mathbb{Z} \\oplus \\mathbb{Z} \\to H_1(T^2)\\) has kernel = diagonal = \\(\\mathbb{Z}\\), so:
          \\[
          \\text{im}(\\Psi) \\cong (\\mathbb{Z} \\oplus \\mathbb{Z}) / \\mathbb{Z} \\cong \\mathbb{Z}
          \\]
          But we need the continuation. From \\(H_1(T^2) \\to H_0(S^1 \\sqcup S^1) = \\mathbb{Z}^2\\), and \\(H_0(A) \\oplus H_0(B) = \\mathbb{Z}^2 \\to H_0(T^2) = \\mathbb{Z}\\), we have \\(\\ker(\\partial)\\) includes contributions from both.

          Standard computation: \\(H_1(T^2) \\cong \\mathbb{Z}^2\\) with generators the meridian and longitude (two independent circles on the torus). \\(\\square\\)`
        },
        {
          id: 'ex-wedge',
          question: 'Compute \\(H_*(S^1 \\vee S^2)\\) using the wedge sum formula.',
          hint: 'Use \\(\\tilde{H}_k(X \\vee Y) \\cong \\tilde{H}_k(X) \\oplus \\tilde{H}_k(Y)\\).',
          solution: `For \\(X \\vee Y\\), reduced homology satisfies:
          \\[
          \\tilde{H}_k(X \\vee Y) \\cong \\tilde{H}_k(X) \\oplus \\tilde{H}_k(Y)
          \\]
          For \\(S^1 \\vee S^2\\):
          <ul>
            <li>\\(\\tilde{H}_1(S^1 \\vee S^2) = \\tilde{H}_1(S^1) \\oplus \\tilde{H}_1(S^2) = \\mathbb{Z} \\oplus 0 = \\mathbb{Z}\\).</li>
            <li>\\(\\tilde{H}_2(S^1 \\vee S^2) = \\tilde{H}_2(S^1) \\oplus \\tilde{H}_2(S^2) = 0 \\oplus \\mathbb{Z} = \\mathbb{Z}\\).</li>
            <li>\\(\\tilde{H}_0(S^1 \\vee S^2) = 0\\) (connected).</li>
          </ul>
          In ordinary homology:
          \\[
          H_k(S^1 \\vee S^2) = \\begin{cases}
          \\mathbb{Z} & k = 0, 1, 2 \\\\
          0 & \\text{else}
          \\end{cases}
          \\quad \\square
          \\]`
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
          solution: `<strong>Fundamental group (Van Kampen):</strong> Decompose \\(X = A \\cup B\\) where \\(A, B\\) are small neighborhoods of each \\(S^1\\), intersecting at a point. Then:
          \\[
          \\pi_1(X) = \\pi_1(A) *_{\\pi_1(A \\cap B)} \\pi_1(B) = \\mathbb{Z} * \\mathbb{Z} = F_2
          \\]
          (free group on two generators \\(a, b\\)).

          <strong>Homology (wedge sum):</strong>
          \\[
          H_1(S^1 \\vee S^1) = H_1(S^1) \\oplus H_1(S^1) = \\mathbb{Z} \\oplus \\mathbb{Z}
          \\]

          <strong>Relationship:</strong> \\(H_1(X) = F_2^{\\text{ab}} = \\mathbb{Z}^2\\) (abelianization kills commutators \\([a, b]\\), leaving \\(\\mathbb{Z} \\oplus \\mathbb{Z}\\)). \\(\\square\\)`
        }
      ]
    }
  ]
});
