# Social Media App

A modern, full-featured social media application built with React and Tailwind CSS. This project focuses on a premium user experience with smooth animations, robust theme management, and valid authentication flows.

##  Key Features

###  Authentication

- **Secure Login & Registration**: Fully validated forms using `react-hook-form` and `yup`.
- **User Feedback**: Toast notifications for success/error states ("Login Success", "Invalid Credentials").
- **Password Visibility**: Toggle to show/hide passwords.
- **Protected Routes**: Secure navigation using `GuestRoute` (for public pages) and `ProtectedRoute` (for authenticated content).

###  UI/UX & Theming

- **Robust Theme System**:
  - Supports **Light**, **Dark**, and **System** modes.
  - Persists user preference via `localStorage`.
  - Instant theme switching without page reload.
- **Glassmorphism Navbar**:
  - **Desktop**: Floating "pill" design on scroll with GSAP animations and blur effects.
  - **Mobile**: Sticky header with backdrop blur and responsive bottom navigation.
  - **Scrollbar**: Custom scrollbar that adapts to the selected theme.
- **Premium Design**:
  - Clean, modern aesthetics with `lucide-react` icons.
  - Soft shadows and borders for depth management.
  - Responsive layouts for all screen sizes.

###  Key Functionalities

- **Post Feed**: Infinite scrolling feed with post interactions.
- **Post Details**: detailed view of posts with comments.
- **Create Post**: Interface to upload images and text.
- **Profile**: User profile page with dynamic data.
- **Settings**: Modal to manage application appearance and user preferences.

##  Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: GSAP (GreenSock), Framer Motion
- **State Management**: React Context API
- **Form Handling**: React Hook Form, Yup
- **Data Fetching**: TanStack Query (React Query), Axios
- **Icons**: Lucide React

##  Project Structure

```
src/
├── assets/          # Images and static files
├── components/      # Reusable UI components (Navbar, Loader, etc.)
├── context/         # React Contexts (Auth, Theme)
├── features/        # Feature-based modules (Auth, Posts)
├── hooks/           # Custom hooks (useNavbarAnimation, etc.)
├── layouts/         # Layout wrappers (MainLayout)
├── pages/           # Page components (Home, Login, Profile, etc.)
└── index.css        # Global styles and Tailwind configuration
```

##  Getting Started

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Run Development Server**:

    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

##  Highlights

- **Dynamic Scroll Animations**: The desktop navbar transforms from a full-width header to a floating glass pill on scroll.
- **Polished Mobile Experience**: Native-app feel with safe-area padding and sticky bottom navigation.
- **Smart Color Palette**: Semantic colors that work seamlessly across light and dark modes.

---

