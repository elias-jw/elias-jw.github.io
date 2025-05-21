---
layout: page
title: Projects
permalink: /projects/
toc: true
---

The following is a summary of projects and products that I completed between 2020 and 2024 at [Waste Labs](wastelabs.co), where I am the co-founder and CTO, and between 2007 and 2019 in different research and consulting capacities. For my full work history, please refer to my [CV](https://drive.google.com/file/d/1MD6y9CAls64zxCIzWVkpJzImzfY4o2Bg/view?usp=sharing).

## AI for public waste and recycling planning

**Date**: Jun 2020 - Oct 2023

**Company**: Waste Labs

**External client**: ALBA WH (Singapore), ALBA Smart City Logistics (Hong Kong)

**Type**: Technical consulting via internal AI tools

**Value add**: Helped client secure £200m in new business

We developed optimisation algorithms to calculate optimal resource requirements for large public waste collection tenders in Singapore and Hong Kong. The calculations were used by ALBA to formulate their bids. We further developed optimisation algorithms to find the optimal placement of electronic waste collection points and reverse vending machines for the general public.  

A big challenge of the project was limited data. To ensure quality results, a wide array of national and international public data sources were scraped, cleaned and merged. These are still being used by the client.

Case-studies of the projects are available [at this](https://docsend.com/view/r5tczsmyxhzcffsg) and [this link](https://docsend.com/view/99j8ekpu7vsq2iyh).

<iframe width="560" height="315" src="https://www.youtube.com/embed/msDw02O20O8?si=tKlJ7NYqiSL4gx5q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/FagklX9Qb00?si=OuJd3GAmbcvEL4hA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/vTAcVuoJYQw?si=BoftnswqLJZMrr5J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/CNJHqUYBl2I?si=vSEJsbVcTBPcggYd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Advanced methods implemented included combinatorial optimisation algorithms, graph theory, heuristics and metaheuristics, as well mixed integer programming models for the location models.

Execution:

* Directed a team of 1 data engineer, 2 data scientists, 2 data science interns
* Duration: 1 month per tender

Tech:

* Algorithms: coded in python and cython, pyomo with cbc solver
* Data processing: pandas, geopandas (geospatial data processing), fuzzywuzzy (partial-string matching), OSMNx (public data extraction) and PyTables (for large datasets) 
* Data pipeline orchestration: kedro
* Visualisation: kepler.gl (maps), matplotlip and plotly 
* Reports and dashboards: jupyter notebooks, voila and streamlit
* Cloud: AWS S3
* Version control: GitHub

## AI collection planning and next day dispatching system

**Date**: Feb 2022 - Dec 2023

**Company**: Waste Labs

**External client**: ALBA Smart City Logistics (Hong Kong), Veolia UK

**Type**: AI Product development and deployment

**Value add**: Savings of £2000 per vehicle dispatched (3x over subscription fee)

Developed a next-day collection planning system that uses optimisation algorithms to find the optimal collection sequence for collection vehicles. The gps-records were used to monitor planned vs actual performance. A case study is available [at this link](https://docsend.com/view/ast2a4946ngnh8bs).

<iframe width="560" height="315" src="https://www.youtube.com/embed/DkLrFvnmHyc?si=EwKXu94aSjVNSgxD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/_qzyZwbW5c4?si=87adFU6vUcs_92O_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/czMtC15QUTU?si=EvV_8lH5a9mVIAU6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/dlNVSMCoilI?si=Kr_mytoNSKGyt2us" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/7ycBhbZ9ve0?si=ffa7TYD1xjnZiSbh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


Advanced methods implemented included combinatorial optimisation algorithms, heuristics and metaheuristics. Machine Learning models were used on GPS records to monitor vehicle performance, specifically, DBSCAN produced clusters which were then used as an additional feature for regression models to identify collection activities. Many features and models were tested, with this combination proving effective.  

Execution:

* Directed a team of 1 data engineer, 1 front-end developer and 1 data scientists 
* Duration: 22 months
* Value add: savings of £2000 per vehicle dispatched (3x over subscription fee).

Tech:

* Algorithms: coded in python and cython, pyvroom
* Data processing: pandas, geopandas (geospatial data processing), OSRM, scikit-learn (ML models)
* Visualisation: kepler.gl (maps), plotly
* Data pipeline orchestration: kedro
* Backend: FastAPI, SQLite, AWS Lambda
* Cloud: AWS EC2 with Docker, Lambda, S3
* Frontend: mendix (v1) and streamlit (v2)
* CI/CD and version control: GitHub

## CIRCLE Design: recycling simulation and financial analysis AI platform 

**Date**: Aug 2022 - Jul 2023

**Company**: Waste Labs

**External client**: Avery Dennison (Thailand)

**Type**: AI Product development and deployment

**Value add**: helped client avoid £10 million investment loss into financially infeasible projects.

Developed a simulation and financial analysis tool to evaluate and compare different recycling options. The platform considered different treatment technologies, split recycling streams, and complex collection options, such as combining delivery and collection operations. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/UIhiluz2vDE?si=8pa6xXYG9T6IEBpp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/BEeHk5PQrj0?si=MoAza_RdXxW7Szu5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Advanced methods included combinatorial optimisation algorithms, heuristics and metaheuristics, system dynamic simulations, ROI and NVP financial and break-even calculations. 

Execution: 

* Directed a team of 1 data engineer and 1 data scientists
* Duration: 6 months
* Value add: helped client avoid £10 million investment loss into financially infeasible projects.

Tech:

* Algorithms: coded in python and cython, pyvroom
* Data processing: pandas, geopandas (geospatial data processing), OSRM, scikit-learn
* Visualisation: kepler.gl (maps), plotly
* Data pipeline orchestration: kedro
* Backend: FastAPI, SQLite
* Cloud: AWS EC2 with Docker, S3
* Frontend: streamlit
* Version control: GitHub

## AI for recycling and waste collection analyses

**Date**: Mar 2020 - December 2023

**Company**: Waste Labs

**External client**: Bingo Industries (Australia), ALBA WH (Singapore), SembWaste (Singapore), Biffa (UK), RiverRidge (UK), COX Skips (UK), The Recycling Partnership (UK)

**Type**: Technical consulting via internal AI tools

We applied machine learning and optimisation models to infer waste collection activities, using gps-records and delivery reports. We then calculated financial KPIs, such us cost per tonne collected, customer, and distance driven, and forecasted savings potential if operations were optimised using advanced planning AI.  

<iframe width="560" height="315" src="https://www.youtube.com/embed/CMKFJpo4SDA?si=YJ28kHfrhnH_yvO2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/HmJ9YDYfdwc?si=wv8F6Mt-bzJVq8SK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/_YGIFQXGMOs?si=aley4F0HJuDcmdZo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


Advanced methods included density-based clustering, regression, combinatorial optimisation algorithms, heuristics and metaheuristics. 

Execution:

* Directed a team of 1 data engineer and 1 data scientists
* Duration: 1 week to 2 months per project

Tech:

* Algorithms: coded in python and cython, pyvroom
* Machine Learning: Scikit-learn
* Data processing: pandas, geopandas (geospatial data processing), OSRM
* Visualisation: kepler.gl (maps), plotly
* Data pipeline orchestration: kedro
* Backend: FastAPI
* Cloud: AWS EC2 with Docker, S3
* Frontend: streamlit
* Version control: GitHub

## AI driven sales optimisation

**Date**: Jan 2021 - Jan 2023

**Company**: Waste Labs

**External client**: Bingo Industries (Australia), Biffa (UK)

**Type**: AI Product development and deployment

Developed a platform to assist waste and recycling companies to find ideal customer leads, based on their proximity to existing customers. The marginal costs of servicing each customer in different time-windows were also calculated, to be used for quotation purposes.

<iframe width="560" height="315" src="https://www.youtube.com/embed/EtZx6SP5RFY?si=DfO53hanuDqOSiAe" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/Op3VTFnkUD8?si=eJt7OKcnCcutxWYJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/3JfdQ1YfDWw?si=zvzvt9sK9Yk4gUUU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Advanced methods included combinatorial optimisation algorithms and heuristics. 

Execution: 

* Directed a team of 1 backend developer, 1 product manager, 1 data scientist and 1 frontend developer.
* Duration: 2 years

Tech:

* Algorithms: coded in python and cython, pyvroom
* Data processing: pandas, geopandas (geospatial data processing), OSRM, google-maps API
* Visualisation: kepler.gl (maps), plotly
* Data pipeline orchestration: kedro
* Backend: FastAPI, SQLite, Mendix
* Cloud: AWS EC2 with Docker, S3
* Frontend: Mendix
* Version control: GitHub

## Recycling material mapping

**Date**: Dec 2020 - Aug 2021

**Company**: Waste Labs

**External client**: ALBA Smart City Logistics (Hong Kong), Vitasoy (Hong Kong), Swire Coca-Cola (Hong Kong)

**Type**: Technical consulting via internal AI tools

Estimated generation of different waste streams over Hong Kong, using census data and other publicly available data sources. The estimates were calculated on a land-parcel resolution.

Case-studies of the projects are available [at this](https://docsend.com/view/vbxmsypibihq9wm2) and [this link](https://drive.google.com/file/d/1HsSlv7nsfYDZ5YVIUkJTFRFOKG2ClSPX/view).

<iframe width="560" height="315" src="https://www.youtube.com/embed/YZEH7aoA7Dc?si=f_nqxj1NwT0uwPqt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/HvNxOV8rMiM?si=HsmSBDf1afuImOux" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Execution:

* Directed a team of 1 data scientists
* Duration: 1 month per project

Tech:

* Data processing: pandas, geopandas (geospatial data processing)
* Visualisation: kepler.gl (maps), plotly
* Data pipeline orchestration: kedro
* Cloud: AWS S3
* Frontend: jupyter notebooks
* Version control: GitHub

## Population demographics simulation modelling

**Date**: Jun 2018 - Feb 2020

**Employer**: Singapore University of Technology and Design, Singapore

**External client**: Housing Development Board, Singapore

**Type**: Industry research

Development of models to predict household demographics within Singapore

My main focus was to develop a Demographic Change Microsimulation model, linked with an agent-based Residential Location Choice model, as part of the New Urban Kampung Research Programme, in collaboration with EDF and Singapore's HDB ([https://www.straitstimes.com/singapore/hdb-sutd-tie-up-to-create-new-urban-kampung](https://www.straitstimes.com/singapore/hdb-sutd-tie-up-to-create-new-urban-kampung)).

## Vertical movement analysis using IoTs and barometric pressure

**Date**: Jun 2018 - Feb 2020

**Employer**: Singapore University of Technology and Design, Singapore

**Type**: Research

AI to extract and analyse vertical movements of people in Singapore

Part of a research team that developed Machine Learning models to analyse pressure data collected on a large scale from Singaporean School children. In the project, we used time-series analysis and machine learning to infer the vertical movements, via stairs, escalators and lifts of the students.

## Construction traffic impact study

**Date**: Oct 2013 - Dec 2013

**Employer**: Enterprises, University of Pretoria, South Africa

**External clients**: WorleyParsons, South Africa, ESKOM, South Africa

**Type**: Consulting

Simulation model to evaluate traffic alleviation options

<iframe width="560" height="315" src="https://www.youtube.com/embed/B6OMtiOKo3k?si=curdA7Jjyt_xYZd3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The aim of the project was to identify and evaluate peak-traffic alleviation options. The peak-traffic was caused by high-volumes of construction traffic entering and exiting a construction site. A simulation model was developed, modelling traffic flow at congested road intersections and dead-ends. Alleviation options, such as road upgrades, intersection pointsmen and staggered construction worker shifts were simulated, and their impact measured through Key Performance Indicators. The most effective options were then recommended for implementation.

My role in the project was as lead modeller and project manager. The project team consisted of thirteen personnel, including undergraduate students and an associate professor from the University of Pretoria, and PhD students from Stellenbosch University.

## Coal stockyard resource requirements study

**Date**: Jul 2013 - Oct 2013

**Employer**: Enterprises, University of Pretoria, South Africa

**External clients**: WorleyParsons, South Africa, ESKOM, South Africa

**Type**: Consulting

Simulation model to calculate stockyard resource requirements

<iframe width="560" height="315" src="https://www.youtube.com/embed/Hhxg-ZEyfeA?si=5X41WtSqI-JhHOS3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The project entailed determining and analysing resource requirements at a coal stockyard. The objective was to determine the delivery requirements of the stockyard, based on demand requirements and variability, and to determine the resources required to process the deliveries. For this purpose a simulation model was developed of the stockyard, which modelled key stockyard operations and took into account delivery variability, and resource breakdowns and maintenance. The project was further linked with the coal delivery traffic impact study.

My role in the project was as lead modeller and project manager for the modelling component. The modelling team consisted of three personnel, including an undergraduate student and associate professor from the University of Pretoria. The modelling team worked within a larger project team, consisting of engineers from different consulting firms and from the client.

## Coal delivery traffic impact study

**Date**: Jul 2013 - Sep 2013

**Employer**: Enterprises, University of Pretoria, South Africa

**External clients**: WorleyParsons, South Africa, ESKOM, South Africa

**Type**: Consulting

Simulation model to predict traffic compact from high volume coal deliveries

<iframe width="560" height="315" src="https://www.youtube.com/embed/5SVfvPKn0hk?si=dy_orBCWZROR0oBs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The aim of this project was to analyse the impact of coal deliveries to a stockyard on general traffic surrounding the study area. The delivery requirements, determined through the coal stockyard resource requirements study, was used as input and a traffic simulation model of the road network surrounding the stockyard was developed.

My role in the project was as lead modeller and project manager for the modelling component. The modelling team consisted of six personnel, including an associate professor from the University of Pretoria, and PhD students from Stellenbosch University. The modelling team worked within a larger project team, consisting of engineers from different consulting firms and from the client.

## Determining optimal coal-consolidation facility locations

**Date**: Nov 2012 - Jun 2013

**Employer**: LTS Health, South Africa

**External clients**: WorleyParsons, South Africa, ESKOM, South Africa

**Type**: Consulting

AI model to calculate optimal locations for coal-consolidation

Optimisation modeller for determining the optimal location of bulk resource road-to-rail consolidation terminal as part of concept design study. The project consisted of determining the optimal location area for a Coal Consolidation Center using Weiszfeld's algorithm, linked with nearest neighbour allocation algorithms. Sensitivity analysis were then performed through Monte-Carlo simulation to test modelling assumptions, and to identify key issues to be investigated during detailed design phase of the project.

## Data analysis for Richard Bay Port Terminal

**Date**: Oct 2012 - Feb 2012

**Employer**: LTS Health, South Africa

**External clients**: Aurecon, South Africa, Port of Richard Bay, South Africa

**Type**: Consulting

Data wrangling and analysis for KPI extractions for a Port Terminal

Was a data analyst for data wrangling on port entries and activities at Richard Bay Port Terminal. For the project multiple data sources were consolidated into a SQLite database. Data analysis were then performed on the data sets, using a combination of Python and R scripts, and the results were used as input for a strategic planning port simulation model. Performed data analysis on port entries and activities at Richard Bay Port Terminal. For the project multiple data sources were consolidated into a SQLite database. Data analysis were then performed on the data sets, using a combination of Python and R scripts, and the results were used as input for a strategic planning port simulation model.

## Redesign of an analytical radiological laboratory

**Date**: Jun 2012 - Jan 2013

**Employer**: LTS Health, South Africa

**External client**: National Nuclear Regulator, South Africa

**Type**: Consulting

Project manager for the redesign of an analytical radiological laboratory for the National Nuclear Regulator, South Africa.

## Development of an automated workflow planning tool

**Date**: Oct 2012 - Nov 2012

**Employer**: LTS Health, South Africa

**External client**: Abbott, Global

**Type**: Product development

Development of laboratory test planning and scheduling tool

The project entailed developing an excel based automated workflow planning tool, capable of assisting the client in determine resource requirements to perform laboratory molecular tests. The tool was designed to automatically generate gantt-charts, determine resource requirements and utilisation statistics, and to determine the feasibility workflow setups. The tool also employs heat maps to highlight high-risk time periods when all resources are at 100% capacity.

## Work schedule and resource allocation optimisation

**Date**: Oct 2012 - Nov 2012

**Employer**: LTS Health, South Africa

**External client**: Abbott, Global

**Type**: Consulting

AI model to calculate minimum resource requirements for laboratory tests

Developed an optimisation model to determine the minimum number of resources required to perform work tasks. The tasks involved a series of hands-on and equipment specific processes. The model was used to calculate the minimum required resources, thus minimise cost, and to produce a work schedule with shift rosters and task assignments. The model was further used to identify high-risk periods where resources were at full capacity, which, in turn was used to assign back resources for the periods. The model was thus used to minimise cost whilst ensuring that the resulting assignment were robust enough for implementation.

## Whole sale plant nursery business improvement

**Date**: Apr 2012 - Jun 2012

**Employer**: LTS Health, South Africa

**Type**: Consulting

Business improvement project for plant nursery operations

For this project I was responsible for conducting a business process improvement project at a wholesale plant nursery situated in Stellenbosch, South Africa. The aim of the project was to identify and improve processes that would have the greatest impact on the performance of the company. The main Industrial Engineering techniques that I used were business process mapping and data analysis.

I used business process mapping to understand all the operational areas of the company, and to identify areas for improvement. I then applied data mining and business analytics on the company’s sales data by using ABC analysis to identify the top products and customers of the company. Next, I applied business analytics to automatically detect negative customer purchasing behaviours that indicates that a key client was likely to stop purchasing at the company. Through the analysis, order returns were identified as a major concern for the company. I used the same analysis to identify critical customers with high return rates, enabling the company to agree on quality standards with the company, thus reducing product returns.

In addition to the data analysis, I also developed plant inventory models to assist the company in better planning its production runs. The ABC product analysis was further used to relocate high demand products to centrally located storage areas. Lastly, the data analysis was used to determine the optimal vehicle delivery fleet size and usage patterns.

In addition to the technical components of the project, I was responsible for all client interaction, including the scoping of deliverables, facilitating client workshops, compiling of the final project documentation, and presenting the final recommendations to the client for approval.

## Eskom Business Process Re-engineering

Mar 2012 - May 2012

**Employer**: LTS Health, South Africa

**External client**: PwC, South Africa, ESKOM, South Africa

**Type**: Consulting

Business Process Re-engineering

The goal of Eskom’s Back-2-Basics program is to enable effective decision making and improving operational performance by simplifying, standardising and optimising processes and systems across Eskom.

My involvement with the project was with the Eskom Engineering department, and within the Perform Technical Management function. The function consisted of ten processes, and all had to be developed by a multidisciplinary team of external consultants in collaboration with Eskom employees. The ten tasks were assigned to ten groups, each consisting of a senior process engineer, senior process modeller, subject matter expert and an Eskom process owner. My involvement was as the senior process engineer for the process Manage Technical Data. Our team’s task was to develop the sub-processes, tasks, activities, key performance Indicators and supporting systems and artefacts for the process. The team further had to identify and establish all the interfaces with other processes.

My specific role was to manage the process team, ensuring that the process was developed and approved by Eskom, on time and in line with the overall Back2Basics project objectives. As such I reported directly to the project manager for the Perform Technical Management function. I was further responsible for facilitating the team workshops, and for applying process improvement principles during the development of the process.

## Waste collection and transportation optimisation - Implementation

Jan 2008 - Mar 2012

**Employer**: Council for Scientific and Industrial Research (CSIR), South Africa

**External clients**: OXFAM Italia, South Africa, Ekurhuleni Municipality, South Africa.

**Type**: Applied research and consulting

AI for waste collection optimisation

Based on initial needs assessment, a three-year project was scoped to develop the optimisation models and algorithms, and to use the models to improve the collection processes of a municipality. The project focused on four areas of waste collection and transportation planning: generating optimal daily collection routes for vehicles whilst minimising the required fleet size; sectoring a collection area into balanced collection days; determining the optimal collection fleet size composition; and determining the optimal placement of intermediate facilities and transfer stations. The models and algorithms were implemented at Ekurhuleni Metropolitan Municipality in the areas of Watville and Actonville.

For implementation at Ekurhuleni Municipality, the existing waste collection and transportation processes of the Metro waste analyses. The analyses were then used to develop the collection system requirements, constraints and objectives, which were then used as input to the optimisation models and algorithms. The algorithms were used to develop improved collection routes for the Municipality, thus allowing the Municipality to better plan its waste collection activities. The implementation at Ekurhuleni was used to develop a business case and for future waste collection and transportation optimisation projects. A road map was also created, stipulating the creation of a decision support system to assist municipalities with their planning activities.

## Electricity capacity expansion planning

**Date**: May 2009 - Mar 2012

**Employer**: Council for Scientific and Industrial Research (CSIR), South Africa

**External client**: ESKOM, South Africa

**Type**: Consulting

AI models for electricity capacity expansion planning

Part of a CSIR research team that assisted ESKOM (South African electricity public utility) in improving their electricity capacity expansion planning. The key activities of the project were to improve the utility’s existing planning efforts, and to identify and evaluate new expansion planning methods. My tasks were, firstly, to identify improvements in the Utility’s existing planning methods, focussing specifically on its planning software, and to conduct workshops to implement the improvements. My second task was to implement and test improved expansion planning optimisation models, identified by the Utility; and then in conjunction with the project team, to evaluate the models and report the results to the customer.

## Integrated renewable energy systems modelling

**Date**: Nov 2008 - May 2009

**Employer**: Council for Scientific and Industrial Research (CSIR), South Africa

**Type**: Applied research

Simulation model and P&L analysis for integrated renewable energy system

The objective of the project was to develop simulation model of an integrated sustainable technologies system. The technologies modelled included a concentrated solar power plant, agriculture and aquaculture plants, and bio-diesel and biogas production facilities, with their respective technology readiness levels ranging from mature to conceptual. The simulation model was developed to generate and evaluate different system setups, and to determine the financial viability of constructing and operating such a system at a rural town.

The sustainable technologies were primarily linked to the following disciplines: electrical, electronic, mechanical and systems engineer; environmental and micro biology; and architecture. My task was to gather technical and costing data for each technology from domain experts, and synthesise the data so that it could be used in a single simulation model.

The operational logic and process flow of each of the technologies were modelled, with input from domain experts, and integrated using systems dynamic simulation software. The simulation model was verified by comparing the simulated output against international case study data of existing systems. For conceptual technologies still under development, the outputs from the model were evaluated by subject matter experts.

After the simulation model was verified, the costing information of the technologies were linked to the simulation model output to create an income statement. All capital costs were annualised using a standard discount factor and combined with the simulated operational costs and incomes to populate the income statement. The statement, linked with the simulation model was then used to economically evaluate different system setups.

## Security guard routing optimisation

**Date**: Jan 2007 - Dec 2008

**Employer**: Council for Scientific and Industrial Research (CSIR), South Africa

**External client**: Midfield Estate, South Africa

**Type**: Applied research

AI model for security route planning

The objective of the project was to improve the security system of Midfield-Estate, a security estate situated in Gauteng, South Africa, by developing optimisation algorithms capable of generating unpredictable patrol routes for security guards. The resulting routes that the algorithms generated made the patrolling of the estate unpredictable, resulted a significant improvement in the even patrolling of the road network, and resulted in a more balanced work distribution among guards. For the project, the following tasks were performed:

Data gathering and analysis: A Graphical Information System Software package (ArcGIS) was used to capture the estate’s road network, and to analyse the effectiveness of the existing patrolling. The analyses were then used to identify improvement opportunities and to formulate the main objective functions by which to measure the effectiveness of patrol routes.

Algorithm development: Optimisation algorithms, incorporating elements of artificial intelligence, were developed capable of generating patrol routes for security guards. The algorithms addressed all the objectives identified in the data analysis phase and were benchmarked using international data sets to ensure that they produced high quality routes.

Implementation: For the final phase of the project, multiple routes were developed for the security estate. The efficiencies of the routes were measured using the developed objective functions and compared against the existent routes. Detailed maps and routing instructions were developed and presented to the Estate’s security management for final implementation.
