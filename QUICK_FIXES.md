# Quick Fixes - Event Logic Migration

## Immediate Action Items

These are the most critical issues that need to be addressed right away to ensure the new site has feature parity with the old site.

---

## 1. Add Collective Invoice to Navigation Menu (5 mins)

**Issue:** The Collective Invoice page exists and is fully functional, but it's not linked in the navigation menu.

**Location:** `src/components/Navigation.tsx`

**Fix:** Add this link in the Event Management section (around line 202, after "Reports & Statistics"):

```typescript
<Link href={`/${lang}/collective-invoice`} className="flex items-start gap-2 group/item">
  <div className="mt-1">
    <img src="/images/el/header-icon/invoice.svg" alt="Collective Invoice" className="w-5 h-5 menu-icon" />
  </div>
  <div>
    <h4 className="font-medium text-gray-900 group-hover/item:text-purple-600">
      {lang === 'en' ? 'Collective Invoice' : 'Samlingsfaktura'}
    </h4>
    <p className="text-xs text-gray-600">
      {lang === 'en' ? 'Consolidate all event expenses in one invoice' : 'Samla alla eventkostnader i en faktura'}
    </p>
  </div>
</Link>
```

---

## 2. Add Resources Dropdown Menu (15 mins)

**Issue:** The old site has links to Knowledge Base and Blog under "Resources" - these are missing from the new navigation.

**Location:** `src/components/Navigation.tsx`

**Fix:** Add a new Resources dropdown after "Pricing" (around line 363):

```typescript
{/* Resources Dropdown */}
<div className="relative group">
  <button className="text-white hover:text-gray-300 transition-colors flex items-center dark:text-white dark:hover:text-gray-300">
    {lang === 'en' ? 'Resources' : 'Resurser'}
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  <div className="absolute left-0 mt-2 w-[300px] bg-white dark:bg-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
    <div className="p-6">
      <div className="space-y-4">
        <a
          href="https://support.eventlogic.se/hc/sv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all"
        >
          <div className="mt-1">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">
              {lang === 'en' ? 'Knowledge Base' : 'Kunskapsbank'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lang === 'en' ? 'Help articles and documentation' : 'Hjälpartiklar och dokumentation'}
            </p>
          </div>
        </a>

        <a
          href="https://blog.eventlogic.se/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 group/item bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-all"
        >
          <div className="mt-1">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover/item:text-purple-600">
              {lang === 'en' ? 'Blog' : 'Nyheter'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lang === 'en' ? 'Latest news and updates' : 'Senaste nyheter och uppdateringar'}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
```

Also add to translation files (`messages/en/common.json` and `messages/sv/common.json`):

```json
"navigation": {
  ...
  "resources": "Resources" // EN
  "resources": "Resurser" // SV
}
```

---

## 3. Implement URL Redirects (10 mins)

**Issue:** Old URLs from eventlogic.se will result in 404s without proper redirects.

**Location:** `next.config.ts`

**Fix:** Add these redirects to the existing redirects array:

```typescript
// In next.config.ts, add to redirects array:
{
  source: '/leverantorer-event',
  destination: '/en/find-suppliers',
  permanent: true
},
{
  source: '/sv/leverantorer-event',
  destination: '/sv/hitta-leverantorer',
  permanent: true
},
{
  source: '/smmp',
  destination: '/en/strategic-meeting-management',
  permanent: true
},
{
  source: '/sv/smmp',
  destination: '/sv/strategisk-moteshantering',
  permanent: true
},
{
  source: '/for-business-travel-agencies',
  destination: '/en/travel-agencies',
  permanent: true
},
{
  source: '/sv/for-business-travel-agencies',
  destination: '/sv/resebyraer',
  permanent: true
},
{
  source: '/for-suppliers',
  destination: '/en/suppliers',
  permanent: true
},
{
  source: '/sv/for-suppliers',
  destination: '/sv/leverantorer',
  permanent: true
},
{
  source: '/contact-info',
  destination: '/en/about',
  permanent: true
},
{
  source: '/sv/contact-info',
  destination: '/sv/om-oss',
  permanent: true
},
{
  source: '/privacy-policy',
  destination: '/en/about/data-protection',
  permanent: true
},
{
  source: '/sv/privacy-policy',
  destination: '/sv/om-oss/dataskydd',
  permanent: true
},
{
  source: '/career',
  destination: '/en/about/career',
  permanent: true
},
{
  source: '/sv/career',
  destination: '/sv/om-oss/karriar',
  permanent: true
},
{
  source: '/inbjudan',
  destination: '/sv/designa-inbjudan',
  permanent: true
},
{
  source: '/anmalan',
  destination: '/sv/deltagarhantering',
  permanent: true
},
{
  source: '/eventsida',
  destination: '/sv/deltagarhantering',
  permanent: true
},
{
  source: '/korschema',
  destination: '/sv/schema',
  permanent: true
},
{
  source: '/statisik-rapporter',
  destination: '/sv/rapporter',
  permanent: true
},
```

---

## 4. Investigate Missing "Simplify Decision Process" Page (Decision Required)

**Issue:** The old site had a feature called "Förenkla beslutsprocessen" (Simplify Decision Process) at `/forenkla-beslutsprocessen`, which is completely missing from the new site.

**Question for Team:** Was this feature intentionally removed, or should it be migrated?

**If it needs to be migrated:**
1. Create directory: `/src/app/[locale]/simplify-decision-process/`
2. Create page.tsx
3. Add to i18n.ts routing
4. Add translation files
5. Add to Features > Event Management menu

---

## Summary

**Total time to implement fixes 1-3: ~30 minutes**

These fixes will:
- ✅ Restore access to Collective Invoice feature
- ✅ Link to Knowledge Base and Blog
- ✅ Prevent 404 errors from old site URLs
- ✅ Maintain SEO rankings with proper redirects

**Priority Order:**
1. Fix #3 (Redirects) - Most critical for SEO and user experience
2. Fix #1 (Collective Invoice) - Missing feature
3. Fix #2 (Resources) - Nice to have
4. Fix #4 (Decision required)
