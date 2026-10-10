import { TrainingModule, GlossaryTerm, CompetencyItem, CurriculumCourse, UserAccount, AwardedCertificate } from '../types/fftc';

export const CFFB_MODULES: TrainingModule[] = [
  {
    id: 'mod-1',
    moduleNumber: 1,
    title: 'Foundations of Farm Forestry',
    hours: 5,
    icon: 'Trees',
    color: 'emerald',
    overview: 'Farm forestry is the growing and management of trees on farms alongside crops and livestock. Trees provide household income, firewood, fruits, fodder and timber while supporting soil conservation, wind protection, water protection and climate resilience without converting the whole farm into a forest.',
    learningObjectives: [
      'Explain the meaning and importance of farm forestry.',
      'Identify suitable ways of integrating trees into a farm.',
      'Explain household, community and environmental benefits of trees.',
      'Identify how trees interact with crops, livestock, soil and water.',
      'Prepare a simple farm map showing possible areas for tree integration.'
    ],
    keyConcepts: [
      'Trees as Farm Partners: Complementing rather than competing with food crops when properly placed.',
      'Household Benefits: Direct supply of timber, fuelwood, fruits, fodder, and medicinal products.',
      'Community & Environmental Benefits: Wind protection, water catchment conservation, carbon storage, and ambient cooling.',
      'Three Core Integration Typologies: 1) Boundary Planting, 2) Intercropping / Alley Cropping, 3) Dedicated Farm Woodlots.'
    ],
    analogyTitle: 'The Multi-Purpose Bank',
    analogyDescription: 'Trees function like a long-term interest-bearing bank account on the farm. While the farmer harvests seasonal crop yields for immediate daily needs, the standing trees accumulate biomass value every season and can be liquidated when substantial family capital is needed (such as school fees or medical emergencies).',
    units: [
      {
        id: 'u-1-1',
        unitNumber: 'Unit 1.1',
        title: 'What is Farm Forestry?',
        summary: 'Understanding the integration of trees into farming systems and historical context in Nyandarua County.',
        keyPoints: [
          'Differentiating farm forestry from industrial plantations and natural state forests.',
          'Agroforestry and silvo-pastoral systems matching high-altitude Kenyan climates.',
          'Traditional tree planting culture in Nyandarua and the central highlands.'
        ],
        fieldTip: 'Start by observing how existing boundary trees shield wind-sensitive potato and maize crops.'
      },
      {
        id: 'u-1-2',
        unitNumber: 'Unit 1.2',
        title: 'Tree-Crop & Farm Ecosystem Dynamics',
        summary: 'Managing canopy light penetration, root depth competition, and leaf litter nutrient cycling.',
        keyPoints: [
          'Selecting deep-rooting species that do not rob topsoil moisture from nearby crops.',
          'Utilizing deciduous leaf-fall to enhance natural humus and organic mulch.',
          'Preventing allelopathy (avoiding trees that exude growth-inhibiting chemicals into crop roots).'
        ],
        fieldTip: 'Position taller timber trees on the windward boundary and along farm contours.'
      }
    ],
    practicalActivityTitle: 'Exercise 1: Farm Tree Mapping',
    practicalActivityInstructions: [
      'Sketch a clear layout map of your smallholder farm plot.',
      'Mark the residential homestead, crop acreage, water points, and existing tree clusters.',
      'Identify high-wind exposure corridors and erosion-prone slopes.',
      'Select and mark three prime zones for new tree integration: boundary, intercropped rows, or woodlot.',
      'Provide your management rationale for each chosen location.'
    ],
    expectedCompetency: 'The participant can draw a comprehensive farm map and identify three appropriate zones for sustainable tree integration.',
    takeHomeMessages: [
      'Trees are an integral productive component of the whole-farm system.',
      'Farm forestry does not require sacrificing arable food crop acreage.',
      'Match tree selection with long-term household economic and ecological objectives.'
    ]
  },
  {
    id: 'mod-2',
    moduleNumber: 2,
    title: 'Tree Species, Nursery Management and Establishment',
    hours: 6,
    icon: 'Sprout',
    color: 'teal',
    overview: 'Successful farm forestry starts with selecting suitable species and producing healthy planting stock. Farmers must understand local highland climate, rainfall seasonality, nursery bed infrastructure, correct planting hole geometry, spacing, and essential gapping replacement.',
    learningObjectives: [
      'Apply the "Right Tree, Right Place" principle for different farm objectives.',
      'Identify and select high-quality parent seed trees.',
      'Establish and manage a low-cost, high-germination tree nursery.',
      'Demonstrate correct hole excavation, seedling extraction, and planting depth.',
      'Apply correct tree spacing and replacement (gapping) protocols.'
    ],
    keyConcepts: [
      '"Right Tree, Right Place": Matching species with altitude, soil drainage, rainfall, and market demand.',
      'Seed Quality: Collecting seeds only from vigorous, disease-free, straight-boled mother trees.',
      'Proper Nursery Siting: Proximity to reliable water, semi-shaded wind protection, and secure fencing.',
      'Correct Planting Technique: Digging 2x root ball depth, mixing topsoil with compost, firming soil, and creating a water-retaining micro-basin.',
      'Gapping: Replacing dead seedlings within the first 2 months to ensure 95%+ stocking density.'
    ],
    analogyTitle: 'The School for Seedlings',
    analogyDescription: 'A tree nursery is like a nursery school: young vulnerable seedlings are nurtured, watered, weeded, and protected from harsh sun and pests until they are hardened off and resilient enough to thrive in the open field.',
    units: [
      {
        id: 'u-2-1',
        unitNumber: 'Unit 2.1',
        title: 'Species Selection & Seed Collection',
        summary: 'Selecting species for timber (Cypress, Grevillea), poles (Eucalyptus grandis), fodder (Calliandra), and indigenous conservation.',
        keyPoints: [
          'Recommended Nyandarua species: Grevillea robusta, Cupressus lusitanica, Prunus africana, Podocarpus.',
          'Harvesting ripe seed pods from at least 15-20 distinct healthy parent trees to ensure genetic diversity.',
          'Pre-treatments: Hot water soaking, scarification, and seed drying procedures.'
        ],
        fieldTip: 'Always discard under-developed, shrivelled, or pest-punctured seeds prior to sowing.'
      },
      {
        id: 'u-2-2',
        unitNumber: 'Unit 2.2',
        title: 'Planting Hole Preparation & Care',
        summary: 'Step-by-step planting: Digging 45cm x 45cm x 45cm holes, separating topsoil from subsoil, and soil firming.',
        keyPoints: [
          'Separate topsoil (dark, rich) from subsoil (clayey, lower) during excavation.',
          'Blend topsoil with well-rotted organic manure at a 2:1 ratio before backfilling.',
          'Gently slit seedling tubes without slicing root taproots; keep root collar level with ground.',
          'Tamp soil gently to eliminate subterranean air pockets and water immediately.'
        ],
        fieldTip: 'Plant within the first two weeks of the onset of seasonal rains (March-April or October).'
      }
    ],
    practicalActivityTitle: 'Exercise 2: Seedling Assessment & Planting',
    practicalActivityInstructions: [
      'Inspect 5 sample seedlings: assess stem thickness, root curl, pest signs, and vigor.',
      'Select prime transplanting candidates and discard compromised stock.',
      'Excavate a standard planting hole measuring 45cm cube.',
      'Carefully extract seedling from container without disturbing root ball.',
      'Place seedling at collar depth, backfill with amended topsoil, firm soil, and water thoroughly.'
    ],
    expectedCompetency: 'The participant can safely extract, position, and plant a healthy seedling at the correct depth and firmly consolidate the soil.',
    takeHomeMessages: [
      'Healthy mature trees originate from rigorous seed selection and nursery care.',
      'Poor planting technique causes j-rooting and stunt tree growth permanently.',
      'Conduct timely gapping to guarantee zero wasted land or unstocked gaps.'
    ]
  },
  {
    id: 'mod-3',
    moduleNumber: 3,
    title: 'Sustainable Tree Management & Silviculture',
    hours: 5,
    icon: 'Scissors',
    color: 'amber',
    overview: 'Sustainable silviculture involves continuous care: formative pruning, systematic thinning, coppice management, and pest/disease surveillance to maximize log straightness, knot-free clear timber, and rapid stem girth expansion.',
    learningObjectives: [
      'Demonstrate proper pruning using clean flush cuts at the branch collar.',
      'Apply the "One-Third Rule" to protect photosynthetic tree capacity.',
      'Conduct selective thinning to relieve stand competition.',
      'Apply correct coppicing cut angles to promote vigorous sprout regeneration.',
      'Identify common forest pests, stem borers, and foliage blights.'
    ],
    keyConcepts: [
      'The Branch Collar: Pruning outside the swollen branch bark ridge to ensure rapid natural callous closure.',
      'One-Third Canopy Rule: Never remove more than 33% of the live green crown in a single pruning season.',
      'Thinning as Investment: Removing stunted, crooked, or suppressed stems allows dominant trees to thicken into premium sawlogs.',
      'Coppicing Physics: Cutting stumps close to the base at a clean outward angle so rainwater drains away from the cambium.'
    ],
    analogyTitle: 'Quality Tailoring for Timber',
    analogyDescription: 'Pruning a tree is like tailoring: removing low branches early eliminates internal knots in the wood, turning rough knotty firewood into smooth, high-value grade-one construction sawlogs.',
    units: [
      {
        id: 'u-3-1',
        unitNumber: 'Unit 3.1',
        title: 'Pruning Standards & Tool Hygiene',
        summary: 'Branch collar cuts, tool sharpening, disinfections, and timing operations before heavy rains.',
        keyPoints: [
          'Always use sharp pruning saws or loppers; never slash branches with dull machetes/pangas.',
          'Execute a small undercut first to prevent falling branches from tearing trunk bark.',
          'Pruning timing: Late dry season before sap rise to promote rapid spring healing.'
        ],
        fieldTip: 'Disinfect pruning saw blades with diluted bleach between trees to halt disease transmission.'
      },
      {
        id: 'u-3-2',
        unitNumber: 'Unit 3.2',
        title: 'Thinning & Coppice Operations',
        summary: 'Stocking reduction calculations and managing multi-stem re-sprouting for poles and firewood.',
        keyPoints: [
          'Initial planting density (e.g. 1,600 trees/ha at 2.5m x 2.5m) must be thinned down to 400-600 stems/ha for final sawlogs.',
          'Early thinnings generate immediate revenue from fence posts, rafters, and bean stakes.',
          'Coppice thinning: Select 2-3 strongest shoots after stump re-sprouting and prune back weaker suckers.'
        ],
        fieldTip: 'Cut stumps at 10-15cm height with a 30-degree slope facing south for rainwater runoff.'
      }
    ],
    practicalActivityTitle: 'Exercise 3: Pruning & Tree Management',
    practicalActivityInstructions: [
      'Inspect a 3-year-old standing farm tree.',
      'Identify lower lateral branches that require removal according to the 1/3 crown rule.',
      'Locate the branch collar and branch bark ridge with chalk.',
      'Execute a three-point cut with a sharp pruning saw to prevent bark tearing.',
      'Assess stand density in a 10m x 10m quadrant and flag trees for thinning.'
    ],
    expectedCompetency: 'The participant can demonstrate clean branch collar pruning and execute selective thinning without damaging retained trees.',
    takeHomeMessages: [
      'Unpruned trees produce knotty wood of very low commercial value.',
      'Thinning is not wasteful; it accelerates volume and diameter growth of the finest trees.',
      'Proper coppicing enables multiple timber and pole harvests from a single root system.'
    ]
  },
  {
    id: 'mod-4',
    moduleNumber: 4,
    title: 'Farm Forestry, Climate and Soil Health',
    hours: 5,
    icon: 'CloudRain',
    color: 'sky',
    overview: 'Trees buffer farms against extreme climate variations, arrest gully erosion, enrich degraded soils with organic matter, and sequester atmospheric carbon. This module explores soil conservation structures, biochar production, and organic manure charging.',
    learningObjectives: [
      'Explain agroforestry climate resilience mechanisms in smallholder landscapes.',
      'Describe carbon sequestration dynamics in biomass and soil organic matter.',
      'Design soil conservation terraces (fanya juu, fanya chini) stabilized with trees.',
      'Produce biochar from agricultural pruning residues using controlled pyrolysis.',
      'Charge biochar with organic cattle/poultry manure to restore soil fertility.'
    ],
    keyConcepts: [
      'Agroforestry Classifications: Agrisilvicultural (trees + crops), Silvopastoral (trees + livestock), Agrosilvopastoral.',
      'Carbon Savings Account: Trees pull atmospheric CO2 and lock carbon into lignified woody tissues and deep soil humus.',
      'Terrace Stabilization: Planting Grevillea and Calliandra along terrace bunds to anchor soil banks.',
      'Biochar Technology: Pyrolyzing woody residues in low-oxygen conditions into stable carbon that boosts soil water retention.',
      'Biochar Charging: Inoculating raw biochar with active microbes and nitrogen from farmyard manure prior to field application.'
    ],
    analogyTitle: 'The Soil Carbon Sponge',
    analogyDescription: 'Raw biochar is like a microscopic dry sponge with billions of tiny pores. When charged with animal manure and compost, it absorbs and holds moisture and plant nutrients in the root zone, preventing fertilizers from washing away during heavy downpours.',
    units: [
      {
        id: 'u-4-1',
        unitNumber: 'Unit 4.1',
        title: 'Agroforestry Systems & Soil Conservation',
        summary: 'Terrace engineering, contour bunds, hedgerows, and integrating nitrogen-fixing agroforestry species.',
        keyPoints: [
          'Fanya Juu terraces: Throwing soil uphill to create level bench terraces on steep Nyandarua hillsides.',
          'Nitrogen-fixing agroforestry shrubs: Calliandra calothyrsus, Leucaena trichandra, and Sesbania sesban.',
          'Windbreak design: Multi-tiered wind barriers reducing evapotranspiration loss by up to 30%.'
        ],
        fieldTip: 'Plant deep-rooting grasses (like vetiver or Napier) alongside fodder trees on terrace edges.'
      },
      {
        id: 'u-4-2',
        unitNumber: 'Unit 4.2',
        title: 'Biochar Production & Manure Charging',
        summary: 'Low-cost pit kilns, TLUD drum kilns, wood vinegar collection, and field application rates.',
        keyPoints: [
          'Pyrolysis principles: Burning crop residues with limited oxygen prevents ash formation and preserves carbon matrix.',
          'Quenching: Extinguishing pyrolyzed coals with water at peak temperature.',
          'Charging ratio: Mix 4 parts cured farm manure with 1 part crushed biochar, incubate for 14 days before applying.',
          'Application: Apply 1-2 handfuls per planting hole or broad-furrow incorporate at 2-5 tonnes/hectare.'
        ],
        fieldTip: 'Never apply uncharged biochar directly to seeds; raw biochar will temporarily pull nitrogen from crops.'
      }
    ],
    practicalActivityTitle: 'Exercise 4: Soil Health Assessment & Biochar Charging',
    practicalActivityInstructions: [
      'Evaluate farm soil structure, earthworm count, and erosion rills.',
      'Participate in a demonstration of biochar production using farm woody prunings.',
      'Crush raw biochar into coarse granulated particles (2-5mm size).',
      'Blend crushed biochar with composted cattle manure at a 1:4 ratio with water/compost tea.',
      'Apply charged biochar to a trial vegetable or tree planting bed.'
    ],
    expectedCompetency: 'The participant can explain farm climate buffering, produce basic biochar from prunings, and properly charge it with organic manure.',
    takeHomeMessages: [
      'Stop burning farm residues openly; convert woody waste into long-term biochar.',
      'Biochar charged with manure permanently improves water-holding capacity in drought seasons.',
      'Agroforestry trees act as natural windbreakers and soil armor against extreme weather.'
    ]
  },
  {
    id: 'mod-5',
    moduleNumber: 5,
    title: 'Farm Forestry Business & Value Addition',
    hours: 4,
    icon: 'BadgePercent',
    color: 'emerald',
    overview: 'Farm forestry is an enterprise. To generate sustainable livelihoods, farmers must calculate production costs, project timber and pole revenues, keep ledgers, eliminate middlemen, and capture higher margins through collective marketing and value addition.',
    learningObjectives: [
      'Formulate a comprehensive farm forestry enterprise cost ledger.',
      'Calculate net revenues, gross margins, and investment payback periods.',
      'Analyze the tree product value chain from farm gate to timber yard.',
      'Leverage collective marketing models with TGAN tree grower groups.',
      'Identify value-addition avenues: seasoned timber, charcoal briquettes, bee hives, bamboo.'
    ],
    keyConcepts: [
      'Enterprise Budgeting: Capturing all input costs: seeds, polythene tubes, digging labour, weeding, and felling.',
      'Value Chain Margins: Raw standing trees sell at a fraction of sawn timber; processing adds 150-300% value.',
      'Collective Marketing: Smallholders aggregating poles and sawlogs to negotiate directly with utility pole buyers and millers.',
      'Livelihood Diversification: Integrating high-value fast-cycle products (honey, apiculture, medicinal bark, bamboo).'
    ],
    analogyTitle: 'The Ladder of Tree Value',
    analogyDescription: 'Selling an uncut standing tree to a travelling broker is like selling unharvested wheat in the field for pennies. Climbing the ladder of value means felling, debarking, measuring, seasoning, or sawing into boards on the farm to retain the profit.',
    units: [
      {
        id: 'u-5-1',
        unitNumber: 'Unit 5.1',
        title: 'Farm Forestry Financial Costing & Ledgers',
        summary: 'Compiling real budgets for 1-acre woodlots or boundary plantations over a 5 to 10-year rotation.',
        keyPoints: [
          'Direct establishment costs (Year 1): Seedlings, hole digging, manure, staking, planting labour.',
          'Annual maintenance costs (Years 2-5): Spot weeding, pruning, firebreaks, and security.',
          'Harvesting & logistics: Felling permits, cross-cutting, debarking, transport to depot.',
          'Financial returns: Calculating Net Present Value (NPV) and return per invested shilling.'
        ],
        fieldTip: 'Keep a waterproof field notebook logging all expenses and dates from day one.'
      },
      {
        id: 'u-5-2',
        unitNumber: 'Unit 5.2',
        title: 'Value Addition & Cooperative Marketing',
        summary: 'Processing tree products, apiculture integration, and participating in TGAN collective sales.',
        keyPoints: [
          'Value Chain steps: Farmer (Grower) -> Collection -> Primary Processing (Sawmill) -> Market -> End Consumer.',
          'Apiculture: Installing Langstroth hives in tree woodlots for honey, wax, and crop pollination.',
          'Power transmission pole specs: Treating Eucalyptus to meet Kenya Power & Lighting Company (KPLC) standards.'
        ],
        fieldTip: 'Join a local TGAN cluster to pool transport costs and sell timber by measured volume (cubic feet).'
      }
    ],
    practicalActivityTitle: 'Exercise 5: Farm Forestry Enterprise Costing',
    practicalActivityInstructions: [
      'Select a 0.5-acre farm forestry model (e.g., 200 Cypress or 300 Eucalyptus poles).',
      'List all input costs: seedlings, digging, organic fertilizer, pruning tools, and labour.',
      'Calculate expected yields and conservative market selling prices at harvest year.',
      'Calculate expected gross revenue, total expenditure, and net profit.',
      'Identify two value-addition steps that can boost final farm gate earnings.'
    ],
    expectedCompetency: 'The participant can calculate enterprise costs, project revenues, estimate net margins, and map value-added pathways.',
    takeHomeMessages: [
      'Treat farm forestry as a commercial business requiring accurate bookkeeping.',
      'Never sell standing trees blindly without measuring stem diameter and volume first.',
      'Collective bargaining through farmer associations beats exploitative middlemen every time.'
    ]
  },
  {
    id: 'mod-6',
    moduleNumber: 6,
    title: 'Environmental Stewardship, Policy and Governance',
    hours: 3,
    icon: 'Shield',
    color: 'indigo',
    overview: 'Farm forestry operates within Kenyan legal and environmental frameworks. Farmers must know requirements for harvesting permits, tree movement protocols, riparian buffer zones, and the preservation of rare indigenous tree heritage.',
    learningObjectives: [
      'Explain key provisions of the Kenya Forest Conservation and Management Act.',
      'Comply with Kenya Forest Service (KFS) timber harvesting and movement permit protocols.',
      'Implement mandatory riparian reserve protection along streams and wetlands.',
      'Recognize and conserve protected indigenous species (Podocarpus, Prunus africana, Juniperus).',
      'Map institutional stakeholders: KFS, KEFRI, NEMA, TGAN, and County Agriculture.'
    ],
    keyConcepts: [
      'Legal Tree Movement: Obtaining movement permits from the local KFS Forest Station to transport commercial timber legally.',
      'Water Resource Protection: Maintaining a 30m riparian strip free from thirsty exotic species like Eucalyptus.',
      'Indigenous Conservation: Propagating endangered medicinal and native timber species.',
      'Institutional Roles: KFS (regulation), KEFRI (research & certified seed), NEMA (environmental compliance), TGAN (grower representation).'
    ],
    analogyTitle: 'The Forest Passport',
    analogyDescription: 'Just like travelling abroad requires an identification passport, moving timber on Kenyan roads requires a legal movement permit. Knowing the rules protects farmers from fines and confiscation.',
    units: [
      {
        id: 'u-6-1',
        unitNumber: 'Unit 6.1',
        title: 'Forestry Regulations & Harvesting Permits',
        summary: 'Navigating KFS authorization, felling notices, and timber transit documentation.',
        keyPoints: [
          'Section 34 of the Forest Conservation and Management Act on private and farm forests.',
          'Steps for obtaining a Movement Permit from the Chief and Sub-County Forest Officer (CFO).',
          'Charcoal production rules: Briquetting licenses and sustainable producer associations.'
        ],
        fieldTip: 'Always notify your local agricultural extension officer and chief before felling mature woodlots.'
      },
      {
        id: 'u-6-2',
        unitNumber: 'Unit 6.2',
        title: 'Indigenous Tree Heritage of Nyandarua',
        summary: 'Preserving Podocarpus (Podo), Juniperus procera (Cedar), Olea europaea (Olive), and Prunus africana.',
        keyPoints: [
          'Prunus africana: Highly valued medicinal tree regulated by CITES; sustainable bark harvesting rules.',
          'Riparian guidelines: Replacing Eucalyptus with indigenous water-friendly trees (Syzygium, Ficus) along rivers.',
          'Traditional ecological knowledge (TEK) from community elders on sacred trees and herbal medicine.'
        ],
        fieldTip: 'Dedicate at least 10% of all farm tree plantings to native indigenous species.'
      }
    ],
    practicalActivityTitle: 'Exercise 6: Regulatory Compliance & Stakeholder Mapping',
    practicalActivityInstructions: [
      'Review a sample Kenya Forest Service timber harvesting application.',
      'Identify all required documentation (title deed proof, chief clearance, tree inventory).',
      'Draw a stakeholder diagram showing linkages between your farm, TGAN, KFS, KEFRI, and local buyers.',
      'Audit your farm boundaries to confirm zero water-depleting exotics within 30m of stream channels.'
    ],
    expectedCompetency: 'The participant can identify relevant local forestry offices and explain legal requirements for tree harvesting and movement.',
    takeHomeMessages: [
      'Legal compliance prevents costly confiscation and guarantees smooth timber transport.',
      'Preserve rivers and water catchment areas by planting indigenous trees along wetlands.',
      'Safeguard rare indigenous trees as heritage and climate insurance for future generations.'
    ]
  },
  {
    id: 'mod-7',
    moduleNumber: 7,
    title: 'Integrated Farm Forestry Planning & Assessment',
    hours: 2,
    icon: 'CalendarCheck',
    color: 'teal',
    overview: 'The capstone module synthesizes all technical skills into an operational 12-Month Farm Forestry Action Plan tailored to local Nyandarua planting seasons, farm labor schedules, capital availability, and family needs.',
    learningObjectives: [
      'Synthesize learning from Modules 1-6 into a comprehensive whole-farm plan.',
      'Formulate a 12-month farm forestry seasonal calendar (Jan-Feb through Nov-Dec).',
      'Balance food production, tree income, animal fodder, and soil protection.',
      'Complete the FFTC Practical Skills Assessment Checklist.',
      'Qualify for the Certificate in Farm Forestry Basics (CFFB).'
    ],
    keyConcepts: [
      'Whole-Farm Integration: Trees, livestock, food crops, and water systems planned in harmony.',
      'Seasonal Timing: Aligning nursery preparation with dry months and transplanting with peak rain months.',
      'Resource Allocation: Assigning family labor, purchasing tools, and scheduling maintenance reviews.',
      'CFFB Certification: Earning recognition from TGAN and demonstrating verified competencies.'
    ],
    analogyTitle: 'The Master Farm Blueprint',
    analogyDescription: 'Building a farm forestry enterprise without an action plan is like building a stone house without an architect blueprint. A 12-month seasonal plan turns good intentions into structured farm wealth.',
    units: [
      {
        id: 'u-7-1',
        unitNumber: 'Unit 7.1',
        title: 'The 12-Month Seasonal Action Plan',
        summary: 'Standard operational calendar adapted to Nyandarua agro-ecological conditions.',
        keyPoints: [
          'January - February: Seed/seedling sourcing and species procurement.',
          'March - April: Nursery preparation and potting mix blending.',
          'April - May: Site preparation, hole excavation, and main rains planting.',
          'May - June: Weeding, spot mulching, and pest monitoring.',
          'July - August: Gapping (replacement of dead seedlings).',
          'September - October: Formative pruning and short rains establishment.',
          'November - December: Annual survival count, ledger review, and next year planning.'
        ],
        fieldTip: 'Review your action plan quarterly with a neighbouring farmer or TGAN lead farmer.'
      }
    ],
    practicalActivityTitle: 'Exercise 7: 12-Month Farm Forestry Action Planning',
    practicalActivityInstructions: [
      'Complete the official FFTC 12-Month Action Plan template.',
      'Define tree production goals (number of stems, species, and target year).',
      'Define soil, environmental, and income goals.',
      'Input specific activities, materials, tools, and responsible family members across all 6 bi-monthly cycles.',
      'Present your farm blueprint to peers or trainers for review.'
    ],
    expectedCompetency: 'The participant can prepare and present a realistic, season-aligned 12-month integrated farm forestry action plan.',
    takeHomeMessages: [
      'A written plan ensures tasks are accomplished on time before seasonal rains pass.',
      'Involve the entire household so tree management responsibilities are clearly shared.',
      'Continuously measure survival rates and adjust management strategies annually.'
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Agroforestry',
    simpleMeaning: 'Combining trees with crops and/or livestock on the same farm unit.',
    localContext: 'e.g. Growing potatoes between rows of pruned Grevillea or Calliandra in Nyandarua.'
  },
  {
    term: 'Biochar',
    simpleMeaning: 'A carbon-rich, porous material produced from plant residues under controlled low-oxygen pyrolysis, used to improve soil moisture and nutrient retention.',
    localContext: 'Created from maize cobs, bean stalks, and tree prunings, charged with cow dung.'
  },
  {
    term: 'Boundary Planting',
    simpleMeaning: 'Planting trees deliberately along farm perimeter boundaries to serve as living fences, windbreaks, and timber banks.',
    localContext: 'Very common along farm fences to mark land boundaries while protecting crops from cold winds.'
  },
  {
    term: 'Coppicing',
    simpleMeaning: 'Cutting suitable tree species close to the ground at a clean angle to stimulate dense new shoots from the root stump.',
    localContext: 'Applied to Eucalyptus and indigenous species to obtain multiple harvests of poles and firewood.'
  },
  {
    term: 'Farm Forestry',
    simpleMeaning: 'The systematic growing and management of trees on agricultural land for commercial income, household products, and ecological protection.',
    localContext: 'Treating trees as a valued farm crop alongside cabbage, maize, and dairy.'
  },
  {
    term: 'Gapping',
    simpleMeaning: 'The practice of replacing seedlings that died shortly after planting to maintain full stocking density and avoid wasted land.',
    localContext: 'Carried out within 4 to 8 weeks after initial planting during the active rainy season.'
  },
  {
    term: 'Pruning',
    simpleMeaning: 'The deliberate removal of selected lower branches using clean cuts to improve tree stem form, timber quality, and reduce crop shading.',
    localContext: 'Follows the 1/3 rule using sharp saws to prevent branch knot defects in mature timber.'
  },
  {
    term: 'Thinning',
    simpleMeaning: 'The selective removal of overcrowded, crooked, or weak trees to provide remaining healthy trees with adequate growing space, sunlight, and soil nutrients.',
    localContext: 'Provides intermediate harvest revenue from fencing posts and bean stakes while sawlogs mature.'
  },
  {
    term: 'Value Addition',
    simpleMeaning: 'Processing or refining raw tree products before sale to significantly increase their market value and profit margin.',
    localContext: 'Debarking poles, solar drying timber, making charcoal briquettes, or producing honey.'
  },
  {
    term: 'Woodlot',
    simpleMeaning: 'A designated section of the farm set aside primarily for high-density commercial tree production.',
    localContext: 'Often planted on rocky slopes or steep corners unsuitable for regular food cultivation.'
  }
];

export const INITIAL_COMPETENCIES: CompetencyItem[] = [
  { id: 'comp-1', skill: 'Draws a simple farm tree map', module: 1, status: 'unassessed' },
  { id: 'comp-2', skill: 'Selects a healthy seedling', module: 2, status: 'unassessed' },
  { id: 'comp-3', skill: 'Plants a seedling correctly (depth & firming)', module: 2, status: 'unassessed' },
  { id: 'comp-4', skill: 'Applies correct spacing & gapping', module: 2, status: 'unassessed' },
  { id: 'comp-5', skill: 'Demonstrates proper pruning (1/3 rule & clean cut)', module: 3, status: 'unassessed' },
  { id: 'comp-6', skill: 'Identifies basic tree-health problems & pests', module: 3, status: 'unassessed' },
  { id: 'comp-7', skill: 'Explains basic soil-health & terrace practices', module: 4, status: 'unassessed' },
  { id: 'comp-8', skill: 'Demonstrates basic biochar application & charging', module: 4, status: 'unassessed' },
  { id: 'comp-9', skill: 'Calculates basic costs, revenue and profit', module: 5, status: 'unassessed' },
  { id: 'comp-10', skill: 'Identifies relevant stakeholders & legal permits', module: 6, status: 'unassessed' },
  { id: 'comp-11', skill: 'Prepares a 12-month farm forestry action plan', module: 7, status: 'unassessed' },
];

export const CURRICULUM_MANUALS = [
  { number: 1, title: 'Introduction to Farm Forestry & Sustainable Land Use', duration: '3 days (18 hrs)', level: 'Foundational' },
  { number: 2, title: 'Tree Nursery Management & Seedling Production', duration: '5 days (30 hrs)', level: 'Foundational' },
  { number: 3, title: 'Tree Planting, Establishment and Early Care', duration: '4 days (24 hrs)', level: 'Intermediate' },
  { number: 4, title: 'Forest Management, Pruning and Harvesting', duration: '5 days (30 hrs)', level: 'Intermediate' },
  { number: 5, title: 'Agroforestry Systems Design and Management', duration: '5 days (30 hrs)', level: 'Intermediate' },
  { number: 6, title: 'Soil Conservation, Water Management & Climate Adaptation', duration: '4 days (24 hrs)', level: 'Intermediate' },
  { number: 7, title: 'Forest Products Value Chain and Agribusiness', duration: '4 days (24 hrs)', level: 'Advanced' },
  { number: 8, title: 'Biodiversity Conservation & Indigenous Forest Knowledge', duration: '3 days (18 hrs)', level: 'Specialist' },
  { number: 9, title: 'Extension Methodology & Farmer-to-Farmer Learning', duration: '4 days (24 hrs)', level: 'Specialist' },
  { number: 10, title: 'Forest Governance, Policy, Advocacy & Climate Finance', duration: '3 days (18 hrs)', level: 'Advanced / Leadership' },
];

export const CERTIFICATION_LADDER = [
  {
    code: 'CFFB',
    name: 'Certificate in Farm Forestry Basics',
    duration: '1 Week (40 Contact Hours / 30 Credit Hours)',
    level: 'Level 1 Foundation',
    feeKES: 2000,
    prerequisite: 'Open to all farmers (18+ yrs)',
    manuals: 'Manual 1 & Manual 2 (Core Units)',
    target: 'New and smallholder farmers with little or no prior formal forestry training'
  },
  {
    code: 'CSFF',
    name: 'Certificate in Sustainable Farm Forestry',
    duration: '3 Weeks (120 Contact Hours)',
    level: 'Level 2 Intermediate',
    feeKES: 8000,
    prerequisite: 'CFFB or evidence of 2+ years of active tree farming',
    manuals: 'Manuals 1, 2, 3, 4, 5, and 6',
    target: 'Active smallholder forest farmers seeking comprehensive management mastery'
  },
  {
    code: 'ACFFM / DFFM',
    name: 'Diploma in Farm Forestry Management',
    duration: '12 Weeks (480 Contact Hours + 4-Week Farm Attachment)',
    level: 'Advanced Diploma',
    feeKES: 30000,
    prerequisite: 'CSFF or KCSE + 3 years farm forestry experience',
    manuals: 'All 10 Training Manuals',
    target: 'Forestry practitioners and leaders aspiring to extension and managerial roles'
  },
  {
    code: 'CFFE',
    name: 'Certificate in Farm Forestry Extension',
    duration: '4 Weeks (160 Contact Hours)',
    level: 'Level 3 Specialist',
    feeKES: 12000,
    prerequisite: 'CSFF + demonstrated community leadership',
    manuals: 'Manual 9 (Core) + selected units from Manuals 1-6',
    target: 'Lead farmers, community trainers, and field extension officers'
  },
  {
    code: 'CFA',
    name: 'Certificate in Forest Agribusiness',
    duration: '2 Weeks (80 Contact Hours)',
    level: 'Level 2 Specialist',
    feeKES: 6000,
    prerequisite: 'CFFB or basic business/agricultural background',
    manuals: 'Manual 7 (Core) + Manual 4 (Harvesting & Processing)',
    target: 'Commercial growers, pole contractors, and timber entrepreneurs'
  },
  {
    code: 'MFFA',
    name: 'Master Farm Forester Award',
    duration: 'Portfolio-based assessment (No fixed duration)',
    level: 'Master Recognition',
    feeKES: 0,
    prerequisite: 'DFFM or CSFF + minimum 5 years distinguished practice',
    manuals: 'Distinguished on-farm excellence & community mentorship',
    target: 'Pioneer community mentors recognized at Annual TGAN Graduation Ceremony'
  }
];

export interface PhotoSlideItem {
  id: string;
  image: string;
  title: string;
  category: string;
  location: string;
  caption: string;
  fieldFocus: string;
}

export const PHOTO_SLIDER_ITEMS: PhotoSlideItem[] = [
  {
    id: 'slide-1',
    image: '/src/assets/images/trainees_tree_planting_1791669542766.jpg',
    title: 'Practical Tree Planting & Root Ball Care',
    category: 'Field Practicals',
    location: 'Ol\'Kalou South Demonstration Farm, Nyandarua',
    caption: 'FFTC trainees and youth groups mastering standard 45cm³ pit excavation, root positioning, and immediate basin watering.',
    fieldFocus: 'Module 2: Practical Planting, Spacing & Gapping'
  },
  {
    id: 'slide-2',
    image: '/src/assets/images/seedling_nursery_tubes_1791669554020.jpg',
    title: 'Commercial Farm Nursery in Black Polythene Tubes',
    category: 'Tree Nursery Production',
    location: 'TGAN Central Cooperative Nursery, Ol Joro Orok',
    caption: 'Over 15,000 certified Cypress, Pine, and Grevillea seedlings arranged in raised potting beds ready for farmers.',
    fieldFocus: 'Module 2: Potting Mix (2:1:1), Pricking Out & Hardening Off'
  },
  {
    id: 'slide-3',
    image: '/src/assets/images/plantation_pine_agroforestry_1791669564276.jpg',
    title: 'High-Altitude Pinus Patula Timber Woodlot',
    category: 'Silviculture & Pruning',
    location: 'Gathanji Ward Agroforestry Plot, 2,400m ASL',
    caption: 'Managed multi-purpose farm woodlot with 3m x 3m spacing, strict 33% green canopy pruning, and zero ground fire fuel.',
    fieldFocus: 'Module 3: Formative Pruning & First Thinning at Year 4'
  },
  {
    id: 'slide-4',
    image: '/src/assets/images/field_planting_pits_1791669574986.jpg',
    title: 'Terrace Preparation & Contour Pitting Before Rains',
    category: 'Soil & Water Conservation',
    location: 'Aberdare Slopes Catchment, Kipipiri Sub-County',
    caption: 'Precision pitting along contour swales with topsoil separated from subsoil to trap rain runoff and prevent erosion.',
    fieldFocus: 'Module 1 & 4: Water Harvesting Pans & Soil Infiltration'
  },
  {
    id: 'slide-5',
    image: '/src/assets/images/nyandarua_agroforestry_1791668850893.jpg',
    title: 'Integrated Food Crop & Windbreak Farming',
    category: 'Smallholder Agroforestry',
    location: 'Miharati Agricultural Training Zone',
    caption: 'Grevillea robusta windbreaks shielding cold-sensitive potato fields while generating timber and firewood.',
    fieldFocus: 'Module 1: Three Core Typologies (Boundary, Intercropped, Woodlots)'
  }
];

export const INITIAL_COURSES: CurriculumCourse[] = [
  {
    id: 'course-cffb',
    code: 'CFFB-101',
    title: 'Certificate in Farm Forestry Basics',
    subtitle: 'Comprehensive 7-Module Practical Competency Program',
    category: 'Agroforestry Foundations',
    durationWeeks: 4,
    creditHours: 30,
    instructor: 'Dr. Joseph Kimani, Senior Forestry Extension Specialist',
    level: 'Foundational',
    description: 'The core benchmark curriculum of the Farm Forestry Training Center (FFTC) in Nyandarua County. Covers farm mapping, species selection, nursery operations, pruning, biochar production, marketing via TGAN, legal transit permits, and 12-month action plans.',
    targetAudience: 'Smallholder farmers, youth groups, lead farmers, and agricultural extension workers.',
    enrolledCount: 142,
    bannerImage: '/src/assets/images/trainees_tree_planting_1791669542766.jpg',
    featured: true,
    modules: CFFB_MODULES
  },
  {
    id: 'course-ctn',
    code: 'CTN-201',
    title: 'Commercial Tree Nursery Management',
    subtitle: 'From Seed Procurement to High-Grade Seedling Sales',
    category: 'Nursery Management',
    durationWeeks: 2,
    creditHours: 18,
    instructor: 'Eng. Francis Mwangi, Seedlings & Certification Lead',
    level: 'Intermediate',
    description: 'Master potting soil formulation (2:1:1 topsoil, sand, manure mix), seed dormancy breaking, germination bed shading, pricking out into polybags, disease prevention (damping-off), hardening off, and commercial seedling marketing.',
    targetAudience: 'Community groups, women and youth enterprises, private nursery owners.',
    enrolledCount: 89,
    bannerImage: '/src/assets/images/seedling_nursery_tubes_1791669554020.jpg',
    modules: [
      {
        id: 'ctn-mod-1',
        moduleNumber: 1,
        title: 'Seed Sourcing, Storage & Pre-Treatment',
        hours: 6,
        icon: 'Sprout',
        color: 'emerald',
        overview: 'Source certified seed from KEFRI and seed orchards. Techniques for hot water soaking, mechanical scarification, and viability testing.',
        learningObjectives: ['Identify genuine seed sources', 'Calculate germination percentage', 'Store seed to prevent fungal mold'],
        keyConcepts: ['Seed viability', 'KEFRI certification standards', 'Scarification protocols'],
        units: [
          {
            id: 'ctn-u-1',
            unitNumber: 'Unit 1.1',
            title: 'Certified Seed Sourcing & Documentation',
            summary: 'Avoid poor seed from uncertified roadside trees.',
            keyPoints: ['Traceability to mother trees', 'Seed handling hygiene'],
            fieldTip: 'Always verify KEFRI batch numbers before purchasing tree seed.'
          }
        ],
        practicalActivityTitle: 'Hot Water Scarification Lab',
        practicalActivityInstructions: ['Immerse Acacia / Calliandra seeds in 80°C water for 2 minutes', 'Soak in cold water for 12 hours'],
        expectedCompetency: 'Achieve >80% germination rate on test seed batch',
        takeHomeMessages: ['Good trees start from proven seed parentage.'],
      },
      {
        id: 'ctn-mod-2',
        moduleNumber: 2,
        title: 'Potting Substrate Preparation & Tube Filling',
        hours: 6,
        icon: 'Layers',
        color: 'amber',
        overview: 'Mix 2 parts forest loam topsoil, 1 part sharp river sand, and 1 part cured composted manure. Tube filling ergonomics and compaction checks.',
        learningObjectives: ['Formulate ideal potting mix', 'Eliminate soil-borne pathogens', 'Pack potting tubes without air pockets'],
        keyConcepts: ['Porosity and drainage', 'Root ball integrity', 'Nutrient availability'],
        units: [
          {
            id: 'ctn-u-2',
            unitNumber: 'Unit 2.1',
            title: 'Substrate Sifting & Sterilization',
            summary: 'Using wire sieves to remove stones and roots before mixing.',
            keyPoints: ['Sand ensures drainage', 'Organic manure feeds roots without chemical fertilizer'],
            fieldTip: 'Water tubes thoroughly 2 days before pricking out seedlings.'
          }
        ],
        practicalActivityTitle: 'Soil Mixing & Tube Packing Speed Drill',
        practicalActivityInstructions: ['Prepare 100 polybags using the 2:1:1 mix ratio', 'Check drainage holes at bottom corners'],
        expectedCompetency: 'Pack upright stable polybags without loose soil settlement',
        takeHomeMessages: ['The root container is the foundation of field survival.'],
      },
      {
        id: 'ctn-mod-3',
        moduleNumber: 3,
        title: 'Nursery Hygiene, Watering & Hardening Off',
        hours: 6,
        icon: 'Sun',
        color: 'blue',
        overview: 'Gradual reduction of shade and watering 3 weeks before field dispatch so seedlings withstand harsh wind and direct sunlight.',
        learningObjectives: ['Prevent damping-off fungal rot', 'Execute root pruning', 'Harden seedlings for highland conditions'],
        keyConcepts: ['Root shearing / wrenching', 'Sunlight acclimatization', 'Batch grading'],
        units: [
          {
            id: 'ctn-u-3',
            unitNumber: 'Unit 3.1',
            title: 'Hardening Off Protocols',
            summary: 'Moving seedlings from shade nets to full outdoor exposure.',
            keyPoints: ['Water in early morning only', 'Lift tubes weekly to sever protruding taproots'],
            fieldTip: 'Never dispatch soft, unhardened seedlings during rainy season.'
          }
        ],
        practicalActivityTitle: 'Root Pruning Wire Demo',
        practicalActivityInstructions: ['Slide piano wire beneath seedling beds to cleanly trim roots extending into ground'],
        expectedCompetency: 'Graded stock ready for delivery to planting sites',
        takeHomeMessages: ['Hardened seedlings guarantee high field survival.'],
      }
    ]
  },
  {
    id: 'course-bsf',
    code: 'BSF-301',
    title: 'Biochar Production & Soil Fertility',
    subtitle: 'On-Farm Pyrolysis, Carbon Sequestration & Soil Amending',
    category: 'Soil & Water Conservation',
    durationWeeks: 2,
    creditHours: 16,
    instructor: 'Agnes Nduta, Soil Health & Pyrolysis Technologist',
    level: 'Intermediate',
    description: 'Transform tree prunings, corn cobs, and agricultural woody waste into high-grade porous biochar using low-oxygen flame-cap kilns. Master inoculation with livestock manure and bokashi slurry to restore depleted acidic highland soils.',
    targetAudience: 'Farming cooperatives, sustainable agriculture champions, carbon project coordinators.',
    enrolledCount: 64,
    bannerImage: '/src/assets/images/field_planting_pits_1791669574986.jpg',
    modules: [
      {
        id: 'bsf-mod-1',
        moduleNumber: 1,
        title: 'Flame-Cap Pyrolysis Kiln Operation',
        hours: 8,
        icon: 'Flame',
        color: 'red',
        overview: 'Safe construction and operation of conical flame-cap and Kon-Tiki kilns using dry woody farm biomass.',
        learningObjectives: ['Understand pyrolysis chemistry', 'Operate flame-cap kiln safely', 'Quench biochar with water or slurry'],
        keyConcepts: ['Smokeless combustion', 'Oxygen starvation', 'Carbon capture'],
        units: [
          {
            id: 'bsf-u-1',
            unitNumber: 'Unit 1.1',
            title: 'Biomass Sizing & Moisture Content',
            summary: 'Using feedstock with <20% moisture content for clean burn.',
            keyPoints: ['Layering sticks by diameter', 'Watching flame color for complete pyrolysis'],
            fieldTip: 'Quench when the entire top layer shows white ash dusting.'
          }
        ],
        practicalActivityTitle: 'Kon-Tiki Kiln Burn & Quenching Lab',
        practicalActivityInstructions: ['Fill kiln in progressive layers', 'Quench with 150 liters of water when carbonized'],
        expectedCompetency: 'Produce 50kg of premium crumbly black biochar',
        takeHomeMessages: ['Biochar locks carbon into the soil for hundreds of years.'],
      },
      {
        id: 'bsf-mod-2',
        moduleNumber: 2,
        title: 'Biochar Activation & Field Application',
        hours: 8,
        icon: 'Leaf',
        color: 'emerald',
        overview: 'Why raw biochar robs soil nitrogen if uncharged, and how to pre-load pores with cattle manure and fermented compost tea.',
        learningObjectives: ['Inoculate biochar with microbes and nitrogen', 'Calculate application rates per planting hole', 'Monitor soil pH buffering'],
        keyConcepts: ['Cation exchange capacity', 'Microbial colonization', 'Moisture holding capacity'],
        units: [
          {
            id: 'bsf-u-2',
            unitNumber: 'Unit 2.1',
            title: 'Blending Biochar with Cattle Manure (1:1 Ratio)',
            summary: 'Resting the mixture for 14 days before soil incorporation.',
            keyPoints: ['Add 2 handfuls of charged biochar to each 45cm tree pit', 'Mix evenly with topsoil'],
            fieldTip: 'Notice the immediate increase in moisture retention around roots.'
          }
        ],
        practicalActivityTitle: 'Manure-Biochar Inoculation Pile Prep',
        practicalActivityInstructions: ['Mix 50kg crushed biochar with 50kg cow dung and water', 'Cover with banana leaves for 2 weeks'],
        expectedCompetency: 'Formulate fully charged soil amendment',
        takeHomeMessages: ['Charged biochar supercharges plant vitality.'],
      }
    ]
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr-001',
    name: 'Wanjiku Mary Kariuki',
    email: 'mary.kariuki@farmforestry.or.ke',
    role: 'learner',
    phone: '0712 345 678',
    county: 'Nyandarua County',
    location: 'Ol\'Kalou South, Gathanji Ward',
    farmSizeAcres: 2.5,
    occupation: 'Smallholder Farmer',
    registeredDate: '2026-09-15',
    enrolledCourses: ['course-cffb', 'course-ctn'],
    completedModules: ['mod-1', 'mod-2'],
    quizScores: { 'mod-1': 85, 'mod-2': 90 },
    practicalSubmitted: true,
    actionPlanSubmitted: true
  },
  {
    id: 'usr-002',
    name: 'John Mwangi Githinji',
    email: 'john.mwangi@gmail.com',
    role: 'learner',
    phone: '0723 456 789',
    county: 'Nyandarua County',
    location: 'Ol Joro Orok Sub-County',
    farmSizeAcres: 4.0,
    occupation: 'Youth Cooperative Tree Grower',
    registeredDate: '2026-09-18',
    enrolledCourses: ['course-cffb'],
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    quizScores: { 'mod-1': 92, 'mod-2': 88, 'mod-3': 95, 'mod-4': 90 },
    practicalSubmitted: true,
    actionPlanSubmitted: true,
    certificateEarned: {
      certNumber: 'FFTC-CFFB-2026-8491',
      courseId: 'course-cffb',
      courseName: 'Certificate in Farm Forestry Basics (CFFB)',
      issueDate: '2026-10-02',
      grade: 'Distinction',
      score: 91
    }
  },
  {
    id: 'usr-003',
    name: 'Grace Njeri Ndung\'u',
    email: 'grace.njeri@yahoo.com',
    role: 'learner',
    phone: '0734 567 890',
    county: 'Nyandarua County',
    location: 'Kipipiri, Geta Ward',
    farmSizeAcres: 1.8,
    occupation: 'Lead Woman Farmer & Nursery Entrepreneur',
    registeredDate: '2026-09-22',
    enrolledCourses: ['course-cffb', 'course-ctn', 'course-bsf'],
    completedModules: ['mod-1', 'mod-2', 'mod-3'],
    quizScores: { 'mod-1': 78, 'mod-2': 82, 'mod-3': 85 },
    practicalSubmitted: true,
    actionPlanSubmitted: false
  },
  {
    id: 'usr-004',
    name: 'Peter Kamau Waweru',
    email: 'peter.kamau@extension.go.ke',
    role: 'learner',
    phone: '0745 678 901',
    county: 'Nakuru County',
    location: 'Subukia Border',
    farmSizeAcres: 5.0,
    occupation: 'Sub-County Agricultural Officer',
    registeredDate: '2026-09-28',
    enrolledCourses: ['course-cffb', 'course-bsf'],
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5', 'mod-6', 'mod-7'],
    quizScores: { 'mod-1': 95, 'mod-2': 90, 'mod-3': 92, 'mod-4': 88, 'mod-5': 96, 'mod-6': 94, 'mod-7': 90 },
    practicalSubmitted: true,
    actionPlanSubmitted: true,
    certificateEarned: {
      certNumber: 'FFTC-CFFB-2026-9204',
      courseId: 'course-cffb',
      courseName: 'Certificate in Farm Forestry Basics (CFFB)',
      issueDate: '2026-10-06',
      grade: 'Distinction',
      score: 93
    }
  },
  {
    id: 'usr-005',
    name: 'Beatrice Wangari Kuria',
    email: 'b.wangari@nyandarua-trees.org',
    role: 'learner',
    phone: '0756 789 012',
    county: 'Nyandarua County',
    location: 'Ndaragwa Central',
    farmSizeAcres: 3.2,
    occupation: 'Cooperative Committee Member',
    registeredDate: '2026-10-01',
    enrolledCourses: ['course-cffb'],
    completedModules: ['mod-1'],
    quizScores: { 'mod-1': 82 },
    practicalSubmitted: false,
    actionPlanSubmitted: false
  },
  {
    id: 'usr-admin',
    name: 'Dr. Joseph Kimani',
    email: 'admin@fftc.or.ke',
    role: 'admin',
    phone: '0722 000 111',
    county: 'Nyandarua County',
    location: 'FFTC Main Campus, Ol\'Kalou',
    farmSizeAcres: 12.0,
    occupation: 'Lead Curriculum Officer & Principal Forester',
    registeredDate: '2026-08-01',
    enrolledCourses: ['course-cffb', 'course-ctn', 'course-bsf'],
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5', 'mod-6', 'mod-7'],
    quizScores: {},
    practicalSubmitted: true,
    actionPlanSubmitted: true
  }
];

export const INITIAL_CERTIFICATES: AwardedCertificate[] = [
  {
    id: 'cert-rec-01',
    certNumber: 'FFTC-CFFB-2026-8491',
    recipientId: 'usr-002',
    recipientName: 'John Mwangi Githinji',
    recipientEmail: 'john.mwangi@gmail.com',
    courseId: 'course-cffb',
    courseName: 'Certificate in Farm Forestry Basics (CFFB)',
    issueDate: '2026-10-02',
    score: 91,
    grade: 'Distinction',
    issuer: 'Farm Forestry Training Center (FFTC) & TGAN Board',
    status: 'Verified'
  },
  {
    id: 'cert-rec-02',
    certNumber: 'FFTC-CFFB-2026-9204',
    recipientId: 'usr-004',
    recipientName: 'Peter Kamau Waweru',
    recipientEmail: 'peter.kamau@extension.go.ke',
    courseId: 'course-cffb',
    courseName: 'Certificate in Farm Forestry Basics (CFFB)',
    issueDate: '2026-10-06',
    score: 93,
    grade: 'Distinction',
    issuer: 'Farm Forestry Training Center (FFTC) & TGAN Board',
    status: 'Verified'
  },
  {
    id: 'cert-rec-03',
    certNumber: 'FFTC-CFFB-2026-7812',
    recipientId: 'usr-legacy-01',
    recipientName: 'Esther Muthoni Kimemia',
    recipientEmail: 'muthoni.kimemia@gmail.com',
    courseId: 'course-cffb',
    courseName: 'Certificate in Farm Forestry Basics (CFFB)',
    issueDate: '2026-09-28',
    score: 87,
    grade: 'Credit',
    issuer: 'Farm Forestry Training Center (FFTC) & TGAN Board',
    status: 'Verified'
  },
  {
    id: 'cert-rec-04',
    certNumber: 'FFTC-CTN-2026-4410',
    recipientId: 'usr-legacy-02',
    recipientName: 'Samuel Gitau Mbugua',
    recipientEmail: 'samuel.gitau@nyandarua.coop',
    courseId: 'course-ctn',
    courseName: 'Commercial Tree Nursery Management',
    issueDate: '2026-09-30',
    score: 89,
    grade: 'Distinction',
    issuer: 'Farm Forestry Training Center (FFTC) & TGAN Board',
    status: 'Verified'
  }
];

