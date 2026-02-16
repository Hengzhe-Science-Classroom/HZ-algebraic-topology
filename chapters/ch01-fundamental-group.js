window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Homotopy and the Fundamental Group',
    subtitle: 'Paths, loops, and π₁',
    sections: [
        {
            id: 'paths-homotopy',
            title: 'Paths and Homotopy',
            content: `
                <h2>Paths in Topological Spaces</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.1 (Path)</div>
                    <div class="env-body">
                        <p>A <strong>path</strong> in \\(X\\) from \\(x_0\\) to \\(x_1\\) is a continuous map \\(\\gamma: [0,1] \\to X\\) with \\(\\gamma(0) = x_0\\) and \\(\\gamma(1) = x_1\\).</p>
                        <p>A <strong>loop</strong> based at \\(x_0\\) is a path with \\(\\gamma(0) = \\gamma(1) = x_0\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.2 (Path Homotopy)</div>
                    <div class="env-body">
                        <p>Two paths \\(\\gamma_0, \\gamma_1: [0,1] \\to X\\) with the same endpoints are <strong>path homotopic</strong> (written \\(\\gamma_0 \\simeq_p \\gamma_1\\)) if there exists a continuous map \\(H: [0,1] \\times [0,1] \\to X\\) such that:</p>
                        <ul>
                            <li>\\(H(s, 0) = \\gamma_0(s)\\) and \\(H(s, 1) = \\gamma_1(s)\\) for all \\(s \\in [0,1]\\)</li>
                            <li>\\(H(0, t) = x_0\\) and \\(H(1, t) = x_1\\) for all \\(t \\in [0,1]\\) (endpoints fixed)</li>
                        </ul>
                        <p>Think of \\(H(s, t)\\) as a continuous family of paths \\(\\gamma_t(s) = H(s, t)\\) deforming \\(\\gamma_0\\) into \\(\\gamma_1\\).</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="path-homotopy"></div>

                <div class="env-block proposition">
                    <div class="env-title">Proposition 1.3</div>
                    <div class="env-body">
                        <p>Path homotopy is an equivalence relation on the set of paths from \\(x_0\\) to \\(x_1\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Reflexive:</strong> \\(H(s, t) = \\gamma(s)\\) (constant homotopy).</p>
                        <p><strong>Symmetric:</strong> If \\(H\\) is a homotopy from \\(\\gamma_0\\) to \\(\\gamma_1\\), then \\(H'(s, t) = H(s, 1-t)\\) is a homotopy from \\(\\gamma_1\\) to \\(\\gamma_0\\).</p>
                        <p><strong>Transitive:</strong> If \\(H\\) is a homotopy from \\(\\gamma_0\\) to \\(\\gamma_1\\) and \\(K\\) from \\(\\gamma_1\\) to \\(\\gamma_2\\), define
                        \\[H * K(s, t) = \\begin{cases} H(s, 2t) & 0 \\le t \\le 1/2 \\\\ K(s, 2t-1) & 1/2 \\le t \\le 1 \\end{cases}\\]
                        This is continuous by the pasting lemma.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.4 (Path Composition)</div>
                    <div class="env-body">
                        <p>If \\(\\gamma: [0,1] \\to X\\) is a path from \\(x_0\\) to \\(x_1\\) and \\(\\eta: [0,1] \\to X\\) is a path from \\(x_1\\) to \\(x_2\\), the <strong>composition</strong> \\(\\gamma * \\eta\\) is the path from \\(x_0\\) to \\(x_2\\) defined by:
                        \\[(\\gamma * \\eta)(s) = \\begin{cases} \\gamma(2s) & 0 \\le s \\le 1/2 \\\\ \\eta(2s - 1) & 1/2 \\le s \\le 1 \\end{cases}\\]
                        (Traverse \\(\\gamma\\) at double speed, then \\(\\eta\\) at double speed.)</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Path Composition is Associative up to Homotopy)</div>
                    <div class="env-body">
                        <p>Composition of paths is <em>not</em> strictly associative: \\((\\gamma * \\eta) * \\zeta \\neq \\gamma * (\\eta * \\zeta)\\) as functions. However, they are path homotopic! This will make the fundamental group a group (not just a set).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'path-homotopy',
                    title: 'Path Homotopy Animator',
                    description: 'Drag control points to deform one path into another',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 350;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        let t = 0;
                        let animating = false;

                        // Define two paths: γ₀ (top arc) and γ₁ (bottom arc)
                        const x0 = 50, x1 = canvas.width - 50;
                        const y = canvas.height / 2;

                        const pathLabel = document.createElement('div');
                        pathLabel.style.marginTop = '10px';
                        pathLabel.style.color = '#c9d1d9';
                        pathLabel.textContent = 't = 0.00 (path γ₀)';
                        body.appendChild(pathLabel);

                        const slider = document.createElement('input');
                        slider.type = 'range';
                        slider.min = 0;
                        slider.max = 100;
                        slider.value = 0;
                        slider.style.width = '300px';
                        slider.oninput = (e) => {
                            t = e.target.value / 100;
                            draw();
                            pathLabel.textContent = `t = ${t.toFixed(2)} (interpolating γ₀ → γ₁)`;
                        };
                        controls.appendChild(slider);

                        const playBtn = document.createElement('button');
                        playBtn.textContent = 'Animate Homotopy';
                        playBtn.onclick = () => {
                            animating = !animating;
                            if (animating) {
                                playBtn.textContent = 'Stop';
                                animate();
                            } else {
                                playBtn.textContent = 'Animate Homotopy';
                            }
                        };
                        controls.appendChild(playBtn);

                        function interpolate(a, b, t) {
                            return a + t * (b - a);
                        }

                        function gamma0(s) {
                            // Top arc
                            const x = interpolate(x0, x1, s);
                            const y_offset = -80 * Math.sin(Math.PI * s);
                            return {x, y: y + y_offset};
                        }

                        function gamma1(s) {
                            // Bottom arc
                            const x = interpolate(x0, x1, s);
                            const y_offset = 80 * Math.sin(Math.PI * s);
                            return {x, y: y + y_offset};
                        }

                        function homotopy(s, t) {
                            const p0 = gamma0(s);
                            const p1 = gamma1(s);
                            return {
                                x: interpolate(p0.x, p1.x, t),
                                y: interpolate(p0.y, p1.y, t)
                            };
                        }

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            // Draw endpoints
                            ctx.fillStyle = '#f0883e';
                            ctx.beginPath();
                            ctx.arc(x0, y, 6, 0, 2*Math.PI);
                            ctx.fill();
                            ctx.beginPath();
                            ctx.arc(x1, y, 6, 0, 2*Math.PI);
                            ctx.fill();

                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '14px monospace';
                            ctx.fillText('x₀', x0 - 20, y + 5);
                            ctx.fillText('x₁', x1 + 10, y + 5);

                            // Draw the current path γₜ
                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (let s = 0; s <= 1; s += 0.01) {
                                const p = homotopy(s, t);
                                if (s === 0) ctx.moveTo(p.x, p.y);
                                else ctx.lineTo(p.x, p.y);
                            }
                            ctx.stroke();

                            // Draw reference paths (faded)
                            ctx.globalAlpha = 0.3;
                            ctx.strokeStyle = '#3fb950';
                            ctx.beginPath();
                            for (let s = 0; s <= 1; s += 0.01) {
                                const p = gamma0(s);
                                if (s === 0) ctx.moveTo(p.x, p.y);
                                else ctx.lineTo(p.x, p.y);
                            }
                            ctx.stroke();

                            ctx.strokeStyle = '#bc8cff';
                            ctx.beginPath();
                            for (let s = 0; s <= 1; s += 0.01) {
                                const p = gamma1(s);
                                if (s === 0) ctx.moveTo(p.x, p.y);
                                else ctx.lineTo(p.x, p.y);
                            }
                            ctx.stroke();

                            ctx.globalAlpha = 1.0;

                            // Labels
                            ctx.fillStyle = '#3fb950';
                            ctx.fillText('γ₀ (top)', canvas.width/2 - 30, y - 90);
                            ctx.fillStyle = '#bc8cff';
                            ctx.fillText('γ₁ (bottom)', canvas.width/2 - 40, y + 105);
                        }

                        function animate() {
                            if (!animating) return;
                            t += 0.01;
                            if (t > 1) t = 0;
                            slider.value = t * 100;
                            pathLabel.textContent = `t = ${t.toFixed(2)} (interpolating γ₀ → γ₁)`;
                            draw();
                            requestAnimationFrame(animate);
                        }

                        draw();

                        return {
                            stopAnimation: () => { animating = false; }
                        };
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that path composition \\(*\\) is associative up to path homotopy: \\((\\gamma * \\eta) * \\zeta \\simeq_p \\gamma * (\\eta * \\zeta)\\).',
                    hint: 'Both sides traverse \\(\\gamma\\), then \\(\\eta\\), then \\(\\zeta\\), just at different speeds. Construct a linear reparametrization homotopy.',
                    solution: 'Define \\(H(s, t)\\) to interpolate between the two parametrizations. For \\(t \\in [0, 1]\\), adjust the breakpoints from \\((1/4, 1/2)\\) (for \\((\\gamma * \\eta) * \\zeta\\)) to \\((1/2, 3/4)\\) (for \\(\\gamma * (\\eta * \\zeta)\\)). Details are in Hatcher, p. 26.'
                },
                {
                    question: 'Prove that if \\(\\gamma_0 \\simeq_p \\gamma_1\\) and \\(\\eta_0 \\simeq_p \\eta_1\\), then \\(\\gamma_0 * \\eta_0 \\simeq_p \\gamma_1 * \\eta_1\\).',
                    hint: 'Use the fact that \\(\\simeq_p\\) is an equivalence relation and composition respects homotopy.',
                    solution: 'Let \\(H\\) be a homotopy from \\(\\gamma_0\\) to \\(\\gamma_1\\) and \\(K\\) from \\(\\eta_0\\) to \\(\\eta_1\\). Define \\(F(s, t) = H(s, t) * K(s, t)\\) (composition of the intermediate paths). Then \\(F\\) is a path homotopy from \\(\\gamma_0 * \\eta_0\\) to \\(\\gamma_1 * \\eta_1\\).'
                }
            ]
        },

        {
            id: 'fundamental-group',
            title: 'The Fundamental Group π₁(X, x₀)',
            content: `
                <h2>Loops and the Group Structure</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 1.5 (Fundamental Group)</div>
                    <div class="env-body">
                        <p>Fix a basepoint \\(x_0 \\in X\\). The <strong>fundamental group</strong> \\(\\pi_1(X, x_0)\\) is the set of path homotopy classes of loops based at \\(x_0\\), with group operation given by path composition:</p>
                        <p style="text-align:center;">\\([\\gamma] \\cdot [\\eta] = [\\gamma * \\eta]\\)</p>
                        <p>The identity element is the constant loop \\(c_{x_0}(s) = x_0\\), and the inverse of \\([\\gamma]\\) is \\([\\bar{\\gamma}]\\) where \\(\\bar{\\gamma}(s) = \\gamma(1 - s)\\) (reverse path).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.6 (π₁ is a Group)</div>
                    <div class="env-body">
                        <p>\\(\\pi_1(X, x_0)\\) with the operation \\([\\gamma] \\cdot [\\eta] = [\\gamma * \\eta]\\) is a group.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Sketch</div>
                    <div class="env-body">
                        <p><strong>Well-defined:</strong> If \\(\\gamma_0 \\simeq_p \\gamma_1\\) and \\(\\eta_0 \\simeq_p \\eta_1\\), then \\(\\gamma_0 * \\eta_0 \\simeq_p \\gamma_1 * \\eta_1\\) (previous exercise).</p>
                        <p><strong>Associativity:</strong> \\((\\gamma * \\eta) * \\zeta \\simeq_p \\gamma * (\\eta * \\zeta)\\) (shown via reparametrization).</p>
                        <p><strong>Identity:</strong> \\(c_{x_0} * \\gamma \\simeq_p \\gamma \\simeq_p \\gamma * c_{x_0}\\) (constant path does nothing).</p>
                        <p><strong>Inverse:</strong> \\(\\gamma * \\bar{\\gamma} \\simeq_p c_{x_0}\\) (forward then backward path is homotopic to standing still).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="fundamental-group"></div>

                <div class="env-block example">
                    <div class="env-title">Example 1.7 (Contractible Spaces)</div>
                    <div class="env-body">
                        <p>If \\(X\\) is <strong>contractible</strong> (homotopy equivalent to a point), then \\(\\pi_1(X, x_0) = 0\\) (trivial group). For instance, \\(\\pi_1(\\mathbb{R}^n, 0) = 0\\) because any loop can be shrunk to a point.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 1.8 (Fundamental Group of S¹)</div>
                    <div class="env-body">
                        <p>We will soon prove \\(\\pi_1(S^1, 1) \\cong \\mathbb{Z}\\). The generator is the loop that winds once around the circle. Winding \\(n\\) times (\\(n > 0\\)) or \\(-n\\) times (\\(n < 0\\)) gives the element \\(n \\in \\mathbb{Z}\\).</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'fundamental-group',
                    title: 'Fundamental Group Visualizer',
                    description: 'Draw loops and see their composition',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 400;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        const centerX = canvas.width / 2;
                        const centerY = canvas.height / 2;
                        const radius = 80;

                        let loops = [];
                        let currentLoop = [];
                        let drawing = false;

                        const info = document.createElement('div');
                        info.style.marginTop = '10px';
                        info.style.color = '#c9d1d9';
                        info.textContent = 'Draw loops with mouse. Click "Compose" to multiply.';
                        body.appendChild(info);

                        const composeBtn = document.createElement('button');
                        composeBtn.textContent = 'Compose All Loops';
                        composeBtn.onclick = () => {
                            if (loops.length > 0) {
                                alert(`Composed ${loops.length} loop(s). In π₁, this is [γ₁] · [γ₂] · ... = [γ₁ * γ₂ * ...]`);
                                loops = [];
                                draw();
                            }
                        };
                        controls.appendChild(composeBtn);

                        const clearBtn = document.createElement('button');
                        clearBtn.textContent = 'Clear';
                        clearBtn.onclick = () => {
                            loops = [];
                            currentLoop = [];
                            draw();
                        };
                        controls.appendChild(clearBtn);

                        canvas.addEventListener('mousedown', (e) => {
                            drawing = true;
                            const rect = canvas.getBoundingClientRect();
                            currentLoop = [{x: e.clientX - rect.left, y: e.clientY - rect.top}];
                        });

                        canvas.addEventListener('mousemove', (e) => {
                            if (!drawing) return;
                            const rect = canvas.getBoundingClientRect();
                            currentLoop.push({x: e.clientX - rect.left, y: e.clientY - rect.top});
                            draw();
                        });

                        canvas.addEventListener('mouseup', () => {
                            if (drawing && currentLoop.length > 2) {
                                loops.push([...currentLoop]);
                                currentLoop = [];
                            }
                            drawing = false;
                            draw();
                        });

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            // Draw basepoint
                            ctx.fillStyle = '#f0883e';
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, 8, 0, 2*Math.PI);
                            ctx.fill();
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '14px monospace';
                            ctx.fillText('x₀', centerX + 12, centerY + 5);

                            // Draw completed loops
                            ctx.lineWidth = 2;
                            loops.forEach((loop, idx) => {
                                ctx.strokeStyle = ['#3fb950', '#58a6ff', '#bc8cff', '#d29922'][idx % 4];
                                ctx.beginPath();
                                loop.forEach((p, i) => {
                                    if (i === 0) ctx.moveTo(p.x, p.y);
                                    else ctx.lineTo(p.x, p.y);
                                });
                                ctx.closePath();
                                ctx.stroke();
                            });

                            // Draw current loop being drawn
                            if (currentLoop.length > 1) {
                                ctx.strokeStyle = '#f85149';
                                ctx.beginPath();
                                currentLoop.forEach((p, i) => {
                                    if (i === 0) ctx.moveTo(p.x, p.y);
                                    else ctx.lineTo(p.x, p.y);
                                });
                                ctx.stroke();
                            }

                            // Info
                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px monospace';
                            ctx.fillText(`${loops.length} loop(s) in π₁(X, x₀)`, 10, canvas.height - 10);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that the constant loop \\(c_{x_0}\\) is the identity in \\(\\pi_1(X, x_0)\\).',
                    hint: 'Prove \\(c_{x_0} * \\gamma \\simeq_p \\gamma\\) by constructing a homotopy that "speeds up" the constant part.',
                    solution: 'Define \\(H(s, t) = \\begin{cases} x_0 & 0 \\le s \\le (1-t)/2 \\\\ \\gamma\\left(\\frac{2s - (1-t)}{1+t}\\right) & (1-t)/2 \\le s \\le 1 \\end{cases}\\). At \\(t=0\\), this is \\(c_{x_0} * \\gamma\\); at \\(t=1\\), this is \\(\\gamma\\).'
                },
                {
                    question: 'Prove that \\(\\gamma * \\bar{\\gamma} \\simeq_p c_{x_0}\\).',
                    hint: 'Construct a homotopy that gradually shrinks the loop toward the basepoint.',
                    solution: 'Define \\(H(s, t) = \\begin{cases} \\gamma(2s(1-t)) & 0 \\le s \\le 1/2 \\\\ \\gamma(2(1-s)(1-t)) & 1/2 \\le s \\le 1 \\end{cases}\\). At \\(t=0\\), this is \\(\\gamma * \\bar{\\gamma}\\); at \\(t=1\\), this is \\(c_{x_0}\\).'
                },
                {
                    question: 'If \\(X\\) is path-connected, show that \\(\\pi_1(X, x_0) \\cong \\pi_1(X, x_1)\\) for any \\(x_0, x_1 \\in X\\).',
                    hint: 'Pick a path \\(\\alpha\\) from \\(x_0\\) to \\(x_1\\). Define \\(\\phi([\\gamma]) = [\\alpha^{-1} * \\gamma * \\alpha]\\).',
                    solution: 'The map \\(\\phi_{\\alpha}: \\pi_1(X, x_0) \\to \\pi_1(X, x_1)\\) given by \\(\\phi_{\\alpha}([\\gamma]) = [\\bar{\\alpha} * \\gamma * \\alpha]\\) is a group isomorphism. The isomorphism depends on the choice of \\(\\alpha\\), so it is not canonical.'
                }
            ]
        },

        {
            id: 'pi1-circle',
            title: 'Computing π₁(S¹) = ℤ',
            content: `
                <h2>The Circle Has Fundamental Group ℤ</h2>

                <p>We now prove the central result: \\(\\pi_1(S^1, 1) \\cong \\mathbb{Z}\\). This is one of the most important computations in algebraic topology.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.9 (Fundamental Group of the Circle)</div>
                    <div class="env-body">
                        <p>\\(\\pi_1(S^1, 1) \\cong \\mathbb{Z}\\), where \\(S^1 = \\{z \\in \\mathbb{C} : |z| = 1\\}\\) and the basepoint is \\(1\\).</p>
                        <p>The isomorphism is given by the <strong>winding number</strong>: a loop \\(\\gamma: [0,1] \\to S^1\\) winding \\(n\\) times counterclockwise (\\(n \\in \\mathbb{Z}\\)) corresponds to \\(n \\in \\mathbb{Z}\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof Idea (via Covering Spaces)</div>
                    <div class="env-body">
                        <p>We use the <strong>universal covering map</strong> \\(p: \\mathbb{R} \\to S^1\\) given by \\(p(t) = e^{2\\pi i t}\\).</p>
                        <p><strong>Key fact:</strong> Any loop \\(\\gamma: [0,1] \\to S^1\\) with \\(\\gamma(0) = \\gamma(1) = 1\\) lifts to a unique path \\(\\tilde{\\gamma}: [0,1] \\to \\mathbb{R}\\) with \\(\\tilde{\\gamma}(0) = 0\\) such that \\(p \\circ \\tilde{\\gamma} = \\gamma\\).</p>
                        <p>Since \\(\\gamma(1) = 1 = p(0)\\), we have \\(\\tilde{\\gamma}(1) = n\\) for some \\(n \\in \\mathbb{Z}\\) (because \\(p^{-1}(1) = \\mathbb{Z}\\)).</p>
                        <p>Define \\(\\Phi: \\pi_1(S^1, 1) \\to \\mathbb{Z}\\) by \\(\\Phi([\\gamma]) = \\tilde{\\gamma}(1)\\).</p>
                        <p><strong>Well-defined:</strong> If \\(\\gamma_0 \\simeq_p \\gamma_1\\), their lifts end at the same integer (by homotopy lifting property).</p>
                        <p><strong>Homomorphism:</strong> \\(\\Phi([\\gamma] \\cdot [\\eta]) = \\Phi([\\gamma]) + \\Phi([\\eta])\\) because path composition lifts to addition of endpoints in \\(\\mathbb{R}\\).</p>
                        <p><strong>Bijective:</strong> Surjective because \\(\\gamma_n(t) = e^{2\\pi i n t}\\) lifts to \\(nt\\), so \\(\\Phi([\\gamma_n]) = n\\). Injective because if \\(\\tilde{\\gamma}(1) = 0\\), then \\(\\tilde{\\gamma}\\) is a path in \\(\\mathbb{R}\\) from 0 to 0, which is homotopic to the constant path (\\(\\mathbb{R}\\) is contractible), so \\(\\gamma \\simeq_p c_1\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="covering-lift"></div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why This Matters)</div>
                    <div class="env-body">
                        <p>This proves \\(S^1 \\not\\cong \\mathbb{R}\\) (we have \\(\\pi_1(\\mathbb{R}) = 0 \\neq \\mathbb{Z}\\)). It also shows \\(\\pi_1\\) is a <em>topological invariant</em>: homeomorphic spaces have isomorphic fundamental groups.</p>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'covering-lift',
                    title: 'Covering Map Lifter (ℝ → S¹)',
                    description: 'Lift paths from S¹ to the universal cover ℝ',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 350;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        let windingNumber = 1;

                        const label = document.createElement('div');
                        label.style.marginTop = '10px';
                        label.style.color = '#c9d1d9';
                        label.textContent = `Winding number n = ${windingNumber}`;
                        body.appendChild(label);

                        const slider = document.createElement('input');
                        slider.type = 'range';
                        slider.min = -3;
                        slider.max = 3;
                        slider.value = windingNumber;
                        slider.style.width = '300px';
                        slider.oninput = (e) => {
                            windingNumber = parseInt(e.target.value);
                            label.textContent = `Winding number n = ${windingNumber}`;
                            draw();
                        };
                        controls.appendChild(slider);

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            const w = canvas.width;
                            const h = canvas.height;

                            // Draw S¹ (bottom)
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '14px monospace';
                            ctx.fillText('S¹ (base space)', 20, h - 100);

                            const circleCY = h - 50;
                            const circleR = 40;
                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(w/2, circleCY, circleR, 0, 2*Math.PI);
                            ctx.stroke();

                            // Draw basepoint
                            ctx.fillStyle = '#f0883e';
                            ctx.beginPath();
                            ctx.arc(w/2 + circleR, circleCY, 5, 0, 2*Math.PI);
                            ctx.fill();
                            ctx.fillStyle = '#c9d1d9';
                            ctx.fillText('1', w/2 + circleR + 10, circleCY + 5);

                            // Draw loop on S¹
                            ctx.strokeStyle = '#3fb950';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (let t = 0; t <= 1; t += 0.01) {
                                const angle = 2 * Math.PI * windingNumber * t;
                                const x = w/2 + circleR * Math.cos(angle);
                                const y = circleCY - circleR * Math.sin(angle);
                                if (t === 0) ctx.moveTo(x, y);
                                else ctx.lineTo(x, y);
                            }
                            ctx.stroke();

                            // Draw ℝ (top, as a line)
                            ctx.fillStyle = '#c9d1d9';
                            ctx.fillText('ℝ (covering space)', 20, 40);

                            const lineY = 80;
                            ctx.strokeStyle = '#8b949e';
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(50, lineY);
                            ctx.lineTo(w - 50, lineY);
                            ctx.stroke();

                            // Mark integers on ℝ
                            const scale = 60;
                            for (let n = -3; n <= 3; n++) {
                                const x = w/2 + n * scale;
                                ctx.fillStyle = '#8b949e';
                                ctx.beginPath();
                                ctx.arc(x, lineY, 3, 0, 2*Math.PI);
                                ctx.fill();
                                ctx.fillStyle = '#c9d1d9';
                                ctx.fillText(n.toString(), x - 5, lineY - 10);
                            }

                            // Draw lifted path
                            ctx.strokeStyle = '#bc8cff';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            for (let t = 0; t <= 1; t += 0.01) {
                                const lifted_t = windingNumber * t;
                                const x = w/2 + lifted_t * scale;
                                if (t === 0) ctx.moveTo(x, lineY);
                                else ctx.lineTo(x, lineY);
                            }
                            ctx.stroke();

                            // Draw projection arrows
                            ctx.strokeStyle = '#f0883e';
                            ctx.setLineDash([5, 5]);
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(w/2 + windingNumber * scale, lineY);
                            ctx.lineTo(w/2 + circleR, circleCY);
                            ctx.stroke();
                            ctx.setLineDash([]);

                            // Label
                            ctx.fillStyle = '#bc8cff';
                            ctx.fillText(`γ̃(1) = ${windingNumber}`, w/2 + windingNumber * scale - 20, lineY + 25);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that \\(\\pi_1(S^1 \\times S^1, (1, 1)) \\cong \\mathbb{Z} \\times \\mathbb{Z}\\).',
                    hint: 'Use the fact that \\(\\pi_1(X \\times Y, (x_0, y_0)) \\cong \\pi_1(X, x_0) \\times \\pi_1(Y, y_0)\\) (we will prove this later).',
                    solution: 'By the product formula, \\(\\pi_1(S^1 \\times S^1, (1,1)) \\cong \\pi_1(S^1, 1) \\times \\pi_1(S^1, 1) \\cong \\mathbb{Z} \\times \\mathbb{Z}\\). Geometrically, the torus \\(T^2 = S^1 \\times S^1\\) has two independent loops (around the two "holes"), generating \\(\\mathbb{Z} \\oplus \\mathbb{Z}\\).'
                },
                {
                    question: 'Show that \\(\\mathbb{R}^2 \\setminus \\{0\\}\\) is homotopy equivalent to \\(S^1\\), and conclude \\(\\pi_1(\\mathbb{R}^2 \\setminus \\{0\\}) \\cong \\mathbb{Z}\\).',
                    hint: 'The radial retraction \\(r: \\mathbb{R}^2 \\setminus \\{0\\} \\to S^1\\) given by \\(r(x) = x/|x|\\) is a homotopy equivalence.',
                    solution: 'The inclusion \\(i: S^1 \\hookrightarrow \\mathbb{R}^2 \\setminus \\{0\\}\\) and retraction \\(r: \\mathbb{R}^2 \\setminus \\{0\\} \\to S^1\\) satisfy \\(r \\circ i = \\text{id}_{S^1}\\) and \\(i \\circ r \\simeq \\text{id}_{\\mathbb{R}^2 \\setminus \\{0\\}}\\) (via straight-line homotopy). Thus \\(\\pi_1(\\mathbb{R}^2 \\setminus \\{0\\}) \\cong \\pi_1(S^1) \\cong \\mathbb{Z}\\).'
                }
            ]
        },

        {
            id: 'functoriality',
            title: 'Functoriality of π₁',
            content: `
                <h2>Induced Homomorphisms</h2>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.10 (Induced Homomorphism)</div>
                    <div class="env-body">
                        <p>If \\(f: (X, x_0) \\to (Y, y_0)\\) is a continuous pointed map, then there is an induced group homomorphism
                        \\[f_*: \\pi_1(X, x_0) \\to \\pi_1(Y, y_0)\\]
                        defined by \\(f_*([\\gamma]) = [f \\circ \\gamma]\\).</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p><strong>Well-defined:</strong> If \\(\\gamma_0 \\simeq_p \\gamma_1\\) via homotopy \\(H\\), then \\(f \\circ H\\) is a homotopy from \\(f \\circ \\gamma_0\\) to \\(f \\circ \\gamma_1\\).</p>
                        <p><strong>Homomorphism:</strong> \\(f_*([\\gamma] \\cdot [\\eta]) = [f \\circ (\\gamma * \\eta)] = [(f \\circ \\gamma) * (f \\circ \\eta)] = [f \\circ \\gamma] \\cdot [f \\circ \\eta] = f_*([\\gamma]) \\cdot f_*([\\eta])\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 1.11 (Functoriality)</div>
                    <div class="env-body">
                        <p>\\(\\pi_1\\) is a <strong>functor</strong> from pointed topological spaces to groups:</p>
                        <ol>
                            <li>\\((\\text{id}_X)_* = \\text{id}_{\\pi_1(X, x_0)}\\)</li>
                            <li>If \\(f: X \\to Y\\) and \\(g: Y \\to Z\\), then \\((g \\circ f)_* = g_* \\circ f_*\\)</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block corollary">
                    <div class="env-title">Corollary 1.12 (Homotopy Equivalence ⇒ Isomorphism)</div>
                    <div class="env-body">
                        <p>If \\(f: X \\to Y\\) is a homotopy equivalence, then \\(f_*: \\pi_1(X, x_0) \\to \\pi_1(Y, f(x_0))\\) is an isomorphism.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>Let \\(g: Y \\to X\\) be a homotopy inverse with \\(g \\circ f \\simeq \\text{id}_X\\) and \\(f \\circ g \\simeq \\text{id}_Y\\). Then \\(g_* \\circ f_* = (g \\circ f)_* = (\\text{id}_X)_* = \\text{id}\\), and similarly \\(f_* \\circ g_* = \\text{id}\\). Thus \\(f_*\\) is an isomorphism with inverse \\(g_*\\).</p>
                        <div class="qed">∎</div>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Topological Invariance)</div>
                    <div class="env-body">
                        <p>This shows \\(\\pi_1\\) is a <em>topological invariant</em>: if \\(X \\cong Y\\), then \\(\\pi_1(X) \\cong \\pi_1(Y)\\). This is the key to using \\(\\pi_1\\) to distinguish spaces!</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that any map \\(f: S^n \\to S^1\\) (for \\(n \\ge 2\\)) is null-homotopic.',
                    hint: 'Use the fact that \\(\\pi_1(S^n) = 0\\) for \\(n \\ge 2\\) (which we will prove later) and \\(\\pi_1(S^1) = \\mathbb{Z}\\).',
                    solution: 'The induced map \\(f_*: \\pi_1(S^n) \\to \\pi_1(S^1)\\) is the zero homomorphism \\(0 \\to \\mathbb{Z}\\). By obstruction theory (or direct argument), this implies \\(f\\) is homotopic to a constant map.'
                },
                {
                    question: 'Prove that \\(\\mathbb{R}^2\\) is not homotopy equivalent to \\(S^1\\).',
                    hint: 'Compare fundamental groups.',
                    solution: 'We have \\(\\pi_1(\\mathbb{R}^2) = 0\\) (contractible) and \\(\\pi_1(S^1) = \\mathbb{Z}\\). Since \\(0 \\not\\cong \\mathbb{Z}\\), they cannot be homotopy equivalent.'
                }
            ]
        }
    ]
});
