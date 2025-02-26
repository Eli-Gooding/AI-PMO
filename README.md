# AI-PMO (Project Management Office)

A modern project management and check-in application built with Next.js and Supabase.

## Features

- **User Authentication**: Secure login using Supabase Auth
- **Project Management**: Create, track, and manage projects
- **Check-ins**: Regular project status updates and check-ins
- **Analytics**: Visualize project progress and team performance
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel (or your preferred hosting)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AI-PMO.git
   cd AI-PMO
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the `frontend` directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=your_site_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
AI-PMO/
├── frontend/           # Next.js frontend
│   ├── app/            # App router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions and hooks
│   └── public/         # Static assets
└── ...
```

## Authentication Flow

The application uses Supabase Authentication with the following flow:
1. Users sign in through the login page
2. After successful authentication, they are redirected to the dashboard
3. Protected routes check for valid sessions before rendering

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/) 