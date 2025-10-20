# 🎬 Viva Decora Filmes - React Native

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.73-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Expo](https://img.shields.io/badge/Expo-50.0-purple?logo=expo)
![Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture-green)
![API](https://img.shields.io/badge/API-TMDB%20API-orange)
![Status](https://img.shields.io/badge/Status-✅%20Concluído-success)

</div>

## 📱 Sobre o Projeto

Este projeto foi desenvolvido como parte do processo seletivo para **Desenvolvedor Mobile**. O aplicativo consome a API do The Movie Database (TMDB) para exibir filmes, implementando todos os requisitos do desafio com React Native, TypeScript e Expo.

## 🎯 Objetivos do Desafio Atendidos

### ✅ **Objetivo 1 - Lista de Filmes com Paginação**
- [x] Integração com API TMDB v3
- [x] Lista com scroll infinito (20 itens por request)
- [x] Layout responsivo e moderno
- [x] Tratamento de estados (loading, error, empty)

### ✅ **Objetivo 2 - Promoção Marvel Customizada**
- [x] **Item promocional a cada 12 filmes** (valor configurável)
- [x] View customizada com filmes em destaque do MCU
- [x] Navegação para lista completa de filmes Marvel
- [x] Carousel horizontal com posters
- [x] Design temático com cores Marvel

### ✅ **Objetivo 3 - Detalhes do Filme**
- [x] Tela completa de detalhes ao clicar em qualquer filme
- [x] Informações: poster, sinopse, avaliação, data de lançamento
- [x] Layout moderno com backdrop image e gradientes
- [x] Navegação fluida entre telas

## 🏗️ Arquitetura e Tecnologias

### **Clean Architecture Implementada**
```
📁 src/
├── 📁 domain/          # Camada de domínio
│   ├── entities/       # Entidades (Movie, MoviesResponse)
│   ├── repositories/   # Contratos de repositórios
│   └── usecases/       # Casos de uso (GetMovies, SearchMovies, GetMovieDetails)
├── 📁 data/            # Camada de dados
│   ├── datasources/    # Fontes de dados (TMDB API)
│   └── repositories/   # Implementações dos repositórios
└── 📁 presentation/    # Camada de apresentação
    ├── views/          # Telas (MovieList, MovieDetails, MarvelMovies)
    ├── viewmodels/     # Lógica de apresentação
    ├── components/     # Componentes reutilizáveis
    └── assets/         # Recursos visuais
```

### **Stack Tecnológica**
- **React Native 0.73** + **Expo 50** - Framework principal
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Expo Linear Gradient** - Efeitos visuais
- **React Native Vector Icons** - Ícones
- **TMDB API** - Fonte de dados de filmes

## 🛠️ Configuração e Instalação

### **Pré-requisitos**
- Node.js 16+
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

### **Passos para executar**

1. **Clone o repositório**
```bash
git clone https://github.com/lazaroanttunes/viva-decora-films-test.git
cd viva-decora-films-test-challenge
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure a API Key do TMDB**
   - Crie um arquivo `.env` na raiz do projeto:
```env
TMDB_API_KEY=TMDB_API_KEY=sua_chave_da_api_tmdb_aqui
```
   - Obtenha uma API Key em: [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

4. **Execute o projeto**
```bash
npm start
# ou
yarn start
```

5. **Escaneie o QR code** com o app Expo Go ou execute em emulador

## 👨‍💻 Desenvolvido por

[Lázaro] - [lazaroanttunes@gmail.com]

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/lazaroanttunes/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?logo=github)](https://github.com/lazaroanttunes)

---

<div align="center">

### ⭐ **Este projeto demonstra habilidades em React Native, TypeScript, Clean Architecture e resolução de desafios técnicos!**

**"Não apenas cumpri os requisitos, mas entreguei uma solução robusta e escalável"**

</div>

## 📄 Notas do Desenvolvedor

Este projeto foi desenvolvido com foco em:
- **Código limpo** e organização
- **Arquitetura escalável** 
- **Experiência do usuário** fluida
- **Boas práticas** do React Native
- **Documentação** completa

---
