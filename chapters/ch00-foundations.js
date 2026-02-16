window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Topological Foundations Review',
    subtitle: 'Continuity, compactness, and quotient spaces',
    sections: [
        {
            id: 'metric-topological',
            title: 'Metric and Topological Spaces',
            content: `
                <h2>Quick Review of Topological Spaces</h2>

                <p>Before diving into algebraic topology, we review the essential topological concepts. This chapter is intentionally brief—consult Munkres or your favorite point-set topology text for details.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.1 (Topological Space)</div>
                    <div class="env-body">
                        <p>A <strong>topological space</strong> is a pair \\((X, \\mathcal{T})\\) where \\(X\\) is a set and \\(\\mathcal{T} \\subseteq \\mathcal{P}(X)\\) is a collection of subsets (called <em>open sets</em>) such that:</p>
                        <ol>
                            <li>\\(\\emptyset, X \\in \\mathcal{T}\\)</li>
                            <li>Arbitrary unions of open sets are open</li>
                            <li>Finite intersections of open sets are open</li>
                        </ol>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.2 (Standard Topologies)</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Euclidean topology</strong> on \\(\\mathbb{R}^n\\): open sets are arbitrary unions of open balls</li>
                            <li><strong>Discrete topology</strong>: \\(\\mathcal{T} = \\mathcal{P}(X)\\) (every subset is open)</li>
                            <li><strong>Indiscrete topology</strong>: \\(\\mathcal{T} = \\{\\emptyset, X\\}\\)</li>
                            <li><strong>Subspace topology</strong>: if \\(Y \\subseteq X\\), then \\(U \\subseteq Y\\) is open iff \\(U = V \\cap Y\\) for some open \\(V \\subseteq X\\)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.3 (Continuous Map)</div>
                    <div class="env-body">
                        <p>A map \\(f: X \\to Y\\) between topological spaces is <strong>continuous</strong> if for every open set \\(V \\subseteq Y\\), the preimage \\(f^{-1}(V)\\) is open in \\(X\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.4 (Homeomorphism)</div>
                    <div class="env-body">
                        <p>A <strong>homeomorphism</strong> is a continuous bijection \\(f: X \\to Y\\) whose inverse \\(f^{-1}\\) is also continuous. We write \\(X \\cong Y\\) and say \\(X\\) and \\(Y\\) are <em>homeomorphic</em>.</p>
                        <p>Homeomorphism is the topological notion of "sameness." Algebraic topology seeks to distinguish non-homeomorphic spaces via computable invariants.</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Topological vs. Geometric)</div>
                    <div class="env-body">
                        <p>Topology cares about continuity, not distance or angles. A coffee mug is homeomorphic to a donut (both have one hole), but not to a sphere (no holes). The challenge: how do we <em>prove</em> two spaces are not homeomorphic?</p>
                    </div>
                </div>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that the open interval \\((0,1)\\) is homeomorphic to \\(\\mathbb{R}\\). (Hint: consider \\(f(x) = \\tan(\\pi(x - 1/2))\\).)',
                    hint: 'Check that \\(f\\) is a continuous bijection with continuous inverse.',
                    solution: 'The map \\(f: (0,1) \\to \\mathbb{R}\\) given by \\(f(x) = \\tan(\\pi(x - 1/2))\\) is continuous, bijective, and has continuous inverse \\(f^{-1}(y) = \\frac{1}{\\pi}\\arctan(y) + \\frac{1}{2}\\). Thus \\((0,1) \\cong \\mathbb{R}\\).'
                }
            ]
        },

        {
            id: 'quotient-topology',
            title: 'Quotient Topology and Identification Spaces',
            content: `
                <h2>Building New Spaces by Gluing</h2>

                <p>One of the most powerful constructions in topology is the <strong>quotient topology</strong>, which formalizes the idea of "gluing" points or subsets together.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.5 (Quotient Topology)</div>
                    <div class="env-body">
                        <p>Let \\(X\\) be a topological space and \\(\\sim\\) an equivalence relation on \\(X\\). The <strong>quotient space</strong> \\(X/\\!\\sim\\) is the set of equivalence classes \\([x]\\), equipped with the <em>quotient topology</em>:</p>
                        <p style="text-align:center;">\\(U \\subseteq X/\\!\\sim\\) is open \\(\\iff\\) \\(\\pi^{-1}(U)\\) is open in \\(X\\),</p>
                        <p>where \\(\\pi: X \\to X/\\!\\sim\\) is the projection \\(\\pi(x) = [x]\\).</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.6 (Classic Quotient Spaces)</div>
                    <div class="env-body">
                        <ol>
                            <li><strong>Circle</strong>: \\(S^1 = [0,1] / \\{0 \\sim 1\\}\\) (glue endpoints of an interval)</li>
                            <li><strong>Torus</strong> \\(T^2\\): Take a square \\([0,1]^2\\) and identify opposite edges:
                                <ul>
                                    <li>\\((0, y) \\sim (1, y)\\) for all \\(y\\)</li>
                                    <li>\\((x, 0) \\sim (x, 1)\\) for all \\(x\\)</li>
                                </ul>
                            </li>
                            <li><strong>Klein bottle</strong> \\(K\\): Square with one edge reversed:
                                <ul>
                                    <li>\\((0, y) \\sim (1, y)\\)</li>
                                    <li>\\((x, 0) \\sim (1-x, 1)\\) (twist before gluing)</li>
                                </ul>
                            </li>
                            <li><strong>Projective plane</strong> \\(\\mathbb{R}P^2\\): Identify antipodal points on \\(S^2\\), or equivalently, glue opposite edges of a disk with a twist.</li>
                        </ol>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="quotient-builder"></div>

                <div class="env-block intuition">
                    <div class="env-title">Intuition (Why Quotient Topology?)</div>
                    <div class="env-body">
                        <p>The quotient topology is the <em>finest</em> (largest) topology on \\(X/\\!\\sim\\) making \\(\\pi\\) continuous. This ensures that "closeness" in \\(X\\) is preserved after gluing.</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.7 (Universal Property of Quotient)</div>
                    <div class="env-body">
                        <p>A map \\(f: X/\\!\\sim \\to Y\\) is continuous if and only if \\(f \\circ \\pi: X \\to Y\\) is continuous.</p>
                    </div>
                </div>

                <div class="env-block proof">
                    <div class="env-title">Proof</div>
                    <div class="env-body">
                        <p>(\\(\\Rightarrow\\)) If \\(f\\) is continuous, then \\(f \\circ \\pi\\) is a composition of continuous maps, hence continuous.</p>
                        <p>(\\(\\Leftarrow\\)) Suppose \\(f \\circ \\pi\\) is continuous. Let \\(V \\subseteq Y\\) be open. Then \\((f \\circ \\pi)^{-1}(V) = \\pi^{-1}(f^{-1}(V))\\) is open in \\(X\\). By definition of quotient topology, \\(f^{-1}(V)\\) is open in \\(X/\\!\\sim\\). Thus \\(f\\) is continuous.</p>
                        <div class="qed">∎</div>
                    </div>
                </div>
            `,
            visualizations: [
                {
                    id: 'quotient-builder',
                    title: 'Quotient Space Builder',
                    description: 'Glue edges of a square to create torus, Klein bottle, or RP²',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 400;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');
                        let surfaceType = 'torus'; // 'torus', 'klein', 'rp2'

                        const btn1 = document.createElement('button');
                        btn1.textContent = 'Torus';
                        btn1.onclick = () => { surfaceType = 'torus'; draw(); };
                        controls.appendChild(btn1);

                        const btn2 = document.createElement('button');
                        btn2.textContent = 'Klein Bottle';
                        btn2.onclick = () => { surfaceType = 'klein'; draw(); };
                        controls.appendChild(btn2);

                        const btn3 = document.createElement('button');
                        btn3.textContent = 'RP²';
                        btn3.onclick = () => { surfaceType = 'rp2'; draw(); };
                        controls.appendChild(btn3);

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            const cx = canvas.width / 2;
                            const cy = canvas.height / 2;
                            const size = 120;

                            // Draw square
                            ctx.strokeStyle = '#58a6ff';
                            ctx.lineWidth = 3;
                            ctx.strokeRect(cx - size, cy - size, 2*size, 2*size);

                            // Draw edge labels
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '16px monospace';
                            ctx.textAlign = 'center';

                            if (surfaceType === 'torus') {
                                // Top and bottom: a, left and right: b
                                drawArrow(ctx, cx - size, cy - size, cx + size, cy - size, 'a', '#3fb950');
                                drawArrow(ctx, cx - size, cy + size, cx + size, cy + size, 'a', '#3fb950');
                                drawArrow(ctx, cx - size, cy - size, cx - size, cy + size, 'b', '#f0883e');
                                drawArrow(ctx, cx + size, cy - size, cx + size, cy + size, 'b', '#f0883e');

                                ctx.fillStyle = '#c9d1d9';
                                ctx.fillText('Glue: top ≅ bottom (same dir), left ≅ right (same dir)', cx, cy + size + 40);
                            } else if (surfaceType === 'klein') {
                                drawArrow(ctx, cx - size, cy - size, cx + size, cy - size, 'a', '#3fb950');
                                drawArrow(ctx, cx - size, cy + size, cx + size, cy + size, 'a', '#3fb950');
                                drawArrow(ctx, cx - size, cy - size, cx - size, cy + size, 'b', '#f0883e');
                                drawArrow(ctx, cx + size, cy + size, cx + size, cy - size, 'b', '#f0883e'); // reversed

                                ctx.fillStyle = '#c9d1d9';
                                ctx.fillText('Glue: top ≅ bottom (same), left ≅ right (REVERSED)', cx, cy + size + 40);
                            } else {
                                // RP² (disk with antipodal boundary identification)
                                ctx.fillText('RP²: Identify antipodal points on boundary', cx, cy + size + 40);
                                ctx.beginPath();
                                ctx.arc(cx, cy, size, 0, 2*Math.PI);
                                ctx.stroke();
                            }
                        }

                        function drawArrow(ctx, x1, y1, x2, y2, label, color) {
                            ctx.strokeStyle = color;
                            ctx.fillStyle = color;
                            ctx.lineWidth = 2;

                            const dx = x2 - x1;
                            const dy = y2 - y1;
                            const len = Math.sqrt(dx*dx + dy*dy);
                            const ux = dx/len, uy = dy/len;

                            // Draw line
                            ctx.beginPath();
                            ctx.moveTo(x1, y1);
                            ctx.lineTo(x2, y2);
                            ctx.stroke();

                            // Draw arrowhead
                            const headLen = 10;
                            const angle = Math.atan2(dy, dx);
                            ctx.beginPath();
                            ctx.moveTo(x2, y2);
                            ctx.lineTo(x2 - headLen*Math.cos(angle - Math.PI/6), y2 - headLen*Math.sin(angle - Math.PI/6));
                            ctx.moveTo(x2, y2);
                            ctx.lineTo(x2 - headLen*Math.cos(angle + Math.PI/6), y2 - headLen*Math.sin(angle + Math.PI/6));
                            ctx.stroke();

                            // Label
                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '14px monospace';
                            ctx.fillText(label, (x1+x2)/2, (y1+y2)/2 - 8);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify that the torus \\(T^2\\) can be obtained as the quotient \\(\\mathbb{R}^2 / \\mathbb{Z}^2\\) (identify points differing by integer coordinates).',
                    hint: 'Show that \\([0,1]^2\\) with opposite edges glued is the same as \\(\\mathbb{R}^2\\) modulo the integer lattice.',
                    solution: 'The map \\(\\mathbb{R}^2 \\to [0,1]^2\\) given by \\((x,y) \\mapsto (x \\mod 1, y \\mod 1)\\) descends to a homeomorphism \\(\\mathbb{R}^2/\\mathbb{Z}^2 \\to T^2\\).'
                },
                {
                    question: 'Show that \\(\\mathbb{R}P^2\\) is obtained from \\(S^2\\) by identifying antipodal points.',
                    hint: 'Use the fact that \\(\\mathbb{R}P^2\\) is the space of lines through the origin in \\(\\mathbb{R}^3\\).',
                    solution: 'Each line through the origin intersects \\(S^2\\) at exactly two antipodal points. The bijection between lines and pairs of antipodal points gives the quotient map \\(S^2 \\to \\mathbb{R}P^2\\).'
                }
            ]
        },

        {
            id: 'compactness-connectedness',
            title: 'Compactness and Connectedness',
            content: `
                <h2>Key Topological Properties</h2>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.8 (Compactness)</div>
                    <div class="env-body">
                        <p>A space \\(X\\) is <strong>compact</strong> if every open cover has a finite subcover. That is, if \\(X = \\bigcup_{i \\in I} U_i\\) with each \\(U_i\\) open, then there exist finitely many \\(i_1, \\ldots, i_n\\) such that \\(X = U_{i_1} \\cup \\cdots \\cup U_{i_n}\\).</p>
                    </div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem 0.9 (Heine-Borel)</div>
                    <div class="env-body">
                        <p>A subset of \\(\\mathbb{R}^n\\) is compact if and only if it is closed and bounded.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.10</div>
                    <div class="env-body">
                        <ul>
                            <li>\\([0,1]\\) is compact, \\((0,1)\\) is not (not closed)</li>
                            <li>\\(S^n\\) (sphere) is compact</li>
                            <li>Any finite space is compact</li>
                            <li>Compact Hausdorff spaces behave nicely (closed subsets are compact, etc.)</li>
                        </ul>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.11 (Connectedness)</div>
                    <div class="env-body">
                        <p>A space \\(X\\) is <strong>connected</strong> if it cannot be written as \\(X = U \\sqcup V\\) where \\(U, V\\) are non-empty disjoint open sets. Equivalently, the only subsets that are both open and closed are \\(\\emptyset\\) and \\(X\\).</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.12 (Path-Connectedness)</div>
                    <div class="env-body">
                        <p>A space \\(X\\) is <strong>path-connected</strong> if for any \\(x_0, x_1 \\in X\\), there exists a continuous map \\(\\gamma: [0,1] \\to X\\) with \\(\\gamma(0) = x_0\\) and \\(\\gamma(1) = x_1\\).</p>
                        <p>Path-connected \\(\\Rightarrow\\) connected, but not conversely (e.g., topologist's sine curve).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why Path-Connectedness Matters)</div>
                    <div class="env-body">
                        <p>In algebraic topology, we mostly work with "nice" spaces (CW complexes, manifolds) where connectedness and path-connectedness coincide. The fundamental group is only interesting for path-connected spaces.</p>
                    </div>
                </div>

                <div class="viz-placeholder" data-viz="connectedness-demo"></div>
            `,
            visualizations: [
                {
                    id: 'connectedness-demo',
                    title: 'Connected vs. Disconnected Spaces',
                    description: 'Visualize separation into disjoint open sets',
                    setup: function(body, controls) {
                        const canvas = document.createElement('canvas');
                        canvas.width = body.clientWidth;
                        canvas.height = 300;
                        body.appendChild(canvas);

                        const ctx = canvas.getContext('2d');

                        function draw() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            const w = canvas.width;
                            const h = canvas.height;

                            ctx.fillStyle = '#c9d1d9';
                            ctx.font = '14px sans-serif';

                            // Connected example: circle
                            ctx.fillText('Connected: S¹', w/4 - 40, 30);
                            ctx.strokeStyle = '#3fb950';
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(w/4, h/2, 60, 0, 2*Math.PI);
                            ctx.stroke();

                            // Disconnected example: two circles
                            ctx.fillText('Disconnected: S¹ ⨿ S¹', 3*w/4 - 60, 30);
                            ctx.strokeStyle = '#f0883e';
                            ctx.beginPath();
                            ctx.arc(3*w/4 - 40, h/2, 40, 0, 2*Math.PI);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.arc(3*w/4 + 40, h/2, 40, 0, 2*Math.PI);
                            ctx.stroke();

                            ctx.fillStyle = '#8b949e';
                            ctx.font = '12px monospace';
                            ctx.fillText('Cannot separate into U ⨿ V', w/4 - 80, h - 30);
                            ctx.fillText('Can separate: U = left circle, V = right circle', 3*w/4 - 140, h - 30);
                        }

                        draw();
                    }
                }
            ],
            exercises: [
                {
                    question: 'Prove that the continuous image of a compact space is compact.',
                    hint: 'Let \\(f: X \\to Y\\) be continuous with \\(X\\) compact. Show that any open cover of \\(f(X)\\) pulls back to an open cover of \\(X\\).',
                    solution: 'If \\(\\{V_i\\}\\) is an open cover of \\(f(X)\\), then \\(\\{f^{-1}(V_i)\\}\\) is an open cover of \\(X\\). By compactness, finitely many \\(f^{-1}(V_{i_1}), \\ldots, f^{-1}(V_{i_n})\\) cover \\(X\\). Then \\(V_{i_1}, \\ldots, V_{i_n}\\) cover \\(f(X)\\).'
                },
                {
                    question: 'Show that path-connectedness is preserved by continuous maps.',
                    hint: 'If \\(f: X \\to Y\\) is continuous and \\(X\\) is path-connected, show \\(f(X)\\) is path-connected.',
                    solution: 'Let \\(y_0, y_1 \\in f(X)\\). Pick \\(x_0, x_1 \\in X\\) with \\(f(x_i) = y_i\\). By path-connectedness of \\(X\\), there exists \\(\\gamma: [0,1] \\to X\\) with \\(\\gamma(0) = x_0, \\gamma(1) = x_1\\). Then \\(f \\circ \\gamma: [0,1] \\to Y\\) is a path from \\(y_0\\) to \\(y_1\\).'
                }
            ]
        },

        {
            id: 'basepoints',
            title: 'Basepoints and the Category TOP*',
            content: `
                <h2>Pointed Topological Spaces</h2>

                <p>In homotopy theory, we often work with <em>pointed spaces</em>: spaces \\((X, x_0)\\) equipped with a distinguished <strong>basepoint</strong> \\(x_0 \\in X\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.13 (Pointed Space)</div>
                    <div class="env-body">
                        <p>A <strong>pointed topological space</strong> is a pair \\((X, x_0)\\) where \\(X\\) is a topological space and \\(x_0 \\in X\\) is a chosen point.</p>
                        <p>A <strong>basepoint-preserving map</strong> (or <em>pointed map</em>) \\(f: (X, x_0) \\to (Y, y_0)\\) is a continuous map \\(f: X \\to Y\\) with \\(f(x_0) = y_0\\).</p>
                    </div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Remark (Why Basepoints?)</div>
                    <div class="env-body">
                        <p>The fundamental group \\(\\pi_1(X, x_0)\\) depends on the choice of basepoint. For path-connected spaces, different basepoints give isomorphic groups, but the isomorphism is not canonical. Working in the category of pointed spaces removes this ambiguity.</p>
                    </div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example 0.14 (Pointed Product and Wedge Sum)</div>
                    <div class="env-body">
                        <ul>
                            <li><strong>Pointed product</strong>: \\((X, x_0) \\times (Y, y_0) = (X \\times Y, (x_0, y_0))\\)</li>
                            <li><strong>Wedge sum (one-point union)</strong>: \\((X, x_0) \\vee (Y, y_0)\\) is the quotient of \\(X \\sqcup Y\\) identifying \\(x_0 \\sim y_0\\). Think of it as "gluing two spaces at their basepoints."</li>
                        </ul>
                        <p>Example: \\(S^1 \\vee S^1\\) is the figure-eight space.</p>
                    </div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition 0.15 (Homotopy of Pointed Maps)</div>
                    <div class="env-body">
                        <p>Two pointed maps \\(f, g: (X, x_0) \\to (Y, y_0)\\) are <strong>homotopic</strong> (written \\(f \\simeq g\\)) if there exists a continuous \\(H: X \\times [0,1] \\to Y\\) such that:</p>
                        <ul>
                            <li>\\(H(x, 0) = f(x)\\) and \\(H(x, 1) = g(x)\\) for all \\(x \\in X\\)</li>
                            <li>\\(H(x_0, t) = y_0\\) for all \\(t \\in [0,1]\\) (basepoint stays fixed)</li>
                        </ul>
                    </div>
                </div>

                <p>This sets the stage for Chapter 1, where we study loops based at \\(x_0\\) and their homotopy classes—the fundamental group.</p>
            `,
            visualizations: [],
            exercises: [
                {
                    question: 'Show that \\(S^1 \\vee S^1\\) (figure-eight) is not homeomorphic to \\(S^1\\).',
                    hint: 'If you remove the basepoint from \\(S^1 \\vee S^1\\), you get a disconnected space. What happens when you remove any point from \\(S^1\\)?',
                    solution: 'Removing the basepoint from \\(S^1 \\vee S^1\\) gives two disjoint open intervals (disconnected). Removing any point from \\(S^1\\) gives a single open interval (connected). Since connectedness is a topological property, \\(S^1 \\vee S^1 \\not\\cong S^1\\).'
                }
            ]
        }
    ]
});
