# ElevateCopilot - Microsoft Copilot Training Academy

A comprehensive website for ElevateCopilot, a premium Microsoft Copilot training academy offering global-first training solutions.

## 🚀 Features

- **Professional Website**: Modern, responsive design with premium branding
- **Course Management**: Comprehensive course catalog with detailed information
- **Admin Portal**: Full CRUD operations for managing courses and content
- **Booking System**: Integrated contact form with Web3Forms email integration
- **Global-First Design**: Optimized for international audiences
- **Responsive UI**: Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom brand colors
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Data Storage**: Client-side localStorage for development
- **Email**: Web3Forms integration

## 📁 Project Structure

```
ElevateCopilot/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin portal
│   │   └── courses/       # Course management
│   ├── contact/           # Contact page
│   ├── courses/           # Course listings
│   ├── schedule/          # Training schedule
│   └── ...                # Other pages
├── components/             # Reusable React components
├── lib/                    # Utility libraries
│   ├── database/          # Data persistence layer
│   ├── repositories/      # Data access layer
│   └── data/              # Type definitions
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ElevateCopilot
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Admin Portal

Access the admin portal at `/admin` to manage:
- Course creation, editing, and deletion
- Course status and visibility
- Training schedules
- Content management

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

## 📧 Contact Form

The contact form uses Web3Forms to send inquiries directly to `elevatecopilot@outlook.com`. All form submissions include:
- Contact information
- Inquiry type
- Course/session preferences
- Detailed message

## 🎨 Branding

- **Primary Color**: Custom brand palette
- **Typography**: Playfair Display (headings), Inter (body)
- **Design**: Premium, professional aesthetic
- **Responsive**: Mobile-first design approach

## 📱 Pages

1. **Home** - Landing page with hero section and featured content
2. **Courses** - Comprehensive course catalog
3. **Corporate Training** - Business training solutions
4. **Certification** - Certification programs
5. **Schedule** - Training schedule and booking
6. **About** - Company information and mission
7. **FAQ** - Frequently asked questions
8. **Contact** - Contact form and information

## 🔄 Data Persistence

Currently uses localStorage for development data persistence. All CRUD operations in the admin portal are saved locally and persist across browser sessions.

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure

- **Components**: Reusable UI components in `/components`
- **Pages**: Route-based pages in `/app`
- **Data Layer**: Type-safe data management with TypeScript interfaces
- **Styling**: Utility-first CSS with Tailwind CSS

## 🌐 Deployment

The project is configured for easy deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

This project is proprietary to ElevateCopilot.

## 🤝 Support

For support or questions, contact:
- Email: elevatecopilot@outlook.com
- Website: elevatecopilot.com

---

Built with ❤️ by ElevateCopilot Team
