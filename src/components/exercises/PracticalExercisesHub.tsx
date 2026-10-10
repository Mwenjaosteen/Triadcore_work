import React, { useState } from 'react';
import { useFFTC } from '../../context/FFTCContext';
import {
  Trees,
  MapPin,
  Sprout,
  Scissors,
  Flame,
  Calculator,
  ShieldAlert,
  CalendarCheck,
  Plus,
  Trash2,
  Printer,
  Download,
  CheckCircle2,
  AlertTriangle,
  Compass,
} from 'lucide-react';

export const PracticalExercisesHub: React.FC = () => {
  const {
    farmMap,
    addMapElement,
    removeMapElement,
    actionPlan,
    updateActionPlan,
    updateActionPlanRow,
    costingItems,
    setCostingItems,
    revenueItems,
    setRevenueItems,
    learner,
  } = useFFTC();

  const [activeExerciseTab, setActiveExerciseTab] = useState<
    'mapping' | 'planting' | 'pruning' | 'biochar' | 'costing' | 'policy' | 'action_plan'
  >('mapping');

  // Exercise 1 Map States
  const [newElemType, setNewElemType] = useState<typeof farmMap['elements'][0]['type']>('boundary_trees');
  const [newElemLabel, setNewElemLabel] = useState('Boundary Grevillea Windbreak');

  // Exercise 2 Planting States
  const [holeDepth, setHoleDepth] = useState<number>(45);
  const [holeWidth, setHoleWidth] = useState<number>(45);
  const [manureRatio, setManureRatio] = useState<number>(33); // 33% manure, 67% topsoil
  const [collarLevel, setCollarLevel] = useState<'ground_level' | 'too_deep' | 'too_shallow'>('ground_level');

  // Exercise 3 Pruning States
  const [canopyRemovalPercent, setCanopyRemovalPercent] = useState<number>(25);
  const [cutPosition, setCutPosition] = useState<'collar' | 'flush_trunk' | 'stub'>('collar');
  const [coppiceAngle, setCoppiceAngle] = useState<'sloping_outward' | 'flat' | 'sloping_inward'>('sloping_outward');

  // Exercise 4 Biochar States
  const [pruningsKg, setPruningsKg] = useState<number>(200);
  const biocharYieldKg = Math.round(pruningsKg * 0.28);
  const manureNeededKg = biocharYieldKg * 4;
  const co2SequesteredKg = Math.round(biocharYieldKg * 2.8);

  // Exercise 5 Calculations
  const totalCostKES = costingItems.reduce((acc, c) => acc + c.totalCostKES, 0);
  const totalRevenueKES = revenueItems.reduce((acc, r) => acc + r.totalRevenueKES, 0);
  const netProfitKES = totalRevenueKES - totalCostKES;

  // Add Costing item
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'Establishment' | 'Maintenance' | 'Harvesting' | 'Processing'>('Establishment');
  const [newItemQty, setNewItemQty] = useState(100);
  const [newItemRate, setNewItemRate] = useState(25);

  const handleAddCostItem = () => {
    if (!newItemName.trim()) return;
    setCostingItems((prev) => [
      ...prev,
      {
        category: newItemCategory,
        item: newItemName,
        quantity: newItemQty,
        unitCostKES: newItemRate,
        totalCostKES: newItemQty * newItemRate
      }
    ]);
    setNewItemName('');
  };

  const exerciseTabs = [
    { id: 'mapping', label: '1. Farm Tree Mapping', icon: MapPin },
    { id: 'planting', label: '2. Seedling & Planting', icon: Sprout },
    { id: 'pruning', label: '3. Pruning & Coppicing', icon: Scissors },
    { id: 'biochar', label: '4. Biochar & Soil Carbon', icon: Flame },
    { id: 'costing', label: '5. Enterprise Costing', icon: Calculator },
    { id: 'policy', label: '6. KFS Permits & Species', icon: ShieldAlert },
    { id: 'action_plan', label: '7. 12-Month Action Plan', icon: CalendarCheck },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Practical Exercises & Field Studio
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hands-on simulation tools for the 7 official field exercises (Manuals 1 through 7).
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold self-start sm:self-auto">
          <span>60% Practical Competency Requirement</span>
        </div>
      </div>

      {/* Exercises Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto whitespace-nowrap">
        {exerciseTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeExerciseTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveExerciseTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 min-h-[44px] ${
                isActive
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-emerald-700'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Farm Tree Mapping Studio (Exercise 1) */}
      {activeExerciseTab === 'mapping' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Exercise 1 · Foundations of Farm Forestry
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Smallholder Farm Tree Mapping Canvas
              </h2>
              <p className="text-xs text-slate-500">
                Map farm boundaries, house, crop fields, water pans, wind exposure corridors, and proposed tree zones.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg self-start md:self-auto min-h-[36px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Farm Map</span>
            </button>
          </div>

          {/* Interactive Visual Map Canvas */}
          <div className="relative aspect-16/9 w-full rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 border-2 border-emerald-800/80 overflow-hidden shadow-inner p-4 text-white">
            {/* Compass rose & Scale */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono flex items-center gap-2 border border-white/10">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>NORTH (Aberdare Winds)</span>
            </div>

            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10">
              <span>{farmMap.farmName} ({farmMap.farmSizeAcres} Acres)</span>
            </div>

            {/* Farm Grid Area & Placed Elements */}
            <div className="w-full h-full relative border border-dashed border-white/20 rounded-xl overflow-hidden mt-6">
              {farmMap.elements.map((el) => {
                let badgeColor = 'bg-emerald-600 text-white';
                if (el.type === 'house') badgeColor = 'bg-amber-500 text-slate-950';
                if (el.type === 'water') badgeColor = 'bg-cyan-500 text-slate-950';
                if (el.type === 'erosion_zone') badgeColor = 'bg-rose-600 text-white animate-pulse';
                if (el.type === 'crops') badgeColor = 'bg-lime-600 text-white';
                if (el.type === 'woodlot') badgeColor = 'bg-teal-700 text-white';

                return (
                  <div
                    key={el.id}
                    style={{ left: `${el.x}%`, top: `${el.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
                  >
                    <div className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1.5 ${badgeColor}`}>
                      <Trees className="w-3 h-3 shrink-0" />
                      <span className="whitespace-nowrap">{el.label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMapElement(el.id);
                        }}
                        className="ml-1 opacity-0 group-hover:opacity-100 hover:text-red-200 transition-opacity"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                    {el.notes && (
                      <span className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-black/85 text-[10px] text-slate-200 px-2 py-0.5 rounded whitespace-nowrap shadow-md z-20">
                        {el.notes}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-2 left-4 text-[10px] text-emerald-300/80">
              Click elements to view details · Add new tree zones below
            </div>
          </div>

          {/* Add Map Element Form */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800">Add Element to Farm Map:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Element Type</label>
                <select
                  value={newElemType}
                  onChange={(e) => {
                    const t = e.target.value as any;
                    setNewElemType(t);
                    if (t === 'boundary_trees') setNewElemLabel('Boundary Grevillea Windbreak');
                    if (t === 'intercropped_trees') setNewElemLabel('Intercropped Calliandra Rows');
                    if (t === 'woodlot') setNewElemLabel('Commercial Cypress Woodlot');
                    if (t === 'erosion_zone') setNewElemLabel('Erosion Gully Slope');
                    if (t === 'water') setNewElemLabel('Rainwater Catchment Pond');
                  }}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                >
                  <option value="boundary_trees">Boundary Trees (Living Fence / Windbreak)</option>
                  <option value="intercropped_trees">Intercropped Alley Trees</option>
                  <option value="woodlot">Dedicated Farm Woodlot</option>
                  <option value="erosion_zone">Erosion Risk Zone (Fanya Juu)</option>
                  <option value="water">Water Point / Earth Pan</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Element Label / Description</label>
                <input
                  type="text"
                  value={newElemLabel}
                  onChange={(e) => setNewElemLabel(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-medium"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    const randomX = Math.floor(20 + Math.random() * 60);
                    const randomY = Math.floor(20 + Math.random() * 60);
                    addMapElement({
                      type: newElemType,
                      label: newElemLabel,
                      x: randomX,
                      y: randomY,
                      notes: 'Planned integration during short rains'
                    });
                  }}
                  className="w-full py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors cursor-pointer min-h-[40px]"
                >
                  Place on Map Canvas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Seedling & Planting Simulator (Exercise 2) */}
      {activeExerciseTab === 'planting' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Exercise 2 · Tree Species, Nursery Management and Establishment
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Seedling Assessment & Planting Geometry Guide (Figure 2)
            </h2>
            <p className="text-xs text-slate-500">
              Demonstrating the 6 steps of correct planting: hole excavation (45cm cube), soil amendment (2:1 topsoil to manure), collar depth alignment, and soil consolidation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Interactive Inputs */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
              <h4 className="font-bold text-slate-800">Configure Planting Standards:</h4>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-700">Hole Dimensions:</span>
                  <span className="font-mono font-bold text-emerald-800">{holeDepth} cm x {holeWidth} cm</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={holeDepth}
                  onChange={(e) => {
                    setHoleDepth(Number(e.target.value));
                    setHoleWidth(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-700"
                />
                <span className="text-[10px] text-slate-400">Target standard: 45 cm x 45 cm x 45 cm</span>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-slate-700">Organic Manure Mixing Ratio:</span>
                  <span className="font-mono font-bold text-emerald-800">{manureRatio}% manure ({100 - manureRatio}% topsoil)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="70"
                  value={manureRatio}
                  onChange={(e) => setManureRatio(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
                <span className="text-[10px] text-slate-400">Target standard: 30% - 35% cured farmyard manure</span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Seedling Root Collar Alignment:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCollarLevel('too_shallow')}
                    className={`p-2 rounded-lg border text-center font-semibold cursor-pointer ${
                      collarLevel === 'too_shallow' ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    Too Shallow (Roots exposed)
                  </button>
                  <button
                    onClick={() => setCollarLevel('ground_level')}
                    className={`p-2 rounded-lg border text-center font-semibold cursor-pointer ${
                      collarLevel === 'ground_level' ? 'bg-emerald-100 border-emerald-600 text-emerald-950 font-bold' : 'bg-white border-slate-200'
                    }`}
                  >
                    Ground Level (Correct)
                  </button>
                  <button
                    onClick={() => setCollarLevel('too_deep')}
                    className={`p-2 rounded-lg border text-center font-semibold cursor-pointer ${
                      collarLevel === 'too_deep' ? 'bg-rose-100 border-rose-500 text-rose-900' : 'bg-white border-slate-200'
                    }`}
                  >
                    Too Deep (Stem buried)
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Assessment Simulator */}
            <div className="p-5 rounded-2xl bg-emerald-950 text-white space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400">Simulation Quality Feedback</span>
                <span className="font-mono text-[10px] bg-emerald-900 px-2 py-0.5 rounded">Inspection Mode</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  {holeDepth >= 40 && holeDepth <= 50 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>
                    Hole Volume: {holeDepth >= 40 && holeDepth <= 50 ? 'Optimal (45cm³)' : holeDepth < 40 ? 'Too shallow - risk of root ball curling' : 'Over-excavated'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {manureRatio >= 25 && manureRatio <= 40 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>
                    Soil Nutrient Blend: {manureRatio >= 25 && manureRatio <= 40 ? 'Balanced 2:1 topsoil to organic compost' : 'Sub-optimal mix'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {collarLevel === 'ground_level' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>
                    Collar Depth: {collarLevel === 'ground_level' ? 'Exact ground level alignment (zero rot risk)' : collarLevel === 'too_deep' ? 'Collar buried - stem collar rot likely' : 'Roots exposed to air'}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-emerald-900/80 border border-emerald-800 text-[11px] text-emerald-200">
                <strong>Field Protocol:</strong> Tamp down soil firmly with boot heels to eliminate subterranean air pockets, construct a 10cm perimeter saucer basin to capture rains, and apply dry straw mulch 3 inches away from trunk.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Pruning & Coppicing Simulator (Exercise 3) */}
      {activeExerciseTab === 'pruning' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Exercise 3 · Sustainable Tree Management
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Pruning & Coppicing Technical Simulator (Figures 3 & 4)
            </h2>
            <p className="text-xs text-slate-500">
              Practicing the One-Third canopy rule, locating the branch collar for knot-free sawlogs, and cutting coppicing stumps at a 30° outward slope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pruning Section */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-600" />
                <span>Pruning: The One-Third Crown Rule</span>
              </h4>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Crown Canopy Removal:</span>
                  <span className={`font-mono font-bold ${canopyRemovalPercent > 33 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {canopyRemovalPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={canopyRemovalPercent}
                  onChange={(e) => setCanopyRemovalPercent(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              {canopyRemovalPercent > 33 ? (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-[11px] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Violation: Removing over 33% stunts tree diameter and photosynthetic vitality!</span>
                </div>
              ) : (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Optimal: Tree maintains sufficient green leaf area to feed trunk growth.</span>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1">Cut Location Relative to Trunk:</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setCutPosition('flush_trunk')}
                    className={`p-2 rounded border text-center font-medium ${
                      cutPosition === 'flush_trunk' ? 'bg-rose-100 border-rose-500 text-rose-900' : 'bg-white'
                    }`}
                  >
                    Flush Cut (Damages trunk)
                  </button>
                  <button
                    onClick={() => setCutPosition('collar')}
                    className={`p-2 rounded border text-center font-bold ${
                      cutPosition === 'collar' ? 'bg-emerald-100 border-emerald-600 text-emerald-950' : 'bg-white'
                    }`}
                  >
                    Branch Collar (Correct)
                  </button>
                  <button
                    onClick={() => setCutPosition('stub')}
                    className={`p-2 rounded border text-center font-medium ${
                      cutPosition === 'stub' ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-white'
                    }`}
                  >
                    Long Stub (Rots inward)
                  </button>
                </div>
              </div>
            </div>

            {/* Coppicing Section (Figure 4) */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-600" />
                <span>Coppicing Angle & Stump Regrowth (Figure 4)</span>
              </h4>

              <p className="text-slate-600">
                How to fell suitable species (Eucalyptus, Calliandra) to guarantee healthy multiple shoot generation:
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => setCoppiceAngle('sloping_outward')}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer ${
                    coppiceAngle === 'sloping_outward' ? 'bg-emerald-100 border-emerald-600 font-bold text-emerald-950' : 'bg-white'
                  }`}
                >
                  <span>1. Cut at an angle sloping away from the stem (Correct - Figure 4)</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </button>

                <button
                  onClick={() => setCoppiceAngle('flat')}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between cursor-pointer ${
                    coppiceAngle === 'flat' ? 'bg-rose-100 border-rose-500 text-rose-950' : 'bg-white'
                  }`}
                >
                  <span>2. Cut flat horizontal (Wrong - rainwater pools on stump and rots center)</span>
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                </button>
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900">
                <strong>Shoot Selection:</strong> When new shoots emerge from the stump, wait until month 4-6, then thin out weaker shoots, retaining only the 2 to 3 straightest, dominant stems for pole development.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Biochar & Soil Carbon (Exercise 4) */}
      {activeExerciseTab === 'biochar' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Exercise 4 · Farm Forestry, Climate and Soil Health
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Biochar Pyrolysis & Manure Charging Calculator (Figure 7)
            </h2>
            <p className="text-xs text-slate-500">
              Turn pruning residues into high-grade soil biochar charged with farmyard manure to lock in carbon and soil moisture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Dry Farm Woody Prunings Available (kg):
                </label>
                <input
                  type="number"
                  min="20"
                  max="5000"
                  value={pruningsKg}
                  onChange={(e) => setPruningsKg(Number(e.target.value) || 0)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 font-mono font-bold text-base text-slate-900"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold uppercase text-slate-500 block">The 4:1 Charging Protocol:</span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Never apply raw uncharged biochar directly to crop seedbeds! Inoculate 1 part biochar with 4 parts aged farmyard cattle manure and water/compost tea for 14 days before soil application.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950 text-white space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Pyrolysis Yield & Climate Impact
              </span>

              <div className="grid grid-cols-2 gap-3 pt-2 text-center">
                <div className="p-3 rounded-xl bg-emerald-900 border border-emerald-800">
                  <span className="text-[10px] text-emerald-300 block">Biochar Yield</span>
                  <span className="font-mono text-xl font-bold text-white tabular-nums">{biocharYieldKg} kg</span>
                  <span className="text-[10px] text-emerald-400 block">~28% recovery</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-900 border border-emerald-800">
                  <span className="text-[10px] text-emerald-300 block">Manure Needed</span>
                  <span className="font-mono text-xl font-bold text-amber-300 tabular-nums">{manureNeededKg} kg</span>
                  <span className="text-[10px] text-emerald-400 block">4:1 charging ratio</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-900/70 border border-emerald-800 text-center">
                <span className="text-[10px] text-emerald-300 block">Carbon Permanently Sequestered</span>
                <span className="font-mono text-lg font-bold text-cyan-300 tabular-nums">
                  {co2SequesteredKg} kg CO₂ equivalent
                </span>
                <span className="text-[10px] text-emerald-400 block">Stable in soil for 500+ years</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Enterprise Costing (Exercise 5) */}
      {activeExerciseTab === 'costing' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Exercise 5 · Farm Forestry Business and Value Addition
              </span>
              <h2 className="text-base font-bold text-slate-900">
                Farm Forestry Enterprise Costing & Value Chain Ledger
              </h2>
              <p className="text-xs text-slate-500">
                Calculate total input investments versus projected yields across poles, sawlogs, fuelwood, honey, and nursery stock.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-mono">Net Profit Projection</span>
              <span className={`text-xl font-mono font-bold tabular-nums ${netProfitKES > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                KES {netProfitKES.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Ledger Breakdown: Costs vs Revenue */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Costs Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-slate-700">Production & Maintenance Costs</h4>
                <span className="font-mono font-bold text-slate-900 text-xs">KES {totalCostKES.toLocaleString()}</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 font-semibold text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Item</th>
                      <th className="py-2 px-3 text-right">Qty</th>
                      <th className="py-2 px-3 text-right">Rate (KES)</th>
                      <th className="py-2 px-3 text-right">Total (KES)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {costingItems.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-slate-800">{c.item}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-600">{c.quantity}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-600">{c.unitCostKES}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">{c.totalCostKES.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Revenue Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-slate-700">Projected Market Revenues</h4>
                <span className="font-mono font-bold text-emerald-700 text-xs">KES {totalRevenueKES.toLocaleString()}</span>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 font-semibold text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2 px-3">Product</th>
                      <th className="py-2 px-3">Volume</th>
                      <th className="py-2 px-3 text-right">Unit Price (KES)</th>
                      <th className="py-2 px-3 text-right">Total (KES)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {revenueItems.map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-slate-900">{r.product}</td>
                        <td className="py-2 px-3 text-slate-600 text-[11px]">{r.volume}</td>
                        <td className="py-2 px-3 text-right font-mono text-slate-600">{r.unitPriceKES.toLocaleString()}</td>
                        <td className="py-2 px-3 text-right font-mono font-bold text-emerald-700">{r.totalRevenueKES.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Policy, Permits & Species (Exercise 6) */}
      {activeExerciseTab === 'policy' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Exercise 6 · Environmental Stewardship, Policy and Governance
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Kenya Forest Service Permits & Indigenous Species Conservation
            </h2>
            <p className="text-xs text-slate-500">
              Legal compliance under the Forest Conservation & Management Act, EMCA environmental rules, and indigenous tree heritage of Nyandarua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-700" />
                <span>KFS Timber Movement Permit Checklist</span>
              </h4>

              <div className="space-y-2">
                {[
                  { title: '1. Land Ownership Verification', desc: 'Copy of Title Deed or Chief allotment letter confirming private land tenure.' },
                  { title: '2. Pre-Harvest Tree Inspection', desc: 'Inspection report by local KFS Forester or Sub-County Agricultural Officer.' },
                  { title: '3. Movement Permit Issuance', desc: 'Official transit permit specifying vehicle registration, destination, and log volume.' },
                  { title: '4. Chain-of-Custody Stamp', desc: 'Timber logs hammer-marked by authorized forest officer before loading.' }
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="font-bold text-slate-800 block">{item.title}</span>
                    <span className="text-[11px] text-slate-600">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-700" />
                <span>Protected Indigenous Species of Nyandarua</span>
              </h4>

              <div className="space-y-2">
                {[
                  { name: 'Podocarpus falcatus (Podo)', desc: 'Highland indigenous soft timber; protected water catchment tree.' },
                  { name: 'Prunus africana (Red Stinkwood)', desc: 'Rare medicinal bark tree for prostate health; CITES regulated.' },
                  { name: 'Juniperus procera (African Pencil Cedar)', desc: 'Durable rot-resistant timber; protected against unauthorized felling.' },
                  { name: 'Warburgia ugandensis (Muthiga)', desc: 'Traditional herbal medicine for respiratory ailments.' }
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200">
                    <span className="font-bold text-emerald-950 block">{item.name}</span>
                    <span className="text-[11px] text-slate-600">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: 12-Month Action Plan (Exercise 7 & Page 33 Template) */}
      {activeExerciseTab === 'action_plan' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Exercise 7 · Integrated Farm Forestry Planning (Page 33 Template)
              </span>
              <h2 className="text-base font-bold text-slate-900">
                12-Month Farm Forestry Seasonal Action Plan
              </h2>
              <p className="text-xs text-slate-500">
                The official Capstone blueprint required for CFFB Certificate completion.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg self-start sm:self-auto min-h-[36px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Plan</span>
            </button>
          </div>

          {/* Action Plan Meta Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block">Farmer Name</label>
              <input
                type="text"
                value={actionPlan.farmerName}
                onChange={(e) => updateActionPlan({ farmerName: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded p-1.5 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block">Farm Location</label>
              <input
                type="text"
                value={actionPlan.farmLocation}
                onChange={(e) => updateActionPlan({ farmLocation: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded p-1.5 font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block">Farm Size</label>
              <input
                type="text"
                value={actionPlan.farmSize}
                onChange={(e) => updateActionPlan({ farmSize: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded p-1.5 font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Seasonal Schedule Table (Directly from Page 33) */}
          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead className="bg-emerald-950 text-white font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Month / Season</th>
                  <th className="py-2.5 px-3">Activity</th>
                  <th className="py-2.5 px-3">Materials / Tools Required</th>
                  <th className="py-2.5 px-3">Responsible Person</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {actionPlan.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-emerald-900 whitespace-nowrap">{row.period}</td>
                    <td className="py-2.5 px-3">
                      <input
                        type="text"
                        value={row.activity}
                        onChange={(e) => updateActionPlanRow(idx, { activity: e.target.value })}
                        className="w-full bg-transparent border-0 focus:ring-1 focus:ring-emerald-500 rounded p-1 font-medium text-slate-800"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      <input
                        type="text"
                        value={row.materialsTools}
                        onChange={(e) => updateActionPlanRow(idx, { materialsTools: e.target.value })}
                        className="w-full bg-transparent border-0 focus:ring-1 focus:ring-emerald-500 rounded p-1"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <input
                        type="text"
                        value={row.responsiblePerson}
                        onChange={(e) => updateActionPlanRow(idx, { responsiblePerson: e.target.value })}
                        className="w-full bg-transparent border-0 focus:ring-1 focus:ring-emerald-500 rounded p-1"
                      />
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <select
                        value={row.status}
                        onChange={(e) => updateActionPlanRow(idx, { status: e.target.value as any })}
                        className="text-[11px] font-semibold rounded px-2 py-1 bg-slate-100 border border-slate-200"
                      >
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Goals Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800 text-[11px] block">Tree Production Goal:</span>
              <p className="text-slate-600">{actionPlan.treeProductionGoal}</p>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800 text-[11px] block">Soil & Environmental Goal:</span>
              <p className="text-slate-600">{actionPlan.soilEnvironmentalGoal}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
