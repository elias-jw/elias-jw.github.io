+++
title = "Singapore Postcode Geocoder"
date = "2025-01-24"
+++

# Singapore Postcode Geocoder

A [simple app](https://sg-postcode-geocoding.streamlit.app/), using [kedro](https://kedro.org/) and [streamlit](https://streamlit.io/), that adds lat-long coordinates to a data file which has Singapore postcodes in it. Any column can contain postcode info, and it can be part of a longer string. The app finds the best column to use, automatically extracts the postcodes, and then adds the lat-long coordinates.

<div class="about-image">
    <img src="/images/sg-postcode-geocoding-streamlit-screenshot.jpg" alt="Singapore postcode geocoder screenshot" style="width: 100%; height: auto; display: block; margin: 0 auto;">
</div>
<span style="color: #666; font-size: 0.8em; text-align: center; display: block;"><a href="https://sg-postcode-geocoding.streamlit.app/">Singapore postcode geocoder</a>
</span>
</br><br>

It's an exercise that I've had to repeat very often when assisting clients with logistics-based planning and analysis. For logistics, you need to know where stuff is located.
Often, this data, specifically the geographical coordinates, is not captured, but there are some address info.
There are various ways and services to go from address info to coordinates, but they tend to be quite slow, some are expensive, and they usually work one address or location at a time (not fun if you are dealing with thousands).
Given that Singapore is really-really-really good at making their data available (check out [data.gov.sg](https://data.gov.sg/)), it's possible to custom-build something that does this.
And after getting the lon-lat coordinates, you can apply some pretty cool models, and you can create some pretty maps.

The app is available at <https://sg-postcode-geocoding.streamlit.app/> and the source code at <https://github.com/second-order-ai/singapore-postcode-geocoding>. The app code is [here](https://github.com/second-order-ai/singapore-postcode-geocoding/tree/main/src/singapore_postcode_geocoding/app) in the repo.
