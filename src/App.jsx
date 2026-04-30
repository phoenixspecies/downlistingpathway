import { useState, useMemo } from "react";

const font = "Helvetica, Arial, sans-serif";

const C = {
  blue: "#1495cc",
  green: "#2ba14a",
  teal: "#1e9a9f",
  orange: "#d66f06",
  purple: "#a246b9",
  yellow: "#c9a200",
  bg: "#ffffff",
  card: "#ffffff",
  border: "rgba(30,154,159,0.30)",
  borderSubtle: "rgba(20,149,204,0.18)",
  textPrimary: "#111e27",
  textSecondary: "#3d5a6a",
  textMuted: "#7a96a6",
};

const SPECIES_DATA = [
  { name: "Acmopyle sahniana", category: "CR", criteria: "C1" },
  { name: "Alasmidonta raveneliana", category: "CR", criteria: "A2ac" },
  { name: "Alsophis antiguae", category: "CR", criteria: "B1ab(v)" },
  { name: "Ambystoma taylori", category: "CR", criteria: "B1ab(iii)" },
  {
    name: "Aneides caryaensis",
    category: "CR",
    criteria: "B1ab(iii,v); C2a(ii)",
    genLength: "5–7 years",
  },
  { name: "Anilany helenae", category: "CR", criteria: "B1ab(iii)" },
  {
    name: "Aquiloeurycea quetzalanensis",
    category: "CR",
    criteria: "B1ab(iii)",
  },
  {
    name: "Astrochelys yniphora",
    category: "CR",
    criteria: "A4ad; B2ab(v); C1; E",
  },
  { name: "Ateles hybridus", category: "CR", criteria: "A4cd" },
  { name: "Atelopus coynei", category: "CR", criteria: "C2a(i)" },
  { name: "Atelopus subornatus", category: "CR", criteria: "D" },
  { name: "Axis kuhlii", category: "CR", criteria: "C2a(ii)" },
  { name: "Bos javanicus", category: "CR", criteria: "A2abcd+A4cd" },
  {
    name: "Brachylophus vitiensis",
    category: "CR",
    criteria: "A2abce",
    genLength: "10–15 years",
  },
  { name: "Brachyteles hypoxanthus", category: "CR", criteria: "A2cd" },
  { name: "Bubalus mindorensis", category: "CR", criteria: "C1+C2a(ii)" },
  { name: "Callulina meteora", category: "CR", criteria: "B1ab(iii)" },
  { name: "Canis rufus", category: "CR", criteria: "C2a(i,ii); D" },
  { name: "Caridina dennerli", category: "CR", criteria: "A2e" },
  { name: "Centropus steerii", category: "CR", criteria: "C2a(i)" },
  { name: "Chelonoidis phantasticus", category: "CR", criteria: "D" },
  { name: "Cola kimbozensis", category: "CR", criteria: "B1ab(iii)+B2ab(iii)" },
  { name: "Columbina cyanopis", category: "CR", criteria: "C2a(i,ii)" },
  {
    name: "Conolophus marthae",
    category: "CR",
    criteria: "B1ab(iii,v)+B2ab(iii,v); C2a(ii)",
  },
  {
    name: "Conophytum concavum",
    category: "CR",
    criteria: "A4d; B1ab(v)",
    genLength: "30 years",
  },
  { name: "Corvus hawaiiensis", category: "EW", criteria: "" },
  { name: "Cyclura collei", category: "CR", criteria: "B1ab(iii)+B2ab(iii)" },
  {
    name: "Cyprinodon veronicae",
    category: "EW",
    criteria: "",
    genLength: "1 year",
  },
  {
    name: "Dicerorhinus sumatrensis",
    category: "CR",
    criteria: "A2cd+A3cd+A4cd; C2a(i); D",
  },
  {
    name: "Eleutherodactylus cavernicola",
    category: "CR",
    criteria: "B1ab(iii)",
  },
  { name: "Erymnochelys madagascariensis", category: "CR", criteria: "A4d" },
  { name: "Erythrocebus baumstarki", category: "CR", criteria: "C2a(i)" },
  { name: "Erythrolamprus ornatus", category: "CR", criteria: "D" },
  { name: "Etheostoma chermocki", category: "CR", criteria: "B1ab(iii)" },
  { name: "Gavialis gangeticus", category: "CR", criteria: "A2bce" },
  {
    name: "Geocapromys ingrahami",
    category: "CR",
    criteria: "B1ab(i,ii,iii,v)",
  },
  {
    name: "Geospiza pauper",
    category: "CR",
    criteria: "B1ab(v)",
    genLength: "3.8 years",
  },
  { name: "Glyptemys muhlenbergii", category: "CR", criteria: "A2cd+A4ce" },
  { name: "Gonatodes daudini", category: "CR", criteria: "B1ab(iii)+2ab(iii)" },
  { name: "Indotestudo forstenii", category: "CR", criteria: "A4cd" },
  { name: "Indri indri", category: "CR", criteria: "A3cd+A4cd" },
  {
    name: "Leptodactylodon erythrogaster",
    category: "CR",
    criteria: "B1ab(iii)",
  },
  { name: "Leptodactylus fallax", category: "CR", criteria: "A2ace; C2a(i)" },
  { name: "Leptotila wellsi", category: "CR", criteria: "C2a(ii)" },
  { name: "Lophura edwardsi", category: "CR", criteria: "D" },
  { name: "Magnolia ekmanii", category: "CR", criteria: "A2cd" },
  {
    name: "Magnolia polyhypsophylla",
    category: "CR",
    criteria: "B1ab(iii,v); C2a(i,ii); D",
  },
  { name: "Malacochersus tornieri", category: "CR", criteria: "A4abcd" },
  { name: "Manis javanica", category: "CR", criteria: "A2d+A3d+A4d" },
  {
    name: "Mauremys annamensis",
    category: "CR",
    criteria: "A2bcd+A4bcd; B2ab(i,ii,iii,iv,v); D",
  },
  {
    name: "Melanophryniscus setiba",
    category: "CR",
    criteria: "B1ab(iii)+B2ab(iii)",
  },
  { name: "Micrixalus spelunca", category: "CR", criteria: "B1ab(iii)" },
  { name: "Microcebus berthae", category: "CR", criteria: "A3c+A4c" },
  {
    name: "Moraea barnardii",
    category: "CR",
    criteria: "B1ab(iii,v)+B2ab(iii,v); C2a(ii)",
  },
  { name: "Nannostomus mortenthaleri", category: "CR", criteria: "B1ab(v)" },
  { name: "Nemosia rourei", category: "CR", criteria: "C2a(ii); D" },
  {
    name: "Nothobranchius steinforti",
    category: "CR",
    criteria: "B2ab(iii,iv)",
  },
  {
    name: "Nyctimantis pomba",
    category: "CR",
    criteria: "B1ab(i,iii)+B2ab(i,iii)",
  },
  { name: "Oedipomidas oedipus", category: "CR", criteria: "A3cd" },
  { name: "Oophaga lehmanni", category: "CR", criteria: "A4d" },
  { name: "Parkinsonia peruviana", category: "CR", criteria: "C2a(ii)" },
  { name: "Partula affinis", category: "CR", criteria: "D" },
  {
    name: "Pezoporus occidentalis",
    category: "CR",
    criteria: "C2a(i)",
    genLength: "4.66 years",
  },
  { name: "Phocoena sinus", category: "CR", criteria: "A2a; C1+C2a(ii); D; E" },
  { name: "Phyllodactylus pulcher", category: "CR", criteria: "B2ab(iii,v)" },
  { name: "Piliocolobus preussi", category: "CR", criteria: "A2d" },
  { name: "Pinus torreyana", category: "CR", criteria: "B2ab(ii,iii,v)" },
  { name: "Podocnemis lewyana", category: "CR", criteria: "A2acd+A4acd" },
  {
    name: "Pomarea whitneyi",
    category: "CR",
    criteria: "A2be+A4be; B1ab(ii,v); C2a(i,ii); D",
  },
  { name: "Pongo tapanuliensis", category: "CR", criteria: "A4bcd" },
  { name: "Poropuntius tawarensis", category: "CR", criteria: "B1ab(iii)" },
  { name: "Pristis zijsron", category: "CR", criteria: "A2cd" },
  {
    name: "Propithecus tattersalli",
    category: "CR",
    criteria: "A2acd+A4acd",
    genLength: "9 years",
  },
  { name: "Psammobates geometricus", category: "CR", criteria: "A4ace" },
  {
    name: "Pseudemydura umbrina",
    category: "CR",
    criteria: "A2c; B1ab(iii); C1+C2a(ii); D",
  },
  {
    name: "Pseudoginglymostoma brevicaudatum",
    category: "CR",
    criteria: "A2cd",
  },
  {
    name: "Pseudonestor xanthophrys",
    category: "CR",
    criteria: "B1ab(i,ii,iii,v); C1",
    genLength: "2.81 years",
  },
  { name: "Pterodroma magentae", category: "CR", criteria: "A2ce" },
  {
    name: "Pterodroma phaeopygia",
    category: "CR",
    criteria: "A2bce",
    genLength: "19.8 years",
  },
  { name: "Rafetus swinhoei", category: "CR", criteria: "A2acd; D" },
  { name: "Reithrodontomys spectabilis", category: "CR", criteria: "C2a(i)" },
  {
    name: "Rhina ancylostomus",
    category: "CR",
    criteria: "A2bd",
    genLength: "15 years",
  },
  { name: "Rhinoceros sondaicus", category: "CR", criteria: "D" },
  { name: "Rhynchobatus djiddensis", category: "CR", criteria: "A2bd" },
  { name: "Sacalia quadriocellata", category: "CR", criteria: "A2cd+A4cd" },
  { name: "Siebenrockiella leytensis", category: "CR", criteria: "A4abcd" },
  { name: "Simias concolor", category: "CR", criteria: "A2acd" },
  { name: "Skiffia francesae", category: "EW", criteria: "" },
  { name: "Solomys ponceleti", category: "CR", criteria: "A2cd" },
  { name: "Strigops habroptilus", category: "CR", criteria: "A2be" },
  { name: "Sus cebifrons", category: "CR", criteria: "A2cde" },
  { name: "Telmatobius macrostomus", category: "CR", criteria: "A2abcde" },
  { name: "Todiramphus cinnamominus", category: "EW", criteria: "" },
  { name: "Tor remadevii", category: "CR", criteria: "A2abce" },
  {
    name: "Trachypithecus delacouri",
    category: "CR",
    criteria: "A2cd; C2a(i)",
  },
  {
    name: "Tympanocryptis pinguicolla",
    category: "CR",
    criteria: "B1ab(iii,v)+B2ab(iii,v); D",
  },
  {
    name: "Zaglossus attenboroughi",
    category: "CR",
    criteria: "B1ab(iii,v)+B2ab(iii,v)",
  },
  { name: "Zamia wallisii", category: "CR", criteria: "B1ab(iii,v)" },
  { name: "Zenaida graysoni", category: "EW", criteria: "" },
  { name: "Zyzomys pedunculatus", category: "CR", criteria: "A2abce" },
];

const CATEGORIES = ["EW", "CR"];
const CRITERIA_OPTIONS = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "C1",
  "C2",
  "D1",
  "D2",
  "E",
];
const CATEGORY_COLORS = {
  EW: {
    light: "#a246b9",
    bg: "rgba(162,70,185,0.09)",
    label: "Extinct in the Wild",
  },
  CR: {
    light: "#cc2200",
    bg: "rgba(204,34,0,0.10)",
    label: "Critically Endangered",
  },
  EN: { light: "#d66f06", bg: "rgba(214,111,6,0.09)", label: "Endangered" },
  VU: { light: "#9a7c00", bg: "rgba(201,162,0,0.14)", label: "Vulnerable" },
  NT: {
    light: "#2ba14a",
    bg: "rgba(43,161,74,0.09)",
    label: "Near Threatened",
  },
  LC: { light: "#1e9a9f", bg: "rgba(30,154,159,0.09)", label: "Least Concern" },
  DD: {
    light: "#6a7c84",
    bg: "rgba(106,124,132,0.12)",
    label: "Data Deficient",
  },
};
const RANK = { CR: 5, EN: 4, VU: 3, NT: 2, LC: 1, DD: 0 };

function parseCriteriaString(str) {
  if (!str) return [];
  const found = [];
  const patterns = [
    { code: "A1", regex: /A1/ },
    { code: "A2", regex: /A2/ },
    { code: "A3", regex: /A3/ },
    { code: "A4", regex: /A4/ },
    { code: "B1", regex: /B1/ },
    { code: "B2", regex: /B2/ },
    { code: "C1", regex: /C1/ },
    { code: "C2", regex: /C2/ },
    { code: "D1", regex: /D1/ },
    { code: "D2", regex: /D2/ },
    { code: "D", regex: /\bD\b/ },
    { code: "E", regex: /\bE\b/ },
  ];
  patterns.forEach((p) => {
    if (p.regex.test(str) && !found.includes(p.code)) found.push(p.code);
  });
  return found
    .map((c) => (c === "D" ? "D1" : c))
    .filter((v, i, a) => a.indexOf(v) === i);
}

function evaluateCategory(inputs) {
  const results = [];
  const aThresh = {
    A1: { CR: 90, EN: 70, VU: 50 },
    A2: { CR: 80, EN: 50, VU: 30 },
    A3: { CR: 80, EN: 50, VU: 30 },
    A4: { CR: 80, EN: 50, VU: 30 },
  };
  ["A1", "A2", "A3", "A4"].forEach((sub) => {
    const val = parseFloat(inputs[sub]);
    if (isNaN(val)) return;
    const t = aThresh[sub];
    if (val >= t.CR)
      results.push({
        criterion: sub,
        category: "CR",
        value: `${val}% decline`,
      });
    else if (val >= t.EN)
      results.push({
        criterion: sub,
        category: "EN",
        value: `${val}% decline`,
      });
    else if (val >= t.VU)
      results.push({
        criterion: sub,
        category: "VU",
        value: `${val}% decline`,
      });
  });
  const bThresh = {
    B1: { CR: 100, EN: 5000, VU: 20000 },
    B2: { CR: 10, EN: 500, VU: 2000 },
  };
  ["B1", "B2"].forEach((sub) => {
    const val = parseFloat(inputs[sub]);
    const sc = ["a", "b", "c"].filter((s) => inputs[`${sub}_sub_${s}`]).length;
    if (isNaN(val) || sc < 2) return;
    const t = bThresh[sub];
    if (val < t.CR)
      results.push({ criterion: sub, category: "CR", value: `${val} km²` });
    else if (val < t.EN)
      results.push({ criterion: sub, category: "EN", value: `${val} km²` });
    else if (val < t.VU)
      results.push({ criterion: sub, category: "VU", value: `${val} km²` });
  });
  const cPop = parseFloat(inputs["C_pop"]);
  const c1Met = !!inputs["C1_level"];
  const c2Met = !!(inputs["C2a_i"] || inputs["C2a_ii"] || inputs["C2b"]);
  if (!isNaN(cPop) && (c1Met || c2Met)) {
    if (cPop < 250)
      results.push({
        criterion: "C",
        category: "CR",
        value: `${cPop} individuals`,
      });
    else if (cPop < 2500)
      results.push({
        criterion: "C",
        category: "EN",
        value: `${cPop} individuals`,
      });
    else if (cPop < 10000)
      results.push({
        criterion: "C",
        category: "VU",
        value: `${cPop} individuals`,
      });
  }
  const d1 = parseFloat(inputs["D1"]);
  if (!isNaN(d1)) {
    if (d1 < 50)
      results.push({
        criterion: "D1",
        category: "CR",
        value: `${d1} individuals`,
      });
    else if (d1 < 250)
      results.push({
        criterion: "D1",
        category: "EN",
        value: `${d1} individuals`,
      });
    else if (d1 < 1000)
      results.push({
        criterion: "D1",
        category: "VU",
        value: `${d1} individuals`,
      });
  }
  if (inputs["D2_qualifies"] === "yes")
    results.push({
      criterion: "D2",
      category: "VU",
      value: "AOO <20 km² or ≤5 locations",
    });
  const eLevel = inputs["E_level"];
  if (eLevel === "CR")
    results.push({
      criterion: "E",
      category: "CR",
      value: "≥50% extinction prob. in 10yr/3gen",
    });
  else if (eLevel === "EN")
    results.push({
      criterion: "E",
      category: "EN",
      value: "≥20% extinction prob. in 20yr/5gen",
    });
  else if (eLevel === "VU")
    results.push({
      criterion: "E",
      category: "VU",
      value: "≥10% extinction prob. in 100yr",
    });
  const top = results.reduce(
    (best, r) => (!best || RANK[r.category] > RANK[best] ? r.category : best),
    null
  );
  return { results, finalCategory: top };
}

const steps = [
  { id: "intro", title: "Species Info" },
  { id: "A", title: "Criterion A" },
  { id: "B", title: "Criterion B" },
  { id: "C", title: "Criterion C" },
  { id: "D", title: "Criterion D" },
  { id: "E", title: "Criterion E" },
  { id: "result", title: "Result" },
];

const GenLengthBanner = ({ genLength }) => {
  if (!genLength) return null;
  const threeGens = (() => {
    const rangeMatch = genLength.match(
      /^(\d+(?:\.\d+)?)[\s–-]+(\d+(?:\.\d+)?)/
    );
    if (rangeMatch) {
      const lo = (parseFloat(rangeMatch[1]) * 3).toFixed(1);
      const hi = (parseFloat(rangeMatch[2]) * 3).toFixed(1);
      return `${lo}–${hi} years`;
    }
    const single = genLength.match(/(\d+(?:\.\d+)?)/);
    if (single) {
      const v = parseFloat(single[1]) * 3;
      return `${
        v % 1 === 0 ? v.toFixed(0) : v.toFixed(2).replace(/\.?0+$/, "")
      } years`;
    }
    return "—";
  })();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(30,154,159,0.10)",
        border: "1.5px solid rgba(30,154,159,0.50)",
        borderRadius: 8,
        padding: "10px 16px",
        marginBottom: 20,
        fontFamily: font,
      }}
    >
      <span style={{ fontSize: 18, flexShrink: 0 }}>🕐</span>
      <div>
        <div
          style={{
            fontSize: 11,
            color: "#1e9a9f",
            letterSpacing: 1,
            textTransform: "uppercase",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          Generation Length for this species
        </div>
        <div style={{ fontSize: 14, color: "#111e27", fontWeight: "bold" }}>
          {genLength}
          <span
            style={{
              fontWeight: "normal",
              color: "#3d5a6a",
              fontSize: 13,
              marginLeft: 10,
            }}
          >
            → 3 generations = {threeGens}
          </span>
        </div>
      </div>
    </div>
  );
};

const CurrentCriterionBanner = ({ show }) => {
  if (!show) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(43,161,74,0.12)",
        border: "2px solid #2ba14a",
        borderRadius: 8,
        padding: "8px 16px",
        marginBottom: 14,
        fontFamily: font,
        fontSize: 13,
        color: "#2ba14a",
        fontWeight: "bold",
      }}
    >
      <span style={{ fontSize: 18 }}>⚠️</span>
      <span>
        This is a{" "}
        <span style={{ textDecoration: "underline" }}>
          current listing criterion
        </span>{" "}
        for this species
        <br />
        <span style={{ fontWeight: "normal", fontStyle: "italic" }}>
          (i.e. what must be addressed for a downlisting)
        </span>
      </span>
    </div>
  );
};

const TargetLabel = () => (
  <div
    style={{
      fontSize: 11,
      color: "#d66f06",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 4,
      fontFamily: font,
    }}
  >
    🎯 Target Value
  </div>
);

const TargetLabel2 = () => (
  <div
    style={{
      fontSize: 11,
      color: "#d66f06",
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 4,
      fontFamily: font,
    }}
  >
    🎯 Target
  </div>
);

const InstructionBox = ({ children }) => (
  <div
    style={{
      background: "rgba(20,149,204,0.08)",
      border: "1px solid rgba(20,149,204,0.30)",
      borderRadius: 10,
      padding: "14px 18px",
      marginBottom: 20,
      fontSize: 13,
      color: "#1e9a9f",
      lineHeight: 1.8,
      fontFamily: font,
    }}
  >
    {children}
  </div>
);

const badge = (label, color) => (
  <span
    style={{
      display: "inline-block",
      background: `${color}18`,
      border: `1px solid ${color}60`,
      borderRadius: 6,
      padding: "3px 10px",
      fontSize: 12,
      color,
      marginRight: 6,
      marginTop: 4,
      fontFamily: font,
    }}
  >
    {label}
  </span>
);

const TargetInput = ({ value, onChange, placeholder, unit }) => (
  <div style={{ marginTop: 8 }}>
    <TargetLabel />
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" || /^\d*\.?\d*$/.test(v)) onChange(v);
        }}
        style={{
          padding: "10px 12px",
          borderRadius: 8,
          border: "1.5px solid rgba(214,111,6,0.50)",
          background: "rgba(214,111,6,0.08)",
          color: "#111e27",
          fontSize: 15,
          width: 130,
          fontFamily: font,
          outline: "none",
        }}
      />
      {unit && (
        <span style={{ color: "#3d5a6a", fontSize: 13, fontFamily: font }}>
          {unit}
        </span>
      )}
    </div>
  </div>
);

const TargetYesNo = ({ value, onChange }) => (
  <div style={{ marginTop: 8 }}>
    <TargetLabel2 />
    <div style={{ display: "flex", gap: 8 }}>
      {["Yes", "No"].map((opt) => {
        const optVal = opt === "Yes" ? "yes" : "no";
        return (
          <button
            key={opt}
            onClick={() => onChange(optVal)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              fontFamily: font,
              fontSize: 14,
              cursor: "pointer",
              border:
                value === optVal
                  ? "2px solid #d66f06"
                  : "1.5px solid rgba(30,154,159,0.30)",
              background: value === optVal ? "rgba(214,111,6,0.14)" : "#f7f9fa",
              color: value === optVal ? "#d66f06" : "#3d5a6a",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

export default function App() {
  const [step, setStep] = useState(0);
  const [speciesName, setSpeciesName] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCriteria, setCurrentCriteria] = useState([]);
  const [genLength, setGenLength] = useState(null);
  const [proposed, setProposed] = useState({});
  const [result, setResult] = useState(null);
  const [lookupStatus, setLookupStatus] = useState(null);
  const [lookupMessage, setLookupMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const speciesMap = useMemo(() => {
    const map = {};
    SPECIES_DATA.forEach((s) => {
      map[s.name.toLowerCase()] = s;
    });
    return map;
  }, []);

  const setP = (k, v) => setProposed((p) => ({ ...p, [k]: v }));
  const toggleP = (k) => setProposed((p) => ({ ...p, [k]: !p[k] }));
  const toggleCriterion = (c) =>
    setCurrentCriteria((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );

  const handleNameChange = (val) => {
    setSpeciesName(val);
    setLookupStatus(null);
    if (val.length >= 3) {
      const q = val.toLowerCase();
      setSuggestions(
        SPECIES_DATA.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 6)
      );
    } else {
      setSuggestions([]);
    }
  };

  const applySpecies = (sp) => {
    setSpeciesName(sp.name);
    setSuggestions([]);
    setGenLength(sp.genLength || null);
    const cat = sp.category?.toUpperCase();
    const parsed = parseCriteriaString(sp.criteria || "");
    setCurrentCriteria(parsed);
    if (cat && CATEGORIES.includes(cat)) {
      setCurrentCategory(cat);
      setLookupStatus("success");
      setLookupMessage(
        `Found: ${sp.name} — ${cat}${
          sp.criteria ? ` ${sp.criteria}` : " (no criteria recorded)"
        }${sp.genLength ? ` | Generation length: ${sp.genLength}` : ""}`
      );
    } else {
      setCurrentCategory("");
      setLookupStatus("warning");
      setLookupMessage(
        `${sp.name} is listed as "${cat}" — please set the category manually below.`
      );
    }
  };

  const lookupSpecies = () => {
    if (!speciesName.trim()) {
      setLookupStatus("error");
      setLookupMessage("Please enter a species name first.");
      return;
    }
    const match = speciesMap[speciesName.trim().toLowerCase()];
    if (match) {
      applySpecies(match);
    } else {
      setLookupStatus("error");
      setLookupMessage(
        `"${speciesName}" was not found. Check the spelling or enter the details manually below.`
      );
    }
  };

  const next = () => {
    if (step === steps.length - 2) setResult(evaluateCategory(proposed));
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const restart = () => {
    setStep(0);
    setSpeciesName("");
    setCurrentCategory("");
    setCurrentCriteria([]);
    setGenLength(null);
    setProposed({});
    setResult(null);
    setLookupStatus(null);
    setLookupMessage("");
    setSuggestions([]);
  };

  const progress = Math.round((step / (steps.length - 1)) * 100);
  const catInfo = result?.finalCategory
    ? CATEGORY_COLORS[result.finalCategory]
    : null;
  const origCatInfo = currentCategory ? CATEGORY_COLORS[currentCategory] : null;
  const isCurrentCriterion = (ids) =>
    ids.some((id) => currentCriteria.includes(id));

  const statusColors = {
    success: { bg: "rgba(43,161,74,0.10)", border: "#2ba14a", text: "#2ba14a" },
    warning: { bg: "rgba(214,111,6,0.10)", border: "#d66f06", text: "#d66f06" },
    error: { bg: "rgba(204,34,0,0.08)", border: "#cc2200", text: "#aa1800" },
  };

  const renderStep = () => {
    const s = steps[step].id;

    if (s === "intro")
      return (
        <div>
          <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>
            🌿
          </div>
          <h2
            style={{
              color: "#111e27",
              fontSize: 22,
              marginBottom: 8,
              fontFamily: font,
              textAlign: "center",
            }}
          >
            Red List Downlisting Pathway
          </h2>
          <p
            style={{
              color: "#3d5a6a",
              lineHeight: 1.8,
              marginBottom: 16,
              fontSize: 14,
              fontFamily: font,
              textAlign: "center",
            }}
          >
            Enter your species' current IUCN status below, then step through
            each criterion to explore how your project could change key
            parameters towards downlisting its assessment.
          </p>
          <div
            style={{
              background: "rgba(201,162,0,0.20)",
              border: "1px solid rgba(201,162,0,0.60)",
              borderRadius: 10,
              padding: "12px 12px",
              marginBottom: 22,
              fontSize: 12,
              color: "#7a6000",
              lineHeight: 1.8,
              fontFamily: font,
            }}
          >
            <strong style={{ color: "#6a5000" }}>ℹ️ Please note:</strong> This
            tool is based on a simplified summary of the IUCN Red List Criteria
            and is intended as a planning aid only. For full context and
            definitions, refer to the official IUCN documents:{" "}
            <a
              href="https://www.iucnredlist.org/resources/categories-and-criteria"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1495cc" }}
            >
              Categories &amp; Criteria
            </a>{" "}
            and{" "}
            <a
              href="https://www.iucnredlist.org/resources/redlistguidelines"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1495cc" }}
            >
              Red List Guidelines
            </a>
            .
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#1e9a9f",
                marginBottom: 6,
                fontFamily: font,
              }}
            >
              Species Name
            </label>
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={speciesName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSuggestions([]);
                      lookupSpecies();
                    }
                  }}
                  placeholder="e.g. Dicerorhinus sumatrensis"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: "1.5px solid rgba(30,154,159,0.30)",
                    background: "#f8fbfc",
                    color: "#111e27",
                    fontFamily: font,
                    fontStyle: "italic",
                    fontSize: 15,
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => {
                    setSuggestions([]);
                    lookupSpecies();
                  }}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 8,
                    border: "1.5px solid #2ba14a",
                    background: "rgba(43,161,74,0.14)",
                    color: "#2ba14a",
                    fontFamily: font,
                    fontSize: 13,
                    fontWeight: "bold",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  🔍 Look Up
                </button>
              </div>
              {suggestions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 52,
                    marginTop: 4,
                    background: "#ffffff",
                    border: "1.5px solid rgba(30,154,159,0.30)",
                    borderRadius: 8,
                    zIndex: 100,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  {suggestions.map((sp, i) => (
                    <button
                      key={i}
                      onClick={() => applySpecies(sp)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "10px 16px",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(20,149,204,0.18)",
                        cursor: "pointer",
                        fontFamily: font,
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(43,161,74,0.08)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <span
                          style={{
                            color: "#111e27",
                            fontSize: 14,
                            fontStyle: "italic",
                          }}
                        >
                          {sp.name}
                        </span>
                        {sp.genLength && (
                          <span style={{ color: "#1e9a9f", fontSize: 11 }}>
                            Gen. length: {sp.genLength}
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          color:
                            CATEGORY_COLORS[sp.category?.toUpperCase()]
                              ?.light || "#3d5a6a",
                          fontSize: 12,
                          fontWeight: "bold",
                          marginLeft: 12,
                          flexShrink: 0,
                        }}
                      >
                        {sp.category?.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#7a96a6",
                marginTop: 5,
                fontFamily: font,
              }}
            >
              Start typing to see suggestions, or enter the full scientific name
              and click Look Up.
            </div>
            {lookupStatus && (
              <div
                style={{
                  marginTop: 10,
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontFamily: font,
                  fontSize: 13,
                  lineHeight: 1.6,
                  background: statusColors[lookupStatus].bg,
                  border: `1px solid ${statusColors[lookupStatus].border}55`,
                  color: statusColors[lookupStatus].text,
                }}
              >
                {lookupStatus === "success" ? "✅" : "⚠️"} {lookupMessage}
              </div>
            )}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#1e9a9f",
                marginBottom: 8,
                fontFamily: font,
              }}
            >
              Current IUCN Category
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {CATEGORIES.map((cat) => {
                const cc = CATEGORY_COLORS[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setCurrentCategory(cat)}
                    style={{
                      padding: "10px 28px",
                      borderRadius: 8,
                      fontFamily: font,
                      fontSize: 16,
                      cursor: "pointer",
                      fontWeight: "bold",
                      border:
                        currentCategory === cat
                          ? `2px solid ${cc.light}`
                          : "1.5px solid rgba(30,154,159,0.30)",
                      background: currentCategory === cat ? cc.bg : "#f7f9fa",
                      color: currentCategory === cat ? cc.light : "#3d5a6a",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {currentCategory && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: CATEGORY_COLORS[currentCategory]?.light,
                  fontFamily: font,
                }}
              >
                {CATEGORY_COLORS[currentCategory]?.label}
              </div>
            )}
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#1e9a9f",
                marginBottom: 8,
                fontFamily: font,
              }}
            >
              Current IUCN Criteria
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CRITERIA_OPTIONS.map((cc) => (
                <button
                  key={cc}
                  onClick={() => toggleCriterion(cc)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    fontFamily: font,
                    fontSize: 14,
                    cursor: "pointer",
                    border: currentCriteria.includes(cc)
                      ? "2px solid #2ba14a"
                      : "1.5px solid rgba(30,154,159,0.30)",
                    background: currentCriteria.includes(cc)
                      ? "rgba(43,161,74,0.12)"
                      : "#f7f9fa",
                    color: currentCriteria.includes(cc) ? "#2ba14a" : "#3d5a6a",
                  }}
                >
                  {cc}
                </button>
              ))}
            </div>
            {currentCriteria.length > 0 && (
              <div
                style={{
                  marginTop: 10,
                  padding: "10px 14px",
                  background: "rgba(43,161,74,0.08)",
                  border: "1px solid rgba(43,161,74,0.25)",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#3d5a6a",
                  fontFamily: font,
                }}
              >
                <strong style={{ color: "#1e9a9f" }}>
                  Note: If the published IUCN Category and/or Criteria are out
                  of date, you may adjust the criteria above to reflect the
                  species' correct status.
                </strong>
              </div>
            )}
          </div>
        </div>
      );

    if (s === "A")
      return (
        <div>
          <InstructionBox>
            <strong style={{ color: "#1495cc" }}>
              For species listed under Criterion A, the severe rate of
              population decline must be addressed before downlisting to a lower
              threat category is possible.
            </strong>
            <br />
            <br />
            Enter the target{" "}
            <strong style={{ color: "#1495cc" }}>
              percentage population reduction
            </strong>
            , measured over{" "}
            <strong style={{ color: "#1495cc" }}>
              10 years or 3 generations, whichever is longer
            </strong>
            . Leave blank if not applicable.
          </InstructionBox>
          <GenLengthBanner genLength={genLength} />
          {[
            {
              id: "A1",
              label:
                "A1 — Past decline (causes ceased, understood & reversible)",
              CR: 90,
              EN: 70,
              VU: 50,
            },
            {
              id: "A2",
              label:
                "A2 — Past decline (causes may not have ceased OR may not be understood OR may not be reversible)",
              CR: 80,
              EN: 50,
              VU: 30,
            },
            {
              id: "A3",
              label: "A3 — Projected future decline",
              CR: 80,
              EN: 50,
              VU: 30,
            },
            {
              id: "A4",
              label: "A4 — Past + future combined decline",
              CR: 80,
              EN: 50,
              VU: 30,
            },
          ].map((sub) => (
            <div
              key={sub.id}
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid rgba(20,149,204,0.18)",
              }}
            >
              <CurrentCriterionBanner show={isCurrentCriterion([sub.id])} />
              <div
                style={{
                  color: "#1495cc",
                  fontSize: 14,
                  marginBottom: 6,
                  fontFamily: font,
                }}
              >
                {sub.label}
              </div>
              <div style={{ marginBottom: 4 }}>
                {badge(`CR ≥${sub.CR}%`, "#cc2200")}
                {badge(`EN ≥${sub.EN}%`, "#d66f06")}
                {badge(`VU ≥${sub.VU}%`, "#9a7c00")}
              </div>
              <TargetInput
                value={proposed[sub.id]}
                onChange={(v) => setP(sub.id, v)}
                placeholder="% decline"
                unit="%"
              />
            </div>
          ))}
        </div>
      );

    if (s === "B")
      return (
        <div>
          <InstructionBox>
            <strong style={{ color: "#1495cc" }}>
              For species listed under Criterion B, restricted range and ongoing
              declines must both be addressed before downlisting to a lower
              threat category is possible.
            </strong>
            <br />
            <br />
            Enter the target{" "}
            <a
              href="https://www.ala.org.au/app/uploads/2015/08/Capture-1.jpg"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1495cc" }}
            >
              Extent of Occurrence (EOO)
            </a>{" "}
            and/or{" "}
            <a
              href="https://www.ala.org.au/app/uploads/2015/08/Capture-1.jpg"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1495cc" }}
            >
              Area of Occupancy (AOO)
            </a>{" "}
            then indicate which subcriteria will be met.
          </InstructionBox>
          <div
            style={{
              background: "#f7f9fa",
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 8,
              border: "1px solid rgba(20,149,204,0.18)",
            }}
          >
            <div
              style={{
                color: "#1495cc",
                fontSize: 13,
                marginBottom: 10,
                fontFamily: font,
              }}
            >
              Criterion B requires the range threshold{" "}
              <strong style={{ color: "#1495cc" }}>
                plus at least 2 of 3 subcriteria
              </strong>{" "}
              to be met:
            </div>
            {[
              {
                key: "a",
                text: "Severely fragmented population or very few locations",
              },
              {
                key: "b",
                text: "Continuing decline in range, extent and/or quality of habitat, subpopulations, or mature individuals",
              },
              {
                key: "c",
                text: "Extreme fluctuations in range, subpopulations, or mature individuals",
              },
            ].map((sc) => (
              <div
                key={sc.key}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    background: "rgba(30,154,159,0.14)",
                    border: "1px solid rgba(30,154,159,0.40)",
                    borderRadius: 5,
                    padding: "2px 9px",
                    fontSize: 12,
                    color: "#1e9a9f",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {sc.key}
                </span>
                <span style={{ color: "#3d5a6a", fontSize: 13 }}>
                  {sc.text}
                </span>
              </div>
            ))}
          </div>
          {[
            {
              id: "B1",
              labelText: "Extent of Occurrence (EOO)",
              CR: 100,
              EN: 5000,
              VU: 20000,
            },
            {
              id: "B2",
              labelText: "Area of Occupancy (AOO, 2×2 km grid)",
              CR: 10,
              EN: 500,
              VU: 2000,
            },
          ].map((sub) => (
            <div
              key={sub.id}
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid rgba(20,149,204,0.18)",
              }}
            >
              <CurrentCriterionBanner show={isCurrentCriterion([sub.id])} />
              <div
                style={{
                  color: "#1495cc",
                  fontSize: 14,
                  marginBottom: 6,
                  fontFamily: font,
                }}
              >
                {sub.id} —{" "}
                <a
                  href="https://www.ala.org.au/app/uploads/2015/08/Capture-1.jpg"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1495cc" }}
                >
                  {sub.labelText}
                </a>
              </div>
              <div style={{ marginBottom: 4 }}>
                {badge(`CR <${sub.CR} km²`, "#cc2200")}
                {badge(`EN <${sub.EN.toLocaleString()} km²`, "#d66f06")}
                {badge(`VU <${sub.VU.toLocaleString()} km²`, "#9a7c00")}
              </div>
              <TargetInput
                value={proposed[sub.id]}
                onChange={(v) => setP(sub.id, v)}
                placeholder="e.g. 250"
                unit="km²"
              />
              <div style={{ marginTop: 14 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "#d66f06",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 8,
                    fontFamily: font,
                  }}
                >
                  🎯 Which subcriteria are met at target?
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {[
                    {
                      key: "a",
                      icon: "📍",
                      label: "a — Severely fragmented or very few locations",
                    },
                    {
                      key: "b",
                      icon: "📉",
                      label:
                        "b — Continuing decline in range, habitat quality, or mature individuals",
                    },
                    {
                      key: "c",
                      icon: "🔄",
                      label:
                        "c — Extreme fluctuations in range, locations, or mature individuals",
                    },
                  ].map((sc) => {
                    const storeKey = `${sub.id}_sub_${sc.key}`;
                    const on = !!proposed[storeKey];
                    return (
                      <button
                        key={sc.key}
                        onClick={() => toggleP(storeKey)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 14px",
                          borderRadius: 9,
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: font,
                          border: on
                            ? "2px solid #d66f06"
                            : "1.5px solid rgba(30,154,159,0.30)",
                          background: on ? "rgba(214,111,6,0.08)" : "#f7f9fa",
                        }}
                      >
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 7,
                            background: on ? "rgba(214,111,6,0.18)" : "#eff2f4",
                            border: `2px solid ${
                              on ? "#d66f06" : "rgba(30,154,159,0.30)"
                            }`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            fontSize: 15,
                          }}
                        >
                          {sc.icon}
                        </div>
                        <span
                          style={{
                            fontSize: 13,
                            color: on ? "#d66f06" : "#3d5a6a",
                            flex: 1,
                          }}
                        >
                          {sc.label}
                        </span>
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 5,
                            background: on ? "#d66f06" : "#e8edf0",
                            border: `2px solid ${
                              on ? "#d66f06" : "rgba(30,154,159,0.30)"
                            }`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {on && (
                            <span
                              style={{
                                color: "#fff",
                                fontSize: 13,
                                fontWeight: "bold",
                              }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {(() => {
                  const count = ["a", "b", "c"].filter(
                    (s) => proposed[`${sub.id}_sub_${s}`]
                  ).length;
                  const color =
                    count >= 2
                      ? "#2ba14a"
                      : count === 1
                      ? "#d66f06"
                      : "#7a96a6";
                  return (
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        color,
                        fontFamily: font,
                      }}
                    >
                      {count} of 3 selected
                      {count >= 2
                        ? " ✓ meets subcriteria requirement"
                        : " — need at least 2 for Criterion B to apply"}
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      );

    if (s === "C")
      return (
        <div>
          <InstructionBox>
            <strong style={{ color: "#1495cc" }}>
              For species listed under Criterion C, the small population size
              must be addressed before downlisting to a lower threat category is
              possible.
            </strong>
            <br />
            <br />
            Enter the target population size (number of mature individuals in
            the wild). Then indicate the anticipated rate of continuing decline
            under C1, and select any subcriteria that will be met at target
            under C2. Leave any section blank if it does not apply.
          </InstructionBox>
          <GenLengthBanner genLength={genLength} />
          <div
            style={{
              paddingBottom: 20,
              borderBottom: "1px solid rgba(20,149,204,0.18)",
            }}
          >
            <CurrentCriterionBanner show={isCurrentCriterion(["C1", "C2"])} />
            <div
              style={{
                color: "#1495cc",
                fontSize: 14,
                marginBottom: 4,
                fontFamily: font,
              }}
            >
              Number of mature individuals
            </div>
            <div style={{ marginBottom: 4 }}>
              {badge("CR < 250", "#cc2200")}
              {badge("EN < 2,500", "#d66f06")}
              {badge("VU < 10,000", "#9a7c00")}
            </div>
            <TargetInput
              value={proposed["C_pop"]}
              onChange={(v) => setP("C_pop", v)}
              placeholder="e.g. 1500"
              unit="mature individuals"
            />
          </div>
          <div
            style={{
              marginTop: 20,
              paddingBottom: 20,
              borderBottom: "1px solid rgba(20,149,204,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  color: isCurrentCriterion(["C1"]) ? "#2ba14a" : "#1495cc",
                  fontSize: 15,
                  fontWeight: "bold",
                  fontFamily: font,
                }}
              >
                C1 — Decline Rate
              </div>
              {isCurrentCriterion(["C1"]) && (
                <span
                  style={{
                    fontSize: 11,
                    background: "rgba(43,161,74,0.10)",
                    border: "2px solid #2ba14a",
                    borderRadius: 6,
                    padding: "2px 10px",
                    color: "#2ba14a",
                    fontWeight: "bold",
                    fontFamily: font,
                  }}
                >
                  📍 Current criterion
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#3d5a6a",
                marginBottom: 12,
                fontFamily: font,
              }}
            >
              Select which applies at target — or none if C1 is not met:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                {
                  key: "CR",
                  color: "#cc2200",
                  pct: "≥ 25% decline",
                  period: "over 3 years or 1 generation",
                },
                {
                  key: "EN",
                  color: "#d66f06",
                  pct: "≥ 20% decline",
                  period: "over 5 years or 2 generations",
                },
                {
                  key: "VU",
                  color: "#9a7c00",
                  pct: "≥ 10% decline",
                  period: "over 10 years or 3 generations",
                },
              ].map((row) => {
                const sel = proposed["C1_level"] === row.key;
                return (
                  <button
                    key={row.key}
                    onClick={() => setP("C1_level", sel ? null : row.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      borderRadius: 10,
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: font,
                      border: sel
                        ? `2px solid ${row.color}`
                        : "1.5px solid rgba(30,154,159,0.30)",
                      background: sel ? `${row.color}0e` : "#f7f9fa",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: sel ? `${row.color}18` : "#eff2f4",
                        border: `2px solid ${
                          sel ? row.color : "rgba(30,154,159,0.30)"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          color: row.color,
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {row.key}
                      </span>
                    </div>
                    <div>
                      <div
                        style={{
                          color: sel ? row.color : "#111e27",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {row.pct}
                      </div>
                      <div
                        style={{ color: "#3d5a6a", fontSize: 12, marginTop: 2 }}
                      >
                        {row.period}
                      </div>
                    </div>
                    {sel && (
                      <div
                        style={{
                          marginLeft: "auto",
                          color: row.color,
                          fontSize: 18,
                        }}
                      >
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => setP("C1_level", null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "10px 16px",
                  borderRadius: 10,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: font,
                  border: !proposed["C1_level"]
                    ? "2px solid #1e9a9f"
                    : "1.5px solid rgba(30,154,159,0.30)",
                  background: !proposed["C1_level"]
                    ? "rgba(30,154,159,0.08)"
                    : "#f7f9fa",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: !proposed["C1_level"]
                      ? "rgba(30,154,159,0.14)"
                      : "#eff2f4",
                    border: `2px solid ${
                      !proposed["C1_level"]
                        ? "#1e9a9f"
                        : "rgba(30,154,159,0.30)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#1e9a9f", fontSize: 16 }}>✕</span>
                </div>
                <div
                  style={{
                    color: !proposed["C1_level"] ? "#1e9a9f" : "#3d5a6a",
                    fontSize: 14,
                  }}
                >
                  C1 is not applicable to the species
                </div>
                {!proposed["C1_level"] && (
                  <div
                    style={{
                      marginLeft: "auto",
                      color: "#1e9a9f",
                      fontSize: 18,
                    }}
                  >
                    ✓
                  </div>
                )}
              </button>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  color: isCurrentCriterion(["C2"]) ? "#2ba14a" : "#1495cc",
                  fontSize: 15,
                  fontWeight: "bold",
                  fontFamily: font,
                }}
              >
                C2 — Population Structure
              </div>
              {isCurrentCriterion(["C2"]) && (
                <span
                  style={{
                    fontSize: 11,
                    background: "rgba(43,161,74,0.10)",
                    border: "2px solid #2ba14a",
                    borderRadius: 6,
                    padding: "2px 10px",
                    color: "#2ba14a",
                    fontWeight: "bold",
                    fontFamily: font,
                  }}
                >
                  📍 Current criterion
                </span>
              )}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#3d5a6a",
                marginBottom: 12,
                fontFamily: font,
              }}
            >
              Toggle any subcriteria that apply at target:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                {
                  key: "C2a_i",
                  icon: "🏘️",
                  title: "Subpopulation size — C2a(i)",
                  desc: "No subpopulation contains more than 50 (CR), 250 (EN), or 1,000 (VU) mature individuals",
                },
                {
                  key: "C2a_ii",
                  icon: "⚠️",
                  title: "Concentrated population — C2a(ii)",
                  desc: "90% or more of all mature individuals are in a single subpopulation",
                },
                {
                  key: "C2b",
                  icon: "📈",
                  title: "Extreme fluctuations — C2b",
                  desc: "Number of mature individuals fluctuates extremely",
                },
              ].map((row) => {
                const on = !!proposed[row.key];
                return (
                  <button
                    key={row.key}
                    onClick={() => toggleP(row.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 16px",
                      borderRadius: 10,
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: font,
                      border: on
                        ? "2px solid #d66f06"
                        : "1.5px solid rgba(30,154,159,0.30)",
                      background: on ? "rgba(214,111,6,0.08)" : "#f7f9fa",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: on ? "rgba(214,111,6,0.18)" : "#eff2f4",
                        border: `2px solid ${
                          on ? "#d66f06" : "rgba(30,154,159,0.30)"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 18,
                      }}
                    >
                      {row.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: on ? "#d66f06" : "#1495cc",
                          fontWeight: "bold",
                          fontSize: 13,
                        }}
                      >
                        {row.title}
                      </div>
                      <div
                        style={{
                          color: "#3d5a6a",
                          fontSize: 12,
                          marginTop: 3,
                          lineHeight: 1.5,
                        }}
                      >
                        {row.desc}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: on ? "#d66f06" : "#e8edf0",
                        border: `2px solid ${
                          on ? "#d66f06" : "rgba(30,154,159,0.30)"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {on && (
                        <span
                          style={{
                            color: "#fff",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );

    if (s === "D")
      return (
        <div>
          <InstructionBox>
            <strong style={{ color: "#1495cc" }}>
              For species listed under Criterion D, the extremely small
              population size must be addressed before downlisting to a lower
              threat category is possible. Enter the target population size
              (number of mature individuals in the wild), and indicate whether
              D2 area/location threshold will be met at target.
            </strong>
          </InstructionBox>
          <div
            style={{
              paddingBottom: 20,
              borderBottom: "1px solid rgba(20,149,204,0.18)",
            }}
          >
            <CurrentCriterionBanner show={isCurrentCriterion(["D1"])} />
            <div
              style={{
                color: "#1495cc",
                fontSize: 14,
                marginBottom: 4,
                fontFamily: font,
              }}
            >
              D1 — Number of mature individuals
            </div>
            <div style={{ marginBottom: 4 }}>
              {badge("CR < 50", "#cc2200")}
              {badge("EN < 250", "#d66f06")}
              {badge("VU < 1,000", "#9a7c00")}
            </div>
            <TargetInput
              value={proposed["D1"]}
              onChange={(v) => setP("D1", v)}
              placeholder="e.g. 80"
              unit="mature individuals"
            />
          </div>
          <div
            style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid rgba(20,149,204,0.18)",
            }}
          >
            <CurrentCriterionBanner show={isCurrentCriterion(["D2"])} />
            <div
              style={{
                color: "#1495cc",
                fontSize: 14,
                marginBottom: 4,
                fontFamily: font,
              }}
            >
              D2 — AOO &lt;20 km² or ≤5 locations?{" "}
              <span style={{ color: "#9a7c00", fontSize: 12, marginLeft: 6 }}>
                (VU only)
              </span>
            </div>
            <p
              style={{
                color: "#3d5a6a",
                fontSize: 13,
                margin: "4px 0 8px",
                fontFamily: font,
              }}
            >
              Applies only if the species has no current major threats but is
              susceptible to rapid future threats that could drive the taxon to
              CR or EX in a very short time.
            </p>
            <TargetYesNo
              value={proposed["D2_qualifies"]}
              onChange={(v) => setP("D2_qualifies", v)}
            />
          </div>
        </div>
      );

    if (s === "E")
      return (
        <div>
          <InstructionBox>
            <strong style={{ color: "#1495cc" }}>Note on Criterion E:</strong>{" "}
            This criterion is based on a quantitative analysis such as a
            Population Viability Analysis (PVA). If your species is currently
            listed under Criterion E, please refer to the{" "}
            <a
              href="https://www.iucnredlist.org/resources/redlistguidelines"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#1495cc" }}
            >
              IUCN Red List Guidelines
            </a>{" "}
            for detailed guidance on how to apply and interpret quantitative
            extinction probability assessments before selecting a target value
            below.
          </InstructionBox>
          <p
            style={{
              color: "#3d5a6a",
              fontSize: 13,
              lineHeight: 1.8,
              marginBottom: 16,
              fontFamily: font,
            }}
          >
            Select whichever threshold applies at target — or none if Criterion
            E is not met.
          </p>
          <CurrentCriterionBanner show={isCurrentCriterion(["E"])} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              {
                key: "CR",
                color: "#cc2200",
                prob: "≥ 50% probability of extinction",
                period: "within 10 years or 3 generations",
              },
              {
                key: "EN",
                color: "#d66f06",
                prob: "≥ 20% probability of extinction",
                period: "within 20 years or 5 generations",
              },
              {
                key: "VU",
                color: "#9a7c00",
                prob: "≥ 10% probability of extinction",
                period: "within 100 years",
              },
            ].map((row) => {
              const sel = proposed["E_level"] === row.key;
              return (
                <button
                  key={row.key}
                  onClick={() => setP("E_level", sel ? null : row.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 16px",
                    borderRadius: 10,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: font,
                    border: sel
                      ? `2px solid ${row.color}`
                      : "1.5px solid rgba(30,154,159,0.30)",
                    background: sel ? `${row.color}0e` : "#f7f9fa",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: sel ? `${row.color}18` : "#eff2f4",
                      border: `2px solid ${
                        sel ? row.color : "rgba(30,154,159,0.30)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        color: row.color,
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      {row.key}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        color: sel ? row.color : "#111e27",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      {row.prob}
                    </div>
                    <div
                      style={{ color: "#3d5a6a", fontSize: 12, marginTop: 2 }}
                    >
                      {row.period}
                    </div>
                  </div>
                  {sel && (
                    <div
                      style={{
                        marginLeft: "auto",
                        color: row.color,
                        fontSize: 18,
                      }}
                    >
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
            <button
              onClick={() => setP("E_level", null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "10px 16px",
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: font,
                border: !proposed["E_level"]
                  ? "2px solid #1e9a9f"
                  : "1.5px solid rgba(30,154,159,0.30)",
                background: !proposed["E_level"]
                  ? "rgba(30,154,159,0.08)"
                  : "#f7f9fa",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: !proposed["E_level"]
                    ? "rgba(30,154,159,0.14)"
                    : "#eff2f4",
                  border: `2px solid ${
                    !proposed["E_level"] ? "#1e9a9f" : "rgba(30,154,159,0.30)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#1e9a9f", fontSize: 16 }}>✕</span>
              </div>
              <div
                style={{
                  color: !proposed["E_level"] ? "#1e9a9f" : "#3d5a6a",
                  fontSize: 14,
                }}
              >
                Criterion E not met / no quantitative analysis conducted
              </div>
              {!proposed["E_level"] && (
                <div
                  style={{ marginLeft: "auto", color: "#1e9a9f", fontSize: 18 }}
                >
                  ✓
                </div>
              )}
            </button>
          </div>
        </div>
      );

    if (s === "result") {
      const proposedCat = result?.finalCategory;
      const origRank = RANK[currentCategory] || 0;
      const newRank = RANK[proposedCat] || 0;
      const improved = newRank < origRank;
      const same = newRank === origRank;
      const noCategory = !proposedCat;

      return (
        <div>
          {speciesName && (
            <div
              style={{
                fontStyle: "italic",
                fontSize: 18,
                color: "#111e27",
                marginBottom: 16,
                fontFamily: font,
                textAlign: "center",
              }}
            >
              {speciesName}
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: 12,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                textAlign: "center",
                background: origCatInfo ? origCatInfo.bg : "#f7f9fa",
                border: `1.5px solid ${
                  origCatInfo?.light || "rgba(30,154,159,0.30)"
                }44`,
                borderRadius: 12,
                padding: "20px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#7a96a6",
                  marginBottom: 8,
                  fontFamily: font,
                }}
              >
                Current
              </div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: "bold",
                  color: origCatInfo?.light || "#3d5a6a",
                  fontFamily: font,
                  letterSpacing: 3,
                }}
              >
                {currentCategory || "—"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: origCatInfo?.light || "#3d5a6a",
                  marginTop: 4,
                  fontFamily: font,
                }}
              >
                {origCatInfo?.label || ""}
              </div>
              {currentCriteria.length > 0 && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#7a96a6",
                    marginTop: 8,
                    fontFamily: font,
                  }}
                >
                  {currentCriteria.join(" | ")}
                </div>
              )}
            </div>
            <div style={{ textAlign: "center", fontSize: 28 }}>
              {improved ? "⬇️" : noCategory ? "✅" : same ? "➡️" : "⚠️"}
            </div>
            <div
              style={{
                textAlign: "center",
                background: catInfo ? catInfo.bg : "rgba(43,161,74,0.08)",
                border: `2px solid ${catInfo?.light || "#2ba14a"}`,
                borderRadius: 12,
                padding: "20px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#d66f06",
                  marginBottom: 8,
                  fontFamily: font,
                }}
              >
                Target
              </div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: "bold",
                  color: catInfo?.light || "#2ba14a",
                  fontFamily: font,
                  letterSpacing: 3,
                }}
              >
                {proposedCat || "NT/LC"}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: catInfo?.light || "#2ba14a",
                  marginTop: 4,
                  fontFamily: font,
                }}
              >
                {catInfo?.label ||
                  (noCategory ? "No threatened category triggered" : "")}
              </div>
              {result?.results.length > 0 && (
                <div
                  style={{
                    fontSize: 12,
                    color: "#7a96a6",
                    marginTop: 8,
                    fontFamily: font,
                  }}
                >
                  {result.results.map((r) => r.criterion).join(" | ")}
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              padding: "14px 18px",
              borderRadius: 10,
              marginBottom: 20,
              fontFamily: font,
              fontSize: 14,
              lineHeight: 1.7,
              background:
                improved || noCategory
                  ? "rgba(43,161,74,0.08)"
                  : same
                  ? "rgba(214,111,6,0.08)"
                  : "rgba(204,34,0,0.07)",
              border: `1px solid ${
                improved || noCategory
                  ? "#2ba14a"
                  : same
                  ? "#d66f06"
                  : "#cc2200"
              }40`,
              color:
                improved || noCategory
                  ? "#2ba14a"
                  : same
                  ? "#d66f06"
                  : "#aa1800",
            }}
          >
            {improved
              ? `✅ Based on the target values, ${
                  speciesName || "this species"
                } could be downlisted from ${currentCategory} to ${proposedCat}.`
              : noCategory
              ? `✅ Based on the target values, ${
                  speciesName || "this species"
                } does not meet any threatened category — see guidance below.`
              : same && proposedCat
              ? `➡️ The target values still result in ${proposedCat}. Further improvements may be needed to achieve downlisting.`
              : `⚠️ The target values result in ${proposedCat}. Review the entered values.`}
          </div>
          {result?.results.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#7a96a6",
                  marginBottom: 10,
                  fontFamily: font,
                }}
              >
                Category triggered per criterion
              </div>
              <div
                style={{
                  background: "#f7f9fa",
                  border: "1px solid rgba(20,149,204,0.18)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  fontSize: 13,
                  color: "#3d5a6a",
                  lineHeight: 2,
                  fontFamily: font,
                  marginBottom: 12,
                }}
              >
                Based on the data you entered, by the end of your project, your
                species should meet the following criteria:{" "}
                <strong style={{ color: "#111e27" }}>
                  {result.results
                    .map((r) => `${r.category} ${r.criterion}`)
                    .join(", ")}
                </strong>
                . The final listing is determined by the criterion triggering
                the{" "}
                <strong style={{ color: "#1495cc" }}>
                  highest category of threat
                </strong>
                .
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {result.results.map((r, i) => {
                  const cc = CATEGORY_COLORS[r.category];
                  const isHighest = r.category === proposedCat;
                  return (
                    <div
                      key={i}
                      style={{
                        background: cc.bg,
                        border: `${isHighest ? "2.5px" : "1px"} solid ${
                          cc.light
                        }${isHighest ? "" : "77"}`,
                        borderRadius: 8,
                        padding: "10px 16px",
                        position: "relative",
                      }}
                    >
                      {isHighest && (
                        <div
                          style={{
                            position: "absolute",
                            top: -9,
                            right: 8,
                            background: cc.light,
                            color: "#fff",
                            fontSize: 9,
                            fontWeight: "bold",
                            padding: "2px 7px",
                            borderRadius: 4,
                            fontFamily: font,
                            letterSpacing: 1,
                          }}
                        >
                          HIGHEST
                        </div>
                      )}
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: cc.light,
                          fontFamily: font,
                        }}
                      >
                        {r.criterion}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#3d5a6a",
                          marginTop: 2,
                          fontFamily: font,
                        }}
                      >
                        {r.value}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: cc.light,
                          marginTop: 4,
                          letterSpacing: 1,
                          fontFamily: font,
                        }}
                      >
                        {r.category} — {cc.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {noCategory && (
            <div
              style={{
                background: "rgba(43,161,74,0.06)",
                border: "1px solid rgba(43,161,74,0.20)",
                borderRadius: 10,
                padding: "16px 18px",
                marginBottom: 20,
                fontSize: 13,
                color: "#3d5a6a",
                lineHeight: 1.9,
                fontFamily: font,
              }}
            >
              <strong style={{ color: "#1495cc", fontSize: 14 }}>
                What does this result mean?
              </strong>
              <br />
              <br />
              If the tool has not returned a threatened category, first check
              that you have not missed any required parameters under the
              relevant criteria.
              <br />
              <br />
              If the parameters are correct and you still get no result, it may
              be that the anticipated outcome of your recovery project is a
              species that no longer meets any conditions of the threatened
              categories.{" "}
              <strong style={{ color: "#2ba14a" }}>
                This is not necessarily an error.
              </strong>
              <br />
              <br />
              It could mean the species will be{" "}
              <strong style={{ color: "#2ba14a" }}>
                Least Concern
              </strong> or{" "}
              <strong style={{ color: "#2ba14a" }}>Near Threatened</strong>. A
              Near Threatened species is defined as being close to qualifying
              for a threatened category — this tool is not designed to identify
              this result. Please refer to the{" "}
              <a
                href="https://www.iucnredlist.org/resources/redlistguidelines"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#1495cc" }}
              >
                Near Threatened chapter in the IUCN Red List Guidelines
              </a>
              . Alternatively, please reach out to the Re:wild project manager
              to discuss this result further.
            </div>
          )}
          <p
            style={{
              color: "#7a96a6",
              fontSize: 12,
              marginTop: 8,
              fontStyle: "italic",
              lineHeight: 1.7,
              fontFamily: font,
            }}
          >
            The target category reflects the highest threat level triggered by
            the target values across all five criteria. Movement from CR to any
            lower category indicates a reduction in immediate extinction risk,
            not full recovery.
          </p>
          <button
            onClick={restart}
            style={{
              marginTop: 16,
              padding: "12px 28px",
              borderRadius: 8,
              border: "1.5px solid rgba(30,154,159,0.30)",
              background: "transparent",
              color: "#3d5a6a",
              fontFamily: font,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            ↺ Start New Assessment
          </button>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        fontFamily: font,
        background: "#ffffff",
        minHeight: "100vh",
        color: "#111e27",
      }}
    >
      <div
        style={{
          background: "linear-gradient(90deg,#f0f7fb,#f7fbfd,#f0f7fb)",
          borderBottom: "1px solid rgba(20,149,204,0.18)",
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 28 }}>🔴</span>
        <div
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#111e27",
            fontFamily: font,
          }}
        >
          IUCN Red List Downlisting Pathway
        </div>
      </div>
      <div
        style={{
          background: "#f4f7fa",
          padding: "10px 28px",
          borderBottom: "1px solid rgba(20,149,204,0.18)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          {steps.map((ss, i) => (
            <div
              key={ss.id}
              style={{
                fontSize: 15,
                color:
                  i === step ? "#1495cc" : i < step ? "#2ba14a" : "#7a96a6",
                textTransform: "uppercase",
                letterSpacing: 1,
                textAlign: "center",
                flex: 1,
                fontFamily: font,
              }}
            >
              {i < step ? "✓" : i === step ? "●" : "○"}
            </div>
          ))}
        </div>
        <div
          style={{ background: "rgba(0,0,0,0.08)", borderRadius: 4, height: 3 }}
        >
          <div
            style={{
              background: "linear-gradient(90deg,#1e9a9f,#1495cc)",
              borderRadius: 4,
              height: 3,
              width: `${progress}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          {steps.map((ss, i) => (
            <div
              key={ss.id}
              style={{
                fontSize: 11,
                color: i === step ? "#1e9a9f" : "#7a96a6",
                textAlign: "center",
                flex: 1,
                overflow: "hidden",
                fontFamily: font,
              }}
            >
              {ss.title}
            </div>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <div
          style={{
            background: "#ffffff",
            border: "1.5px solid rgba(30,154,159,0.30)",
            borderRadius: 12,
            padding: "28px 28px 24px",
            boxShadow: "0 2px 16px rgba(20,149,204,0.07)",
          }}
        >
          <h2
            style={{
              color: "#111e27",
              fontSize: 20,
              margin: "0 0 20px",
              paddingBottom: 14,
              borderBottom: "1px solid rgba(20,149,204,0.18)",
              fontFamily: font,
            }}
          >
            {steps[step].title}
          </h2>
          {renderStep()}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {step > 0 && step < steps.length - 1 ? (
            <button
              onClick={back}
              style={{
                padding: "12px 24px",
                borderRadius: 8,
                border: "1.5px solid rgba(30,154,159,0.30)",
                background: "transparent",
                color: "#3d5a6a",
                fontFamily: font,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          {step < steps.length - 1 && (
            <button
              onClick={next}
              style={{
                padding: "12px 28px",
                borderRadius: 8,
                border: "1.5px solid #1495cc",
                background: "linear-gradient(135deg,#1e9a9f,#1495cc)",
                color: "#ffffff",
                fontFamily: font,
                fontSize: 15,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(20,149,204,0.28)",
              }}
            >
              {step === steps.length - 2
                ? "🔍 Calculate Target Category"
                : "Next →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
