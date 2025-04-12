import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n';

// Create the middleware with next-intl
export default createMiddleware(routing);

// Configure the middleware to run on specific paths
export const config = {
  // Skip all internal paths (_next) and static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
