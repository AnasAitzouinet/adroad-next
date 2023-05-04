import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: new Date(0), // set the cookie expiration to a past date to delete the cookie
    path: '/',
  };

  const cookieValue = serialize('token', '', cookieOptions);

  res.setHeader('Set-Cookie', cookieValue);
  res.setHeader('Location', '/Authentication/login');
  res.statusCode = 302; // set the status code to 302 to indicate a redirect

  return res.end();
}
