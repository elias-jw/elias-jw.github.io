+++
title = "When deliberation meets reality"
date = "2026-03-31"
description = "A response to ARIA's Collective Flourishing opportunity space. The missing precondition for collective flourishing is critical thinking infrastructure that operates fast enough to survive contact with reality."
+++

*A response to ARIA's Collective Flourishing opportunity space*

[ARIA's Collective Flourishing programme](https://aria.org.uk/opportunity-spaces/collective-flourishing/), led by Dr Nicole Wheeler, asks an important question: what if we could build the tools that allow societies to move from reactively correcting the past to consciously creating the future? The [opportunity space document](https://www.aria.org.uk/media/qvhfnuta/aria-collective-flourishing-opportunity-space_accessible.pdf) identifies a real problem, that our tools for navigating complexity have not kept pace with the world, and proposes "deliberative scaffolding" as the solution: tools and protocols that help societies see, reason, and choose together.

I agree with the diagnosis. As a first draft, I feel there are critical aspects not yet addressed: the role of decision speed (chronically underestimated) and the viability of collective deliberation under real-world pressure (often overestimated). And then the scientific question underneath both: why analytically superior methods are universally abandoned when they matter most. To be fair, this is incredibly difficult to study scientifically. It has to be tested in high-pressure environments with real stakes, which is not a setup that lends itself to controlled experiments. What follows is a constructive critique, developed alongside my own work on spatial knowledge graphs and AI-augmented decision support for supply chain systems.

The core argument: the missing precondition for collective flourishing is critical thinking infrastructure that operates fast enough to survive contact with reality. Fast question-answer tools that compress months of analysis into minutes, compound through rapid iteration, and leave inspectable traces that the collective can learn from, challenge, and use to hold decision-makers accountable.

## How decisions actually work

*Hypothesis: the quality of a decision is determined by the number of question-answer iterations before it, not the brilliance of any single answer.*

![Decision question-answer loop](01_decision_question_answer_loop.svg)

Every decision requires action, but before acting, there are questions. We have a hypothesis about how something works or what might happen. We explore, have conversations, gather data, and get answers. If we're confident in those answers, we decide and act. If not, we refine the hypothesis and go again. This is the scientific method, simplified.

And good answers open better questions. A manufacturer asking "which suppliers can deliver within two weeks?" gets an answer, and that answer leads to "what if we dual-source from the two fastest?" which leads to "is the cheaper option dependent on the same shipping route as our primary?" Each question is sharper than the last, and each only exists because the previous one was answered. The quality of the final decision tracks the number of these iterations, not the brilliance of any single answer.

Now replace that cycle with gut feel. An experienced executive walks into a room, looks at the situation, and decides based on gut. The business ends up doing well, but research shows it's mostly due to luck[^1]. The executive gets the credit anyway. And the process leaves nothing behind: no trace of what was considered, what was rejected, what assumptions were tested. Nobody else can learn from it or challenge it, and when they're wrong, nobody can reconstruct why.

This matters when the stakes are high. Bad decisions on infrastructure placement waste millions. Bad decisions on supply chains during a crisis cascade through thousands of businesses. Bad decisions on climate policy affect billions. The difference between good and bad decisions at scale is whether the question-answer cycle ran properly or got skipped.

# Part 1: why current approaches fail under pressure

## The field is not under-explored. The question is why nothing works.

*Hypothesis: collective decision-making methods are not under-explored. The under-explored question is why they are universally abandoned under pressure.*

ARIA requires that an opportunity space be "under-explored relative to its potential impact." But collective decision-making has been extensively studied for decades. Multi-criteria decision analysis, problem structuring methods, Delphi, scenario planning, deliberative democracy platforms. The toolkit is large and mature. The academic literature on wicked problems dates to Rittel and Webber in 1973[^2]. Polis, cited in Wheeler's own bibliography, has been running since 2014 and was deployed in Taiwan's vTaiwan process in 2015. Fuzzy cognitive maps date to the 1980s.

These methods work in idealised, low-pressure environments. The moment things get critical and tough, people revert to gut feel and spreadsheets. Klein's research on naturalistic decision-making confirmed this across firefighters, military commanders, and ICU nurses: experts under pressure don't compare options analytically, they recognise patterns and satisfice[^3]. During Hurricane Katrina, FEMA's centralised planning process couldn't figure out how to move supplies into New Orleans. Walmart, using decentralised decision-making and the same logistics infrastructure it runs every day, had trucks of water and food past the roadblocks two days before the government showed up. The CEO's instruction to staff was simple: make the best decision you can with the information available to you[^4].

What is genuinely under-explored is a scientific question: why are analytically superior methods universally abandoned when they matter most?

## The speed contradiction

*Hypothesis: the binding constraint on decision quality is not analytical rigour but decision speed.*

![Decision validity window](02_decision_validity_window.svg)

Wheeler's document talks about helping societies "see, reason, and choose together." But "together" implies consensus processes, and consensus is slow by design. Democracy is slow by design. Multi-criteria deliberation is slow by design. And the same document identifies a world becoming more volatile, with increasing risk of polycrises.

These two claims are in tension.

Under crisis conditions, the neurological switch from System 2 (analytical) to System 1 (intuitive) processing is a biological constraint. Yu's SIDI model, published in *Neurobiology of Stress* (2016), provides the evidence: stress forces diminished prefrontal executive control and exaggerated subcortical reactive activity[^5]. Deliberative scaffolding doesn't change the neuroscience. The only intervention that works is compressing analytical reasoning to fit within the decision window.

Wheeler's own framing hints at this tension, asking how we can coordinate actors to act "quickly and with an awareness of possible outcomes." The word "quickly" is doing a lot of work there, and the opportunity space would benefit from giving it more room.

## Simple stories win because they are fast, not because people are stupid

*Hypothesis: the preference for simple stories is a rational adaptation to time pressure, not a cognitive bias.*

The document observes that "complexity and uncertainty are uncomfortable, so we favour simple stories and confident answers, even when they are wrong." This is presented as a cognitive bias to overcome.

I think the framing is wrong. Simple stories and confident answers are quick. The preference for simple stories is probably a rational adaptation to time pressure. Complex stories take too long to construct and communicate. Gigerenzer's research on heuristic decision-making supports this: in many real-world conditions, ignoring part of the information leads to more accurate judgments than weighting and integrating everything[^6].

If that's true, the solution changes. You don't teach people to tolerate complexity. You make complex answers as fast to access as simple ones.

## In landscape-altering environments, slow decisions become wrong decisions

*Hypothesis: in environments where decisions alter the landscape, slow decisions are not merely late. They are wrong.*

![Landscape-altering decisions](03_landscape_altering_decisions.svg)

In any environment where decisions alter the decision landscape, the value of a decision degrades over time. A perfect decision made after the landscape has shifted is worse than a good-enough decision made while the landscape still matches the one you analysed. Slow deliberation produces analyses of a world that no longer exists.

Boyd understood this in military contexts. The OODA loop works because your decision changes your opponent's landscape, forcing them to re-orient. The actor with the faster loop makes the slower actor's in-progress analysis obsolete[^7]. Boyd was talking about adversarial dyads. In multi-stakeholder systems (supply chains, climate policy, urban planning), everyone's decisions are simultaneously changing everyone else's landscape.

This gives rise to the concept of a *decision validity window*: the time period during which an analysis of the current landscape remains accurate enough to act on. In stable environments (academic research, infrastructure planning, constitutional design), this window is months or years, and deliberation works. In volatile, coupled environments (supply chain crises, competitive markets, geopolitical shocks), this window is hours or days, and deliberation cannot fit. Eisenhardt's study of strategic decision-making in high-velocity industries found that fast decision-makers use more information, not less, and that speed and quality are not trade-offs: fast decisions led to superior performance[^8].

C-level executives are, by selection, critical thinkers. They are trained in structured analysis, have access to sophisticated tools, and face decisions with enormous consequences. And yet, under time pressure (competitive public tenders, supply chain disruptions, market shifts), they consistently fall back to gut feel and instincts. And sometimes they excel doing so. The environment does not permit the time critical thinking requires.

There is also a competition for attention. In practice, a gut-feel answer and an analytical answer are often racing for the same decision-maker. A quick answer that leads to a follow-up question outsprints a slow analytical answer. By the time the analytical answer comes through, the situation has moved on, and decision-makers are reluctant to reverse course and start over. The analytical method loses the room before it produces an answer.

## Collective progress is vulnerable to sabotage, and climate proves it

*Hypothesis: collective coordination without enforcement is systematically exploitable through tempo asymmetry.*

The opportunity space frames collective flourishing in terms of shared progress and coordinated action. Game theory tells us that any coordination mechanism without enforcement is vulnerable to defection. Olson's *Logic of Collective Action* established this formally: groups fail to coordinate for collective benefit even when it is in everyone's interest, because individual incentives favour free-riding[^9]. In supply chains, information sharing is the known solution to the bullwhip effect, and firms systematically refuse to do it because sharing information erodes competitive advantage[^10]. The EU Corporate Sustainability Due Diligence Directive is literally a regulatory attempt to force the coordination that the market will not produce voluntarily[^11].

But the sabotage problem goes deeper than defection. It is a problem of tempo.

Climate policy appears to be a counter-example to the speed thesis. It operates on multi-decade time horizons where slow deliberation should be appropriate. But consider the record: climate is the most thoroughly analysed, most extensively deliberated, most comprehensively modelled collective challenge in human history. And it has produced insufficient action. All the modelling, policy analysis, consensus, frameworks, and legislation is going to be extremely useful one day to understand why we failed to take action and prevent it. And therein lies the problem: it's not leading to action.

The primary mechanism is tempo asymmetry. Asking a question is cheap and fast: a press release, a funded study, a lobbying position. Answering it rigorously is expensive and slow: data collection, modelling, peer review, policy analysis. Adversaries exploit this. They don't need to produce better answers, they just need to produce more questions than the system can answer. Every unanswered question becomes justification for delay. "We need more research before we act" is the most effective obstruction strategy ever deployed, because it sounds like a call for rigour.

And divide-and-conquer layers on top. Once delay is established, you fragment the coalition. You don't attack the science, you attack the solution. Carbon tax versus cap-and-trade. Renewables versus nuclear. Mitigation versus adaptation. Each disagreement is genuine and worth debating, but the debate multiplies the questions, each requiring its own slow analysis cycle.

Climate is the strongest supporting case for the speed thesis. The long time horizon enabled more effective adversarial delay, not better deliberation.

The intervention follows directly: compress time-to-answer so that questions cannot be used as delay tactics. You cannot stall a process that answers questions faster than you can ask them.

# Part 2: what would actually work

## The missing iteration loop

*Hypothesis: the fundamental unit of progress in collective reasoning is the question-answer iteration. Value compounds with iteration speed.*

![The compounding inquiry cycle](04_compounding_inquiry_cycle.svg)


There is a pattern in the scientific method that the opportunity space does not address: the compounding inquiry cycle. More questions lead to more answers, which lead to better questions, which lead to better answers. The value is in the iteration rate[^12].


Looking through the ARIA document carefully, the framing is single-turn. The six themes (organising knowledge, evidence synthesis, value elicitation, wargaming, decision-making under uncertainty, cognitive autonomy) are treated as independent capabilities. The document never identifies the cycle between them, or the compounding value of rapid iteration, as the thing that needs to be accelerated.

When time-to-answer is large, all energy goes into finding answers, leaving almost nothing for finding questions. The questions are where the value is. The answers are the mechanism by which you earn the right to ask a better question[^12]. When time-to-answer collapses, you get different, better questions that you would never have thought to ask, because the previous answer revealed something unexpected.

This is the scientific method. Hypothesis, experiment, observation, revised hypothesis, better experiment. Breakthroughs come from environments that compress the experimental cycle: Faraday's bench experiments, Edison's Menlo Park, modern high-throughput drug screening. The scientific revolution was the formalisation of rapid, iterative empiricism.

Any system for collective flourishing that doesn't explicitly design for rapid cycling between understanding and action will produce the same single-turn outputs that have failed for decades.

## The bridge: fast grounded decisions enable collective learning; gut instinct does not

*Hypothesis: fast decisions made through inspectable tools enable collective learning. Gut-instinct decisions do not.*

![Inspectable traces bridge](05_inspectable_traces_bridge.svg)


Everything above seems like an argument against collective flourishing. Fast decisions by a few, slow deliberation irrelevant, sabotage inevitable. But that conclusion only holds if fast decisions are opaque. And gut-instinct decisions are opaque by definition.

Nobody, not the decision-maker, not their organisation, not the affected public, can reconstruct why a gut-instinct choice was made. "I had a feeling" is not inspectable. "The spreadsheet said so" is barely better. The assumptions are buried, the alternatives unexplored, the reasoning invisible. The collective is locked out because the decision process left no trace.

And it's a lose-lose for the decision-makers too. Many situations require quick decisions by a few key people, and those people can and should be held accountable by the collective. But right now they can't rely on anything other than gut feel, and when they're wrong, they can't defend their actions. The ones who thrive are the ones who happen to be right, which over time becomes a game of chance. Or the ones who claim they are always right, despite evidence to the contrary. The need for inspectable tools cuts both directions: the collective needs them for accountability, and the decision-makers need them for defensibility.

Now consider the alternative. Decisions made through structured tools operating on knowledge graphs, with minimised time-to-question and time-to-answer. The decision itself is still fast, minutes not weeks. It may still be made by a few people in a room. But the process leaves a complete, inspectable trace: the question asked, the data queried, the scenarios compared, the trade-offs evaluated, the alternatives considered and rejected. Every step is grounded in queryable evidence, not narrative.

That trace becomes the substrate for collective understanding. After the fast decision, the collective can inspect the reasoning. They can ask: why was option B rejected? What assumptions drove the scenario comparison? What would have changed if we weighted environmental impact more heavily? These are queries against the same evidence infrastructure that supported the original decision. The collective isn't second-guessing in the dark. They're engaging with the actual reasoning, grounded in the actual evidence.

And this addresses the sabotage problem. Opaque decisions by powerful actors are unaccountable by nature. Decisions made through inspectable, grounded tools are accountable by construction. A corporation that claims "we had no alternative" can be challenged with the same evidence that shows what alternatives existed.

Wheeler's vision of collective flourishing, where societies see, reason, and choose together, doesn't require that every decision be made collectively in real time. It requires that decisions, however fast and however narrow the decision-making group, produce reasoning that the collective can inspect, learn from, and use to hold decision-makers accountable.

## The missing precondition

The under-explored gap is why analytically superior methods are universally abandoned when they matter most. The answer is the decision speed gap: any tool that operates slower than the decision cycle gets bypassed.

The missing precondition for collective flourishing is critical thinking infrastructure: systems that make it cheap and fast to question assumptions, test claims against structured evidence, and explore counterfactual futures. Tools that help people think harder without it being slower.

Understanding without action is enlightenment. Action without understanding is recklessness. Understanding that arrives after the action window has closed is irrelevant. The challenge is compressing rigorous, iterative understanding into the action window, and doing it in a way that leaves a trace the rest of us can learn from.

Wheeler's deliberative scaffolding vision is incomplete. The scaffolding needs a foundation, and that foundation is the ability to reason rigorously at the speed the world demands.

# References

[^1]: Fitza, M.A. (2014) 'The use of variance decomposition in the investigation of CEO effects: how large must the CEO effect be to rule out chance?', *Strategic Management Journal*, 35(12), pp. 1839–1852. Available at: [https://doi.org/10.1002/smj.2192](https://doi.org/10.1002/smj.2192).
*Note:* Quigley, T.J. and Graffin, S.D. (2017) 'Reaffirming the CEO effect is significant and much larger than chance: a comment on Fitza (2014)', *Strategic Management Journal*, 38(3), pp. 793–801, available at [https://doi.org/10.1002/smj.2503](https://doi.org/10.1002/smj.2503), offered a rebuttal arguing the effect is significant; Fitza, M.A. (2017) 'How much do CEOs really matter? Reaffirming that the CEO effect is mostly due to chance', *Strategic Management Journal*, 38(3), pp. 802–811, available at [https://doi.org/10.1002/smj.2597](https://doi.org/10.1002/smj.2597), responded with a counter-rebuttal. The debate continues, but both sides agree that industry and macroeconomic factors explain the majority of variance in firm performance. See also Keller, T., Glaum, M., Bausch, A. and Bunz, T. (2023) 'The "CEO in context" technique revisited: a replication and extension of Hambrick and Quigley (2014)', *Strategic Management Journal*, 44(4), pp. 1111–1138. Available at: [https://doi.org/10.1002/smj.3469](https://doi.org/10.1002/smj.3469).

[^2]: Rittel, H.W.J. and Webber, M.M. (1973) 'Dilemmas in a general theory of planning', *Policy Sciences*, 4(2), pp. 155–169. Available at: [https://doi.org/10.1007/BF01405730](https://doi.org/10.1007/BF01405730).
*Note:* For a 52-year retrospective confirming the enduring influence of the framework, see Peters, B.G., Head, B.W., Danaeefard, H. and Khosravi, M. (2026) 'What do we know about wicked problems after nearly 52 years? Tracing the DNA of wicked problems through a bibliometric study', *Administration & Society*. Available at: [https://doi.org/10.1177/00953997251415534](https://doi.org/10.1177/00953997251415534).

[^3]: Klein, G. (1998) *Sources of power: how people make decisions*. Cambridge, MA: MIT Press. Available at: [https://mitpress.mit.edu/9780262611466/sources-of-power/](https://mitpress.mit.edu/9780262611466/sources-of-power/) (Accessed: 7 April 2026).
*Note:* See also Klein, G. (1993) 'A recognition-primed decision (RPD) model of rapid decision making', in Klein, G.A., Orasanu, J., Calderwood, R. and Zsambok, C.E. (eds) *Decision making in action: models and methods*. Norwood, NJ: Ablex Publishing, pp. 138–147. A 2023 systematic review of 32 empirical studies confirmed RPD in all studies that analysed decision-making strategy: Reale, C., Salwei, M.E., Militello, L.G., Weinger, M.B., Burden, A., Sushereba, C., Torsher, L.C., Andreae, M.H., Gaba, D.M., McIvor, W.R., Banerjee, A., Slagle, J. and Anders, S. (2023) 'Decision-making during high-risk events: a systematic literature review', *Journal of Cognitive Engineering and Decision Making*, 17(2), pp. 188–212. Available at: [https://doi.org/10.1177/15553434221116822](https://doi.org/10.1177/15553434221116822).

[^4]: Horwitz, S. (2009) 'Wal-Mart to the rescue: private enterprise's response to Hurricane Katrina', *The Independent Review*, 13(4), pp. 511–528. Available at: [https://www.independent.org/pdf/tir/tir_13_04_3_horwitz.pdf](https://www.independent.org/pdf/tir/tir_13_04_3_horwitz.pdf) (Accessed: 7 April 2026).
*Note:* For context on the broader theory–practice gap in humanitarian logistics, see Rodríguez-Espíndola, O., Ahmadi, H., Gastélum-Chavira, D., Ahumada-Valenzuela, O., Chowdhury, S., Dey, P.K. and Albores, P. (2023) 'Humanitarian logistics optimization models: an investigation of decision-maker involvement and directions to promote implementation', *Socio-Economic Planning Sciences*, 89, 101669. Available at: [https://doi.org/10.1016/j.seps.2023.101669](https://doi.org/10.1016/j.seps.2023.101669).

[^5]: Yu, R. (2016) 'Stress potentiates decision biases: a stress induced deliberation-to-intuition (SIDI) model', *Neurobiology of Stress*, 3, pp. 83–95. Available at: [https://doi.org/10.1016/j.ynstr.2015.12.006](https://doi.org/10.1016/j.ynstr.2015.12.006).
*Note:* The stress–decision link is confirmed across domains in Reale, C., Salwei, M.E., Militello, L.G., Weinger, M.B., Burden, A., Sushereba, C., Torsher, L.C., Andreae, M.H., Gaba, D.M., McIvor, W.R., Banerjee, A., Slagle, J. and Anders, S. (2023) 'Decision-making during high-risk events: a systematic literature review', *Journal of Cognitive Engineering and Decision Making*, 17(2), pp. 188–212. Available at: [https://doi.org/10.1177/15553434221116822](https://doi.org/10.1177/15553434221116822).

[^6]: Gigerenzer, G. and Gaissmaier, W. (2011) 'Heuristic decision making', *Annual Review of Psychology*, 62, pp. 451–482. Available at: [https://doi.org/10.1146/annurev-psych-120709-145346](https://doi.org/10.1146/annurev-psych-120709-145346).
*Note:* Extended to organisational decision-making in Gigerenzer, G., Reb, J. and Luan, S. (2022) 'Smart heuristics for individuals, teams, and organizations', *Annual Review of Organizational Psychology and Organizational Behavior*, 9, pp. 171–198, available at [https://doi.org/10.1146/annurev-orgpsych-012420-090506](https://doi.org/10.1146/annurev-orgpsych-012420-090506). See also Spiliopoulos, L. and Hertwig, R. (2024) 'Stochastic heuristics for decisions under risk and uncertainty', *Frontiers in Psychology*, 15, 1438581. Available at: [https://doi.org/10.3389/fpsyg.2024.1438581](https://doi.org/10.3389/fpsyg.2024.1438581).

[^7]: Boyd, J.R. (1987) *A discourse on winning and losing*. Unpublished briefing. Available at: [https://www.colonelboyd.com/s/Discourse-on-Winning-and-Losing-Boyd.pdf](https://www.colonelboyd.com/s/Discourse-on-Winning-and-Losing-Boyd.pdf) (Accessed: 7 April 2026).
*Note:* For a supply chain application of OODA-loop thinking, see the contrast between Walmart's distributed rapid-response and FEMA's centralised deliberation during Hurricane Katrina, documented in Horwitz, S. (2009) 'Wal-Mart to the rescue: private enterprise's response to Hurricane Katrina', *The Independent Review*, 13(4), pp. 511–528.

[^8]: Eisenhardt, K.M. (1989) 'Making fast strategic decisions in high-velocity environments', *Academy of Management Journal*, 32(3), pp. 543–576. Available at: [https://doi.org/10.5465/256434](https://doi.org/10.5465/256434).
*Note:* Tested across multiple industries and environmental contexts in Shepherd, N.G., Mooi, E.A., Elbanna, S. and Rudd, J.M. (2021) 'Deciding fast: examining the relationship between strategic decision speed and decision quality across multiple environmental contexts', *European Management Review*, 18(3), pp. 119–140. Available at: [https://doi.org/10.1111/emre.12446](https://doi.org/10.1111/emre.12446).

[^9]: Olson, M. (1965) *The logic of collective action: public goods and the theory of groups*. Cambridge, MA: Harvard University Press. Available at: [https://www.hup.harvard.edu/books/9780674537514](https://www.hup.harvard.edu/books/9780674537514) (Accessed: 7 April 2026).
*Note:* The 2007 Nobel Prize in Economics to Hurwicz, Maskin and Myerson for mechanism design theory confirms the centrality of Olson's collective action problem: the field exists because voluntary coordination systematically fails.

[^10]: Lee, H.L., Padmanabhan, V. and Whang, S. (1997) 'The bullwhip effect in supply chains', *Sloan Management Review*, 38(3), pp. 93–102. Available at: [https://sloanreview.mit.edu/article/the-bullwhip-effect-in-supply-chains/](https://sloanreview.mit.edu/article/the-bullwhip-effect-in-supply-chains/) (Accessed: 7 April 2026).
*Note:* Bullwhip dynamics were observed at global scale during COVID-19. For recent work on how supply chain networks transmit systemic financial risk, see Fialkowski, J., Diem, C., Borsos, A. and Thurner, S. (2025) 'A data-driven econo-financial stress-testing framework to estimate the effect of supply chain networks on financial systemic risk', arXiv preprint, arXiv:2502.17044. Available at: [https://arxiv.org/abs/2502.17044](https://arxiv.org/abs/2502.17044).

[^11]: European Parliament and Council of the European Union (2024) *Directive (EU) 2024/1760 of the European Parliament and of the Council of 13 June 2024 on corporate sustainability due diligence and amending Directive (EU) 2019/1937 and Regulation (EU) 2023/2859*. Brussels: Official Journal of the European Union. Available at: [https://eur-lex.europa.eu/eli/dir/2024/1760/oj](https://eur-lex.europa.eu/eli/dir/2024/1760/oj) (Accessed: 7 April 2026).
*Note:* Provides for fines of up to 5% of worldwide turnover for non-compliance with supply chain due diligence obligations. The existence of this legislation is itself evidence that voluntary collective coordination failed, consistent with Olson (1965).

[^12]: Girba, T. and Wardley, S. (n.d.) *On rewilding software engineering*. The question-answer iteration concept draws on their observation that when time-to-answer is large, organisational energy is consumed by finding answers rather than finding questions, and that the questions are where the value compounds. See, e.g., Girba, T. (2024) 'Rewilding software engineering', *feenk blog*. Available at: [https://blog.feenk.com/](https://blog.feenk.com/) (Accessed: 7 April 2026).