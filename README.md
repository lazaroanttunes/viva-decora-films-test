# 🎬 Cinema App - React Native Challenge

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

## 🚀 Funcionalidades Implementadas

### **Principais (Requisitos do Desafio)**
- 📜 **Lista infinita** de filmes populares da API TMDB
- 🦸‍♂️ **Promoção Marvel** customizada a cada 12 filmes
- 🔍 **Busca integrada** por filmes
- 📊 **Tela de detalhes** completa com todas as informações
- 🎨 **Interface moderna** seguindo princípios do Material Design

### **Extras Implementados (Plus)**
- ✅ **Clean Architecture** com separação clara de responsabilidades
- ✅ **Injeção de Dependências** manual para melhor testabilidade
- ✅ **Estados de UI** completos (Loading, Error, Success, Empty)
- ✅ **Tratamento de erros** com opção de retry
- ✅ **Navegação type-safe** com TypeScript
- ✅ **Design system** consistente com cores temáticas
- ✅ **Tela dedicada Marvel** com lista oficial do MCU
- ✅ **Paginação inteligente** na lista Marvel
- ✅ **Componentes reutilizáveis** e modulares
- ✅ **Performance optimizada** com FlatList e memoização

## 📸 Capturas de Tela

| Lista Principal | Promoção Marvel | Detalhes do Filme | Lista Marvel |
|-----------------|-----------------|-------------------|--------------|
| Lista de filmes com paginação infinita | Banner promocional a cada 12 filmes | Tela completa de detalhes | Coleção completa do MCU |

## 🛠️ Configuração e Instalação

### **Pré-requisitos**
- Node.js 16+
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

### **Passos para executar**

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/cinema-app-challenge.git
cd cinema-app-challenge
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

## 🔧 Estrutura do Projeto

```
cinema-app/
├── src/
│   ├── domain/
│   │   ├── entities/           # Movie, MoviesResponse
│   │   ├── repositories/       # MovieRepository interface
│   │   └── usecases/           # GetMovies, SearchMovies, GetMovieDetails
│   ├── data/
│   │   ├── datasources/        # TMDBDataSource
│   │   └── repositories/       # MovieRepositoryImpl
│   └── presentation/
│       ├── views/              # MovieList, MovieDetails, MarvelMovies
│       ├── viewmodels/         # MovieListViewModel
│       ├── components/         # MovieListItem, SearchBar, MarvelPromotion
│       └── assets/             # Ícones e imagens
├── App.tsx                     # Configuração principal
├── app.json                    # Configuração Expo
└── package.json               # Dependências
```

## ⚙️ Configurações Customizáveis

### **Intervalo de Promoção Marvel**
```typescript
// No MovieListScreen.tsx
const PROMOTION_INTERVAL = 12; // Altere conforme necessário
```

### **Paginação**
```typescript
// 20 itens por página da API TMDB
const response = await getDiscoverMovies(page);
```

### **Lista Oficial Marvel**
```typescript
// IDs oficiais do Universo Cinematográfico Marvel
const OFFICIAL_MARVEL_MOVIE_IDS = [
  1726,   // Iron Man
  24428,  // The Avengers
  299534, // Avengers: Endgame
  // ... +30 filmes oficiais
];
```

## 🎨 Design System

### **Cores Principais**
```typescript
const Colors = {
  primary: '#e63946',     // Vermelho Marvel
  dark: '#1a1a2e',        // Azul escuro
  accent: '#f39c12',      // Laranja/dourado
  background: '#f8f9fa',  // Fundo claro
  surface: '#ffffff',     // Superfícies
}
```

### **Tipografia**
- **Títulos**: System Bold
- **Corpo**: System Regular
- **Detalhes**: System Light

## 🔮 Funcionalidades em Destaque

### **Sistema de Promoção Inteligente**
- Exibe filmes Marvel diferentes a cada promoção
- Carregamento assíncrono para melhor performance
- Fallback para busca caso IDs específicos falhem

### **Gestão de Estado Avançada**
```typescript
// ViewModel com estados completos
type ViewState = 'loading' | 'error' | 'success' | 'idle';
const [viewState, setViewState] = useState<ViewState>('idle');
```

### **Navegação Segura**
```typescript
// Type-safe navigation
export type RootStackParamList = {
  MovieList: { autoSearch?: string };
  MovieDetails: { movieId: number };
  MarvelMovies: undefined;
};
```

## 🚀 Como Foi Desenvolvido

### **Abordagem**
1. **Análise dos requisitos** e definição da arquitetura
2. **Implementação progressiva** dos 3 objetivos principais
3. **Refinamento** com funcionalidades extras
4. **Polimento** da UI/UX e tratamento de erros

### **Decisões Técnicas**
- **Expo** para desenvolvimento rápido e confiável
- **TypeScript** para maior segurança e manutenibilidade
- **Clean Architecture** para código escalável e testável
- **Componentização** para reutilização e manutenção

## 📈 Próximas Melhorias Possíveis

- [ ] Testes unitários e de integração
- [ ] Cache offline com AsyncStorage
- [ ] Animações e microinterações
- [ ] Busca em tempo real
- [ ] Favoritos local
- [ ] Internacionalização (i18n)
- [ ] Modo escuro

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