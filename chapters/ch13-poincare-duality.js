window.CHAPTERS.push({
  id: 'ch13',
  number: 13,
  title: 'Poincar\u00e9 Duality',
  subtitle: 'The Deep Symmetry of Manifolds',
  sections: [
    // ============================================================
    // Section 1: Orientation and the Fundamental Class
    // ============================================================
    {
      id: 'orientation-fundamental-class',
      title: 'Orientation and the Fundamental Class',
      content: `
        <div class="env-block intuition">
          <p><strong>The Central Idea:</strong> Poincar\u00e9 duality is the remarkable fact that on a closed oriented \\(n\\)-manifold, homology in degree \\(k\\) is isomorphic to cohomology in degree \\(n-k\\). Before stating this precisely, we need two prerequisites: <em>orientation</em> (a global coherence condition) and the <em>fundamental class</em> (the homological "identity" of the manifold).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Local Orientation):</strong> Let \\(M\\) be a connected \\(n\\)-manifold. For each \\(x \\in M\\), the local homology group</p>
          \\[ H_n(M, M \\setminus \\{x\\}; \\mathbb{Z}) \\cong \\mathbb{Z} \\]
          <p>A <em>local orientation at \\(x\\)</em> is a choice of generator \\(\\mu_x\\) of this group. There are exactly two choices: \\(\\mu_x\\) and \\(-\\mu_x\\).</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Orientation):</strong> An <em>orientation</em> of \\(M\\) is a function \\(x \\mapsto \\mu_x\\) assigning a local orientation at each point, such that these choices are <em>locally consistent</em>: for each \\(x \\in M\\), there exists a neighborhood \\(U \\ni x\\) homeomorphic to \\(\\mathbb{R}^n\\) and a class \\(\\mu_U \\in H_n(M, M \\setminus U)\\) restricting to \\(\\mu_y\\) for all \\(y \\in U\\).</p>
          <p>A manifold admitting an orientation is <em>orientable</em>.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Fundamental Class \u2014 Hatcher 3.26):</strong> Let \\(M\\) be a closed connected \\(n\\)-manifold.</p>
          <ul>
            <li>If \\(M\\) is orientable, then \\(H_n(M; \\mathbb{Z}) \\cong \\mathbb{Z}\\). An orientation determines a generator \\([M] \\in H_n(M; \\mathbb{Z})\\) called the <em>fundamental class</em>, characterized by the property that \\([M]\\) restricts to \\(\\mu_x\\) in \\(H_n(M, M \\setminus \\{x\\})\\) for every \\(x\\).</li>
            <li>If \\(M\\) is not orientable, then \\(H_n(M; \\mathbb{Z}) = 0\\), but \\(H_n(M; \\mathbb{Z}/2) \\cong \\mathbb{Z}/2\\), so a \\(\\mathbb{Z}/2\\)-fundamental class always exists.</li>
          </ul>
        </div>

        <div class="env-block proof">
          <p><strong>Proof idea:</strong> Consider the <em>orientation double cover</em> \\(\\widetilde{M} \\to M\\). If \\(M\\) is orientable, \\(\\widetilde{M}\\) is disconnected (two copies of \\(M\\)), and the fundamental class on each copy descends to \\(M\\). If \\(M\\) is non-orientable, the two local orientations swap as we traverse a loop reversing orientation, preventing a global \\(\\mathbb{Z}\\)-class. Over \\(\\mathbb{Z}/2\\), signs don't matter, so a fundamental class exists for all closed manifolds. \\(\\square\\)</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Characterization of Orientability):</strong> For a closed connected \\(n\\)-manifold \\(M\\), the following are equivalent:</p>
          <ol>
            <li>\\(M\\) is orientable</li>
            <li>\\(H_n(M; \\mathbb{Z}) \\cong \\mathbb{Z}\\)</li>
            <li>The orientation double cover \\(\\widetilde{M} \\to M\\) is disconnected (i.e., trivial)</li>
            <li>Every loop in \\(M\\) preserves local orientation</li>
          </ol>
        </div>

        <div class="env-block example">
          <p><strong>Example (Surfaces):</strong></p>
          <ul>
            <li>\\(S^2\\): \\(H_2(S^2) = \\mathbb{Z}\\), \\([S^2]\\) = the CW 2-cell with standard orientation.</li>
            <li>\\(\\Sigma_g\\) (genus-\\(g\\) surface): \\(H_2(\\Sigma_g) = \\mathbb{Z}\\), \\([\\Sigma_g]\\) exists.</li>
            <li>\\(\\mathbb{R}P^2\\): Non-orientable, \\(H_2(\\mathbb{R}P^2; \\mathbb{Z}) = 0\\). But \\(H_2(\\mathbb{R}P^2; \\mathbb{Z}/2) = \\mathbb{Z}/2\\).</li>
            <li>Klein bottle \\(K\\): Non-orientable, \\(H_2(K; \\mathbb{Z}) = 0\\).</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>Example (Higher-dimensional):</strong></p>
          <ul>
            <li>\\(\\mathbb{C}P^n\\): Always orientable (complex manifolds are), \\(H_{2n}(\\mathbb{C}P^n) = \\mathbb{Z}\\).</li>
            <li>\\(S^n\\): Orientable for all \\(n\\), \\([S^n]\\) generates \\(H_n(S^n) = \\mathbb{Z}\\).</li>
            <li>\\(\\mathbb{R}P^n\\): Orientable iff \\(n\\) is odd. So \\(\\mathbb{R}P^3\\) is orientable but \\(\\mathbb{R}P^4\\) is not.</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>Example (Klein Bottle CW computation):</strong> The Klein bottle \\(K\\) has CW structure with one 0-cell, two 1-cells \\(a, b\\), and one 2-cell with attaching map \\(aba^{-1}b\\). The boundary map gives \\(\\partial(e^2) = 2b \\neq 0\\), so \\(H_2(K; \\mathbb{Z}) = 0\\). No fundamental class exists over \\(\\mathbb{Z}\\), but \\(H_2(K; \\mathbb{Z}/2) = \\mathbb{Z}/2\\).</p>
        </div>

        <div class="env-block remark">
          <p><strong>Relative Fundamental Class:</strong> For a compact orientable \\(n\\)-manifold \\(M\\) with boundary \\(\\partial M\\), the fundamental class lives in <em>relative</em> homology: \\([M, \\partial M] \\in H_n(M, \\partial M; \\mathbb{Z})\\).</p>
        </div>

        <div class="viz-placeholder" data-viz="orientation-visualizer"></div>
        <div class="viz-placeholder" data-viz="local-orientation-explorer"></div>
      `,
      visualizations: [
        {
          id: 'orientation-visualizer',
          title: 'Orientation Visualizer',
          description: 'See consistent normal vectors on oriented manifolds vs. contradictions on non-orientable ones',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { manifold: 'sphere', showNormals: true, animationAngle: 0, numVectors: 16 };

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var cx = width / 2, cy = height / 2 + 10;
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px serif';
              var titles = { sphere: 'S\u00B2: Outward Orientation', torus: 'T\u00B2: Consistent Orientation', mobius: 'M\u00f6bius Band: NON-Orientable' };
              ctx.fillText(titles[state.manifold], 20, 30);
              state.animationAngle += 0.012;
              var t = state.animationAngle;

              if (state.manifold === 'sphere') {
                var R = Math.min(width, height) * 0.22;
                var grad = ctx.createRadialGradient(cx - R*0.3, cy - R*0.3, R*0.1, cx, cy, R);
                grad.addColorStop(0, 'rgba(52,152,219,0.35)'); grad.addColorStop(1, 'rgba(52,152,219,0.1)');
                ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.fill();
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.stroke();
                ctx.strokeStyle = 'rgba(52,152,219,0.4)'; ctx.lineWidth = 1; ctx.setLineDash([4,4]);
                ctx.beginPath(); ctx.ellipse(cx, cy, R, R*0.25, 0, 0, Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
                if (state.showNormals) {
                  var N = state.numVectors;
                  for (var i = 0; i < N; i++) {
                    var angle = (i/N)*Math.PI*2 + t*0.3;
                    var px = cx + R*Math.cos(angle), py = cy + R*Math.sin(angle);
                    var nx = Math.cos(angle), ny = Math.sin(angle), len = 32;
                    ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px+nx*len, py+ny*len); ctx.stroke();
                    var a = Math.atan2(ny, nx);
                    ctx.fillStyle = '#e74c3c'; ctx.beginPath();
                    ctx.moveTo(px+nx*len, py+ny*len);
                    ctx.lineTo(px+nx*len - 9*Math.cos(a-0.35), py+ny*len - 9*Math.sin(a-0.35));
                    ctx.lineTo(px+nx*len - 9*Math.cos(a+0.35), py+ny*len - 9*Math.sin(a+0.35));
                    ctx.closePath(); ctx.fill();
                  }
                }
                ctx.fillStyle = '#27ae60'; ctx.font = 'bold 16px serif'; ctx.fillText('All normals point consistently outward', 20, height - 45);
                ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif'; ctx.fillText('[S\u00B2] \u2208 H\u2082(S\u00B2) = \u2124 exists', 20, height - 22);
              } else if (state.manifold === 'torus') {
                var majorR = Math.min(width, height)*0.24, minorR = majorR*0.38;
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(cx, cy, majorR+minorR, 0, Math.PI*2); ctx.stroke();
                ctx.beginPath(); ctx.arc(cx, cy, majorR-minorR, 0, Math.PI*2); ctx.stroke();
                ctx.fillStyle = 'rgba(52,152,219,0.12)';
                ctx.beginPath(); ctx.arc(cx, cy, majorR+minorR, 0, Math.PI*2);
                ctx.arc(cx, cy, majorR-minorR, Math.PI*2, 0, true); ctx.closePath(); ctx.fill();
                if (state.showNormals) {
                  for (var i = 0; i < 10; i++) {
                    var angle = (i/10)*Math.PI*2, r = majorR+minorR;
                    var px = cx+r*Math.cos(angle), py = cy+r*Math.sin(angle);
                    var nx = Math.cos(angle), ny = Math.sin(angle), len = 28;
                    ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px+nx*len, py+ny*len); ctx.stroke();
                    var a = Math.atan2(ny, nx);
                    ctx.fillStyle = '#e74c3c'; ctx.beginPath();
                    ctx.moveTo(px+nx*len, py+ny*len);
                    ctx.lineTo(px+nx*len-8*Math.cos(a-0.35), py+ny*len-8*Math.sin(a-0.35));
                    ctx.lineTo(px+nx*len-8*Math.cos(a+0.35), py+ny*len-8*Math.sin(a+0.35));
                    ctx.closePath(); ctx.fill();
                  }
                }
                ctx.fillStyle = '#27ae60'; ctx.font = 'bold 16px serif'; ctx.fillText('T\u00B2 is orientable: normals point outward everywhere', 20, height - 45);
                ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif'; ctx.fillText('[T\u00B2] \u2208 H\u2082(T\u00B2) = \u2124 exists', 20, height - 22);
              } else if (state.manifold === 'mobius') {
                var w = Math.min(width*0.6, 300), h = 70, x0 = cx - w/2;
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(x0, cy-h/2); ctx.bezierCurveTo(x0+w*0.33, cy-h/2-25, x0+w*0.67, cy-h/2+25, x0+w, cy+h/2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x0, cy+h/2); ctx.bezierCurveTo(x0+w*0.33, cy+h/2+25, x0+w*0.67, cy+h/2-25, x0+w, cy-h/2); ctx.stroke();
                ctx.strokeStyle = '#9b59b6'; ctx.lineWidth = 2; ctx.setLineDash([4,4]);
                ctx.beginPath(); ctx.arc(cx, cy, 35, 0, Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
                ctx.fillStyle = '#9b59b6'; ctx.font = 'bold 15px serif'; ctx.fillText('twist', cx-18, cy-42);
                if (state.showNormals) {
                  for (var i = 0; i <= 8; i++) {
                    var frac = i/8, px = x0+frac*w, py = cy+12*Math.sin(Math.PI*frac);
                    var sign = frac < 0.5 ? 1 : -1, len = 30*sign, isEnd = (i===0||i===8);
                    ctx.strokeStyle = isEnd ? '#9b59b6' : '#e74c3c'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py-len); ctx.stroke();
                    ctx.fillStyle = isEnd ? '#9b59b6' : '#e74c3c'; ctx.beginPath();
                    ctx.moveTo(px, py-len); ctx.lineTo(px-5, py-len+sign*8); ctx.lineTo(px+5, py-len+sign*8); ctx.closePath(); ctx.fill();
                  }
                }
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(x0, cy, 18, 0, Math.PI*2); ctx.stroke();
                ctx.beginPath(); ctx.arc(x0+w, cy, 18, 0, Math.PI*2); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.font = '13px serif';
                ctx.fillText('\u2191', x0-4, cy-25); ctx.fillText('\u2193', x0+w-4, cy-25);
                ctx.fillText('Opposite!', cx-30, cy+h/2+40);
                ctx.fillStyle = '#e74c3c'; ctx.font = 'bold 16px serif'; ctx.fillText('Normal flips after going around the twist!', 20, height - 45);
                ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif'; ctx.fillText('No fundamental class over \u2124', 20, height - 22);
              }
            }

            var mfSelect = document.createElement('select');
            mfSelect.style.background = '#161b22'; mfSelect.style.color = '#c9d1d9'; mfSelect.style.border = '1px solid #30363d'; mfSelect.style.padding = '4px 8px'; mfSelect.style.borderRadius = '4px';
            [{value:'sphere',label:'Sphere S\u00B2'},{value:'torus',label:'Torus T\u00B2'},{value:'mobius',label:'M\u00f6bius Band'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; mfSelect.appendChild(o);
            });
            mfSelect.value = 'sphere'; mfSelect.onchange = function() { state.manifold = mfSelect.value; draw(); }; controls.appendChild(mfSelect);
            var normBtn = document.createElement('button'); normBtn.textContent = 'Toggle Normals';
            normBtn.style.marginLeft = '15px'; normBtn.style.padding = '4px 12px'; normBtn.style.background = '#238636'; normBtn.style.color = '#fff'; normBtn.style.border = 'none'; normBtn.style.borderRadius = '4px'; normBtn.style.cursor = 'pointer';
            normBtn.onclick = function() { state.showNormals = !state.showNormals; draw(); }; controls.appendChild(normBtn);
            draw();
          }
        },
        {
          id: 'local-orientation-explorer',
          title: 'Local Orientation Explorer',
          description: 'Explore local orientations and consistency around loops',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { surface: 'cylinder', pathProgress: 0, animating: false, showLocalFrames: true };

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var cx = width/2, cy = height/2, surface = state.surface;
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px serif';
              var labels = { 'cylinder': 'Cylinder (Orientable)', 'mobius': 'M\u00f6bius Band (Non-Orientable)', 'torus': 'Torus T\u00B2 (Orientable)' };
              ctx.fillText(labels[surface], 20, 30);

              if (surface === 'cylinder' || surface === 'mobius') {
                var stripW = width*0.6, stripH = 80, x0 = cx-stripW/2, y0 = cy-stripH/2;
                ctx.fillStyle = 'rgba(52,152,219,0.15)'; ctx.fillRect(x0, y0, stripW, stripH);
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, stripW, stripH);
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(x0, y0+stripH*0.75); ctx.lineTo(x0, y0+stripH*0.25); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.moveTo(x0, y0+stripH*0.25); ctx.lineTo(x0-6, y0+stripH*0.25+10); ctx.lineTo(x0+6, y0+stripH*0.25+10); ctx.fill();
                var rightDir = surface === 'cylinder' ? -1 : 1;
                ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 3;
                var startY = rightDir===-1 ? y0+stripH*0.75 : y0+stripH*0.25;
                var endY = rightDir===-1 ? y0+stripH*0.25 : y0+stripH*0.75;
                ctx.beginPath(); ctx.moveTo(x0+stripW, startY); ctx.lineTo(x0+stripW, endY); ctx.stroke();
                ctx.fillStyle = '#27ae60'; ctx.beginPath(); ctx.moveTo(x0+stripW, endY); ctx.lineTo(x0+stripW-6, endY-rightDir*10); ctx.lineTo(x0+stripW+6, endY-rightDir*10); ctx.fill();
                if (state.showLocalFrames) {
                  for (var i = 0; i <= 8; i++) {
                    var t = i/8, fx = x0+t*stripW, fy = y0+stripH/2;
                    var normalDir = surface === 'mobius' ? Math.cos(Math.PI*t) : 1;
                    var arrowLen = 25;
                    ctx.strokeStyle = normalDir > 0 ? '#e74c3c' : '#9b59b6'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy-normalDir*arrowLen); ctx.stroke();
                    ctx.fillStyle = normalDir > 0 ? '#e74c3c' : '#9b59b6'; ctx.beginPath();
                    ctx.moveTo(fx, fy-normalDir*arrowLen); ctx.lineTo(fx-4, fy-normalDir*(arrowLen-8)); ctx.lineTo(fx+4, fy-normalDir*(arrowLen-8)); ctx.fill();
                    ctx.fillStyle = '#2c3e50'; ctx.beginPath(); ctx.arc(fx, fy, 3, 0, Math.PI*2); ctx.fill();
                  }
                }
                if (state.animating) {
                  state.pathProgress += 0.005;
                  if (state.pathProgress > 1) { state.pathProgress = 0; state.animating = false; }
                  ctx.fillStyle = '#f39c12'; ctx.beginPath(); ctx.arc(x0+state.pathProgress*stripW, y0+stripH/2, 8, 0, Math.PI*2); ctx.fill();
                }
                ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif';
                if (surface === 'cylinder') {
                  ctx.fillText('Edges identified SAME direction -> orientable', 20, height-60);
                  ctx.fillText('Normal vectors stay consistent around the loop', 20, height-40);
                  ctx.fillText('Fundamental class [M] exists over Z', 20, height-20);
                } else {
                  ctx.fillText('Edges identified OPPOSITE direction -> twist!', 20, height-60);
                  ctx.fillText('Normal flips after traversing: CONTRADICTION', 20, height-40);
                  ctx.fillText('No Z-fundamental class; only Z/2 class exists', 20, height-20);
                }
              } else if (surface === 'torus') {
                var size = Math.min(width,height)*0.35, x0 = cx-size/2, y0 = cy-size/2-10;
                ctx.fillStyle = 'rgba(46,204,113,0.15)'; ctx.fillRect(x0, y0, size, size);
                ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, size, size);
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(x0+size*0.3, y0+size+10); ctx.lineTo(x0+size*0.7, y0+size+10); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.moveTo(x0+size*0.7, y0+size+10); ctx.lineTo(x0+size*0.7-8, y0+size+5); ctx.lineTo(x0+size*0.7-8, y0+size+15); ctx.fill();
                ctx.font = '14px serif'; ctx.fillText('a', x0+size*0.5-4, y0+size+28);
                ctx.strokeStyle = '#e74c3c'; ctx.beginPath(); ctx.moveTo(x0+size*0.3, y0-10); ctx.lineTo(x0+size*0.7, y0-10); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.moveTo(x0+size*0.7, y0-10); ctx.lineTo(x0+size*0.7-8, y0-15); ctx.lineTo(x0+size*0.7-8, y0-5); ctx.fill();
                ctx.fillText('a', x0+size*0.5-4, y0-18);
                ctx.strokeStyle = '#3498db'; ctx.beginPath(); ctx.moveTo(x0-10, y0+size*0.7); ctx.lineTo(x0-10, y0+size*0.3); ctx.stroke();
                ctx.fillStyle = '#3498db'; ctx.beginPath(); ctx.moveTo(x0-10, y0+size*0.3); ctx.lineTo(x0-15, y0+size*0.3+8); ctx.lineTo(x0-5, y0+size*0.3+8); ctx.fill();
                ctx.fillText('b', x0-25, y0+size*0.5+4);
                ctx.strokeStyle = '#3498db'; ctx.beginPath(); ctx.moveTo(x0+size+10, y0+size*0.7); ctx.lineTo(x0+size+10, y0+size*0.3); ctx.stroke();
                ctx.fillStyle = '#3498db'; ctx.beginPath(); ctx.moveTo(x0+size+10, y0+size*0.3); ctx.lineTo(x0+size+5, y0+size*0.3+8); ctx.lineTo(x0+size+15, y0+size*0.3+8); ctx.fill();
                ctx.fillText('b', x0+size+18, y0+size*0.5+4);
                if (state.showLocalFrames) {
                  for (var i = 1; i <= 3; i++) for (var j = 1; j <= 3; j++) {
                    var fx = x0+(i/4)*size, fy = y0+(j/4)*size;
                    ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 2;
                    ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy-18); ctx.stroke();
                    ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.moveTo(fx, fy-18); ctx.lineTo(fx-3, fy-12); ctx.lineTo(fx+3, fy-12); ctx.fill();
                  }
                }
                ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif';
                ctx.fillText('Both pairs identified same direction -> orientable', 20, height-40);
                ctx.fillText('[T\u00B2] generates H\u2082(T\u00B2; Z) = Z', 20, height-20);
              }
            }

            var surfSelect = document.createElement('select');
            surfSelect.style.background = '#161b22'; surfSelect.style.color = '#c9d1d9'; surfSelect.style.border = '1px solid #30363d'; surfSelect.style.padding = '4px 8px'; surfSelect.style.borderRadius = '4px';
            [{value:'cylinder',label:'Cylinder (orientable)'},{value:'mobius',label:'M\u00f6bius Band (non-orientable)'},{value:'torus',label:'Torus T\u00B2 (orientable)'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; surfSelect.appendChild(o);
            });
            surfSelect.value = 'cylinder'; surfSelect.onchange = function() { state.surface = surfSelect.value; state.pathProgress = 0; state.animating = false; draw(); }; controls.appendChild(surfSelect);
            var animBtn = document.createElement('button'); animBtn.textContent = 'Animate Path';
            animBtn.style.marginLeft = '15px'; animBtn.style.padding = '4px 12px'; animBtn.style.background = '#238636'; animBtn.style.color = '#fff'; animBtn.style.border = 'none'; animBtn.style.borderRadius = '4px'; animBtn.style.cursor = 'pointer';
            animBtn.onclick = function() { state.animating = true; state.pathProgress = 0; draw(); }; controls.appendChild(animBtn);
            var frameBtn = document.createElement('button'); frameBtn.textContent = 'Toggle Frames';
            frameBtn.style.marginLeft = '8px'; frameBtn.style.padding = '4px 12px'; frameBtn.style.background = '#238636'; frameBtn.style.color = '#fff'; frameBtn.style.border = 'none'; frameBtn.style.borderRadius = '4px'; frameBtn.style.cursor = 'pointer';
            frameBtn.onclick = function() { state.showLocalFrames = !state.showLocalFrames; draw(); }; controls.appendChild(frameBtn);
            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'orientation-rpn',
          question: 'Prove that \\(\\mathbb{R}P^n\\) is orientable if and only if \\(n\\) is odd. (Hint: The antipodal map \\(a: S^n \\to S^n\\) has degree \\((-1)^{n+1}\\).)',
          hint: 'The orientation double cover of \\(\\mathbb{R}P^n\\) is \\(S^n\\). An orientation requires the deck transformation (antipodal map) to preserve orientation.',
          solution: `The orientation double cover of \\(\\mathbb{R}P^n\\) is \\(S^n \\to \\mathbb{R}P^n\\) with deck transformation the antipodal map \\(a(x) = -x\\).

The antipodal map has degree \\((-1)^{n+1}\\) (composition of \\(n+1\\) reflections).

For \\(\\mathbb{R}P^n\\) to be orientable, \\(\\deg(a) = +1\\):
\\[ (-1)^{n+1} = +1 \\iff n \\text{ is odd.} \\]

So \\(\\mathbb{R}P^1 \\cong S^1\\) and \\(\\mathbb{R}P^3\\) are orientable, while \\(\\mathbb{R}P^2\\) and \\(\\mathbb{R}P^4\\) are not.`
        },
        {
          id: 'orientation-klein',
          question: 'Show that the Klein bottle \\(K\\) is non-orientable by computing \\(H_2(K; \\mathbb{Z})\\) from its CW structure.',
          hint: 'CW structure: one 0-cell, two 1-cells \\(a, b\\), one 2-cell with attaching map \\(aba^{-1}b\\). Compute \\(\\partial_2\\).',
          solution: `CW structure: one 0-cell \\(v\\), two 1-cells \\(a, b\\), one 2-cell \\(e\\) with attaching map \\(aba^{-1}b\\).

\\(\\partial_2(e) = a + b - a + b = 2b \\neq 0\\), so \\(\\ker(\\partial_2) = 0\\).

Therefore \\(H_2(K; \\mathbb{Z}) = 0 \\neq \\mathbb{Z}\\), confirming non-orientability. \\(\\square\\)`
        }
      ]
    },

    // ============================================================
    // Section 2: The Cap Product
    // ============================================================
    {
      id: 'cap-product',
      title: 'The Cap Product',
      content: `
        <div class="env-block intuition">
          <p><strong>Motivation:</strong> The cup product gives cohomology a ring structure. The <em>cap product</em> is the companion operation that pairs cohomology with homology, producing a homology class of lower degree. It is the key mechanism behind Poincar\u00e9 duality: capping with the fundamental class \\([M]\\) gives the duality isomorphism.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Cap Product):</strong> The <em>cap product</em> is a bilinear map</p>
          \\[ \\frown : H_n(X; R) \\times H^k(X; R) \\to H_{n-k}(X; R) \\]
          <p>defined at the chain level: for a singular \\(n\\)-simplex \\(\\sigma: \\Delta^n \\to X\\) and a cochain \\(\\varphi \\in C^k(X; R)\\):</p>
          \\[ \\sigma \\frown \\varphi = \\varphi(\\sigma|_{[v_0, \\ldots, v_k]}) \\cdot \\sigma|_{[v_k, \\ldots, v_n]} \\]
          <p>Evaluate \\(\\varphi\\) on the <em>front \\(k\\)-face</em>, then take the <em>back \\((n-k)\\)-face</em> weighted by that evaluation.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Theorem (Cap Product Properties):</strong></p>
          <ol>
            <li><strong>Well-defined:</strong> \\(\\partial(\\sigma \\frown \\varphi) = (-1)^k(\\partial\\sigma \\frown \\varphi - \\sigma \\frown \\delta\\varphi)\\), so the cap product descends to \\(H_n \\times H^k \\to H_{n-k}\\).</li>
            <li><strong>Associativity:</strong> \\((\\varphi \\cup \\psi) \\frown \\sigma = \\varphi \\frown (\\psi \\frown \\sigma)\\)</li>
            <li><strong>Unit:</strong> \\(1 \\frown \\sigma = \\sigma\\) where \\(1 \\in H^0\\)</li>
            <li><strong>Cup-Cap Adjunction:</strong> \\(\\langle \\alpha \\cup \\beta, \\sigma \\rangle = \\langle \\alpha, \\sigma \\frown \\beta \\rangle\\)</li>
            <li><strong>Naturality:</strong> \\(f_*(\\sigma \\frown f^*\\varphi) = f_*(\\sigma) \\frown \\varphi\\)</li>
          </ol>
        </div>

        <div class="env-block proof">
          <p><strong>Proof of adjunction (4):</strong> On the chain level, for an \\(n\\)-simplex \\(\\sigma\\):</p>
          \\[ \\langle \\alpha \\cup \\beta, \\sigma \\rangle = \\alpha(\\sigma|_{\\text{front}}) \\cdot \\beta(\\sigma|_{\\text{back}}) \\]
          \\[ \\langle \\alpha, \\sigma \\frown \\beta \\rangle = \\beta(\\sigma|_{\\text{front}}) \\cdot \\alpha(\\sigma|_{\\text{back}}) \\]
          <p>These agree after tracking front/back face conventions. \\(\\square\\)</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(S^2\\)):</strong> Let \\(\\mu \\in H^2(S^2) \\cong \\mathbb{Z}\\). Then \\([S^2] \\frown \\mu = \\mu([S^2]) \\cdot [\\text{pt}] = 1 \\cdot [\\text{pt}] \\in H_0(S^2)\\). The duality map sends \\(H^2 \\to H_0\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(T^2\\)):</strong> Let \\(\\alpha, \\beta \\in H^1(T^2)\\) be dual to the meridian and longitude.</p>
          <ul>
            <li>\\([T^2] \\frown \\alpha\\) = (up to sign) the longitude cycle in \\(H_1\\)</li>
            <li>\\([T^2] \\frown \\beta\\) = (up to sign) the meridian cycle in \\(H_1\\)</li>
            <li>\\([T^2] \\frown (\\alpha \\cup \\beta) = \\pm [\\text{pt}] \\in H_0\\)</li>
          </ul>
        </div>

        <div class="env-block remark">
          <p><strong>Cap vs Cup:</strong> The cup product \\(\\cup: H^p \\otimes H^q \\to H^{p+q}\\) multiplies cochains. The cap product \\(\\frown: H_n \\otimes H^k \\to H_{n-k}\\) "divides" a chain by a cochain. Together, they form the algebraic backbone of duality.</p>
        </div>

        <div class="viz-placeholder" data-viz="cap-product-machine"></div>
        <div class="viz-placeholder" data-viz="cap-cup-adjunction"></div>
      `,
      visualizations: [
        {
          id: 'cap-product-machine',
          title: 'Cap Product Machine',
          description: 'Visualize how capping splits a simplex into evaluation and residual parts',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { n: 3, k: 1, step: 0 };
            var subs = ['\u2080','\u2081','\u2082','\u2083','\u2084','\u2085'];

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var n = state.n, k = state.k, step = state.step;
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px serif';
              ctx.fillText('Cap Product: \u03C3 \u2322 \u03C6', 20, 30);
              ctx.font = '16px serif';
              ctx.fillText('\u03C3 \u2208 C_' + n + '(X),  \u03C6 \u2208 C^' + k + '(X),  result \u2208 C_' + (n-k) + '(X)', 20, 55);

              var cx = width/2, baseY = height/2+20;
              var spacing = Math.min(80, (width-100)/n), startX = cx-(n*spacing)/2;
              var vertices = [];
              for (var i = 0; i <= n; i++) vertices.push({ x: startX+i*spacing, y: baseY+(i%2===0?-30:30) });
              ctx.strokeStyle = '#bdc3c7'; ctx.lineWidth = 1;
              for (var i = 0; i <= n; i++) for (var j = i+1; j <= n; j++) { ctx.beginPath(); ctx.moveTo(vertices[i].x, vertices[i].y); ctx.lineTo(vertices[j].x, vertices[j].y); ctx.stroke(); }

              if (step >= 1) {
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 3;
                for (var i = 0; i <= k; i++) for (var j = i+1; j <= k; j++) { ctx.beginPath(); ctx.moveTo(vertices[i].x, vertices[i].y); ctx.lineTo(vertices[j].x, vertices[j].y); ctx.stroke(); }
                ctx.fillStyle = '#e74c3c'; ctx.font = '14px serif';
                ctx.fillText('Front ' + k + '-face: [v' + subs[0] + ',...,v' + subs[k] + ']  \u2190 \u03C6 evaluates here', 20, height-90);
              }
              if (step >= 2) {
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 3;
                for (var i = k; i <= n; i++) for (var j = i+1; j <= n; j++) { ctx.beginPath(); ctx.moveTo(vertices[i].x, vertices[i].y); ctx.lineTo(vertices[j].x, vertices[j].y); ctx.stroke(); }
                ctx.fillStyle = '#3498db'; ctx.font = '14px serif';
                ctx.fillText('Back ' + (n-k) + '-face: [v' + subs[k] + ',...,v' + subs[n] + ']  \u2190 resulting chain', 20, height-65);
              }
              if (step >= 3) { ctx.fillStyle = '#27ae60'; ctx.font = 'bold 16px serif'; ctx.fillText('Result: \u03C6(front) \u00b7 back_face  \u2208  C_' + (n-k) + '(X)', 20, height-35); }

              for (var i = 0; i <= n; i++) {
                var color = '#95a5a6';
                if (step >= 1 && i <= k) color = '#e74c3c';
                if (step >= 2 && i >= k) color = i <= k ? '#9b59b6' : '#3498db';
                ctx.fillStyle = color; ctx.beginPath(); ctx.arc(vertices[i].x, vertices[i].y, 12, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = '#fff'; ctx.font = 'bold 13px serif'; ctx.fillText('v' + subs[i], vertices[i].x-7, vertices[i].y+4);
              }
            }

            var nLabel = document.createElement('label'); nLabel.style.color = '#c9d1d9'; nLabel.style.marginRight = '8px'; nLabel.textContent = 'Simplex dim n: 3'; controls.appendChild(nLabel);
            var nSlider = document.createElement('input'); nSlider.type = 'range'; nSlider.min = 2; nSlider.max = 5; nSlider.step = 1; nSlider.value = 3; nSlider.style.width = '100px';
            nSlider.oninput = function() { state.n = parseInt(nSlider.value); if (state.k >= state.n) state.k = state.n-1; nLabel.textContent = 'Simplex dim n: ' + nSlider.value; draw(); }; controls.appendChild(nSlider);
            var kLabel = document.createElement('label'); kLabel.style.color = '#c9d1d9'; kLabel.style.marginLeft = '15px'; kLabel.style.marginRight = '8px'; kLabel.textContent = 'Cochain deg k: 1'; controls.appendChild(kLabel);
            var kSlider = document.createElement('input'); kSlider.type = 'range'; kSlider.min = 1; kSlider.max = 4; kSlider.step = 1; kSlider.value = 1; kSlider.style.width = '100px';
            kSlider.oninput = function() { var v = parseInt(kSlider.value); if (v < state.n) state.k = v; kLabel.textContent = 'Cochain deg k: ' + state.k; draw(); }; controls.appendChild(kSlider);
            var sLabel = document.createElement('label'); sLabel.style.color = '#c9d1d9'; sLabel.style.marginLeft = '15px'; sLabel.style.marginRight = '8px'; sLabel.textContent = 'Step: 0'; controls.appendChild(sLabel);
            var sSlider = document.createElement('input'); sSlider.type = 'range'; sSlider.min = 0; sSlider.max = 3; sSlider.step = 1; sSlider.value = 0; sSlider.style.width = '100px';
            sSlider.oninput = function() { state.step = parseInt(sSlider.value); sLabel.textContent = 'Step: ' + sSlider.value; draw(); }; controls.appendChild(sSlider);
            draw();
          }
        },
        {
          id: 'cap-cup-adjunction',
          title: 'Cap-Cup Adjunction',
          description: 'See the adjunction: <alpha cup beta, sigma> = <alpha, sigma cap beta>',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { showCup: true, showCap: true };

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px serif'; ctx.fillText('Cap-Cup Adjunction Identity', 20, 30);
              ctx.font = '16px serif'; ctx.fillText('\u27E8 \u03B1 \u222A \u03B2, \u03C3 \u27E9  =  \u27E8 \u03B1, \u03C3 \u2322 \u03B2 \u27E9', 20, 65);
              var cy = height/2;
              if (state.showCup) {
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 2;
                ctx.fillStyle = 'rgba(231,76,60,0.2)'; ctx.fillRect(40, cy-80, 80, 40); ctx.strokeRect(40, cy-80, 80, 40);
                ctx.fillStyle = '#e74c3c'; ctx.font = '15px serif'; ctx.fillText('\u03B1 (H^p)', 45, cy-55);
                ctx.fillStyle = 'rgba(231,76,60,0.2)'; ctx.fillRect(40, cy-30, 80, 40); ctx.strokeRect(40, cy-30, 80, 40);
                ctx.fillStyle = '#e74c3c'; ctx.fillText('\u03B2 (H^q)', 48, cy-5);
                ctx.beginPath(); ctx.moveTo(80, cy+10); ctx.lineTo(80, cy+40); ctx.stroke();
                ctx.font = '13px serif'; ctx.fillText('\u222A', 90, cy+30);
                ctx.fillStyle = 'rgba(231,76,60,0.3)'; ctx.fillRect(30, cy+40, 100, 40);
                ctx.strokeStyle = '#e74c3c'; ctx.strokeRect(30, cy+40, 100, 40);
                ctx.fillStyle = '#e74c3c'; ctx.font = '14px serif'; ctx.fillText('\u03B1\u222A\u03B2 (H^n)', 35, cy+65);
                ctx.fillStyle = 'rgba(52,152,219,0.2)'; ctx.fillRect(40, cy+100, 80, 40);
                ctx.strokeStyle = '#3498db'; ctx.strokeRect(40, cy+100, 80, 40);
                ctx.fillStyle = '#3498db'; ctx.font = '15px serif'; ctx.fillText('\u03C3 (H_n)', 45, cy+125);
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px serif'; ctx.fillText('\u27E8,\u27E9 \u2192 \u2124', width/2-25, cy+75);
              }
              if (state.showCap) {
                var rx = width/2+40;
                ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 2;
                ctx.fillStyle = 'rgba(46,204,113,0.2)'; ctx.fillRect(rx, cy-80, 90, 40); ctx.strokeRect(rx, cy-80, 90, 40);
                ctx.fillStyle = '#27ae60'; ctx.font = '15px serif'; ctx.fillText('\u03C3 (H_n)', rx+5, cy-55);
                ctx.fillStyle = 'rgba(46,204,113,0.2)'; ctx.fillRect(rx, cy-30, 90, 40); ctx.strokeRect(rx, cy-30, 90, 40);
                ctx.fillStyle = '#27ae60'; ctx.fillText('\u03B2 (H^q)', rx+8, cy-5);
                ctx.beginPath(); ctx.moveTo(rx+45, cy+10); ctx.lineTo(rx+45, cy+40); ctx.stroke();
                ctx.font = '13px serif'; ctx.fillText('\u2322', rx+55, cy+30);
                ctx.fillStyle = 'rgba(46,204,113,0.3)'; ctx.fillRect(rx-10, cy+40, 110, 40);
                ctx.strokeStyle = '#27ae60'; ctx.strokeRect(rx-10, cy+40, 110, 40);
                ctx.fillStyle = '#27ae60'; ctx.font = '14px serif'; ctx.fillText('\u03C3\u2322\u03B2 (H_p)', rx-5, cy+65);
                ctx.fillStyle = 'rgba(231,76,60,0.2)'; ctx.fillRect(rx, cy+100, 90, 40);
                ctx.strokeStyle = '#e74c3c'; ctx.strokeRect(rx, cy+100, 90, 40);
                ctx.fillStyle = '#e74c3c'; ctx.font = '15px serif'; ctx.fillText('\u03B1 (H^p)', rx+5, cy+125);
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px serif'; ctx.fillText('\u27E8,\u27E9 \u2192 \u2124', rx+110, cy+75);
              }
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 30px serif'; ctx.fillText('=', width/2-10, cy+160);
              ctx.font = '14px serif'; ctx.fillText('Both evaluate to the same integer!', width/2-100, cy+185);
            }

            var cupBtn = document.createElement('button'); cupBtn.textContent = 'Toggle Cup Path';
            cupBtn.style.padding = '4px 12px'; cupBtn.style.background = '#238636'; cupBtn.style.color = '#fff'; cupBtn.style.border = 'none'; cupBtn.style.borderRadius = '4px'; cupBtn.style.cursor = 'pointer';
            cupBtn.onclick = function() { state.showCup = !state.showCup; draw(); }; controls.appendChild(cupBtn);
            var capBtn = document.createElement('button'); capBtn.textContent = 'Toggle Cap Path';
            capBtn.style.marginLeft = '8px'; capBtn.style.padding = '4px 12px'; capBtn.style.background = '#238636'; capBtn.style.color = '#fff'; capBtn.style.border = 'none'; capBtn.style.borderRadius = '4px'; capBtn.style.cursor = 'pointer';
            capBtn.onclick = function() { state.showCap = !state.showCap; draw(); }; controls.appendChild(capBtn);
            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'cap-product-ex1',
          question: 'Verify associativity \\((\\varphi \\cup \\psi) \\frown \\sigma = \\varphi \\frown (\\psi \\frown \\sigma)\\) for \\(\\varphi, \\psi \\in C^1\\) and \\(\\sigma = [v_0,v_1,v_2,v_3]\\).',
          hint: 'Compute both sides. LHS: cup on front 2-face, then back. RHS: cap \\(\\psi\\) first, then cap \\(\\varphi\\).',
          solution: `LHS: \\((\\varphi\\cup\\psi)\\frown\\sigma = \\varphi(\\sigma|_{[v_0,v_1]})\\psi(\\sigma|_{[v_1,v_2]})\\cdot\\sigma|_{[v_2,v_3]}\\)

RHS: \\(\\psi\\frown\\sigma = \\psi(\\sigma|_{[v_0,v_1]})\\cdot\\sigma|_{[v_1,v_2,v_3]}\\), then \\(\\varphi\\frown(\\cdots) = \\psi(\\sigma|_{[v_0,v_1]})\\varphi(\\sigma|_{[v_1,v_2]})\\cdot\\sigma|_{[v_2,v_3]}\\)

Both equal \\(\\varphi(\\sigma|_{[v_0,v_1]})\\psi(\\sigma|_{[v_1,v_2]})\\cdot\\sigma|_{[v_2,v_3]}\\). \\(\\checkmark\\)`
        },
        {
          id: 'cap-torus',
          question: 'Compute \\([T^2] \\frown \\alpha\\) and \\([T^2] \\frown (\\alpha \\cup \\beta)\\) where \\(\\alpha, \\beta \\in H^1(T^2)\\).',
          hint: 'Use \\(\\langle \\gamma, [T^2] \\frown \\alpha \\rangle = \\langle \\gamma \\cup \\alpha, [T^2] \\rangle\\) and the cup product structure.',
          solution: `\\(\\langle\\beta, [T^2]\\frown\\alpha\\rangle = \\langle\\beta\\cup\\alpha, [T^2]\\rangle = -1\\) and \\(\\langle\\alpha, [T^2]\\frown\\alpha\\rangle = 0\\).

So \\([T^2]\\frown\\alpha\\) is the meridian cycle (Poincar\u00e9 dual of \\(\\beta\\)).

\\([T^2]\\frown(\\alpha\\cup\\beta) = \\langle\\alpha\\cup\\beta,[T^2]\\rangle\\cdot[\\text{pt}] = [\\text{pt}]\\), the generator of \\(H_0\\).`
        }
      ]
    },

    // ============================================================
    // Section 3: The Poincare Duality Theorem
    // ============================================================
    {
      id: 'poincare-duality-theorem',
      title: 'The Poincar\u00e9 Duality Theorem',
      content: `
        <div class="env-block theorem">
          <p><strong>Theorem (Poincar\u00e9 Duality \u2014 Hatcher 3.30):</strong> Let \\(M\\) be a closed, connected, oriented \\(n\\)-manifold. Then</p>
          \\[ D_M : H^k(M; \\mathbb{Z}) \\xrightarrow{\\;\\cong\\;} H_{n-k}(M; \\mathbb{Z}), \\quad \\varphi \\mapsto [M] \\frown \\varphi \\]
          <p>is an isomorphism for all \\(k\\). More generally, this holds with any coefficient ring \\(R\\).</p>
        </div>

        <div class="env-block intuition">
          <p><strong>Geometric Meaning:</strong> Every \\(k\\)-cocycle on a closed oriented \\(n\\)-manifold has a Poincar\u00e9 dual \\((n-k)\\)-cycle. Informally:</p>
          <ul>
            <li>A 1-cocycle is dual to an \\((n-1)\\)-cycle (a "hypersurface")</li>
            <li>On a surface: curves are dual to curves</li>
            <li>In dimension 4: surfaces are dual to surfaces</li>
          </ul>
          <p>This is the topological Riesz representation theorem.</p>
        </div>

        <div class="env-block proof">
          <p><strong>Proof sketch (Hatcher 3.3):</strong></p>
          <ol>
            <li><strong>Local duality:</strong> On \\(\\mathbb{R}^n\\), capping with the generator of \\(H_n(\\mathbb{R}^n, \\mathbb{R}^n \\setminus 0)\\) gives \\(H^k_c(\\mathbb{R}^n) \\cong H_{n-k}(\\mathbb{R}^n)\\).</li>
            <li><strong>Mayer-Vietoris:</strong> If duality holds for \\(U, V, U \\cap V\\), the five lemma gives duality for \\(U \\cup V\\).</li>
            <li><strong>Induction:</strong> Cover \\(M\\) by finitely many \\(\\mathbb{R}^n\\)-charts and induct. \\(\\square\\)</li>
          </ol>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(T^2\\)):</strong></p>
          \\[ \\begin{array}{c|c|c} k & H^k(T^2) & H_{2-k}(T^2) \\\\ \\hline 0 & \\mathbb{Z} & H_2 = \\mathbb{Z} \\\\ 1 & \\mathbb{Z}^2 & H_1 = \\mathbb{Z}^2 \\\\ 2 & \\mathbb{Z} & H_0 = \\mathbb{Z} \\end{array} \\]
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(\\mathbb{C}P^2\\), dim 4):</strong></p>
          \\[ \\begin{array}{c|c|c} k & H^k & H_{4-k} \\\\ \\hline 0 & \\mathbb{Z} & \\mathbb{Z} \\\\ 1 & 0 & 0 \\\\ 2 & \\mathbb{Z} & \\mathbb{Z} \\\\ 3 & 0 & 0 \\\\ 4 & \\mathbb{Z} & \\mathbb{Z} \\end{array} \\]
          <p>\\(D_M\\) sends \\(\\alpha \\in H^2\\) to \\([\\mathbb{C}P^1] \\in H_2\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Corollary (Betti Number Symmetry):</strong> \\(b_k = b_{n-k}\\). Hence \\(\\chi(M) = 0\\) when \\(n\\) is odd.</p>
        </div>

        <div class="env-block remark">
          <p><strong>Non-Orientable Version:</strong> Over \\(\\mathbb{Z}/2\\), duality holds for all closed manifolds: \\(H^k(M; \\mathbb{Z}/2) \\cong H_{n-k}(M; \\mathbb{Z}/2)\\).</p>
        </div>

        <div class="env-block example">
          <p><strong>Example (\\(\\mathbb{R}P^2\\) over \\(\\mathbb{Z}/2\\)):</strong> All groups \\(H^k(\\mathbb{R}P^2; \\mathbb{Z}/2) \\cong H_{2-k}(\\mathbb{R}P^2; \\mathbb{Z}/2) \\cong \\mathbb{Z}/2\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Poincar\u00e9-Lefschetz Duality:</strong> For compact oriented \\(M\\) with boundary:</p>
          \\[ H^k(M, \\partial M) \\cong H_{n-k}(M), \\quad H^k(M) \\cong H_{n-k}(M, \\partial M) \\]
        </div>

        <div class="viz-placeholder" data-viz="duality-table-explorer"></div>
        <div class="viz-placeholder" data-viz="betti-number-mirror"></div>
      `,
      visualizations: [
        {
          id: 'duality-table-explorer',
          title: 'Duality Table Explorer',
          description: 'See H^k \u2245 H_{n-k} for various manifolds',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { manifold: 'T2' };
            var data = {
              'S2': { name: 'S\u00B2', dim: 2, groups: ['Z','0','Z'] },
              'T2': { name: 'T\u00B2', dim: 2, groups: ['Z','Z\u00B2','Z'] },
              'CP2': { name: 'CP\u00B2', dim: 4, groups: ['Z','0','Z','0','Z'] },
              'T3': { name: 'T\u00B3', dim: 3, groups: ['Z','Z\u00B3','Z\u00B3','Z'] },
              'genus2': { name: '\u03A3\u2082', dim: 2, groups: ['Z','Z\u2074','Z'] }
            };

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var d = data[state.manifold], n = d.dim;
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 22px serif';
              ctx.fillText('Poincar\u00e9 Duality: ' + d.name + '  (n=' + n + ')', 20, 35);
              var tX = 40, tY = 70, cW = Math.min(140,(width-100)/3), rH = 35;
              ctx.fillStyle = '#34495e'; ctx.fillRect(tX, tY, cW*3, rH);
              ctx.fillStyle = '#fff'; ctx.font = 'bold 15px serif';
              ctx.fillText('k', tX+cW/2-5, tY+23); ctx.fillText('H^k(M)', tX+cW+cW/2-25, tY+23); ctx.fillText('H_{n-k}(M)', tX+2*cW+cW/2-35, tY+23);
              for (var k = 0; k <= n; k++) {
                var y = tY+rH*(k+1);
                ctx.fillStyle = k%2===0 ? 'rgba(52,152,219,0.08)' : 'rgba(52,152,219,0.02)';
                ctx.fillRect(tX, y, cW*3, rH);
                ctx.strokeStyle = '#bdc3c7'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(tX, y); ctx.lineTo(tX+cW*3, y); ctx.stroke();
                ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif'; ctx.fillText(String(k), tX+cW/2-5, y+23);
                ctx.fillStyle = '#e74c3c'; ctx.fillText(d.groups[k], tX+cW+cW/2-15, y+23);
                ctx.fillStyle = '#3498db'; ctx.fillText(d.groups[n-k], tX+2*cW+cW/2-15, y+23);
                ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(tX+cW*1.75+15, y+18); ctx.lineTo(tX+cW*1.75+40, y+18); ctx.stroke();
                ctx.fillStyle = '#27ae60'; ctx.font = '12px serif'; ctx.fillText('\u2245', tX+cW*1.75+24, y+14);
              }
              ctx.strokeStyle = '#34495e'; ctx.lineWidth = 2; ctx.strokeRect(tX, tY, cW*3, rH*(n+2));
              for (var c = 1; c < 3; c++) { ctx.strokeStyle = '#bdc3c7'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(tX+c*cW, tY); ctx.lineTo(tX+c*cW, tY+rH*(n+2)); ctx.stroke(); }
              var nY = tY+rH*(n+2)+30;
              ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif';
              ctx.fillText('b_k = b_{n-k}  (Betti number palindrome)', 20, nY);
              var chi = 0;
              var betti = d.groups.map(function(s) { return s==='0'?0:s==='Z'?1:(s.match(/(\d+)/)?parseInt(s.match(/(\d+)/)[1]):1); });
              for (var k = 0; k <= n; k++) chi += (k%2===0?1:-1)*betti[k];
              ctx.fillText('\u03C7(' + d.name + ') = ' + chi + (n%2===1?' = 0 (odd dim)':''), 20, nY+25);
            }

            var mfSelect = document.createElement('select');
            mfSelect.style.background = '#161b22'; mfSelect.style.color = '#c9d1d9'; mfSelect.style.border = '1px solid #30363d'; mfSelect.style.padding = '4px 8px'; mfSelect.style.borderRadius = '4px';
            [{value:'S2',label:'S\u00B2'},{value:'T2',label:'T\u00B2'},{value:'genus2',label:'\u03A3\u2082'},{value:'T3',label:'T\u00B3'},{value:'CP2',label:'CP\u00B2 (dim 4)'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; mfSelect.appendChild(o);
            });
            mfSelect.value = 'T2'; mfSelect.onchange = function() { state.manifold = mfSelect.value; draw(); }; controls.appendChild(mfSelect);
            draw();
          }
        },
        {
          id: 'betti-number-mirror',
          title: 'Betti Number Mirror',
          description: 'Visualize palindromic symmetry of Betti numbers',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { manifold: 'T2' };
            var bd = {
              'S2': { name: 'S\u00B2', b: [1,0,1] }, 'T2': { name: 'T\u00B2', b: [1,2,1] },
              'CP2': { name: 'CP\u00B2', b: [1,0,1,0,1] }, 'T3': { name: 'T\u00B3', b: [1,3,3,1] },
              'genus3': { name: '\u03A3\u2083', b: [1,6,1] }
            };

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              var d = bd[state.manifold], n = d.b.length-1, maxB = Math.max.apply(null, d.b);
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px serif';
              ctx.fillText('Betti Numbers of ' + d.name + ' (Palindromic!)', 20, 30);
              var barW = Math.min(60,(width-100)/(n+1)), maxBarH = height*0.45, baseY = height*0.75;
              var startX = (width-(n+1)*barW*1.5)/2;
              var colors = ['#e74c3c','#3498db','#27ae60','#f39c12','#9b59b6'];
              for (var k = 0; k <= n; k++) {
                var x = startX+k*barW*1.5, barH = maxB>0?(d.b[k]/maxB)*maxBarH:0;
                var hue = k<=n-k?k:n-k;
                ctx.fillStyle = colors[hue%colors.length];
                ctx.fillRect(x, baseY-barH, barW, barH);
                ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1; ctx.strokeRect(x, baseY-barH, barW, barH);
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px serif';
                ctx.fillText(String(d.b[k]), x+barW/2-5, baseY-barH-8);
                ctx.font = '14px serif'; ctx.fillText('b' + k, x+barW/2-8, baseY+20);
                if (k < n-k) {
                  ctx.setLineDash([3,3]); ctx.strokeStyle = colors[hue%colors.length]; ctx.lineWidth = 1;
                  var pX = startX+(n-k)*barW*1.5;
                  ctx.beginPath(); ctx.moveTo(x+barW/2, baseY-barH-25);
                  ctx.bezierCurveTo(x+barW/2, baseY-maxBarH-40, pX+barW/2, baseY-maxBarH-40, pX+barW/2, baseY-barH-25);
                  ctx.stroke(); ctx.setLineDash([]);
                }
              }
              var mirX = startX+(n*barW*1.5)/2+barW/2;
              ctx.strokeStyle = '#95a5a6'; ctx.lineWidth = 2; ctx.setLineDash([8,4]);
              ctx.beginPath(); ctx.moveTo(mirX, baseY-maxBarH-50); ctx.lineTo(mirX, baseY+5); ctx.stroke();
              ctx.setLineDash([]); ctx.fillStyle = '#95a5a6'; ctx.font = '13px serif'; ctx.fillText('mirror', mirX-18, baseY-maxBarH-55);
              var chi = 0; for (var k = 0; k <= n; k++) chi += (k%2===0?1:-1)*d.b[k];
              ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif';
              ctx.fillText('\u03C7 = ' + chi + (n%2===1?' = 0 (odd dim!)':''), 20, height-10);
            }

            var mfSelect = document.createElement('select');
            mfSelect.style.background = '#161b22'; mfSelect.style.color = '#c9d1d9'; mfSelect.style.border = '1px solid #30363d'; mfSelect.style.padding = '4px 8px'; mfSelect.style.borderRadius = '4px';
            [{value:'S2',label:'S\u00B2'},{value:'T2',label:'T\u00B2'},{value:'genus3',label:'\u03A3\u2083'},{value:'T3',label:'T\u00B3'},{value:'CP2',label:'CP\u00B2'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; mfSelect.appendChild(o);
            });
            mfSelect.value = 'T2'; mfSelect.onchange = function() { state.manifold = mfSelect.value; draw(); }; controls.appendChild(mfSelect);
            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'duality-3manifold',
          question: 'Show that any closed oriented 3-manifold has \\(\\chi(M) = 0\\).',
          hint: 'Duality: \\(b_0 = b_3\\), \\(b_1 = b_2\\). Compute the alternating sum.',
          solution: `By duality: \\(b_0 = b_3 = 1\\), \\(b_1 = b_2\\). Then \\(\\chi = 1 - b_1 + b_1 - 1 = 0\\).`
        },
        {
          id: 'duality-cp3',
          question: 'Compute all Betti numbers of \\(\\mathbb{C}P^3\\) and verify \\(b_k = b_{6-k}\\).',
          hint: '\\(\\mathbb{C}P^3\\) has cells in dimensions 0, 2, 4, 6.',
          solution: `\\(b_0=b_2=b_4=b_6=1\\), others 0. Palindrome: (1,0,1,0,1,0,1). \\(\\chi = 4\\).`
        }
      ]
    },

    // ============================================================
    // Section 4: Applications - Intersection Form and Beyond
    // ============================================================
    {
      id: 'applications-intersection-theory',
      title: 'Applications: Intersection Form and Beyond',
      content: `
        <div class="env-block intuition">
          <p><strong>The Big Picture:</strong> Poincar\u00e9 duality connects topology to geometry through <em>intersection theory</em>. The algebraic count of intersections is encoded in the <em>intersection form</em>, which carries deep information, especially in dimension 4.</p>
        </div>

        <div class="env-block definition">
          <p><strong>Definition (Intersection Number):</strong> For \\(a \\in H_k(M)\\), \\(b \\in H_{n-k}(M)\\) on a closed oriented \\(n\\)-manifold:</p>
          \\[ a \\cdot b = \\langle D^{-1}(a) \\cup D^{-1}(b),\\; [M] \\rangle \\in \\mathbb{Z} \\]
          <p>If \\(a, b\\) are represented by transverse submanifolds, this equals the signed count of intersection points.</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Properties:</strong></p>
          <ol>
            <li><strong>Bilinear</strong></li>
            <li><strong>Graded symmetry:</strong> \\(a \\cdot b = (-1)^{k(n-k)} b \\cdot a\\)</li>
            <li><strong>Non-degenerate</strong> modulo torsion</li>
            <li><strong>Topological invariant</strong></li>
          </ol>
        </div>

        <div class="env-block example">
          <p><strong>Torus:</strong> \\(Q = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}\\) (symplectic). Genus \\(g\\): \\(Q = \\begin{pmatrix} 0 & I_g \\\\ -I_g & 0 \\end{pmatrix}\\).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>4-Manifolds:</strong> For closed simply-connected oriented 4-manifolds, \\(Q_M: H_2 \\times H_2 \\to \\mathbb{Z}\\) is symmetric and unimodular.</p>
          <ul>
            <li><strong>Freedman (1982):</strong> Homeomorphism type determined by \\(Q_M\\)</li>
            <li><strong>Donaldson (1983):</strong> If smooth and definite, then \\(Q_M \\cong \\pm I\\)</li>
          </ul>
        </div>

        <div class="env-block example">
          <p><strong>\\(\\mathbb{C}P^2\\):</strong> \\(Q = (1)\\), \\(L \\cdot L = 1\\). <strong>\\(S^2 \\times S^2\\):</strong> \\(Q = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\) (hyperbolic).</p>
        </div>

        <div class="env-block theorem">
          <p><strong>Lefschetz Fixed-Point Theorem:</strong> If \\(\\Lambda(f) = \\sum (-1)^k \\text{tr}(f_*|_{H_k}) \\neq 0\\), then \\(f\\) has a fixed point. For \\(f = \\text{id}\\), \\(\\Lambda = \\chi(M)\\).</p>
        </div>

        <div class="env-block remark">
          <p><strong>Further Applications:</strong></p>
          <ol>
            <li><strong>Alexander duality:</strong> \\(\\widetilde{H}_k(S^n \\setminus K) \\cong \\widetilde{H}^{n-k-1}(K)\\)</li>
            <li><strong>Signature:</strong> \\(\\sigma(M) = b^+ - b^-\\) for \\(4k\\)-manifolds is a bordism invariant</li>
            <li><strong>Lefschetz duality:</strong> \\(H^k(M, \\partial M) \\cong H_{n-k}(M)\\) for manifolds with boundary</li>
          </ol>
        </div>

        <div class="viz-placeholder" data-viz="intersection-number-animator"></div>
        <div class="viz-placeholder" data-viz="intersection-form-calculator"></div>
      `,
      visualizations: [
        {
          id: 'intersection-number-animator',
          title: 'Intersection Number Animator',
          description: 'Watch cycles intersect and count algebraic intersection numbers',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { example: 'torus-ab', showCount: true, anim: 0 };

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 22px serif'; ctx.fillText('Intersection Numbers', 20, 30);
              state.anim += 0.025;
              var cx = width/2, cy = height/2;

              if (state.example === 'torus-ab') {
                ctx.font = '16px serif'; ctx.fillText('T\u00B2: meridian \u03B1 \u2229 longitude \u03B2', 20, 60);
                var size = Math.min(width*0.4, 200), x0 = cx-size/2, y0 = cy-size/2;
                ctx.strokeStyle = '#95a5a6'; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, size, size);
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x0+size, cy); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.font = 'bold 16px serif'; ctx.fillText('\u03B1', x0+size+8, cy+5);
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx, y0); ctx.lineTo(cx, y0+size); ctx.stroke();
                ctx.fillStyle = '#3498db'; ctx.fillText('\u03B2', cx+8, y0-8);
                if (state.showCount) {
                  var pulse = Math.abs(Math.sin(state.anim*2));
                  ctx.fillStyle = '#27ae60'; ctx.beginPath(); ctx.arc(cx, cy, 6+pulse*5, 0, Math.PI*2); ctx.fill();
                  ctx.font = 'bold 18px serif'; ctx.fillText('+1', cx+15, cy-15);
                }
                ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 2; ctx.strokeRect(20, height-80, width-40, 60);
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px serif'; ctx.fillText('\u03B1 \u00B7 \u03B2 = +1', 30, height-52);
                ctx.font = '14px serif'; ctx.fillText('One transverse intersection, positive orientation', 30, height-30);
              } else if (state.example === 'torus-aa') {
                ctx.font = '16px serif'; ctx.fillText('T\u00B2: parallel meridians', 20, 60);
                var size = Math.min(width*0.4, 200), x0 = cx-size/2, y0 = cy-size/2;
                ctx.strokeStyle = '#95a5a6'; ctx.lineWidth = 2; ctx.strokeRect(x0, y0, size, size);
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, cy-25); ctx.lineTo(x0+size, cy-25); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.font = 'bold 16px serif'; ctx.fillText('\u03B1\u2081', x0+size+8, cy-20);
                ctx.strokeStyle = '#9b59b6'; ctx.beginPath(); ctx.moveTo(x0, cy+25); ctx.lineTo(x0+size, cy+25); ctx.stroke();
                ctx.fillStyle = '#9b59b6'; ctx.fillText('\u03B1\u2082', x0+size+8, cy+30);
                ctx.strokeStyle = '#95a5a6'; ctx.lineWidth = 2; ctx.strokeRect(20, height-80, width-40, 60);
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px serif'; ctx.fillText('\u03B1\u2081 \u00B7 \u03B1\u2082 = 0', 30, height-52);
                ctx.font = '14px serif'; ctx.fillText('Parallel cycles: no intersection', 30, height-30);
              } else if (state.example === 'cp2') {
                ctx.font = '16px serif'; ctx.fillText('\u2102P\u00B2: line L self-intersection', 20, 60);
                var R = 80;
                ctx.strokeStyle = '#95a5a6'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R+30, 0, Math.PI*2); ctx.stroke();
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.moveTo(cx-R-10, cy+R*0.3); ctx.quadraticCurveTo(cx, cy-R*0.8, cx+R+10, cy+R*0.3); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.font = 'bold 16px serif'; ctx.fillText('L', cx+R+15, cy+R*0.3-10);
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 4;
                ctx.beginPath(); ctx.moveTo(cx-R*0.3, cy-R-10); ctx.quadraticCurveTo(cx+R*0.5, cy, cx-R*0.3, cy+R+10); ctx.stroke();
                ctx.fillStyle = '#3498db'; ctx.fillText("L'", cx-R*0.3-25, cy+R+15);
                if (state.showCount) {
                  var pulse = Math.abs(Math.sin(state.anim*2));
                  ctx.fillStyle = '#27ae60'; ctx.beginPath(); ctx.arc(cx+10, cy-15, 6+pulse*4, 0, Math.PI*2); ctx.fill();
                  ctx.font = 'bold 16px serif'; ctx.fillText('+1', cx+22, cy-23);
                }
                ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 2; ctx.strokeRect(20, height-80, width-40, 60);
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px serif'; ctx.fillText('L \u00B7 L = 1', 30, height-52);
                ctx.font = '14px serif'; ctx.fillText("B\u00e9zout: two lines meet in exactly one point", 30, height-30);
              }
            }

            var exSelect = document.createElement('select');
            exSelect.style.background = '#161b22'; exSelect.style.color = '#c9d1d9'; exSelect.style.border = '1px solid #30363d'; exSelect.style.padding = '4px 8px'; exSelect.style.borderRadius = '4px';
            [{value:'torus-ab',label:'T\u00B2: \u03B1\u00B7\u03B2 = 1'},{value:'torus-aa',label:'T\u00B2: \u03B1\u00B7\u03B1 = 0'},{value:'cp2',label:'\u2102P\u00B2: L\u00B7L = 1'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; exSelect.appendChild(o);
            });
            exSelect.value = 'torus-ab'; exSelect.onchange = function() { state.example = exSelect.value; draw(); }; controls.appendChild(exSelect);
            var countBtn = document.createElement('button'); countBtn.textContent = 'Toggle Count';
            countBtn.style.marginLeft = '15px'; countBtn.style.padding = '4px 12px'; countBtn.style.background = '#238636'; countBtn.style.color = '#fff'; countBtn.style.border = 'none'; countBtn.style.borderRadius = '4px'; countBtn.style.cursor = 'pointer';
            countBtn.onclick = function() { state.showCount = !state.showCount; draw(); }; controls.appendChild(countBtn);
            draw();
          }
        },
        {
          id: 'intersection-form-calculator',
          title: 'Intersection Form Calculator',
          description: 'Compute intersection matrices for surfaces',
          setup: function(body, controls) {
            var canvas = document.createElement('canvas');
            canvas.width = body.clientWidth;
            canvas.height = Math.round(body.clientWidth / 1.5);
            body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            var state = { surface: 'torus', showIntersection: true };

            function draw() {
              var width = canvas.width, height = canvas.height;
              ctx.clearRect(0, 0, width, height);
              ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px serif';
              if (state.surface === 'torus') {
                ctx.fillText('Intersection Form on T\u00B2', 20, 30);
                var cx = width/2, cy = height/2-20, size = Math.min(width*0.35, height*0.35);
                ctx.fillStyle = 'rgba(52,152,219,0.1)'; ctx.fillRect(cx-size, cy-size, size*2, size*2);
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 2; ctx.strokeRect(cx-size, cy-size, size*2, size*2);
                ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(cx, cy-size); ctx.lineTo(cx, cy+size); ctx.stroke();
                ctx.fillStyle = '#e74c3c'; ctx.font = 'bold 16px serif'; ctx.fillText('a', cx+10, cy);
                ctx.strokeStyle = '#3498db'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(cx-size, cy); ctx.lineTo(cx+size, cy); ctx.stroke();
                ctx.fillStyle = '#3498db'; ctx.fillText('b', cx-size+10, cy-15);
                if (state.showIntersection) {
                  ctx.fillStyle = '#f39c12'; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI*2); ctx.fill();
                  ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI*2); ctx.stroke();
                  ctx.fillStyle = '#f39c12'; ctx.font = 'bold 14px serif'; ctx.fillText('+1', cx+12, cy+20);
                }
                var mX = 30, mY = height-110;
                ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px serif'; ctx.fillText('Intersection Matrix Q:', mX, mY);
                ctx.font = '18px serif'; ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(mX+20,mY+10); ctx.lineTo(mX+10,mY+10); ctx.lineTo(mX+10,mY+65); ctx.lineTo(mX+20,mY+65); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(mX+110,mY+10); ctx.lineTo(mX+120,mY+10); ctx.lineTo(mX+120,mY+65); ctx.lineTo(mX+110,mY+65); ctx.stroke();
                ctx.fillStyle = '#2c3e50'; ctx.fillText(' 0    1', mX+30, mY+33); ctx.fillText('-1    0', mX+27, mY+58);
                ctx.fillStyle = '#7f8c8d'; ctx.font = '14px serif';
                ctx.fillText('Symplectic form: Q^T = -Q', mX+150, mY+45);
              } else {
                ctx.fillText('Intersection Form on Genus-2', 20, 30);
                var cx2 = width/2, cy2 = height/2-10, hW = width*0.18, hH = height*0.18;
                for (var h = 0; h < 2; h++) {
                  var hx = cx2+(h===0?-hW*1.3:hW*0.3), hy = cy2;
                  ctx.strokeStyle = '#3498db'; ctx.lineWidth = 2;
                  ctx.beginPath(); ctx.ellipse(hx+hW/2, hy, hW/2, hH, 0, 0, Math.PI*2); ctx.stroke();
                  ctx.strokeStyle = '#e74c3c'; ctx.lineWidth = 3;
                  ctx.beginPath(); ctx.moveTo(hx+hW/2, hy-hH); ctx.lineTo(hx+hW/2, hy+hH); ctx.stroke();
                  ctx.strokeStyle = '#27ae60'; ctx.lineWidth = 3;
                  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx+hW, hy); ctx.stroke();
                  ctx.fillStyle = '#f39c12'; ctx.beginPath(); ctx.arc(hx+hW/2, hy, 6, 0, Math.PI*2); ctx.fill();
                  ctx.fillStyle = '#e74c3c'; ctx.font = '14px serif'; ctx.fillText('a'+(h+1), hx+hW/2+8, hy-hH/2);
                  ctx.fillStyle = '#27ae60'; ctx.fillText('b'+(h+1), hx+hW*0.7, hy-12);
                }
                var mY2 = height-80;
                ctx.fillStyle = '#2c3e50'; ctx.font = '15px serif';
                ctx.fillText('Q = block diag of J = ((0,1),(-1,0))', 20, mY2);
                ctx.fillText('Each handle: one symplectic block', 20, mY2+22);
              }
            }

            var surfSelect = document.createElement('select');
            surfSelect.style.background = '#161b22'; surfSelect.style.color = '#c9d1d9'; surfSelect.style.border = '1px solid #30363d'; surfSelect.style.padding = '4px 8px'; surfSelect.style.borderRadius = '4px';
            [{value:'torus',label:'Torus T\u00B2'},{value:'genus2',label:'Genus-2'}].forEach(function(opt) {
              var o = document.createElement('option'); o.value = opt.value; o.textContent = opt.label; surfSelect.appendChild(o);
            });
            surfSelect.value = 'torus'; surfSelect.onchange = function() { state.surface = surfSelect.value; draw(); }; controls.appendChild(surfSelect);

            var toggleBtn = document.createElement('button'); toggleBtn.textContent = 'Toggle Intersection';
            toggleBtn.style.marginLeft = '15px'; toggleBtn.style.padding = '4px 12px'; toggleBtn.style.background = '#238636'; toggleBtn.style.color = '#fff'; toggleBtn.style.border = 'none'; toggleBtn.style.borderRadius = '4px'; toggleBtn.style.cursor = 'pointer';
            toggleBtn.onclick = function() { state.showIntersection = !state.showIntersection; draw(); }; controls.appendChild(toggleBtn);

            draw();
          }
        }
      ],
      exercises: [
        {
          id: 'intersection-cp2',
          question: 'Show \\(L \\cdot L = 1\\) on \\(\\mathbb{C}P^2\\) using the cohomology ring \\(H^* = \\mathbb{Z}[\\alpha]/(\\alpha^3)\\).',
          hint: 'The Poincar\u00e9 dual of \\(L\\) is \\(\\alpha \\in H^2\\). Evaluate \\(\\langle \\alpha^2, [\\mathbb{C}P^2] \\rangle\\).',
          solution: `\\(L \\cdot L = \\langle \\alpha^2, [\\mathbb{C}P^2] \\rangle = 1\\) since \\(\\alpha^2\\) generates \\(H^4 \\cong \\mathbb{Z}\\) and pairs with the fundamental class to give 1. Geometrically: B\u00e9zout's theorem.`
        },
        {
          id: 'intersection-s2xs2',
          question: 'Show the intersection form on \\(S^2 \\times S^2\\) is the hyperbolic form \\(\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\).',
          hint: 'Use \\(a = [S^2 \\times \\{\\text{pt}\\}]\\), \\(b = [\\{\\text{pt}\\} \\times S^2]\\). Compute intersections geometrically.',
          solution: `\\(Q(a,b) = 1\\) (one transverse point), \\(Q(a,a) = Q(b,b) = 0\\) (parallel copies are disjoint). So \\(Q = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\), symmetric (as expected for \\(n=4\\)), indefinite, unimodular.`
        }
      ]
    }
  ]
});
