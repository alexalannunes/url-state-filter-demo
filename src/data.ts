export interface Option {
  label: string;
  value: string;
}

export interface Category {
  label: string;
  key: string;
  options: Option[];
  type: "radio" | "checkbox";
}

export const categories: Category[] = [
  {
    label: "Preço",
    key: "preco",
    options: [
      { label: "10 a 15", value: "10-15" },
      { label: "15 a 30", value: "15-30" },
      { label: "30 a 50", value: "30-50" },
    ],
    type: "radio",
  },
  {
    label: "Variedade",
    key: "variedade",
    options: [
      { label: "Integral", value: "integral" },
      { label: "Branco", value: "branco" },
      { label: "Parboilizado", value: "parboilizado" },
    ],
    type: "checkbox",
  },
  {
    label: "Origem",
    key: "origem",
    options: [
      { label: "Nacional", value: "nacional" },
      { label: "Importado", value: "importado" },
    ],
    type: "checkbox",
  },
];
