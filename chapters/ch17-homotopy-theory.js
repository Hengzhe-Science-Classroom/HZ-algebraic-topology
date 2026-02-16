window.CHAPTERS.push({
  id: 'ch17',
  number: 17,
  title: 'Homotopy Theory Preview',
  subtitle: 'Postnikov Towers, Eilenberg-MacLane Spaces, and Obstruction Theory',
  sections: [
    // ============================================================
    // Section 1: Postnikov Towers
    // ============================================================
    {
      id: 'postnikov-towers',
      title: 'Postnikov Towers',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> A topological space \\(X\\) can have extremely complicated homotopy groups \\(\\pi_n(X)\\) in all dimensions simultaneously. <em>Postnikov towers</em> provide a systematic way to "build up" a space dimension by dimension: at each stage we capture homotopy groups up to dimension \\(n\\) and kill everything above. This decomposes the homotopy type of \\(X\\) into a sequence of simpler layers, each controlled by a single homotopy group.
        </div>

        <div class="env-block definition">
          <strong>Definition (\\(n\\)-connected and \\(n\\)-truncated):</strong> A space \\(X\\) is <em>\\(n\\)-connected</em> if \\(\\pi_k(X) = 0\\) for all \\(k \\leq n\\). Dually, \\(X\\) is <em>\\(n\\)-truncated</em> (or an <em>\\(n\\)-type</em>) if \\(\\pi_k(X) = 0\\) for all \\(k > n\\). The Postnikov tower decomposes any connected space into its \\(n\\)-truncated approximations.
        </div>

        <div class="env-block definition">
          <strong>Definition (Postnikov Tower):</strong> Let \\(X\\) be a connected CW complex. A <em>Postnikov tower</em> for \\(X\\) is a sequence of spaces and maps
          \\[
          \\cdots \\to X_3 \\to X_2 \\to X_1 \\to X_0 = *
          \\]
          together with maps \\(p_n: X \\to X_n\\) such that:
          <ol>
            <li>\\((p_n)_*: \\pi_k(X) \\xrightarrow{\\cong} \\pi_k(X_n)\\) for \\(k \\leq n\\), and</li>
            <li>\\(\\pi_k(X_n) = 0\\) for \\(k > n\\).</li>
          </ol>
          Each map \\(X_{n+1} \\to X_n\\) is a fibration with fiber \\(K(\\pi_{n+1}(X), n+1)\\), an Eilenberg-MacLane space.
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Existence of Postnikov Towers):</strong> Every connected CW complex \\(X\\) admits a Postnikov tower. The tower is functorial up to homotopy and is unique up to homotopy equivalence. Moreover, \\(X\\) is the homotopy inverse limit:
          \\[
          X \\simeq \\varprojlim_n X_n.
          \\]
        </div>

        <div class="env-block proof">
          <strong>Construction Sketch:</strong> Starting from \\(X\\), define \\(X_n\\) by attaching cells of dimension \\(\\geq n+2\\) to kill all homotopy groups above dimension \\(n\\). More precisely:
          <ol>
            <li>Set \\(X_1 = K(\\pi_1(X), 1)\\) with \\(p_1\\) inducing an isomorphism on \\(\\pi_1\\).</li>
            <li>Inductively, given \\(X_n\\), define \\(X_{n+1}\\) as a pullback involving a fibration over \\(X_n\\) with fiber \\(K(\\pi_{n+1}(X), n+1)\\). The "attaching data" is a cohomology class \\(k_{n+1} \\in H^{n+2}(X_n; \\pi_{n+1}(X))\\), called a <em>\\(k\\)-invariant</em> or <em>Postnikov invariant</em>.</li>
          </ol>
          The \\(k\\)-invariants encode exactly the "twisting" between adjacent homotopy groups. \\(\\square\\)
        </div>

        <div class="env-block definition">
          <strong>Definition (\\(k\\)-invariants):</strong> The <em>\\(k\\)-invariant</em> \\(k_{n+1} \\in H^{n+2}(X_n; \\pi_{n+1}(X))\\) classifies the fibration \\(X_{n+1} \\to X_n\\). It encodes how the \\((n+1)\\)-st homotopy group is "attached" to the lower-dimensional information. When all \\(k\\)-invariants vanish, the space is a product of Eilenberg-MacLane spaces:
          \\[
          X \\simeq \\prod_{n \\geq 1} K(\\pi_n(X), n).
          \\]
        </div>

        <div class="env-block example">
          <strong>Example (\\(S^2\\)):</strong> The sphere \\(S^2\\) has \\(\\pi_2(S^2) = \\mathbb{Z}\\) and \\(\\pi_3(S^2) = \\mathbb{Z}\\) (via the Hopf map). Its Postnikov tower begins:
          <ul>
            <li>\\(X_1 = *\\) (since \\(\\pi_1(S^2) = 0\\))</li>
            <li>\\(X_2 = K(\\mathbb{Z}, 2) = \\mathbb{C}P^\\infty\\)</li>
            <li>\\(X_3\\) is a fibration \\(K(\\mathbb{Z}, 3) \\to X_3 \\to K(\\mathbb{Z}, 2)\\) classified by a nontrivial \\(k\\)-invariant \\(k_3 \\in H^4(K(\\mathbb{Z},2); \\mathbb{Z}) = \\mathbb{Z}\\)</li>
          </ul>
          The nontrivial \\(k\\)-invariant is a generator of \\(H^4(\\mathbb{C}P^\\infty; \\mathbb{Z}) = \\mathbb{Z}\\), reflecting the essential complexity of the Hopf fibration \\(S^3 \\to S^2\\).
        </div>

        <div class="env-block example">
          <strong>Example (Product of Eilenberg-MacLane spaces):</strong> If \\(X = K(\\mathbb{Z}, 1) \\times K(\\mathbb{Z}, 2) = S^1 \\times \\mathbb{C}P^\\infty\\), then all \\(k\\)-invariants vanish and the Postnikov tower splits:
          \\[
          X_1 = K(\\mathbb{Z}, 1), \\quad X_2 = K(\\mathbb{Z}, 1) \\times K(\\mathbb{Z}, 2), \\quad X_n = X \\text{ for all } n \\geq 2.
          \\]
        </div>

        <div class="env-block remark">
          <strong>Dual Construction -- Whitehead Tower:</strong> The <em>Whitehead tower</em> goes in the opposite direction. Instead of killing higher homotopy groups, it kills lower ones:
          \\[
          \\cdots \\to X\\langle 3 \\rangle \\to X\\langle 2 \\rangle \\to X\\langle 1 \\rangle = \\widetilde{X} \\to X
          \\]
          where \\(\\pi_k(X\\langle n \\rangle) = 0\\) for \\(k < n\\) and \\(\\pi_k(X\\langle n \\rangle) \\cong \\pi_k(X)\\) for \\(k \\geq n\\). The fibers of the Whitehead tower are also Eilenberg-MacLane spaces: \\(K(\\pi_{n-1}(X), n-1)\\).
        </div>
      
        <div class="viz-placeholder" data-viz="postnikov-tower-viz"></div>
      `,
      visualizations: [
        {
          id: 'postnikov-tower-viz',
          title: 'Postnikov Tower Visualizer',
          description: 'Explore how the Postnikov tower decomposes a space into layers, each adding one homotopy group at a time',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { space: 's2', highlightLevel: -1, animPhase: 0 };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              state.animPhase += 0.015;
              var t = state.animPhase;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.textAlign = 'center';

              var spaces = {
                's2': {
                  name: 'S\u00B2',
                  groups: [
                    { n: 1, g: '0' },
                    { n: 2, g: '\u2124' },
                    { n: 3, g: '\u2124' },
                    { n: 4, g: '\u2124/2' },
                    { n: 5, g: '\u2124/2' }
                  ],
                  kInvariants: ['trivial', 'generator of H\u2074(K(\u2124,2);\u2124)', '\u2124/2-valued', '\u2124/2-valued']
                },
                's3': {
                  name: 'S\u00B3',
                  groups: [
                    { n: 1, g: '0' },
                    { n: 2, g: '0' },
                    { n: 3, g: '\u2124' },
                    { n: 4, g: '\u2124/2' },
                    { n: 5, g: '\u2124/2' }
                  ],
                  kInvariants: ['trivial', 'trivial', '\u2124/2-valued', '\u2124/2-valued']
                },
                'cp2': {
                  name: '\u2102P\u00B2',
                  groups: [
                    { n: 1, g: '0' },
                    { n: 2, g: '\u2124' },
                    { n: 3, g: '0' },
                    { n: 4, g: '\u2124' },
                    { n: 5, g: '\u2124/2' }
                  ],
                  kInvariants: ['trivial', '0', 'nontrivial', '\u2124/2-valued']
                }
              };

              var sp = spaces[state.space];
              ctx.fillText('Postnikov Tower of ' + sp.name, width / 2, 30);

              var levels = sp.groups;
              var numLevels = levels.length;
              var boxW = Math.min(260, width * 0.5);
              var boxH = 44;
              var gap = 16;
              var startY = height - 50;
              var centerX = width * 0.38;

              for (var i = 0; i < numLevels; i++) {
                var y = startY - i * (boxH + gap);
                var isHighlighted = state.highlightLevel === i;
                var lvl = levels[i];
                var boxColor = lvl.g === '0' ? 'rgba(149, 165, 166, 0.15)' : 'rgba(52, 152, 219, 0.12)';
                ctx.fillStyle = boxColor;
                ctx.fillRect(centerX - boxW / 2, y - boxH / 2, boxW, boxH);
                ctx.strokeStyle = isHighlighted ? '#e74c3c' : (lvl.g === '0' ? '#95a5a6' : '#3498db');
                ctx.lineWidth = isHighlighted ? 3 : 1.5;
                ctx.strokeRect(centerX - boxW / 2, y - boxH / 2, boxW, boxH);
                ctx.fillStyle = '#2c3e50';
                ctx.font = 'bold 15px KaTeX_Main, serif';
                ctx.textAlign = 'center';
                ctx.fillText('X' + String.fromCharCode(0x2080 + lvl.n), centerX - boxW / 4, y + 5);
                ctx.font = '14px KaTeX_Main, serif';
                ctx.fillStyle = lvl.g === '0' ? '#95a5a6' : '#e67e22';
                ctx.fillText('\u03C0' + String.fromCharCode(0x2080 + lvl.n) + ' = ' + lvl.g, centerX + boxW / 8, y + 5);
                if (i > 0) {
                  var fromY = startY - (i - 1) * (boxH + gap) - boxH / 2;
                  var toY = y + boxH / 2;
                  ctx.strokeStyle = '#7f8c8d';
                  ctx.lineWidth = 1.5;
                  ctx.beginPath();
                  ctx.moveTo(centerX, fromY - 2);
                  ctx.lineTo(centerX, toY + 2);
                  ctx.stroke();
                  ctx.fillStyle = '#7f8c8d';
                  ctx.beginPath();
                  ctx.moveTo(centerX, toY + 2);
                  ctx.lineTo(centerX - 5, toY + 10);
                  ctx.lineTo(centerX + 5, toY + 10);
                  ctx.closePath();
                  ctx.fill();
                }
                if (i > 0 && lvl.g !== '0') {
                  var fiberY = (y + (startY - (i - 1) * (boxH + gap))) / 2;
                  ctx.fillStyle = '#9b59b6';
                  ctx.font = '13px KaTeX_Main, serif';
                  ctx.textAlign = 'left';
                  ctx.fillText('fiber: K(' + lvl.g + ', ' + lvl.n + ')', centerX + boxW / 2 + 12, fiberY + 4);
                }
                if (i > 0 && i - 1 < sp.kInvariants.length) {
                  var kY = (y + (startY - (i - 1) * (boxH + gap))) / 2;
                  ctx.fillStyle = '#27ae60';
                  ctx.font = '12px KaTeX_Main, serif';
                  ctx.textAlign = 'right';
                  var kText = 'k' + String.fromCharCode(0x2080 + lvl.n) + ': ' + sp.kInvariants[i - 1];
                  var maxKWidth = centerX - boxW / 2 - 15;
                  if (ctx.measureText(kText).width > maxKWidth) {
                    ctx.fillText('k' + String.fromCharCode(0x2080 + lvl.n), centerX - boxW / 2 - 8, kY - 4);
                    ctx.font = '11px KaTeX_Main, serif';
                    ctx.fillText(sp.kInvariants[i - 1], centerX - boxW / 2 - 8, kY + 10);
                  } else {
                    ctx.fillText(kText, centerX - boxW / 2 - 8, kY + 4);
                  }
                }
              }

              var topY = startY - numLevels * (boxH + gap);
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 16px KaTeX_Main, serif';
              ctx.textAlign = 'center';
              ctx.fillText(sp.name, centerX - 50, topY + boxH / 2 + 5);
              ctx.strokeStyle = '#e74c3c';
              ctx.lineWidth = 2;
              ctx.setLineDash([5, 5]);
              ctx.beginPath();
              ctx.moveTo(centerX - 30, topY + boxH / 2 + 10);
              ctx.lineTo(centerX, startY - (numLevels - 1) * (boxH + gap) - boxH / 2 - 5);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = '#e74c3c';
              ctx.font = '13px KaTeX_Main, serif';
              ctx.fillText('p' + String.fromCharCode(0x2080 + numLevels), centerX - 15, topY + boxH / 2 + 25);
              ctx.fillStyle = '#7f8c8d';
              ctx.font = '12px KaTeX_Main, serif';
              ctx.textAlign = 'left';
              ctx.fillText('X \u2243 lim X_n', 12, height - 12);
            }

            // Select: Space
            var spaceSelect = document.createElement('select');
            spaceSelect.style.background = '#161b22';
            spaceSelect.style.color = '#c9d1d9';
            spaceSelect.style.border = '1px solid #30363d';
            spaceSelect.style.padding = '4px 8px';
            spaceSelect.style.borderRadius = '4px';
            [{value:'s2',label:'S\u00B2'},{value:'s3',label:'S\u00B3'},{value:'cp2',label:'\u2102P\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value;
              o.textContent = opt.label;
              spaceSelect.appendChild(o);
            });
            spaceSelect.value = 's2';
            spaceSelect.onchange = function() { state.space = spaceSelect.value; state.highlightLevel = -1; draw(); };
            controls.appendChild(spaceSelect);

            // Slider: Highlight level
            var hlLabel = document.createElement('label');
            hlLabel.style.color = '#c9d1d9';
            hlLabel.style.marginLeft = '15px';
            hlLabel.style.marginRight = '8px';
            hlLabel.textContent = 'Highlight level: -1';
            controls.appendChild(hlLabel);
            var hlSlider = document.createElement('input');
            hlSlider.type = 'range';
            hlSlider.min = -1;
            hlSlider.max = 4;
            hlSlider.step = 1;
            hlSlider.value = -1;
            hlSlider.style.width = '200px';
            hlSlider.oninput = function() { state.highlightLevel = parseInt(hlSlider.value); hlLabel.textContent = 'Highlight level: ' + hlSlider.value; draw(); };
            controls.appendChild(hlSlider);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'postnikov-ex1',
          question: 'Compute the first three stages \\(X_1, X_2, X_3\\) of the Postnikov tower for \\(S^3\\). What are the \\(k\\)-invariants at each stage?',
          hint: 'Recall that \\(\\pi_1(S^3) = 0\\), \\(\\pi_2(S^3) = 0\\), \\(\\pi_3(S^3) = \\mathbb{Z}\\), and \\(\\pi_4(S^3) = \\mathbb{Z}/2\\). Since \\(\\pi_k = 0\\) for \\(k \\leq 2\\), the first nontrivial stage is \\(X_3\\).',
          solution: `Since \\(\\pi_1(S^3) = \\pi_2(S^3) = 0\\), we have:
\\[X_1 = X_2 = *\\]
These stages are contractible because all homotopy groups up to dimension 2 vanish.

For \\(X_3\\): since \\(\\pi_3(S^3) = \\mathbb{Z}\\) and all lower groups vanish:
\\[X_3 = K(\\mathbb{Z}, 3)\\]
The map \\(p_3: S^3 \\to K(\\mathbb{Z}, 3)\\) induces an isomorphism on \\(\\pi_3\\) and all higher homotopy groups of \\(X_3\\) vanish by construction.

The \\(k\\)-invariants \\(k_1, k_2\\) are trivially zero (since \\(X_1\\) and \\(X_2\\) are contractible). The first interesting \\(k\\)-invariant is \\(k_4 \\in H^5(K(\\mathbb{Z},3); \\mathbb{Z}/2)\\), which classifies the fibration \\(K(\\mathbb{Z}/2, 4) \\to X_4 \\to K(\\mathbb{Z}, 3)\\).`
        }
      ]
    },

    // ============================================================
    // Section 2: Eilenberg-MacLane Spaces K(G,n)
    // ============================================================
    {
      id: 'eilenberg-maclane-spaces',
      title: 'Eilenberg-MacLane Spaces \\(K(G,n)\\)',
      content: `
        <div class="env-block definition">
          <strong>Definition (Eilenberg-MacLane Space):</strong> For an abelian group \\(G\\) and \\(n \\geq 1\\) (or any group \\(G\\) if \\(n = 1\\)), an <em>Eilenberg-MacLane space</em> \\(K(G, n)\\) is a connected CW complex satisfying:
          \\[
          \\pi_k(K(G,n)) = \\begin{cases} G & \\text{if } k = n \\\\ 0 & \\text{if } k \\neq n \\end{cases}
          \\]
          Such a space is unique up to homotopy equivalence (among CW complexes).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Existence and Uniqueness):</strong> For every abelian group \\(G\\) and every \\(n \\geq 1\\), the space \\(K(G, n)\\) exists and is unique up to weak homotopy equivalence. Existence follows by building a CW complex: start with a wedge of \\(n\\)-spheres (one for each generator of \\(G\\)), attach \\((n+1)\\)-cells to impose relations, then attach cells in dimensions \\(\\geq n+2\\) to kill all higher homotopy groups.
        </div>

        <div class="env-block example">
          <strong>Familiar Examples:</strong>
          <ul>
            <li>\\(K(\\mathbb{Z}, 1) = S^1\\): the circle has \\(\\pi_1 = \\mathbb{Z}\\) and is aspherical (universal cover is \\(\\mathbb{R}\\))</li>
            <li>\\(K(\\mathbb{Z}/n, 1)\\): the lens space \\(S^\\infty / (\\mathbb{Z}/n)\\), or equivalently \\(B(\\mathbb{Z}/n)\\)</li>
            <li>\\(K(\\mathbb{Z}, 2) = \\mathbb{C}P^\\infty\\): infinite complex projective space</li>
            <li>\\(K(\\mathbb{Z}/2, 1) = \\mathbb{R}P^\\infty\\): infinite real projective space</li>
            <li>\\(K(\\mathbb{Z}, n)\\) for \\(n \\geq 3\\) cannot be realized as any familiar geometric space</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Representability of Cohomology):</strong> There is a natural bijection
          \\[
          [X, K(G,n)] \\cong H^n(X; G)
          \\]
          for any CW complex \\(X\\), where \\([X, K(G,n)]\\) denotes homotopy classes of maps. In other words, <em>\\(K(G,n)\\) represents the functor \\(H^n(-; G)\\)</em>. This is one of the most important results in algebraic topology.
        </div>

        <div class="env-block proof">
          <strong>Proof Idea:</strong> The key steps are:
          <ol>
            <li><em>Natural transformation:</em> Any map \\(f: X \\to K(G,n)\\) pulls back a canonical "universal" class \\(\\iota_n \\in H^n(K(G,n); G)\\) to give \\(f^*(\\iota_n) \\in H^n(X; G)\\). This defines a map \\(\\Phi: [X, K(G,n)] \\to H^n(X; G)\\).</li>
            <li><em>\\(\\iota_n\\) is the identity:</em> The universal class \\(\\iota_n\\) corresponds to \\(\\mathrm{id}: K(G,n) \\to K(G,n)\\) under \\(\\Phi\\).</li>
            <li><em>Bijectivity:</em> By CW approximation and obstruction theory, \\(\\Phi\\) is a bijection. Surjectivity uses the fact that \\(K(G,n)\\) is "flexible enough" to realize any cohomology class; injectivity uses the fact that cohomologous maps are homotopic. \\(\\square\\)</li>
          </ol>
        </div>

        <div class="env-block definition">
          <strong>Definition (Loop Space Relationship):</strong> There is a fundamental homotopy equivalence:
          \\[
          \\Omega K(G, n+1) \\simeq K(G, n)
          \\]
          where \\(\\Omega Y = \\mathrm{Map}_*(S^1, Y)\\) is the based loop space. This is because looping decreases the dimension of homotopy groups by one: \\(\\pi_k(\\Omega Y) \\cong \\pi_{k+1}(Y)\\). Conversely, delooping gives \\(K(G, n) \\simeq \\Omega K(G, n+1)\\), which says that Eilenberg-MacLane spaces form an \\(\\Omega\\)-spectrum.
        </div>

        <div class="env-block example">
          <strong>Example (Cohomology via Maps to \\(K(G,n)\\)):</strong> Consider \\(X = S^2\\).
          <ul>
            <li>\\(H^2(S^2; \\mathbb{Z}) \\cong [S^2, K(\\mathbb{Z}, 2)] = [S^2, \\mathbb{C}P^\\infty] \\cong \\mathbb{Z}\\).</li>
            <li>The generator corresponds to the inclusion \\(S^2 = \\mathbb{C}P^1 \\hookrightarrow \\mathbb{C}P^\\infty\\).</li>
            <li>The integer \\(n \\in \\mathbb{Z}\\) corresponds to "wrapping \\(S^2\\) around \\(\\mathbb{C}P^1\\) \\(n\\) times."</li>
          </ul>
        </div>

        <div class="env-block remark">
          <strong>Remark (Classifying Spaces):</strong> \\(K(G, 1) = BG\\) is the <em>classifying space</em> of the discrete group \\(G\\). More generally, for a topological group \\(G\\), the classifying space \\(BG\\) classifies principal \\(G\\)-bundles: \\([X, BG] \\cong \\{\\text{principal } G\\text{-bundles over } X\\}\\). When \\(G\\) is discrete, \\(BG = K(G,1)\\), and principal \\(G\\)-bundles are just covering spaces with structure group \\(G\\).
        </div>
      
        <div class="viz-placeholder" data-viz="eilenberg-maclane-viz"></div>
      `,
      visualizations: [
        {
          id: 'eilenberg-maclane-viz',
          title: 'Eilenberg-MacLane Space Gallery',
          description: 'Visualize the construction and homotopy groups of K(G,n) spaces with their loop space relationships',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { selectedSpace: 'kz1', animPhase: 0, showLoopRelation: false };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              state.animPhase += 0.02;
              var t = state.animPhase;
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px KaTeX_Main, serif';
              ctx.textAlign = 'center';
              var cx = width / 2;
              var cy = height / 2;
              var info = {
                'kz1': { title: 'K(\u2124, 1) = S\u00B9', desc: 'The circle: \u03C0\u2081 = \u2124, all higher groups vanish', geometric: 'circle' },
                'kz2': { title: 'K(\u2124, 2) = \u2102P\u221E', desc: 'Infinite complex projective space: \u03C0\u2082 = \u2124', geometric: 'cpinf' },
                'kz2_1': { title: 'K(\u2124/2, 1) = \u211DP\u221E', desc: 'Infinite real projective space: \u03C0\u2081 = \u2124/2', geometric: 'rpinf' }
              };
              var sp = info[state.selectedSpace];
              ctx.fillText(sp.title, cx, 30);
              ctx.font = '14px KaTeX_Main, serif';
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText(sp.desc, cx, 52);

              if (sp.geometric === 'circle') {
                var R = Math.min(width, height) * 0.16;
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(cx, cy + 40, R, 0, Math.PI * 2); ctx.stroke();
                var angle = t * 1.2;
                var px = cx + R * Math.cos(angle);
                var py = cy + 40 + R * Math.sin(angle);
                ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
                var windingNum = Math.floor(angle / (2 * Math.PI));
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 14px KaTeX_Main, serif'; ctx.textAlign = 'center';
                ctx.fillText('Winding number: ' + windingNum, cx, cy + 40 + R + 35);
                var tableX = cx - 100; var tableY = cy - R - 60;
                ctx.fillStyle = '#2c3e50'; ctx.font = '14px KaTeX_Main, serif'; ctx.textAlign = 'left';
                ctx.fillText('\u03C0\u2081(S\u00B9) = \u2124 (winding numbers)', tableX, tableY);
                ctx.fillStyle = '#95a5a6';
                ctx.fillText('\u03C0\u2082(S\u00B9) = 0', tableX, tableY + 20);
                ctx.fillText('\u03C0\u2083(S\u00B9) = 0', tableX, tableY + 40);
                ctx.fillText('\u03C0\u2099(S\u00B9) = 0 for all n \u2265 2', tableX, tableY + 60);
              } else if (sp.geometric === 'cpinf') {
                var maxR = Math.min(width, height) * 0.2;
                var levels = 5;
                for (var i = 0; i < levels; i++) {
                  var r = maxR * (1 - i * 0.17);
                  var alpha = 0.3 - i * 0.04;
                  ctx.strokeStyle = 'rgba(52, 152, 219, ' + Math.max(alpha, 0.08) + ')';
                  ctx.lineWidth = 3 - i * 0.4;
                  ctx.beginPath(); ctx.ellipse(cx, cy + 10, r, r * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
                  if (i < 4) {
                    ctx.fillStyle = 'rgba(44, 62, 80, ' + (0.7 - i * 0.15) + ')';
                    ctx.font = '12px KaTeX_Main, serif'; ctx.textAlign = 'right';
                    ctx.fillText('\u2102P' + (i + 1 < 4 ? String.fromCharCode(0x00B9 + i) : '\u00B3'), cx - r - 8, cy + 10);
                  }
                }
                ctx.fillStyle = '#2c3e50'; ctx.font = '14px KaTeX_Main, serif'; ctx.textAlign = 'center';
                ctx.fillText('\u2102P\u00B9 \u2282 \u2102P\u00B2 \u2282 \u2102P\u00B3 \u2282 \u22EF \u2282 \u2102P\u221E', cx, cy + 10 + maxR * 0.5 + 30);
                var tableX2 = cx - 110; var tableY2 = cy - maxR * 0.5 - 70;
                ctx.textAlign = 'left';
                ctx.fillStyle = '#95a5a6'; ctx.fillText('\u03C0\u2081(\u2102P\u221E) = 0', tableX2, tableY2);
                ctx.fillStyle = '#2c3e50'; ctx.fillText('\u03C0\u2082(\u2102P\u221E) = \u2124', tableX2, tableY2 + 20);
                ctx.fillStyle = '#95a5a6';
                ctx.fillText('\u03C0\u2083(\u2102P\u221E) = 0', tableX2, tableY2 + 40);
                ctx.fillText('\u03C0\u2099(\u2102P\u221E) = 0 for n \u2260 2', tableX2, tableY2 + 60);
              } else if (sp.geometric === 'rpinf') {
                var R2 = Math.min(width, height) * 0.16;
                ctx.strokeStyle = '#9b59b6'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(cx, cy + 10, R2, 0, Math.PI * 2); ctx.stroke();
                for (var ii = 0; ii < 4; ii++) {
                  var a = (ii / 4) * Math.PI + t * 0.4;
                  var x1 = cx + R2 * Math.cos(a); var y1 = cy + 10 + R2 * Math.sin(a);
                  var x2 = cx - R2 * Math.cos(a); var y2 = cy + 10 - R2 * Math.sin(a);
                  ctx.strokeStyle = 'rgba(231, 76, 60, 0.3)'; ctx.lineWidth = 1;
                  ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
                  ctx.fillStyle = '#e74c3c';
                  ctx.beginPath(); ctx.arc(x1, y1, 4, 0, Math.PI * 2); ctx.fill();
                  ctx.beginPath(); ctx.arc(x2, y2, 4, 0, Math.PI * 2); ctx.fill();
                }
                ctx.fillStyle = '#9b59b6'; ctx.font = '14px KaTeX_Main, serif'; ctx.textAlign = 'center';
                ctx.fillText('Identify antipodal points: x ~ -x', cx, cy + 10 + R2 + 30);
                var tableX3 = cx - 110; var tableY3 = cy - R2 - 60;
                ctx.textAlign = 'left';
                ctx.fillStyle = '#2c3e50'; ctx.fillText('\u03C0\u2081(\u211DP\u221E) = \u2124/2', tableX3, tableY3);
                ctx.fillStyle = '#95a5a6';
                ctx.fillText('\u03C0\u2082(\u211DP\u221E) = 0', tableX3, tableY3 + 20);
                ctx.fillText('\u03C0\u2099(\u211DP\u221E) = 0 for n \u2265 2', tableX3, tableY3 + 40);
              }

              if (state.showLoopRelation) {
                var boxY = height - 60;
                ctx.fillStyle = 'rgba(46, 204, 113, 0.08)'; ctx.fillRect(10, boxY - 5, width - 20, 50);
                ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 1; ctx.strokeRect(10, boxY - 5, width - 20, 50);
                ctx.fillStyle = '#27ae60'; ctx.font = 'bold 15px KaTeX_Main, serif'; ctx.textAlign = 'center';
                ctx.fillText('\u03A9 K(G, n+1) \u2243 K(G, n)', cx, boxY + 15);
                ctx.font = '13px KaTeX_Main, serif'; ctx.fillStyle = '#2c3e50';
                ctx.fillText('Looping decreases dimension: \u03C0\u2096(\u03A9Y) \u2245 \u03C0\u2096\u208A\u2081(Y)', cx, boxY + 35);
              }
            }

            var spaceSelect = document.createElement('select');
            spaceSelect.style.background = '#161b22'; spaceSelect.style.color = '#c9d1d9';
            spaceSelect.style.border = '1px solid #30363d'; spaceSelect.style.padding = '4px 8px'; spaceSelect.style.borderRadius = '4px';
            [{value:'kz1',label:'K(\u2124, 1) = S\u00B9'},{value:'kz2',label:'K(\u2124, 2) = \u2102P\u221E'},{value:'kz2_1',label:'K(\u2124/2, 1) = \u211DP\u221E'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; spaceSelect.appendChild(o);
            });
            spaceSelect.value = 'kz1';
            spaceSelect.onchange = function() { state.selectedSpace = spaceSelect.value; draw(); };
            controls.appendChild(spaceSelect);

            var loopBtn = document.createElement('button');
            loopBtn.textContent = 'Toggle Loop Relation';
            loopBtn.style.marginLeft = '10px'; loopBtn.style.padding = '4px 12px';
            loopBtn.style.background = '#21262d'; loopBtn.style.color = '#c9d1d9';
            loopBtn.style.border = '1px solid #30363d'; loopBtn.style.borderRadius = '4px'; loopBtn.style.cursor = 'pointer';
            loopBtn.onclick = function() { state.showLoopRelation = !state.showLoopRelation; draw(); };
            controls.appendChild(loopBtn);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'em-space-ex1',
          question: 'Show that \\(K(\\mathbb{Z}, 2) = \\mathbb{C}P^\\infty\\) by computing the homotopy groups of \\(\\mathbb{C}P^\\infty\\) using the fibration \\(S^1 \\to S^\\infty \\to \\mathbb{C}P^\\infty\\).',
          hint: 'Apply the long exact sequence of homotopy groups to the Hopf fibration. Use the fact that \\(S^\\infty\\) is contractible.',
          solution: `Consider the fibration \\(S^1 \\to S^\\infty \\to \\mathbb{C}P^\\infty\\), where \\(S^\\infty = \\varinjlim S^{2n+1}\\) carries a free \\(S^1\\)-action.

Since \\(S^\\infty\\) is contractible (all its homotopy groups vanish), the long exact sequence gives:
\\[
\\cdots \\to \\pi_n(S^\\infty) \\to \\pi_n(\\mathbb{C}P^\\infty) \\to \\pi_{n-1}(S^1) \\to \\pi_{n-1}(S^\\infty) \\to \\cdots
\\]
Setting \\(\\pi_n(S^\\infty) = 0\\) for all \\(n\\), we get isomorphisms:
\\[
\\pi_n(\\mathbb{C}P^\\infty) \\cong \\pi_{n-1}(S^1)
\\]
Since \\(\\pi_0(S^1) = 0\\), \\(\\pi_1(S^1) = \\mathbb{Z}\\), and \\(\\pi_k(S^1) = 0\\) for \\(k \\geq 2\\), we conclude:
\\[
\\pi_1(\\mathbb{C}P^\\infty) = 0, \\quad \\pi_2(\\mathbb{C}P^\\infty) = \\mathbb{Z}, \\quad \\pi_n(\\mathbb{C}P^\\infty) = 0 \\text{ for } n \\geq 3.
\\]
This is exactly \\(K(\\mathbb{Z}, 2)\\). \\(\\checkmark\\)`
        }
      ]
    },

    // ============================================================
    // Section 3: Obstruction Theory
    // ============================================================
    {
      id: 'obstruction-theory',
      title: 'Obstruction Theory',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> Obstruction theory addresses a fundamental question: given a map \\(f: A \\to Y\\) defined on a subcomplex \\(A \\subset X\\), can it be extended to a map \\(X \\to Y\\)? The theory provides a systematic sequence of cohomological obstructions: at each dimension, either the extension succeeds or a well-defined cohomology class identifies where and why it fails.
        </div>

        <div class="env-block definition">
          <strong>Setup (Extension Problem):</strong> Let \\(X\\) be a CW complex, \\(A \\subset X\\) a subcomplex, and \\(Y\\) a path-connected space. Given \\(f: A \\to Y\\), we ask: does there exist \\(F: X \\to Y\\) with \\(F|_A = f\\)?

          We try to extend \\(f\\) skeleton by skeleton. If \\(f\\) is already defined on the \\(n\\)-skeleton \\(X^n\\), the obstruction to extending to \\(X^{n+1}\\) lives in cohomology:
          \\[
          o_{n+1}(f) \\in H^{n+1}(X, A; \\pi_n(Y)).
          \\]
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Primary Obstruction):</strong> Let \\(Y\\) be \\((n-1)\\)-connected (i.e., \\(\\pi_k(Y) = 0\\) for \\(k < n\\)), and let \\(f: X^n \\to Y\\) be given. The map \\(f\\) extends to \\(X^{n+1}\\) if and only if
          \\[
          o_{n+1}(f) = 0 \\in H^{n+1}(X, A; \\pi_n(Y)).
          \\]
          This obstruction class is defined as follows: for each \\((n+1)\\)-cell \\(e^{n+1}\\) with attaching map \\(\\varphi: S^n \\to X^n\\), the composition \\(f \\circ \\varphi: S^n \\to Y\\) represents an element of \\(\\pi_n(Y)\\). The cochain \\(e^{n+1} \\mapsto [f \\circ \\varphi] \\in \\pi_n(Y)\\) is a cocycle, and its cohomology class is \\(o_{n+1}(f)\\).
        </div>

        <div class="env-block proof">
          <strong>Proof Sketch:</strong> The map \\(f\\) extends over the \\((n+1)\\)-cell \\(e^{n+1}\\) if and only if \\(f \\circ \\varphi: S^n \\to Y\\) is null-homotopic, i.e., \\([f \\circ \\varphi] = 0 \\in \\pi_n(Y)\\). The cochain sending \\(e^{n+1}\\) to \\([f \\circ \\varphi]\\) is a cocycle because on the boundary of an \\((n+2)\\)-cell, the composition vanishes (the boundary is a sphere in \\(X^{n+1}\\)). Different choices of extension on \\(n\\)-cells change the cocycle by a coboundary, so the cohomology class is well-defined. \\(\\square\\)
        </div>

        <div class="env-block example">
          <strong>Example (Sections of Sphere Bundles):</strong> Let \\(\\xi: S^n \\to E \\to B\\) be a fiber bundle with fiber \\(S^n\\). A section \\(s: B \\to E\\) exists if and only if all obstructions vanish. The primary obstruction is
          \\[
          o_{n+1} \\in H^{n+1}(B; \\pi_n(S^n)) = H^{n+1}(B; \\mathbb{Z}).
          \\]
          This is the <em>Euler class</em> \\(e(\\xi)\\) (up to sign). In particular, a sphere bundle has a section if and only if its Euler class vanishes (when there are no higher obstructions).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Lifting Problem):</strong> Obstruction theory also solves <em>lifting</em> problems. Given a fibration \\(p: E \\to B\\) with fiber \\(F\\) and a map \\(f: X \\to B\\), a lift \\(\\tilde{f}: X \\to E\\) with \\(p \\circ \\tilde{f} = f\\) exists if and only if a sequence of obstructions
          \\[
          o_{n+1} \\in H^{n+1}(X; \\pi_n(F))
          \\]
          all vanish. Each obstruction is defined only after the previous one vanishes.
        </div>

        <div class="env-block example">
          <strong>Example (Spin Structures):</strong> A spin structure on an oriented vector bundle \\(\\xi\\) is a lift of the classifying map \\(f: B \\to BSO(n)\\) to \\(BSpin(n)\\). The fiber of \\(BSpin(n) \\to BSO(n)\\) is \\(K(\\mathbb{Z}/2, 1)\\). The single obstruction to this lift is:
          \\[
          o_2 = w_2(\\xi) \\in H^2(B; \\mathbb{Z}/2)
          \\]
          the second Stiefel-Whitney class. So \\(\\xi\\) admits a spin structure if and only if \\(w_2(\\xi) = 0\\).
        </div>

        <div class="env-block remark">
          <strong>Remark (Higher Obstructions and Indeterminacy):</strong> When \\(Y\\) has multiple nonvanishing homotopy groups, there may be a <em>sequence</em> of obstructions \\(o_{n+1}, o_{n+2}, \\ldots\\), each defined only when the previous one vanishes. Moreover, each successive obstruction is defined only up to an <em>indeterminacy</em> subgroup, making computations progressively more difficult. This subtlety is one reason why stable homotopy theory (where obstructions stabilize) is more tractable than unstable homotopy theory.
        </div>
      `,
      visualizations: [],
      exercises: [
        {
          id: 'obstruction-ex1',
          question: 'Let \\(X = S^2\\) and \\(Y = S^2\\). Show that the primary obstruction to extending a map \\(f: X^1 \\to Y\\) (where \\(X^1\\) is the 1-skeleton in the standard CW structure \\(S^2 = e^0 \\cup e^2\\)) to all of \\(X\\) is an element of \\(H^2(S^2; \\pi_1(S^2))\\), and explain why this obstruction is automatically zero.',
          hint: 'What is \\(\\pi_1(S^2)\\)? If the coefficient group is zero, what can you say about the cohomology group?',
          solution: `The standard CW structure on \\(S^2\\) has one 0-cell \\(e^0\\) and one 2-cell \\(e^2\\), with \\(X^1 = X^0 = e^0\\) (there are no 1-cells).

Any map \\(f: X^0 = \\{\\text{pt}\\} \\to S^2\\) trivially extends to \\(X^1 = X^0\\). The obstruction to extending over the 2-cell lies in:
\\[
o_2 \\in H^2(S^2; \\pi_1(S^2)) = H^2(S^2; 0) = 0.
\\]
Since \\(\\pi_1(S^2) = 0\\), the coefficient group is trivial, so the obstruction group itself is zero. Hence the obstruction vanishes automatically, and any map \\(f: X^0 \\to S^2\\) extends to \\(X^1 = X^0\\) to a map \\(S^2 \\to S^2\\).

(The real content here is that the attaching map of \\(e^2\\) gives an element of \\(\\pi_1(S^2) = 0\\), which is automatically trivial.)`
        }
      ]
    },

    // ============================================================
    // Section 4: Stable Homotopy
    // ============================================================
    {
      id: 'stable-homotopy',
      title: 'Stable Homotopy',
      content: `
        <div class="env-block intuition">
          <strong>Motivation:</strong> Homotopy groups of spheres \\(\\pi_n(S^k)\\) are notoriously difficult to compute. But something remarkable happens when we <em>suspend</em> repeatedly: the groups eventually stabilize. This stable range is both more computable and more algebraically structured than the unstable world, leading to the rich subject of <em>stable homotopy theory</em>.
        </div>

        <div class="env-block definition">
          <strong>Definition (Suspension):</strong> The <em>suspension</em> of a space \\(X\\) is \\(\\Sigma X = X \\times [0,1] / {\\sim}\\), where \\((x, 0) \\sim (x', 0)\\) and \\((x, 1) \\sim (x', 1)\\) for all \\(x, x'\\). Equivalently, \\(\\Sigma X = X * S^0\\) (the join with two points). In particular, \\(\\Sigma S^n \\cong S^{n+1}\\).
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Freudenthal Suspension Theorem):</strong> Let \\(X\\) be an \\((n-1)\\)-connected CW complex. Then the suspension homomorphism
          \\[
          E: \\pi_k(X) \\to \\pi_{k+1}(\\Sigma X)
          \\]
          is an isomorphism for \\(k < 2n-1\\) and a surjection for \\(k = 2n-1\\).

          In particular, for spheres: \\(E: \\pi_{n+k}(S^n) \\to \\pi_{n+k+1}(S^{n+1})\\) is an isomorphism for \\(k < n - 1\\).
        </div>

        <div class="env-block proof">
          <strong>Proof Idea:</strong> Suspension is adjoint to looping: \\([\\Sigma X, Y] \\cong [X, \\Omega Y]\\). The Freudenthal theorem follows from analyzing the connectivity of the pair \\((\\Sigma X, CX)\\) where \\(CX\\) is the cone. More precisely, one applies the relative Hurewicz theorem to show that the adjunction map \\(X \\to \\Omega\\Sigma X\\) is highly connected when \\(X\\) is highly connected. \\(\\square\\)
        </div>

        <div class="env-block definition">
          <strong>Definition (Stable Homotopy Groups):</strong> The \\(k\\)-th <em>stable homotopy group of spheres</em> is
          \\[
          \\pi_k^s = \\pi_k^s(S^0) = \\varinjlim_n \\pi_{n+k}(S^n).
          \\]
          By the Freudenthal theorem, this colimit stabilizes at \\(n = k + 2\\). The stable groups \\(\\pi_k^s\\) form a graded ring under composition (or equivalently, the smash product of maps).
        </div>

        <div class="env-block example">
          <strong>Known Stable Homotopy Groups:</strong> The first several stable stems are:
          <ul>
            <li>\\(\\pi_0^s = \\mathbb{Z}\\) (degree of maps \\(S^n \\to S^n\\))</li>
            <li>\\(\\pi_1^s = \\mathbb{Z}/2\\) (generated by the stable Hopf map \\(\\eta\\))</li>
            <li>\\(\\pi_2^s = \\mathbb{Z}/2\\) (generated by \\(\\eta^2\\))</li>
            <li>\\(\\pi_3^s = \\mathbb{Z}/24\\) (related to the quaternionic Hopf map \\(\\nu\\) and the \\(J\\)-homomorphism)</li>
            <li>\\(\\pi_4^s = 0\\)</li>
            <li>\\(\\pi_5^s = 0\\)</li>
            <li>\\(\\pi_6^s = \\mathbb{Z}/2\\)</li>
            <li>\\(\\pi_7^s = \\mathbb{Z}/240\\) (related to the octonionic Hopf map \\(\\sigma\\))</li>
          </ul>
          Computing these is one of the central challenges of algebraic topology. The pattern is intricate and no closed-form formula is known.
        </div>

        <div class="env-block definition">
          <strong>Definition (Spectra):</strong> A <em>spectrum</em> \\(E\\) is a sequence of pointed spaces \\(E_0, E_1, E_2, \\ldots\\) together with structure maps \\(\\sigma_n: \\Sigma E_n \\to E_{n+1}\\) (or equivalently, \\(E_n \\to \\Omega E_{n+1}\\)). Spectra are the "stable" analog of spaces: they represent generalized cohomology theories via
          \\[
          E^n(X) = \\varinjlim_k [\\Sigma^k X, E_{n+k}].
          \\]
        </div>

        <div class="env-block example">
          <strong>Key Examples of Spectra:</strong>
          <ul>
            <li><em>Sphere spectrum</em> \\(\\mathbb{S}\\): \\(E_n = S^n\\), structure maps from suspension. Represents stable cohomotopy.</li>
            <li><em>Eilenberg-MacLane spectrum</em> \\(H\\mathbb{Z}\\): \\(E_n = K(\\mathbb{Z}, n)\\). Represents ordinary cohomology \\(H^n(X; \\mathbb{Z})\\).</li>
            <li><em>Topological K-theory</em> \\(KU\\): \\(E_{2n} = \\mathbb{Z} \\times BU\\), \\(E_{2n+1} = U\\). Bott periodicity gives \\(\\Omega^2(\\mathbb{Z} \\times BU) \\simeq \\mathbb{Z} \\times BU\\).</li>
            <li><em>Cobordism spectrum</em> \\(MU\\): \\(E_n = \\mathrm{Thom}(\\gamma_n)\\) over \\(BU(n)\\). Represents complex cobordism.</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <strong>Theorem (Brown Representability):</strong> Every generalized cohomology theory \\(h^*\\) on CW complexes is representable by a spectrum \\(E\\):
          \\[
          h^n(X) \\cong [X, E_n]
          \\]
          for all CW complexes \\(X\\). Conversely, every spectrum gives rise to a cohomology theory.
        </div>

        <div class="env-block remark">
          <strong>Remark (The Stable Homotopy Category):</strong> The <em>stable homotopy category</em> \\(\\mathbf{SHC}\\) has spectra as objects and stable maps as morphisms. It is a triangulated category with a symmetric monoidal structure given by the smash product \\(\\wedge\\). This category unifies many areas of topology and algebra: ordinary cohomology, K-theory, cobordism, and more are all spectra in this category.
        </div>
      
        <div class="viz-placeholder" data-viz="stable-homotopy-table-viz"></div>
      `,
      visualizations: [
        {
          id: 'stable-homotopy-table-viz',
          title: 'Stable Homotopy Groups of Spheres',
          description: 'Explore the table of \u03C0_{n+k}(S^n) and see how groups stabilize as n increases',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { highlightStem: 1, showStable: true, maxN: 8, maxK: 7 };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var maxN = state.maxN;
              var maxK = state.maxK;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 16px KaTeX_Main, serif';
              ctx.fillText('Table of \u03C0_{n+k}(S\u207F)', 20, 25);

              var data = {
                1: ['Z', '0', '0', '0', '0', '0', '0', '0'],
                2: ['Z', 'Z', 'Z/2', 'Z/2', 'Z/12', 'Z/2', 'Z/2', 'Z/3'],
                3: ['Z', 'Z/2', 'Z/2', 'Z/12', 'Z/2', 'Z/2', 'Z/3', 'Z/15'],
                4: ['Z', 'Z/2', 'Z/2', 'Z\u2295Z/12', 'Z/2\u00B2', 'Z/2\u00B2', 'Z/24\u2295Z/3', 'Z/15'],
                5: ['Z', 'Z/2', 'Z/2', 'Z/24', '0', '0', 'Z/2', 'Z/120'],
                6: ['Z', 'Z/2', 'Z/2', 'Z/24', '0', 'Z', 'Z/2', 'Z/240'],
                7: ['Z', 'Z/2', 'Z/2', 'Z/24', '0', '0', 'Z/2', 'Z/240'],
                8: ['Z', 'Z/2', 'Z/2', 'Z/24', '0', '0', 'Z/2', 'Z/240']
              };
              var stable = ['Z', 'Z/2', 'Z/2', 'Z/24', '0', '0', 'Z/2', 'Z/240'];

              var tableLeft = 70;
              var tableTop = 50;
              var cellW = Math.min(85, (width - tableLeft - 30) / (maxK + 1));
              var cellH = 28;

              ctx.fillStyle = '#7f8c8d';
              ctx.font = 'bold 12px KaTeX_Main, serif';
              ctx.textAlign = 'center';
              ctx.fillText('k \u2193 / n \u2192', 35, tableTop + 10);
              for (var n = 1; n <= maxN; n++) {
                ctx.fillText('n=' + n, tableLeft + (n - 1) * cellW + cellW / 2, tableTop - 5);
              }

              ctx.textAlign = 'right';
              for (var k = 0; k <= maxK; k++) {
                ctx.fillStyle = state.highlightStem === k ? '#e74c3c' : '#7f8c8d';
                ctx.fillText('k=' + k, tableLeft - 8, tableTop + 18 + k * cellH);
              }

              for (var k2 = 0; k2 <= maxK; k2++) {
                for (var n2 = 1; n2 <= maxN; n2++) {
                  var tcx = tableLeft + (n2 - 1) * cellW;
                  var tcy = tableTop + 4 + k2 * cellH;
                  var val = data[n2] ? (data[n2][k2] || '?') : '?';
                  var isStable = n2 >= k2 + 2;
                  var isStemHighlight = state.highlightStem === k2;
                  if (isStemHighlight) {
                    ctx.fillStyle = isStable ? '#27ae6033' : '#e74c3c22';
                  } else {
                    ctx.fillStyle = isStable ? '#f0f8f0' : '#fafafa';
                  }
                  ctx.fillRect(tcx + 1, tcy, cellW - 2, cellH - 2);
                  ctx.strokeStyle = isStable ? '#27ae60' : '#ddd';
                  ctx.lineWidth = isStemHighlight ? 2 : 0.5;
                  ctx.strokeRect(tcx + 1, tcy, cellW - 2, cellH - 2);
                  ctx.fillStyle = isStable ? '#27ae60' : '#2c3e50';
                  ctx.font = (isStemHighlight ? 'bold ' : '') + '11px KaTeX_Main, serif';
                  ctx.textAlign = 'center';
                  ctx.fillText(val, tcx + cellW / 2, tcy + cellH / 2 + 4);
                }
              }

              if (state.showStable) {
                var stableX = tableLeft + maxN * cellW + 15;
                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 12px KaTeX_Main, serif';
                ctx.textAlign = 'center';
                ctx.fillText('\u03C0\u2096\u02E2', stableX + cellW / 2, tableTop - 5);
                for (var k3 = 0; k3 <= maxK; k3++) {
                  var cy2 = tableTop + 4 + k3 * cellH;
                  var isSH = state.highlightStem === k3;
                  ctx.fillStyle = isSH ? '#27ae6044' : '#e8f5e9';
                  ctx.fillRect(stableX + 1, cy2, cellW - 2, cellH - 2);
                  ctx.strokeStyle = '#27ae60';
                  ctx.lineWidth = isSH ? 2 : 1;
                  ctx.strokeRect(stableX + 1, cy2, cellW - 2, cellH - 2);
                  ctx.fillStyle = '#27ae60';
                  ctx.font = (isSH ? 'bold ' : '') + '12px KaTeX_Main, serif';
                  ctx.fillText(stable[k3], stableX + cellW / 2, cy2 + cellH / 2 + 4);
                }
              }

              var legendY = tableTop + 18 + (maxK + 1) * cellH;
              ctx.textAlign = 'left';
              ctx.fillStyle = '#27ae60';
              ctx.fillRect(20, legendY, 14, 14);
              ctx.fillStyle = '#2c3e50';
              ctx.font = '12px KaTeX_Main, serif';
              ctx.fillText('= stable range (n \u2265 k+2)', 40, legendY + 12);
              ctx.fillStyle = '#fafafa';
              ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1;
              ctx.fillRect(250, legendY, 14, 14);
              ctx.strokeRect(250, legendY, 14, 14);
              ctx.fillStyle = '#2c3e50';
              ctx.fillText('= unstable range', 270, legendY + 12);

              ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 2;
              ctx.setLineDash([6, 4]);
              ctx.beginPath();
              for (var k4 = 0; k4 <= maxK; k4++) {
                var stableN = k4 + 2;
                if (stableN <= maxN) {
                  var x = tableLeft + (stableN - 1) * cellW;
                  var y = tableTop + 4 + k4 * cellH;
                  if (k4 === 0) ctx.moveTo(x, y);
                  else ctx.lineTo(x, y);
                }
              }
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = '#e74c3c';
              ctx.font = '11px KaTeX_Main, serif';
              ctx.fillText('Freudenthal boundary', 20, legendY + 32);
              ctx.fillStyle = '#2c3e50';
              ctx.font = '13px KaTeX_Main, serif';
              ctx.fillText('Highlighted stem k=' + state.highlightStem + ': stable value \u03C0\u2096\u02E2 = ' + stable[state.highlightStem], 20, height - 12);
            }

            // Select: Highlight Stem k
            var stemSelect = document.createElement('select');
            stemSelect.style.background = '#161b22'; stemSelect.style.color = '#c9d1d9';
            stemSelect.style.border = '1px solid #30363d'; stemSelect.style.padding = '4px 8px'; stemSelect.style.borderRadius = '4px';
            [{value:'0',label:'k=0 (\u03C0\u2080\u02E2=Z)'},{value:'1',label:'k=1 (\u03C0\u2081\u02E2=Z/2)'},{value:'2',label:'k=2 (\u03C0\u2082\u02E2=Z/2)'},{value:'3',label:'k=3 (\u03C0\u2083\u02E2=Z/24)'},{value:'4',label:'k=4 (\u03C0\u2084\u02E2=0)'},{value:'5',label:'k=5 (\u03C0\u2085\u02E2=0)'},{value:'6',label:'k=6 (\u03C0\u2086\u02E2=Z/2)'},{value:'7',label:'k=7 (\u03C0\u2087\u02E2=Z/240)'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; stemSelect.appendChild(o);
            });
            stemSelect.value = '1';
            stemSelect.onchange = function() { state.highlightStem = parseInt(stemSelect.value); draw(); };
            controls.appendChild(stemSelect);

            var stableBtn = document.createElement('button');
            stableBtn.textContent = 'Toggle Stable Column';
            stableBtn.style.marginLeft = '10px'; stableBtn.style.padding = '4px 12px';
            stableBtn.style.background = '#21262d'; stableBtn.style.color = '#c9d1d9';
            stableBtn.style.border = '1px solid #30363d'; stableBtn.style.borderRadius = '4px'; stableBtn.style.cursor = 'pointer';
            stableBtn.onclick = function() { state.showStable = !state.showStable; draw(); };
            controls.appendChild(stableBtn);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'stable-ex1',
          question: 'Apply the Freudenthal suspension theorem to show that \\(\\pi_4(S^3) \\cong \\pi_5(S^4) \\cong \\pi_6(S^5) \\cong \\cdots\\), i.e., the groups \\(\\pi_{n+1}(S^n)\\) stabilize for \\(n \\geq 3\\). Then state the stable value \\(\\pi_1^s\\).',
          hint: 'The Freudenthal theorem says \\(E: \\pi_k(S^n) \\to \\pi_{k+1}(S^{n+1})\\) is an isomorphism for \\(k < 2n - 1\\). For the stem \\(k = 1\\), check when \\(n + 1 < 2n - 1\\).',
          solution: `We want \\(E: \\pi_{n+1}(S^n) \\to \\pi_{n+2}(S^{n+1})\\) to be an isomorphism. By Freudenthal, this holds when \\(n + 1 < 2n - 1\\), i.e., when \\(n > 2\\), i.e., \\(n \\geq 3\\).

So for \\(n \\geq 3\\):
\\[
\\pi_4(S^3) \\cong \\pi_5(S^4) \\cong \\pi_6(S^5) \\cong \\cdots = \\pi_1^s
\\]

From direct computation (e.g., via the Hopf fibration \\(S^3 \\to S^7 \\to S^4\\) and long exact sequences), \\(\\pi_4(S^3) = \\mathbb{Z}/2\\), generated by the suspension of the Hopf map \\(\\eta: S^3 \\to S^2\\). Therefore:
\\[
\\pi_1^s = \\mathbb{Z}/2
\\]
This stable element \\(\\eta \\in \\pi_1^s\\) is one of the most fundamental elements in stable homotopy theory. \\(\\checkmark\\)`
        }
      ]
    }
  ]
});
