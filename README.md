# 💰 Controle Financeiro App

API para um app de controle financeiro pessoal que usa a **Regra 50-30-20** com modos de economia, integração bancária via Open Banking e acompanhamento de metas.

---

## 🎯 Por que criei isso

Decidi criar esse sistema para eu mesmo ter controle dos meus próprios gastos e, ao mesmo tempo, aprender na prática. Esse projeto é meu campo de experimentação — cada feature nova é uma oportunidade de me desenvolver como dev.

Estou aberto a opiniões, ideias e até trocar uma ideia sobre arquitetura, padrões e boas práticas. Se quiser contribuir ou só bater um papo técnico, manda ver!

## ✅ O que já foi feito

- **Setup do projeto** com NestJS + TypeScript
- **Banco de dados** PostgreSQL configurado com TypeORM
- **Cadastro de usuário** com validação e persistência
- **Estrutura de autenticação** pronta para login

## 🔜 Próxima entrega

**Meta: Aprender relacionamentos no TypeORM (ManyToOne / OneToMany)**

- Entender e implementar `@ManyToOne` e `@OneToMany` na prática
- Relacionar User ↔ Gastos (um usuário, muitos gastos)
- Relacionar Categoria ↔ Gastos (uma categoria, muitos gastos)
- Configurar `onDelete: 'CASCADE'` e eager/lazy loading
- Hash de senha com bcrypt
- Módulo de gastos → `POST /expenses` com FK para usuário

## 🗺️ O que vem por aí

- Regra 50-30-20 com 3 modos de economia
- Integração com Pluggy (Open Banking)
- Alertas de cartão de crédito
- Lembretes de pagamento com Pix
- Metas e caixinha de investimentos

## 🚀 Rodando o projeto

```bash
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000`.

## 📡 Endpoint atual

```
POST /auth/register
{
  "email": "joao@email.com",
  "name": "João Silva",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

## 🛠️ Stack

NestJS · TypeScript · PostgreSQL · TypeORM · class-validator
