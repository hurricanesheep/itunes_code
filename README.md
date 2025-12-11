# 🎵 iTunes Song Search App

A modern, responsive single-page application for searching and exploring Taylor Swift's music catalog using the iTunes API. Built with React, TypeScript, and Tailwind CSS.

![iTunes Search App](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)

## ✨ Features

### Core Functionality
- **🔍 Real-time Search**: Search songs by name or album with instant results
- **📊 Smart Sorting**: Sort by song name or album name in ascending order
- **🎨 Modern UI**: Clean, intuitive design with responsive layout
- **🖼️ Album Art**: Display album artwork with fallback handling
- **⚡ Fast Performance**: Optimized with debounced search and efficient rendering

### Advanced Features
- **🎵 Audio Previews**: Click to play 30-second song previews
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🔄 Error Handling**: Graceful fallbacks for API failures
- **💾 CORS Handling**: Multiple proxy strategies for API access
- **🎯 Empty States**: Helpful messages and search tips
- **⏱️ Loading States**: Smooth loading indicators
- **🧪 Unit Tests**: Comprehensive test coverage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd itunes-search-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
```

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # React components
│   ├── SearchInput.tsx  # Search input with real-time filtering
│   ├── SortControls.tsx # Radio buttons for sorting
│   ├── SongCard.tsx     # Individual song display card
│   ├── SongList.tsx     # Song list with empty states
│   └── __tests__/       # Component tests
├── hooks/
│   └── useSongs.ts      # Custom hook for song management
├── services/
│   └── iTunesApi.ts     # iTunes API service with CORS handling
├── types/
│   └── Song.ts          # TypeScript interfaces
├── utils/
│   ├── songUtils.ts     # Utility functions
│   └── __tests__/       # Utility tests
└── App.tsx              # Main application component
```

### Key Technologies

- **⚛️ React 18+**: Modern React with hooks and functional components
- **🔷 TypeScript**: Full type safety and better developer experience
- **🎨 Tailwind CSS**: Utility-first CSS framework for rapid styling
- **⚡ Vite**: Fast build tool and development server
- **🧪 Vitest**: Fast unit testing framework
- **🔍 Testing Library**: React component testing utilities

## 🎯 API Integration

### iTunes Search API
The app integrates with the iTunes Search API to fetch Taylor Swift's music:

```typescript
// API Endpoint
https://itunes.apple.com/search?term=Taylor+Swift&limit=200&media=music
```

### CORS Handling
Due to browser CORS restrictions, the app implements multiple fallback strategies:

1. **Primary**: `cors-anywhere.herokuapp.com` proxy
2. **Fallback**: `api.allorigins.win` proxy  
3. **Development**: Mock data for offline development

### Data Flow
1. **Initial Load**: Fetch 200 Taylor Swift songs from iTunes API
2. **Caching**: Store all songs in React state for fast filtering
3. **Search**: Filter cached results in real-time
4. **Sort**: Apply sorting to filtered results
5. **Display**: Render paginated results with album art

## 🎨 UI/UX Design

### Design Principles
- **Clean & Modern**: Minimalist design with focus on content
- **Responsive**: Mobile-first approach with breakpoint optimization
- **Accessible**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Optimized images, debounced search, efficient rendering

### Color Scheme
- **Primary**: Blue gradient (`from-blue-50 to-indigo-100`)
- **Accent**: Blue (`blue-500`, `blue-600`)
- **Text**: Gray scale (`gray-900`, `gray-600`, `gray-500`)
- **Background**: White with subtle shadows

### Components
- **Search Input**: Icon, placeholder, clear button, results counter
- **Sort Controls**: Radio buttons with visual feedback
- **Song Cards**: Album art, song info, preview button, metadata
- **Empty States**: Helpful messages and search tips

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Utility functions, data transformations
- **Component Tests**: User interactions, rendering, props
- **Integration Tests**: API service, custom hooks

### Testing Strategy
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage
```

### Test Files
- `src/utils/__tests__/songUtils.test.ts` - Utility function tests
- `src/components/__tests__/SearchInput.test.tsx` - Search component tests

## 🔧 Configuration

### Environment Setup
The app works out of the box with no additional configuration required. However, you can customize:

### Tailwind CSS
Modify `tailwind.config.js` to customize the design system:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add custom colors, fonts, etc.
    },
  },
  plugins: [],
}
```

### Vite Configuration
Customize build settings in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  // Add custom configuration
})
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write unit tests for new features
- Use semantic commit messages
- Ensure responsive design
- Maintain accessibility standards

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple iTunes API** for providing the music data
- **Taylor Swift** for the amazing music catalog
- **React Team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite Team** for the fast build tool

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**