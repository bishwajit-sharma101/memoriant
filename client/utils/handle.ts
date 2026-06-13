export interface HandleResult {
  handle?: string;
  error?: string;
}

export function generateAndValidateHandle(name: string, email: string): HandleResult {
  const nameCleaned = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const emailPrefix = (email || '').split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  const baseHandle = nameCleaned || emailPrefix || 'user';

  // Minimum length check
  if (baseHandle.length < 3) {
    return { error: 'Your name or email prefix must contain at least 3 alphanumeric characters to generate a valid username.' };
  }

  // Reserved handles check to prevent path conflicts
  const RESERVED_HANDLES = [
    'signin', 'signup', 'dashboard', 'auth', 'verify-email', 'api', 
    '_next', 'static', 'favicon', 'favicon.ico', 'logo', 'logo.png', 
    'robots.txt', 'sitemap.xml', 'public', 'index', 'home', 'admin', 
    'user', 'memoriant'
  ];

  if (RESERVED_HANDLES.includes(baseHandle)) {
    return { error: 'This name or email generates a reserved username. Please use a different name or email.' };
  }

  return { handle: baseHandle };
}
