import seda from '../img/caixaseda.png';
import refri from '../img/refrigerante.png';
import bis from '../img/biscoito.png';
import isqueiro from '../img/isqueiro.png';

export const produtos = [
    {
        codigo: "CS001",
        nome: "Caixa de Seda",
        precoVenda: 5.00,
        precoCompra: 3.50,
        quantidade: 50,
        categoria: "Tabacaria",
        img: seda,
    },
    {
        codigo: "ISQ001",
        nome: "Isqueiro",
        precoVenda: 2.00,
        precoCompra: 1.20,
        quantidade: 100,
        categoria: "Tabacaria",
        img: isqueiro,
    },
    {
        codigo: "REF002",
        nome: "Refrigerante 2L",
        precoVenda: 7.00,
        precoCompra: 4.50,
        quantidade: 30,
        categoria: "Bebidas",
        img: refri,
    },
    {
        codigo: "CIG001",
        nome: "Cigarro",
        precoVenda: 8.50,
        precoCompra: 6.00,
        quantidade: 40,
        categoria: "Tabacaria",
        img: null
    },
    {
        codigo: "BIS001",
        nome: "Biscoito",
        precoVenda: 3.00,
        precoCompra: 1.80,
        quantidade: 80,
        categoria: "Alimentos",
        img: bis,
    }
];
