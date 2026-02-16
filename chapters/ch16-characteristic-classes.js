window.CHAPTERS.push({
  id: 'ch16',
  number: 16,
  title: 'Characteristic Classes',
  subtitle: 'Measuring the Twisting of Vector Bundles',
  sections: [
    // ============================================================
    // Section 1: Vector Bundles and the Classifying Paradigm
    // ============================================================
    {
      id: 'vector-bundles',
      title: 'Vector Bundles and the Classifying Paradigm',
      content: `
        <div class="env-block intuition">
          <p><strong>The Central Idea:</strong> A <em>vector bundle</em> is a "continuously varying family of vector spaces" parametrized by a topological space. The tangent bundle of a manifold is the prototypical example: at each point \\(p \\in M\\), we have the tangent space \\(T_pM \\cong \\mathbb{R}^n\\), and these spaces fit together smoothly. Characteristic classes are cohomological invariants that detect the <em>twisting</em> of a bundle -- they are the primary obstruction-theoretic invariants in algebraic topology, and the fundamental bridge between geometry/topology and algebra.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Real Vector Bundle):</strong> A <strong>real vector bundle of rank \\(n\\)</strong> over a topological space \\(B\\) (the <em>base space</em>) is a space \\(E\\) (the <em>total space</em>) together with a continuous surjection \\(\\pi: E \\to B\\) such that:</p>
          <ol>
            <li>For each \\(b \\in B\\), the <em>fiber</em> \\(\\pi^{-1}(b) \\cong \\mathbb{R}^n\\) is a real vector space.</li>
            <li><strong>Local triviality:</strong> For each \\(b \\in B\\), there is an open neighborhood \\(U \\ni b\\) and a homeomorphism \\(\\varphi: \\pi^{-1}(U) \\xrightarrow{\\sim} U \\times \\mathbb{R}^n\\) such that \\(\\text{proj}_1 \\circ \\varphi = \\pi|_{\\pi^{-1}(U)}\\) and \\(\\varphi\\) restricts to a linear isomorphism on each fiber.</li>
          </ol>
          <p>We write \\(\\xi = (E, \\pi, B)\\) or simply \\(\\xi \\to B\\). The pair \\((U, \\varphi)\\) is a <em>local trivialization</em>. A <em>complex vector bundle of rank \\(n\\)</em> replaces \\(\\mathbb{R}^n\\) with \\(\\mathbb{C}^n\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Key Examples:</strong></p>
          <ul>
            <li><strong>Trivial bundle:</strong> \\(E = B \\times \\mathbb{R}^n\\) with \\(\\pi = \\text{proj}_1\\). Notation: \\(\\varepsilon^n\\) or \\(\\underline{\\mathbb{R}}^n\\). A bundle is called <em>trivial</em> if it is isomorphic to \\(B \\times \\mathbb{R}^n\\).</li>
            <li><strong>Tangent bundle:</strong> For a smooth \\(n\\)-manifold \\(M\\), the tangent bundle \\(TM = \\bigsqcup_{p \\in M} T_pM\\) is a rank-\\(n\\) vector bundle over \\(M\\). Local trivializations come from coordinate charts.</li>
            <li><strong>Mobius band:</strong> The Mobius band is the total space of a rank-1 (line) bundle over \\(S^1\\). It is non-trivial: the fibers undergo a twist as one traverses the base circle. This is the simplest non-trivial vector bundle.</li>
            <li><strong>Normal bundle:</strong> For \\(M \\hookrightarrow \\mathbb{R}^N\\), \\(\\nu_x\\) is the orthogonal complement of \\(T_xM\\) in \\(\\mathbb{R}^N\\).</li>
            <li><strong>Tautological line bundle:</strong> Over \\(\\mathbb{R}P^n\\), define the <em>tautological</em> (or <em>canonical</em>) line bundle \\(\\gamma^1_n\\) whose fiber over a line \\(\\ell \\in \\mathbb{R}P^n\\) is the line \\(\\ell \\subset \\mathbb{R}^{n+1}\\) itself:
            \\[ E(\\gamma^1_n) = \\{(\\ell, v) \\in \\mathbb{R}P^n \\times \\mathbb{R}^{n+1} : v \\in \\ell\\} \\]
            Over \\(\\mathbb{R}P^1 \\cong S^1\\), this is exactly the Mobius band.</li>
            <li><strong>Tautological bundle \\(\\gamma^k\\):</strong> Over the Grassmannian \\(\\mathrm{Gr}_k(\\mathbb{R}^n)\\), the fiber over a \\(k\\)-plane \\(V\\) is \\(V\\) itself.</li>
          </ul>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Transition Functions):</strong> Given local trivializations \\(\\varphi_U, \\varphi_V\\) over overlapping open sets \\(U, V\\), the <em>transition function</em> is</p>
          \\[ g_{UV}: U \\cap V \\to GL_n(\\mathbb{R}), \\quad g_{UV}(x) = \\varphi_U|_{E_x} \\circ \\varphi_V|_{E_x}^{-1}. \\]
          <p>These satisfy the <em>cocycle condition</em> \\(g_{UV} \\cdot g_{VW} = g_{UW}\\) on triple overlaps. Conversely, any cocycle of transition functions determines a bundle (up to isomorphism).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Bundle Map and Pullback):</strong> A <em>bundle map</em> from \\(\\xi = (E, \\pi, B)\\) to \\(\\xi' = (E', \\pi', B')\\) is a pair of continuous maps \\(f: E \\to E'\\) and \\(\\bar{f}: B \\to B'\\) such that \\(\\pi' \\circ f = \\bar{f} \\circ \\pi\\) and \\(f\\) is linear on each fiber.</p>
          <p>Given a bundle \\(\\xi = (E, \\pi, B')\\) and a continuous map \\(f: B \\to B'\\), the <em>pullback bundle</em> \\(f^*\\xi\\) over \\(B\\) has total space</p>
          \\[ E(f^*\\xi) = \\{(b, e) \\in B \\times E : f(b) = \\pi(e)\\} \\]
          <p>with projection \\((b,e) \\mapsto b\\). Pullback is the fundamental operation: it is how bundles on one space induce bundles on another.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Section):</strong> A <em>section</em> of a bundle \\(\\xi = (E, \\pi, B)\\) is a continuous map \\(s: B \\to E\\) with \\(\\pi \\circ s = \\text{id}_B\\). The <em>zero section</em> \\(s_0(b) = 0 \\in \\pi^{-1}(b)\\) always exists. A bundle is trivial if and only if it admits \\(n\\) everywhere-linearly-independent sections (where \\(n\\) is the rank).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Bundle Operations):</strong> Given vector bundles \\(\\xi\\) and \\(\\eta\\) over \\(B\\), we can form:</p>
          <ul>
            <li><strong>Direct sum (Whitney sum):</strong> \\(\\xi \\oplus \\eta\\), with fiber \\((\\xi \\oplus \\eta)_b = \\xi_b \\oplus \\eta_b\\)</li>
            <li><strong>Tensor product:</strong> \\(\\xi \\otimes \\eta\\), with fiber \\(\\xi_b \\otimes \\eta_b\\)</li>
            <li><strong>Dual bundle:</strong> \\(\\xi^*\\), with fiber \\((\\xi_b)^*\\)</li>
            <li><strong>Determinant bundle:</strong> \\(\\det(\\xi) = \\Lambda^n(\\xi)\\), the top exterior power (a line bundle)</li>
          </ul>
          <p>These operations on bundles correspond to operations on their transition functions. Characteristic classes must be <em>natural</em>: \\(c(f^*E) = f^*c(E)\\), and interact predictably with these operations.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Classifying Space):</strong> For each \\(n\\), there exists a space \\(BO(n) = \\text{Gr}_n(\\mathbb{R}^\\infty)\\) (resp. \\(BU(n) = \\text{Gr}_n(\\mathbb{C}^\\infty)\\) for complex bundles) carrying a universal bundle \\(\\gamma^n\\), such that for any paracompact base \\(B\\):</p>
          \\[ [B, BO(n)] \\xrightarrow{\\sim} \\text{Vect}_n^{\\mathbb{R}}(B), \\quad [f] \\mapsto f^*\\gamma^n \\]
          <p>is a bijection between homotopy classes of maps \\(B \\to BO(n)\\) and isomorphism classes of rank-\\(n\\) real vector bundles over \\(B\\).</p>
        </div>

        <div class="env-block remark">
          <p><strong>Why Characteristic Classes?</strong> A characteristic class is a natural transformation from vector bundles to cohomology. Given a bundle \\(\\xi \\to B\\), a characteristic class assigns \\(c(\\xi) \\in H^*(B)\\) such that for any map \\(f: B' \\to B\\), we have \\(c(f^*\\xi) = f^*c(\\xi)\\). In other words, characteristic classes are <em>functorial invariants</em> that live in the cohomology of the base space. They arise by pulling back universal cohomology classes from \\(H^*(BO(n))\\) or \\(H^*(BU(n))\\).</p>
        </div>
        <div class="viz-placeholder" data-viz="vector-bundle-explorer"></div>
      `,
      visualizations: [
        {
          id: 'vector-bundle-explorer',
          title: 'Bundle Twisting Explorer',
          description: 'Visualize how fibers of a vector bundle twist as you move around the base space for trivial bundles, the Mobius band, and TS\u00b2',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = {
              bundleType: 'trivial',
              time: 0,
              showFibers: true,
              numFibers: 16,
              highlightIndex: -1
            };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              state.time += 0.015;
              var t = state.time;
              var cx = width / 2;
              var cy = height / 2;
              var bundleType = state.bundleType;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.textAlign = 'center';
              var titles = {
                'trivial': 'Trivial Line Bundle: S\u00B9 \u00D7 \u211D',
                'mobius': 'Mobius Band (Non-Trivial Line Bundle over S\u00B9)',
                'tangent': 'Tangent Bundle TS\u00B2 (Hairy Ball)'
              };
              ctx.fillText(titles[bundleType], cx, 28);

              if (bundleType === 'trivial' || bundleType === 'mobius') {
                var R = Math.min(width, height) * 0.25;
                var fiberLen = 50;

                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(cx, cy, R, 0, 2 * Math.PI);
                ctx.stroke();

                var N = state.numFibers;
                for (var i = 0; i < N; i++) {
                  var theta = (2 * Math.PI * i) / N;
                  var px = cx + R * Math.cos(theta);
                  var py = cy + R * Math.sin(theta);

                  var nx = Math.cos(theta);
                  var ny = Math.sin(theta);

                  var fiberAngle;
                  if (bundleType === 'trivial') {
                    fiberAngle = 0;
                  } else {
                    fiberAngle = theta / 2;
                  }

                  var dirX = nx * Math.cos(fiberAngle) - ny * Math.sin(fiberAngle);
                  var dirY = nx * Math.sin(fiberAngle) + ny * Math.cos(fiberAngle);

                  var hue = (theta / (2 * Math.PI)) * 360;
                  var isHighlight = (i === Math.floor((t * 2) % N));

                  if (state.showFibers) {
                    ctx.strokeStyle = isHighlight ? '#e74c3c' : 'hsl(' + hue + ', 70%, 50%)';
                    ctx.lineWidth = isHighlight ? 3 : 1.5;
                    ctx.beginPath();
                    ctx.moveTo(px - dirX * fiberLen, py - dirY * fiberLen);
                    ctx.lineTo(px + dirX * fiberLen, py + dirY * fiberLen);
                    ctx.stroke();

                    ctx.fillStyle = isHighlight ? '#e74c3c' : 'hsl(' + hue + ', 70%, 50%)';
                    ctx.beginPath();
                    ctx.arc(px, py, isHighlight ? 4 : 2, 0, 2 * Math.PI);
                    ctx.fill();
                  }
                }

                ctx.fillStyle = '#2c3e50';
                ctx.font = '14px serif';
                ctx.textAlign = 'center';
                if (bundleType === 'trivial') {
                  ctx.fillText('All fibers point outward consistently -- no twist', cx, height - 50);
                  ctx.fillText('w\u2081 = 0: trivial bundle admits a nonzero section', cx, height - 30);
                } else {
                  ctx.fillText('Fibers rotate 180\u00B0 around the loop -- the fundamental twist', cx, height - 50);
                  ctx.fillText('w\u2081(\u03B3\u00B9) \u2260 0: no continuous nonzero section exists', cx, height - 30);
                }

              } else if (bundleType === 'tangent') {
                var R2 = Math.min(width, height) * 0.28;

                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(cx, cy, R2, 0, 2 * Math.PI);
                ctx.stroke();

                ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.ellipse(cx, cy, R2, R2 * 0.3, 0, 0, 2 * Math.PI);
                ctx.stroke();

                if (state.showFibers) {
                  var nLat = 6, nLon = 12;
                  for (var ii = 1; ii < nLat; ii++) {
                    var phi = Math.PI * ii / nLat;
                    for (var j = 0; j < nLon; j++) {
                      var th = 2 * Math.PI * j / nLon;

                      var x3 = Math.sin(phi) * Math.cos(th);
                      var y3 = Math.sin(phi) * Math.sin(th);
                      var z3 = Math.cos(phi);

                      var tilt = 0.3;
                      var ppx = cx + R2 * (x3 * Math.cos(tilt) + z3 * Math.sin(tilt));
                      var ppy = cy + R2 * (-z3 * Math.cos(tilt) + x3 * Math.sin(tilt)) * 0.3 + R2 * y3;

                      var facing = x3 * Math.sin(tilt) + z3 * Math.cos(tilt);
                      if (facing < 0.1) continue;

                      var vx = Math.cos(phi) * Math.cos(th);
                      var vy = Math.cos(phi) * Math.sin(th);
                      var vz = -Math.sin(phi);

                      var dvx = (vx * Math.cos(tilt) + vz * Math.sin(tilt));
                      var dvy = (-vz * Math.cos(tilt) + vx * Math.sin(tilt)) * 0.3 + vy;

                      var scale = 18 * facing;
                      var arrowX = dvx * scale;
                      var arrowY = dvy * scale;
                      var fieldStrength = Math.sin(phi);

                      ctx.strokeStyle = 'rgba(231, 76, 60, ' + (0.3 + 0.6 * facing * fieldStrength) + ')';
                      ctx.lineWidth = 1.5;
                      ctx.beginPath();
                      ctx.moveTo(ppx, ppy);
                      ctx.lineTo(ppx + arrowX * fieldStrength, ppy + arrowY * fieldStrength);
                      ctx.stroke();

                      if (fieldStrength > 0.3) {
                        var angle = Math.atan2(arrowY, arrowX);
                        ctx.fillStyle = 'rgba(231, 76, 60, ' + (0.3 + 0.6 * facing * fieldStrength) + ')';
                        ctx.beginPath();
                        ctx.moveTo(ppx + arrowX * fieldStrength, ppy + arrowY * fieldStrength);
                        ctx.lineTo(ppx + arrowX * fieldStrength - 5 * Math.cos(angle - 0.4),
                                   ppy + arrowY * fieldStrength - 5 * Math.sin(angle - 0.4));
                        ctx.lineTo(ppx + arrowX * fieldStrength - 5 * Math.cos(angle + 0.4),
                                   ppy + arrowY * fieldStrength - 5 * Math.sin(angle + 0.4));
                        ctx.fill();
                      }
                    }
                  }
                }

                var northY = cy - R2 * Math.cos(0.3);
                var northX = cx + R2 * Math.sin(0.3);
                var southY = cy + R2 * Math.cos(0.3);
                var southX = cx - R2 * Math.sin(0.3);

                ctx.fillStyle = '#f39c12';
                ctx.beginPath();
                ctx.arc(northX, northY, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(southX, southY, 5, 0, 2 * Math.PI);
                ctx.fill();

                ctx.fillStyle = '#2c3e50';
                ctx.font = '12px serif';
                ctx.textAlign = 'left';
                ctx.fillText('zero (source)', northX + 8, northY + 4);
                ctx.fillText('zero (sink)', southX + 8, southY + 4);

                ctx.font = '14px serif';
                ctx.textAlign = 'center';
                ctx.fillText('Hairy Ball Theorem: every tangent vector field on S\u00B2 has a zero', cx, height - 50);
                ctx.fillText('e(TS\u00B2) = \u03C7(S\u00B2) = 2 (sum of indices of zeros)', cx, height - 30);
              }
            }

            // Select control: Bundle
            var bundleSelect = document.createElement('select');
            bundleSelect.style.background = '#161b22';
            bundleSelect.style.color = '#c9d1d9';
            bundleSelect.style.border = '1px solid #30363d';
            bundleSelect.style.padding = '4px 8px';
            bundleSelect.style.borderRadius = '4px';
            [{value:'trivial',label:'Trivial: S\u00B9 \u00D7 \u211D'},{value:'mobius',label:'Mobius Band (line bundle)'},{value:'tangent',label:'Tangent Bundle TS\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value;
              o.textContent = opt.label;
              bundleSelect.appendChild(o);
            });
            bundleSelect.value = 'trivial';
            bundleSelect.onchange = function() { state.bundleType = bundleSelect.value; draw(); };
            controls.appendChild(bundleSelect);

            // Button: Toggle Fibers
            var fiberBtn = document.createElement('button');
            fiberBtn.textContent = 'Toggle Fibers';
            fiberBtn.style.marginLeft = '10px';
            fiberBtn.style.padding = '4px 12px';
            fiberBtn.style.background = '#21262d';
            fiberBtn.style.color = '#c9d1d9';
            fiberBtn.style.border = '1px solid #30363d';
            fiberBtn.style.borderRadius = '4px';
            fiberBtn.style.cursor = 'pointer';
            fiberBtn.onclick = function() { state.showFibers = !state.showFibers; draw(); };
            controls.appendChild(fiberBtn);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'vb-ex1',
          question: 'Show that the tautological line bundle \\(\\gamma^1\\) over \\(\\mathbb{R}P^1 \\cong S^1\\) is isomorphic to the Mobius band bundle. Conclude that \\(\\gamma^1\\) is non-trivial.',
          hint: 'Recall that \\(\\mathbb{R}P^1\\) parametrizes lines through the origin in \\(\\mathbb{R}^2\\). Parametrize these lines by angle \\(\\theta \\in [0, \\pi)\\) and show the fiber identification undergoes a sign change as \\(\\theta \\to \\pi\\).',
          solution: 'Parametrize lines through the origin in \\(\\mathbb{R}^2\\) by \\(\\theta \\in [0, \\pi)\\), where the line \\(\\ell_\\theta\\) has direction \\((\\cos\\theta, \\sin\\theta)\\). The fiber over \\(\\ell_\\theta\\) is the 1-dimensional subspace \\(\\{t(\\cos\\theta, \\sin\\theta) : t \\in \\mathbb{R}\\}\\).\n\nChoose the local trivialization \\(\\varphi_\\theta: \\text{fiber} \\to \\mathbb{R}\\) by \\(t(\\cos\\theta, \\sin\\theta) \\mapsto t\\).\n\nAs \\(\\theta\\) increases from \\(0\\) to \\(\\pi\\), the line \\(\\ell_\\pi = \\ell_0\\), but the direction vector \\((\\cos\\pi, \\sin\\pi) = -(\\cos 0, \\sin 0)\\). So the trivialization at \\(\\theta = \\pi\\) identifies \\(t \\mapsto -t\\) relative to the trivialization at \\(\\theta = 0\\).\n\nThis sign flip is exactly the transition function of the Mobius band: \\(g_{01} = -1 \\in GL(1, \\mathbb{R})\\).\n\nSince the Mobius band has no nonvanishing section (a continuous function \\(f: S^1 \\to \\mathbb{R}\\) satisfying \\(f(\\theta + \\pi) = -f(\\theta)\\) must vanish somewhere by the intermediate value theorem), \\(\\gamma^1\\) is non-trivial. \\(\\square\\)'
        }
      ]
    },

    // ============================================================
    // Section 2: Stiefel-Whitney Classes
    // ============================================================
    {
      id: 'stiefel-whitney-classes',
      title: 'Stiefel-Whitney Classes',
      content: `
        <div class="env-block intuition">
          <p><strong>Motivation:</strong> Stiefel-Whitney classes are \\(\\mathbb{Z}/2\\)-cohomology classes associated to real vector bundles. They detect mod-2 twisting phenomena: orientability (\\(w_1\\)), spin structure (\\(w_2\\)), and embedding obstructions. Working over \\(\\mathbb{Z}/2\\) simplifies sign issues and makes these classes available for all bundles, including non-orientable ones.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Stiefel-Whitney Classes -- Axiomatic Characterization):</strong> There exist unique cohomology classes \\(w_i(E) \\in H^i(X; \\mathbb{Z}/2)\\) for each real vector bundle \\(E \\to X\\) satisfying:</p>
          <ol>
            <li><strong>Normalization:</strong> \\(w_0(E) = 1\\), and \\(w_i(E) = 0\\) for \\(i > \\operatorname{rank}(E)\\).</li>
            <li><strong>Naturality:</strong> If \\(f: B' \\to B\\) is continuous, then \\(w_i(f^*E) = f^*w_i(E)\\).</li>
            <li><strong>Whitney Product Formula:</strong> \\(w(E \\oplus F) = w(E) \\cdot w(F)\\), where \\(w(E) = 1 + w_1(E) + w_2(E) + \\cdots\\) is the <em>total Stiefel-Whitney class</em> and the product is the cup product in \\(H^*(X; \\mathbb{Z}/2)\\).</li>
            <li><strong>Non-triviality:</strong> For the tautological line bundle \\(\\gamma^1\\) over \\(\\mathbb{R}P^\\infty\\), \\(w_1(\\gamma^1) \\neq 0\\).</li>
          </ol>
          <p>The total class \\(w(E) \\in H^*(B; \\mathbb{Z}/2)\\) is a unit in the cohomology ring (since \\(w_0 = 1\\)). The universal classes generate \\(H^*(BO(n); \\mathbb{Z}/2) = \\mathbb{Z}/2[w_1, w_2, \\ldots, w_n]\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Geometric Meaning of Low-Degree Classes):</strong></p>
          <ul>
            <li>\\(w_1(E) = 0\\) if and only if \\(E\\) is <em>orientable</em> (structure group reduces to \\(SO(n)\\)).</li>
            <li>\\(w_1(TM) = 0\\) iff the manifold \\(M\\) is orientable.</li>
            <li>\\(w_2(E) = 0\\) (when \\(w_1 = 0\\)) if and only if \\(E\\) admits a <em>spin structure</em> (structure group lifts to \\(\\mathrm{Spin}(n)\\), the universal double cover of \\(SO(n)\\)).</li>
          </ul>
        </div>

        <div class="env-block proof">
          <p><strong>Proof sketch for \\(w_1\\) and orientability:</strong> The first Stiefel-Whitney class is the obstruction to choosing a consistent orientation on the fibers. Formally, \\(w_1(E)\\) is the image of the classifying map \\(f: X \\to BO(n)\\) under \\(H^1(BO(n); \\mathbb{Z}/2) \\to H^1(X; \\mathbb{Z}/2)\\). The map \\(BO(n) \\to BO(1) \\cong \\mathbb{R}P^\\infty\\) given by \\(\\det\\) yields \\(w_1 = f^*(\\det^*)\\). This is zero iff the determinant bundle is trivial, iff \\(E\\) is orientable. \\(\\square\\)</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Stiefel-Whitney of \\(\\mathbb{R}P^n\\)):</strong> The tangent bundle \\(T\\mathbb{R}P^n\\) satisfies \\(T\\mathbb{R}P^n \\oplus \\varepsilon^1 \\cong (\\gamma^1)^{\\oplus(n+1)}\\). By the Whitney product formula:</p>
          \\[ w(T\\mathbb{R}P^n) = (1 + \\alpha)^{n+1} \\in H^*(\\mathbb{R}P^n; \\mathbb{Z}/2) = \\mathbb{Z}/2[\\alpha]/(\\alpha^{n+1}) \\]
          <p>For instance:</p>
          <ul>
            <li>\\(\\mathbb{R}P^2\\): \\(w = (1+\\alpha)^3 = 1 + \\alpha + \\alpha^2\\) (mod 2). Since \\(w_1 = \\alpha \\neq 0\\), \\(\\mathbb{R}P^2\\) is non-orientable.</li>
            <li>\\(\\mathbb{R}P^3\\): \\(w = (1+\\alpha)^4 = 1\\) (mod 2). All SW classes vanish -- orientable and spin!</li>
            <li>\\(\\mathbb{R}P^4\\): \\(w = (1+\\alpha)^5 = 1 + \\alpha + \\alpha^4\\) (by Lucas' theorem mod 2).</li>
            <li>\\(\\mathbb{R}P^{2^k - 1}\\): \\(w = (1+\\alpha)^{2^k} = 1\\) since \\(\\alpha^{2^k} = 0\\). Trivial total SW class!</li>
          </ul>
          <p>In general, \\(\\mathbb{R}P^n\\) is orientable iff \\(n\\) is odd, and spin iff \\(n \\equiv 3 \\pmod{4}\\).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Dual Stiefel-Whitney Classes):</strong> If \\(E\\) has total class \\(w(E)\\), its <em>dual</em> (or <em>complementary</em>) Stiefel-Whitney class is \\(\\bar{w}(E)\\) defined by \\(w(E) \\cup \\bar{w}(E) = 1\\). If \\(E \\oplus \\nu \\cong \\varepsilon^N\\) (i.e., \\(\\nu\\) is a <em>stable inverse</em>), then \\(w(\\nu) = \\bar{w}(E)\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Immersion Obstruction):</strong> If a closed \\(n\\)-manifold \\(M\\) can be immersed in \\(\\mathbb{R}^{n+k}\\), then the normal bundle \\(\\nu\\) has rank \\(k\\) and \\(w(\\nu) = \\bar{w}(TM)\\). Since \\(\\nu\\) has rank \\(k\\), we need \\(\\bar{w}_i(TM) = 0\\) for all \\(i > k\\). This gives a <em>lower bound</em> on the codimension of any immersion.</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Non-immersion of \\(\\mathbb{R}P^4\\)):</strong> We have \\(w(T\\mathbb{R}P^4) = 1 + \\alpha + \\alpha^4\\). The dual class \\(\\bar{w} = (1 + \\alpha + \\alpha^4)^{-1}\\). Computing mod 2: \\(\\bar{w} = 1 + \\alpha + \\alpha^2 + \\alpha^3\\). Since \\(\\bar{w}_3 \\neq 0\\), \\(\\mathbb{R}P^4\\) cannot be immersed in \\(\\mathbb{R}^7\\) (codimension < 3 is obstructed). It requires at least \\(\\mathbb{R}^8\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Stiefel-Whitney Numbers and Cobordism):</strong> For a closed \\(n\\)-manifold \\(M\\), the <em>Stiefel-Whitney numbers</em> are the values \\(\\langle w_{i_1} \\cup \\cdots \\cup w_{i_k}, [M]_2 \\rangle \\in \\mathbb{Z}/2\\) where \\(i_1 + \\cdots + i_k = n\\).</p>
          <p><strong>Thom's Theorem:</strong> Two closed manifolds are <em>unoriented cobordant</em> if and only if they have the same Stiefel-Whitney numbers.</p>
        </div>
        <div class="viz-placeholder" data-viz="stiefel-whitney-calculator"></div>
      `,
      visualizations: [
        {
          id: 'stiefel-whitney-calculator',
          title: 'Stiefel-Whitney Class Calculator',
          description: 'Compute w(TRP^n) = (1+a)^(n+1) mod 2, see which classes vanish, and explore immersion obstructions',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { n: 4, showDual: false, showBinary: true };

            function superscript(d) {
              var sup = '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079';
              return String(d).split('').map(function(c) {
                if (c === '-') return '\u207B';
                return sup[parseInt(c)] || c;
              }).join('');
            }

            function subscriptStr(d) {
              var sub = '\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089';
              return String(d).split('').map(function(c) { return sub[parseInt(c)] || c; }).join('');
            }

            function binomMod2(a, b) {
              if (b < 0 || b > a) return 0;
              while (a > 0 || b > 0) {
                if ((b & 1) > (a & 1)) return 0;
                a >>= 1;
                b >>= 1;
              }
              return 1;
            }

            function invertMod2Poly(poly, maxDeg) {
              var inv = new Array(maxDeg + 1).fill(0);
              inv[0] = 1;
              for (var k = 1; k <= maxDeg; k++) {
                var sum = 0;
                for (var j = 1; j <= k; j++) {
                  if (j < poly.length) {
                    sum ^= (poly[j] & inv[k - j]);
                  }
                }
                inv[k] = sum;
              }
              return inv;
            }

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var n = state.n;
              var cx = width / 2;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.textAlign = 'center';
              ctx.fillText('Stiefel-Whitney Classes of \u211DP' + superscript(n), cx, 28);

              var coeffs = [];
              for (var k = 0; k <= n; k++) {
                coeffs.push(binomMod2(n + 1, k));
              }

              ctx.font = '16px serif';
              ctx.fillStyle = '#2c3e50';
              ctx.fillText('w(T\u211DP' + superscript(n) + ') = (1 + \u03B1)' + superscript(n + 1) + ' mod 2, \u03B1' + superscript(n + 1) + ' = 0', cx, 58);

              var blockW = Math.min(50, (width - 80) / (n + 1));
              var startX = cx - (n + 1) * blockW / 2;
              var blockY = 85;
              var blockH = 40;

              for (var k2 = 0; k2 <= n; k2++) {
                var x = startX + k2 * blockW;
                var isNonzero = coeffs[k2] === 1;

                ctx.fillStyle = isNonzero ? 'rgba(231, 76, 60, 0.8)' : 'rgba(189, 195, 199, 0.3)';
                ctx.fillRect(x + 2, blockY, blockW - 4, blockH);
                ctx.strokeStyle = isNonzero ? '#c0392b' : '#bdc3c7';
                ctx.lineWidth = 1;
                ctx.strokeRect(x + 2, blockY, blockW - 4, blockH);

                ctx.fillStyle = isNonzero ? '#fff' : '#95a5a6';
                ctx.font = 'bold 16px serif';
                ctx.textAlign = 'center';
                ctx.fillText(coeffs[k2].toString(), x + blockW / 2, blockY + 26);

                ctx.fillStyle = '#2c3e50';
                ctx.font = '12px serif';
                ctx.fillText('w' + subscriptStr(k2), x + blockW / 2, blockY + blockH + 16);
              }

              var totalStr = 'w = ';
              var terms = [];
              for (var k3 = 0; k3 <= n; k3++) {
                if (coeffs[k3] === 1) {
                  terms.push(k3 === 0 ? '1' : (k3 === 1 ? '\u03B1' : '\u03B1' + superscript(k3)));
                }
              }
              totalStr += terms.join(' + ');

              ctx.fillStyle = '#2c3e50';
              ctx.font = '16px serif';
              ctx.textAlign = 'center';
              ctx.fillText(totalStr, cx, blockY + blockH + 45);

              var orientable = coeffs.length > 1 ? coeffs[1] === 0 : true;
              var spin = orientable && (n < 2 || coeffs[2] === 0);
              ctx.font = 'bold 14px serif';
              ctx.fillStyle = orientable ? '#27ae60' : '#e74c3c';
              ctx.fillText('\u211DP' + superscript(n) + ': ' + (orientable ? 'Orientable' : 'Non-orientable') +
                (orientable ? (spin ? ', Spin' : ', Not Spin') : ''), cx, blockY + blockH + 68);

              if (state.showBinary) {
                var binY = blockY + blockH + 90;
                ctx.fillStyle = '#8e44ad';
                ctx.font = 'bold 14px serif';
                ctx.textAlign = 'center';
                ctx.fillText("Lucas' Theorem: C(n+1, k) mod 2 from binary digits", cx, binY);

                var binStr = (n + 1).toString(2);
                ctx.font = '14px monospace';
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('n+1 = ' + (n + 1) + ' = ' + binStr + '\u2082', cx, binY + 22);
                ctx.fillText('C(n+1,k) mod 2 = 1 iff each binary digit of k \u2264 that of n+1', cx, binY + 44);
              }

              if (state.showDual) {
                var dualY = height - 90;
                var dual = invertMod2Poly(coeffs, n);

                ctx.fillStyle = '#27ae60';
                ctx.font = 'bold 14px serif';
                ctx.textAlign = 'center';
                ctx.fillText('Dual Stiefel-Whitney classes (normal bundle):', cx, dualY);

                var dualStr = 'w\u0305 = ';
                var dualTerms = [];
                for (var k4 = 0; k4 <= n; k4++) {
                  if (dual[k4] === 1) {
                    dualTerms.push(k4 === 0 ? '1' : (k4 === 1 ? '\u03B1' : '\u03B1' + superscript(k4)));
                  }
                }
                dualStr += dualTerms.join(' + ');

                ctx.font = '15px serif';
                ctx.fillStyle = '#2c3e50';
                ctx.fillText(dualStr, cx, dualY + 24);

                var maxDualDeg = 0;
                for (var k5 = n; k5 >= 1; k5--) {
                  if (dual[k5] === 1) { maxDualDeg = k5; break; }
                }
                if (maxDualDeg > 0) {
                  ctx.fillStyle = '#e74c3c';
                  ctx.font = '14px serif';
                  ctx.fillText('Highest nonzero dual class: w\u0305' + subscriptStr(maxDualDeg) + ' \u2260 0', cx, dualY + 48);
                  ctx.fillText('\u21D2 \u211DP' + superscript(n) + ' cannot immerse in \u211D' + superscript(2 * n - maxDualDeg), cx, dualY + 68);
                } else {
                  ctx.fillStyle = '#27ae60';
                  ctx.font = '14px serif';
                  ctx.fillText('All dual classes vanish (no SW immersion obstruction)', cx, dualY + 48);
                }
              }
            }

            // Slider: n
            var nLabel = document.createElement('label');
            nLabel.style.color = '#c9d1d9';
            nLabel.style.marginRight = '8px';
            nLabel.textContent = 'n: 4';
            controls.appendChild(nLabel);
            var nSlider = document.createElement('input');
            nSlider.type = 'range';
            nSlider.min = 1;
            nSlider.max = 10;
            nSlider.step = 1;
            nSlider.value = 4;
            nSlider.style.width = '200px';
            nSlider.oninput = function() { state.n = parseFloat(nSlider.value); nLabel.textContent = 'n: ' + nSlider.value; draw(); };
            controls.appendChild(nSlider);

            // Button: Toggle Dual
            var dualBtn = document.createElement('button');
            dualBtn.textContent = 'Toggle Dual Classes';
            dualBtn.style.marginLeft = '10px';
            dualBtn.style.padding = '4px 12px';
            dualBtn.style.background = '#21262d';
            dualBtn.style.color = '#c9d1d9';
            dualBtn.style.border = '1px solid #30363d';
            dualBtn.style.borderRadius = '4px';
            dualBtn.style.cursor = 'pointer';
            dualBtn.onclick = function() { state.showDual = !state.showDual; draw(); };
            controls.appendChild(dualBtn);

            // Button: Toggle Lucas
            var lucasBtn = document.createElement('button');
            lucasBtn.textContent = "Toggle Lucas' Theorem";
            lucasBtn.style.marginLeft = '10px';
            lucasBtn.style.padding = '4px 12px';
            lucasBtn.style.background = '#21262d';
            lucasBtn.style.color = '#c9d1d9';
            lucasBtn.style.border = '1px solid #30363d';
            lucasBtn.style.borderRadius = '4px';
            lucasBtn.style.cursor = 'pointer';
            lucasBtn.onclick = function() { state.showBinary = !state.showBinary; draw(); };
            controls.appendChild(lucasBtn);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'sw-ex1',
          question: 'Using Stiefel-Whitney classes, show that \\(\\mathbb{R}P^8\\) cannot be immersed in \\(\\mathbb{R}^{14}\\).',
          hint: 'Compute \\(w(T\\mathbb{R}P^8) = (1+\\alpha)^9\\) mod 2, then find the dual classes \\(\\bar{w}\\) and look for the highest nonzero dual class.',
          solution: 'We have \\(w(T\\mathbb{R}P^8) = (1+\\alpha)^9\\) in \\(H^*(\\mathbb{R}P^8; \\mathbb{Z}/2) = \\mathbb{Z}/2[\\alpha]/(\\alpha^9)\\).\n\nBy Lucas\' theorem, \\(\\binom{9}{k} \\mod 2 = 1\\) iff each binary digit of \\(k\\) is \\(\\leq\\) the corresponding digit of \\(9 = 1001_2\\).\n\nSo \\(k\\) must have binary digits \\(\\leq 1001\\), giving \\(k \\in \\{0, 1, 8\\}\\) (but \\(\\alpha^8 \\neq 0\\) in \\(\\mathbb{R}P^8\\), \\(\\alpha^9 = 0\\)).\n\nThus \\(w = 1 + \\alpha + \\alpha^8\\).\n\nFor the dual: \\(\\bar{w} \\cdot w = 1\\). We need \\(\\bar{w} \\cdot (1 + \\alpha + \\alpha^8) = 1 \\mod 2\\) up to degree 8.\n\nComputing: \\(\\bar{w} = 1 + \\alpha + \\alpha^2 + \\alpha^3 + \\alpha^4 + \\alpha^5 + \\alpha^6 + \\alpha^7\\).\n\nSince \\(\\bar{w}_7 \\neq 0\\), if \\(\\mathbb{R}P^8\\) immersed in \\(\\mathbb{R}^{8+k}\\), we\'d need \\(\\bar{w}_i = 0\\) for \\(i > k\\). So we need \\(k \\geq 7\\), meaning \\(\\mathbb{R}P^8\\) requires at least \\(\\mathbb{R}^{15}\\) for immersion. It cannot immerse in \\(\\mathbb{R}^{14}\\). \\(\\square\\)'
        }
      ]
    },

    // ============================================================
    // Section 3: Chern Classes
    // ============================================================
    {
      id: 'chern-classes',
      title: 'Chern Classes',
      content: `
        <div class="env-block intuition">
          <p><strong>Motivation:</strong> Chern classes are the complex analog of Stiefel-Whitney classes, but they live in <em>integral</em> cohomology \\(H^{2i}(B; \\mathbb{Z})\\) rather than \\(\\mathbb{Z}/2\\). Because complex bundles carry richer structure than real ones (the structure group \\(U(n)\\) is connected), Chern classes are integer-valued and carry strictly more refined information.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Complex Vector Bundle):</strong> A <strong>complex vector bundle of rank \\(n\\)</strong> over \\(B\\) is defined exactly like a real bundle, but with fibers \\(\\cong \\mathbb{C}^n\\), structure group \\(GL(n, \\mathbb{C})\\), and fiber-wise \\(\\mathbb{C}\\)-linear transition functions. The classifying space is \\(BU(n) = \\text{Gr}_n(\\mathbb{C}^\\infty)\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Chern Classes -- Axiomatic Definition):</strong> There exists a unique assignment that to every complex vector bundle \\(\\xi \\to B\\) associates classes \\(c_i(\\xi) \\in H^{2i}(B; \\mathbb{Z})\\) for \\(i \\geq 0\\), satisfying:</p>
          <ol>
            <li><strong>(Normalization):</strong> \\(c_0(\\xi) = 1\\), and \\(c_i(\\xi) = 0\\) for \\(i > \\operatorname{rank}_{\\mathbb{C}}(\\xi)\\).</li>
            <li><strong>(Naturality):</strong> \\(c_i(f^*\\xi) = f^*c_i(\\xi)\\).</li>
            <li><strong>(Whitney Sum Formula):</strong> \\(c(\\xi \\oplus \\eta) = c(\\xi) \\cup c(\\eta)\\), where \\(c(\\xi) = 1 + c_1(\\xi) + c_2(\\xi) + \\cdots\\) is the <em>total Chern class</em>.</li>
            <li><strong>(Non-triviality):</strong> For the tautological line bundle \\(\\gamma^1_{\\mathbb{C}}\\) over \\(\\mathbb{C}P^1\\), \\(c_1(\\gamma^1_{\\mathbb{C}})\\) is a generator of \\(H^2(\\mathbb{C}P^1; \\mathbb{Z}) \\cong \\mathbb{Z}\\).</li>
          </ol>
          <p>The universal Chern classes generate \\(H^*(BU(n); \\mathbb{Z}) = \\mathbb{Z}[c_1, c_2, \\ldots, c_n]\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Splitting Principle):</strong> For any complex rank-\\(n\\) bundle \\(E \\to X\\), there exists a space \\(F(E)\\) (the <em>flag bundle</em>) and a map \\(p: F(E) \\to X\\) such that:</p>
          <ol>
            <li>\\(p^*: H^*(X; \\mathbb{Z}) \\hookrightarrow H^*(F(E); \\mathbb{Z})\\) is injective.</li>
            <li>\\(p^*E \\cong L_1 \\oplus L_2 \\oplus \\cdots \\oplus L_n\\) splits as a sum of line bundles.</li>
          </ol>
          <p>Consequently, any identity involving Chern classes can be verified for sums of line bundles, where \\(c(L_1 \\oplus \\cdots \\oplus L_n) = \\prod_i (1 + c_1(L_i))\\).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Chern Roots):</strong> Via the splitting principle, formally write \\(c(E) = \\prod_{i=1}^n (1 + x_i)\\), where \\(x_i = c_1(L_i)\\) are the <em>Chern roots</em>. Then:</p>
          <ul>
            <li>\\(c_k(E) = e_k(x_1, \\ldots, x_n)\\), the \\(k\\)-th elementary symmetric polynomial.</li>
            <li>\\(c_n(E) = x_1 x_2 \\cdots x_n = e(E)\\), the <em>Euler class</em>.</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (First Chern Class and Line Bundles):</strong> For complex line bundles over \\(B\\), the first Chern class gives a group isomorphism</p>
          \\[ c_1: \\text{Vect}^{\\mathbb{C}}_1(B) \\xrightarrow{\\sim} H^2(B; \\mathbb{Z}) \\]
          <p>where the left side has the group structure from tensor product of line bundles. Thus \\(c_1(L \\otimes L') = c_1(L) + c_1(L')\\), and \\(c_1(L^*) = -c_1(L)\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Chern Classes of \\(\\mathbb{C}P^n\\)):</strong> The tangent bundle \\(T\\mathbb{C}P^n\\) satisfies \\(T\\mathbb{C}P^n \\oplus \\varepsilon^1_{\\mathbb{C}} \\cong (\\gamma^1_{\\mathbb{C}})^{*\\oplus(n+1)}\\). If \\(h = c_1((\\gamma^1_{\\mathbb{C}})^*) \\in H^2(\\mathbb{C}P^n)\\) is the hyperplane class, then:</p>
          \\[ c(T\\mathbb{C}P^n) = (1 + h)^{n+1} \\quad \\text{in } H^*(\\mathbb{C}P^n; \\mathbb{Z}) = \\mathbb{Z}[h]/(h^{n+1}) \\]
          <p>For \\(\\mathbb{C}P^2\\): \\(c(T\\mathbb{C}P^2) = 1 + 3h + 3h^2\\), so \\(c_1 = 3h\\), \\(c_2 = 3h^2\\). The Euler characteristic is \\(\\chi(\\mathbb{C}P^2) = c_2[\\mathbb{C}P^2] = 3\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Chern-Weil Theory):</strong> If \\(E\\) carries a connection with curvature form \\(\\Omega \\in \\Omega^2(M; \\mathrm{End}(E))\\), then:</p>
          \\[ c_k(E) = \\left[ \\frac{1}{(2\\pi i)^k} \\sigma_k\\left(\\frac{i}{2\\pi}\\Omega\\right) \\right] \\in H^{2k}_{\\mathrm{dR}}(M) \\]
          <p>In particular, \\(c_1(E) = \\left[ \\frac{i}{2\\pi} \\mathrm{tr}(\\Omega) \\right]\\). The class is <em>independent of the choice of connection</em>, connecting topology to curvature.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Chern Character):</strong> The <em>Chern character</em> is the ring homomorphism \\(\\text{ch}: K(X) \\to H^{\\text{even}}(X; \\mathbb{Q})\\) defined for a line bundle by \\(\\text{ch}(L) = e^{c_1(L)}\\) and extended by the splitting principle. For a rank-\\(n\\) bundle with Chern roots \\(x_1, \\ldots, x_n\\):</p>
          \\[ \\text{ch}(\\xi) = \\sum_{i=1}^n e^{x_i} = n + c_1 + \\frac{c_1^2 - 2c_2}{2} + \\cdots \\]
          <p>The Chern character satisfies \\(\\text{ch}(\\xi \\oplus \\eta) = \\text{ch}(\\xi) + \\text{ch}(\\eta)\\) and \\(\\text{ch}(\\xi \\otimes \\eta) = \\text{ch}(\\xi) \\cdot \\text{ch}(\\eta)\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Relation Between Chern and Stiefel-Whitney):</strong> If \\(\\xi\\) is a complex vector bundle viewed as a real bundle \\(\\xi_{\\mathbb{R}}\\) of rank \\(2n\\), then:</p>
          <ul>
            <li>\\(w_{2i}(\\xi_{\\mathbb{R}}) = c_i(\\xi) \\pmod{2}\\) (the mod-2 reduction of Chern classes gives even Stiefel-Whitney classes)</li>
            <li>\\(w_{2i+1}(\\xi_{\\mathbb{R}}) = 0\\) for all \\(i\\) (odd Stiefel-Whitney classes vanish)</li>
          </ul>
          <p>In particular, every complex bundle is orientable (\\(w_1 = 0\\)) and spin if \\(c_1\\) is even.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Summary of Characteristic Classes:</strong></p>
          <table style="border-collapse: collapse; margin: 10px 0;">
            <tr style="border-bottom: 2px solid #bdc3c7;">
              <th style="padding: 6px 12px; text-align: left;">Class</th>
              <th style="padding: 6px 12px; text-align: left;">Bundle type</th>
              <th style="padding: 6px 12px; text-align: left;">Coefficients</th>
              <th style="padding: 6px 12px; text-align: left;">Degrees</th>
            </tr>
            <tr style="border-bottom: 1px solid #ecf0f1;">
              <td style="padding: 6px 12px;">Stiefel-Whitney \\(w_i\\)</td>
              <td style="padding: 6px 12px;">Real</td>
              <td style="padding: 6px 12px;">\\(\\mathbb{Z}/2\\)</td>
              <td style="padding: 6px 12px;">\\(H^i\\)</td>
            </tr>
            <tr style="border-bottom: 1px solid #ecf0f1;">
              <td style="padding: 6px 12px;">Chern \\(c_i\\)</td>
              <td style="padding: 6px 12px;">Complex</td>
              <td style="padding: 6px 12px;">\\(\\mathbb{Z}\\)</td>
              <td style="padding: 6px 12px;">\\(H^{2i}\\)</td>
            </tr>
            <tr style="border-bottom: 1px solid #ecf0f1;">
              <td style="padding: 6px 12px;">Pontryagin \\(p_i\\)</td>
              <td style="padding: 6px 12px;">Real</td>
              <td style="padding: 6px 12px;">\\(\\mathbb{Z}\\)</td>
              <td style="padding: 6px 12px;">\\(H^{4i}\\)</td>
            </tr>
            <tr>
              <td style="padding: 6px 12px;">Euler \\(e\\)</td>
              <td style="padding: 6px 12px;">Oriented real</td>
              <td style="padding: 6px 12px;">\\(\\mathbb{Z}\\)</td>
              <td style="padding: 6px 12px;">\\(H^n\\) (top)</td>
            </tr>
          </table>
        </div>
        <div class="viz-placeholder" data-viz="chern-class-visualizer"></div>
      `,
      visualizations: [
        {
          id: 'chern-class-visualizer',
          title: 'Chern Class of Line Bundles over CP^n',
          description: 'Visualize how c1 classifies complex line bundles and see the ring structure of H*(CP^n)',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { n: 2, animT: 0, showRing: true };

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var n = state.n;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.textAlign = 'center';
              ctx.fillText('Chern Classes of T\u2102P' + String.fromCharCode(0x2070 + n), width / 2, 28);

              state.animT += 0.01;

              var startY = 55;
              ctx.font = '15px serif';
              ctx.textAlign = 'left';
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText('H*(\u2102P' + n + '; \u2124) = \u2124[h] / (h' + String.fromCharCode(0x2070 + n + 1) + '),  deg(h) = 2', 30, startY);

              var coeffs = [];
              for (var i = 0; i <= n; i++) {
                var binom = 1;
                for (var j = 0; j < i; j++) {
                  binom = binom * (n + 1 - j) / (j + 1);
                }
                coeffs.push(Math.round(binom));
              }

              var tableY = startY + 30;
              var rowH = 30;

              ctx.font = 'bold 14px serif';
              ctx.fillStyle = '#7f8c8d';
              ctx.fillText('Chern class', 30, tableY);
              ctx.fillText('Degree', 170, tableY);
              ctx.fillText('Value', 250, tableY);

              ctx.strokeStyle = '#bdc3c7';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(30, tableY + 8);
              ctx.lineTo(width - 30, tableY + 8);
              ctx.stroke();

              for (var ii = 0; ii <= n; ii++) {
                var y = tableY + (ii + 1) * rowH;
                ctx.font = '15px serif';
                ctx.fillStyle = '#2c3e50';
                ctx.fillText('c' + String.fromCharCode(0x2080 + ii), 30, y);
                ctx.fillText('' + (2 * ii), 170, y);
                if (ii === 0) {
                  ctx.fillStyle = '#27ae60';
                  ctx.fillText('1', 250, y);
                } else {
                  ctx.fillStyle = '#e74c3c';
                  ctx.font = 'bold 15px serif';
                  ctx.fillText(coeffs[ii] + 'h' + (ii > 1 ? String.fromCharCode(0x2070 + ii) : ''), 250, y);
                }

                ctx.strokeStyle = 'rgba(189,195,199,0.3)';
                ctx.beginPath();
                ctx.moveTo(30, y + 8);
                ctx.lineTo(width - 30, y + 8);
                ctx.stroke();
              }

              var totalY = tableY + (n + 2) * rowH + 10;
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 15px serif';
              var totalStr = 'c(T\u2102P' + n + ') = (1+h)' + String.fromCharCode(0x2070 + n + 1) + ' = ';
              var terms = [];
              for (var k = 0; k <= n; k++) {
                if (k === 0) terms.push('1');
                else if (k === 1) terms.push(coeffs[k] + 'h');
                else terms.push(coeffs[k] + 'h' + String.fromCharCode(0x2070 + k));
              }
              totalStr += terms.join(' + ');
              ctx.fillText(totalStr, 30, totalY);

              var chiY = totalY + 30;
              var chi = n + 1;
              ctx.fillStyle = '#9b59b6';
              ctx.font = '15px serif';
              ctx.fillText('\u03C7(\u2102P' + n + ') = c' + String.fromCharCode(0x2080 + n) + '[\u2102P' + n + '] = ' + coeffs[n] + ' (top Chern class = Euler class)', 30, chiY);

              var geoY = chiY + 40;
              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 15px serif';
              ctx.fillText('CW structure of \u2102P' + n + ':', 30, geoY);

              ctx.font = '14px serif';
              var cellStr = '';
              for (var m = 0; m <= n; m++) {
                cellStr += 'e' + String.fromCharCode(0x2070 + 2 * m);
                if (m < n) cellStr += ' \u222A ';
              }
              ctx.fillText('Cells: ' + cellStr + '  (one cell in each even dimension 0, 2, ..., ' + (2 * n) + ')', 30, geoY + 22);

              var noteY = height - 35;
              ctx.fillStyle = '#3498db';
              ctx.font = 'bold 14px serif';
              ctx.fillText('Key fact: c\u2081 classifies complex line bundles: Vect\u00B9\u2102(B) \u2245 H\u00B2(B;\u2124)', 30, noteY);
            }

            // Slider: n
            var nLabel = document.createElement('label');
            nLabel.style.color = '#c9d1d9';
            nLabel.style.marginRight = '8px';
            nLabel.textContent = 'n: 2';
            controls.appendChild(nLabel);
            var nSlider = document.createElement('input');
            nSlider.type = 'range';
            nSlider.min = 1;
            nSlider.max = 6;
            nSlider.step = 1;
            nSlider.value = 2;
            nSlider.style.width = '200px';
            nSlider.oninput = function() { state.n = parseFloat(nSlider.value); nLabel.textContent = 'n: ' + nSlider.value; draw(); };
            controls.appendChild(nSlider);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'chern-ex1',
          question: 'Compute all Chern classes of \\(T\\mathbb{C}P^3\\) and verify that the Euler characteristic \\(\\chi(\\mathbb{C}P^3) = c_3[\\mathbb{C}P^3] = 4\\).',
          hint: 'Use \\(c(T\\mathbb{C}P^3) = (1+h)^4\\) in \\(\\mathbb{Z}[h]/(h^4)\\). Expand the binomial and evaluate the top class on the fundamental class.',
          solution: 'We have \\(c(T\\mathbb{C}P^3) = (1 + h)^4\\) in \\(H^*(\\mathbb{C}P^3; \\mathbb{Z}) = \\mathbb{Z}[h]/(h^4)\\) with \\(\\deg(h) = 2\\).\n\nExpanding:\n\\[ (1+h)^4 = 1 + 4h + 6h^2 + 4h^3 \\quad (\\text{since } h^4 = 0) \\]\n\nSo:\n- \\(c_0 = 1\\)\n- \\(c_1 = 4h \\in H^2\\)\n- \\(c_2 = 6h^2 \\in H^4\\)\n- \\(c_3 = 4h^3 \\in H^6\\)\n\nThe Euler characteristic is the top Chern number:\n\\[ \\chi(\\mathbb{C}P^3) = \\langle c_3, [\\mathbb{C}P^3] \\rangle = \\langle 4h^3, [\\mathbb{C}P^3] \\rangle = 4 \\]\n\nsince \\(\\langle h^3, [\\mathbb{C}P^3] \\rangle = 1\\) (the generator \\(h^3\\) pairs with the fundamental class to give 1).\n\nAlternatively: \\(\\chi(\\mathbb{C}P^3) = 1 + 1 + 1 + 1 = 4\\) (one cell in each even dimension 0, 2, 4, 6). \\(\\checkmark\\)'
        }
      ]
    },

    // ============================================================
    // Section 4: Pontryagin Classes, the Euler Class, and Applications
    // ============================================================
    {
      id: 'pontryagin-euler-applications',
      title: 'Pontryagin Classes, the Euler Class, and Applications',
      content: `
        <div class="env-block intuition">
          <p><strong>Overview:</strong> Pontryagin classes are integral invariants of <em>real</em> vector bundles, obtained by complexifying and taking Chern classes. The Euler class is a special class for <em>oriented</em> bundles, directly tied to the Euler characteristic. Together, these classes have powerful concrete applications -- from immersion/embedding obstructions to deep index theorems connecting topology to analysis and physics.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Pontryagin Classes):</strong> For a real vector bundle \\(\\xi\\) of rank \\(n\\), the <em>Pontryagin classes</em> \\(p_i(\\xi) \\in H^{4i}(B; \\mathbb{Z})\\) are defined by</p>
          \\[ p_i(\\xi) = (-1)^i c_{2i}(\\xi \\otimes \\mathbb{C}) \\]
          <p>where \\(\\xi \\otimes \\mathbb{C}\\) is the complexification. The total Pontryagin class is \\(p(\\xi) = 1 + p_1(\\xi) + p_2(\\xi) + \\cdots\\). For a complex bundle \\(E\\), the relation \\(p_k(E_{\\mathbb{R}}) = c_k^2 - 2c_{k-1}c_{k+1} + \\cdots\\) provides a direct formula; in particular, \\(p_1(E_{\\mathbb{R}}) = c_1(E)^2 - 2c_2(E)\\).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Euler Class):</strong> For an <em>oriented</em> real vector bundle \\(E \\to X\\) of rank \\(n\\), the <em>Euler class</em> \\(e(E) \\in H^n(X; \\mathbb{Z})\\) is defined via the Thom isomorphism. Key properties:</p>
          <ul>
            <li>\\(e(E) = 0\\) if \\(E\\) admits a nowhere-zero section.</li>
            <li>\\(e(E \\oplus F) = e(E) \\cup e(F)\\).</li>
            <li>Changing orientation negates \\(e\\): \\(e(\\bar{E}) = -e(E)\\).</li>
            <li>\\(e(E)^2 = p_{n/2}(E)\\) when \\(n\\) is even.</li>
            <li>\\(e(E) \\mod 2 = w_n(E)\\), the top Stiefel-Whitney class.</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Euler Class and Euler Characteristic):</strong> For a closed oriented \\(n\\)-manifold \\(M\\),</p>
          \\[ \\langle e(TM), [M] \\rangle = \\chi(M) \\]
          <p>The Euler class of the tangent bundle, evaluated on the fundamental class, gives the Euler characteristic.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Poincare-Hopf):</strong> If \\(v\\) is a vector field on a closed oriented manifold \\(M\\) with isolated zeroes \\(p_1, \\ldots, p_k\\), then</p>
          \\[ \\sum_{i=1}^k \\operatorname{index}(v, p_i) = \\chi(M) = \\langle e(TM), [M] \\rangle \\]
          <p>This connects the local behavior of vector fields (indices at zeroes) to the global topology (Euler class).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (Euler Classes in Action):</strong></p>
          <ul>
            <li><strong>Hairy Ball Theorem:</strong> \\(\\chi(S^{2n}) = 2 \\neq 0\\), so \\(e(TS^{2n}) \\neq 0\\) and \\(S^{2n}\\) admits no nonvanishing tangent vector field. In contrast, \\(\\chi(S^{2n+1}) = 0\\), and odd spheres always have nonvanishing vector fields.</li>
            <li><strong>Spheres:</strong> \\(TS^n \\oplus \\varepsilon^1 \\cong \\varepsilon^{n+1}\\), so \\(p(TS^n) = 1\\). All Pontryagin classes of spheres vanish -- but \\(TS^2\\) is still non-trivial (the Euler class detects this).</li>
            <li><strong>Surfaces:</strong> \\(e(T\\Sigma_g) = (2-2g) \\cdot \\text{generator of } H^2(\\Sigma_g)\\). The torus (\\(g=1\\)) has \\(e = 0\\), consistent with having a global vector field.</li>
          </ul>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Gauss-Bonnet-Chern):</strong> For a closed oriented Riemannian \\(2n\\)-manifold \\(M\\),</p>
          \\[ \\chi(M) = \\int_M \\text{Pf}(\\Omega) \\]
          <p>where \\(\\text{Pf}(\\Omega)\\) is the Pfaffian of the curvature 2-form. This generalizes the classical Gauss-Bonnet theorem \\(\\int_M K \\, dA = 2\\pi\\chi(M)\\) and identifies the Euler class with a curvature integral.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Hirzebruch Signature Theorem):</strong> For a closed oriented \\(4k\\)-manifold \\(M\\), the <em>signature</em> \\(\\sigma(M)\\) (the signature of the intersection form on \\(H_{2k}(M; \\mathbb{Q})\\)) is given by</p>
          \\[ \\sigma(M) = \\langle L(p_1, p_2, \\ldots, p_k), [M] \\rangle \\]
          <p>where \\(L\\) is the <em>Hirzebruch L-polynomial</em> in the Pontryagin classes. For a 4-manifold: \\(\\sigma(M) = \\frac{1}{3}p_1[M]\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(\\mathbb{C}P^2\\)):</strong> \\(\\sigma(\\mathbb{C}P^2) = 1\\) (the intersection form is \\((1)\\)). By Hirzebruch: \\(1 = \\frac{1}{3}p_1[\\mathbb{C}P^2]\\), so \\(p_1[\\mathbb{C}P^2] = 3\\). Indeed, \\(p_1(T\\mathbb{C}P^2) = c_1^2 - 2c_2 = 9h^2 - 6h^2 = 3h^2\\), and \\(\\langle 3h^2, [\\mathbb{C}P^2] \\rangle = 3\\). \\(\\checkmark\\)</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Stiefel's Theorem on Vector Fields):</strong> The maximum number of linearly independent vector fields on \\(S^{n-1}\\) is related to the <em>Radon-Hurwitz number</em> \\(\\rho(n) - 1\\). Adams (1962) proved this using K-theory and Adams operations, which are intimately connected to characteristic classes.</p>
        </div>

        <div class="env-block remark">
          <p><strong>The Big Picture:</strong> Characteristic classes connect:</p>
          <ul>
            <li><strong>Topology \\(\\leftrightarrow\\) Geometry:</strong> The Gauss-Bonnet-Chern theorem relates the Euler class to curvature.</li>
            <li><strong>Topology \\(\\leftrightarrow\\) Analysis:</strong> The Atiyah-Singer index theorem expresses the index of an elliptic operator as a characteristic number.</li>
            <li><strong>Topology \\(\\leftrightarrow\\) Algebra:</strong> K-theory and the Chern character provide an algebraic framework for studying bundles.</li>
            <li><strong>Topology \\(\\leftrightarrow\\) Physics:</strong> Gauge theory uses Chern classes (instantons), Stiefel-Whitney classes (fermion anomalies), and Pontryagin classes (gravitational anomalies).</li>
          </ul>
        </div>
        <div class="viz-placeholder" data-viz="euler-class-vector-field"></div>
      `,
      visualizations: [
        {
          id: 'euler-class-vector-field',
          title: 'Euler Class and Vector Field Zeros',
          description: 'Visualize the connection between the Euler characteristic and zeros of vector fields on surfaces',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { surface: 'sphere', time: 0, showField: true, showZeros: true };

            function drawArrow(ctx2, x1, y1, x2, y2, color) {
              ctx2.strokeStyle = color;
              ctx2.lineWidth = 2.5;
              ctx2.beginPath();
              ctx2.moveTo(x1, y1);
              ctx2.lineTo(x2, y2);
              ctx2.stroke();
              var ang = Math.atan2(y2 - y1, x2 - x1);
              ctx2.fillStyle = color;
              ctx2.beginPath();
              ctx2.moveTo(x2, y2);
              ctx2.lineTo(x2 - 7 * Math.cos(ang - 0.4), y2 - 7 * Math.sin(ang - 0.4));
              ctx2.lineTo(x2 - 7 * Math.cos(ang + 0.4), y2 - 7 * Math.sin(ang + 0.4));
              ctx2.fill();
            }

            function draw() {
              var width = canvas.width;
              var height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              state.time += 0.02;
              var cx = width / 2;
              var cy = height / 2 - 10;
              var surface = state.surface;

              ctx.fillStyle = '#2c3e50';
              ctx.font = 'bold 18px serif';
              ctx.textAlign = 'center';

              var data = {
                sphere: { name: 'S\u00B2', euler: 2, zeros: 'source + sink (indices +1, +1)' },
                torus: { name: 'T\u00B2', euler: 0, zeros: 'no zeros needed' },
                genus2: { name: '\u03A3\u2082', euler: -2, zeros: 'saddles (total index = -2)' }
              };
              var d = data[surface];
              ctx.fillText('Vector Field on ' + d.name + ', \u03C7 = ' + d.euler, cx, 28);

              if (surface === 'sphere') {
                var R = Math.min(width, height) * 0.28;
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.arc(cx, cy, R, 0, 2 * Math.PI);
                ctx.stroke();

                var grad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
                grad.addColorStop(0, 'rgba(52, 152, 219, 0.1)');
                grad.addColorStop(1, 'rgba(52, 152, 219, 0.05)');
                ctx.fillStyle = grad;
                ctx.fill();

                if (state.showField) {
                  var nRows = 5, nCols = 10;
                  for (var i = 1; i < nRows; i++) {
                    var phi = Math.PI * i / nRows;
                    for (var j = 0; j < nCols; j++) {
                      var theta = 2 * Math.PI * j / nCols;
                      var px = cx + R * 0.88 * Math.sin(phi) * Math.cos(theta);
                      var py = cy - R * 0.88 * Math.cos(phi);

                      var distSq = (px - cx) * (px - cx) + (py - cy) * (py - cy);
                      if (distSq > R * R * 0.8) continue;

                      var speed = Math.sin(phi) * 15;
                      ctx.strokeStyle = 'rgba(231, 76, 60, 0.6)';
                      ctx.lineWidth = 1.5;
                      ctx.beginPath();
                      ctx.moveTo(px, py);
                      ctx.lineTo(px, py + speed);
                      ctx.stroke();

                      if (speed > 3) {
                        var angle = Math.PI / 2;
                        ctx.fillStyle = 'rgba(231, 76, 60, 0.6)';
                        ctx.beginPath();
                        ctx.moveTo(px, py + speed);
                        ctx.lineTo(px - 4 * Math.cos(angle - 0.5), py + speed - 4 * Math.sin(angle - 0.5));
                        ctx.lineTo(px - 4 * Math.cos(angle + 0.5), py + speed - 4 * Math.sin(angle + 0.5));
                        ctx.fill();
                      }
                    }
                  }
                }

                if (state.showZeros) {
                  ctx.fillStyle = '#f39c12';
                  ctx.beginPath();
                  ctx.arc(cx, cy - R * 0.88, 7, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.strokeStyle = '#e67e22';
                  ctx.lineWidth = 2;
                  ctx.stroke();

                  ctx.fillStyle = '#2c3e50';
                  ctx.font = '12px serif';
                  ctx.textAlign = 'left';
                  ctx.fillText('source (index +1)', cx + 12, cy - R * 0.88 + 4);

                  ctx.fillStyle = '#f39c12';
                  ctx.beginPath();
                  ctx.arc(cx, cy + R * 0.88, 7, 0, 2 * Math.PI);
                  ctx.fill();
                  ctx.strokeStyle = '#e67e22';
                  ctx.lineWidth = 2;
                  ctx.stroke();

                  ctx.fillStyle = '#2c3e50';
                  ctx.font = '12px serif';
                  ctx.textAlign = 'left';
                  ctx.fillText('sink (index +1)', cx + 12, cy + R * 0.88 + 4);
                }

              } else if (surface === 'torus') {
                var w = Math.min(width * 0.55, 260);
                var h = w * 0.6;
                var x0 = cx - w / 2;
                var y0 = cy - h / 2;

                ctx.fillStyle = 'rgba(46, 204, 113, 0.08)';
                ctx.fillRect(x0, y0, w, h);
                ctx.strokeStyle = '#27ae60';
                ctx.lineWidth = 2;
                ctx.strokeRect(x0, y0, w, h);

                drawArrow(ctx, x0 + w * 0.3, y0 + h + 8, x0 + w * 0.7, y0 + h + 8, '#e74c3c');
                ctx.fillStyle = '#e74c3c';
                ctx.font = '13px serif';
                ctx.textAlign = 'center';
                ctx.fillText('a', x0 + w * 0.5, y0 + h + 24);
                drawArrow(ctx, x0 + w * 0.3, y0 - 8, x0 + w * 0.7, y0 - 8, '#e74c3c');
                drawArrow(ctx, x0 - 8, y0 + h * 0.7, x0 - 8, y0 + h * 0.3, '#3498db');
                ctx.fillStyle = '#3498db';
                ctx.fillText('b', x0 - 22, y0 + h * 0.5 + 4);
                drawArrow(ctx, x0 + w + 8, y0 + h * 0.7, x0 + w + 8, y0 + h * 0.3, '#3498db');

                if (state.showField) {
                  var spacing = 30;
                  var arrowLen = 14;
                  var fAngle = Math.PI * 0.15;
                  for (var xi = x0 + 15; xi < x0 + w - 10; xi += spacing) {
                    for (var yi = y0 + 15; yi < y0 + h - 10; yi += spacing) {
                      ctx.strokeStyle = 'rgba(231, 76, 60, 0.5)';
                      ctx.lineWidth = 1.5;
                      ctx.beginPath();
                      ctx.moveTo(xi, yi);
                      ctx.lineTo(xi + arrowLen * Math.cos(fAngle), yi + arrowLen * Math.sin(fAngle));
                      ctx.stroke();

                      ctx.fillStyle = 'rgba(231, 76, 60, 0.5)';
                      ctx.beginPath();
                      var ex = xi + arrowLen * Math.cos(fAngle);
                      var ey = yi + arrowLen * Math.sin(fAngle);
                      ctx.moveTo(ex, ey);
                      ctx.lineTo(ex - 4 * Math.cos(fAngle - 0.5), ey - 4 * Math.sin(fAngle - 0.5));
                      ctx.lineTo(ex - 4 * Math.cos(fAngle + 0.5), ey - 4 * Math.sin(fAngle + 0.5));
                      ctx.fill();
                    }
                  }
                }

                ctx.fillStyle = '#27ae60';
                ctx.font = '13px serif';
                ctx.textAlign = 'center';
                ctx.fillText('Constant field is well-defined on T\u00B2 (compatible with identifications)', cx, y0 + h + 44);

              } else if (surface === 'genus2') {
                var R3 = Math.min(width, height) * 0.28;

                ctx.beginPath();
                for (var ii = 0; ii < 8; ii++) {
                  var a2 = (2 * Math.PI * ii) / 8 - Math.PI / 8;
                  var ppx = cx + R3 * Math.cos(a2);
                  var ppy = cy + R3 * Math.sin(a2);
                  if (ii === 0) ctx.moveTo(ppx, ppy);
                  else ctx.lineTo(ppx, ppy);
                }
                ctx.closePath();
                ctx.fillStyle = 'rgba(155, 89, 182, 0.08)';
                ctx.fill();
                ctx.strokeStyle = '#8e44ad';
                ctx.lineWidth = 2;
                ctx.stroke();

                var edgeLabels = ['a', 'b', 'a\u207B\u00B9', 'b\u207B\u00B9', 'c', 'd', 'c\u207B\u00B9', 'd\u207B\u00B9'];
                var edgeColors = ['#e74c3c', '#3498db', '#e74c3c', '#3498db', '#27ae60', '#f39c12', '#27ae60', '#f39c12'];
                for (var iii = 0; iii < 8; iii++) {
                  var a1 = (2 * Math.PI * iii) / 8 - Math.PI / 8;
                  var a22 = (2 * Math.PI * (iii + 1)) / 8 - Math.PI / 8;
                  var mx = cx + (R3 + 18) * Math.cos((a1 + a22) / 2);
                  var my = cy + (R3 + 18) * Math.sin((a1 + a22) / 2);
                  ctx.fillStyle = edgeColors[iii];
                  ctx.font = '12px serif';
                  ctx.textAlign = 'center';
                  ctx.fillText(edgeLabels[iii], mx, my + 4);
                }

                if (state.showField && state.showZeros) {
                  var zeros = [
                    { x: cx, y: cy - R3 * 0.4, type: 'source', index: '+1' },
                    { x: cx - R3 * 0.35, y: cy + R3 * 0.2, type: 'saddle', index: '-1' },
                    { x: cx + R3 * 0.35, y: cy + R3 * 0.2, type: 'saddle', index: '-1' },
                    { x: cx, y: cy + R3 * 0.5, type: 'saddle', index: '-1' }
                  ];

                  for (var zi = 0; zi < zeros.length; zi++) {
                    var z = zeros[zi];
                    ctx.fillStyle = z.type === 'source' ? '#f39c12' : '#9b59b6';
                    ctx.beginPath();
                    ctx.arc(z.x, z.y, 6, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.strokeStyle = z.type === 'source' ? '#e67e22' : '#7d3c98';
                    ctx.lineWidth = 1.5;
                    ctx.stroke();

                    ctx.fillStyle = '#2c3e50';
                    ctx.font = '11px serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('idx ' + z.index, z.x, z.y + 18);
                  }
                }
              }

              ctx.fillStyle = '#2c3e50';
              ctx.font = '14px serif';
              ctx.textAlign = 'center';
              ctx.fillText('e(T' + d.name + ') evaluated on [' + d.name + '] = \u03C7(' + d.name + ') = ' + d.euler, cx, height - 38);
              ctx.fillText('Zeros: ' + d.zeros, cx, height - 18);
            }

            // Select: Surface
            var surfaceSelect = document.createElement('select');
            surfaceSelect.style.background = '#161b22';
            surfaceSelect.style.color = '#c9d1d9';
            surfaceSelect.style.border = '1px solid #30363d';
            surfaceSelect.style.padding = '4px 8px';
            surfaceSelect.style.borderRadius = '4px';
            [{value:'sphere',label:'Sphere S\u00B2 (\u03C7=2)'},{value:'torus',label:'Torus T\u00B2 (\u03C7=0)'},{value:'genus2',label:'Genus-2 \u03A3\u2082 (\u03C7=-2)'}].forEach(function(opt) {
              var o = document.createElement('option');
              o.value = opt.value;
              o.textContent = opt.label;
              surfaceSelect.appendChild(o);
            });
            surfaceSelect.value = 'sphere';
            surfaceSelect.onchange = function() { state.surface = surfaceSelect.value; draw(); };
            controls.appendChild(surfaceSelect);

            // Button: Toggle Field
            var fieldBtn = document.createElement('button');
            fieldBtn.textContent = 'Toggle Field';
            fieldBtn.style.marginLeft = '10px';
            fieldBtn.style.padding = '4px 12px';
            fieldBtn.style.background = '#21262d';
            fieldBtn.style.color = '#c9d1d9';
            fieldBtn.style.border = '1px solid #30363d';
            fieldBtn.style.borderRadius = '4px';
            fieldBtn.style.cursor = 'pointer';
            fieldBtn.onclick = function() { state.showField = !state.showField; draw(); };
            controls.appendChild(fieldBtn);

            // Button: Toggle Zeros
            var zerosBtn = document.createElement('button');
            zerosBtn.textContent = 'Toggle Zeros';
            zerosBtn.style.marginLeft = '10px';
            zerosBtn.style.padding = '4px 12px';
            zerosBtn.style.background = '#21262d';
            zerosBtn.style.color = '#c9d1d9';
            zerosBtn.style.border = '1px solid #30363d';
            zerosBtn.style.borderRadius = '4px';
            zerosBtn.style.cursor = 'pointer';
            zerosBtn.onclick = function() { state.showZeros = !state.showZeros; draw(); };
            controls.appendChild(zerosBtn);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'pontryagin-ex1',
          question: 'Compute \\(p_1(T\\mathbb{C}P^2)\\) using the relation \\(p_1(E_{\\mathbb{R}}) = c_1(E)^2 - 2c_2(E)\\) and verify the Hirzebruch signature formula \\(\\sigma(\\mathbb{C}P^2) = \\frac{1}{3}p_1[\\mathbb{C}P^2]\\).',
          hint: 'For \\(T\\mathbb{C}P^2\\), we have \\(c_1 = 3h\\) and \\(c_2 = 3h^2\\). Use the formula \\(p_1 = c_1^2 - 2c_2\\).',
          solution: 'For \\(T\\mathbb{C}P^2\\) (a complex rank-2 bundle), \\(c(T\\mathbb{C}P^2) = (1+h)^3 = 1 + 3h + 3h^2\\), so \\(c_1 = 3h\\), \\(c_2 = 3h^2\\).\n\nUsing \\(p_1(E_{\\mathbb{R}}) = c_1(E)^2 - 2c_2(E)\\):\n\\[ p_1(T\\mathbb{C}P^2) = (3h)^2 - 2(3h^2) = 9h^2 - 6h^2 = 3h^2 \\]\n\nEvaluating on the fundamental class:\n\\[ \\langle p_1, [\\mathbb{C}P^2] \\rangle = \\langle 3h^2, [\\mathbb{C}P^2] \\rangle = 3 \\]\n\nsince \\(\\langle h^2, [\\mathbb{C}P^2] \\rangle = 1\\).\n\nHirzebruch signature formula: \\(\\sigma(\\mathbb{C}P^2) = \\frac{1}{3} p_1[\\mathbb{C}P^2] = \\frac{1}{3} \\cdot 3 = 1\\).\n\nIndeed, \\(\\sigma(\\mathbb{C}P^2) = 1\\) since the intersection form on \\(H_2(\\mathbb{C}P^2; \\mathbb{Z}) \\cong \\mathbb{Z}\\) is \\(Q = (1)\\), which has signature 1. \\(\\checkmark\\)'
        }
      ]
    }
  ]
});
