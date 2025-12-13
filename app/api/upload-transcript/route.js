import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const REQUIRED_ENV_VARS = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REFRESH_TOKEN',
];

function assertEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing required Google OAuth env vars: ${missing.join(', ')}`);
  }
}

async function getDriveClient() {
  assertEnv();

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );

  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

  const accessTokenResponse = await oauth2Client.getAccessToken();
  const accessToken = typeof accessTokenResponse === 'string'
    ? accessTokenResponse
    : accessTokenResponse?.token;

  if (!accessToken) {
    throw new Error('Unable to retrieve Google Drive access token');
  }

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    access_token: accessToken,
  });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

export async function POST(req) {
  try {
    const { transcriptText, transcriptName } = await req.json();
    if (!transcriptText || !transcriptName) {
      return NextResponse.json({ message: 'transcriptText and transcriptName are required' }, { status: 400 });
    }

    const drive = await getDriveClient();

    const driveResponse = await drive.files.create({
      requestBody: {
        name: `${transcriptName}.txt`,
        mimeType: 'text/plain',
        parents: ['1MFpF0ChW8g4EOzlxhh-e2yNp1Kr9Hy-c']
      },
      media: {
        mimeType: 'text/plain',
        body: transcriptText,
      },
      supportsAllDrives: true,
    });

    return NextResponse.json({
      message: 'File created successfully',
      fileId: driveResponse.data.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
