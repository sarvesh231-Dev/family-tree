// Convert flat [{id, name, gender, children, parents}] into
// react-d3-tree's hierarchical {name, attributes, children[]} shape.
export function buildHierarchy(people, rootId = null) {
  const byId = Object.fromEntries(people.map(p => [p.id, { ...p }]));
  // normalize arrays
  for (const p of Object.values(byId)) {
    p.children = Array.isArray(p.children) ? p.children : [];
    p.parents  = Array.isArray(p.parents)  ? p.parents  : [];
  }

  // find roots: either explicit rootId or all with no known parents
  const roots = rootId
    ? [byId[rootId]].filter(Boolean)
    : Object.values(byId).filter(p => !p.parents.length || p.parents.every(pid => !byId[pid]));

  function toNode(person) {
    return {
      name: person.name,
      attributes: { id: person.id, gender: person.gender || "U" },
      children: person.children
        .map(cid => byId[cid])
        .filter(Boolean)
        .map(toNode),
    };
  }

  if (roots.length === 1) return toNode(roots[0]);
  // multiple roots → wrap in a virtual root so the lib can render
  return { name: "Family", attributes: { gender: "U" }, children: roots.map(toNode) };
}
