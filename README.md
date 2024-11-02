# Dynamic Kiosk Display System

A flexible, multi-screen kiosk display system built with Next.js that allows you to manage and display content across multiple screens with animations and live updates.

## Features

- Multiple kiosk displays from a single codebase
- Admin interface for content management
- Animated content transitions
- Responsive design
- Dark mode support
- Background patterns with custom words
- Gradient text animations

## Prerequisites

- Node.js 18+ installed (LTS version recommended)
- npm (comes with Node.js) or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jakerains/InfoKiosk.git
cd InfoKiosk
```

2. Install dependencies:
```bash
npm install --ignore-scripts
```

3. Then manually run the initialization:
```bash
npx tsx scripts/init.ts
```

The installation will automatically:
- Set up all required dependencies
- Create the data directory structure
- Initialize a demo kiosk configuration

Note: Unlike Python projects, Node.js doesn't require a virtual environment. All dependencies are installed locally in the `node_modules` folder of your project.

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Access the different parts of the application:
- Main Demo: [http://localhost:3000](http://localhost:3000)
- Admin Interface: [http://localhost:3000/admin](http://localhost:3000/admin)
- Specific Kiosk: [http://localhost:3000/kiosk/[id]](http://localhost:3000/kiosk/demo-1)

## Usage

### Managing Kiosks

1. Navigate to `/admin`
2. Click "New Kiosk" to create a new kiosk configuration
3. Fill out the form with your desired content:
   - Name and Header information
   - Background words (comma-separated)
   - Main content
   - Sections with bullet points
4. Click "Save Changes" to update the kiosk

## Project Structure

```
├── app/
│   ├── admin/            # Admin interface
│   ├── api/             # API routes
│   └── kiosk/           # Kiosk display pages
├── components/
│   ├── admin/           # Admin components
│   └── ui/              # Shared UI components
├── data/
│   └── kiosks.json      # Kiosk configurations
└── types/
    └── kiosk.ts         # TypeScript definitions
```

## API Routes

- `GET /api/kiosks` - List all kiosks
- `GET /api/kiosks/[id]` - Get specific kiosk
- `PUT /api/kiosks/[id]` - Update kiosk

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[Your chosen license]

## Troubleshooting

### Installation Issues

If you encounter the error `tsx: command not found` during installation:

1. First try installing dependencies without the postinstall script:
```bash
npm install --ignore-scripts
```

2. Then manually run the initialization:
```bash
npx tsx scripts/init.ts
```
