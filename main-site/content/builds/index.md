+++
title = "Builds"
date = "2025-01-24"
+++

Welcome to my builds section. This is where I document and showcase various projects I'm working on or have completed.

<div class="about-image">
    <img src="/images/da_vinci_fractal_by_steto123_dfb82kc.png" alt="Da vinci fractal" style="width: 80%; height: auto; display: block; margin: 0 auto;">
</div>
<span style="color: #666; font-size: 0.8em; text-align: center; display: block;"><a href="https://www.deviantart.com/steto123/art/Da-vinci-fractal-925844988">Da vinci fractal</a>, CC BY-NC-SA 3.0
</span>
</br><br>

# Current Projects

## [Critical thinking infrastructure](/builds/critical-thinking-infrastructure/)

An infrastructure platform for logistics planning built around one idea: compress the explore-decide loop. Ask a question, get an answer, ask a better one, all within a single working session. It separates stable spatial knowledge (road networks, facilities, geographies) from volatile project data, and routes planning questions through solvers, LLMs, and spatial engines via a clean ontology layer.

The ideas behind it are developed across a [series of seven essays](/posts/critical-thinking-infrastructure-series/), from motivation through architecture, economics, and the human layer.

## [SGData Platform](/builds/sgdata-platform/)

A [Kedro](https://kedro.org/)-based data platform that sources, processes, and links Singapore geospatial and government data from five sources: the [data.gov.sg](https://data.gov.sg/) open data portal (5,000+ datasets), Foursquare Open Source Places (435K POIs), OpenStreetMap, Overture Maps, and Microsoft Global ML Building Footprints. The pipeline converges everything into a unified spatial-relationship layer spanning 511 datasets and 24,000+ pairwise overlap records.

# Past Builds

## [Singapore Postcode Geocoder](/builds/singapore-postcode-geocoder/)

A [Streamlit app](https://sg-postcode-geocoding.streamlit.app/) that adds lat-long coordinates to a data file containing Singapore postcodes. It automatically finds the right column, extracts postcodes, and returns coordinates. Useful for logistics planning and mapping.

## [MCARPTIF Solver and GUIs](/builds/mcarptif-solver/)

Heuristic solvers and GUIs for city-wide waste and recycling collection problems (Mixed Capacitated Arc Routing Problem under Time restrictions with Intermediate Facilities), completed as part of my [PhD](https://repository.up.ac.za/items/591c1d73-df81-4a30-99f4-fce3906eeee1). The work was adapted into a commercial service and later extended with an agentic LLM-driven planning approach.
