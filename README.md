# Birthday Invite App

A beautiful Next.js application for birthday party invitations with guest registration, email verification, and check-in functionality.

## Features

- 🎉 **Guest Registration**: Guests can register with email, name, and phone
- 📧 **Email Verification**: Unique check-in codes sent via email
- ✅ **Event Check-in**: Guests can check in using their unique code
- 🎨 **Beautiful UI**: Gold and cream white color scheme with elegant design
- 📱 **Responsive**: Works perfectly on all devices
- 🚀 **Appwrite Integration**: Server-side database for secure guest management

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Appwrite (Node.js SDK)
- **Email**: Nodemailer
- **Styling**: Custom gold and cream color palette

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Appwrite Setup

1. Create a new Appwrite project at [Appwrite Console](https://cloud.appwrite.io/console)
2. Get your Project ID from Settings → General
3. Create an API Key from Settings → API Keys with these scopes:
   - `databases.read`
   - `databases.write`
4. Create a `.env.local` file with your Appwrite credentials:

```bash
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=birthday-invite
NEXT_PUBLIC_APPWRITE_GUESTS_COLLECTION_ID=guests
APPWRITE_API_KEY=your_api_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Database Setup

1. **Create Database**:
   - Go to Databases → Create Database
   - Database ID: `birthday-invite`
   - Name: `Birthday Invite`

2. **Create Collection**:
   - Collection ID: `guests`
   - Name: `Guests`

3. **Add Collection Attributes**:
   - `email` (String, required)
   - `firstName` (String, required)
   - `lastName` (String, required)
   - `phone` (String, required)
   - `uniqueCode` (String, required)
   - `isCheckedIn` (Boolean, required, default: false)

4. **Set Collection Permissions**:
   - Create: `any`
   - Read: `any`
   - Update: `any`
   - Delete: `any`

### 4. Email Configuration

For email functionality, you'll need to set up email credentials in `.env.local`:

- For Gmail: Use an App Password (not your regular password)
- Enable 2-factor authentication and generate an App Password

### 5. Run the Development Server

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

## Appwrite Database Structure

The app uses a `guests` collection in the `birthday-invite` database with the following document structure:

```typescript
{
  $id: string;           // Document ID (auto-generated)
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  uniqueCode: string;
  isCheckedIn: boolean;
  $createdAt: string;    // Auto-generated creation timestamp
  $updatedAt: string;    // Auto-generated update timestamp
}
```

**Note**: Appwrite automatically provides `$createdAt` and `$updatedAt` timestamps, so we use those instead of custom timestamp fields.

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
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint (default: https://cloud.appwrite.io/v1) |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Database ID (default: birthday-invite) |
| `NEXT_PUBLIC_APPWRITE_GUESTS_COLLECTION_ID` | Collection ID (default: guests) |
| `APPWRITE_API_KEY` | Your Appwrite API key for server-side operations |
| `EMAIL_USER` | Email address for sending emails |
| `EMAIL_PASS` | Email password or app password |

## License

MIT License - feel free to use this project for your own birthday celebrations!
