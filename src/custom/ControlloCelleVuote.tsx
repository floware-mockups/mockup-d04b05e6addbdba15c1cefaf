// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("ControlloCelleVuote");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("ControlloCelleVuote");
import { Card, Badge, useTable, type SectionProps } from "../floware";

export default function ControlloCelleVuote({ pageId }: SectionProps) {__mk();
  const table = useTable(pageId);
  const pagine = ["panoramica", "confronti", "differenze", "assemblaggio"];
  if (!pagine.includes(pageId) || !table) return null;
  const colonne = table.columns;
  const vuota = (valore: string) => (__mk(), String(valore ?? "").trim() === "");
  const totale = table.rows.reduce((somma, riga) => (__mk(), somma + colonne.filter((colonna) => (__mk(), vuota(table.value(riga, colonna)))).length), 0);
  return (
    <Card title="Controllo celle non compilate">
      <div className="space-y-3 text-(--mk-text)">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={totale > 0 ? "danger" : "neutral"}>{totale} celle vuote</Badge>
          <span className="text-sm text-(--mk-muted)">Le celle vuote o contenenti solo spazi sono segnalate con un bordo e la dicitura Non compilato. «—» e «0» sono valori compilati.</span>
        </div>
        <p className="text-sm text-(--mk-muted)">Vista di controllo in sola lettura: modifica i dati nella tabella principale per aggiornare questa vista.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Controllo dei campi vuoti: {table.title}</caption>
            <thead>
              <tr>{colonne.map((colonna) => (__mk(), <th key={colonna} scope="col" className="border border-(--mk-border) bg-(--mk-subtle) p-2 text-left">{colonna}</th>))}</tr>
            </thead>
            <tbody>
              {table.rows.map((riga, indice) => (
                (__mk(), <tr key={indice}>
                  {colonne.map((colonna) => {__mk();
                    const valore = table.value(riga, colonna);
                    const mancante = vuota(valore);
                    return (
                      <td key={colonna} className="border border-(--mk-border) p-2 align-top">
                        {mancante ? <div className="rounded border-2 border-dashed border-(--mk-border) bg-(--mk-subtle) p-2 text-(--mk-danger)"><strong>Non compilato</strong><span className="whitespace-pre-wrap">{valore}</span></div> : <span className="whitespace-pre-wrap">{valore}</span>}
                      </td>
                    );
                  })}
                </tr>)
              ))}
            </tbody>
          </table>
        </div>
        {table.rows.length === 0 && <p>Nessuna riga da controllare.</p>}
      </div>
    </Card>
  );
}
