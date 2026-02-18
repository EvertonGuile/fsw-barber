// crio uma interface com as propriedades que quero
interface QuickSearchOptions {
    imageUrl: string,
    title: string,

    // nova forma mais escalavel e segura
    iconWidth: number,
    iconHeight: number,
    iconMargin: string
};

// exporto uma constante que herda a Interface criada acima, onde essa constante recebe um array com varias interfaces(props)
export const quickSearchOptions: QuickSearchOptions[] = [
  {
    imageUrl: "/cabelo.svg",
    title: "Cabelo",
    iconWidth: 15,
    iconHeight: 16,
    iconMargin: ""
  },
  {
    imageUrl: "/barba.svg",
    title: "Barba",
    iconWidth: 15,
    iconHeight: 16,
    iconMargin: ""
  },
  {
    imageUrl: "/pezinho.svg",
    title: "Pezinho",
    iconWidth: 15,
    iconHeight: 16,
    iconMargin: ""
  },
  {
    imageUrl: "/sobrancelha.svg",
    title: "Sobrancelha",
    iconWidth: 15,
    iconHeight: 16,
    iconMargin: ""
  },
  {
    imageUrl: "/hidratacao.svg",
    title: "Hidratacao",
    iconWidth: 9,
    iconHeight: 2,
    iconMargin: "mx-0.5"
  },
];