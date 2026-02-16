// Updated: 2026-02-16 13:48:43
window.CHAPTERS.push({
  id: 'ch11',
  number: 11,
  title: 'Cohomology Groups',
  subtitle: 'Dual Theory with Extra Structure',
  sections: [
    {
      id: 'cochain-complex',
      title: 'Cochain Complex C^n(X; G) = Hom(Cn(X), G)',
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

        <div class="viz-placeholder" data-viz="dual-complex-viz"></div>
      `,
      visualizations: [
        {
          id: 'dual-complex-viz',
          title: 'Dual Complex Visualizer',
          description: 'See Hom(Cn, G) as linear functionals on chains.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.6);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              dimension: 1,
              coefficientGroup: 'Z',
              showDual: true
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var groups = {
                Z: { name: '\u2124', description: 'Integers' },
                Z2: { name: '\u2124/2', description: 'Mod 2' },
                Q: { name: '\u211A', description: 'Rationals' }
              };

              var G = groups[state.coefficientGroup];
              var n = state.dimension;

              var centerX = width / 2;
              var leftX = width * 0.25;
              var rightX = width * 0.75;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Cochain Complex with coefficients in ' + G.name, centerX, 30);

              // Chains (left)
              ctx.fillStyle = '#3498db';
              ctx.font = 'bold 16px KaTeX_Main';
              ctx.fillText('Chains', leftX, 70);

              ctx.fillStyle = '#000';
              ctx.font = '14px KaTeX_Main';
              var chainY = 120;
              var spacing = 60;
              ['C\u2082(X)', 'C\u2081(X)', 'C\u2080(X)'].forEach(function(label, i) {
                var y = chainY + i * spacing;
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
                  ctx.fillText('\u2202', leftX + 25, y + spacing / 2);
                }
              });

              // Cochains (right)
              if (state.showDual) {
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Cochains', rightX, 70);

                ctx.fillStyle = '#000';
                ctx.font = '14px KaTeX_Main';
                ['C\u2070(X;' + G.name + ')', 'C\u00B9(X;' + G.name + ')', 'C\u00B2(X;' + G.name + ')'].forEach(function(label, i) {
                  var y = chainY + (2 - i) * spacing;
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
                    ctx.fillText('\u03B4', rightX + 30, y - spacing / 2);
                  }
                });

                // Hom arrows
                for (var i = 0; i < 3; i++) {
                  var y = chainY + i * spacing;
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
              ctx.fillText('C\u207F(X; ' + G.name + ') = Hom(C\u2099(X), ' + G.name + ')', 10, height - 50);
              ctx.fillText('Coboundary: (\u03B4\u03C6)(c) = \u03C6(\u2202c)', 10, height - 30);
              ctx.fillText('Cohomology: H\u207F(X; ' + G.name + ') = ker(\u03B4) / im(\u03B4)', 10, height - 10);
            }

            // Controls: slider (dimension)
            var dimLabel = document.createElement('label');
            dimLabel.style.color = '#c9d1d9';
            dimLabel.style.marginRight = '8px';
            dimLabel.textContent = 'Dimension: 1';
            controls.appendChild(dimLabel);
            var dimSlider = document.createElement('input');
            dimSlider.type = 'range';
            dimSlider.min = 0; dimSlider.max = 2; dimSlider.step = 1; dimSlider.value = 1;
            dimSlider.style.width = '200px';
            dimSlider.oninput = function() {
              state.dimension = parseInt(dimSlider.value);
              dimLabel.textContent = 'Dimension: ' + dimSlider.value;
              draw();
            };
            controls.appendChild(dimSlider);

            // Controls: select (coefficientGroup)
            var coeffLabel = document.createElement('label');
            coeffLabel.style.color = '#c9d1d9';
            coeffLabel.style.marginLeft = '15px';
            coeffLabel.style.marginRight = '8px';
            coeffLabel.textContent = 'Coefficient Group G: ';
            controls.appendChild(coeffLabel);
            var coeffSelect = document.createElement('select');
            coeffSelect.style.background = '#161b22'; coeffSelect.style.color = '#c9d1d9'; coeffSelect.style.border = '1px solid #30363d'; coeffSelect.style.padding = '4px 8px'; coeffSelect.style.borderRadius = '4px';
            [{value:'Z',label:'\u2124 (integers)'},{value:'Z2',label:'\u2124/2 (mod 2)'},{value:'Q',label:'\u211A (rationals)'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              coeffSelect.appendChild(o);
            });
            coeffSelect.value = 'Z';
            coeffSelect.onchange = function() { state.coefficientGroup = coeffSelect.value; draw(); };
            controls.appendChild(coeffSelect);

            // Controls: checkbox (showDual)
            var dualContainer = document.createElement('label');
            dualContainer.style.color = '#c9d1d9';
            dualContainer.style.marginLeft = '15px';
            dualContainer.style.cursor = 'pointer';
            var dualCheckbox = document.createElement('input');
            dualCheckbox.type = 'checkbox';
            dualCheckbox.checked = true;
            dualCheckbox.onchange = function() { state.showDual = dualCheckbox.checked; draw(); };
            dualContainer.appendChild(dualCheckbox);
            dualContainer.appendChild(document.createTextNode(' Show Cochain Complex'));
            controls.appendChild(dualContainer);

            draw();
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
        </div>

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
            <li><strong>Duality:</strong> Poincare duality relates \\(H^k(M)\\) and \\(H_{n-k}(M)\\) for \\(n\\)-manifolds.</li>
          </ol>
        </div>

        <div class="viz-placeholder" data-viz="contravariant-viz"></div>
      `,
      visualizations: [
        {
          id: 'contravariant-viz',
          title: 'Contravariant Functor Visualizer',
          description: 'See how f induces f* backwards in cohomology.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              showHomology: true,
              showCohomology: true
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var leftX = width * 0.25;
              var rightX = width * 0.75;
              var topY = height * 0.3;
              var bottomY = height * 0.7;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Contravariance: f induces f* in opposite direction', width / 2, 30);

              // Spaces
              var drawSpace = function(x, y, label) {
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

              // Map f: X -> Y
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
              if (state.showHomology) {
                var hy = bottomY - 80;
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.fillText('Homology (covariant)', width / 2, hy - 30);

                var drawHom = function(x, y, label) {
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
              if (state.showCohomology) {
                var cy = bottomY + 40;
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 14px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Cohomology (contravariant)', width / 2, cy - 30);

                var drawCoh = function(x, y, label) {
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
            }

            // Controls: checkbox (showHomology)
            var homContainer = document.createElement('label');
            homContainer.style.color = '#c9d1d9';
            homContainer.style.cursor = 'pointer';
            var homCheckbox = document.createElement('input');
            homCheckbox.type = 'checkbox';
            homCheckbox.checked = true;
            homCheckbox.onchange = function() { state.showHomology = homCheckbox.checked; draw(); };
            homContainer.appendChild(homCheckbox);
            homContainer.appendChild(document.createTextNode(' Show Homology'));
            controls.appendChild(homContainer);

            // Controls: checkbox (showCohomology)
            var cohContainer = document.createElement('label');
            cohContainer.style.color = '#c9d1d9';
            cohContainer.style.marginLeft = '15px';
            cohContainer.style.cursor = 'pointer';
            var cohCheckbox = document.createElement('input');
            cohCheckbox.type = 'checkbox';
            cohCheckbox.checked = true;
            cohCheckbox.onchange = function() { state.showCohomology = cohCheckbox.checked; draw(); };
            cohContainer.appendChild(cohCheckbox);
            cohContainer.appendChild(document.createTextNode(' Show Cohomology'));
            controls.appendChild(cohContainer);

            draw();
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

        <div class="viz-placeholder" data-viz="ext-tor-calculator"></div>
        <div class="viz-placeholder" data-viz="coefficient-change"></div>
      `,
      visualizations: [
        {
          id: 'ext-tor-calculator',
          title: 'Ext and Tor Calculator',
          description: 'See the UCT in action: compute Ext(A, G) for various groups.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              groupA: 'Z2',
              groupG: 'Z'
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var groups = {
                Z: { name: '\u2124', desc: 'Integers' },
                Z2: { name: '\u2124/2', desc: 'Cyclic order 2' },
                Z3: { name: '\u2124/3', desc: 'Cyclic order 3' },
                Z4: { name: '\u2124/4', desc: 'Cyclic order 4' },
                Q: { name: '\u211A', desc: 'Rationals' }
              };

              var A = groups[state.groupA];
              var G = groups[state.groupG];

              // Compute Ext and Hom
              var computeExt = function(a, g) {
                if (a === 'Z') return '0';
                if (g === 'Q') return '0';
                if (a === 'Z2' && g === 'Z') return '\u2124/2';
                if (a === 'Z2' && g === 'Z2') return '\u2124/2';
                if (a === 'Z3' && g === 'Z') return '\u2124/3';
                if (a === 'Z4' && g === 'Z') return '\u2124/4';
                return '?';
              };

              var computeHom = function(a, g) {
                if (a === 'Z' && g === 'Z') return '\u2124';
                if (a === 'Z' && g === 'Z2') return '\u2124/2';
                if (a === 'Z' && g === 'Q') return '\u211A';
                if (a === 'Z2' && g === 'Z') return '0';
                if (a === 'Z2' && g === 'Z2') return '\u2124/2';
                if (a === 'Z3' && g === 'Z') return '0';
                if (a === 'Z4' && g === 'Z2') return '\u2124/2';
                return '?';
              };

              var extValue = computeExt(state.groupA, state.groupG);
              var homValue = computeHom(state.groupA, state.groupG);

              var centerX = width / 2;
              var centerY = height / 2;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Universal Coefficient Theorem Calculator', centerX, 30);

              // Input groups
              ctx.font = '15px KaTeX_Main';
              ctx.fillText('A = ' + A.name, centerX - 150, 80);
              ctx.fillText('G = ' + G.name, centerX + 150, 80);

              // Formulas
              var formulaY = centerY - 60;
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
              var resY = centerY + 20;
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
              var uctY = height - 60;
              ctx.fillText('UCT: H\u207F(X; G) \u2245 Hom(H\u2099(X), G) \u2295 Ext(H\u2099\u208B\u2081(X), G)', centerX, uctY);
              ctx.font = '12px KaTeX_Main';
              ctx.fillText('(splits non-canonically)', centerX, uctY + 20);
            }

            // Controls: select (groupA)
            var aLabel = document.createElement('label');
            aLabel.style.color = '#c9d1d9';
            aLabel.style.marginRight = '8px';
            aLabel.textContent = 'Group A: ';
            controls.appendChild(aLabel);
            var aSelect = document.createElement('select');
            aSelect.style.background = '#161b22'; aSelect.style.color = '#c9d1d9'; aSelect.style.border = '1px solid #30363d'; aSelect.style.padding = '4px 8px'; aSelect.style.borderRadius = '4px';
            [{value:'Z',label:'\u2124'},{value:'Z2',label:'\u2124/2'},{value:'Z3',label:'\u2124/3'},{value:'Z4',label:'\u2124/4'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              aSelect.appendChild(o);
            });
            aSelect.value = 'Z2';
            aSelect.onchange = function() { state.groupA = aSelect.value; draw(); };
            controls.appendChild(aSelect);

            // Controls: select (groupG)
            var gLabel = document.createElement('label');
            gLabel.style.color = '#c9d1d9';
            gLabel.style.marginLeft = '15px';
            gLabel.style.marginRight = '8px';
            gLabel.textContent = 'Group G: ';
            controls.appendChild(gLabel);
            var gSelect = document.createElement('select');
            gSelect.style.background = '#161b22'; gSelect.style.color = '#c9d1d9'; gSelect.style.border = '1px solid #30363d'; gSelect.style.padding = '4px 8px'; gSelect.style.borderRadius = '4px';
            [{value:'Z',label:'\u2124'},{value:'Z2',label:'\u2124/2'},{value:'Q',label:'\u211A'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              gSelect.appendChild(o);
            });
            gSelect.value = 'Z';
            gSelect.onchange = function() { state.groupG = gSelect.value; draw(); };
            controls.appendChild(gSelect);

            draw();
          }
        },
        {
          id: 'coefficient-change',
          title: 'Coefficient Change Comparison',
          description: 'Compare Hn(X; Z), Hn(X; Z/2), Hn(X; Q) for the same space.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              space: 'rp2'
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var spaces = {
                circle: {
                  name: 'S\u00B9',
                  Z: ['\u2124', '\u2124', '0'],
                  Z2: ['\u2124/2', '\u2124/2', '0'],
                  Q: ['\u211A', '\u211A', '0']
                },
                rp2: {
                  name: '\u211DP\u00B2',
                  Z: ['\u2124', '0', '\u2124/2'],
                  Z2: ['\u2124/2', '\u2124/2', '\u2124/2'],
                  Q: ['\u211A', '0', '0']
                },
                torus: {
                  name: 'T\u00B2',
                  Z: ['\u2124', '\u2124\u00B2', '\u2124'],
                  Z2: ['\u2124/2', '(\u2124/2)\u00B2', '\u2124/2'],
                  Q: ['\u211A', '\u211A\u00B2', '\u211A']
                }
              };

              var current = spaces[state.space];

              var centerX = width / 2;

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Cohomology of ' + current.name + ' with different coefficients', centerX, 30);

              // Table
              var tableY = 80;
              var rowHeight = 40;
              var colWidth = 150;

              var headers = ['Degree', '\u2124 coeff', '\u2124/2 coeff', '\u211A coeff'];
              var rows = [
                ['H\u2070', current.Z[0], current.Z2[0], current.Q[0]],
                ['H\u00B9', current.Z[1], current.Z2[1], current.Q[1]],
                ['H\u00B2', current.Z[2], current.Z2[2], current.Q[2]]
              ];

              // Draw headers
              headers.forEach(function(h, i) {
                var x = 50 + i * colWidth;
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 15px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText(h, x, tableY);
              });

              // Draw rows
              rows.forEach(function(row, ri) {
                row.forEach(function(cell, ci) {
                  var x = 50 + ci * colWidth;
                  var y = tableY + (ri + 1) * rowHeight;

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
              var obsY = tableY + 4 * rowHeight + 40;
              ctx.fillStyle = '#000';
              ctx.font = 'bold 14px KaTeX_Main';
              ctx.textAlign = 'left';
              ctx.fillText('Observations:', 20, obsY);
              ctx.font = '13px KaTeX_Main';

              if (state.space === 'rp2') {
                ctx.fillText('\u2022 \u2124 coefficients: torsion appears in H\u00B2 (from Ext)', 40, obsY + 25);
                ctx.fillText('\u2022 \u2124/2 coefficients: all groups non-zero (mod 2 kills torsion issues)', 40, obsY + 45);
                ctx.fillText('\u2022 \u211A coefficients: torsion vanishes (\u211A is divisible)', 40, obsY + 65);
              } else if (state.space === 'torus') {
                ctx.fillText('\u2022 Torsion-free homology \u27F9 H\u207F(X; G) \u2245 Hom(H\u2099(X), G)', 40, obsY + 25);
                ctx.fillText('\u2022 Coefficient change just applies Hom(-, G) to each H\u2099', 40, obsY + 45);
              }
            }

            // Controls: select (space)
            var spaceLabel = document.createElement('label');
            spaceLabel.style.color = '#c9d1d9';
            spaceLabel.style.marginRight = '8px';
            spaceLabel.textContent = 'Space: ';
            controls.appendChild(spaceLabel);
            var spaceSelect = document.createElement('select');
            spaceSelect.style.background = '#161b22'; spaceSelect.style.color = '#c9d1d9'; spaceSelect.style.border = '1px solid #30363d'; spaceSelect.style.padding = '4px 8px'; spaceSelect.style.borderRadius = '4px';
            [{value:'circle',label:'S\u00B9 (Circle)'},{value:'rp2',label:'\u211DP\u00B2 (Projective Plane)'},{value:'torus',label:'T\u00B2 (Torus)'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              spaceSelect.appendChild(o);
            });
            spaceSelect.value = 'rp2';
            spaceSelect.onchange = function() { state.space = spaceSelect.value; draw(); };
            controls.appendChild(spaceSelect);

            draw();
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
              <td style="border: 1px solid #bdc3c7; padding: 8px;">\u2014</td>
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
          <strong>Poincare Duality (Preview):</strong> For a closed, oriented \\(n\\)-manifold \\(M\\):
          \\[
          H^k(M; \\mathbb{Z}) \\cong H_{n-k}(M; \\mathbb{Z})
          \\]
          This relates cohomology and homology in complementary dimensions\u2014a deep result we'll explore in later chapters.
        </div>

        <div class="viz-placeholder" data-viz="homology-cohomology-table"></div>
      `,
      visualizations: [
        {
          id: 'homology-cohomology-table',
          title: 'Homology vs Cohomology Comparison Table',
          description: 'Interactive comparison of homology and cohomology for various spaces.',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.6);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');

            var state = {
              space: 'rp2',
              showHomology: true,
              showCohomology: true
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);

              var spaces = {
                circle: {
                  name: 'S\u00B9',
                  homology: ['\u2124', '\u2124', '0'],
                  cohomology: ['\u2124', '\u2124', '0']
                },
                rp2: {
                  name: '\u211DP\u00B2',
                  homology: ['\u2124', '\u2124/2', '0'],
                  cohomology: ['\u2124', '0', '\u2124/2']
                },
                torus: {
                  name: 'T\u00B2',
                  homology: ['\u2124', '\u2124\u00B2', '\u2124'],
                  cohomology: ['\u2124', '\u2124\u00B2', '\u2124']
                }
              };

              var current = spaces[state.space];

              // Title
              ctx.fillStyle = '#000';
              ctx.font = 'bold 18px KaTeX_Main';
              ctx.textAlign = 'center';
              ctx.fillText('Comparison for ' + current.name, width / 2, 30);

              var leftX = width * 0.3;
              var rightX = width * 0.7;
              var startY = 80;
              var rowHeight = 50;

              // Homology column
              if (state.showHomology) {
                ctx.fillStyle = '#3498db';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.fillText('Homology', leftX, startY);

                current.homology.forEach(function(group, i) {
                  var y = startY + (i + 1) * rowHeight;
                  ctx.strokeStyle = '#3498db';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(leftX - 60, y - 25, 120, 40);
                  ctx.fillStyle = '#000';
                  ctx.font = '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText('H' + i + ' = ' + group, leftX, y);
                });
              }

              // Cohomology column
              if (state.showCohomology) {
                ctx.fillStyle = '#9b59b6';
                ctx.font = 'bold 16px KaTeX_Main';
                ctx.textAlign = 'center';
                ctx.fillText('Cohomology', rightX, startY);

                current.cohomology.forEach(function(group, i) {
                  var y = startY + (i + 1) * rowHeight;
                  ctx.strokeStyle = '#9b59b6';
                  ctx.lineWidth = 2;
                  ctx.strokeRect(rightX - 60, y - 25, 120, 40);
                  ctx.fillStyle = '#000';
                  ctx.font = '14px KaTeX_Main';
                  ctx.textAlign = 'center';
                  ctx.fillText('H' + i + ' = ' + group, rightX, y);
                });
              }

              // Highlight differences
              if (state.space === 'rp2' && state.showHomology && state.showCohomology) {
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
                ctx.fillText('H\u2081 has \u2124/2, but H\u00B9 = 0. Instead, H\u00B2 has \u2124/2 (from Ext).', width / 2, height - 20);
              }
            }

            // Controls: select (space)
            var spaceLabel = document.createElement('label');
            spaceLabel.style.color = '#c9d1d9';
            spaceLabel.style.marginRight = '8px';
            spaceLabel.textContent = 'Space: ';
            controls.appendChild(spaceLabel);
            var spaceSelect = document.createElement('select');
            spaceSelect.style.background = '#161b22'; spaceSelect.style.color = '#c9d1d9'; spaceSelect.style.border = '1px solid #30363d'; spaceSelect.style.padding = '4px 8px'; spaceSelect.style.borderRadius = '4px';
            [{value:'circle',label:'S\u00B9'},{value:'rp2',label:'\u211DP\u00B2'},{value:'torus',label:'T\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value; o.textContent = opt.label;
              spaceSelect.appendChild(o);
            });
            spaceSelect.value = 'rp2';
            spaceSelect.onchange = function() { state.space = spaceSelect.value; draw(); };
            controls.appendChild(spaceSelect);

            // Controls: checkbox (showHomology)
            var homContainer = document.createElement('label');
            homContainer.style.color = '#c9d1d9';
            homContainer.style.marginLeft = '15px';
            homContainer.style.cursor = 'pointer';
            var homCheckbox = document.createElement('input');
            homCheckbox.type = 'checkbox';
            homCheckbox.checked = true;
            homCheckbox.onchange = function() { state.showHomology = homCheckbox.checked; draw(); };
            homContainer.appendChild(homCheckbox);
            homContainer.appendChild(document.createTextNode(' Show Homology'));
            controls.appendChild(homContainer);

            // Controls: checkbox (showCohomology)
            var cohContainer = document.createElement('label');
            cohContainer.style.color = '#c9d1d9';
            cohContainer.style.marginLeft = '15px';
            cohContainer.style.cursor = 'pointer';
            var cohCheckbox = document.createElement('input');
            cohCheckbox.type = 'checkbox';
            cohCheckbox.checked = true;
            cohCheckbox.onchange = function() { state.showCohomology = cohCheckbox.checked; draw(); };
            cohContainer.appendChild(cohCheckbox);
            cohContainer.appendChild(document.createTextNode(' Show Cohomology'));
            controls.appendChild(cohContainer);

            draw();
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
