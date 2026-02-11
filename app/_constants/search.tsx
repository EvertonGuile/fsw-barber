// crio uma interface com as propriedades que quero
interface QuickSearchOptions {
    imageUrl: string,
    title: string
};

// exporto uma constante que herda a Interface criada acima, onde essa constante recebe um array com varias interfaces(props)
export const quickSearchOptions: QuickSearchOptions[] = [
    {
        imageUrl: "/cabelo.svg",
    title: "Cabelo"
  },
  {
    imageUrl: "/barba.svg",
    title: "Barba"
  },
  {
    imageUrl: "/pezinho.svg",
    title: "Pezinho"
  },
  {
    imageUrl: "/sobrancelha.svg",
    title: "Sobrancelha"
  },
  {
    imageUrl: "/hidratacao.svg",
    title: "Hidratacao"
  },
];