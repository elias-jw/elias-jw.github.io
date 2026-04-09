+++
title = "MCARPTIF Solver and GUIs"
date = "2025-01-24"
+++

# MCARPTIF Solver and Simple GUIs

These projects deal with solving very-large, city-wide waste and recycling collection problems.

The source code is available at: <https://github.com/ejwillemse/mcarptif>.

A very simple GUI to illustrate how it works is available at: <https://github.com/ejwillemse/mcarptif_gui>.

The code was adapted and eventually made it into a commercial service offering, as per this demo, where we ran planning scenarios:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/vTAcVuoJYQw?si=BoftnswqLJZMrr5J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

We also tested some modifications, such as better clustering through convex-hull constraints:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/CNJHqUYBl2I?si=vSEJsbVcTBPcggYd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

And more recently, we followed an agentic approach, whereby scenarios can be run and compared using LLMs, linked to the algorithms with SKILLS.md files.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://youtu.be/mGZoA4klFts?si=0fEyQioTgXBIn81C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Technical Details

They contain implementations of heuristics to deal with the Mixed Capacitated Arc Routing Problem under Time restrictions with Intermediate Facilities. The problem is directly relevant to waste and recycling collection where a fleet of homogeneous vehicles have to collect waste on streets. Collection routes have to be completed within a certain period, typically corresponding to an 8-hour work day. Vehicles are allowed to unload their waste at intermediate-facilities once they reach capacity. The problem further accounts for mixed-road networks with one and two way streets.

For more information on the problem, see:

* <http://hdl.handle.net/2263/57510>: the thesis contains all the technical details

And there are these publications:

* <https://doi.org/10.1016/j.cor.2015.10.010>: details on the constructive heuristics
* <https://doi.org/10.1016/j.orl.2016.06.001>: details on a splitting procedure used in the constructive heuristics
* <https://doi.org/10.1016/j.dib.2016.06.067>: details on the benchmark instances solved
* <https://doi.org/10.1016/j.cor.2019.02.002>: details on the improvement procedure.

They are all available from <https://www.researchgate.net/profile/Elias_Willemse>.
