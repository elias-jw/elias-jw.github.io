+++
title = "Critical thinking infrastructure: an essay series"
date = "2026-04-09"
weight = 1
+++

This is a series of essays on building infrastructure for better decision-making. The end-goal is to allow decision makers dealing with high-pressure and time-sensitive problems, to ask and get defensible answers in minutes, instead of weeks and months. 

The immediate context is logistics and supply chain planning, though the ideas reach further. The argument is that the bottleneck in most high-stakes decisions is not the absence of data or models but the absence of infrastructure for asking good questions quickly. The essays cover shortcomings in existing decision models, the technical architecture of a solution, AI, and the human layer.

*This series accompanies my application to the [Encode AI fellowship](https://encode.pillar.vc/).*

1. [When deliberation meets reality](/posts/when-deliberation-meets-reality/)
2. [Building critical thinking infrastructure](/posts/building-critical-thinking-infrastructure/)
3. [No single model will save us](/posts/no-single-model-will-save-us/)
4. [The social layer: Modelling how decision-makers think about problems](/posts/modelling-how-decision-makers-think-about-problems/)
5. [Hypothesis register: collective flourishing under real-world constraints](/posts/critical-thinking-infrastructure-hypothesis-registry/)
6. [Mapping the UK public good case: components, evolution, and the public data commons](/posts/wardley-analysis-critical-thinking-infrastructure-for-the-uk/)
7. [Mapping the venture case: locating the moat, the open-source targets, and the build-buy line](/posts/wardley-analysis-critical-thinking-infrastructure-venture-backed/)

The underlying build is documented at [Critical thinking infrastructure](/builds/critical-thinking-infrastructure/).

---

**1. [When deliberation meets reality](/posts/when-deliberation-meets-reality/)** (Mar 2026)

Collective decision-making methods have been extensively studied for decades, from multi-criteria analysis to deliberative democracy platforms, yet they are almost universally abandoned under real operational pressure in favour of gut feel and spreadsheets. This post argues that the field is not under-explored; the under-explored question is why analytically superior methods fail when the stakes are real. The binding constraint on decision quality is not rigour but speed: the time it takes to ask a question and get a defensible answer. The missing precondition for collective flourishing is critical thinking infrastructure that operates fast enough to survive contact with reality, and leaves inspectable traces the collective can learn from.

![The explore-decide loop](/posts/when-deliberation-meets-reality/01_decision_question_answer_loop.svg)

---

**2. [Building critical thinking infrastructure](/posts/building-critical-thinking-infrastructure/)** (Apr 2026)

A constructive proposal for what decision-support infrastructure has to look like if it is to compress time-to-question and time-to-answer enough to fit rigorous analysis inside the decision window. The post introduces a four-layer architecture (spatial knowledge graph, domain graph, solver integration, micro-tools) governed by nine principles, including the separation of stable spatial knowledge from volatile project data, the prohibition on logic inside data objects, and the treatment of materialisation as an economic decision rather than a structural one. The architecture draws on six years of commercial deployment in logistics planning and is presented as an honest ledger of what is tested, what is designed, and what remains an open research question.

![The bottleneck cascade](/posts/building-critical-thinking-infrastructure/01_bottleneck_cascade.svg)

---

**3. [No single model will save us](/posts/no-single-model-will-save-us/)** (Apr 2026)

The instinct in 2026 is to reach for one large language model and ask it to do everything. This post argues, from Wolpert and Macready's no free lunch theorems and from seventy years of overpromise and correction in computational optimisation, that no single model outperforms all others across all problem instances, and that the right response is to invest in a stable substrate with pluggable specialised models rather than to chase a god-model. It then works through where AI actually lives in the four-layer architecture: extraction and entity resolution at the spatial layer, graph neural networks and causal models at the domain layer, classical mathematical solvers at the compute layer, and a general-purpose LLM as the facilitator that translates questions into compositions of the above. The platform is the infrastructure; the models are replaceable.

![Where AI lives in the stack](/posts/no-single-model-will-save-us/02_where_ai_lives.svg)

---

**4. [The Social Layer: Modelling How Decision-Makers Think About Problems](/posts/modelling-how-decision-makers-think-about-problems/)** (Apr 2026)

Decision support fails when it answers correctly in language the decision-maker does not use. Drawing on Tversky and Kahneman's work on framing effects and on twenty years of naturalistic decision-making research, this post argues that the gap between a system's framing and a decision-maker's framing is as costly as the gap between the question and the answer, and that framing belongs upstream of presentation, close to query dispatch. It introduces a social layer that sits above the technical architecture and represents how decision-makers actually frame problems, including the distinction between stated and revealed preferences, so that the same underlying analysis can resolve into different presentations for different readers without re-running the work. The layer is what turns an analytically correct system into one whose answers land.

![The framing gap](/posts/modelling-how-decision-makers-think-about-problems/01_framing_gap.svg)

---

**5. [Hypothesis register: collective flourishing under real-world constraints](/posts/critical-thinking-infrastructure-hypothesis-registry/)** (Apr 2026)

A formalisation of the arguments made across the essay series into fourteen testable hypotheses, each written as a null hypothesis (the perceived status quo), an ARIA alternative, and the position this work takes, with a critical test that would falsify the claim. Seven open self-critical questions are listed alongside the fourteen hypotheses, covering the places where the platform's thesis is weakest and the evidence thinnest. The register exists so that the argument can be attacked on specific, named claims rather than on vibes, and so that the programme has a public ledger of what it is betting on and what would make it change its mind.

![The spatial knowledge graph](/posts/building-critical-thinking-infrastructure/03_spatial_knowledge_graph.svg)

---

**6. [Mapping the UK public good case: components, evolution, and the public data commons](/posts/wardley-analysis-critical-thinking-infrastructure-for-the-uk/)** (Apr 2026)

A Wardley mapping exercise that positions the fifteen components of the platform on the evolution axis from genesis to commodity, and reads the resulting landscape for a UK public infrastructure play. The map's load-bearing commodity anchor is the UK public data commons (Ordnance Survey, ONS, Land Registry, Companies House, NUAR, and the FAIR data work of the Geospatial Commission), and its deliberate inertia sits on the Rust graph engine, which is held in place because the architectural principles it enforces are antibodies against failure modes observed repeatedly in production logistics systems. The post names the three climatic forces acting on the landscape, the seven strategic plays available in response, and the events that would force a revision of the map. The argument: grounded, inspectable decision support for physical operations is an under-provided public good, and the UK has the public data and academic open-source anchors to build it without importing a commercial stack.

![Wardley map: UK public good case](/posts/wardley-analysis-critical-thinking-infrastructure-for-the-uk/wardley-map-lga-platform.svg)

---

**7. [Mapping the venture case: locating the moat, the open-source targets, and the build-buy line](/posts/wardley-analysis-critical-thinking-infrastructure-venture-backed/)** (Apr 2026)

The same architecture mapped from a venture-backed company perspective rather than a public infrastructure one. The exercise identifies where value is evolving on the stack, why the substrate layer (the graph engine, the domain ontology framework, the rehydration contracts) is underfunded relative to where capital will flow next, and which components should be open-sourced to accelerate the commodity tier rather than defended as proprietary. It names the moat, the build-buy-consume decisions that fall out of the geometry rather than out of preference, and the specific events that would force a revision of the map. Written as a technical piece in which the map does most of the argumentative work.

![Wardley map: venture case](/posts/wardley-analysis-critical-thinking-infrastructure-venture-backed/wardley-map-main.svg)


