import { AlimentObject } from "./Interfaces/AlimentObject";

class Aliment {
  constructor(
    private _nom:string,
    private _lipide:number,
    private _glucide:number,
    private _proteine:number,
    private _classe:string,
    private _image:string,
  ) {}
  // Getters
  get nom() {return this._nom}
  get lipide() {return this._lipide}
  get glucide() {return this._glucide}
  get proteine() {return this._proteine}
  get classe() {return this._classe}
  get image() {return this._image}
}

// Créer un tableau d'aliments
const aliments:Aliment[] = []

fetch('./src/aliments.json')
.then(res => res.json())
.then(data => {
  data.forEach((aliment:AlimentObject) => {
    aliments.push(
      new Aliment(aliment.nom, aliment.lipides_g, aliment.glucides_g, aliment.proteines_g, aliment.note, aliment.image)
    )})
  // Trier par ordre alphabétique
  aliments.sort((a,b) => a.nom.localeCompare(b.nom))
  // Fonctionnalité de tri
  let tableauAAfficher:Aliment[] = []
  const select = document.querySelector("#class")! as HTMLSelectElement
  select.addEventListener('change', e => {
    const target = e.target as HTMLSelectElement
    switch(target.value) {
      case "Bonne":
        tableauAAfficher = aliments.filter(aliment => aliment.classe === "A" || aliment.classe === "B")
        afficherTableau(tableauAAfficher)
      break
      case "Moyenne":
        tableauAAfficher = aliments.filter(aliment => aliment.classe === "C" || aliment.classe === "D")
        afficherTableau(tableauAAfficher)
      break
      case "Mauvaise":
        tableauAAfficher = aliments.filter(aliment => aliment.classe === "E" || aliment.classe === "F")
      afficherTableau(tableauAAfficher)
      break
      case "Toute":
        afficherTableau(aliments)
    }
  })
  // Afficher le tableau 
  afficherTableau(aliments)
})

function ajouterTd(value:string, tr:HTMLTableRowElement) {
  const td = document.createElement("td")
  td.classList.add("text-center")
  if (value.startsWith('https') || value.startsWith('http')) {
    const img = document.createElement('img')
    img.classList.add("image")
    img.src = value
    td.appendChild(img)
  } else {
    td.textContent = value
  }
  tr.appendChild(td)
}

// Injecter le aliments dans le tableau
function afficherTableau(array:Aliment[]) {
  const table = document.querySelector('table')! as HTMLTableElement
  const oldBody = document.querySelector('tbody')
  if (oldBody) table.removeChild(oldBody)
  const tbody = document.createElement('tbody')! as  HTMLTableSectionElement
  array.forEach(aliment => {
    const tr = document.createElement("tr")
    ajouterTd(aliment.nom,tr)
    ajouterTd(aliment.lipide.toString(),tr)
    ajouterTd(aliment.glucide.toString(),tr)
    ajouterTd(aliment.proteine.toString(),tr)
    ajouterTd(aliment.classe,tr)
    ajouterTd(aliment.image,tr)
    tbody.appendChild(tr)
  })
  table.appendChild(tbody) 
}
