# React Three Fiber SSAO Demo

A React Three Fiber application demonstrating Screen Space Ambient Occlusion (SSAO) effects with TypeScript.

## Features

- **TypeScript**: Full TypeScript implementation with proper type safety
- **React Three Fiber**: Modern React approach to Three.js
- **SSAO Post-processing**: Real-time ambient occlusion effects
- **Interactive Controls**: Adjust lighting and SSAO parameters
- **Modular Architecture**: Well-structured component organization

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Three Postprocessing** - Post-processing effects
- **Vite** - Fast development server and build tool
- **ESLint** - Code linting with TypeScript support

## Project Structure

```
src/
├── components/
│   ├── ComplexScene.tsx    # 3D scene geometry
│   ├── Controls.tsx        # UI controls for parameters
│   ├── Scene.tsx          # Main scene with lighting
│   └── index.ts           # Component exports
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Architecture

The application is built with a modular TypeScript architecture:

- **Type Safety**: All components use proper TypeScript interfaces
- **Component Separation**: Clear separation of concerns between 3D scene, controls, and app logic
- **Error Handling**: Proper null checking and error boundaries
- **Performance**: Optimized rendering with React Three Fiber

## Features

- Real-time SSAO post-processing effects
- Interactive lighting controls
- Complex 3D geometries for testing occlusion
- Responsive UI controls
- TypeScript type safety throughout

## TypeScript Migration

This project has been fully converted from JavaScript to TypeScript with:

- Proper type definitions for all components
- Three.js type safety
- React event handling with types
- Modular component architecture
- Comprehensive error handling
