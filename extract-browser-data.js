const ordinals = [
  "",
  "Primero",
  "Segundo",
  "Tercero",
  "Cuarto",
  "Quinto",
  "Sexto",
  "Séptimo",
  "Octavo",
  "Noveno",
  "Décimo",
  "Décimo Primer",
  "Décimo Segundo",
];

let tables = Array.from(document.querySelectorAll(".table-responsive"));

tables.splice(tables.length - 1, 1);

const cycles = tables.map((table) => {
  const title = table.querySelector(".tile-title span").innerHTML;
  const rows = Array.from(table.querySelectorAll("tr"));
  rows.pop();
  rows.shift();
  const textCycle = title.split(" ");
  textCycle.pop();
  return rows.map((row) => {
    const cells = Array.from(row.querySelectorAll("td"));
    const reqs = cells[6].innerHTML.split("Co-Req. ");
    const preRequired = reqs[0].includes("Aprobar") ? "" : reqs[0];
    const coRequired = reqs[1] || "";
    const match = reqs[0].match(/ \d{1,2}/ ) || ' '
    const specialRequirement = match[0].trim();
    return {
      cycle: ordinals.indexOf(textCycle.join(" ")),
      code: cells[1].innerHTML,
      name: cells[2].innerHTML.trim(),
      credits: cells[3].innerHTML,
      preRequired,
      coRequired,
      specialRequirement,
    };
  });
});

console.log(JSON.stringify(cycles.flat()));
