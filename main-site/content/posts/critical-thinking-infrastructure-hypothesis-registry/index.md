+++
title = "Hypothesis register: collective flourishing under real-world constraints"
date = "2026-04-01"
draft = false
description = "Fourteen hypotheses extracted from When Deliberation Meets Reality, with seven open questions for self-critique."
+++

*A technical companion to the [Critical thinking infrastructure essay series](/posts/critical-thinking-infrastructure-series/)*

## Abstract

A formalisation of the arguments made across the essay series into fourteen testable hypotheses, each written as a null hypothesis (the perceived status quo), an ARIA alternative, and the position this work takes, with a critical test that would falsify the claim. Seven open self-critical questions are listed alongside the fourteen hypotheses, covering the places where the platform's thesis is weakest and the evidence thinnest. The register exists so that the argument can be attacked on specific, named claims rather than on vibes, and so that the programme has a public ledger of what it is betting on and what would make it change its mind.

## Introduction

This document extracts formal hypotheses from the thought piece "When Deliberation Meets Reality." For each insight, three hypotheses are identified: H0 (the perceived status quo, what is currently assumed or practised), HA-ARIA (the alternative hypothesis implicit or explicit in ARIA's Collective Flourishing opportunity space), and HA-OURS (our alternative hypothesis). The purpose of this formalisation is to subject our own arguments to the same critical scrutiny we have applied to Wheeler's document, rather than allowing them to echo unchallenged between two interlocutors.

**Notation:** H0 = null hypothesis (status quo assumption). HA = alternative hypothesis (proposed new understanding). Where ARIA and our positions align, they share a single HA. Where they diverge, both are listed separately.

# Summary of hypothesis relationships

| # | H0 (Status Quo) | HA-ARIA | HA-OURS | Relationship |
|---|---|---|---|---|
| H1 | Field is mature and explored | Field is under-explored | Adoption failure is under-explored | ARIA and Ours both reject H0 but disagree on what's missing |
| H2 | Quality constrained by rigour | Better deliberation → better outcomes | Speed is the binding constraint | ARIA and Ours diverge on the bottleneck |
| H3 | Simple stories = cognitive bias | Same as H0 (bias to overcome) | Simple stories = rational speed adaptation | ARIA aligns with H0; Ours reframes the cause |
| H4 | Plan for averages, react to exceptions | Better foresight → proactive steering | Response speed > prediction accuracy for rare events | ARIA and Ours both reject H0 but diverge on the intervention |
| H5 | Foundational tech is the bottleneck | Integration layer is under-explored | Integration has been explored without surviving real-world use | ARIA and Ours agree on the locus but disagree on the diagnosis |
| H6 | Cooperation follows from good tools | Mechanism design enables coordination | Nash equilibrium is defection without enforcement | ARIA and Ours diverge on whether voluntary coordination is achievable |
| H7 | Better information → better decisions | Deliberative scaffolding → better outcomes | Critical thinking infrastructure is the precondition | ARIA and Ours agree on the direction but disagree on the mechanism |
| H8 | Environments are stable enough for deliberation | Time exists for collective reasoning | Analytical tempo ≠ operational tempo | Ours challenges ARIA's implicit assumption |
| H9 | Speed-quality trade off linearly | (Not addressed) | In landscape-altering environments, slow decisions become wrong | Ours identifies a dynamic ARIA does not address |
| H10 | Understanding → action (automatically) | Understanding and action in one programme | Different time signatures; solving one ≠ solving the other | Ours challenges the implicit coupling in ARIA's framing |
| H11 | Single high-quality answer = progress | Six themes as independent capabilities | Compounding iteration cycle is the unit of progress | Ours challenges ARIA's implicit single-turn framing |
| H12 | Fast decisions exclude the collective | Collective process ensures collective agency | Inspectable traces enable collective agency after fast decisions | ARIA and Ours both seek collective agency but diverge on mechanism |
| H13 | Demands for more research = due diligence | (Not addressed) | Questions are weapons; tempo asymmetry enables adversarial delay | Ours identifies an adversarial dynamic neither H0 nor ARIA address |
| H14 | Unreliable tools are rejected; rigour wins | (Not addressed) | LLMs prove speed wins over accuracy at scale; new benchmark is set | Ours uses LLM adoption as empirical evidence for the speed thesis |

# H1. On whether the field is under-explored

*"under-explored" is the weakest claim*

**H0 (Status quo):** Collective decision-making methods are mature and well-understood. The field has been extensively explored (MCDA, problem structuring methods, Delphi, scenario planning, wicked problems theory, deliberative democracy platforms) with decades of academic literature and deployed systems.

**HA-ARIA:** Collective decision-making tools are under-explored relative to their potential impact. The integration of these tools with modern AI capabilities is the specific gap.

**HA-OURS:** The tools themselves have been extensively explored. What is under-explored is a different question entirely: why do analytically superior methods fail under real-world pressure? The gap between theoretical toolkit and actual adoption under crisis conditions is the genuinely under-explored scientific question.

**Critical test:** Can ARIA identify a specific collective decision-making method or integration approach that has *not* been attempted? Or does the evidence show that many approaches have been attempted and abandoned, in which case the research question is about the abandonment, not the approach?



# H2. On collective deliberation and speed

*the speed contradiction*

**H0 (Status quo):** Decision quality is primarily constrained by analytical rigour. Given sufficient time, better analysis produces better decisions. Speed is a practical inconvenience, not a structural constraint.

**HA-ARIA:** Better collective deliberation tools, helping societies "see, reason, and choose together", will produce better outcomes. The emphasis is on quality and inclusivity of reasoning.

**HA-OURS:** The binding constraint on decision quality is not analytical rigour but decision speed. Collective deliberation is too slow for volatile environments. Under stress, the neurological switch from System 2 to System 1 is a biological constraint, not a failure of will. Deliberative scaffolding that operates slower than the decision cycle will be bypassed.

**Critical test:** Are there documented cases where collective deliberation produced superior outcomes *within the time constraints of a real crisis* (not in post-hoc analysis)? Conversely, are there cases where compressed analytical cycles (fast but rigorous) outperformed both gut instinct and slow deliberation?



# H3. On why people favour simple stories

*simple stories win because they are fast*

**H0 (Status quo):** People favour simple stories and confident answers because of cognitive biases: discomfort with complexity, preference for narrative coherence, motivated reasoning.

**HA-ARIA:** Aligned with H0. The preference for simple stories is a cognitive limitation to overcome through better tools for navigating complexity.

**HA-OURS:** The preference for simple stories is a rational adaptation to time pressure, not primarily a cognitive failure. Simple stories win because they are fast to construct, communicate, and act on. Complex stories may be more accurate but are too slow to be decision-relevant. The intervention is not overcoming bias but compressing the time cost of complex answers.

**Critical test:** In environments where complex answers are available at the same speed as simple ones (e.g., a well-designed dashboard vs. a raw dataset), do decision-makers still prefer simple narratives? If yes, H0/HA-ARIA is supported. If they shift to engaging with complexity when the time cost drops, HA-OURS is supported.



# H4. On rare events: prediction vs. response

*responding to rare events, not predicting them*

**H0 (Status quo):** Planning for averages is sufficient. Rare events are exceptions to be handled reactively when they occur, through existing crisis management processes.

**HA-ARIA:** We should develop better foresight capabilities to proactively steer toward preferred futures and away from undesirable ones. The futures cone (Preposterous → Preferable) implies expanding our ability to anticipate and choose.

**HA-OURS:** Rare events are unpredictable by definition (Taleb). Investing in prediction of inherently unpredictable events produces false confidence. The more useful capability is rapid situational awareness *during* the event, not "predict the next Suez blockage" but "the Suez is blocked; what are our options in the next 72 hours?"

**Critical test:** What is the track record of foresight methodologies in predicting specific rare events (not in identifying that rare events will occur generically)? If foresight methods have low specificity for rare events but high value for routine strategic planning, both HA-ARIA and HA-OURS may be correct for different decision types, proactive foresight for slow-moving trends, rapid response capability for shocks.



# H5. On the integration layer

*the integration layer has been explored without results*

**H0 (Status quo):** The bottleneck to better collective outcomes is in foundational technologies. We need better models, better algorithms, better data.

**HA-ARIA:** The foundational technologies are ripe. The under-explored gap is the integration layer, combining existing capabilities into systems that help societies see, reason, and choose together.

**HA-OURS:** The integration layer has been extensively explored, but without producing results that survive real-world conditions. The gap is not that nobody has tried integration, but that integrated systems are still too slow, too complex, and too brittle for actual use under pressure. The specific under-explored question is: what does AI research *in* the integration layer look like, AI that mediates between human cognitive constraints and system complexity in real time?

**Critical test:** Can ARIA cite integrated systems (not individual capabilities) that have been deployed and adopted under real-world pressure? If many have been built but few adopted, the question shifts from "how to integrate" to "why integration products fail in practice."



# H6. On cooperation in multi-stakeholder systems

*collective progress is vulnerable to sabotage by fast actors*

**H0 (Status quo):** Actors in multi-stakeholder systems will cooperate when given appropriate tools and incentives. Coordination failure is primarily a communication and alignment problem.

**HA-ARIA:** New coordination mechanisms and incentive structures can enable collective progress. Mechanism design theory (cited in bibliography) provides the theoretical foundation.

**HA-OURS:** In multi-stakeholder systems with asymmetric incentives, the Nash equilibrium is usually defection, not cooperation. Coordination without enforcement is systematically exploitable. Information sharing, the known solution to supply chain coordination failures like the bullwhip effect, is systematically refused because it erodes competitive advantage. Deliberative scaffolding that requires voluntary cooperation from self-interested actors will be gamed.

**Critical test:** In the supply chain domain, has any voluntary information-sharing initiative achieved sustained multi-tier adoption without regulatory compulsion? The EU CSDDD's existence (forcing due diligence by law) is itself evidence that voluntary coordination failed. If similar patterns hold across domains, HA-OURS is supported, and the practical implication is that shared situational awareness must be built from public data, not from voluntary disclosure.



# H7. On critical thinking vs. deliberation

*what is actually needed is critical thinking infrastructure*

**H0 (Status quo):** Better information and better communication tools lead to better collective decisions. The constraint is access to information and the ability to share perspectives.

**HA-ARIA:** Deliberative scaffolding, tools for seeing, reasoning, and choosing together, produces better collective outcomes. The emphasis is on the scaffolding (the process) rather than the cognitive capability of participants.

**HA-OURS:** The missing precondition is not scaffolding but critical thinking, the ability to question assumptions, evaluate claims, and test alternatives. Deliberation without critical thinking produces faster consensus on worse ideas. The time-to-question thesis is fundamentally about making critical thinking economically viable: if testing an assumption takes three weeks of data preparation, the assumption goes untested. If it takes thirty seconds on a knowledge graph, everything gets questioned.

**Critical test:** In controlled experiments, does providing better deliberation process (structured dialogue, facilitation, voting mechanisms) improve decision quality *more or less* than providing better tools for testing claims against evidence? This is an empirically testable question that would distinguish HA-ARIA from HA-OURS.



# H8. On the analytical tempo gap

*the gap between analytical and operational tempo*

**H0 (Status quo):** Decision-making environments are generally stable enough for deliberative processes to operate. Time pressure exists but can be managed through better planning and earlier engagement.

**HA-ARIA (implicit):** There is time for collective, slow, and deliberate decision-making. The document's framing, futures cones, evidence synthesis, belief elicitation, distributed deliberation, assumes decision windows of months to years.

**HA-OURS:** This assumption reflects environments where analysis can run unhurried because the situation under study does not change while the analysis is being done. Operational environments work differently: the situation changes continuously, strategic decisions can happen in minutes, and the value of an answer decays with delay. The document identifies the problem as fast-moving complexity but prescribes solutions calibrated to a slower tempo than the systems it describes operate at.

**Critical test:** Survey actual decision-makers (supply chain managers, emergency responders, policy-makers during crises) on the decision windows they face. If the majority report decision windows of hours to days (not months to years), the document's implicit time-frame assumption is unsupported. Note: Wheeler's single handwritten word "quickly" suggests awareness of this gap.



# H9. On the decision validity window

*in landscape-altering environments, slow decisions become wrong decisions*

**H0 (Status quo):** Speed and quality trade off linearly. Slower analysis yields better decisions. The optimal strategy is to take as much time as is available to improve the analysis.

**HA-OURS:** In environments where decisions alter the landscape (competitive markets, supply chain crises, multi-actor geopolitical situations) the value of a decision degrades over time. A perfect decision computed against a landscape that has already shifted is worse than a good-enough decision made while the landscape matched the analysis. Slow decisions don't just arrive late; they become wrong. The decision validity window, the time during which an analysis remains accurate enough to act on, is the binding constraint.

**Critical test:** This is testable in supply chain contexts. Compare outcomes of firms that committed to sourcing decisions early (fast, suboptimal analysis) versus late (thorough, theoretically optimal analysis) during the semiconductor shortage. Toyota's early commitment to supplier relationships vs. competitors' optimised-but-late procurement is a natural experiment. If fast-movers systematically outperformed in volatile periods, HA-OURS is supported.

**Note:** No HA-ARIA is listed because the opportunity space document does not explicitly address this dynamic. The stable-landscape assumption is implicit, not stated.



# H10. On understanding vs. action

*understanding without action is enlightenment*

**H0 (Status quo):** Improving collective understanding automatically improves collective action. Better-informed people make better decisions. Enlightenment leads to progress.

**HA-ARIA (implicit):** The six themes, spanning both understanding (1, 3, 6) and action (4, 5), can be addressed within a single programme. Building capabilities for both serves the same objective.

**HA-OURS:** Understanding and action have fundamentally different time signatures. Understanding can be slow and cumulative. Action must fit within the decision validity window. A programme that treats them as the same problem, or assumes that solving understanding automatically solves action, will produce research that nobody uses when it matters. The programme must explicitly choose which it is optimising for, or explicitly design for the handoff between them.

**Critical test:** Examine past programmes that invested heavily in collective understanding tools (e.g., citizen assemblies, deliberative polling, open data portals). Did improved understanding translate into measurably different actions or outcomes? Or did the understanding remain in the enlightenment domain, more informed citizens who still faced the same structural barriers to action?



# H11. On single-turn vs. compounding iteration

*the missing iteration loop*

**H0 (Status quo):** Better individual answers lead to better outcomes. The unit of progress is the quality of a single analysis, recommendation, or decision.

**HA-ARIA (implicit):** The six themes are independent capabilities to be developed. Each theme (knowledge platforms, evidence synthesis, belief elicitation, scenario analysis, decision-making, cognitive autonomy) is a contribution in its own right.

**HA-OURS:** The fundamental unit of progress is not a single answer but the compounding question-answer iteration cycle. More questions lead to more answers lead to better questions lead to better answers. The value is in the iteration rate, not the quality of any individual turn. This is the scientific method applied to collective reasoning. Any system that treats its capabilities as independent, single-turn tools, rather than designing for rapid cycling between them, will fail to produce the compounding insight that drives real progress.

**Critical test:** Compare decision quality when a planner gets one high-quality answer (expensive, thorough, single-turn) versus ten rapid iterations of question-answer-revised-question (cheap, fast, compounding). The LGA architecture's P1 predicts the iterative approach wins: "five iterations in twenty minutes produces a more robust plan than two iterations over four weeks." This is empirically testable.



# H12. On inspectability as the bridge

*fast grounded decisions enable collective learning*

**H0 (Status quo):** Fast decisions by a few necessarily exclude the collective from understanding, agency, and accountability. Speed and collective participation are in zero-sum tension.

**HA-ARIA (implicit):** Decisions should be made collectively, through deliberation, negotiation, and shared reasoning, to ensure collective flourishing. The emphasis is on inclusive process.

**HA-OURS:** Speed and collective agency are not in zero-sum tension if fast decisions produce inspectable, grounded reasoning traces. Gut instinct is opaque, nobody can reconstruct or challenge the reasoning. Decisions made through micro-tools on knowledge graphs leave a complete trail: the questions asked, the data queried, the scenarios compared, the trade-offs evaluated. This trail becomes the substrate for collective learning, opinion-formation, and accountability *after* the decision. The collective doesn't need to be present at the moment of decision, it needs access to the reasoning.

**Critical test:** Compare public trust and collective learning outcomes for two types of government decisions: (a) fast decisions justified by narrative ("we had no choice"), and (b) fast decisions accompanied by a published analytical trace (the scenarios considered, the trade-offs evaluated, the alternatives rejected with reasons). If (b) produces measurably higher trust, engagement, and accountability, HA-OURS is supported. If collective participation in the process itself (not just access to the trace) is required, HA-ARIA is supported.



# H13. On adversarial tempo asymmetry: questions as weapons of delay

*climate policy as the strongest supporting case*

**H0 (Status quo):** Demands for more research and analysis before action are legitimate expressions of due diligence. Disagreements about method reflect genuine complexity, not strategic behaviour.

**HA-OURS:** In any deliberation process, asking a question is cheap and fast; answering it rigorously is expensive and slow. Adversaries who benefit from the status quo exploit this asymmetry systematically: they inject legitimate questions faster than the deliberation can produce answers, and each unanswered question becomes justification for delay. Once delay is established, they fragment the coalition by promoting genuine disagreements about method: divide-and-conquer applied to deliberation, not armies. The coalition argues internally about what to do; the adversary operates externally under the status quo.

The causal chain is: (1) tempo asymmetry: questions are cheap, answers are expensive; (2) delay through legitimate inquiry: demanding analysis before action is socially unimpeachable, because it sounds like responsibility, not obstruction; (3) divide-and-conquer: once delay is established, fragment the coalition by funding genuine disagreements about method (carbon tax vs. cap-and-trade, renewables vs. nuclear, mitigation vs. adaptation); (4) landscape change as consequence: the world changes during the delay, but the delay is caused by the adversary's tempo advantage, not by inherent complexity. The complexity is real, but it is weaponised.

Climate policy is the strongest supporting case. It is the most thoroughly modelled, most extensively deliberated, most comprehensively analysed collective challenge in human history, with near-perfect scientific consensus, and it has produced insufficient action. All the modelling, policy analysis, consensus, frameworks, and legislation is going to be extremely useful one day to understand why we failed to take action and prevent it. That is collective enlightenment working exactly as designed, producing understanding, while failing completely at its implicit promise that understanding leads to action. The fossil fuel industry's documented strategy of first funding climate scepticism, then pivoting to funding disagreements about solutions, is the textbook case.

The intervention follows directly: compress time-to-answer so that questions cannot be used as delay tactics. If every "but what about...?" can be answered with scenario analysis in days rather than years, the obstruction strategy collapses. You cannot stall a process that answers questions faster than you can ask them.

**Critical test:** Examine domains where analytical response time has been compressed (e.g., financial regulation with real-time market surveillance, military OODA loops). Has the compression reduced the effectiveness of delay-through-inquiry tactics? Conversely, examine domains with long analytical cycles (climate, urban planning, pharmaceutical regulation). Is there a correlation between answer latency and the documented use of strategic delay by adversarial actors?

**Note:** This hypothesis reframes self-critique #1 from the original register. The original questioned whether our thesis was domain-specific (supply chains and crises) and whether multi-year domains like climate policy might be genuine counter-examples. The analysis above suggests climate is not a counter-example but the strongest supporting case, the long time horizon did not enable better deliberation; it enabled more effective adversarial delay.



# H14. On LLMs as evidence and as new benchmark

*LLMs as evidence and as challenge*

**H0 (Status quo):** Decision quality depends on rigorous analysis. People prefer accurate answers over fast ones when the stakes are high. Warnings about unreliability deter adoption of unreliable tools.

**HA-OURS:** LLMs have already performed the societal-scale experiment that the ttQ/ttA thesis predicts. They collapsed time-to-answer from hours or days to seconds, and adoption has been explosive despite known unreliability and explicit warnings about hallucination. This is empirical proof, through revealed preference at scale, that people optimise for speed over accuracy when speed is sufficiently compressed. LLMs are post-trained specifically to always provide an answer, a design choice validated by user preference data that confirms the primacy of ttA.

This sets a new competitive benchmark. Before LLMs, rigorous analysis competed against gut instinct. Now it competes against AI that is faster than gut instinct and more articulate, even when wrong. Any rigorous approach that cannot match this tempo will be bypassed, not in favour of gut instinct (the old default) but in favour of confident, fluent, ungrounded AI answers (the new default). It is not a zero-sum game of AI versus rigorous approaches; it is that a new benchmark has been set.

The opportunity is that the same AI technology, grounded in structured knowledge graphs and inspectable reasoning chains, can deliver speed and rigour simultaneously. The risk is that ungrounded AI answers become the new default, replacing gut instinct not with rigour but with fluent confabulation. The architecture must be built for AI, not as an afterthought but as the primary design constraint, so that when the speed benchmark is met, it is met with grounded, traceable answers.

The caution applies reflexively: LLMs building things faster, including the systems described here, face the same speed-quality dynamic. The compiler-as-correctness-gate (choosing Rust over Python) is a deliberate brake; the AI writes code fast, but the compiler enforces correctness. Speed without grounding at the build layer produces the same failure as speed without grounding at the decision layer.

**Critical test:** Compare decision outcomes in domains where LLMs are adopted for consequential decisions (medical, legal, financial) against decisions made through traditional rigorous analysis. If LLM-assisted decisions show comparable or better outcomes despite lower per-answer accuracy, because the speed enables more iterations and faster course-correction, HA-OURS is strongly supported. If LLM-assisted decisions show systematically worse outcomes, the speed-over-accuracy preference is maladaptive and needs correction rather than accommodation. Also: examine whether commercial LLM training pipelines (RLHF reward models, A/B testing) have been explicitly optimised for ttA minimisation, and whether this was a deliberate design choice or an emergent property of user preference data.

**Note:** No HA-ARIA is listed because the opportunity space document does not address the LLM speed benchmark or its implications for the tempo of collective reasoning.

# Open questions for self-critique

The following questions are directed at our own hypotheses, identifying where they may be weakest:

1. **~~HA-OURS on speed may be domain-dependent.~~ Resolved, see H13.** The climate case demonstrates that long-horizon domains are not counter-examples to the speed thesis. They are the strongest supporting cases: adversaries exploit the slow tempo of deliberation through question injection and divide-and-conquer. The long time horizon enabled more effective obstruction, not better deliberation.

2. **The critical thinking hypothesis may be circular.** We argue that critical thinking is the precondition. But critical thinking requires time (to question, to test, to evaluate). If we then argue for speed, are we not arguing for less critical thinking, or are we genuinely arguing that AI can compress critical thinking without degrading it? The compression claim needs empirical evidence.

3. **The inspectability bridge may be idealistic.** We argue that fast decisions with inspectable traces enable collective learning. But in practice, how many people actually inspect reasoning traces? FOI requests exist; few citizens use them. Open data portals exist; few citizens query them. The trace may be necessary but not sufficient, and the sufficiency question is sociological, not technical.

4. **The sabotage hypothesis may prove too much.** If Nash equilibrium is defection in all multi-stakeholder systems, then collective flourishing is impossible by construction, not just under time pressure but in principle. This would undermine not just ARIA's framing but ours as well, since we still claim that inspectable traces enable collective accountability. Accountability requires some actors to care about the trace, which requires some degree of cooperative intent.

5. **The iteration rate hypothesis assumes the problem is decomposable.** The scientific method works when you can isolate variables and run controlled experiments. Many collective flourishing challenges (polarisation, institutional trust, value alignment) may not decompose into testable hypotheses that can be iterated over rapidly. The compounding iteration cycle may apply to operational decisions but not to the deeper structural challenges Wheeler identifies.

6. **We may be conflating two audiences.** Pillar VC wants a venture narrative. ARIA wants a research programme. Wheeler wants programme design input. The hypothesis framing serves intellectual rigour, but the application must serve all three audiences. Some of our strongest hypotheses (e.g., H6 on defection, H9 on landscape-altering environments, H13 on adversarial tempo asymmetry) may be too pessimistic for a programme that is fundamentally optimistic about collective human capacity.

7. **The LLM evidence may prove too much in the wrong direction.** If H14 is correct and people adopt fast-but-unreliable answers over slow-but-rigorous ones, this is evidence for the speed thesis, but it also suggests that grounding may not matter to users. If people are satisfied with ungrounded LLM answers, the market for grounded, inspectable, knowledge-graph-backed answers may be smaller than we assume. The revealed preference data shows people optimise for speed, not for inspectability. Our architecture adds grounding and traceability on top of speed, but users may not value the grounding enough to pay the marginal cost. The venture case depends on grounding being valued; the research case doesn't. This tension between H14 (speed wins) and H12 (inspectability enables collective learning) needs resolution: who is the buyer of inspectability, and is it the decision-maker or the collective that holds them accountable?