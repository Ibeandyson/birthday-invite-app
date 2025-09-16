# Birthday Invite App

A beautiful Next.js application for birthday party invitations with guest registration, email verification, and check-in functionality.

## Features

- 🎉 **Guest Registration**: Guests can register with email, name, and phone
- 📧 **Email Verification**: Unique check-in codes sent via email
- ✅ **Event Check-in**: Guests can check in using their unique code
- 🎨 **Beautiful UI**: Gold and cream white color scheme with elegant design
- 📱 **Responsive**: Works perfectly on all devices
- 🔥 **Firebase Integration**: Real-time database for guest management

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Firebase Firestore
- **Email**: Nodemailer
- **Styling**: Custom gold and cream color palette

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get your Firebase configuration
4. Copy `env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp env.example .env.local
```

### 3. Email Configuration

For email functionality, you'll need to set up email credentials in `.env.local`:

- For Gmail: Use an App Password (not your regular password)
- Enable 2-factor authentication and generate an App Password

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

### Guest Registration
1. Guests visit the website
2. Fill out the registration form with their details
3. Receive a unique 6-character check-in code via email
4. Save the code for event day

### Event Check-in
1. On the event day, guests enter their unique code
2. System verifies the code and marks them as checked in
3. Prevents duplicate check-ins

## Firebase Database Structure

The app uses a `guests` collection with the following document structure:

```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  uniqueCode: string;
  isCheckedIn: boolean;
  registeredAt: Date;
  checkedInAt?: Date;
}
```

## Customization

### Colors
The app uses a custom gold and cream color palette defined in `tailwind.config.js`. You can modify the colors to match your theme.

### Email Template
The email template can be customized in `src/utils/email.ts`. Update the HTML content to match your event details.

### Event Details
Update the event information in the email template and header component.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js applications.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `EMAIL_USER` | Email address for sending emails |
| `EMAIL_PASS` | Email password or app password |

## License

MIT License - feel free to use this project for your own birthday celebrations!
