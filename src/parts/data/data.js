import seda from '../img/caixaseda.png';
import refri from '../img/refrigerante.png';
import bis from '../img/biscoito.png';
import isqueiro from '../img/isqueiro.png';

export const produtos = [
    {
        id: 1,
        codigo: "CS001",
        nome: "Caixa de Seda",
        precoVenda: 5.00,
        precoCompra: 3.50,
        quantidade: 50,
        categoria: "Tabacaria",
        img: seda,
        dataAdicao: new Date(), 
        vendidoMes: 20, 
        vendidoUltimos15Dias: 10, 
        vendidoUltimaSemana: 5 
    },
    {
        id: 2,
        codigo: "ISQ001",
        nome: "Isqueiro",
        precoVenda: 2.00,
        precoCompra: 1.20,
        quantidade: 100,
        categoria: "Tabacaria",
        img: isqueiro,
        dataAdicao: new Date(),
        vendidoMes: 15,
        vendidoUltimos15Dias: 8,
        vendidoUltimaSemana: 3
    },
    {
        id: 3,
        codigo: "REF002",
        nome: "Refrigerante 2L",
        precoVenda: 7.00,
        precoCompra: 4.50,
        quantidade: 30,
        categoria: "Bebidas",
        img: refri,
        dataAdicao: new Date(),
        vendidoMes: 25,
        vendidoUltimos15Dias: 12,
        vendidoUltimaSemana: 6
    },
    {
        id: 4,
        codigo: "CIG001",
        nome: "Cigarro",
        precoVenda: 8.50,
        precoCompra: 6.00,
        quantidade: 40,
        categoria: "Tabacaria",
        img: null,
        dataAdicao: new Date(),
        vendidoMes: 30,
        vendidoUltimos15Dias: 15,
        vendidoUltimaSemana: 7
    },
    {
        id: 5,
        codigo: "BIS001",
        nome: "Biscoito",
        precoVenda: 3.00,
        precoCompra: 1.80,
        quantidade: 80,
        categoria: "Alimentos",
        img: bis,
        dataAdicao: new Date(),
        vendidoMes: 40,
        vendidoUltimos15Dias: 20,
        vendidoUltimaSemana: 10
    }
];

export const users = {
    user: "Murilo",
    senha: "murilo321",
    admin: true,
    email: "",
    numero: "",
}
