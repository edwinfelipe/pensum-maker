import fs from "fs";
import lodash from "lodash";
const { findIndex } = lodash;
const pending = JSON.parse(fs.readFileSync("./pending.json"));

const cycles = [];

const CREDIT_LIMIT = 25;
let counter = 0;
while (counter < pending.length) {
  const cycle = {
    number: cycles.length + 1,
    credits: 0,
    subjects: [],
  };
  for (let pendingSubject of pending) {
    if (pendingSubject.alreadyAdded) continue;
    const preRequired = pendingSubject["preRequired"]
      .split(",")
      .filter((pr) => pr);
    const specialRequirement = pendingSubject["specialRequirement"];
    const coRequired = pendingSubject["coRequired"];
    const coRequiredCredits = coRequired
      ? pending.find((ps) => ps.code.replace("-", "") === coRequired)?.credits *
          1 || 0
      : 0;
    const blockedByPreRequired = !![
      ...pending.filter((ps) => !ps.alreadyAdded),
      ...cycle.subjects,
    ].find((ps) => preRequired.includes(ps.code.replace("-", "")));

    const blockedBySpecialRequirement =
      !!specialRequirement &&
      !![...pending.filter((ps) => !ps.alreadyAdded), ...cycle.subjects].find(
        (ps) => ps.cycle <= specialRequirement * 1
      );

    const blockedByCreditLimit =
      pendingSubject.credits * 1 + cycle.credits + coRequiredCredits >
      CREDIT_LIMIT;
    console.log(
      blockedBySpecialRequirement,
      blockedByPreRequired,
      blockedByCreditLimit,
      pendingSubject.name
    );
    if (
      !blockedByPreRequired &&
      !blockedByCreditLimit &&
      !blockedBySpecialRequirement
    ) {
      // const index = findIndex(pending, (ps) => ps.code === pendingSubject.code);
      console.log("in xd");
      cycle.subjects.push(pendingSubject);
      cycle.credits += pendingSubject.credits * 1;
      pendingSubject.alreadyAdded = true;
      counter++;
      if (coRequired) {
        const index = findIndex(
          pending,
          (ps) => ps.code.replace("-", "") === coRequired
        );
        cycle.subjects.push(pending[index]);
        pending[index].alreadyAdded = true;
        cycle.credits += coRequiredCredits;
        counter++;
      }
    }
  }
  console.log(cycle);
  cycles.push(cycle);

  if (cycle.number >= 20) break;
}
fs.writeFileSync("./pensum.json", JSON.stringify(cycles));
fs.writeFileSync(
  "./pensum.html",
  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      table tr:not(:last-child) td{
        border: 1px solid black;
      }
      table tr:last-child td:nth-child(2){
        text-align: right;
      }
    </style>
  </head>
  <body>
    ${cycles
      .map(
        (cycle) => `<h4>Cuatrimestre ${cycle.number}</h4><table>
    <tbody>
    <tr>
    <th>Codigo</th>
    <th>Nombre</th>
    <th>Creditos</th>
    </tr>
    ${cycle.subjects
      .map(
        (subject) =>
          `<tr></tr><td>${subject.code}</td><td>${subject.name}</td><td>${subject.credits}</td></tr>`
      )
      .join("\n")}
      <tr><td></td><td>Creditos:</td><td>${cycle.credits}</td></tr>
    </tbody>
    </table>`
      )
      .join("\n")}
  </body>
</html>

`
);
