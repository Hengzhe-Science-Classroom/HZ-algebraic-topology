window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: 'Covering Spaces',
    subtitle: 'Lifts, deck transformations, and classification',
    sections: [
        {
            id: 'definition-examples',
            title: 'Definition and Examples',
            content: `
                <h2>Covering Spaces</h2>

                <p>Covering spaces are a fundamental tool for studying fundamental groups. They allow us to "unfold" a space to make it simply connected, revealing its topological structure.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.1 (Covering Space)</div>
                    <div class="env-body">
                        <p>A <strong>covering space</strong> of \\(X\\) is a space \\(\\tilde{X}\\) together with a continuous surjection \\(p: \\tilde{X} \\to X\\) (called the <strong>covering map</strong>) such that for every \\(x \\in X\\), there exists an open neighborhood \\(U\\) of \\(x\\) such that \\(p^{-1}(U)\\) is a disjoint union of open sets in \\(\\tilde{X}\\), each mapped homeomorphically onto \\(U\\) by \\(p\\).</p>
                        <p>We say \\(U\\) is <strong>evenly covered</strong>, and each component of \\(p^{-1}(U)\\) is called a <strong>sheet</strong> over \\(U\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.2 (Classic Covering Spaces)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Universal cover of \\(S^1\\)</strong>: \\(p: \\mathbb{R} \\to S^1\\) given by \\(p(t) = e^{2\\pi i t}\\). Each point of \\(S^1\\) has infinitely many preimages (the integers \\(\\mathbb{Z}\\)).</li>
                            <li><strong>Double cover of \\(S^1\\)</strong>: \\(p: S^1 \\to S^1\\) given by \\(p(z) = z^2\\). Each point has exactly 2 preimages (except at 1, but the covering condition still holds locally).</li>
                            <li><strong>Cover of \\(S^1 \\vee S^1\\)</strong>: The 4-valent tree \\(\\tilde{X} \\to S^1 \\vee S^1\\) (as discussed in Chapter 2).</li>
                            <li><strong>Helix over \\(S^1\\)</strong>: \\(p: \\{(x, y, z) : x^2 + y^2 = 1\\} \\to S^1\\) by projection \\(p(x, y, z) = (x, y)\\). This is the product \\(S^1 \\times \\mathbb{R}\\), which is a trivial covering (all fibers are homeomorphic).</li>
                            <li><strong>Cover of torus</strong>: \\(p: \\mathbb{R}^2 \\to T^2 = \\mathbb{R}^2 / \\mathbb{Z}^2\\) (quotient by integer lattice). This is the universal cover of the torus.</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="covering-gallery"></div>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.3 (Fiber)</div>
                    <div class="env-body">
                        <p>The <strong>fiber</strong> over \\(x \\in X\\) is \\(p^{-1}(x)\\), the set of all points in \\(\\tilde{X}\\) mapping to \\(x\\). For a covering map, all fibers over a path-connected space have the same cardinality (the <strong>degree</strong> or <strong>number of sheets</strong> of the covering).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.4 (Universal Covering Space)</div>
                    <div class="env-body">
                        <p>A covering space \\(p: \\tilde{X} \\to X\\) is <strong>universal</strong> if \\(\\tilde{X}\\) is simply connected (\\(\\pi_1(\\tilde{X}) = 0\\)). Universal covers are "maximal" in the sense that any other covering space of \\(X\\) is covered by the universal cover.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Existence of Universal Covers)</div>
                    <div class="env-body">
                        <p>Not all spaces have universal covers. A space has a universal cover if and only if it is path-connected, locally path-connected, and <strong>semilocally simply connected</strong> (every point has a neighborhood whose inclusion induces the trivial map on \\(\\pi_1\\)). All manifolds and CW complexes satisfy these conditions.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'covering-gallery',
                    title: 'Covering Space Gallery',
                    description: 'Explore classic examples of covering spaces',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 350;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        let example = 'real-circle';

                        const info = document.createElement('div');
                        info.style.marginTop = '10px';
                        info.style.color = '#c9d1d9';
                        info.innerHTML = 'ℝ → S¹: p(t) = e^(2πit), infinite sheets';
                        body.appendChild(info);

                        const btn1 = document.createElement('button');
                        btn1.textContent = 'ℝ → S¹';
                        btn1.onclick = () => {
                            example = 'real-circle';
                            info.innerHTML = 'ℝ → S¹: p(t) = e^(2πit), infinite sheets (universal cover)';
                            draw();
                        };
                        controls.appendChild(btn1);

                        const btn2 = document.createElement('button');
                        btn2.textContent = 'S¹ → S¹';
                        btn2.onclick = () => {
                            example = 'circle-circle';
                            info.innerHTML = 'S¹ → S¹: p(z) = z², double cover (2 sheets)';
                            draw();
                        };
                        controls.appendChild(btn2);

                        const btn3 = document.createElement('button');
                        btn3.textContent = 'Helix → S¹';
                        btn3.onclick = () => {
                            example = 'helix';
                            info.innerHTML = 'Helix (S¹ × ℝ) → S¹: trivial covering';
                            draw();
                        };
                        controls.appendChild(btn3);

                        const btn4 = document.createElement('button');
                        btn4.textContent = 'ℝ² → T²';
                        btn4.onclick = () => {
                            example = 'plane-torus';
                            info.innerHTML = 'ℝ² → T²: universal cover of torus';
                            draw();
                        };
                        controls.appendChild(btn4);

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            const w = canvas.width;
                            const h = canvas.height;

                            if (example === 'real-circle') {
                                // Draw R (top, as horizontal line with marked integers)
                                ctx.strokeStyle = '#8b949e';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(50, h/3);
                                ctx.lineTo(w - 50, h/3);
                                ctx.stroke();

                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '14px monospace';
                                ctx.fillText('ℝ (covering space)', 20, h/3 - 20);

                                // Mark integers
                                for (let i = -2; i <= 2; i++) {
                                    const x = w/2 + i * 80;
                                    ctx.fillStyle = '#3fb950';
                                    ctx.beginPath();
                                    ctx.arc(x, h/3, 4, 0, 2*Math.PI);
                                    ctx.fill();
                                    ctx.fillStyle = '#c9d1d9';
                                    ctx.fillText(i.toString(), x - 5, h/3 - 10);
                                }

                                // Draw S¹ (bottom)
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(w/2, 2*h/3, 60, 0, 2*Math.PI);
                                ctx.stroke();

                                ctx.fillStyle = '#c9d1d9';
                                ctx.fillText('S¹ (base space)', 20, 2*h/3 - 80);

                                // Draw projection arrows
                                ctx.strokeStyle = '#f0883e';
                                ctx.setLineDash([5, 5]);
                                ctx.lineWidth = 1;
                                for (let i = -2; i <= 2; i++) {
                                    const x = w/2 + i * 80;
                                    ctx.beginPath();
                                    ctx.moveTo(x, h/3);
                                    ctx.lineTo(w/2 + 60, 2*h/3);
                                    ctx.stroke();
                                }
                                ctx.setLineDash([]);

                            } else if (example === 'circle-circle') {
                                // Two circles covering one
                                ctx.strokeStyle = '#3fb950';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(w/2, h/3, 60, 0, 2*Math.PI);
                                ctx.stroke();

                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '14px monospace';
                                ctx.fillText('S¹ (covering, z)', 20, h/3 - 80);

                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(w/2, 2*h/3, 60, 0, 2*Math.PI);
                                ctx.stroke();

                                ctx.fillText('S¹ (base, z²)', 20, 2*h/3 - 80);

                                // Show wrapping
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '12px sans-serif';
                                ctx.fillText('Each point in base has 2 preimages', w/2 - 100, h - 20);

                            } else if (example === 'helix') {
                                // Draw helix (spiral)
                                ctx.strokeStyle = '#bc8cff';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                const turns = 3;
                                for (let t = 0; t <= turns; t += 0.01) {
                                    const angle = 2 * Math.PI * t;
                                    const x = w/2 + 50 * Math.cos(angle);
                                    const y = h/4 + (t / turns) * h/2;
                                    if (t === 0) ctx.moveTo(x, y);
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();

                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '14px monospace';
                                ctx.fillText('Helix = S¹ × ℝ', 20, 30);

                                // Draw base circle
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(w/2, 3*h/4, 50, 0, 2*Math.PI);
                                ctx.stroke();

                                ctx.fillText('S¹ (projection)', 20, 3*h/4 - 70);

                            } else {
                                // Plane covering torus
                                ctx.strokeStyle = '#8b949e';
                                ctx.lineWidth = 1;

                                // Draw grid (plane)
                                for (let i = -2; i <= 2; i++) {
                                    ctx.beginPath();
                                    ctx.moveTo(w/2 + i * 40, h/4 - 80);
                                    ctx.lineTo(w/2 + i * 40, h/4 + 80);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(w/2 - 80, h/4 + i * 40);
                                    ctx.lineTo(w/2 + 80, h/4 + i * 40);
                                    ctx.stroke();
                                }

                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '14px monospace';
                                ctx.fillText('ℝ² (fundamental domain shown)', 20, h/4 - 100);

                                // Draw torus (as two nested ellipses)
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.ellipse(w/2, 3*h/4, 70, 40, 0, 0, 2*Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.ellipse(w/2, 3*h/4, 40, 70, 0, 0, 2*Math.PI);
                                ctx.stroke();

                                ctx.fillText('T² = ℝ²/ℤ²', 20, 3*h/4 - 60);
                            }
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that \\(p: \\mathbb{R} \\to S^1\\), \\(p(t) = e^{2\\pi i t}\\) is a covering map.',
                    hint: 'For any \\(z \\in S^1\\), find an open arc \\(U\\) around \\(z\\) (not the whole circle) and show \\(p^{-1}(U)\\) is a disjoint union of intervals, each mapped homeomorphically to \\(U\\).',
                    solution: 'Let \\(U\\) be an open arc of \\(S^1\\) of length less than \\(2\\pi\\) (e.g., \\(U = S^1 \\setminus \\{-1\\}\\)). Then \\(p^{-1}(U) = \\bigcup_{n \\in \\mathbb{Z}} (n + a, n + b)\\) where \\((a, b)\\) corresponds to the arc. Each interval \\((n + a, n + b)\\) is mapped homeomorphically onto \\(U\\) by \\(p\\). Thus \\(U\\) is evenly covered.'
                },
                {
                    question: 'Show that the map \\(p: S^1 \\to S^1\\) given by \\(p(z) = z^n\\) is an \\(n\\)-sheeted covering.',
                    hint: 'Each point \\(w \\in S^1\\) has exactly \\(n\\) \\(n\\)-th roots: \\(w, w\\omega, w\\omega^2, \\ldots, w\\omega^{n-1}\\) where \\(\\omega = e^{2\\pi i/n}\\).',
                    solution: 'For any \\(w \\in S^1\\), let \\(U\\) be a small arc around \\(w\\) not containing any \\(n\\)-th roots of unity times \\(w\\). Then \\(p^{-1}(U)\\) consists of \\(n\\) disjoint arcs, each mapping homeomorphically to \\(U\\) via \\(p\\). Thus \\(p\\) is an \\(n\\)-fold covering map.'
                },
                {
                    question: 'Prove that \\(p: \\mathbb{R}^2 \\to T^2 = \\mathbb{R}^2 / \\mathbb{Z}^2\\) is the universal cover of the torus.',
                    hint: 'Show \\(p\\) is a covering map and \\(\\mathbb{R}^2\\) is simply connected.',
                    solution: '\\(\\mathbb{R}^2\\) is contractible, hence simply connected. The map \\(p\\) is the quotient map, which is a covering map because locally it looks like the identity on fundamental domains (unit squares). Thus \\(p\\) is the universal covering.'
                },
                {
                    question: 'Is the projection \\(p: \\mathbb{R}^2 \\setminus \\{0\\} \\to S^1\\) given by \\(p(x, y) = (x, y)/|(x, y)|\\) a covering map?',
                    hint: 'Check if the fibers are discrete.',
                    solution: 'No. Each fiber \\(p^{-1}(z)\\) is a ray from the origin (homeomorphic to \\((0, \\infty)\\)), which is not discrete. A covering map must have discrete fibers (at least for path-connected spaces). This is a fiber bundle but not a covering space.'
                },
                {
                    question: 'Describe all connected 2-sheeted covers of \\(S^1\\).',
                    hint: 'There is essentially only one: \\(p: S^1 \\to S^1\\), \\(p(z) = z^2\\).',
                    solution: 'By the classification theorem (which we will prove), 2-sheeted covers correspond to index-2 subgroups of \\(\\pi_1(S^1) = \\mathbb{Z}\\). The only such subgroup is \\(2\\mathbb{Z}\\), giving the cover \\(p(z) = z^2\\). All 2-sheeted connected covers of \\(S^1\\) are isomorphic (as covering spaces) to this one.'
                }
            ]
        },

        {
            id: 'lifting',
            title: 'Lifting Criterion and Homotopy Lifting',
            content: `
                <h2>Lifts of Maps and Homotopies</h2>

                <p>One of the most powerful properties of covering spaces is the ability to "lift" maps and homotopies from the base space to the covering space.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.5 (Lift)</div>
                    <div class="env-body">
                        <p>Let \\(p: \\tilde{X} \\to X\\) be a covering map and \\(f: Y \\to X\\) a continuous map. A <strong>lift</strong> of \\(f\\) is a continuous map \\(\\tilde{f}: Y \\to \\tilde{X}\\) such that \\(p \\circ \\tilde{f} = f\\).</p>
                        <p style="text-align:center;">
                        \\[\\begin{array}{ccc}
                        & \\tilde{X} \\\\
                        & \\downarrow p \\\\
                        Y & \\xrightarrow{f} & X
                        \\end{array}\\]
                        </p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.6 (Path Lifting Property)</div>
                    <div class="env-body">
                        <p>Let \\(p: \\tilde{X} \\to X\\) be a covering map. For any path \\(\\gamma: [0,1] \\to X\\) and any \\(\\tilde{x}_0 \\in p^{-1}(\\gamma(0))\\), there exists a <em>unique</em> lift \\(\\tilde{\\gamma}: [0,1] \\to \\tilde{X}\\) with \\(\\tilde{\\gamma}(0) = \\tilde{x}_0\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p><strong>Existence:</strong> Cover \\([0,1]\\) by finitely many intervals \\(I_1, \\ldots, I_n\\) such that \\(\\gamma(I_i)\\) lies in an evenly covered neighborhood. Construct \\(\\tilde{\\gamma}\\) inductively on each \\(I_i\\) by choosing the unique sheet containing \\(\\tilde{\\gamma}(t_{i-1})\\).</p>
                        <p><strong>Uniqueness:</strong> If \\(\\tilde{\\gamma}_1, \\tilde{\\gamma}_2\\) are two lifts with the same starting point, they agree on each evenly covered neighborhood by the local homeomorphism property. Thus \\(\\tilde{\\gamma}_1 = \\tilde{\\gamma}_2\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="lift-animator"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.7 (Homotopy Lifting Property)</div>
                    <div class="env-body">
                        <p>Let \\(p: \\tilde{X} \\to X\\) be a covering map. If \\(H: Y \\times [0,1] \\to X\\) is a homotopy and \\(\\tilde{H}_0: Y \\to \\tilde{X}\\) is a lift of \\(H_0 = H(\\cdot, 0)\\), then there exists a <em>unique</em> lift \\(\\tilde{H}: Y \\times [0,1] \\to \\tilde{X}\\) of \\(H\\) with \\(\\tilde{H}(\\cdot, 0) = \\tilde{H}_0\\).</p>
                        <p>In particular, if \\(\\gamma_0 \\simeq_p \\gamma_1\\) are path homotopic in \\(X\\) and \\(\\tilde{\\gamma}_0\\) is a lift of \\(\\gamma_0\\), then the lift \\(\\tilde{\\gamma}_1\\) of \\(\\gamma_1\\) (with the same starting point) has the same endpoint: \\(\\tilde{\\gamma}_0(1) = \\tilde{\\gamma}_1(1)\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.8 (Lifting Criterion)</div>
                    <div class="env-body">
                        <p>Let \\(p: (\\tilde{X}, \\tilde{x}_0) \\to (X, x_0)\\) be a covering map of path-connected spaces. A continuous map \\(f: (Y, y_0) \\to (X, x_0)\\) lifts to \\(\\tilde{f}: (Y, y_0) \\to (\\tilde{X}, \\tilde{x}_0)\\) if and only if
                        \\[f_*(\\pi_1(Y, y_0)) \\subseteq p_*(\\pi_1(\\tilde{X}, \\tilde{x}_0)).\\]
                        Moreover, if \\(Y\\) is path-connected and locally path-connected, the lift is unique.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Idea</div>
                    <div class="env-body">
                        <p>(\\(\\Rightarrow\\)) If \\(\\tilde{f}\\) exists, then \\(f = p \\circ \\tilde{f}\\), so \\(f_* = p_* \\circ \\tilde{f}_*\\), which implies \\(f_*(\\pi_1(Y)) \\subseteq p_*(\\pi_1(\\tilde{X}))\\).</p>
                        <p>(\\(\\Leftarrow\\)) The condition ensures that loops in \\(Y\\) lift to loops in \\(\\tilde{X}\\) (not just paths with different endpoints). This allows us to define \\(\\tilde{f}\\) by lifting paths from \\(y_0\\) to any \\(y \\in Y\\), and the result is well-defined by the homotopy lifting property. See Hatcher, Proposition 1.33.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 3.9</div>
                    <div class="env-body">
                        <p>If \\(\\tilde{X}\\) is simply connected (\\(\\pi_1(\\tilde{X}) = 0\\)), then any map \\(f: (Y, y_0) \\to (X, x_0)\\) lifts to \\(\\tilde{f}: (Y, y_0) \\to (\\tilde{X}, \\tilde{x}_0)\\).</p>
                        <p>In particular, the universal cover is "universal" in this sense: it covers every other covering space.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'lift-animator',
                    title: 'Lift Animator',
                    description: 'Watch paths lift from base to covering space',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 400;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        let t = 0;
                        let animating = false;
                        let windingNum = 2;

                        const info = document.createElement('div');
                        info.style.marginTop = '10px';
                        info.style.color = '#c9d1d9';
                        info.textContent = `Lifting loop with winding number ${windingNum}`;
                        body.appendChild(info);

                        const slider = document.createElement('input');
                        slider.type = 'range';
                        slider.min = -3;
                        slider.max = 3;
                        slider.value = windingNum;
                        slider.style.width = '200px';
                        slider.oninput = (e) => {
                            windingNum = parseInt(e.target.value);
                            info.textContent = `Lifting loop with winding number ${windingNum}`;
                            if (!animating) draw();
                        };
                        controls.appendChild(slider);

                        const playBtn = document.createElement('button');
                        playBtn.textContent = 'Animate Lift';
                        playBtn.onclick = () => {
                            animating = !animating;
                            if (animating) {
                                playBtn.textContent = 'Stop';
                                t = 0;
                                animate();
                            } else {
                                playBtn.textContent = 'Animate Lift';
                            }
                        };
                        controls.appendChild(playBtn);

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            const w = canvas.width;
                            const h = canvas.height;

                            // Draw base space S¹ (bottom)
                            const baseY = 3*h/4;
                            const radius = 60;

                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(w/2, baseY, radius, 0, 2*Math.PI);
                            ctx.stroke();

                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '14px monospace';
                            ctx.fillText('S¹ (base)', w/2 - 30, baseY + radius + 25);

                            // Draw basepoint on S¹
                            ctx.fillStyle = '#f0883e';
                            ctx.beginPath();
                            ctx.arc(w/2 + radius, baseY, 5, 0, 2*Math.PI);
                            ctx.fill();

                            // Draw path on S¹ up to time t
                            if (animating && t > 0) {
                                ctx.strokeStyle = '#3fb950';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                for (let s = 0; s <= t; s += 0.01) {
                                    const angle = 2 * Math.PI * windingNum * s;
                                    const x = w/2 + radius * Math.cos(angle);
                                    const y = baseY - radius * Math.sin(angle);
                                    if (s === 0) ctx.moveTo(x, y);
                                    else ctx.lineTo(x, y);
                                }
                                ctx.stroke();

                                // Draw current point on base
                                const angle = 2 * Math.PI * windingNum * t;
                                const baseX = w/2 + radius * Math.cos(angle);
                                const baseYpos = baseY - radius * Math.sin(angle);
                                ctx.fillStyle = '#3fb950';
                                ctx.beginPath();
                                ctx.arc(baseX, baseYpos, 5, 0, 2*Math.PI);
                                ctx.fill();
                            }

                            // Draw covering space ℝ (top, as a line)
                            const coverY = h/4;
                            ctx.strokeStyle = '#8b949e';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(50, coverY);
                            ctx.lineTo(w - 50, coverY);
                            ctx.stroke();

                            ctx.fillStyle = '#c9d1d9';
                            ctx.fillText('ℝ (covering)', 20, coverY - 15);

                            // Mark integers on ℝ
                            const scale = 60;
                            for (let n = -3; n <= 3; n++) {
                                const x = w/2 + n * scale;
                                ctx.fillStyle = '#8b949e';
                                ctx.beginPath();
                                ctx.arc(x, coverY, 3, 0, 2*Math.PI);
                                ctx.fill();
                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '12px monospace';
                                ctx.fillText(n.toString(), x - 5, coverY - 10);
                            }

                            // Draw starting point (lift of basepoint)
                            ctx.fillStyle = '#f0883e';
                            ctx.beginPath();
                            ctx.arc(w/2, coverY, 5, 0, 2*Math.PI);
                            ctx.fill();

                            // Draw lifted path up to time t
                            if (animating && t > 0) {
                                ctx.strokeStyle = '#bc8cff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(w/2, coverY);
                                const liftedT = windingNum * t;
                                const liftX = w/2 + liftedT * scale;
                                ctx.lineTo(liftX, coverY);
                                ctx.stroke();

                                // Draw current point on cover
                                ctx.fillStyle = '#bc8cff';
                                ctx.beginPath();
                                ctx.arc(liftX, coverY, 5, 0, 2*Math.PI);
                                ctx.fill();

                                // Draw vertical projection line
                                ctx.strokeStyle = '#f0883e';
                                ctx.setLineDash([3, 3]);
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                const angle = 2 * Math.PI * windingNum * t;
                                const baseX = w/2 + radius * Math.cos(angle);
                                const baseYpos = baseY - radius * Math.sin(angle);
                                ctx.moveTo(liftX, coverY);
                                ctx.lineTo(baseX, baseYpos);
                                ctx.stroke();
                                ctx.setLineDash([]);
                            }

                            // Progress indicator
                            if (animating) {
                                ctx.fillStyle = '#8b949e';
                                ctx.font = '12px monospace';
                                ctx.fillText(`t = ${t.toFixed(2)}`, 20, h - 20);
                                ctx.fillText(`Endpoint: ${(windingNum * t).toFixed(2)}`, 150, h - 20);
                            }
                        }

                        function animate() {
                            if (!animating) return;
                            t += 0.01;
                            if (t > 1) {
                                t = 1;
                                animating = false;
                                playBtn.textContent = 'Animate Lift';
                            }
                            draw();
                            requestAnimationFrame(animate);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Use the lifting criterion to show that there is no continuous map \\(f: S^2 \\to S^1\\) that induces a surjection on \\(\\pi_1\\).',
                    hint: 'We have \\(\\pi_1(S^2) = 0\\) and \\(\\pi_1(S^1) = \\mathbb{Z}\\).',
                    solution: 'Since \\(\\pi_1(S^2) = 0\\), any map \\(f: S^2 \\to S^1\\) induces the trivial homomorphism \\(f_*: 0 \\to \\mathbb{Z}\\), which is not surjective. In fact, by obstruction theory, any such map is null-homotopic.'
                },
                {
                    question: 'Show that a loop \\(\\gamma: [0,1] \\to X\\) with \\(\\gamma(0) = \\gamma(1) = x_0\\) lifts to a loop in \\(\\tilde{X}\\) (i.e., \\(\\tilde{\\gamma}(0) = \\tilde{\\gamma}(1)\\)) if and only if \\([\\gamma] \\in p_*(\\pi_1(\\tilde{X}, \\tilde{x}_0))\\).',
                    hint: 'Use the path lifting property and uniqueness of lifts.',
                    solution: 'Let \\(\\tilde{\\gamma}\\) be the unique lift of \\(\\gamma\\) with \\(\\tilde{\\gamma}(0) = \\tilde{x}_0\\). If \\([\\gamma] = p_*([\\tilde{\\alpha}])\\) for some loop \\(\\tilde{\\alpha}\\) in \\(\\tilde{X}\\), then \\(\\gamma \\simeq_p p \\circ \\tilde{\\alpha}\\). By homotopy lifting, \\(\\tilde{\\gamma} \\simeq_p \\tilde{\\alpha}\\), so \\(\\tilde{\\gamma}(1) = \\tilde{\\alpha}(1) = \\tilde{x}_0\\). Conversely, if \\(\\tilde{\\gamma}\\) is a loop, then \\([\\gamma] = p_*([\\tilde{\\gamma}]) \\in p_*(\\pi_1(\\tilde{X}))\\).'
                },
                {
                    question: 'Let \\(p: \\tilde{X} \\to X\\) be a covering map with \\(\\tilde{X}\\) simply connected. Show that \\(p_*: \\pi_1(\\tilde{X}) \\to \\pi_1(X)\\) is injective.',
                    hint: 'If \\(\\tilde{X}\\) is simply connected, what is \\(\\pi_1(\\tilde{X})\\)?',
                    solution: 'If \\(\\tilde{X}\\) is simply connected, then \\(\\pi_1(\\tilde{X}) = 0\\), so \\(p_*\\) is the trivial map \\(0 \\to \\pi_1(X)\\). The zero map is always injective (vacuously).'
                }
            ]
        },

        {
            id: 'deck-transformations',
            title: 'Deck Transformations and Galois Correspondence',
            content: `
                <h2>Symmetries of Covering Spaces</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.10 (Deck Transformation)</div>
                    <div class="env-body">
                        <p>A <strong>deck transformation</strong> (or <em>covering transformation</em>) of a covering space \\(p: \\tilde{X} \\to X\\) is a homeomorphism \\(\\phi: \\tilde{X} \\to \\tilde{X}\\) such that \\(p \\circ \\phi = p\\). That is, \\(\\phi\\) permutes the sheets of the covering.</p>
                        <p>The set of all deck transformations forms a group under composition, denoted \\(\\text{Deck}(\\tilde{X} / X)\\) or \\(\\text{Aut}(p)\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.11 (Deck Transformations)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Universal cover of \\(S^1\\)</strong>: \\(p: \\mathbb{R} \\to S^1\\). Deck transformations are translations \\(\\phi_n(t) = t + n\\) for \\(n \\in \\mathbb{Z}\\). Thus \\(\\text{Deck}(\\mathbb{R} / S^1) \\cong \\mathbb{Z}\\).</li>
                            <li><strong>Double cover</strong>: \\(p: S^1 \\to S^1\\), \\(p(z) = z^2\\). The non-trivial deck transformation is \\(\\phi(z) = -z\\) (rotation by \\(\\pi\\)). Thus \\(\\text{Deck}(S^1 / S^1) \\cong \\mathbb{Z}/2\\mathbb{Z}\\).</li>
                            <li><strong>Figure-8 cover</strong>: The 4-valent tree \\(\\tilde{X} \\to S^1 \\vee S^1\\) has \\(\\text{Deck}(\\tilde{X} / S^1 \\vee S^1) \\cong \\pi_1(S^1 \\vee S^1) = F_2\\).</li>
                            <li><strong>Torus cover</strong>: \\(p: \\mathbb{R}^2 \\to T^2\\). Deck transformations are translations by integer vectors: \\(\\phi_{(m,n)}(x, y) = (x + m, y + n)\\). Thus \\(\\text{Deck}(\\mathbb{R}^2 / T^2) \\cong \\mathbb{Z}^2\\).</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="deck-transformation"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.12 (Deck Transformations and π₁)</div>
                    <div class="env-body">
                        <p>Let \\(p: (\\tilde{X}, \\tilde{x}_0) \\to (X, x_0)\\) be a covering map of path-connected, locally path-connected spaces. Then:
                        \\[\\text{Deck}(\\tilde{X} / X) \\cong N(p_*(\\pi_1(\\tilde{X}, \\tilde{x}_0))) / p_*(\\pi_1(\\tilde{X}, \\tilde{x}_0)),\\]
                        where \\(N(H)\\) denotes the normalizer of \\(H\\) in \\(\\pi_1(X, x_0)\\).</p>
                        <p>In particular, if \\(\\tilde{X}\\) is simply connected (universal cover), then:
                        \\[\\text{Deck}(\\tilde{X} / X) \\cong \\pi_1(X, x_0).\\]
                        </p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p>Each deck transformation \\(\\phi\\) is determined by where it sends the basepoint \\(\\tilde{x}_0\\). If \\(\\phi(\\tilde{x}_0) = \\tilde{x}_1\\), then there is a unique path \\(\\tilde{\\alpha}\\) in \\(\\tilde{X}\\) from \\(\\tilde{x}_0\\) to \\(\\tilde{x}_1\\). Projecting gives a loop \\(\\alpha = p \\circ \\tilde{\\alpha}\\) in \\(X\\).</p>
                        <p>The correspondence \\(\\phi \\leftrightarrow [\\alpha]\\) gives a bijection between \\(\\text{Deck}(\\tilde{X} / X)\\) and elements of \\(\\pi_1(X, x_0)\\) that "normalize" \\(p_*(\\pi_1(\\tilde{X}))\\). For the universal cover, \\(\\pi_1(\\tilde{X}) = 0\\), so every element of \\(\\pi_1(X)\\) corresponds to a deck transformation. See Hatcher, Proposition 1.39.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.13 (Galois Correspondence)</div>
                    <div class="env-body">
                        <p>Let \\(p: (\\tilde{X}, \\tilde{x}_0) \\to (X, x_0)\\) be the universal covering. There is a bijection:
                        \\[\\{\\text{covering spaces of } X\\} \\leftrightarrow \\{\\text{subgroups of } \\pi_1(X, x_0)\\},\\]
                        given by \\(p': \\tilde{X}' \\to X\\) corresponds to \\(p'_*(\\pi_1(\\tilde{X}', \\tilde{x}_0'))\\).</p>
                        <p>Under this correspondence:</p>
                        <ul>
                            <li>The number of sheets of \\(p'\\) equals the index \\([\\pi_1(X) : p'_*(\\pi_1(\\tilde{X}'))]\\)</li>
                            <li>Normal subgroups correspond to regular (Galois) coverings</li>
                            <li>\\(\\text{Deck}(\\tilde{X}' / X) \\cong \\pi_1(X) / p'_*(\\pi_1(\\tilde{X}'))\\) when \\(p'_*(\\pi_1(\\tilde{X}'))\\) is normal</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Analogy with Galois Theory)</div>
                    <div class="env-body">
                        <p>This theorem is analogous to the fundamental theorem of Galois theory, which relates field extensions to subgroups of the Galois group. Here, covering spaces play the role of field extensions, and subgroups of \\(\\pi_1(X)\\) play the role of subgroups of the Galois group.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'deck-transformation',
                    title: 'Deck Transformation Visualizer',
                    description: 'See how deck transformations act on covering spaces',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 350;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        let transform = 0; // Translation amount

                        const info = document.createElement('div');
                        info.style.marginTop = '10px';
                        info.style.color = '#c9d1d9';
                        info.innerHTML = 'Deck transformation: φ₀ (identity)';
                        body.appendChild(info);

                        const slider = document.createElement('input');
                        slider.type = 'range';
                        slider.min = -3;
                        slider.max = 3;
                        slider.value = 0;
                        slider.style.width = '300px';
                        slider.oninput = (e) => {
                            transform = parseInt(e.target.value);
                            info.innerHTML = `Deck transformation: φ<sub>${transform}</sub>(t) = t + ${transform}`;
                            draw();
                        };
                        controls.appendChild(slider);

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            const w = canvas.width;
                            const h = canvas.height;

                            // Draw ℝ (covering space)
                            const coverY = h/3;
                            ctx.strokeStyle = '#8b949e';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(50, coverY);
                            ctx.lineTo(w - 50, coverY);
                            ctx.stroke();

                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '14px monospace';
                            ctx.fillText('ℝ (covering space)', 20, coverY - 15);

                            // Mark integers
                            const scale = 60;
                            for (let n = -3; n <= 3; n++) {
                                const x = w/2 + n * scale;
                                ctx.fillStyle = '#8b949e';
                                ctx.beginPath();
                                ctx.arc(x, coverY, 3, 0, 2*Math.PI);
                                ctx.fill();
                                ctx.fillStyle = '#c9d1d9';
                                ctx.font = '12px monospace';
                                ctx.fillText(n.toString(), x - 5, coverY - 10);
                            }

                            // Draw a point before transformation
                            const testPoint = 0.5;
                            const beforeX = w/2 + testPoint * scale;
                            ctx.fillStyle = '#3fb950';
                            ctx.beginPath();
                            ctx.arc(beforeX, coverY, 6, 0, 2*Math.PI);
                            ctx.fill();
                            ctx.fillText('p', beforeX - 5, coverY + 20);

                            // Draw point after transformation
                            const afterPoint = testPoint + transform;
                            const afterX = w/2 + afterPoint * scale;
                            ctx.fillStyle = '#bc8cff';
                            ctx.beginPath();
                            ctx.arc(afterX, coverY, 6, 0, 2*Math.PI);
                            ctx.fill();
                            ctx.fillText('φ(p)', afterX - 10, coverY + 20);

                            // Draw arrow
                            if (transform !== 0) {
                                ctx.strokeStyle = '#f0883e';
                                ctx.fillStyle = '#f0883e';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(beforeX, coverY - 30);
                                ctx.lineTo(afterX, coverY - 30);
                                ctx.stroke();

                                // Arrowhead
                                const dir = Math.sign(transform);
                                ctx.beginPath();
                                ctx.moveTo(afterX, coverY - 30);
                                ctx.lineTo(afterX - dir * 8, coverY - 35);
                                ctx.lineTo(afterX - dir * 8, coverY - 25);
                                ctx.closePath();
                                ctx.fill();
                            }

                            // Draw S¹ (base space)
                            const baseY = 2*h/3;
                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(w/2, baseY, 60, 0, 2*Math.PI);
                            ctx.stroke();

                            ctx.fillStyle = '#c9d1d9';
                            ctx.fillText('S¹ (base space)', 20, baseY - 80);

                            // Project both points (they should be the same)
                            const angle = 2 * Math.PI * (testPoint % 1);
                            const projX = w/2 + 60 * Math.cos(angle);
                            const projY = baseY - 60 * Math.sin(angle);

                            ctx.fillStyle = '#f0883e';
                            ctx.beginPath();
                            ctx.arc(projX, projY, 5, 0, 2*Math.PI);
                            ctx.fill();

                            // Draw projection lines
                            ctx.strokeStyle = '#f0883e';
                            ctx.setLineDash([3, 3]);
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(beforeX, coverY);
                            ctx.lineTo(projX, projY);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(afterX, coverY);
                            ctx.lineTo(projX, projY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Explanation
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px sans-serif';
                            ctx.fillText('p(φ(x)) = p(x) for all x (deck transformation preserves fibers)', 20, h - 20);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Determine \\(\\text{Deck}(\\mathbb{R}^2 / T^2)\\) where \\(T^2 = \\mathbb{R}^2 / \\mathbb{Z}^2\\) is the torus.',
                    hint: 'Deck transformations of the universal cover are isomorphic to \\(\\pi_1(T^2)\\).',
                    solution: 'Since \\(\\mathbb{R}^2\\) is the universal cover of \\(T^2\\) and \\(\\pi_1(T^2) \\cong \\mathbb{Z}^2\\), we have \\(\\text{Deck}(\\mathbb{R}^2 / T^2) \\cong \\mathbb{Z}^2\\). The deck transformations are translations \\((x, y) \\mapsto (x + m, y + n)\\) for \\((m, n) \\in \\mathbb{Z}^2\\).'
                },
                {
                    question: 'Show that the deck transformation group of the \\(n\\)-fold cover \\(p: S^1 \\to S^1\\), \\(p(z) = z^n\\), is isomorphic to \\(\\mathbb{Z}/n\\mathbb{Z}\\).',
                    hint: 'Find all homeomorphisms \\(\\phi: S^1 \\to S^1\\) such that \\(p \\circ \\phi = p\\).',
                    solution: 'The deck transformations are rotations by \\(2\\pi k/n\\) for \\(k = 0, 1, \\ldots, n-1\\). These form a cyclic group of order \\(n\\), isomorphic to \\(\\mathbb{Z}/n\\mathbb{Z}\\). Algebraically, this corresponds to \\(\\pi_1(S^1) / n\\mathbb{Z} \\cong \\mathbb{Z}/n\\mathbb{Z}\\).'
                },
                {
                    question: 'Let \\(X = S^1 \\vee S^1\\) and \\(\\tilde{X}\\) be its universal cover (4-valent tree). Show that \\(\\text{Deck}(\\tilde{X} / X) \\cong F_2\\), the free group on two generators.',
                    hint: 'Use the fact that \\(\\pi_1(S^1 \\vee S^1) \\cong F_2\\) and \\(\\tilde{X}\\) is simply connected.',
                    solution: 'Since \\(\\tilde{X}\\) is the universal cover, \\(\\text{Deck}(\\tilde{X} / X) \\cong \\pi_1(X) = F_2\\). Each generator \\(a, b \\in F_2\\) acts as a deck transformation, shifting the tree along the corresponding edge. The tree is the Cayley graph of \\(F_2\\).'
                },
                {
                    question: 'Prove that if \\(p: \\tilde{X} \\to X\\) is a covering map and \\(\\phi\\) is a deck transformation, then \\(\\phi\\) is determined by its value at a single point.',
                    hint: 'Use uniqueness of path lifting.',
                    solution: 'Let \\(\\phi, \\psi\\) be deck transformations with \\(\\phi(\\tilde{x}_0) = \\psi(\\tilde{x}_0)\\). For any \\(\\tilde{x} \\in \\tilde{X}\\), let \\(\\tilde{\\gamma}\\) be a path from \\(\\tilde{x}_0\\) to \\(\\tilde{x}\\). Then \\(\\phi \\circ \\tilde{\\gamma}\\) and \\(\\psi \\circ \\tilde{\\gamma}\\) are both lifts of \\(p \\circ \\tilde{\\gamma}\\) starting at \\(\\phi(\\tilde{x}_0) = \\psi(\\tilde{x}_0)\\). By uniqueness, \\(\\phi \\circ \\tilde{\\gamma} = \\psi \\circ \\tilde{\\gamma}\\), so \\(\\phi(\\tilde{x}) = \\psi(\\tilde{x})\\). Thus \\(\\phi = \\psi\\).'
                },
                {
                    question: 'Show that a covering space \\(p: \\tilde{X} \\to X\\) is <strong>regular</strong> (or <em>normal</em> or <em>Galois</em>) if and only if \\(p_*(\\pi_1(\\tilde{X}))\\) is a normal subgroup of \\(\\pi_1(X)\\).',
                    hint: 'A covering is regular if the deck transformation group acts transitively on fibers.',
                    solution: 'By definition, \\(p\\) is regular if \\(\\text{Deck}(\\tilde{X} / X)\\) acts transitively on each fiber. This happens if and only if \\(p_*(\\pi_1(\\tilde{X}))\\) is normal in \\(\\pi_1(X)\\). In this case, \\(\\text{Deck}(\\tilde{X} / X) \\cong \\pi_1(X) / p_*(\\pi_1(\\tilde{X}))\\). See Hatcher, Proposition 1.39.'
                }
            ]
        },

        {
            id: 'universal-covers',
            title: 'Universal Covering Spaces',
            content: `
                <h2>The Universal Cover</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 3.14 (Universal Cover - Revisited)</div>
                    <div class="env-body">
                        <p>A covering space \\(p: \\tilde{X} \\to X\\) is <strong>universal</strong> if \\(\\tilde{X}\\) is simply connected. Equivalently, \\(p\\) is universal if for any other covering \\(p': X' \\to X\\), there exists a covering map \\(q: \\tilde{X} \\to X'\\) such that \\(p = p' \\circ q\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.15 (Existence and Uniqueness of Universal Covers)</div>
                    <div class="env-body">
                        <p>If \\(X\\) is path-connected, locally path-connected, and semilocally simply connected, then \\(X\\) has a universal covering space, unique up to isomorphism of covering spaces.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch (Construction)</div>
                    <div class="env-body">
                        <p>Define \\(\\tilde{X}\\) to be the set of homotopy classes of paths in \\(X\\) starting at \\(x_0\\). The topology on \\(\\tilde{X}\\) is generated by sets \\(U([\\gamma])\\) of paths homotopic to \\(\\gamma * \\alpha\\) for \\(\\alpha\\) in an evenly covered neighborhood.</p>
                        <p>The projection \\(p: \\tilde{X} \\to X\\) sends \\([\\gamma]\\) to \\(\\gamma(1)\\). One can verify:</p>
                        <ol>
                            <li>\\(p\\) is a covering map</li>
                            <li>\\(\\tilde{X}\\) is path-connected (paths in \\(\\tilde{X}\\) are homotopy classes of homotopies)</li>
                            <li>\\(\\tilde{X}\\) is simply connected (any loop in \\(\\tilde{X}\\) projects to a null-homotopic loop in \\(X\\))</li>
                        </ol>
                        <p>Uniqueness follows from the lifting criterion. See Hatcher, §1.3 for full details.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.16 (Explicit Universal Covers)</div>
                    <div class="env-body">
                        <ul>
                            <li>\\(\\tilde{S^1} = \\mathbb{R}\\) with \\(p(t) = e^{2\\pi i t}\\)</li>
                            <li>\\(\\tilde{T^2} = \\mathbb{R}^2\\) with \\(p(x, y) = (e^{2\\pi i x}, e^{2\\pi i y})\\)</li>
                            <li>\\(\\widetilde{S^1 \\vee S^1}\\) = 4-valent tree</li>
                            <li>\\(\\widetilde{\\mathbb{R}P^2}\\) = \\(S^2\\) (2-fold cover)</li>
                            <li>\\(\\tilde{K}\\) = \\(\\mathbb{R}^2\\) (universal cover of Klein bottle)</li>
                            <li>\\(\\widetilde{\\Sigma_g}\\) = hyperbolic plane \\(\\mathbb{H}^2\\) (for genus \\(g \\ge 2\\))</li>
                        </ul>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="universal-cover-builder"></div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.17 (Computing π₁ via Universal Covers)</div>
                    <div class="env-body">
                        <p>If \\(p: \\tilde{X} \\to X\\) is the universal cover, then
                        \\[\\pi_1(X, x_0) \\cong \\text{Deck}(\\tilde{X} / X).\\]
                        This gives a geometric way to compute \\(\\pi_1(X)\\): build the universal cover and study its symmetries.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Non-Examples)</div>
                    <div class="env-body">
                        <p>Not all spaces have universal covers. The <strong>Hawaiian earring</strong> \\(\\bigcup_{n=1}^\\infty C_n\\) (infinite wedge of circles of decreasing radii) is not semilocally simply connected, so it has no universal cover. Its fundamental group is <em>not</em> the free group on countably many generators—it's much larger and not even countable!</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'universal-cover-builder',
                    title: 'Universal Cover Builder',
                    description: 'Build universal covers of common spaces',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 350;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        let space = 'circle';

                        const info = document.createElement('div');
                        info.style.marginTop = '10px';
                        info.style.color = '#c9d1d9';
                        info.innerHTML = 'Space: S¹, Universal cover: ℝ, Deck group: ℤ';
                        body.appendChild(info);

                        const btn1 = document.createElement('button');
                        btn1.textContent = 'S¹';
                        btn1.onclick = () => {
                            space = 'circle';
                            info.innerHTML = 'Space: S¹, Universal cover: ℝ, Deck group: ℤ';
                            draw();
                        };
                        controls.appendChild(btn1);

                        const btn2 = document.createElement('button');
                        btn2.textContent = 'T²';
                        btn2.onclick = () => {
                            space = 'torus';
                            info.innerHTML = 'Space: T² (torus), Universal cover: ℝ², Deck group: ℤ²';
                            draw();
                        };
                        controls.appendChild(btn2);

                        const btn3 = document.createElement('button');
                        btn3.textContent = 'S¹ ∨ S¹';
                        btn3.onclick = () => {
                            space = 'figure8';
                            info.innerHTML = 'Space: S¹ ∨ S¹, Universal cover: 4-valent tree, Deck group: F₂';
                            draw();
                        };
                        controls.appendChild(btn3);

                        const btn4 = document.createElement('button');
                        btn4.textContent = 'ℝP²';
                        btn4.onclick = () => {
                            space = 'rp2';
                            info.innerHTML = 'Space: ℝP², Universal cover: S² (2-fold), Deck group: ℤ/2ℤ';
                            draw();
                        };
                        controls.appendChild(btn4);

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            const w = canvas.width;
                            const h = canvas.height;

                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '16px monospace';

                            if (space === 'circle') {
                                // Universal cover: line
                                ctx.fillText('ℝ', 20, h/3 - 20);
                                ctx.strokeStyle = '#8b949e';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(50, h/3);
                                ctx.lineTo(w - 50, h/3);
                                ctx.stroke();

                                // Base: circle
                                ctx.fillText('S¹', 20, 2*h/3 - 60);
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(w/2, 2*h/3, 50, 0, 2*Math.PI);
                                ctx.stroke();

                            } else if (space === 'torus') {
                                // Universal cover: plane (grid)
                                ctx.fillText('ℝ²', 20, 40);
                                ctx.strokeStyle = '#8b949e';
                                ctx.lineWidth = 1;
                                for (let i = -2; i <= 2; i++) {
                                    ctx.beginPath();
                                    ctx.moveTo(w/2 + i * 35, 70);
                                    ctx.lineTo(w/2 + i * 35, 70 + 140);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(w/2 - 70, 70 + 70 + i * 35);
                                    ctx.lineTo(w/2 + 70, 70 + 70 + i * 35);
                                    ctx.stroke();
                                }

                                // Base: torus
                                ctx.fillText('T²', 20, h - 100);
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.ellipse(w/2, h - 50, 60, 35, 0, 0, 2*Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.ellipse(w/2, h - 50, 35, 60, 0, 0, 2*Math.PI);
                                ctx.stroke();

                            } else if (space === 'figure8') {
                                // Universal cover: tree
                                ctx.fillText('4-valent tree', 20, 40);
                                drawSmallTree(ctx, w/2, 120, 2);

                                // Base: figure-8
                                ctx.fillText('S¹ ∨ S¹', 20, h - 100);
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(w/2 - 40, h - 50, 30, 0, 2*Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.arc(w/2 + 40, h - 50, 30, 0, 2*Math.PI);
                                ctx.stroke();

                            } else {
                                // Universal cover: sphere
                                ctx.fillText('S²', 20, h/3 - 40);
                                ctx.strokeStyle = '#3fb950';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(w/2, h/3, 50, 0, 2*Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.ellipse(w/2, h/3, 50, 15, 0, 0, 2*Math.PI);
                                ctx.stroke();

                                // Base: RP²
                                ctx.fillText('ℝP²', 20, 2*h/3 - 40);
                                ctx.strokeStyle = '#58a6ff';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(w/2, 2*h/3, 50, 0, Math.PI);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.ellipse(w/2, 2*h/3, 50, 15, 0, 0, 2*Math.PI);
                                ctx.stroke();
                            }
                        }

                        function drawSmallTree(ctx, x, y, depth) {
                            if (depth === 0) return;
                            const len = 25;
                            const angles = [-Math.PI/2, -Math.PI/2 - Math.PI/4, -Math.PI/2 + Math.PI/4];

                            angles.forEach(angle => {
                                const x2 = x + len * Math.cos(angle);
                                const y2 = y + len * Math.sin(angle);
                                ctx.strokeStyle = '#bc8cff';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(x, y);
                                ctx.lineTo(x2, y2);
                                ctx.stroke();
                                drawSmallTree(ctx, x2, y2, depth - 1);
                            });
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the universal cover of \\(\\mathbb{R}P^2\\) is \\(S^2\\).',
                    hint: 'Use the covering map \\(p: S^2 \\to \\mathbb{R}P^2\\) that identifies antipodal points.',
                    solution: '\\(S^2\\) is simply connected and the map \\(p: S^2 \\to \\mathbb{R}P^2\\) (identifying antipodal points) is a 2-fold covering. By uniqueness of universal covers, \\(S^2 = \\widetilde{\\mathbb{R}P^2}\\). We have \\(\\pi_1(\\mathbb{R}P^2) \\cong \\text{Deck}(S^2 / \\mathbb{R}P^2) \\cong \\mathbb{Z}/2\\mathbb{Z}\\).'
                },
                {
                    question: 'Prove that the universal cover of a wedge of \\(n\\) circles is a \\(2n\\)-valent tree.',
                    hint: 'Each vertex should have \\(2n\\) edges (one in each direction for each circle).',
                    solution: 'The fundamental group is \\(\\pi_1(\\bigvee_{i=1}^n S^1) \\cong F_n\\) (free group on \\(n\\) generators). The universal cover is the Cayley graph of \\(F_n\\) with respect to the standard generators, which is a \\(2n\\)-valent tree (each vertex has degree \\(2n\\)).'
                },
                {
                    question: 'What is the universal cover of the Klein bottle \\(K\\)?',
                    hint: 'The Klein bottle is a quotient of \\(\\mathbb{R}^2\\) by a different lattice action than the torus.',
                    solution: 'The universal cover of \\(K\\) is \\(\\mathbb{R}^2\\), just like the torus. The difference is in the deck transformation group: for \\(K\\), we have \\(\\text{Deck}(\\mathbb{R}^2 / K) \\cong \\pi_1(K) \\cong \\langle a, b \\mid aba^{-1}b = 1 \\rangle\\), which is non-abelian. For the torus, the deck group is \\(\\mathbb{Z}^2\\) (abelian).'
                }
            ]
        },

        {
            id: 'classification',
            title: 'Classification of Covering Spaces',
            content: `
                <h2>The Fundamental Theorem of Covering Spaces</h2>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 3.18 (Classification of Covering Spaces)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be path-connected, locally path-connected, and semilocally simply connected, with basepoint \\(x_0\\). Then there is a bijection:
                        \\[\\{\\text{isomorphism classes of path-connected covering spaces of } X\\}\\]
                        \\[\\updownarrow\\]
                        \\[\\{\\text{conjugacy classes of subgroups of } \\pi_1(X, x_0)\\}.\\]
                        </p>
                        <p>More precisely, a covering \\(p: (\\tilde{X}, \\tilde{x}_0) \\to (X, x_0)\\) corresponds to the subgroup \\(H = p_*(\\pi_1(\\tilde{X}, \\tilde{x}_0)) \\subseteq \\pi_1(X, x_0)\\).</p>
                        <p>Under this correspondence:</p>
                        <ul>
                            <li>The number of sheets equals the index \\([\\pi_1(X, x_0) : H]\\)</li>
                            <li>\\(H\\) is normal iff the covering is regular (Galois)</li>
                            <li>For regular coverings, \\(\\text{Deck}(\\tilde{X} / X) \\cong \\pi_1(X, x_0) / H\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.19 (Coverings of S¹)</div>
                    <div class="env-body">
                        <p>Since \\(\\pi_1(S^1) \\cong \\mathbb{Z}\\), subgroups are \\(n\\mathbb{Z}\\) for \\(n \\ge 0\\). These correspond to:</p>
                        <ul>
                            <li>\\(n = 0\\): \\(\\{0\\}\\) → trivial subgroup → universal cover \\(\\mathbb{R} \\to S^1\\) (infinite sheets)</li>
                            <li>\\(n = 1\\): \\(\\mathbb{Z}\\) → whole group → identity covering \\(S^1 \\to S^1\\) (1 sheet)</li>
                            <li>\\(n \\ge 2\\): \\(n\\mathbb{Z}\\) → index \\(n\\) subgroup → \\(n\\)-fold covering \\(S^1 \\xrightarrow{z \\mapsto z^n} S^1\\)</li>
                        </ul>
                        <p>All coverings of \\(S^1\\) are of this form! All subgroups of \\(\\mathbb{Z}\\) are normal, so all coverings are regular.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 3.20 (Coverings of Figure-8)</div>
                    <div class="env-body">
                        <p>Since \\(\\pi_1(S^1 \\vee S^1) \\cong F_2\\) (free group on two generators \\(a, b\\)), subgroups are more complicated. Some examples:</p>
                        <ul>
                            <li>\\(\\{1\\}\\) → universal cover (4-valent tree)</li>
                            <li>\\(\\langle a \\rangle \\cong \\mathbb{Z}\\) → covering space is \\(S^1 \\vee \\bigvee_{\\mathbb{Z}} S^1\\) (circle with countably many circles attached)</li>
                            <li>\\(\\langle a^2, b \\rangle\\) → index 2 subgroup → 2-sheeted cover</li>
                            <li>\\(F_2\\) itself → identity covering</li>
                        </ul>
                        <p>Most subgroups of \\(F_2\\) are <em>not</em> normal, so most coverings of \\(S^1 \\vee S^1\\) are not regular.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Applications)</div>
                    <div class="env-body">
                        <p>This classification theorem is powerful because it reduces topological questions about covering spaces to algebraic questions about subgroups. For example:</p>
                        <ul>
                            <li>Counting coverings → counting subgroups</li>
                            <li>Understanding deck transformations → studying quotients \\(\\pi_1(X) / H\\)</li>
                            <li>Lifting problems → subgroup inclusion \\(f_*(\\pi_1(Y)) \\subseteq p_*(\\pi_1(\\tilde{X}))\\)</li>
                        </ul>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'List all connected covering spaces of \\(S^1\\) with at most 5 sheets.',
                    hint: 'These correspond to subgroups of \\(\\mathbb{Z}\\) of index at most 5.',
                    solution: 'The subgroups are \\(\\mathbb{Z}, 2\\mathbb{Z}, 3\\mathbb{Z}, 4\\mathbb{Z}, 5\\mathbb{Z}\\), corresponding to the coverings \\(S^1 \\xrightarrow{\\text{id}} S^1\\) (1 sheet), \\(S^1 \\xrightarrow{z^2} S^1\\) (2 sheets), \\(S^1 \\xrightarrow{z^3} S^1\\) (3 sheets), \\(S^1 \\xrightarrow{z^4} S^1\\) (4 sheets), \\(S^1 \\xrightarrow{z^5} S^1\\) (5 sheets).'
                },
                {
                    question: 'How many 2-sheeted connected covering spaces does \\(S^1 \\vee S^1\\) have?',
                    hint: 'Count index-2 subgroups of \\(F_2 = \\langle a, b \\rangle\\). These are in bijection with surjections \\(F_2 \\to \\mathbb{Z}/2\\mathbb{Z}\\).',
                    solution: 'A surjection \\(F_2 \\to \\mathbb{Z}/2\\mathbb{Z}\\) is determined by the images of \\(a\\) and \\(b\\), which can each be 0 or 1 (but not both 0). This gives \\(2^2 - 1 = 3\\) surjections: \\((a, b) \\mapsto (1, 0), (0, 1), (1, 1)\\). These correspond to 3 conjugacy classes of index-2 subgroups, hence <strong>3 non-isomorphic 2-sheeted coverings</strong> of \\(S^1 \\vee S^1\\).'
                },
                {
                    question: 'Let \\(X = T^2\\) (torus). Describe the covering space corresponding to the subgroup \\(2\\mathbb{Z} \\times \\mathbb{Z} \\subseteq \\mathbb{Z}^2 = \\pi_1(T^2)\\).',
                    hint: 'This subgroup has index 2. The covering space is a quotient of \\(\\mathbb{R}^2\\) by the subgroup.',
                    solution: 'The covering space is \\(\\mathbb{R}^2 / (2\\mathbb{Z} \\times \\mathbb{Z}) \\cong S^1 \\times \\mathbb{R} / \\mathbb{Z} = S^1 \\times S^1\\), which is again a torus! However, the covering map \\(T^2 \\to T^2\\) is \\((z, w) \\mapsto (z^2, w)\\), a 2-sheeted covering. Geometrically, it "wraps twice" around one direction of the torus.'
                },
                {
                    question: 'Prove that there are infinitely many non-isomorphic covering spaces of \\(S^1 \\vee S^1\\).',
                    hint: 'Show that \\(F_2\\) has infinitely many subgroups of different index.',
                    solution: 'For each \\(n \\ge 1\\), there is a subgroup of \\(F_2\\) of index \\(n\\) (e.g., the kernel of the map \\(F_2 \\to \\mathbb{Z}/n\\mathbb{Z}\\) sending \\(a \\mapsto 1, b \\mapsto 0\\)). These give infinitely many non-isomorphic covering spaces, since they have different numbers of sheets.'
                },
                {
                    question: 'Let \\(G\\) be a finite group. Show that there exists a finite CW complex \\(X\\) with \\(\\pi_1(X) \\cong G\\).',
                    hint: 'Use a presentation of \\(G\\) and build \\(X\\) as a CW complex with one 0-cell, one 1-cell per generator, and one 2-cell per relation.',
                    solution: 'Given a presentation \\(G = \\langle g_1, \\ldots, g_n \\mid r_1, \\ldots, r_m \\rangle\\), build \\(X\\) with one vertex, \\(n\\) edges (one per generator), and \\(m\\) 2-cells (one per relation). The 1-skeleton is \\(\\bigvee_{i=1}^n S^1\\) with \\(\\pi_1 \\cong F_n\\). Attaching 2-cells according to the relations gives \\(\\pi_1(X) \\cong F_n / \\langle r_1, \\ldots, r_m \\rangle \\cong G\\). Since \\(G\\) is finite, the presentation is finite, so \\(X\\) is a finite CW complex.'
                }
            ]
        }
    ]
});
