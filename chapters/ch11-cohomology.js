window.CHAPTERS.push({
  id: 'cohomology',
  number: 11,
  title: 'Cohomology Groups',
  subtitle: 'Dual Theory with Extra Structure',
  sections: [
    {
      id: 'cochain-complex',
      title: 'Cochain Complex C^n(X; G) = Hom(Cₙ(X), G)',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> Homology measures "cycles mod boundaries" in \\(X\\). <em>Cohomology</em> dualizes this: instead of chains (formal sums of simplices), we study <em>cochains</em> (functions on chains). This brings new structure (cup product, ring structure) and computational tools (UCT).
        </div>

        <div class="env-block definition">
          <strong>Definition (Cochain Complex):</strong> Let \\(X\\) be a space and \\(G\\) an abelian group (usually \\(\\mathbb{Z}\\), \\(\\mathbb{Z}/2\\), or \\(\\mathbb{Q}\\)). The <strong>cochain complex</strong> is:
          \\[
          C^n(X; G) = \\text{Hom}(C_n(X), G)
          \\]
          (group of homomorphisms from the \\(n\\)-chains \\(C_n(X)\\) to \\(G\\)).

          The <strong>coboundary map</strong> \\(\\delta^n: C^n(X; G) \\to C^{n+1}(X; G)\\) is defined by:
          \\[
          (\\delta^n \\phi)(c) = \\phi(\\partial_{n+1} c)
          \\]
          for \\(\\phi \\in C^n(X; G)\\) and \\(c \\in C_{n+1}(X)\\).
        </div>

        <div class="env-block theorem">
          <strong>Theorem:</strong> \\(\\delta^{n+1} \\circ \\delta^n = 0\\), so \\((C^*(X; G), \\delta)\\) is a cochain complex.
        </div>

        <div class="env-block proof">
          <strong>Proof:</strong> For \\(\\phi \\in C^n(X; G)\\) and \\(c \\in C_{n+2}(X)\\):
          \\[
          (\\delta^{n+1} \\delta^n \\phi)(c) = (\\delta^n \\phi)(\\partial c) = \\phi(\\partial \\partial c) = \\phi(0) = 0
          \\]
          since \\(\\partial \\circ \\partial = 0\\). \\(\\square\\)
        </div>

        <div class="env-block definition">
          <strong>Definition (Cohomology Groups):</strong> The <strong>\\(n\\)-th cohomology group</strong> of \\(X\\) with coefficients in \\(G\\) is:
          \\[
          H^n(X; G) = \\frac{\\ker(\\delta^n: C^n \\to C^{n+1})}{\\text{im}(\\delta^{n-1}: C^{n-1} \\to C^n)} = \\frac{Z^n(X; G)}{B^n(X; G)}
          \\]
          where:
          <ul>
            <li>\\(Z^n(X; G) = \\ker(\\delta^n)\\): <strong>cocycles</strong> (functions \\(\\phi\\) such that \\(\\delta \\phi = 0\\)).</li>
            <li>\\(B^n(X; G) = \\text{im}(\\delta^{n-1})\\): <strong>coboundaries</strong> (functions of the form \\(\\delta \\psi\\)).</li>
          </ul>
        </div>

        <div class="env-block example">
          <strong>Example (Point space):</strong> For \\(X = \\{\\text{pt}\\}\\):
          <ul>
            <li>\\(C_0(X) = \\mathbb{Z}\\), \\(C_n(X) = 0\\) for \\(n > 0\\).</li>
            <li>\\(C^0(X; G) = \\text{Hom}(\\mathbb{Z}, G) \\cong G\\), \\(C^n(X; G) = 0\\) for \\(n > 0\\).</li>
          </ul>
          Thus:
          \\[
          H^n(X; G) = \\begin{cases}
          G & n = 0 \\\\
          0 & n > 0
          \\end{cases}
          \\]
        </div>

        <div class="env-block remark">
          <strong>Notation:</strong> When \\(G = \\mathbb{Z}\\), we write \\(H^n(X) = H^n(X; \\mathbb{Z})\\) (integer cohomology).
        </div>

        <div class="env-block example">
          <strong>Example (Circle \\(S^1\\)):</strong> We know \\(H_0(S^1) = \\mathbb{Z}\\), \\(H_1(S^1) = \\mathbb{Z}\\), \\(H_n(S^1) = 0\\) for \\(n > 1\\).

          For \\(G = \\mathbb{Z}\\):
          <ul>
            <li>\\(H^0(S^1; \\mathbb{Z}) = \\text{Hom}(H_0, \\mathbb{Z}) = \\text{Hom}(\\mathbb{Z}, \\mathbb{Z}) \\cong \\mathbb{Z}\\).</li>
            <li>\\(H^1(S^1; \\mathbb{Z}) = \\text{Hom}(H_1, \\mathbb{Z}) = \\text{Hom}(\\mathbb{Z}, \\mathbb{Z}) \\cong \\mathbb{Z}\\).</li>
          </ul>
          (We'll refine this with the Universal Coefficient Theorem below.)
        </div>

        <div class="env-block intuition">
          <strong>Geometric Interpretation:</strong> A cochain \\(\\phi \\in C^n(X; G)\\) assigns a value in \\(G\\) to each \\(n\\)-chain. Think of it as a "measurement" or "observable" on chains. Cocycles are measurements that vanish on boundaries, capturing global information.
        </div>
      `,
      visualizations: [
        {
          id: 'dual-complex-viz',
          title: 'Dual Complex Visualizer',
          description: 'See Hom(Cₙ, G) as linear functionals on chains.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.6,
            setup: (viz) => {
              viz.state = {
                dimension: 1,
                coefficientGroup: 'Z', // 'Z', 'Z2', 'Q'
                showDual: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const groups = {
                Z: { name: 'ℤ', description: 'Integers' },
                Z2: { name: 'ℤ/2', description: 'Mod 2' },
                Q: { name: 'ℚ', description: 'Rationals' }
              };

              const G = groups[viz.state.coefficientGroup];
              const n = viz.state.dimension;

              const centerX = width / 2;
              const leftX = width * 0.25;
              const rightX = width * 0.75;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Cochain Complex with coefficients in ${G.name}`, centerX, 30);

              // Chains (left)
              ctx.fillStyle = '#3498db';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.fillText('Chains', leftX, 70);

              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              const chainY = 120;
              const spacing = 60;
              ['C₂(X)', 'C₁(X)', 'C₀(X)'].forEach((label, i) => {
                const y = chainY + i * spacing;
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.strokeRect(leftX - 50, y - 20, 100, 40);
                ctx.fillStyle = '#000';
                ctx.textAlign = 'center';
                ctx.fillText(label, leftX, y + 5);

                if (i < 2) {
                  ctx.strokeStyle = '#e74c3c';
                  ctx.lineWidth = 2;
                  ctx.beginPath();
                  ctx.moveTo(leftX, y + 20);
                  ctx.lineTo(leftX, y + spacing - 20);
                  ctx.stroke();
                  ctx.fillStyle = '#e74c3c';
                  ctx.beginPath();
                  ctx.moveTo(leftX, y + spacing - 20);
                  ctx.lineTo(leftX - 5, y + spacing - 30);
                  ctx.lineTo(leftX + 5, y + spacing - 30);
                  ctx.closePath();
                  ctx.fill();
                  ctx.fillStyle = '#000';
                  ctx.fillText('∂', leftX + 25, y + spacing / 2);
                }
              });

              // Cochains (right)
              if (viz.state.showDual) {
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Cochains', rightX, 70);

                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ['C⁰(X;' + G.name + ')', 'C¹(X;' + G.name + ')', 'C²(X;' + G.name + ')'].forEach((label, i) => {
                  const y = chainY + (2 - i) * spacing;
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(rightX - 60, y - 20, 120, 40);
                  ctx.fillStyle = '#000';
                  ctx.textAlign = 'center';
                  ctx.fillText(label, rightX, y + 5);

                  if (i > 0) {
                    ctx.strokeStyle = '#e74c3c';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(rightX, y - 20);
                    ctx.lineTo(rightX, y - spacing + 20);
                    ctx.stroke();
                    ctx.fillStyle = '#e74c3c';
                    ctx.beginPath();
                    ctx.moveTo(rightX, y - spacing + 20);
                    ctx.lineTo(rightX - 5, y - spacing + 30);
                    ctx.lineTo(rightX + 5, y - spacing + 30);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#000';
                    ctx.fillText('δ', rightX + 30, y - spacing / 2);
                  }
                });

                // Hom arrows
                for (let i = 0; i < 3; i++) {
                  const y = chainY + i * spacing;
                  ctx.strokeStyle = '#27ae60';
                  ctx.lineWidth = 2;
                  ctx.setLineDash([5, 5]);
                  ctx.beginPath();
                  ctx.moveTo(leftX + 50, y);
                  ctx.lineTo(rightX - 60, y);
                  ctx.stroke();
                  ctx.setLineDash([]);
                  ctx.fillStyle = '#27ae60';
                  ctx.font = '12px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText('Hom(-, ' + G.name + ')', centerX, y - 5);
                }
              }

              // Info
              ctx.fillStyle = '#000';
              ctx.font = '13px KaTeX_Main';
              ctx.textAlign = 'left';
              ctx.fillText(`Cⁿ(X; ${G.name}) = Hom(Cₙ(X), ${G.name})`, 10, height - 50);
              ctx.fillText('Coboundary: (δφ)(c) = φ(∂c)', 10, height - 30);
              ctx.fillText(`Cohomology: Hⁿ(X; ${G.name}) = ker(δ) / im(δ)`, 10, height - 10);
            },
            controls: [
              {
                type: 'slider',
                id: 'dimension',
                label: 'Dimension',
                min: 0,
                max: 2,
                step: 1,
                value: 1
              },
              {
                type: 'select',
                id: 'coefficientGroup',
                label: 'Coefficient Group G',
                options: [
                  { value: 'Z', label: 'ℤ (integers)' },
                  { value: 'Z2', label: 'ℤ/2 (mod 2)' },
                  { value: 'Q', label: 'ℚ (rationals)' }
                ],
                value: 'Z'
              },
              {
                type: 'checkbox',
                id: 'showDual',
                label: 'Show Cochain Complex',
                value: true
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-cochain-1',
          question: 'Show that \\(C^n(X; G) \\cong \\text{Hom}(C_n(X), G)\\) is an abelian group under pointwise addition.',
          hint: 'For \\(\\phi, \\psi \\in C^n(X; G)\\), define \\((\\phi + \\psi)(c) = \\phi(c) + \\psi(c)\\).',
          solution: `For \\(\\phi, \\psi \\in C^n(X; G) = \\text{Hom}(C_n(X), G)\\), define:
          \\[
          (\\phi + \\psi)(c) = \\phi(c) + \\psi(c) \\quad \\forall c \\in C_n(X)
          \\]
          <strong>Check group axioms:</strong>
          <ul>
            <li><strong>Closure:</strong> \\(\\phi(c) + \\psi(c) \\in G\\) since \\(G\\) is a group.</li>
            <li><strong>Associativity:</strong> Inherited from \\(G\\).</li>
            <li><strong>Identity:</strong> The zero map \\(0(c) = 0_G\\) for all \\(c\\).</li>
            <li><strong>Inverses:</strong> \\((-\\phi)(c) = -\\phi(c)\\).</li>
            <li><strong>Commutativity:</strong> Since \\(G\\) is abelian, \\((\\phi + \\psi)(c) = (\\psi + \\phi)(c)\\).</li>
          </ul>
          Thus \\(C^n(X; G)\\) is an abelian group. \\(\\square\\)`
        }
      ]
    },
    {
      id: 'cohomology-groups',
      title: 'Cohomology Groups H^n(X; G)',
      content: `
        <div class="env-block definition">
          <strong>Definition (Cocycle and Coboundary):</strong>
          <ul>
            <li>A <strong>cocycle</strong> is \\(\\phi \\in C^n(X; G)\\) such that \\(\\delta \\phi = 0\\).</li>
            <li>A <strong>coboundary</strong> is \\(\\phi \\in C^n(X; G)\\) of the form \\(\\phi = \\delta \\psi\\) for some \\(\\psi \\in C^{n-1}(X; G)\\).</li>
          </ul>
          Since \\(\\delta \\circ \\delta = 0\\), every coboundary is a cocycle.
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Functoriality):</strong> A continuous map \\(f: X \\to Y\\) induces:
          \\[
          f^*: H^n(Y; G) \\to H^n(X; G)
          \\]
          (pullback in cohomology—note the direction is <em>reversed</em> compared to homology).

          For \\(\\phi \\in C^n(Y; G)\\), define:
          \\[
          (f^* \\phi)(c) = \\phi(f_\\# c)
          \\]
          where \\(f_\\# : C_n(X) \\to C_n(Y)\\) is the induced map on chains.
        </define>

        <div class="env-block remark">
          <strong>Contravariance:</strong> Cohomology is a <strong>contravariant functor</strong>:
          <ul>
            <li>\\((g \\circ f)^* = f^* \\circ g^*\\) (composition reverses).</li>
            <li>\\((\\text{id}_X)^* = \\text{id}_{H^*(X)}\\).</li>
          </ul>
          This is opposite to homology, which is covariant.
        </div>

        <div class="env-block example">
          <strong>Example (Cohomology of \\(S^n\\)):</strong> For the \\(n\\)-sphere:
          \\[
          H^k(S^n; \\mathbb{Z}) = \\begin{cases}
          \\mathbb{Z} & k = 0, n \\\\
          0 & \\text{else}
          \\end{cases}
          \\]
          This matches \\(H_k(S^n)\\) for free groups, but we'll see differences when torsion appears.
        </div>

        <div class="env-block example">
          <strong>Example (Torus \\(T^2\\)):</strong>
          \\[
          H^k(T^2; \\mathbb{Z}) = \\begin{cases}
          \\mathbb{Z} & k = 0, 2 \\\\
          \\mathbb{Z}^2 & k = 1 \\\\
          0 & \\text{else}
          \\end{cases}
          \\]
          Again matches homology for \\(\\mathbb{Z}\\) coefficients.
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Homotopy Invariance):</strong> If \\(f, g: X \\to Y\\) are homotopic, then:
          \\[
          f^* = g^*: H^n(Y; G) \\to H^n(X; G)
          \\]
          Thus cohomology is a homotopy invariant.
        </div>

        <div class="env-block proof">
          <strong>Proof:</strong> Same as for homology: a chain homotopy \\(D: C_n(X) \\to C_{n+1}(Y)\\) with \\(f_\\# - g_\\# = \\partial D + D \\partial\\) dualizes to give a cochain homotopy \\(D^*\\) with \\(f^* - g^* = \\delta D^* + D^* \\delta\\). \\(\\square\\)
        </div>

        <div class="env-block remark">
          <strong>Why study cohomology?</strong>
          <ol>
            <li><strong>Ring structure:</strong> Cohomology has a <strong>cup product</strong> \\(H^p \\otimes H^q \\to H^{p+q}\\), making \\(H^*(X) = \\bigoplus_n H^n(X)\\) a graded ring. Homology lacks this.</li>
            <li><strong>Computational:</strong> For spaces with torsion, cohomology can be easier to compute via the Universal Coefficient Theorem.</li>
            <li><strong>Characteristic classes:</strong> In differential geometry, characteristic classes (Chern, Stiefel-Whitney, Pontryagin) live in cohomology.</li>
            <li><strong>Duality:</strong> Poincaré duality relates \\(H^k(M)\\) and \\(H_{n-k}(M)\\) for \\(n\\)-manifolds.</li>
          </ol>
        </div>
      `,
      visualizations: [
        {
          id: 'contravariant-viz',
          title: 'Contravariant Functor Visualizer',
          description: 'See how f induces f* backwards in cohomology.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                showHomology: true,
                showCohomology: true,
                mapDirection: 'forward' // 'forward', 'backward'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const leftX = width * 0.25;
              const rightX = width * 0.75;
              const topY = height * 0.3;
              const bottomY = height * 0.7;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Contravariance: f induces f* in opposite direction', width / 2, 30);

              // Spaces
              const drawSpace = (x, y, label) => {
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(x, y, 50, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fillStyle = '#000';
                ctx.font = '16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText(label, x, y + 5);
              };

              drawSpace(leftX, topY, 'X');
              drawSpace(rightX, topY, 'Y');

              // Map f: X → Y
              ctx.strokeStyle = '#e74c3c';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.moveTo(leftX + 50, topY);
              ctx.lineTo(rightX - 50, topY);
              ctx.stroke();
              ctx.fillStyle = '#e74c3c';
              ctx.beginPath();
              ctx.moveTo(rightX - 50, topY);
              ctx.lineTo(rightX - 65, topY - 6);
              ctx.lineTo(rightX - 65, topY + 6);
              ctx.closePath();
              ctx.fill();
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.fillText('f', (leftX + rightX) / 2, topY - 15);

              // Homology (covariant)
              if (viz.state.showHomology) {
                const hy = bottomY - 80;
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.fillText('Homology (covariant)', width / 2, hy - 30);

                const drawHom = (x, y, label) => {
                  ctx.strokeStyle = '#3498db';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(x - 50, y - 20, 100, 40);
                  ctx.fillStyle = '#000';
                  ctx.font = '13px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(label, x, y + 5);
                };

                drawHom(leftX, hy, 'H*(X)');
                drawHom(rightX, hy, 'H*(Y)');

                // Induced map f*
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(leftX + 50, hy);
                ctx.lineTo(rightX - 50, hy);
                ctx.stroke();
                ctx.fillStyle = '#27ae60';
                ctx.beginPath();
                ctx.moveTo(rightX - 50, hy);
                ctx.lineTo(rightX - 65, hy - 6);
                ctx.lineTo(rightX - 65, hy + 6);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.font = '13px KaTeX_Main';
                ctx.fillText('f*', (leftX + rightX) / 2, hy - 10);
                ctx.font = '11px KaTeX_Main';
                ctx.fillText('(same direction)', (leftX + rightX) / 2, hy + 25);
              }

              // Cohomology (contravariant)
              if (viz.state.showCohomology) {
                const cy = bottomY + 40;
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Cohomology (contravariant)', width / 2, cy - 30);

                const drawCoh = (x, y, label) => {
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(x - 50, y - 20, 100, 40);
                  ctx.fillStyle = '#000';
                  ctx.font = '13px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(label, x, y + 5);
                };

                drawCoh(leftX, cy, 'H*(X)');
                drawCoh(rightX, cy, 'H*(Y)');

                // Induced map f* (reversed)
                ctx.strokeStyle = '#e67e22';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(rightX - 50, cy);
                ctx.lineTo(leftX + 50, cy);
                ctx.stroke();
                ctx.fillStyle = '#e67e22';
                ctx.beginPath();
                ctx.moveTo(leftX + 50, cy);
                ctx.lineTo(leftX + 65, cy - 6);
                ctx.lineTo(leftX + 65, cy + 6);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#000';
                ctx.font = '13px KaTeX_Main';
                ctx.fillText('f*', (leftX + rightX) / 2, cy - 10);
                ctx.font = '11px KaTeX_Main';
                ctx.fillText('(opposite direction!)', (leftX + rightX) / 2, cy + 25);
              }
            },
            controls: [
              {
                type: 'checkbox',
                id: 'showHomology',
                label: 'Show Homology',
                value: true
              },
              {
                type: 'checkbox',
                id: 'showCohomology',
                label: 'Show Cohomology',
                value: true
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-cohom-1',
          question: 'Compute \\(H^1(S^1; \\mathbb{Z})\\) directly from the definition.',
          hint: 'Use \\(C_0(S^1) = \\mathbb{Z}\\), \\(C_1(S^1) = \\mathbb{Z}\\) with \\(\\partial([e]) = 0\\).',
          solution: `For \\(S^1\\) with CW structure \\(e^0, e^1\\):
          <ul>
            <li>\\(C_0 = \\mathbb{Z}\\), \\(C_1 = \\mathbb{Z}\\), \\(C_n = 0\\) for \\(n > 1\\).</li>
            <li>\\(\\partial_1([e^1]) = 0\\) (loop attached at both ends to same point).</li>
          </ul>

          Cochain complex:
          \\[
          0 \\to C^0(S^1; \\mathbb{Z}) \\xrightarrow{\\delta^0} C^1(S^1; \\mathbb{Z}) \\to 0
          \\]
          where:
          <ul>
            <li>\\(C^0 = \\text{Hom}(C_0, \\mathbb{Z}) = \\text{Hom}(\\mathbb{Z}, \\mathbb{Z}) \\cong \\mathbb{Z}\\).</li>
            <li>\\(C^1 = \\text{Hom}(C_1, \\mathbb{Z}) = \\text{Hom}(\\mathbb{Z}, \\mathbb{Z}) \\cong \\mathbb{Z}\\).</li>
          </ul>

          The coboundary \\(\\delta^0: C^0 \\to C^1\\) is given by:
          \\[
          (\\delta^0 \\phi)(c_1) = \\phi(\\partial c_1) = \\phi(0) = 0
          \\]
          So \\(\\delta^0 = 0\\).

          Thus:
          \\[
          H^1(S^1; \\mathbb{Z}) = \\ker(\\delta^1: C^1 \\to C^2) / \\text{im}(\\delta^0: C^0 \\to C^1) = \\mathbb{Z} / 0 = \\mathbb{Z}
          \\]
          (Since \\(C^2 = 0\\), \\(\\ker(\\delta^1) = C^1 = \\mathbb{Z}\\).) \\(\\square\\)`
        }
      ]
    },
    {
      id: 'uct',
      title: 'Universal Coefficient Theorem for Cohomology',
      content: `
        <div class="env-block theorem">
          <strong>Universal Coefficient Theorem (Cohomology):</strong> For any space \\(X\\) and abelian group \\(G\\), there is a natural short exact sequence:
          \\[
          0 \\to \\text{Ext}(H_{n-1}(X), G) \\to H^n(X; G) \\to \\text{Hom}(H_n(X), G) \\to 0
          \\]
          This sequence splits (non-canonically), giving:
          \\[
          H^n(X; G) \\cong \\text{Hom}(H_n(X), G) \\oplus \\text{Ext}(H_{n-1}(X), G)
          \\]
        </div>

        <div class="env-block definition">
          <strong>Definition (Ext Functor):</strong> For abelian groups \\(A, G\\):
          \\[
          \\text{Ext}(A, G) = \\text{Ext}^1_{\\mathbb{Z}}(A, G)
          \\]
          measures the failure of \\(\\text{Hom}(-, G)\\) to be exact.

          <strong>Key properties:</strong>
          <ul>
            <li>\\(\\text{Ext}(\\mathbb{Z}, G) = 0\\).</li>
            <li>\\(\\text{Ext}(\\mathbb{Z}/n, G) = G/nG\\) (quotient by \\(n\\)-torsion).</li>
            <li>\\(\\text{Ext}(A \\oplus B, G) = \\text{Ext}(A, G) \\oplus \\text{Ext}(B, G)\\).</li>
            <li>If \\(G\\) is divisible (e.g., \\(\\mathbb{Q}\\), \\(\\mathbb{R}\\)), then \\(\\text{Ext}(A, G) = 0\\) for all \\(A\\).</li>
          </ul>
        </div>

        <div class="env-block example">
          <strong>Example 1 (\\(\\mathbb{R}P^2\\) with \\(\\mathbb{Z}\\) coefficients):</strong>

          Homology: \\(H_0(\\mathbb{R}P^2) = \\mathbb{Z}\\), \\(H_1(\\mathbb{R}P^2) = \\mathbb{Z}/2\\), \\(H_2(\\mathbb{R}P^2) = 0\\).

          <strong>Cohomology \\(H^1(\\mathbb{R}P^2; \\mathbb{Z})\\):</strong>
          \\[
          H^1 = \\text{Hom}(H_1, \\mathbb{Z}) \\oplus \\text{Ext}(H_0, \\mathbb{Z})
          \\]
          \\[
          = \\text{Hom}(\\mathbb{Z}/2, \\mathbb{Z}) \\oplus \\text{Ext}(\\mathbb{Z}, \\mathbb{Z}) = 0 \\oplus 0 = 0
          \\]
          (\\(\\text{Hom}(\\mathbb{Z}/2, \\mathbb{Z}) = 0\\) since \\(\\mathbb{Z}\\) has no 2-torsion.)

          <strong>Cohomology \\(H^2(\\mathbb{R}P^2; \\mathbb{Z})\\):</strong>
          \\[
          H^2 = \\text{Hom}(H_2, \\mathbb{Z}) \\oplus \\text{Ext}(H_1, \\mathbb{Z})
          \\]
          \\[
          = \\text{Hom}(0, \\mathbb{Z}) \\oplus \\text{Ext}(\\mathbb{Z}/2, \\mathbb{Z}) = 0 \\oplus \\mathbb{Z}/2 = \\mathbb{Z}/2
          \\]
          (\\(\\text{Ext}(\\mathbb{Z}/2, \\mathbb{Z}) = \\mathbb{Z}/2\\mathbb{Z}\\).)

          Result: \\(H^*(\\mathbb{R}P^2; \\mathbb{Z}) = (\\mathbb{Z}, 0, \\mathbb{Z}/2)\\).

          <strong>Compare with homology:</strong> \\(H_*(\\mathbb{R}P^2) = (\\mathbb{Z}, \\mathbb{Z}/2, 0)\\). The torsion "shifts" from \\(H_1\\) to \\(H^2\\)!
        </div>

        <div class="env-block example">
          <strong>Example 2 (\\(S^1\\) with \\(\\mathbb{Z}/2\\) coefficients):</strong>

          Homology: \\(H_0(S^1) = \\mathbb{Z}\\), \\(H_1(S^1) = \\mathbb{Z}\\).

          <strong>\\(H^1(S^1; \\mathbb{Z}/2)\\):</strong>
          \\[
          H^1 = \\text{Hom}(H_1, \\mathbb{Z}/2) \\oplus \\text{Ext}(H_0, \\mathbb{Z}/2)
          \\]
          \\[
          = \\text{Hom}(\\mathbb{Z}, \\mathbb{Z}/2) \\oplus \\text{Ext}(\\mathbb{Z}, \\mathbb{Z}/2) = \\mathbb{Z}/2 \\oplus 0 = \\mathbb{Z}/2
          \\]

          Result: \\(H^1(S^1; \\mathbb{Z}/2) = \\mathbb{Z}/2\\), whereas \\(H_1(S^1; \\mathbb{Z}/2) = \\mathbb{Z}/2\\) (same in this case).
        </div>

        <div class="env-block remark">
          <strong>Key Insight:</strong> UCT shows that cohomology with coefficients in \\(G\\) is determined by homology with \\(\\mathbb{Z}\\) coefficients, plus algebraic data (\\(\\text{Ext}\\)). This makes cohomology computable from homology.
        </div>

        <div class="env-block theorem">
          <strong>Corollary (Torsion-free case):</strong> If \\(H_*(X)\\) is torsion-free (all \\(H_n(X)\\) are free abelian), then:
          \\[
          H^n(X; G) \\cong \\text{Hom}(H_n(X), G)
          \\]
          (\\(\\text{Ext}\\) terms vanish).
        </div>

        <div class="env-block example">
          <strong>Example (Torus \\(T^2\\)):</strong>
          \\(H_*(T^2) = (\\mathbb{Z}, \\mathbb{Z}^2, \\mathbb{Z})\\) (torsion-free).

          For \\(G = \\mathbb{Z}\\):
          \\[
          H^1(T^2; \\mathbb{Z}) \\cong \\text{Hom}(\\mathbb{Z}^2, \\mathbb{Z}) = \\mathbb{Z}^2
          \\]
          For \\(G = \\mathbb{Z}/2\\):
          \\[
          H^1(T^2; \\mathbb{Z}/2) \\cong \\text{Hom}(\\mathbb{Z}^2, \\mathbb{Z}/2) = (\\mathbb{Z}/2)^2
          \\]
        </div>
      `,
      visualizations: [
        {
          id: 'ext-tor-calculator',
          title: 'Ext and Tor Calculator',
          description: 'See the UCT in action: compute Ext(A, G) for various groups.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                groupA: 'Z2', // 'Z', 'Z2', 'Z3', 'Z4'
                groupG: 'Z', // 'Z', 'Z2', 'Q'
                functor: 'Ext' // 'Ext', 'Hom'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const groups = {
                Z: { name: 'ℤ', desc: 'Integers' },
                Z2: { name: 'ℤ/2', desc: 'Cyclic order 2' },
                Z3: { name: 'ℤ/3', desc: 'Cyclic order 3' },
                Z4: { name: 'ℤ/4', desc: 'Cyclic order 4' },
                Q: { name: 'ℚ', desc: 'Rationals' }
              };

              const A = groups[viz.state.groupA];
              const G = groups[viz.state.groupG];

              // Compute Ext and Hom
              const computeExt = (a, g) => {
                if (a === 'Z') return '0';
                if (g === 'Q') return '0'; // Q is divisible
                if (a === 'Z2' && g === 'Z') return 'ℤ/2';
                if (a === 'Z2' && g === 'Z2') return 'ℤ/2';
                if (a === 'Z3' && g === 'Z') return 'ℤ/3';
                if (a === 'Z4' && g === 'Z') return 'ℤ/4';
                return '?';
              };

              const computeHom = (a, g) => {
                if (a === 'Z' && g === 'Z') return 'ℤ';
                if (a === 'Z' && g === 'Z2') return 'ℤ/2';
                if (a === 'Z' && g === 'Q') return 'ℚ';
                if (a === 'Z2' && g === 'Z') return '0';
                if (a === 'Z2' && g === 'Z2') return 'ℤ/2';
                if (a === 'Z3' && g === 'Z') return '0';
                if (a === 'Z4' && g === 'Z2') return 'ℤ/2';
                return '?';
              };

              const extValue = computeExt(viz.state.groupA, viz.state.groupG);
              const homValue = computeHom(viz.state.groupA, viz.state.groupG);

              const centerX = width / 2;
              const centerY = height / 2;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Universal Coefficient Theorem Calculator', centerX, 30);

              // Input groups
              ctx.font = '15px KaTeX_Main';
              ctx.fillText(`A = ${A.name}`, centerX - 150, 80);
              ctx.fillText(`G = ${G.name}`, centerX + 150, 80);

              // Formulas
              const formulaY = centerY - 60;
              ctx.fillStyle = '#3498db';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.fillText('Hom(A, G)', centerX - 150, formulaY);
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.fillText('(free part)', centerX - 150, formulaY + 20);

              ctx.fillStyle = '#e74c3c';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.fillText('Ext(A, G)', centerX + 150, formulaY);
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.fillText('(torsion part)', centerX + 150, formulaY + 20);

              // Results
              const resY = centerY + 20;
              ctx.strokeStyle = '#3498db';
              ctx.lineWidth = 3;
              ctx.strokeRect(centerX - 230, resY, 160, 60);
              ctx.fillStyle = '#3498db';
              ctx.font = 'bold 20px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(homValue, centerX - 150, resY + 38);

              ctx.strokeStyle = '#e74c3c';
              ctx.strokeRect(centerX + 70, resY, 160, 60);
              ctx.fillStyle = '#e74c3c';
              ctx.fillText(extValue, centerX + 150, resY + 38);

              // UCT formula
              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              ctx.textAlign = 'center';
              const uctY = height - 60;
              ctx.fillText('UCT: Hⁿ(X; G) ≅ Hom(Hₙ(X), G) ⊕ Ext(Hₙ₋₁(X), G)', centerX, uctY);
              ctx.font = '12px KaTeX_Main';
              ctx.fillText('(splits non-canonically)', centerX, uctY + 20);
            },
            controls: [
              {
                type: 'select',
                id: 'groupA',
                label: 'Group A',
                options: [
                  { value: 'Z', label: 'ℤ' },
                  { value: 'Z2', label: 'ℤ/2' },
                  { value: 'Z3', label: 'ℤ/3' },
                  { value: 'Z4', label: 'ℤ/4' }
                ],
                value: 'Z2'
              },
              {
                type: 'select',
                id: 'groupG',
                label: 'Group G',
                options: [
                  { value: 'Z', label: 'ℤ' },
                  { value: 'Z2', label: 'ℤ/2' },
                  { value: 'Q', label: 'ℚ' }
                ],
                value: 'Z'
              }
            ]
          }
        },
        {
          id: 'coefficient-change',
          title: 'Coefficient Change Comparison',
          description: 'Compare Hⁿ(X; ℤ), Hⁿ(X; ℤ/2), Hⁿ(X; ℚ) for the same space.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.5,
            setup: (viz) => {
              viz.state = {
                space: 'rp2' // 'circle', 'rp2', 'torus'
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const spaces = {
                circle: {
                  name: 'S¹',
                  Z: ['ℤ', 'ℤ', '0'],
                  Z2: ['ℤ/2', 'ℤ/2', '0'],
                  Q: ['ℚ', 'ℚ', '0']
                },
                rp2: {
                  name: 'ℝP²',
                  Z: ['ℤ', '0', 'ℤ/2'],
                  Z2: ['ℤ/2', 'ℤ/2', 'ℤ/2'],
                  Q: ['ℚ', '0', '0']
                },
                torus: {
                  name: 'T²',
                  Z: ['ℤ', 'ℤ²', 'ℤ'],
                  Z2: ['ℤ/2', '(ℤ/2)²', 'ℤ/2'],
                  Q: ['ℚ', 'ℚ²', 'ℚ']
                }
              };

              const current = spaces[viz.state.space];

              const centerX = width / 2;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Cohomology of ${current.name} with different coefficients`, centerX, 30);

              // Table
              const tableY = 80;
              const rowHeight = 40;
              const colWidth = 150;

              const headers = ['Degree', 'ℤ coeff', 'ℤ/2 coeff', 'ℚ coeff'];
              const rows = [
                ['H⁰', current.Z[0], current.Z2[0], current.Q[0]],
                ['H¹', current.Z[1], current.Z2[1], current.Q[1]],
                ['H²', current.Z[2], current.Z2[2], current.Q[2]]
              ];

              // Draw headers
              headers.forEach((h, i) => {
                const x = 50 + i * colWidth;
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 15px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText(h, x, tableY);
              });

              // Draw rows
              rows.forEach((row, ri) => {
                row.forEach((cell, ci) => {
                  const x = 50 + ci * colWidth;
                  const y = tableY + (ri + 1) * rowHeight;

                  ctx.strokeStyle = '#bdc3c7';
                  ctx.lineWidth = 1;
                  ctx.strokeRect(x - 70, y - 25, 140, 35);

                  ctx.fillStyle = ci === 0 ? '#e74c3c' : '#000';
                  ctx.font = ci === 0 ? 'bold 14px KaTeX_Main' : '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(cell, x, y - 5);
                });
              });

              // Observations
              const obsY = tableY + 4 * rowHeight + 40;
              ctx.fillStyle = '#000';
              ctx.font = 'bold 14px KaTeX_Main';
              ctx.textAlign = 'left';
              ctx.fillText('Observations:', 20, obsY);
              ctx.font = '13px KaTeX_Main';

              if (viz.state.space === 'rp2') {
                ctx.fillText('• ℤ coefficients: torsion appears in H² (from Ext)', 40, obsY + 25);
                ctx.fillText('• ℤ/2 coefficients: all groups non-zero (mod 2 kills torsion issues)', 40, obsY + 45);
                ctx.fillText('• ℚ coefficients: torsion vanishes (ℚ is divisible)', 40, obsY + 65);
              } else if (viz.state.space === 'torus') {
                ctx.fillText('• Torsion-free homology ⟹ Hⁿ(X; G) ≅ Hom(Hₙ(X), G)', 40, obsY + 25);
                ctx.fillText('• Coefficient change just applies Hom(-, G) to each Hₙ', 40, obsY + 45);
              }
            },
            controls: [
              {
                type: 'select',
                id: 'space',
                label: 'Space',
                options: [
                  { value: 'circle', label: 'S¹ (Circle)' },
                  { value: 'rp2', label: 'ℝP² (Projective Plane)' },
                  { value: 'torus', label: 'T² (Torus)' }
                ],
                value: 'rp2'
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-uct-1',
          question: 'Use the UCT to compute \\(H^1(\\mathbb{R}P^2; \\mathbb{Z})\\) and \\(H^2(\\mathbb{R}P^2; \\mathbb{Z})\\).',
          hint: 'Homology: \\(H_0 = \\mathbb{Z}\\), \\(H_1 = \\mathbb{Z}/2\\), \\(H_2 = 0\\). Use \\(\\text{Ext}(\\mathbb{Z}/2, \\mathbb{Z}) = \\mathbb{Z}/2\\).',
          solution: `Homology of \\(\\mathbb{R}P^2\\): \\(H_0 = \\mathbb{Z}\\), \\(H_1 = \\mathbb{Z}/2\\), \\(H_2 = 0\\).

          <strong>\\(H^1(\\mathbb{R}P^2; \\mathbb{Z})\\):</strong>
          \\[
          H^1 = \\text{Hom}(H_1, \\mathbb{Z}) \\oplus \\text{Ext}(H_0, \\mathbb{Z})
          \\]
          \\[
          = \\text{Hom}(\\mathbb{Z}/2, \\mathbb{Z}) \\oplus \\text{Ext}(\\mathbb{Z}, \\mathbb{Z}) = 0 \\oplus 0 = 0
          \\]
          (\\(\\text{Hom}(\\mathbb{Z}/2, \\mathbb{Z}) = 0\\) since \\(\\mathbb{Z}\\) has no elements of order 2.)

          <strong>\\(H^2(\\mathbb{R}P^2; \\mathbb{Z})\\):</strong>
          \\[
          H^2 = \\text{Hom}(H_2, \\mathbb{Z}) \\oplus \\text{Ext}(H_1, \\mathbb{Z})
          \\]
          \\[
          = \\text{Hom}(0, \\mathbb{Z}) \\oplus \\text{Ext}(\\mathbb{Z}/2, \\mathbb{Z}) = 0 \\oplus \\mathbb{Z}/2 = \\mathbb{Z}/2
          \\]

          Result: \\(H^*(\\mathbb{R}P^2; \\mathbb{Z}) = (\\mathbb{Z}, 0, \\mathbb{Z}/2)\\). \\(\\square\\)`
        },
        {
          id: 'ex-uct-2',
          question: 'Compute \\(H^1(S^1; \\mathbb{Z}/2)\\).',
          hint: 'Use \\(H_0(S^1) = \\mathbb{Z}\\), \\(H_1(S^1) = \\mathbb{Z}\\).',
          solution: `Homology: \\(H_0(S^1) = \\mathbb{Z}\\), \\(H_1(S^1) = \\mathbb{Z}\\).

          \\[
          H^1(S^1; \\mathbb{Z}/2) = \\text{Hom}(H_1, \\mathbb{Z}/2) \\oplus \\text{Ext}(H_0, \\mathbb{Z}/2)
          \\]
          \\[
          = \\text{Hom}(\\mathbb{Z}, \\mathbb{Z}/2) \\oplus \\text{Ext}(\\mathbb{Z}, \\mathbb{Z}/2)
          \\]
          <ul>
            <li>\\(\\text{Hom}(\\mathbb{Z}, \\mathbb{Z}/2) = \\mathbb{Z}/2\\) (generators: \\(1 \\mapsto 0\\) or \\(1 \\mapsto 1\\)).</li>
            <li>\\(\\text{Ext}(\\mathbb{Z}, \\mathbb{Z}/2) = 0\\) (\\(\\mathbb{Z}\\) is free).</li>
          </ul>
          Result: \\(H^1(S^1; \\mathbb{Z}/2) = \\mathbb{Z}/2\\). \\(\\square\\)`
        }
      ]
    },
    {
      id: 'comparison',
      title: 'Comparison: Homology vs Cohomology',
      content: `
        <div class="env-block comparison">
          <strong>Homology vs Cohomology: Side-by-Side</strong>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background: #ecf0f1;">
              <th style="border: 1px solid #bdc3c7; padding: 10px;">Aspect</th>
              <th style="border: 1px solid #bdc3c7; padding: 10px;">Homology \\(H_n(X; G)\\)</th>
              <th style="border: 1px solid #bdc3c7; padding: 10px;">Cohomology \\(H^n(X; G)\\)</th>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Definition</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H_n = \\ker(\\partial_n) / \\text{im}(\\partial_{n+1})\\)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H^n = \\ker(\\delta^n) / \\text{im}(\\delta^{n-1})\\)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Objects</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Chains (formal sums of simplices)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Cochains (functions on chains)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Boundary map</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(\\partial: C_n \\to C_{n-1}\\) (decreases dimension)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(\\delta: C^n \\to C^{n+1}\\) (increases dimension)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Functoriality</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Covariant: \\(f: X \\to Y\\) gives \\(f_*: H_*(X) \\to H_*(Y)\\)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Contravariant: \\(f: X \\to Y\\) gives \\(f^*: H^*(Y) \\to H^*(X)\\)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Algebraic structure</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Abelian groups \\(H_n(X)\\)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Graded ring \\(H^*(X) = \\bigoplus_n H^n(X)\\) with cup product</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Relationship</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">—</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H^n(X; G) \\cong \\text{Hom}(H_n(X), G) \\oplus \\text{Ext}(H_{n-1}(X), G)\\)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Torsion-free case</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H_n(X)\\) free abelian</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\(H^n(X; G) \\cong \\text{Hom}(H_n(X), G)\\)</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Example: \\(\\mathbb{R}P^2\\)</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\((\\mathbb{Z}, \\mathbb{Z}/2, 0)\\)</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\\((\\mathbb{Z}, 0, \\mathbb{Z}/2)\\) with \\(\\mathbb{Z}\\) coefficients</td>
            </tr>
            <tr>
              <td style="border: 1px solid #bdc3c7; padding: 8px;"><strong>Applications</strong></td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Fixed points, degree, Lefschetz number</td>
              <td style="border: 1px solid #bdc3c7; padding: 8px;">Characteristic classes, cup product, de Rham cohomology</td>
            </tr>
          </table>
        </div>

        <div class="env-block remark">
          <strong>When to use which?</strong>
          <ul>
            <li><strong>Homology:</strong> More geometric (counts holes), easier to visualize. Use for computing Betti numbers, Euler characteristic.</li>
            <li><strong>Cohomology:</strong> More algebraic structure (ring!), better for characteristic classes, obstruction theory. Essential in differential geometry and algebraic topology.</li>
            <li><strong>Both:</strong> Carry the same information for nice spaces (via UCT), but cohomology has extra structure.</li>
          </ul>
        </div>

        <div class="env-block example">
          <strong>Example (Cup Product):</strong> Cohomology has a <strong>cup product</strong> \\(\\smile: H^p(X) \\otimes H^q(X) \\to H^{p+q}(X)\\), making \\(H^*(X)\\) a graded-commutative ring. Homology has no such product.

          For \\(T^2\\), the cup product on \\(H^1(T^2; \\mathbb{Z}) = \\mathbb{Z}^2\\) (generated by \\(\\alpha, \\beta\\)) gives:
          \\[
          \\alpha \\smile \\beta \\in H^2(T^2; \\mathbb{Z}) = \\mathbb{Z}
          \\]
          (the orientation class). This captures the non-commutativity of loops on the torus!
        </div>

        <div class="env-block theorem">
          <strong>Poincaré Duality (Preview):</strong> For a closed, oriented \\(n\\)-manifold \\(M\\):
          \\[
          H^k(M; \\mathbb{Z}) \\cong H_{n-k}(M; \\mathbb{Z})
          \\]
          This relates cohomology and homology in complementary dimensions—a deep result we'll explore in later chapters.
        </div>
      `,
      visualizations: [
        {
          id: 'homology-cohomology-table',
          title: 'Homology vs Cohomology Comparison Table',
          description: 'Interactive comparison of homology and cohomology for various spaces.',
          canvas: {
            type: 'interactive',
            aspectRatio: 1.6,
            setup: (viz) => {
              viz.state = {
                space: 'rp2',
                showHomology: true,
                showCohomology: true
              };
            },
            draw: (viz, ctx, width, height) => {
              ctx.clearRect(0, 0, width, height);

              const spaces = {
                circle: {
                  name: 'S¹',
                  homology: ['ℤ', 'ℤ', '0'],
                  cohomology: ['ℤ', 'ℤ', '0']
                },
                rp2: {
                  name: 'ℝP²',
                  homology: ['ℤ', 'ℤ/2', '0'],
                  cohomology: ['ℤ', '0', 'ℤ/2']
                },
                torus: {
                  name: 'T²',
                  homology: ['ℤ', 'ℤ²', 'ℤ'],
                  cohomology: ['ℤ', 'ℤ²', 'ℤ']
                }
              };

              const current = spaces[viz.state.space];

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText(`Comparison for ${current.name}`, width / 2, 30);

              const leftX = width * 0.3;
              const rightX = width * 0.7;
              const startY = 80;
              const rowHeight = 50;

              // Homology column
              if (viz.state.showHomology) {
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.fillText('Homology', leftX, startY);

                current.homology.forEach((group, i) => {
                  const y = startY + (i + 1) * rowHeight;
                  ctx.strokeStyle = '#3498db';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(leftX - 60, y - 25, 120, 40);
                  ctx.fillStyle = '#000';
                  ctx.font = '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(`H${i} = ${group}`, leftX, y);
                });
              }

              // Cohomology column
              if (viz.state.showCohomology) {
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Cohomology', rightX, startY);

                current.cohomology.forEach((group, i) => {
                  const y = startY + (i + 1) * rowHeight;
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(rightX - 60, y - 25, 120, 40);
                  ctx.fillStyle = '#000';
                  ctx.font = '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText(`H${i} = ${group}`, rightX, y);
                });
              }

              // Highlight differences
              if (viz.state.space === 'rp2' && viz.state.showHomology && viz.state.showCohomology) {
                ctx.strokeStyle = '#e74c3c';
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 5]);
                ctx.strokeRect(leftX - 60, startY + 2 * rowHeight - 25, 120, 40);
                ctx.strokeRect(rightX - 60, startY + 3 * rowHeight - 25, 120, 40);
                ctx.setLineDash([]);

                ctx.fillStyle = '#e74c3c';
                ctx.font = '12px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Torsion shifts!', width / 2, height - 40);
                ctx.fillText('H₁ has ℤ/2, but H¹ = 0. Instead, H² has ℤ/2 (from Ext).', width / 2, height - 20);
              }
            },
            controls: [
              {
                type: 'select',
                id: 'space',
                label: 'Space',
                options: [
                  { value: 'circle', label: 'S¹' },
                  { value: 'rp2', label: 'ℝP²' },
                  { value: 'torus', label: 'T²' }
                ],
                value: 'rp2'
              },
              {
                type: 'checkbox',
                id: 'showHomology',
                label: 'Show Homology',
                value: true
              },
              {
                type: 'checkbox',
                id: 'showCohomology',
                label: 'Show Cohomology',
                value: true
              }
            ]
          }
        }
      ],
      exercises: [
        {
          id: 'ex-comparison',
          question: 'Explain why \\(H_1(\\mathbb{R}P^2) = \\mathbb{Z}/2\\) but \\(H^1(\\mathbb{R}P^2; \\mathbb{Z}) = 0\\).',
          hint: 'Use the UCT: \\(H^1 = \\text{Hom}(H_1, \\mathbb{Z}) \\oplus \\text{Ext}(H_0, \\mathbb{Z})\\).',
          solution: `Homology: \\(H_1(\\mathbb{R}P^2) = \\mathbb{Z}/2\\), \\(H_0(\\mathbb{R}P^2) = \\mathbb{Z}\\).

          UCT for cohomology:
          \\[
          H^1(\\mathbb{R}P^2; \\mathbb{Z}) = \\text{Hom}(H_1, \\mathbb{Z}) \\oplus \\text{Ext}(H_0, \\mathbb{Z})
          \\]
          <ul>
            <li>\\(\\text{Hom}(\\mathbb{Z}/2, \\mathbb{Z}) = 0\\): There are no non-trivial homomorphisms from \\(\\mathbb{Z}/2\\) to \\(\\mathbb{Z}\\), since \\(\\mathbb{Z}\\) has no elements of order 2.</li>
            <li>\\(\\text{Ext}(\\mathbb{Z}, \\mathbb{Z}) = 0\\): \\(\\mathbb{Z}\\) is free.</li>
          </ul>
          Thus \\(H^1(\\mathbb{R}P^2; \\mathbb{Z}) = 0 \\oplus 0 = 0\\).

          <strong>Why the difference?</strong> The torsion in \\(H_1\\) doesn't contribute to \\(H^1\\) (since \\(\\text{Hom}(\\mathbb{Z}/2, \\mathbb{Z}) = 0\\)), but it does contribute to \\(H^2\\) via \\(\\text{Ext}(\\mathbb{Z}/2, \\mathbb{Z}) = \\mathbb{Z}/2\\). Torsion "shifts up one dimension" in cohomology! \\(\\square\\)`
        }
      ]
    }
  ]
});
