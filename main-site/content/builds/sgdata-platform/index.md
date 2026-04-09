+++
title = "SGData Platform"
date = "2025-01-24"
+++

# SGData Platform

**Status: Active** | Source code: <https://github.com/second-order-ai/sgdata_platform>

A [Kedro](https://kedro.org/)-based data platform for sourcing, processing, and analysing Singapore geospatial and government data. It ingests data from five distinct sources, processes each independently through Kedro pipelines, and converges everything into a unified spatial-relationship layer.

## Data Sources

| Source | What it provides | Scale |
|---|---|---|
| [data.gov.sg](https://data.gov.sg/) | Singapore government open data catalogue + downloads | 5,114 datasets, 467 GeoParquet files |
| Foursquare Open Source Places | Commercial POI dataset for Singapore | 435K places, 434K geocoded |
| OpenStreetMap | Buildings, roads, POIs, land use, boundaries | 155K buildings, 252K road segments |
| Overture Maps | Buildings, places, addresses, transport, divisions | 311K buildings, 134K places, 141K addresses |
| Microsoft Global ML Building Footprints | AI-derived building polygons | 123K building footprints |

## Architecture

The platform is structured as a `uv` workspace with seven independent [Kedro](https://kedro.org/) sub-projects, each responsible for one data source or processing stage:

1. **`datagovsg_scraping`**: scrapes the data.gov.sg API and downloads files using a RabbitMQ producer/consumer pipeline with Playwright and httpx.
2. **`datagovsg-scraping-processing`**: deduplicates, identifies spatial datasets, geocodes postcode columns, and converts downloads to GeoParquet.
3. **`foursquare-processing`**: downloads and processes Foursquare Open Source Places from HuggingFace, including quality scoring and geocoding.
4. **`osm-processing`**: extracts Singapore features from a local `.osm.pbf` file using PyROSM across 21 attribute tags and 6 special functions.
5. **`overturemaps-processing`**: downloads all 15 Overture Maps feature types for Singapore's bounding box.
6. **`global-ml-building-footprints-processing`**: downloads Microsoft building footprints from Azure Blob Storage across multiple quadkey tiles.
7. **`spatial-relationships`**: the convergence layer. Computes pairwise spatial overlap metadata between every dataset combination (24,099 records).

All sub-projects share a single `data/` directory and follow [Kedro](https://kedro.org/) conventions (PartitionedDataset, catalog globals, tagged nodes, parameter files per pipeline).

## Scale

| Dataset | Raw | Processed |
|---|---|---|
| data.gov.sg catalogue | 5,114 datasets | 4,618 deduplicated |
| data.gov.sg geospatial downloads | 638 files (~3.5 GB) | 467 GeoParquet files |
| Foursquare Singapore places | 435,239 records | 434,821 geocoded POIs |
| OSM Singapore | 1 `.osm.pbf` file | 27 GeoParquet files |
| Overture Maps | Singapore bounding box | 15 feature-type GeoParquet files |
| Microsoft Building Footprints | Multiple quadkey tiles | 1 combined GeoParquet |
| Spatial relationships | 511 input datasets | 24,099 pairwise overlap records |
