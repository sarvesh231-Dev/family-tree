// src/pages/TreePage.jsx
import { useRef, useState, useEffect, useMemo } from "react";
import Tree from "react-d3-tree";
import flatData from "../data/sail-flat.json"; // <-- change to .js if you use a JS module
import { buildHierarchy } from "../lib/buildHierarchy";

// ---- helpers ----
const NODE = { width: 160, height: 44, rx: 12 };

// simple 2-line wrapping for long names
function wrap2(name, max = 18) {
  if (!name) return ["", ""];
  if (name.length <= max) return [name, ""];
  const parts = name.split(" ");
  let l1 = "", l2 = "";
  for (const p of parts) {
    if ((l1 + " " + p).trim().length <= max) l1 = (l1 + " " + p).trim();
    else l2 = (l2 + " " + p).trim();
  }
  if (!l1) return [name.slice(0, max), name.slice(max)];
  return [l1, l2];
}

export default function TreePage() {
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // build hierarchical data once (root is S1 = Yeaso)
  const treeData = useMemo(() => buildHierarchy(flatData, "S1"), []);

  // center tree horizontally
  useEffect(() => {
    const onResize = () => {
      const r = containerRef.current?.getBoundingClientRect();
      if (r) setTranslate({ x: r.width / 2, y: 80 });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ---- your requested node look ----
  const renderNode = ({ nodeDatum }) => {
    const [line1, line2] = wrap2(nodeDatum.name);
    return (
      <g>
        <rect
          x={-NODE.width / 2}
          y={-NODE.height / 2}
          width={NODE.width}
          height={NODE.height}
          rx={NODE.rx}
          fill="#f5f0e6"           // fill color
          stroke="#1f2937"
          strokeWidth={1}
        />
        <text
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={13}
          fontWeight={600}
          fill="#000000"           // always black text
          fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
        >
          <tspan x="0" dy={line2 ? -2 : 0}>{line1}</tspan>
          {line2 && <tspan x="0" dy="14">{line2}</tspan>}
        </text>
      </g>
    );
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f5f0e6] text-[#1f2937] p-4 md:p-6"
    >
      <div className="max-w-6xl mx-auto mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">Family Tree</h2>
        <p className="mt-1 text-sm md:text-base">
          Drag to pan • Scroll to zoom • Click nodes to expand/collapse
        </p>
      </div>

      <div className="h-[75vh] rounded-xl bg-white shadow border border-[#e5e7eb]">
        <Tree
          data={treeData}
          renderCustomNodeElement={renderNode}
          orientation="vertical"
          nodeSize={{ x: 220, y: 120 }}
          separation={{ siblings: 1.1, nonSiblings: 1.4 }}
          pathFunc="elbow"
          styles={{ links: { stroke: "#9ca3af", strokeWidth: 1.25 } }}
          translate={translate}
          zoomable
          zoom={0.9}
          collapsible
          enableLegacyTransitions
        />
      </div>
    </div>
  );
}
