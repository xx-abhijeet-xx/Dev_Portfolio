import { SITE } from '@lib/constants'

/**
 * GitHubStats
 * Live GitHub stats via github-readme-stats (no API key needed).
 * Renders:
 *   - Overall stats card (stars, commits, PRs, contributions)
 *   - Top languages card
 *   - Streak stats card
 *
 * Update SITE.githubUsername in constants.js to point at your account.
 */
export function GitHubStats() {
  const u = SITE.githubUsername

  // Shared URL params — colours matched to site palette
  const params = (extra = '') =>
    `theme=transparent&border_color=1a1a2e&title_color=63b3ff` +
    `&text_color=6b7280&icon_color=a78bfa&hide_border=false${extra}`

  const statsUrl  = `https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&${params('&include_all_commits=true&count_private=true&custom_title=GitHub+Stats')}`
  const langsUrl  = `https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&langs_count=6&${params()}`
  const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=transparent&border=1a1a2e&ring=63b3ff&fire=a78bfa&currStreakLabel=63b3ff&sideLabels=6b7280&dates=6b7280&stroke=1a1a2e`

  return (
    <div className="gh-wrap reveal">
      <div className="gh-header">
        <span className="gh-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GITHUB ACTIVITY
        </span>
        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="gh-profile-link">
          @{u} ↗
        </a>
      </div>

      <div className="gh-grid">
        <div className="gh-card">
          <img src={statsUrl} alt={`${u} GitHub stats`} loading="lazy" className="gh-img" />
        </div>
        <div className="gh-card">
          <img src={langsUrl} alt={`${u} top languages`} loading="lazy" className="gh-img" />
        </div>
        <div className="gh-card gh-card-full">
          <img src={streakUrl} alt={`${u} contribution streak`} loading="lazy" className="gh-img" />
        </div>
      </div>
    </div>
  )
}
